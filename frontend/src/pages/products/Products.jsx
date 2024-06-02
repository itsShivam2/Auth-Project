import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/actions/productActions";
import Layout from "../../components/layout/Layout";
import { Header, CategoryButtons, ProductCard } from "./components/Index";
import Loader from "../../components/loader/Loader";
function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
          {loading ? (
            <div className="flex items-center justify-center w-full min-h-48">
              <Loader />
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 mb-8">
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default Products;
