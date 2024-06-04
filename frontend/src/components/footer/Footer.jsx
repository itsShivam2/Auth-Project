import React from "react";
import { Link } from "react-router-dom";
import * as IconsAndImages from "../../Assets/IconsAndImages";

function Footer() {
  return (
    <div>
      <footer className="grid grid-row-4 items-center justify-center sm:grid-rows-2 sm:grid-cols-2 sm:justify-start sm:content-start lg:grid-cols-4 lg:grid-rows-1 gap-2 box-border p-1 border-solid border-[#e5e7eb] bg-black text-white">
        <div className="flex flex-wrap flex-col justify-center items-center sm:items-start m-4 p-4 text-center max-w-[250px] flex-1">
          <div className="flex flex-col items-start text-[#d9d9d9]">
            <div className="font-lg my-5 text-left">
              <div className="flex flex-wrap content-center justify-center sm:justify-start items-center gap-2">
                <img
                  src={IconsAndImages.shopaholic}
                  alt="Trend-Bazaar"
                  width="58"
                  height="40"
                />
                <h2 className="text-xl font-[400] font-[Fahkwang] text-white">
                  Trend Bazaar
                </h2>
              </div>
              <p className="font-base text-center sm:text-left font-[Montserrat] m-0">
                Pulvinar aenean dignissim porttitor sed risus urna, pretium quis
                non id.
              </p>
            </div>
            <div className="w-full sm:w-auto flex items-center justify-center gap-6">
              <a href="#">
                <IconsAndImages.FaInstagram className="text-2xl" />
              </a>
              <a href="#">
                <IconsAndImages.FaFacebook className="text-2xl" />
              </a>
              <a href="#">
                <IconsAndImages.FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-center items-center sm:items-start m-4 p-4 text-center max-w-[250px] flex-1">
          <div className="flex flex-col items-center sm:items-start text-[#d9d9d9]">
            <h2 className="text-xl font-[400] font-[Fahkwang] text-white">
              Information
            </h2>
            <ul className="text-white text-center sm:text-left font-[Montserrat]">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/about">Awards</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-center items-center sm:items-start m-4 p-4 text-center max-w-[250px] flex-1">
          <div className="flex flex-col items-start text-[#d9d9d9]">
            <h2 className="text-xl font-[400] font-[Fahkwang] text-white">
              Discover
            </h2>
            <ul className="text-white text-center sm:text-left font-[Montserrat]">
              <li>
                <Link to="/products">Dresses</Link>
              </li>
              <li>
                <Link to="/products">Bottoms</Link>
              </li>
              <li>
                <Link to="/products">Footwear</Link>
              </li>
              <li>
                <Link to="/products">Accessories</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-center items-center sm:items-start m-4 p-4 text-center max-w-[250px] flex-1">
          <div className="flex flex-col items-center sm:items-start text-[#d9d9d9]">
            <h2 className="text-xl font-[400] font-[Fahkwang] text-white">
              Locate Us
            </h2>
            <ul className="text-white text-center sm:text-left font-[Montserrat]">
              <li>123 Karol Bagh, New Delhi, India</li>
              <li>+91 123-456-7890</li>
              <li>shopaholic@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="flex justify-center items-center pb-4 text-white font-[Montserrat] bg-black">
        <span>© 2023 Trend Bazaar. Developed by Shivam Gupta</span>
      </div>
    </div>
  );
}

export default Footer;
