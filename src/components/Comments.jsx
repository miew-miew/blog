import React from 'react'

export default function Comments() {
  return (
    <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Commentaires</h2>

        {/* Formulaire pour poster un commentaire */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Ajouter un commentaire..."
        ></textarea>
        <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Poster
        </button>
        </div>

        {/* Liste des commentaires */}
        <div className="space-y-8">
        {/* Exemple de commentaire */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
            <img
                src="/favicon.png" // Remplacez par l'image de l'utilisateur
                alt="Utilisateur 1"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
                <p className="text-lg font-semibold text-gray-900">Jean Dupont</p>
                <p className="text-sm text-gray-500">Il y a 2 heures</p>
            </div>
            </div>
            <p className="text-gray-700">
            Super article ! J'ai hâte de voir ces nouveaux anime.
            </p>
        </div>

        {/* Exemple de commentaire */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
            <img
                src="/favicon.png" // Remplacez par l'image de l'utilisateur
                alt="Utilisateur 2"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
                <p className="text-lg font-semibold text-gray-900">Marie Curie</p>
                <p className="text-sm text-gray-500">Il y a 5 heures</p>
            </div>
            </div>
            <p className="text-gray-700">
            J'adore Demon Slayer, je suis trop impatiente pour le nouvel arc !
            </p>
        </div>
        </div>
    </div>
  )
}
