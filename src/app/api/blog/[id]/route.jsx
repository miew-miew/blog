import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import BlogModel from '@/lib/models/Blog';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authentication/authOptions';

export async function GET(request, { params }) {
    try {
        const { id } = await params; // Récupérer l'ID depuis les paramètres de l'URL

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: 'ID de blog invalide' },
                { status: 400 }
            );
        }

        // Récupérer le blog depuis la base de données
        const blog = await BlogModel.findById(id).populate('author', 'name email');

        // Si le blog n'existe pas
        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog non trouvé' },
                { status: 404 }
            );
        }

        // Retourner le blog trouvé
        return NextResponse.json(
            { success: true, data: blog },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
  try {
      const { id } = await params;

      // Vérifier si l'ID est valide
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return NextResponse.json(
              { success: false, message: 'ID de blog invalide' },
              { status: 400 }
          );
      }

      // Récupérer les données du formulaire
      const formData = await request.formData();
      const title = formData.get('title');
      const description = formData.get('description');
      const content = formData.get('content');
      const category = formData.get('category');
      const image = formData.get('image');

      // Validation des champs obligatoires
      const errors = {};
      if (!title) errors.title = 'Le titre est obligatoire.';
      if (!description) errors.description = 'La description est obligatoire.';
      if (!content) errors.content = 'Le contenu est obligatoire.';
      if (!category) errors.category = 'La catégorie est obligatoire.';

      if (Object.keys(errors).length > 0) {
          return NextResponse.json(
              { success: false, message: 'Veuillez fournir tous les données nécessaires.', errors },
              { status: 400 }
          );
      }

      // Traitement de l'image
      let imgUrl = null;
      if (image && image instanceof File && image.size > 0) {
          const imageByteData = await image.arrayBuffer();
          const buffer = Buffer.from(imageByteData);
          const timestamp = Date.now();
          const fileName = `${timestamp}_${image.name}`;
          const filePath = path.join(process.cwd(), 'public', fileName);
          await writeFile(filePath, buffer);
          imgUrl = `/${fileName}`;
      }

      // Mettre à jour le blog
      const updatedData = {
          title,
          description,
          content,
          category,
      };

      // Ajouter l'URL de l'image uniquement si une nouvelle image est fournie
      if (imgUrl) {
          updatedData.image = imgUrl;
      }

      const blog = await BlogModel.findByIdAndUpdate(
          id,
          updatedData,
          { new: true }
      );

      if (!blog) {
          return NextResponse.json(
              { success: false, message: 'Blog non trouvé' },
              { status: 404 }
          );
      }

      return NextResponse.json(
          { success: true, message: 'Blog mis à jour avec succès', data: blog },
          { status: 200 }
      );
  } catch (error) {
      console.error('Erreur:', error);
      return NextResponse.json(
          { success: false, message: 'Erreur interne du serveur' },
          { status: 500 }
      );
  }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // Récupérer la session de l'utilisateur connecté
        const session = await getServerSession(authOptions);

        // Vérifier si l'utilisateur est connecté
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Vous devez être connecté pour supprimer un blog.' },
                { status: 401 }
            );
        }

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: 'ID de blog invalide' },
                { status: 400 }
            );
        }

        // Récupérer le blog depuis la base de données
        const blog = await BlogModel.findById(id);

        // Si le blog n'existe pas
        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog non trouvé' },
                { status: 404 }
            );
        }

        // Vérifier si l'utilisateur connecté est l'auteur du blog
        if (blog.author.toString() !== session.user.id) {
            return NextResponse.json(
                { success: false, message: 'Non autorisé' },
                { status: 403 }
            );
        }

        // Supprimer le blog
        await BlogModel.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Blog supprimé avec succès' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}