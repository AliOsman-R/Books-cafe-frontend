import { BiCart } from 'react-icons/bi';
import { MdOutlinePointOfSale } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const cafeInitialState ={
    name: '',
    phoneNumber: '',
    state: 'Kuala Lumpur',
    city: '',
    address: '',
    bio: '',
    latitude:'',
    longitude:'',
    orderMethods:{delivery:false, pickUpAtCafe:false},
    deliveryFee:0,
    deliveryEst:''
  }
  
  export const userInitialState = {
    name: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
    firstAddress: "",
    secondAddress: ""
  };
  
  export const bookInitialState = {
    title: '',
    author: '',
    genre: '',
    price: 0,
    description: '',
    stock: 0,
    publishYear: 0,
    images: [],
    bookPlaceImages: [],
    availability: 'Selling',
    status:'Available'
  }


  export const menuInitialState = {
    name: '',
    type: '',
    status: 'Available',
    price: 0,
    isCountable:true,
    description: '',
    stock: 0,
    ingredients: [],
    images: [],
  }

  export const eventInitialState = {
    title: '',
    location: '',
    date: new Date(),
    startTime: '',
    endTime:'',
    description: '',
    images: [],
  }

  export const topDashboardInitialState = [
    {
      icon:<BiCart size={40}/>,
      mainText:'Orders Received',
      mainData:0,
      secondaryText:'Orders Compeleted',
      secondaryData:0,
      mainColor:'bg-gradient-to-r from-blue-500 to-blue-400'
    },
    {
      icon:<MdOutlinePointOfSale size={40}/>,
      mainText:'Total Sales',
      mainData:0,
      secondaryText:'This Month',
      secondaryData:0,
      mainColor:'bg-gradient-to-r from-green-500 to-green-400'
    },
    {
      icon:<MdOutlineInventory2 size={40}/>,
      mainText:'Inventory',
      mainData:0,
      secondaryText:'Books: 0',
      secondaryData:'Menu: 0',
      mainColor:'bg-gradient-to-r from-red-500 to-red-400'
    },
    {
      icon:<RiMoneyDollarCircleLine size={40}/>,
      mainText:'Total Revenue',
      mainData:0 + ' RM',
      secondaryText:'This Month',
      secondaryData:0 + ' RM',
      mainColor:'bg-gradient-to-r from-orange-500 to-orange-400'
    },
  ]
