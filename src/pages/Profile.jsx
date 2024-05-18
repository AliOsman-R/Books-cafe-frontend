import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import CafeSwitch from "./ManageCafe/Account/CafeSwitch";
import { Context } from "../context/GlobalContext";

const Profile = ({}) => {
  const [menu, setMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const sidebarRef = useRef(null);
  const { user } = useContext(Context)
  const location = useLocation()

  const toggleMenu = () => setMenu(!menu);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenu(false);
      }
    }

    if (menu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  if(user.role !== 'owner' && location.pathname.includes('manage-cafe'))
  {
    return <Navigate to={`/user/profile/manage-user/user-account`} replace />;
  }


  return (
    <div>
      <div className="md:hidden flex items-center text-black">
        <RxHamburgerMenu size={25} onClick={toggleMenu} />
      </div>
      <div ref={sidebarRef} className={`${
          menu ? "translate-x-0" : "-translate-x-full"} border-r shadow-lg z-50 md:hidden overflow-scroll fixed top-[80px] left-0 bottom-0 bg-white border border-gray-300 text-black`}>
        <Sidebar setMenu={setMenu} setOpenModal={setOpenModal} openModal={openModal}/>
      </div>
      <div className="flex flex-grow w-full min-h-[100vh]">
        <div className="flex-2 border-r shadow-lg md:flex ssm:hidden bg-white border border-gray-300 text-black">
          <Sidebar setOpenModal={setOpenModal} openModal={openModal}/>
        </div>
        <div className="flex-1 p-5 px-20">
          <Outlet />
        </div>
        <CafeSwitch setOpenModal={setOpenModal} openModal={openModal} />
      </div>
    </div>
  );
};
//bg-[#1d293e]
export default Profile;
