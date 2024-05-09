import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiBooksLight } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import defaultUserImage from '../assets/default-user-image.jpg';
import { Context } from "../context/GlobalContext";
import DropDownMenu from "../components/DropDownMenu";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [activeNav, setActiveNav] = useState(false);
  const { user, isAuth, loading } = useContext(Context);
  const location = useLocation();

  const toggleMenu = () => setMenu(!menu);

  useEffect(() => {
    const changeHeaderBgColor = () => {
      setActiveNav(window.scrollY >= 82);
    };

    window.addEventListener("scroll", changeHeaderBgColor);
    return () => {
      window.removeEventListener("scroll", changeHeaderBgColor);
    };
  }, []);
  
  const activeNavStyle = activeNav || location.pathname !== "/" || loading
  ? "bg-[#000000e3]  shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
  : "";


  return (
    <header className={`z-[1000] h-[83px] flex lg:flex-row justify-between item-center lg:px-10 fixed w-full top-0 left-0 ${activeNavStyle}`}>
      <div className="p-[8px] items-center text-[40px] text-white font-bold cursor-pointer flex">
        <PiBooksLight />
        <Link className="" to={"/"}>
          Cafe<strong className="text-primaryColor">X</strong>
        </Link>
      </div>
      <div className="p-5 ssm:hidden md:flex justify-between items-center gap-10 text-white font-bold">
        <NavBar isAuth={isAuth} location={location}/>
        {isAuth && <DropDownMenu />}
      </div>

      <div className="md:hidden flex items-center text-white">
        {menu ? (
          <AiOutlineClose size={25} onClick={toggleMenu} />
        ) : (
          <RxHamburgerMenu size={25} onClick={toggleMenu} />
        )}
      </div>
      <div className={` ${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col items-center absolute bg-black bg-[#000000e3]  h-screen text-white left-0 top-[70px] font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full  transition-transform duration-300`}>
        <NavBar isAuth={isAuth} location={location}/>
        <Link to={"/user/profile/user-account"} className="flex cursor-pointer">
          {isAuth && (
            <div className="hover:text-primaryColor cursor-pointer flex justify-center">
              <img className="size-[50px] rounded-full" src={user?.profileImage || defaultUserImage} />
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};


const NavBar = ({isAuth, location}) => {
  const {cartItems} = useContext(Context)
  const isActive = (path) => location.pathname === path;
  const linkStyle = "p-2 transition-colors duration-300";
  const activeStyle = "border-b-2 ";
  const buttonStyle = "px-6 py-1 border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all rounded-full flex justify-center items-center disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-auto";
  const buttonActiveStyle = "px-6 py-1 border-2 bg-primaryColor text-white  transition-all rounded-full flex justify-center items-center";

  return (
    <>
      <Link to="/" className={`${linkStyle} ${isActive("/") ? activeStyle : ""}`}>Home</Link>
      <Link to="/cafes" className={`${linkStyle} ${isActive("/cafes") ? activeStyle : ""}`}>Cafes</Link>
      <Link to="/events" className={`${linkStyle} ${isActive("/events") ? activeStyle : ""}`}>Events</Link>
      <Link to="/about" className={`${linkStyle} ${isActive("/about") ? activeStyle : ""}`}>About</Link>
      {!isAuth && (
        <Link to="/auth/login" className={`${linkStyle} ${isActive("/auth/login") || location.pathname === "/auth/signup" ? buttonActiveStyle : buttonStyle}`}>
          Login
        </Link>
      )}
      <Link to={"/cart"} className="relative">
        <IoCartOutline className="size-[30px] hover:text-primaryColor cursor-pointer" />
        <span className="bg-red-500 rounded-[100%] px-[5px] py-[1px] text-xs text-center absolute top-[-5px] right-[-5px]">{isAuth? cartItems.length: 0}</span>
      </Link>
    </>
  )

}

export default Header;



