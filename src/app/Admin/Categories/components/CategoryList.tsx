'use client';

import { Trash2, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  productCount: number;
}

export default function ListView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ Fetch Categories Function
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    setIsLoading(true);
    try {
      await fetch('/api/categories', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchCategories(); // ✅ Fetch categories again after delete
    } catch (error) {
      console.error('Error deleting category:', error);
    }
    setIsLoading(false);
  };

  const handleUpdate = (id: string) => {
    router.push(`/Admin/Categories?id=${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <h1 className="text-xl">Categories</h1>
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">SN</th>
            <th className="font-semibold border-y bg-white px-3 py-2">Name</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Slug</th>
            <th className="font-semibold border-y bg-white px-3 py-2">Products</th> 
            <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={item._id}>
              <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">{index + 1}</td>
              <td className="border-y bg-white px-3 py-2">{item.name}</td>
              <td className="border-y bg-white px-3 py-2">{item.slug.current}</td>
              <td className="border-y bg-white px-3 py-2 text-center">{item.productCount}</td>
              <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(item._id)}
                  className="text-blue-600">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} 
                  className="text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

