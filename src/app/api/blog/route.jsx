import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';
import BlogModel from "@/lib/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authentication/authOptions";

export async function GET(request) {
    console.log('GET request');
    return NextResponse.json({ message: 'GET request' });
}

export async function POST(request) {
    try {
        // Récupérer la session côté serveur
        const session = await getServerSession(authOptions);

        // Vérifier si l'utilisateur est connecté
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        // Récupérer les données du formulaire (FormData)
        const formData = await request.formData();
        const image = formData.get('image'); // Récupérer le fichier image

        // Vérifier si un fichier a été envoyé
        if (!image) {
            return NextResponse.json({ error: 'Aucune image fournie' }, { status: 400 });
        }

        // Lire les données binaires de l'image
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        // Générer un nom de fichier unique avec un timestamp
        const timestamp = Date.now();
        const fileName = `${timestamp}_${image.name}`;

        // Chemin de destination pour enregistrer l'image
        const filePath = path.join(process.cwd(), 'public', fileName);

        // Écrire le fichier dans le dossier public
        await writeFile(filePath, buffer);

        // Générer l'URL de l'image
        const imgUrl = `/${fileName}`;
        console.log('Image enregistrée :', imgUrl);

        // Créer l'objet blogData avec l'ID de l'utilisateur
        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: session.user.id, // Utiliser l'ID de l'utilisateur connecté
            image: imgUrl,
        };

        // Enregistrer le blog dans la base de données
        await BlogModel.create(blogData);
        console.log('Blog enregistré');

        // Retourner une réponse de succès
        return NextResponse.json({ success: true, message: "Blog ajouté!" });
    } catch (error) {
        console.error('Erreur', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}