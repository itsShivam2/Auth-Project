import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { HomeDesignerSection, ExploreMoreButton } from "./components/Index";
import { BestFeatureSection } from "../../components/bestFeatureSection/Index";
import { NewsletterFeatureSection} from "../../components/newsletterFeatureSection/Index";
function Home() {
  return (
    <Layout>
      <div className="min-h-full">
        <div className="flex">
          <Link to="/admin">Admin</Link>
        </div>
        {/* <section className="bg-gray-200 py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome to our Store!</h2>
              <p className="text-lg">
                Discover amazing products at great prices.
              </p>
            </div>
          </div>
        </section> */}

        <HomeDesignerSection />
        <ExploreMoreButton />
        <BestFeatureSection />
        <NewsletterFeatureSection />
        
      </div>
    </Layout>
  );
}

export default Home;
