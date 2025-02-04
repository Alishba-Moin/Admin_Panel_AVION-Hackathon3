"use client";
// import { useEffect, useState } from "react";

// interface Category {
//   _id: string;
//   name: string;
// }

// interface ProductData {
//   name?: string;
//   price?: number;
//   quantity?: number;
//   category?: string;
// }

// interface BasicDetailsProps {
//   data: ProductData;
//   handleData: (key: keyof ProductData, value: any) => void;
// }

// export default function BasicDetails({ data, handleData }: BasicDetailsProps) {
//   const [categories, setCategories] = useState<Category[]>([]);

//   // 🔹 Fetch Categories from API
//   useEffect(() => {
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then((data: Category[]) => setCategories(data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   return (
//     <section className="p-5 bg-white border rounded-xl shadow-md">
//       <h2 className="font-semibold text-lg mb-4">Basic Details</h2>

//       {/* 🔹 Product Name */}
//       <label className="block text-sm font-medium text-gray-700">Product Name</label>
//       <input
//         type="text"
//         value={data.name || ""}
//         onChange={(e) => handleData("name", e.target.value)}
//         className="w-full p-2 border rounded-lg mt-1"
//         placeholder="Enter product name"
//       />

//       {/* 🔹 Product Price */}
//       <label className="block text-sm font-medium text-gray-700 mt-4">Price</label>
//       <input
//         type="number"
//         value={data.price || ""}
//         onChange={(e) => handleData("price", parseFloat(e.target.value))}
//         className="w-full p-2 border rounded-lg mt-1"
//         placeholder="Enter price"
//       />

//       {/* 🔹 Product Quantity */}
//       <label className="block text-sm font-medium text-gray-700 mt-4">Quantity</label>
//       <input
//         type="number"
//         value={data.quantity || ""}
//         onChange={(e) => handleData("quantity", parseInt(e.target.value))}
//         className="w-full p-2 border rounded-lg mt-1"
//         placeholder="Enter quantity"
//       />

//       {/* 🔹 Category Dropdown */}
//       <label className="block text-sm font-medium text-gray-700 mt-4">Category</label>
//       <select
//         value={data.category || ""}
//         onChange={(e) => handleData("category", e.target.value)}
//         className="w-full p-2 border rounded-lg mt-1"
//       >
//         <option value="">Select a category</option>
//         {categories.map((category) => (
//           <option key={category._id} value={category._id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//     </section>
//   );
// }



import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

export interface ProductData {
  name?: string;
  price?: number;
  quantity?: number;
  category?: string;
}

interface BasicDetailsProps {
  data: ProductData;
  handleData: (key: keyof ProductData, value: any) => void;
}

export default function BasicDetails({ data, handleData }: BasicDetailsProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch Categories from API
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <section className="p-5 bg-white border rounded-xl shadow-md">
      <h2 className="font-semibold text-lg mb-4">Basic Details</h2>

      {/* Product Name */}
      <label className="block text-sm font-medium text-gray-700">Product Name</label>
      <input
        type="text"
        value={data.name || ""}
        onChange={(e) => handleData("name", e.target.value)}
        className="w-full p-2 border rounded-lg mt-1"
        placeholder="Enter product name"
      />

      {/* Product Price */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Price</label>
      <input
        type="number"
        value={data.price || ""}
        onChange={(e) => handleData("price", parseFloat(e.target.value))}
        className="w-full p-2 border rounded-lg mt-1"
        placeholder="Enter price"
      />

      {/* Product Quantity */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Quantity</label>
      <input
        type="number"
        value={data.quantity || ""}
        onChange={(e) => handleData("quantity", parseInt(e.target.value))}
        className="w-full p-2 border rounded-lg mt-1"
        placeholder="Enter quantity"
      />

      {/* Category Dropdown */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Category</label>
      <select
        value={data.category || ""}
        onChange={(e) => handleData("category", e.target.value)}
        className="w-full p-2 border rounded-lg mt-1"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </section>
  );
}
