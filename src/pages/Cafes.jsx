import React, { useEffect, useRef, useState } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../components/Pagination";
import { CgUnavailable } from "react-icons/cg";
import { setPagination } from "../utils/AppUtils";
import { Outlet } from "react-router-dom";
import Search from "../components/Search";
import { httpRequest } from "../utils/httpsRequest";
import { AppLoader } from "../components/LoaderSpinner";
import CafeCard from "../components/CafeCard";
import Filter from "../components/Filter";

const Cafes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const isData = filteredCafes.length > 0;

  useEffect(() => {
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
  }, [])

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = cafes.filter(cafe =>
        cafe.name.toLowerCase().includes(query.toLowerCase()) ||
        cafe.ownerName.toLowerCase().includes(query.toLowerCase())||
        cafe.state.toLowerCase().includes(query.toLowerCase()) ||
        cafe.city.toLowerCase().includes(query.toLowerCase()) 
    );
    setFilteredCafes(filteredData);
  };
  

  if(pageLoading)  {
    return (
        <div className="flex justify-center items-center h-screen">
            <AppLoader/>
        </div>
    )
  } 

  return (
    <div className="py-5 pb-10">
      <div className="flex justify-between ssm:flex-col md:flex-row items-center mx-10 py-6 border-b border-gray-300">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Your Cafes Oasis
          </h1>
          <p className="text-gray-500">Explore the Best Cafes Near You</p>
        </div>
        <div className="flex items-center gap-5">
          <Search handleSearch={handleSearch} />
          {/* <button className="flex items-center justify-center w-12 h-12 rounded-full bg-secondaryColor text-black hover:bg-secondaryColorHover transition duration-300">
            <RiFilter3Fill size={24} />
          </button> */}
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="ssm:hidden md:flex">
          <Filter/>
        </div>
      <div className={`flex-1 flex flex-wrap gap-8 justify-center md:items-start p-4 min-h-[905px]`}>
        {isData &&
          setPagination(recordsPerPage, currentPage, filteredCafes)?.map(
            (cafe) => (
                <CafeCard
                  key={uuidv4()}
                  cafe={cafe}
                />
            )
          )}
        {!isData && (
          <div className="flex flex-col justify-center items-center mt-[250px]">
            <h1 className="text-[40px] font-semibold text-gray-400">
              We are sorry
            </h1>
            <h1 className="text-[40px] font-semibold text-gray-400 flex gap-2 items-center">
              No Cafes Available{" "}
              <CgUnavailable size={50} className="text-gray-400" />
            </h1>
          </div>
        )}
      </div>
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          data={filteredCafes}
        />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Cafes;
