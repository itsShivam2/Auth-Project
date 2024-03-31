import React from "react";
import Layout from "../../components/layout/Layout";
import * as IconsAndImages from "../../Assets/IconsAndImages";
import Testimonial from "./Testimonial";
import {BestFeatureSection} from "../../components/bestFeatureSection/Index";
import {NewsletterFeatureSection} from "../../components/newsletterFeatureSection/Index";

function About() {
  const testimonialsData = [
    {
      content:
        "Tincidunt dui ut ornare lectus. Sit amet dictum sit amet. Eu mi bibendum neque egestas congue quisque egestas diam. Gravida in fermentum et sollicitudin ac orci. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Odio aenean sed adipiscing diam.",
      userImage: IconsAndImages.user1,
      userName: "NEHA GUPTA",
    },
    {
      content:
        "Tincidunt dui ut ornare lectus. Sit amet dictum sit amet. Eu mi bibendum neque egestas congue quisque egestas diam. Gravida in fermentum et sollicitudin ac orci. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Odio aenean sed adipiscing diam.",
      userImage: IconsAndImages.user2,
      userName: "AMIT KUMAR",
    },
    {
      content:
        "Sit amet cursus sit amet. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Tellus at urna condimentum mattis. In cursus turpis massa tincidunt. Mauris a diam maecenas sed enim ut sem viverra. Pharetra convallis posuere morbi leo urna.",
      userImage: IconsAndImages.user4,
      userName: "SHAURYA SINGH",
    },
    {
      content:
        "Sit amet cursus sit amet. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Tellus at urna condimentum mattis. In cursus turpis massa tincidunt. Mauris a diam maecenas sed enim ut sem viverra. Pharetra convallis posuere morbi leo urna.",
      userImage: IconsAndImages.user3,
      userName: "RIYA SHARMA",
    },
  ];

  return (
    <div>
      <Layout>
        <div className="my-8">
          <h1 className="text-[4rem] sm:text-[8rem] font-[Fahkwang] text-left md:text-center px-8 pt-8">
            About
          </h1>
          <hr className="border-t border-gray-800 mb-6 mx-8" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-8 pt-8 gap-8">
            <div className="w-4/5">
              <span className="block w-1/5 h-1 bg-[#0084D6]"></span>
              <h2 className="font-[Fahkwang] font-semibold text-4xl text-left my-4">
                Who We Are
              </h2>
              <p className="font-[Montserrat] text-base text-left my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nam
                nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris
                vitae erat consequat auctor eu in elit.
              </p>
            </div>
            <div>
              <img src={IconsAndImages.about} />
            </div>
          </div>
          
          <h2 className="w-full text-[3rem] sm:text-[5rem] font-[Fahkwang] text-left px-8 pt-8 mt-4">
            Testimonials
          </h2>

          <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 px-8 pt-8 gap-16">
            {testimonialsData.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>

          <BestFeatureSection />

          <NewsletterFeatureSection/>
          

        </div>
      </Layout>
    </div>
  );
}

export default About;
