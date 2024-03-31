import React from 'react';
import * as IconsAndImages from "../../../Assets/IconsAndImages";

const SocialMediaLinks = () => (
  <div className="py-2 my-2">
    <h3 className="font-[Fahkwang] text-2xl font-semibold text-left ">SOCIAL MEDIA</h3>
    <div className="flex gap-8 py-4">
      <IconsAndImages.FaInstagram className="text-2xl hover:cursor-pointer" />
      <IconsAndImages.FaYoutube className="text-2xl hover:cursor-pointer" />
      <IconsAndImages.FaTwitter className="text-2xl hover:cursor-pointer" />
      <IconsAndImages.FaFacebook className="text-2xl hover:cursor-pointer" />
    </div>
  </div>
);

export default SocialMediaLinks;
