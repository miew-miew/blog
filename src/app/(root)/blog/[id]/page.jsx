import React from 'react';
import { data } from '@/assets/data.jsx'; // Importez les données JSON
import Comments from '@/components/Comments';

export default async function Page({ params }) {
  const { id } = await params;

  const articleId = parseInt(id, 10);

  // Trouvez l'article correspondant à l'ID
  const article = data.find((item) => item.id === articleId);

  // Si l'article n'existe pas, affichez un message d'erreur
  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      {/* Image de l'article */}
      <div className="relative w-full h-[500px] mb-12 overflow-hidden rounded-lg shadow-xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Description */}
      <p className="text-xl text-gray-700 mb-8">{article.description}</p>

      {/* Contenu statique pour l'article avec l'id 1 */}
      {article.id === 1 && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Les Anime à ne pas manquer en 2025
          </h2>
          <p className="text-lg text-gray-700">
            L'année 2025 s'annonce riche en nouveautés pour les fans d'anime. Voici une liste des
            séries les plus attendues :
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
            <li className="pl-4">Attack on Titan: Final Chapter</li>
            <li className="pl-4">Demon Slayer: Infinity Castle Arc</li>
            <li className="pl-4">My Hero Academia: Season 7</li>
            <li className="pl-4">One Piece: Wano Country Finale</li>
            <li className="pl-4">Jujutsu Kaisen: Shibuya Incident Conclusion</li>
          </ul>
          <p className="text-lg text-gray-700">
            Ces séries promettent des combats épiques, des intrigues captivantes et des animations de
            haute qualité. Préparez-vous à vivre des moments inoubliables !
          </p>
        </div>
      )}

      {/* Auteur */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src={article.author_image}
            alt={article.author}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">{article.author}</p>
            <p className="text-sm text-gray-500">{article.date}</p>
          </div>
        </div>
      </div>

      {/* Section des commentaires */}
      <Comments />
    </div>
  );
}