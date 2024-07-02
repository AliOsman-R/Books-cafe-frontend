import { GoPerson } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { PiShoppingBagOpen } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import { GoCodeReview } from "react-icons/go";
import { CiShop } from "react-icons/ci";
import { BiChat } from "react-icons/bi";


export const sidebarUserList = [
  { name: "My Profile", icon: <GoPerson />, path: "user-account" },
  { name: "My Orders", icon: <AiOutlineShopping />, path: "orders" },
  { name: "My Reviews", icon: <MdOutlineRateReview />, path: "reviews" },
  { name: "My Chat", icon: <BiChat />, path: "chat" },
];

export const sidebarCafeList = [
  { name: "Dashboard", icon: <MdDashboard />, path: "cafe-dashboard" },
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


export const sampleReviews = [
  {
    rating: 4.5,
    comment: "This cafe has a great atmosphere and delicious coffee!",
    createdAt: "2024-04-27T10:00:00Z",
    reviewableType: "Cafe",
    user: {
      username: "example_user_1"
    }
  },
  {
    rating: 5,
    comment: "The book was incredibly well-written and engaging!",
    createdAt: "2024-04-26T14:30:00Z",
    reviewableType: "Book",
    user: {
      username: "example_user_2"
    }
  },
  {
    rating: 3,
    comment: "The menu had a good variety of options but the service was slow.",
    createdAt: "2024-04-25T09:45:00Z",
    reviewableType: "Menu",
    user: {
      username: "example_user_3"
    }
  },
  {
    rating: 3,
    comment: "The menu had a good variety of options but the service was slow.",
    createdAt: "2024-04-25T09:45:00Z",
    reviewableType: "Menu",
    user: {
      username: "example_user_3"
    }
  }
];
