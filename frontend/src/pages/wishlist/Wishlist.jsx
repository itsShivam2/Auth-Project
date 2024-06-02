import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:7400/api/v1/user/wishlist",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setWishlist(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching wishlist");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <Layout>
      <div className="w-full p-6">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-4xl text-center font-[Fahkwang] font-bold m-4">Your Wishlist</h2>
        {loading && (
          <div className="flex justify-center items-center w-full h-60">
            <Loader />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {wishlist.map((item) => (
            <div key={item._id} className="shadow-lg p-4">
              <Link to={`/products/${item._id}`}>
                <div className="w-full rounded-md  hover:opacity-75">
                  <img
                    src={item.productImage}
                    alt={item.name}
                    className="object-cover lg:h-50 lg:w-48 hover:scale-110 duration-500"
                  />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row justify-between">
                  <h3 className="font-[Montserrat] text-sm text-gray-900">
                    {item.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Wishlist;

//
{
  /* <Link to={`/productItem/${product.id}`} onClick={scrollToTop}>
  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80 sm:h-80">
    <img
      src={item.productImage}
      alt={item.name}
      className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:scale-110 duration-500"
    />
  </div>
  <div className="mt-4 flex flex-col sm:flex-row justify-between">
    <h3 className="font-[Montserrat] text-sm text-gray-900">{item.name}</h3>
    <div className="flex gap-2 justify-between">
      <p className="font-[Montserrat] text-sm font-medium text-gray-900 line-through">
        ₹{item.oldPrice}
      </p>
      <p className="font-[Montserrat] text-sm font-medium text-gray-900">
        ₹{item.newPrice}
      </p>
    </div>
  </div>
  <div className="mt-4 flex justify-center w-full">
    <button
      type="button"
      className="flex items-center justify-center w-full py-3 font-[Fahkwang] text-white font-medium text-sm rounded-lg cursor-pointer bg-gray-700 hover:bg-sky-950 transform-transition duration-1000 focus:outline-none hover:drop-shadow-lg"
    >
      Shop Now
    </button>
  </div>
</Link>; */
}
