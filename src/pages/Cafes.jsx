import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { httpRequest } from "../utils/httpsRequest";
import CafeCard from "../components/cards/CafeCard";
import ListComponent from "../components/ListComponent";
import { Context } from "../context/GlobalContext";

const Cafes = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0})
  const [nearCafes, setnearCafes] = useState(false)
  const {maxDistance} = useContext(Context)


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

  const handleClcik = (choice) => {
    if(choice === 'all')
      getCafes()
    else
    {
      const {latitude, longitude} = coordinates
      getNearCafes(latitude, longitude)
    }
  }

  return (
    <div className="py-5 pb-10 mx-10">
      <ListComponent
        items={cafes}
        type={'cafes'}
        filteredItems={filteredCafes}
        setFilteredItems={setFilteredCafes}
        pageLoading={pageLoading}
        CardComponent={CafeCard}
        nearCafes={nearCafes}
        handleClcik={handleClcik}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Cafes;
