import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  searchProducts,
} from "../../redux/product/actions/productActions";
import Layout from "../../components/layout/Layout";
import { Header, ProductCard } from "./components/Index";
import Loader from "../../components/loader/Loader";

function Products() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = () => {
    const query = {};
    if (searchQuery) query.name = searchQuery;
    if (category) query.category = category;
    if (minPrice) query.minPrice = minPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    if (minRating) query.minRating = minRating;
    if (sortBy) query.sortBy = sortBy;
    query.order = order;
    dispatch(searchProducts(query));
  };

  return (
    <div>
      <Layout>
        <Header />
        <div className="w-full flex flex-wrap flex-col sm:flex-row justify-between items-center gap-0 sm:gap-4 p-4 bg-gray-100 font-[Montserrat]">
          <div className="w-full flex-1 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search products"
              className="border rounded p-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full flex justify-between items-center gap-2">
              <select
                className="border rounded p-2 w-1/2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="womens">Womens</option>
                <option value="mens">Mens</option>
              </select>

              <input
                type="number"
                placeholder="Min Rating"
                className="border rounded p-2 w-1/2"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              />
            </div>

            <div className="w-full flex justify-between items-center gap-2">
              <input
                type="number"
                placeholder="Min Price"
                className="border rounded p-2 w-1/2"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <input
                type="number"
                placeholder="Max Price"
                className="border rounded p-2 w-1/2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="w-full flex justify-between items-center gap-2">
              <select
                className="border rounded p-2 w-1/2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="createdAt">Date</option>
                <option value="newPrice">Price</option>
                <option value="rating">Rating</option>
              </select>

              <select
                className="border rounded p-2 w-1/2"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg-white">
          {loading ? (
            <div className="flex items-center justify-center w-full min-h-48">
              <Loader />
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 mb-8">
              <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
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
