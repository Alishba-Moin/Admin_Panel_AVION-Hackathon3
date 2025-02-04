"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// ✅ Define the Order Type
interface Order {
  _id: string;
  total: number;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  products: { productTitle: string; price: number; quantity: number }[];
}

export default function ListView() {
  const [orders, setOrders] = useState<Order[]>([]); // ✅ Specify Order[] type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order"]{
          _id,
          total,
          paymentMethod,
          "customerName": customer->name,
          "customerEmail": customer->email,
          products[] {
            productTitle,
            price,
            quantity
          }
        } | order(_createdAt desc) [0...$pageLimit]`;

        const data: Order[] = await client.fetch(query, { pageLimit }); 
        setOrders(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pageLimit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) return <div>{error instanceof Error ? error.message : "An unknown error occurred"}</div>;

  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Orders</h1>
      </div>

      <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl w-full overflow-x-auto">
        <table className="border-collapse w-full bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="font-semibold py-2 px-3 border text-left">SN</th>
              <th className="font-semibold py-2 px-3 border text-left">Customer</th>
              <th className="font-semibold py-2 px-3 border text-left">Total Price</th>
              <th className="font-semibold py-2 px-3 border text-left">Payment Mode</th>
              <th className="font-semibold py-2 px-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <Row key={item._id} index={index + 1} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between text-sm py-3">
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="px-5 py-2 border rounded-md"
          name="perpage"
          id="perpage"
        >
          <option value={3}>3 Items</option>
          <option value={5}>5 Items</option>
          <option value={10}>10 Items</option>
          <option value={20}>20 Items</option>
          <option value={100}>100 Items</option>
        </select>
      </div>
    </main>
  );
}

// ✅ Fix Row Component Type Definition
function Row({ item, index }: { item: Order; index: number }) {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="py-2 px-3 border text-center">{index}</td>
      <td className="py-2 px-3 border">
        <div>
          <h1 className="font-medium">{item.customerName}</h1>
          <h1 className="text-xs text-gray-600">{item.customerEmail}</h1>
        </div>
      </td>
      <td className="py-2 px-3 border"> &#163;{item.total}</td>
      <td className="py-2 px-3 border">
        <span className="bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase">
          {item.paymentMethod}
        </span>
      </td>
      <td className="py-2 px-3 border text-center">
        <Link href={`/Admin/Orders/${item._id}`}>
          <button className="bg-black text-white px-3 py-2 rounded-lg text-xs">
            View
          </button>
        </Link>
      </td>
    </tr>
  );
}