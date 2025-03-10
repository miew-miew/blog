'use client';

import { useState, useEffect } from 'react';
import axios from 'axios'; // Importer axios
import BlogItem from './BlogItem';
import CategoryList from './CategoryList';

export default function BlogList() {
    const [menu, setMenu] = useState('all'); // Utiliser des minuscules pour la catégorie par défaut
    const [blogs, setBlogs] = useState([]); // État pour stocker les blogs récupérés
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    // Fonction pour récupérer les blogs depuis l'API avec axios
    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog'); // Utiliser axios.get

            if (response.data.success) {
                setBlogs(response.data.data); // Mettre à jour l'état avec les blogs récupérés
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    // Appeler fetchBlogs au montage du composant
    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) {
        return <div>Chargement en cours...</div>; // Afficher un message de chargement
    }

    return (
        <div>
            <CategoryList setMenu={setMenu} menu={menu} />
            <div className="flex flex-wrap gap-6">
                {blogs
                    .filter((blog) => {
                        // Convertir les catégories en minuscules pour ignorer la casse
                        const blogCategory = blog.category.toLowerCase();
                        const selectedCategory = menu.toLowerCase();
                        return selectedCategory === 'all' || blogCategory === selectedCategory;
                    })
                    .map((blog) => (
                        <BlogItem
                            key={blog._id} // Utiliser _id comme clé unique
                            id={blog._id}
                            category={blog.category}
                            title={blog.title}
                            description={blog.description}
                            author={blog.author?.name || 'Auteur inconnu'} // Gérer les auteurs manquants
                            image={blog.image}
                        />
                    ))}
            </div>
        </div>
    );
}