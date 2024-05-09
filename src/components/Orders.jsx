import React, { useContext, useEffect, useState } from 'react'
import { httpRequest } from '../utils/httpsRequest'
import { Context } from '../context/GlobalContext'
import { AppLoader } from './LoaderSpinner';
import Search from './Search';
import OrderCard from './cards/OrderCard';
import Pagination from './Pagination';
import { toast } from 'sonner';
import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const tabssList = ['Pending', 'Confirmed',  'Completed', 'Cancelled']
const Orders = ({fetchUrl, cafeOwner}) => {
  const [pageLoading, setPageLoading] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState({id:null, loading:false})
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [orders, setOrders] = useState([]);
  const [tabOrders, setTabOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [activeTab, setActiveTab] = useState('Pending');
  const areOrders = filteredOrders.length > 0

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/orders/${fetchUrl}`)
    .then(({data}) => {
      console.log(data)
      setOrders(data.orders)
      const newOrders = data.orders.filter(order => order.status === activeTab.toLowerCase())
      setTabOrders(newOrders)
      setFilteredOrders(newOrders)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {setPageLoading(false)})
  }, [])

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = tabOrders.filter(order =>
      Object.keys(order).some(key =>
        typeof order[key] === 'string' && order[key].toLowerCase().includes(query)
      )
    );
    setFilteredOrders(filteredData);
  };

  const handleTabClick = (tab) => {
    const newOrder = orders.filter(order => order.status === tab.toLowerCase())
    setFilteredOrders(newOrder)
    setTabOrders(newOrder)
    setActiveTab(tab)
  }

  useEffect(() => {
    const newOrders = orders.filter(order => order.status === activeTab.toLowerCase())
    setTabOrders(newOrders)
    setFilteredOrders(newOrders)
  }, [orders])
  

  const handleUpdateStatus = (status, orderId) => {
    status === 'cancelled'? setAlertLoading(true) : setBtnLoading({id:orderId, loading:true})
    httpRequest.put(`/orders/update-status/${orderId}`, {status})
    .then(({data}) => {
      console.log(data)
      const newData = orders.map(order => order._id === data.order._id ? data.order : order)
      const newOrders = newData.filter(order => order.status === activeTab.toLowerCase())
      console.log(newOrders, newData)
      setOrders(newData)
      setTabOrders(newOrders)
      setFilteredOrders(newOrders)
      toast.success(`The order has been ${status}`)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {
      setAlertLoading(false)
      setBtnLoading(false)
      setOpenAlertModal && setOpenAlertModal(false)
    })
  }
  

  if(pageLoading)  {
    return (
        <div className="flex justify-center items-center h-screen">
            <AppLoader/>
        </div>
    )
}   

  return (
    <div>
      <div className="mb-7">
        <h1 className=" font-semibold text-2xl ">{cafeOwner? 'Orders' : 'My Orders'}</h1>
        <span>View all {cafeOwner? 'cafe' : 'your'} orders here!</span>
      </div>
      <div className="border-b border-gray-300 mb-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" aria-label="Tabs">
          {tabssList.map((tab) => (
            <li className="mr-2" key={uuidv4()}>
              <button
                className={`inline-block py-4 px-6 rounded-t-lg ${
                  activeTab === tab ? 'text-white bg-primaryColor' : 'text-gray-600 bg-white hover:text-primaryColor'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='min-h-screen bg-white p-4 shadow-md rounded-lg flex flex-col gap-5'>
        <div className="">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="h-screen">
          {areOrders && 
          <div className="grid grid-cols-2 gap-4">
            {filteredOrders.map(order => (
              <OrderCard 
              key={uuidv4()}
              order={order} 
              cafeOwner={cafeOwner}
              handleUpdateStatus={handleUpdateStatus}
              alertLoading={alertLoading}
              btnLoading={btnLoading}
              setOpenAlertModal={setOpenAlertModal}
              openAlertModal={openAlertModal}
              />
            ))}
          </div>
          }
          {!areOrders && 
          <div className="flex justify-center items-center h-[50vh]">
            <p className='text-xl text-gray-400'>No orders available</p>
          </div>
          }
        </div>
        <div className="flex justify-center items-center space-x-2 my-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            recordsPerPage={recordsPerPage}
            setRecordsPerPage={setRecordsPerPage}
            data={filteredOrders}
          />
        </div>
      </div>
      <Outlet context={{cafeOwner, setOrders}}/>
    </div>
  )
}

export default Orders