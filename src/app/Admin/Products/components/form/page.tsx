"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BasicDetails, { ProductData } from "./BasicDetails";
import Images from "./Images";

export default function Page() {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<ProductData>({
    name: "",
    price: 0,
    quantity: 0,
    category: "",
  });

  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // ✅ Extract "id" from URL without using useSearchParams()
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("id");
      setId(productId);
    }
  }, []);

  // ✅ Fetch product details if "id" exists (for edit mode)
  useEffect(() => {
    if (id) {
      setIsFetching(true);
      fetch(`/api/products?id=${id}`)
        .then((res) => res.json())
        .then((product) => {
          setData(product);
          setIsFetching(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setIsFetching(false);
        });
    }
  }, [id]);

  // ✅ Update data when input changes
  const handleData = (key: keyof ProductData, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // ✅ Create new product
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          image: featureImage || "",
        }),
        headers: { "Content-Type": "application/json" },
      });

      setData({
        name: "",
        price: 0,
        quantity: 0,
        category: "",
      });
      setFeatureImage(null);
      alert("Product created successfully!");
      router.push("/Admin/Products");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Update existing product
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/products", {
        method: "PUT",
        body: JSON.stringify({
          id,
          ...data,
          image: featureImage,
        }),
        headers: { "Content-Type": "application/json" },
      });

      alert("Product updated successfully!");
      router.push("/Admin/Products");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          handleUpdate();
        } else {
          handleCreate();
        }
      }}
      className="flex flex-col gap-4 p-5"
    >
      <div className="flex justify-between w-full items-center">
        <h1 className="font-semibold">{id ? "Update Product" : "Create New Product"}</h1>
        <button
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          {isLoading ? "Processing..." : id ? "Update" : "Create"}
        </button>
      </div>

      {/* Show loading state when fetching product */}
      {isFetching ? (
        <div className="text-center text-gray-500">Loading product details...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <BasicDetails data={data} handleData={handleData} />
          </div>
          <div className="flex-1">
            <Images data={data} featureImage={featureImage} setFeatureImage={setFeatureImage} />
          </div>
        </div>
      )}
    </form>
  );
}
