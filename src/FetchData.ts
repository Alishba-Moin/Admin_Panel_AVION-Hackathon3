"use client";
import { useEffect } from "react";
import { useProducts } from "../Context/ProductContext";  // Import the context hook
import { client } from "./sanity/lib/client";  // Sanity client

const DataFetching = () => {
  const { setProducts } = useProducts();  // Get the setProducts function from context

  useEffect(() => {
    const dataFetching = async () => {
      try {
        const query = `*[_type == "product"]{
         _id,
          name,
          price,
          description,
          dimensions,
          image {
           asset->{
              _id,
               url
            }
       },
          features
        }`;

        // Fetch the data from Sanity
        const fetchedProducts = await client.fetch(query);

        // Update the state in context
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    dataFetching();
  }, [setProducts]);  // Dependency array ensures useEffect runs only once

  return null;
};

export default DataFetching;
