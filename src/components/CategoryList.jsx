'use client';

export default function CategoryList({ setMenu, menu }) {
  return (
    <div className='p-4'>
      <div className='flex space-x-10'>
        {['all', 'anime', 'manga'].map((category) => ( // Utiliser des minuscules
          <button
            key={category}
            className={`btn ${menu === category ? '' : 'btn-ghost'}`}
            onClick={() => setMenu(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} {/* Afficher en majuscule */}
          </button>
        ))}
      </div>
    </div>
  );
}