import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PageAnimation from "../../components/PageAnimation";
import { httpRequest } from "../../utils/httpsRequest";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { MdDescription } from "react-icons/md";
import { AppLoader } from "../../components/LoaderSpinner";
import defaultCafeImage from '../../assets/default-cafe-image.jpg';
import defaultUserImage from '../../assets/default-user-image.jpg';
import { cafeInitialState } from "../../data/initialStates";
import { getDayInfo } from "../../utils/AppUtils";
import Books from "./Books/";
import Menu from "./Menu/";
import Events from "./Events/";
import WorkingDaysPage from "./WorkingDaysPage";
import StarRating from "../../components/StarRating";
import { Context } from "../../context/GlobalContext";

const tabs = ['Books', 'Menu', 'Events', 'Working Days'];
const Cafe = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState(cafeInitialState);
  // const [pageLoading, setPageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const dayInfo = getDayInfo(cafe?.workingDays || []);
  const {selectedCafe} = useContext(Context);
  console.log(selectedCafe)

  useEffect(() => {
    setCafe(selectedCafe)
    // setPageLoading(true)
    //  httpRequest.get(`/cafe/${id}`)
    //  .then(({data}) => {
    //    setCafe(data.cafe);
    //  }).catch(err => {
    //   console.log(err)
    //  }).finally(() => setPageLoading(false))

  }, [selectedCafe]);

  // if(pageLoading)  {
  //   return (
  //     <PageAnimation>
  //       <div className="flex justify-center items-center h-screen">
  //         <AppLoader/>
  //       </div>
  //     </PageAnimation>
  //   )
  // }  
  
  if(Object.keys(selectedCafe).length === 0)
  {
    return <Navigate to={'/cafes'}/>
  }


  return (
    <PageAnimation>
    <>
        {/* Hero Section */}
        <div>
          <img src={cafe.image || defaultCafeImage} className=" object-cover min-h-[380px] max-h-[380px] w-full shadow-md"/>
        </div>

        {/* Owner Info + Bio */}
        <div className="py-7 px-10 flex ssm:flex-col md:flex-row justify-between bg-gray-50">
          <div className="flex gap-5 items-center">
            <img src={cafe.image || defaultCafeImage} className="border border-gray-400 object-cover size-[130px] shadow-lg"/>
            <div className="flex flex-col gap-[2px]">
              <div className="flex ssm:flex-col md:flex-row gap-3">
                <h1 className='text-[35px]'>{cafe.name}</h1>
                <div className='flex ssm:flex-col sm:flex-row items-center gap-5'>
                  <strong className={`${dayInfo.status === 'Open'? 'text-green-500' : 'text-red-500'} rounded-full bg-gray-200 [#272727] p-1 px-4 border border-gray-200`}> 
                    {dayInfo.status} 
                  </strong>
                  <span className=" text-green-600 font-semibold">{dayInfo.status === 'Open' && 'Working Hours: ' + dayInfo.workingHours}</span>
                </div>
              </div>
              <span>+{cafe.phoneNumber}</span>
              <span className="text-sm text-gray-600">{cafe.state}, {cafe.city}</span>
              <div className="flex items-center gap-2">
                <span>{cafe?.sales? cafe.sales : 0} Sales</span> 
                <span className=" text-gray-200">|</span>
                <div className="flex items-center gap-1">
                  <StarRating rating={cafe.averageRating} />
                  <span className='text-gray-400'>({cafe?.numOfReviews} Reviews)</span>
              </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex flex-col items-center gap-2">
              <img src={cafe.ownerImage || defaultUserImage} className="rounded-full object-cover size-[70px] shadow-lg"/>
              <h1>{cafe.ownerName}</h1>
              <div className="flex items-center gap-2 hover:bg-[#cacaca] py-2 px-4 rounded-full cursor-pointer">
                <TiMessages/>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-10 py-2 flex-col max-w-[1100px] ">
          <div className="flex gap-2 py-2">
          <div className="flex justify-center gap-2">
            <FaMapLocationDot className="mt-[3px]"/> <strong>Address:</strong>
            </div>
             {cafe.address}
          </div>
          <div className="flex gap-2 py-2">
            <div className="flex justify-center gap-2">
            <MdDescription className="mt-[3px]"/> <strong>Bio:</strong>
            </div>
            <span>{cafe.bio}</span>
          </div>
        </div>

        {/* Tabs for Menu, Books, Events, Working Days */}
        <div className="h-screen mt-5 mx-auto md:px-10 ssm:px-0 bg-gray-50">
          <div className="flex justify-center border-b bg-white">
            {tabs.map((tab, index) => (
              <button
                key={uuidv4()}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 block focus:outline-none ${activeTab === tab ? 'border-b-2 border-primaryColor text-primaryColor' : 'hover:text-primaryColor'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6 bg-gray-50">
            <TabContent activeTab={activeTab} cafe={cafe} id={id}/>
          </div>
        </div>
        </>
    </PageAnimation>
  );
};


const TabContent = ({activeTab, cafe, id}) => {
  switch (activeTab) {
    case 'Books':
      return <Books cafe={cafe} id={id} />;
    case 'Menu':
      return <Menu cafe={cafe} id={id} />;
    case 'Events':
      return <Events cafe={cafe} id={id} />;
    case 'Working Days':
      return <WorkingDaysPage cafe={cafe} />;
    default:
      return <div>Content not available</div>;
  }
};

export default Cafe;
