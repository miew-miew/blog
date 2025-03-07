'use client'

export default function CategoryList({ setMenu, menu }) {
  return (
    <div className='p-4'>
      <div className='flex space-x-10'>
        {['All', 'Anime', 'Manga'].map((category) => (
          <button
            key={category}
            className={`btn ${menu === category ? '' : 'btn-ghost'}`}
            onClick={() => setMenu(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
