import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { PiBooksLight } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { Context } from '../context/GlobalContext';
import DropDownMenu from '../components/DropDownMenu';

const Header = () => {
  const [activeNav, setActiveNav] = useState(false)
  const [menu, setMenu] = useState(false);
  const {user, isAuth, loading} = useContext(Context)
  const location = useLocation(); 

  const handleChange = () => {
    setMenu(!menu);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const changeHeaderBgColor = () => {
      if(window.scrollY >= 82)
        setActiveNav(true)
      else
        setActiveNav(false)
    }

    window.addEventListener('scroll', changeHeaderBgColor)
    return () => {
      window.removeEventListener('scroll',changeHeaderBgColor)
    }
  }, [])


  const linkStyle = 'p-2 transition-colors duration-300';
  const activeStyle ='border-b-2 ';
  const activeNaveStyle = activeNav || location.pathname !== '/' || loading? 'bg-black shadow-[0_3px_10px_rgb(0,0,0,0.2)]':''
  const buttonStyle = 'px-6 py-1 border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all rounded-full flex justify-center items-center lg:w-[170px] h-[43px] disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-auto'
  const buttonActiveStyle = 'px-6 py-1 border-2 bg-primaryColor text-white h-[43px] transition-all rounded-full flex justify-center items-center'

  return (
    <header className={`z-[1000] h-[83px] flex lg:flex-row justify-between item-center lg:px-10 fixed w-full top-0 left-0 ${activeNaveStyle}`}>
      <div className="p-[8px] items-center text-[40px] text-white font-bold cursor-pointer flex">
        <PiBooksLight  /> 
        <Link className='' to={'/'}>
           Cafe<strong className='text-primaryColor'>X</strong>
        </Link>
      </div>
      <div className="p-5 ssm:hidden md:flex justify-between items-center gap-10 text-white font-bold">
        <Link to="/" className={`${linkStyle} ${isActive('/') ? activeStyle : ''}`}>Home</Link>
        <Link to="/cafes" className={`${linkStyle} ${isActive('/cafes') ? activeStyle : ''}`}>Cafes</Link>
        <Link to="/events" className={`${linkStyle} ${isActive('/events') ? activeStyle : ''}`}>Events</Link>
        <Link to="/about" className={`${linkStyle} ${isActive('/about') ? activeStyle : ''}`}>About</Link>
        {!isAuth && <Link to="/auth/login" className={`${linkStyle} ${isActive('/auth/login') || location.pathname === '/auth/signup' ? buttonActiveStyle : buttonStyle}`}>Sign Up / Login</Link>}
       <Link to={'/cart'}>
        <IoCartOutline className='size-[30px] hover:text-primaryColor cursor-pointer'/>
       </Link> 
       {isAuth && <DropDownMenu/>}
      </div>

      <div className="md:hidden flex items-center text-white">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <RxHamburgerMenu size={25} onClick={handleChange} />
            )}
      </div>

      <div
          className={` ${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col items-center absolute bg-black h-screen text-white left-0 top-[70px] font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full  transition-transform duration-300`}
        >
          <Link to="/" className={`${linkStyle} ${isActive('/') ? activeStyle : ''}`}>Home</Link>
          <Link to="/cafes" className={`${linkStyle} ${isActive('/cafes') ? activeStyle : ''}`}>Cafes</Link>
          <Link to="/events" className={`${linkStyle} ${isActive('/events') ? activeStyle : ''}`}>Events</Link>
          <Link to="/about" className={`${linkStyle} ${isActive('/about') ? activeStyle : ''}`}>About</Link>
          {!isAuth && <Link to="/auth/login" className={`${linkStyle} ${isActive('/auth/login') || location.pathname === '/auth/signup' ? buttonActiveStyle : buttonStyle}`}>
            Sign Up / Login</Link>
            }
          <Link to={'/cart'}>
            <IoCartOutline className='size-[30px] hover:text-primaryColor cursor-pointer'/>
          </Link> 
          <Link to={'/user/profile/account'} className="flex cursor-pointer">
          {isAuth ? user?.profileImage?
            <div className='hover:text-primaryColor cursor-pointer flex justify-center'>
              <img className='size-[50px] rounded-full' src={user?.profileImage}/> 
            </div>
              :
            <div className='hover:text-primaryColor cursor-pointer flex justify-center'>
              <CgProfile className='size-[50px] rounded-full'/>
            </div>
              :'' }
          </Link>
      </div>
    </header>
  );
}

export default Header;


