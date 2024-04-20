import { GoPerson } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { PiShoppingBagOpen } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import { GoCodeReview } from "react-icons/go";
import { CiShop } from "react-icons/ci";


export const sidebarUserList = [
  { name: "My Profile", icon: <GoPerson />, path: "user-account" },
  { name: "My Orders", icon: <AiOutlineShopping />, path: "orders" },
  { name: "My Reviews", icon: <MdOutlineRateReview />, path: "reviews" },
];

export const sidebarCafeList = [
  { name: "Dashboard", icon: <MdDashboard />, path: "dashboard" },
  { name: "Cafe", icon: <CiShop />, path: "cafe-account" },
  { name: "List", icon: <CiBoxList />, path: "cafe-list" },
  { name: "Orders", icon: <PiShoppingBagOpen />, path: "cafe-orders" },
  { name: "Reviews", icon: <GoCodeReview />, path: "cafe-reviews" },
];


export const states = [
  "Kuala Lumpur",
  "Kedah",
  "Kelantan",
  "Malacca",
  "Negeri Sembilan",
  "Pahang",
  "Penang",
  "Perak",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Johor",
  "Labuan",
  "Putrajaya",
];

