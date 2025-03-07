'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter()
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!formData.email || !formData.password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Connexion avec les credentials
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Désactiver la redirection automatique
      });

      if (response?.error) {
        toast.error("Email ou mot de passe incorrect.");
      } else {
        toast.success("Connexion réussie !");
        setTimeout(() => {
          router.push("/");
        }, 2000) // Rediriger vers la page d'accueil après 2s
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title text-2xl font-bold mb-4">Connexion</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                className="input w-full focus:outline-none"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                className="input w-full focus:outline-none"
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {/* Bouton de soumission */}
            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn btn-accent text-white"
              >
                Se connecter
              </button>
            </div>
          </form>
          
          {/* Connexion avec Google */}
          {/* <div className="divider">OU</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            <FcGoogle className="size-5" />
            Se connecter avec Google
          </button> */}

          {/* Lien vers la page d'inscription */}
          <div className="mt-4">
            <span>Vous n'avez pas de compte ? </span>
            <Link href={'/register'} className="link link-primary">Inscrivez-vous ici</Link>
          </div>
        </div>
      </div>
    </div>
  );
}