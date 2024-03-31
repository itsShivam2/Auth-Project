import React from 'react';
import * as IconsAndImages from "../../../Assets/IconsAndImages";
import SocialMediaLinks from './SocialMediaLinks';

const StayInTouch = () => (
  <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
    <h2 className="font-[Fahkwang] text-5xl font-semibold py-2 my-2">
      Stay In Touch
    </h2>
    <p className="font-[Montserrat] text-base">
      Faucibus parturient dignissim nisi, magna ullamcorper facilisi tincidunt
      nulla et morbi sed risus vestibulum consectetur arcu pulvinar.
    </p>
    <h3 className="font-[Fahkwang] font-semibold text-2xl py-2 my-2">
      Customer Services
    </h3>
    <div className="flex items-center gap-4">
      <IconsAndImages.MdEmail />
      <span className="font-[Montserrat] text-base">
        shopaholic@gmail.com
      </span>
    </div>
    <div className="flex items-center gap-4">
      <IconsAndImages.FaPhoneFlip />
      <span className="font-[Montserrat] text-base">+91 1234567890</span>
    </div>
    <div className="flex items-center gap-4">
      <IconsAndImages.FaClock />
      <span className="font-[Montserrat] text-base">
        Mon - Sat <br />
        10:00 AM - 6:00 PM
      </span>
    </div>
    <SocialMediaLinks />
  </div>
);

export default StayInTouch;
