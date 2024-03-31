import React from "react";
import {
  FaLocationDot,
  FaClock,
  FaPhoneFlip,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTruck,
  FaParachuteBox,
  FaArrowRight,
} from "react-icons/fa6";
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaUser,
  FaCartPlus,
} from "react-icons/fa";
import {
  MdEmail,
  MdPayments,
  MdAssuredWorkload,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

import socials1 from "./IconsImages/socials1.png";
import socials2 from "./IconsImages/socials2.png";
import socials3 from "./IconsImages/socials3.png";
import socials4 from "./IconsImages/socials4.png";
import socials5 from "./IconsImages/socials5.png";
import socials6 from "./IconsImages/socials6.png";
import socials7 from "./IconsImages/socials7.png";
import user1 from "./IconsImages/Testimonial1.jpg";
import user2 from "./IconsImages/Testimonial2.jpg";
import user3 from "./IconsImages/Testimonial3.jpg";
import user4 from "./IconsImages/Testimonial6.jpg";
import about from "./IconsImages/About.jpg";
import cart from "./IconsImages/Cart.svg";
import shopaholic from "./IconsImages/shopaholic.png";
import FashionDesigner from "./IconsImages/Fashion-designer-template.jpg";
import bottoms from "./IconsImages/Bottoms.jpg";
import tops from "./IconsImages/Tops.jpg";
import jeans from "./IconsImages/Jeans.jpg";
import dresses from "./IconsImages/Dresses.jpg";
// import AuthBG1 from "./IconsImages/AuthBG1.jpg";
// import AuthBG2 from "./IconsImages/AuthBG2.jpg";
// import AuthBG3 from "./IconsImages/AuthBG3.jpeg";
// import AuthBG4 from "./IconsImages/AuthBG4.jpg";
// import AuthBG5 from "./IconsImages/AuthBG5.jpg";
// import AuthBG6 from "./IconsImages/AuthBG6.jpg";
// import AuthBG7 from "./IconsImages/AuthBG7.jpg";
// import AuthBG8 from "./IconsImages/AuthBG8.jpeg";
// import AuthBG9 from "./IconsImages/AuthBG9.jpeg";
// import AuthBG10 from "./IconsImages/AuthBG10.jpeg";
// import AuthBG11 from "./IconsImages/AuthBG11.jpeg";
// import AuthBG12 from "./IconsImages/AuthBG12.jpeg";
// import AuthBG13 from "./IconsImages/AuthBG13.jpeg";
// import AuthBG14 from "./IconsImages/AuthBG14.jpeg";
// import AuthBG15 from "./IconsImages/AuthBG15.jpeg";
// import AuthBG16 from "./IconsImages/AuthBG16.jpeg";
// import AuthBG17 from "./IconsImages/AuthBG17.jpeg";
// import AuthBG18 from "./IconsImages/AuthBG18.jpeg";
// import AuthBG19 from "./IconsImages/AuthBG19.jpeg";
// import AuthBG20 from "./IconsImages/AuthBG20.jpeg";
// import AuthBG21 from "./IconsImages/AuthBG21.png";
// import AuthBG22 from "./IconsImages/AuthBG22.png";
// import AuthBG23 from "./IconsImages/AuthBG23.jpeg";
// import AuthBG24 from "./IconsImages/AuthBG24.jpeg";
// import AuthBG25 from "./IconsImages/AuthBG25.jpeg";
// import AuthBG26 from "./IconsImages/AuthBG26.jpeg";
// import AuthBG27 from "./IconsImages/AuthBG27.jpeg";
// import AuthBG28 from "./IconsImages/AuthBG28.jpeg";
// import AuthBG29 from "./IconsImages/AuthBG29.jpeg";
// import AuthBG30 from "./IconsImages/AuthBG30.jpeg";
// import AuthBG31 from "./IconsImages/AuthBG31.jpeg";
// import AuthBG32 from "./IconsImages/AuthBG32.jpeg";
// import AuthBG33 from "./IconsImages/AuthBG33.jpeg";
// import AuthBG34 from "./IconsImages/AuthBG34.jpeg";
// import AuthBG35 from "./IconsImages/AuthBG35.jpeg";
// import AuthBG36 from "./IconsImages/AuthBG36.jpeg";
import AuthBG37 from "./IconsImages/AuthBG37.jpeg";
// import AuthBG38 from "./IconsImages/AuthBG38.jpeg";
// import AuthBG39 from "./IconsImages/AuthBG39.jpeg";
// import AuthBG40 from "./IconsImages/AuthBG40.jpeg";
import UsersIcon from "./IconsImages/UsersIcon.png";
import OrdersIcon from "./IconsImages/OrdersIcon.png";
import ProductsIcon from "./IconsImages/ProductsIcon.png";
import ValueIcon from "./IconsImages/ValueIcon.png";
import FourNotFour from "./IconsImages/FourNotFour.svg";
export {
  FaLocationDot,
  FaClock,
  FaPhoneFlip,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTruck,
  FaParachuteBox,
  FaArrowRight,
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaUser,
  FaCartPlus,
  MdEmail,
  MdPayments,
  MdOutlineProductionQuantityLimits,
  MdAssuredWorkload,
  AiFillShopping,
  AiFillPlusCircle,
  AiFillDelete,
  BiSolidOffer,
  BsArrowRight,
  socials1,
  socials2,
  socials3,
  socials4,
  socials5,
  socials6,
  socials7,
  user1,
  user2,
  user3,
  user4,
  about,
  cart,
  shopaholic,
  FashionDesigner,
  bottoms,
  tops,
  jeans,
  dresses,
  // AuthBG1,
  // AuthBG2,
  // AuthBG3,
  // AuthBG4,
  // AuthBG5,
  // AuthBG6,
  // AuthBG7,
  // AuthBG8,
  // AuthBG9,
  // AuthBG10,
  // AuthBG11,
  // AuthBG12,
  // AuthBG13,
  // AuthBG14,
  // AuthBG15,
  // AuthBG16,
  // AuthBG17,
  // AuthBG18,
  // AuthBG19,
  // AuthBG20,
  // AuthBG21,
  // AuthBG22,
  // AuthBG23,
  // AuthBG24,
  // AuthBG25,
  // AuthBG26,
  // AuthBG27,
  // AuthBG28,
  // AuthBG29,
  // AuthBG30,
  // AuthBG31,
  // AuthBG32,
  // AuthBG33,
  // AuthBG34,
  // AuthBG35,
  // AuthBG36,
  AuthBG37,
  // AuthBG38,
  // AuthBG39,
  // AuthBG40,
  UsersIcon,
  OrdersIcon,
  ProductsIcon,
  ValueIcon,
  FourNotFour
};
