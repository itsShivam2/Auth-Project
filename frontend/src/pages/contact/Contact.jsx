import React from "react";
import Layout from "../../components/layout/Layout";
import * as IconsAndImages from "../../Assets/IconsAndImages";
import { ContactDetails, Form, StayInTouch} from "./components/Index";
import {BestFeatureSection } from "../../components/bestFeatureSection/Index";
import { NewsletterFeatureSection } from "../../components/newsletterFeatureSection/Index";

function Contact() {
  return (
    <div>
      <Layout>
        <div className="my-8">
          <h1 className="text-[4rem] sm:text-[8rem] font-[Fahkwang] text-left md:text-center px-8 pt-8">
            Contact
          </h1>
          <hr className="border-t border-gray-800 mb-6 mx-8" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between items-start p-8">
            <ContactDetails
              icon={<IconsAndImages.FaLocationDot className="text-2xl mt-1" />}
              title="Head Office"
              details="123 Karol Bagh, New Delhi, India"
            />
            <ContactDetails
              icon={<IconsAndImages.FaPhoneFlip className="text-2xl mt-1" />}
              title="Phone"
              details="+91 123-456-7890"
            />
            <ContactDetails
              icon={<IconsAndImages.MdEmail className="text-2xl mt-1" />}
              title="Email"
              details="shopaholic@gmail.com"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-8">
            <StayInTouch />
            <Form />
          </div>

          <BestFeatureSection />
          <NewsletterFeatureSection />
        </div>
      </Layout>
    </div>
  );
}

export default Contact;
