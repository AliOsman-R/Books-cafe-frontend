import { GoPerson } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";

export const sidebarList = [
    {name:'My Profile', icon:<GoPerson/>, path:'account'}, 
    {name:'Orders', icon:<AiOutlineShopping/>, path:'orders'} , 
    {name:'Reviews', icon:<MdOutlineRateReview/>, path:'reviews'}]