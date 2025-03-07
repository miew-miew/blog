'use client'

import { useState } from 'react';
import {data} from '../assets/data.jsx'; // Importez les données JSON
import BlogItem from './BlogItem';
import CategoryList from './CategoryList';

export default function BlogList() {
  const [menu, setMenu] = useState("All");

  return (
    <div>
      <CategoryList setMenu={setMenu} menu={menu} />
      <div className="flex flex-wrap gap-6">
        {data // Utilisez directement blogitem (pas besoin de .articles)
          .filter((article) => menu === "All" || article.category === menu)
          .map((article) => (
            <BlogItem
              key={article.id}
              id={article.id}
              category={article.category}
              title={article.title}
              description={article.description}
              author={article.author}
              image={article.image}
            />
          ))}
      </div>
    </div>
  );
}