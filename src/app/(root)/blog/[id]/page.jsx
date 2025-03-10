'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page({ params }) {
  const { id } = React.use(params);
  const router = useRouter()
  const { data: session } = useSession()

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blog/${id}`);
      if (response.data.success) {
        setBlog(response.data.data);
      } else {
        setError('Blog non trouvé');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la récupération du blog');
    } finally {
      setLoading(false);
    }
  };

  // Vérifiez si l'utilisateur connecté est l'auteur du blog
  const isAuthor = session?.user?.id === blog?.author?._id;

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-8">Blog non trouvé</div>;
  }

  const handleEdit = () => {
    router.push(`/blog/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/blog/${id}`);
      if (response.data.success) {
        router.push('/'); 
      }
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la suppression du blog');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      {/* Titre */}
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        {blog.title}
      </h1>

      {/* Description */}
      <p className="text-xl text-gray-700 pb-3">{blog.description}</p>

      <div className='flex justify-between items-center mt-3 py-5 border-t border-gray-400'>
        {/* Auteur */}
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-700">
                {blog.author?.name?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {blog.author?.name}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {isAuthor && (
          <div className='flex gap-4'>
            <button className='btn btn-ghost'>
              <CiEdit className='text-primary' onClick={handleEdit} size={25} />
            </button>
            <button className='btn btn-ghost'>
              <MdDeleteForever className='text-error' onClick={handleDelete} size={25} />
            </button>
          </div>
        )}
      </div>

      {/* Image du blog */}
      <div className="relative w-full h-[500px] mb-12 rounded-lg shadow-xl">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-8 left-8">
          <span className="badge badge-info text-white">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="text-lg text-gray-700 mb-8">
        {blog.content}
      </div>
    </div>
  );
}
