'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  name: string;
  slug: string;
}

export default function Form() {
  const [data, setData] = useState<Category>({ name: '', slug: '' });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const fetchData = async () => {
    if (id) {
      const response = await fetch('/api/categories');
      const categories: Category[] = await response.json();
      const category = categories.find((cat: any) => cat._id === id);

      // If a category is found, set the form data, otherwise, set empty fields
      setData(category || { name: '', slug: '' });
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key: string, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData({ name: '', slug: '' });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/categories', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          name: data.name,
          slug: data.slug,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/Admin/Categories');
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  // Debugging to check the structure of the data
  useEffect(() => {
    console.log('Fetched Data:', data);
  }, [data]);

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? 'Update' : 'Create'} Category</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="category-name"
            name="category-name"
            type="text"
            placeholder="Enter Name"
            value={typeof data?.name === 'string' ? data?.name : ''}
            onChange={(e) => handleData('name', e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-slug" className="text-gray-500 text-sm">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="category-slug"
            name="category-slug"
            type="text"
            placeholder="Enter Slug"
            value={typeof data?.slug === 'string' ? data?.slug : ''}
            onChange={(e) => handleData('slug', e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 mt-3 rounded-lg bg-blue-500 text-white ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}