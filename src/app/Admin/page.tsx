"use client";
import { useEffect, useState } from "react";
import { useProducts } from "../../../Context/ProductContext";  // Import the custom hook

const Dashboard = () => {
  const { products } = useProducts();  // Access products from context
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [categoryWiseAmount, setCategoryWiseAmount] = useState<any>({});

  useEffect(() => {
    let total = 0;
    let totalQuantity = 0;
    let categoryAmounts: { [key: string]: number } = {};

    products.forEach((product) => {
      total += product.stock * product.price;
      totalQuantity += product.stock;

      if (categoryAmounts[product.categoryName]) {
        categoryAmounts[product.categoryName] += product.stock * product.price;
      } else {
        categoryAmounts[product.categoryName] = product.stock * product.price;
      }
    });

    setTotalAmount(total);
    setTotalStock(totalQuantity);
    setCategoryWiseAmount(categoryAmounts);
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 md:ml-64 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
        Dashboard - Avion
      </h1>

      {/* Total Products and Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-700">
            Total Products Amount
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-green-700 mt-4">
            €{totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-700">
            Total Stock Quantity
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-blue-900 mt-4">
            {totalStock}
          </p>
        </div>
      </div>

      {/* Category-Wise Total Amount */}
      <div className="mt-8 bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 text-center">
          Category-Wise Total Amount
        </h2>
        <div className="space-y-4">
          {Object.keys(categoryWiseAmount).map((category) => (
            <div
              key={category}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="text-sm md:text-lg font-semibold">
                {category.toUpperCase()}
              </span>
              <span className="text-sm md:text-lg font-bold text-blue-900">
                €{categoryWiseAmount[category].toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
