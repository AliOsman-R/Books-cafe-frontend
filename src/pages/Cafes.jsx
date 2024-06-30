import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { httpRequest } from "../utils/httpsRequest";
import CafeCard from "../components/cards/CafeCard";
import { Context } from "../context/GlobalContext";
import { FiFilter } from "react-icons/fi";
import Map from "../components/Map";
import { setPagination } from "../utils/AppUtils";
import { CgUnavailable } from "react-icons/cg";
import { AppLoader } from "../components/LoaderSpinner";
import Pagination from "../components/Pagination";
import CafeFilter from "../components/CafeFilter";

const Cafes = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0})
  const [nearCafes, setnearCafes] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [originalCurrentPage, setOriginalCurrentPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const {maxDistance} = useContext(Context)
  const isData = filteredCafes.length > 0;


  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({latitude,longitude})
          getNearCafes(latitude, longitude)
        },
        (error) => {
          getCafes()
        }
      );
    } else {
      getCafes()
    }
  };

  useEffect(() => {
    getUserLocation()
  }, [])

  const getNearCafes = (latitude, longitude) => {
    setPageLoading(true)
    httpRequest.get('/cafe/near-cafes', { params: {latitude, longitude, maxDistance}})
    .then(({data}) => {
      console.log(data)
      setFilteredCafes(data.cafes);
      setCafes(data.cafes)
      setnearCafes(true)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(()=> {setPageLoading(false)})
  }

  const getCafes = () => {
    setPageLoading(true)
    httpRequest.get('/cafe/')
    .then(({data}) => {
      console.log(data)
      setFilteredCafes(data.cafes);
      setCafes(data.cafes)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(()=> {setPageLoading(false)})
  }

  const handleClick = (choice) => {
    if(choice === 'all')
      getCafes()
    else
    {
      const {latitude, longitude} = coordinates
      getNearCafes(latitude, longitude)
    }
  }

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AppLoader />
      </div>
    );
  }

  return (
    <div className="py-5 pb-10 mx-10">
      <div className="flex flex-col gap-2 ">
        <div className={`flex justify-between py-6 border-b border-gray-300 ssm:flex-col md:flex-row items-center`}>     
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
                Welcome to Your Cafes Oasis
            </h1>
            <p className="text-gray-500">
              Explore the Best Cafes Near You
            </p>
          </div>
        </div>
        <div className="flex flex-grow min-h-[875px]">
          <div className="ssm:hidden md:flex md:flex-col">
            { !openFilter && 
            <button className="p-2 rounded-xl bg-primaryColor flex gap-2 items-center text-white" onClick={() => setOpenFilter(true)}>
              Filter <FiFilter color="white"/> 
            </button>}
            <div className={`cafe-filter-container ${openFilter ? 'visible' : 'hidden'}`}>
              <CafeFilter 
              cafes={cafes} 
              setOpenFilter={setOpenFilter} 
              handleClick={handleClick} 
              setCafes={setFilteredCafes} 
              setCurrentPage={setCurrentPage}
              originalCurrentPage={originalCurrentPage} 
              />
            </div>
          </div>
          <div className="flex-1 flex flex-wrap justify-center gap-4">
            {isData ? ( 
              setPagination(recordsPerPage, currentPage, filteredCafes).map(item => (
                <div key={item._id}>
                  <CafeCard key={item._id} item={item} />
                </div>
                ))
            ): (
              <div className="flex flex-col justify-center items-center mb-[100px]">
                <h1 className="text-[40px] font-semibold text-gray-400">
                  We are sorry
                </h1>
                {!nearCafes &&
                <h1 className="text-[40px] font-semibold text-gray-400 flex gap-2 items-center">
                  No cafes Available{" "}
                  <CgUnavailable size={50} className="text-gray-400" />
                </h1>
                } 
                {nearCafes && 
                <div className="text-[40px] font-semibold text-gray-400 flex flex-col justify-center gap-2 items-center">
                  <div className="flex items-center justify-center">
                    No cafes near to you {" "}
                    <CgUnavailable size={50} className="text-gray-400 mt-2" />
                  </div>
                </div>
                }
              </div>
            )}
          </div>
          <div className="hidden lg:flex w-[370px] flex-col">
            <Map cafes={filteredCafes}/>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2 my-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            recordsPerPage={recordsPerPage}
            setRecordsPerPage={setRecordsPerPage}
            data={filteredCafes}
            setOriginalCurrentPage={setOriginalCurrentPage}
          />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Cafes;
