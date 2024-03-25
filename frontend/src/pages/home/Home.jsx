import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

function Home() {
  return (
    <Layout>
      <div className="min-h-full">
        <div className="flex gap-2">
          <Link to="/about">About</Link>
          <Link to="contact">contact</Link>
          <Link to="signup">signup</Link>
          <Link to="login">login</Link>
          <Link to="profile">profile</Link>
          <Link to="admin">admin</Link>
          <Link to="products">products</Link>
          <Link to="add-product">add-product</Link>
          <Link to="update-profile">update-profile</Link>
          <Link to="cart">cart</Link>
          <Link to="checkout">checkout</Link>
          <Link to="products/:id">products id</Link>
        </div>

        {/* Hero Section */}
        <section className="bg-gray-200 py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome to our Store!</h2>
              <p className="text-lg">
                Discover amazing products at great prices.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Products</h3>
                <p className="text-lg">
                  Explore a wide range of products including electronics,
                  clothing, accessories, and more.
                </p>
              </div>
              <div>
                <img
                  src="/images/products.jpg"
                  alt="Products"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
