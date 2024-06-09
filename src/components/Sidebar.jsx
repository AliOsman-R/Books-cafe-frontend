import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoIosLogOut } from "react-icons/io";
import { PiUserSwitchLight } from "react-icons/pi";
import { Context } from "../context/GlobalContext";
import { httpRequest } from "../utils/httpsRequest";
import { toast } from "sonner";
import defaultUserImage from '../assets/default-user-image.jpg';
import { BtnLoader } from "../components/LoaderSpinner";
import { sidebarCafeList, sidebarUserList } from "../data/data";
import { ToggleSwitch } from "./ToggleSwitch ";
import { AiOutlineClose } from "react-icons/ai";
import AlertModal from "./AlertModal";
import { MdDeleteOutline } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import useSwitch from "../hooks/useSwitch";

const Sidebar = ({setMenu, setOpenModal, openModal}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isAccount, setIsAccount] = useState(false)
  const [toggle, setToggle] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const { user, actions } = useContext(Context);
  const {handleSwitchToCustomer, handleSwitchToExistentCafe, alertLoading} = useSwitch()
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname.split("/")[4];
  const isOwner = user.role === 'owner'
  console.log(!isAccount)

  const handleToggle = (e) => {
    setToggle(!toggle);
    if (!toggle && !isOwner && !user.cafeId) setOpenModal(true);

    if(isOwner){
      setIsAccount(false)
      setOpenAlertModal(true)
    }

    if(!isOwner && user.cafeId)
    handleSwitchToExistentCafe(setToggle)
  };

  useEffect(() => {
    if (!openModal) setToggle(false);
  }, [openModal]);

  const handleLogout = () => {
    setBtnLoading(true);
    httpRequest
      .post("/auth/logout")
      .then((data) => {
        toast.success("Logged out successfully");
        actions({ type: "SET_IS_AUTH", payload: false });
        actions({ type: "SET_USER", payload: {} });
        navigate("/auth/login");
        console.log(data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log("err: ", err);
      })
      .finally(() => setBtnLoading(false));
  };

  const handleDeleteAccount = () => {
    setDeleteLoading(true);
    httpRequest
      .delete(`/user/delete-account/${user._id}`)
      .then((data) => {
        toast.success("Account has been deleted successfully");
        actions({ type: "SET_IS_AUTH", payload: false });
        actions({ type: "SET_USER", payload: {} });
        navigate("/auth/login");
        console.log(data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log("err: ", err);
      })
      .finally(() => setDeleteLoading(false));
  };

  const handleAlert = () => {
    if(isAccount){
      handleDeleteAccount()
    }else{
      handleSwitchToCustomer(setToggle, setOpenAlertModal)
    }
  }


  const linkStyle = 
    "p-3 flex items-center gap-2 hover:bg-primaryColor hover:text-white rounded-md";
  const textStyle = "text-sm";

  return (
    <div className="flex-col mb-4">
        <div>
          <div className="flex justify-center items-center pt-2 md:hidden">
            <AiOutlineClose size={25} className="bg-primaryColor text-white rounded-full p-[3px]" onClick={()=>setMenu(false)} />
          </div>
          <div className="flex items-center flex-col gap-2 my-4">
              <img
                src={user?.profileImage || defaultUserImage}
                alt="profile-image"
                className="rounded-full h-[65px] w-[65px]"
              />
            <h1 className="text-md font-semibold truncate">
              {user.name}
            </h1>
          </div>
          <div className="flex flex-col">
              <span className={`${textStyle} text-gray-400 border-b border-gray-300 py-1 px-2`}>Manage Account</span>
              {sidebarUserList.map((item) => (
                <div className="flex flex-col " key={uuidv4()}>
                  <div className="px-2 py-2">
                    <Link
                      to={`/user/profile/manage-user/${item.path}`}
                      className={`${linkStyle} ${
                        activePage.toLocaleLowerCase() === item.path
                          ? " shadow-md bg-primaryColor text-white font-bold"
                          : "font-medium"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className={textStyle}>{item.name}</span>
                    </Link>

                  </div>
                </div>
              ))}
            {isOwner &&
            <>
              <span className={`${textStyle} text-gray-400 border-b border-gray-300 py-1 px-2`}>Manage Cafe </span>
              <div className="">
                {sidebarCafeList.map((item) => (
                  <div className="flex flex-col " key={uuidv4()}>
                    <div className="px-2 py-2">
                      <Link
                        to={`/user/profile/manage-cafe/${item.path}`}
                        className={`${linkStyle} ${
                          activePage.toLocaleLowerCase() === item.path
                            ? " shadow-md bg-primaryColor text-white font-bold"
                            : "font-medium"
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span className={textStyle}>{item.name}</span>
                      </Link>

                    </div>
                  </div>
                ))}
              </div>
              </>}
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`${textStyle} text-gray-400 border-b border-gray-300 py-1 px-2`}>Settings</span>
          <div className="flex flex-col px-2 py-2">
            <div className={`${linkStyle} font-medium`}>
              <PiUserSwitchLight />
              <span className={textStyle}>Switch to cafe</span>
              <ToggleSwitch
                checked={toggle}
                onChange={handleToggle}
                alertLoading={alertLoading}
                name='switch-to-cafe'
                isOwner={isOwner}
                />
            </div>
            <button
              disabled={btnLoading}
              onClick={handleLogout}
              className={`${linkStyle} font-medium`}
            >
              <span>
                <IoIosLogOut />
              </span>
              <span className={textStyle}>{btnLoading ? <BtnLoader size={25} /> : "Logout"}</span>
            </button>
            
            <button
              disabled={deleteLoading}
              onClick={() => {setOpenAlertModal(true); setIsAccount(true)}}
              className={`${linkStyle} font-medium `}
            >
              <span>
                <CiCircleRemove />
              </span>
              <span className={textStyle}>{deleteLoading ? <BtnLoader size={25} /> : "Delete Account"}</span>
            </button>

          </div>
        </div>
        <AlertModal 
          openModal={openAlertModal} 
          setopenModal={setOpenAlertModal} 
          onConfirm={handleAlert} 
          loading={alertLoading || deleteLoading}
          >
                <p className=" font-bold text-lg">{ isAccount? "Are you sure you want to delete your account?" 
                : "Are you sure you want to switch back to customer?"}</p>
                <p className='text-gray-500 text-md'>{isAccount? "Once the account is deleted, it can't be undone." :
                  "The cafe data will be stored to switch back."}</p>
        </AlertModal>
    </div>
  );
};

export default Sidebar;
