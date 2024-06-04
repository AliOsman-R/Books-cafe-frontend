import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../context/GlobalContext';
import { MdArrowDropDown } from 'react-icons/md';
// import { CgProfile } from 'react-icons/cg';
import { MdOutlineDashboard } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { sidebarUserList } from '../data/data';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { BtnLoader } from './LoaderSpinner';
import { MdKeyboardArrowRight } from "react-icons/md";
import defaultUserImage from '../assets/default-user-image.jpg';
import { MdArrowDropUp } from "react-icons/md";
import { httpRequest } from '../utils/httpsRequest';
import { toast } from 'sonner';
import { CiShop } from 'react-icons/ci';

const DropDownMenu = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [openedMenu, setOpenedMenu] = useState(false);
    const { user, actions } = useContext(Context);
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const profileRef = useRef(null);

    const linkStyle = 'group flex items-center gap-3 text-sm px-3 py-2 pl-0 font-normal hover:font-bold';
    const arrowStyle = 'transition-transform duration-500 group-hover:translate-x-[7px]';

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setOpenedMenu(!openedMenu);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && !profileRef.current.contains(event.target)) {
            setOpenedMenu(false);
        }
    };

    const handleLogout = () => {
        setBtnLoading(true);
        httpRequest.post('/auth/logout')
        .then(data => {
          toast.success("Logged out successfully");
          actions({ type: 'SET_IS_AUTH', payload: false });
          actions({ type: 'SET_USER', payload: {} });
          navigate('/auth/login');
          console.log(data);
        })
        .catch(err => {
          toast.error('Something went wrong!');
          console.log('err: ', err);
        })
        .finally(() => setBtnLoading(false));
    };

  return (
    <div className="">
        <div className="flex cursor-pointer" ref={profileRef} onClick={handleClick}>
            <div className='hover:text-primaryColor cursor-pointer flex justify-center'>
                <img className='size-[35px] rounded-full' src={user?.profileImage || defaultUserImage}/> 
                {openedMenu?<MdArrowDropDown size={20}/> : <MdArrowDropUp size={20}/>}
            </div>
        </div>
        <div ref={menuRef} className={`absolute top-full right-[65px]  mt-2 min-w-[250px] shadow-lg  max-h-0 z-[1000] overflow-hidden transition-max-height duration-500 ${openedMenu ? 'max-h-[400px]' : ''}`}>
            <div className="bg-white p-3 rounded-sm border border-gray-200 text-black">
                <div className="flex items-center justify-center gap-3 p-3 border-b border-gray-400">
                    <h1>Profile Settings</h1>
                </div>
                <div className="flex flex-col">
                    {sidebarUserList.map(item => (
                        <div className="flex flex-col" key={uuidv4()}>
                            <Link to={`/user/profile/manage-user/${item.path}`} className={`${linkStyle}`}>
                                <span className=' bg-gray-200 rounded-full p-2'>{item.icon}</span>
                                <p className='w-full'>{item.name}</p>
                                <MdKeyboardArrowRight className={`${arrowStyle}`} size={30}/>
                            </Link>
                        </div>
                    ))}
                    {user.role === 'owner'&& (
                        <div className="flex flex-col" key={uuidv4()}>
                            <Link to={`/user/profile/manage-cafe/cafe-dashboard`} className={`${linkStyle}`}>
                                <span className=' bg-gray-200 rounded-full p-2'><MdOutlineDashboard/></span>
                                <p className='w-full'>Dashboard</p>
                                <MdKeyboardArrowRight className={`${arrowStyle}`} size={30}/>
                            </Link>
                        </div>
                    )}
                    <button className={`${linkStyle} h-[46px]`} disabled={btnLoading} onClick={handleLogout}>
                        <span className=' bg-gray-200 rounded-full p-2'><IoIosLogOut/></span>
                        <p className='w-full text-left'>{btnLoading? <BtnLoader colorBtn='black' size={10}/> : 'Logout'}</p>
                        <MdKeyboardArrowRight className={`${arrowStyle}`} size={30}/>
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
};

export default DropDownMenu;
