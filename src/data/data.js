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


// const books =  [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald jnasdkjasdjnasjdknasjkdnskjd",
//     genre: "Classic",
//     // price: 10.99,
//     description: "A portrait of the Jazz Age in all of its decadence and excess...",
//     // stock: 5,
//     publishYear: 1925,
//     availability:'Reading',
//     isAvailable:'Available',
//     averageRating:4,
//     images: [{ url: "https://i.etsystatic.com/51060618/r/il/53fc43/5947933559/il_680x540.5947933559_nohe.jpg" }]
//   },
//   {
//     id: 2,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Fiction",
//     price: 8.99,
//     description: "A novel about the roots of human behavior - innocence and experience...",
//     stock: 0,
//     averageRating:2.5,
//     availability:'Selling',
//     publishYear: 1960,
//     images: [{ url: "https://i.etsystatic.com/42261898/r/il/6324f4/5878688462/il_680x540.5878688462_q7zv.jpg" }]
//   },
//   {
//     id: 3,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Fiction",
//     price: 8.99,
//     description: "A novel about the roots of human behavior - innocence and experience...",
//     stock: 0,
//     averageRating:2.5,
//     availability:'Selling',
//     publishYear: 1960,
//     images: [{ url: "https://i.etsystatic.com/42261898/r/il/6324f4/5878688462/il_680x540.5878688462_q7zv.jpg" }]
//   },
// ];


// {
//   _id: 1,
//   name: "Grilled Chicken Sandwich",
//   isCountable: true,
//   type: "Sandwich",
//   price: 8.99,
//   averageRating:4.5,
//   description: "Juicy grilled chicken breast topped with lettuce, tomato, and mayo on a toasted bun. sabdjkasdjasdnkjsndkjskjdnjsdnkjasndksajdnksjdnsadksdksadljaskdslnkd",
//   ingredients: ["Grilled chicken breast", "Lettuce", "Tomato", "Mayo", "Toasted bun"],
//   stock: 0,
//   images: [{ url: "https://picsum.photos/400/300?random=1" }]
// },
// {
//   _id: 2,
//   name: "Margherita Pizza",
//   isCountable: true,
//   type: "Pizza",
//   price: 12.99,
//   averageRating:5,
//   description: "Classic pizza topped with tomato sauce, fresh mozzarella cheese, and basil leaves.",
//   ingredients: ["Tomato sauce", "Fresh mozzarella cheese", "Basil leaves"],
//   stock: 5,
//   images: [{ url: "https://picsum.photos/400/300?random=2" }]
// },
// {
//   _id: 3,
//   name: "Iced Caramel Macchiato",
//   isCountable: false,
//   status:"Not Available",
//   type: "Beverage",
//   price: 4.49,
//   averageRating:3,
//   description: "Rich espresso combined with creamy milk and sweet caramel syrup, served over ice.",
//   ingredients: ["Espresso", "Milk", "Caramel syrup", "Ice"],
//   images: [{ url: "https://picsum.photos/400/300?random=3" }]
// },
// ];