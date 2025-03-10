'use client';
import { useState, useEffect } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditBlog() {
    const router = useRouter();
    const { id } = useParams(); // Récupérer l'ID du blog depuis l'URL

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Récupérer les données du blog à éditer
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/${id}`);
                if (response.data.success) {
                    const blog = response.data.data;
                    setFormData({
                        title: blog.title,
                        description: blog.description,
                        content: blog.content,
                        category: blog.category,
                        image: null, // Ne pas pré-remplir l'image pour éviter les problèmes de type
                    });
                    if (blog.image) {
                        setImagePreview(blog.image); // Afficher l'image existante
                    }
                } else {
                    toast.error('Blog non trouvé');
                    router.push('/');
                }
            } catch (error) {
                console.error('Erreur:', error);
                toast.error('Erreur lors de la récupération du blog');
                router.push('/');
            }
        };

        fetchBlog();
    }, [id, router]);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('content', formData.content);
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.put(`/api/blog/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            console.log('Erreur:', error);
            toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour du blog');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="m-10 space-y-6">
            {/* Champ Titre */}
            <div className="form-control">
                <label className={`label ${errors.title ? 'text-red-500' : ''}`}>
                    <span className="label-text">Titre</span>
                </label>
                <input
                    type="text"
                    name="title"
                    className={`input focus:outline-none w-full ${
                        errors.title ? 'border-red-500' : ''
                    }`}
                    placeholder="Titre"
                    value={formData.title}
                    onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        setErrors({ ...errors, title: '' });
                    }}
                />
            </div>

            {/* Champ Catégorie */}
            <div className="form-control">
                <label className={`label ${errors.category ? 'text-red-500' : ''}`}>
                    <span className="label-text">Catégorie</span>
                </label>
                <select
                    name="category"
                    className={`select focus:outline-none w-full ${errors.category ? 'border-red-500' : ''}`}
                    value={formData.category}
                    onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        setErrors({ ...errors, category: '' });
                    }}
                >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="anime">Anime</option>
                    <option value="manga">Manga</option>
                </select>
            </div>

            {/* Champ Image */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Image (optionnel)</span>
                </label>
                <div className="flex items-center gap-4">
                    <label
                        htmlFor="image-upload"
                        className="btn btn-outline btn-info flex items-center gap-2"
                    >
                        <BiImageAdd size={20} />
                        <span>Changer l'image</span>
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFormData({ ...formData, image: file });
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImagePreview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            } else {
                                setImagePreview(null);
                            }
                        }}
                    />
                </div>
                {imagePreview && (
                    <div className="mt-4">
                        <img
                            src={imagePreview}
                            alt="Aperçu de l'image"
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    </div>
                )}
            </div>

            {/* Champ Description */}
            <div className="form-control">
                <label className={`label ${errors.description ? 'text-red-500' : ''}`}>
                    <span className="label-text">Description</span>
                </label>
                <textarea
                    name="description"
                    className={`textarea focus:outline-none w-full ${
                        errors.description ? 'border-red-500' : ''
                    }`}
                    placeholder=""
                    value={formData.description}
                    onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        setErrors({ ...errors, description: '' });
                    }}
                ></textarea>
            </div>

            {/* Champ Contenu */}
            <div className="form-control">
                <label className={`label ${errors.content ? 'text-red-500' : ''}`}>
                    <span className="label-text">Contenu</span>
                </label>
                <textarea
                    name="content"
                    className={`textarea focus:outline-none w-full ${
                        errors.content ? 'border-red-500' : ''
                    }`}
                    placeholder="Contenu du blog"
                    value={formData.content}
                    onChange={(e) => {
                        setFormData({ ...formData, content: e.target.value });
                        setErrors({ ...errors, content: '' });
                    }}
                ></textarea>
            </div>

            {/* Bouton de soumission */}
            <div className="form-control">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`btn btn-accent ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour le blog'}
                </button>
            </div>
        </div>
    );
}