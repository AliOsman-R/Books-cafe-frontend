import { GoPerson } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import secondaryImage from "../assets/secondary-image.jpg";
import { MdDashboard } from "react-icons/md";
import { PiShoppingBagOpen } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import { GoCodeReview } from "react-icons/go";
import { CiShop } from "react-icons/ci";

export const cafeInitialState ={
  name: '',
  phoneNumber: '',
  state: 'Kuala Lumpur',
  city: '',
  address: '',
  bio: '',
  latitude:'',
  longitude:'',
}

export const userInitialState = {
  name: "",
  email: "",
  phoneNumber: "",
  profileImage: "",
  firstAddress: "",
  secondAddress: ""
};

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

export const cafesData = [
  { image: secondaryImage, title: "CafeX", id: 1, ownerName: "ahmed" },
  { image: secondaryImage, title: "The new cafe", id: 2, ownerName: "ali" },
  { image: secondaryImage, title: "Zus", id: 3, ownerName: "mohammed" },
  { image: secondaryImage, title: "Coffe Cafe", id: 4, ownerName: "ali" },
  { image: secondaryImage, title: "CafeX", id: 5, ownerName: "ahmed" },
  { image: secondaryImage, title: "CafeX", id: 6, ownerName: "salam" },
  { image: secondaryImage, title: "CafeX", id: 7, ownerName: "ali" },
  { image: secondaryImage, title: "CafeX", id: 8, ownerName: "ahmed" },
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

