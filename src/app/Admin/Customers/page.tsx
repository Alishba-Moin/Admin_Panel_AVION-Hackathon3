"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string
  }

export default function ListView() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<Error | null>(null);

 
  useEffect(() => {
    const GetCustomers = async () => {
      try {
        const query = `*[_type == "customer"]{ 
        _id,
        name,
        email,
        phone
        }`;
        const products = await client.fetch(query);
        setCustomers(products);
      } catch (error) {
        setError(error as Error);
      }
    };
    GetCustomers();
  }, []);
  
  if (error) return <div>{error instanceof Error ? error.message : "An unknown error occurred"}</div>;

if (error) return <div>{error}</div>;

  return (
    <main className="flex flex-col gap-4 p-5">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">Customers</h1>
    </div>

    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <table className="border-separate border-spacing-y-3 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Name
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Email
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((item, index) => (
            <Row index={index} item={item} key={item._id} />
          ))}
        </tbody>
      </table>
    </div>
  </main>
);
}

function Row({ item, index }: { item: Customer; index: number }) {
return (
  <tr className="bg-white border-b">
    <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
      {index + 1}
    </td>
    <td className="border-y bg-white px-3 py-2">{item?.name}</td>
    <td className="border-y bg-white px-3 py-2">{item?.email}</td>
    <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">
      {item?.phone || "N/A"}
    </td>
  </tr>
  );
}