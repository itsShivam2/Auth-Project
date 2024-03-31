import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { Header, CategoryButtons, ProductCard } from "./components/Index";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7400/api/v1/product/all-products");
        console.log("products", response);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    currentCategory === "all"
      ? products
      : products.filter((product) => product.category === currentCategory);

  return (
    <div>
      <Layout>
        <Header />
        <CategoryButtons setCurrentCategory={setCurrentCategory} />
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 mb-8">
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Products;
