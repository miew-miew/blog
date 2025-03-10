'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'sonner'; // Importez toast depuis sonner

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", formData);

      if (response.data.success) {
        toast.success(response.data.message); // Notification de succès
        // Réinitialiser le formulaire après une inscription réussie
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Rediriger l'utilisateur vers la page de connexion après 2 secondes
        setTimeout(() => {
          router.push('/login')
        }, 2000);
      }
    } catch (error) {
      // Gestion des erreurs réseau ou serveur
      toast.error(error.response?.data?.message || "Une erreur s'est produite lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-2xl font-bold mb-4">Inscription</h2>
          <form onSubmit={handleSubmit} className="w-full">
            {/* Champ Nom */}
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Nom</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Entrez votre nom"
                className="input w-full focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Champ Email */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Entrez votre email"
                className="input w-full focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                className="input w-full focus:outline-none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Champ Confirmation de mot de passe */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirmez le mot de passe</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                className="input w-full focus:outline-none"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {/* Bouton d'inscription */}
            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn btn-accent text-white"
              >
                S'inscrire
              </button>
            </div>
          </form>

          {/* Lien vers la page de connexion */}
          <div className="mt-4">
            <span>Vous avez déjà un compte ? </span>
            <Link href={'/login'} className="link link-primary">Connectez-vous ici</Link>
          </div>
        </div>
      </div>
    </div>
  );
}