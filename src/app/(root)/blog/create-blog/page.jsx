'use client';
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { toast } from 'sonner';

export default function CreateBlog() {
  const { data: session } = useSession(); // Récupérer la session utilisateur
  const [image, setImage] = useState(null); // État pour stocker le fichier image sélectionné
  const [title, setTitle] = useState(""); // État pour le titre du blog
  const [description, setDescription] = useState(""); // État pour la description du blog
  const [category, setCategory] = useState(""); // État pour la catégorie du blog
  const [isSubmitting, setIsSubmitting] = useState(false); // État pour gérer l'état de soumission

  // Gestion de la sélection de fichier
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      console.log("Image sélectionnée :", file.name);
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Vérifier si l'utilisateur est connecté
    if (!session || !session.user) {
      toast.error("Vous devez être connecté pour créer un blog.");
      return;
    }

    // Vérifier si une image a été sélectionnée
    if (!image) {
      toast.error("Veuillez sélectionner une image.");
      return;
    }

    // Vérifier si les champs requis sont remplis
    if (!title || !description || !category) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setIsSubmitting(true); // Activer l'état de soumission

    try {
      // Créer un objet FormData pour envoyer les données
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", session.user.id); // Ajouter l'ID de l'utilisateur comme auteur
      formData.append("image", image); // Ajouter l'image

      // Envoyer les données à l'API
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
        credentials: "include", // Inclure les cookies
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Blog créé avec succès !");
        console.log("Blog créé :", data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Erreur lors de la création du blog.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false); // Désactiver l'état de soumission
    }
  };

  return (
    <div className="m-10 space-y-6">
      {/* Champ pour le titre */}
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Titre"
        aria-label="Titre du blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Champ pour la catégorie */}
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Catégorie"
        aria-label="Catégorie du blog"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Éditeur de contenu */}
      <div className="relative border border-gray-300 rounded-lg p-4 space-y-4">
        <div className="flex gap-4">
          {/* Bouton personnalisé pour sélectionner une image */}
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer"
            aria-label="Ajouter une image"
          >
            <BiImageAdd size={30} />
            <span className="text-sm font-medium">Ajouter une image</span>
          </label>
          {/* Champ fichier masqué */}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Afficher le nom du fichier sélectionné */}
        {image && (
          <div className="text-sm text-gray-600">
            Fichier sélectionné : {image.name}
          </div>
        )}

        {/* Zone de texte pour le contenu */}
        <textarea
          className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Racontez votre histoire..."
          aria-label="Contenu du blog"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Bouton de soumission */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création en cours..." : "Créer le blog"}
        </button>
      </div>
    </div>
  );
}