"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../interface";

// Create a context to store product data
const ProductContext = createContext<{ products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>> }>({
  products: [],
  setProducts: () => {},
});

// Create a context provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use product context
export const useProducts = () => {
  return useContext(ProductContext);
};
