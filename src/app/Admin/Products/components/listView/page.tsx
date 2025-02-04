"use client";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define Product Interface
interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  category: {
    name: string;
  };
}

export default function ListView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Move useRouter hook here inside the component

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    setIsLoading(true);
    try {
      await fetch(`/api/products`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (err) {
      setError("Failed to delete the product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (id: string) => {
    // Now `router.push` is directly used inside `handleUpdate`
    router.push(`/Admin/Products/form?id=${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Products</h1>
      </div>

      <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl w-full overflow-x-auto">
        <table className="border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">SN</th>
              <th className="font-semibold border-y bg-white px-3 py-2">Image</th>
              <th className="font-semibold border-y bg-white px-3 py-2 text-left">Title</th>
              <th className="font-semibold border-y bg-white px-3 py-2 text-left">Price</th>
              <th className="font-semibold border-y bg-white px-3 py-2 text-left">Category</th>
              <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <Row key={item._id} index={index + 1} item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// Row Component
function Row({ item, index, onDelete, onUpdate }: { item: Product; index: number; onDelete: (id: string) => void; onUpdate: (id: string) => void }) {
  return (
    <tr>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">{index}</td>
      <td className="border-y bg-white px-3 py-2 text-center">
        <img className="h-10 w-10 object-cover" src={item.image} alt={item.name} />
      </td>
      <td className="border-y bg-white px-3 py-2 whitespace-nowrap">{item.name}</td>
      <td className="border-y bg-white px-3 py-2 whitespace-nowrap"> &#163;{item.price}</td>
      <td className="border-y bg-white px-3 py-2 whitespace-nowrap">{item.category.name}</td>
      <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
        <div className="flex gap-2 items-center">
          <button onClick={() => onUpdate(item._id)} className="text-blue-600">
            <Edit2 size={15} />
          </button>
          <button onClick={() => onDelete(item._id)} className="text-red-600">
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

