import Link from 'next/link';
import React from 'react';

export default function BlogItem({ id, category, title, description, author, image }) {
  return (
    <div className="max-w-sm overflow-hidden rounded-2xl shadow-lg bg-[#2a2626] text-gray-100 transform transition-transform duration-300 hover:scale-105">
        <Link href={`/blog/${id}`}>
            <img className="w-full h-48 object-cover" src={image} alt={title} />
            <div className="px-6 py-4">
                <span className="inline-block bg-[#4e4e4e] rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mb-2">
                {category}
                </span>
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-300 text-base">{description}</p>
            </div>
            <div className="px-6 py-4 flex items-center">
                <div className="text-sm">
                <p className="text-gray-300 leading-none">{author}</p>
                </div>
            </div>
        </Link>
    </div>
  );
}