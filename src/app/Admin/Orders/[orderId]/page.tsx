"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";

// Define the structure of the order
interface Order {
  _id: string;
  total: number;
  paymentMethod: string;
  status?: string;
  shippingAddress: {
    streetAddress: string;
    city: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  products: {
    productTitle: string;
    price: number;
    quantity: number;
  }[];
}

export default function Page() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const query = `*[_type == "order" && _id == $orderId][0]`;
        const data = await client.fetch(query, { orderId });

        if (!data) {
          throw new Error("Order not found");
        }

        setOrder(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!order) {
    return <p className="text-red-500">Order data is missing.</p>;
  }

  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Details</h1>
      </div>
      <div className="flex flex-col gap-2 border rounded-lg p-4 bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <h3 className="bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase">
              {order.paymentMethod}
            </h3>
            <h3 className="bg-green-100 text-green-500 text-xs rounded-lg px-2 py-1 uppercase">
              {order.status ?? "pending"}
            </h3>
            <h3 className="text-green-600"> &#163; {order.total}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {order.products.map((product, index) => (
            <div key={index} className="flex gap-2 items-center">
              <h1>{product.productTitle}</h1>
              <h1 className="text-gray-500 text-xs">
              &#163; {product.price} <span>X</span> <span>{product.quantity}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-semibold">Address</h1>
      <div className="flex flex-col gap-2 border rounded-lg p-4 bg-white">
        <table>
          <tbody>
            <tr>
              <td>Street Address</td>
              <td>{order.shippingAddress.streetAddress}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{order.shippingAddress.city}</td>
            </tr>
            <tr>
              <td>Zip Code</td>
              <td>{order.shippingAddress.zipCode}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{order.shippingAddress.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{order.shippingAddress.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
