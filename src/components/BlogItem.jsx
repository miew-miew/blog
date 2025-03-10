import Link from 'next/link';
import { FaImage } from "react-icons/fa";

export default function BlogItem({ id, category, title, description, author, image }) {
  return (
    <div className="card bg-gray-800 w-[25%]">
      <Link href={`/blog/${id}`}>
        <div className="card-body text-white">

          {/* Image */}
          {image ? (
            <div className="w-64 h-64 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: `url(${image})` }}></div>
          ) : (
            <div>
              <FaImage size={250} />
            </div>
          )}

          {/* Catégorie */}
          <span className="badge badge-info text-white text-xs">{category}</span>

          {/* Titre */}
          <h2 className="text-2xl font-semibold mt-2 hover:text-secondary transition-colors duration-300">{title}</h2>

          {/* Description */}
          <p className="text-sm mt-2 line-clamp-3">{description}</p>

          {/* Auteur */}
          <div className="mt-4 flex items-center text-sm text-gray-400">
            
            <div className="size-10 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-300">
                {author.charAt(0)}
              </span>
            </div>
            <span className="ml-1 font-medium">{author}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
