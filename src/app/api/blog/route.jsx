import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import BlogModel from '@/lib/models/Blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authentication/authOptions';

export async function GET(request) {
    try {
        // Récupérer tous les blogs depuis la base de données
        const blogs = await BlogModel.find().populate('author', 'name email'); // Populate pour inclure les informations de l'auteur

        return NextResponse.json(
            { success: true, data: blogs },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur lors de la récupération des blogs' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Vous devez être connecté pour créer un blog.' },
                { status: 401 }
            );
        }

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

        const newBlog = new BlogModel({
            title,
            description,
            content, 
            category,
            author: session.user.id,
            image: imgUrl,
        });

        await newBlog.save();

        console.log('Blog enregistré avec succès:', newBlog);

        return NextResponse.json(
            { success: true, message: 'Blog créé avec succès!', data: newBlog },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erreur lors de la création du blog:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}