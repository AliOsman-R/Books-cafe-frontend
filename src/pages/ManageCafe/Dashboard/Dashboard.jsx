import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Bar, Line, Pie } from 'react-chartjs-2';
import { httpRequest } from '../../../utils/httpsRequest';
import { v4 as uuidv4 } from 'uuid';
import {Context} from '../../../context/GlobalContext'
import { topDashboardInitialState } from '../../../data/initialStates';
import { BarChart, LineChart, PieChart, lineElementClasses } from '@mui/x-charts';
import Map from '../../../components/Map';
import {AppLoader} from '../../../components/LoaderSpinner'
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';


const Dashboard = () => {
  const [pageLoading, setPageLoading] = useState(false)
  const [topSoldItems, setTopSoldItems] = useState([]);
  const [monthlyRevenues, setMonthlyRevenues] = useState([])
  const [topUsers, setTopUsers] = useState([])
  const [cafe, setCafe] = useState(null)
  const [items, setItems] = useState([])
  const [events, setEvents] = useState([])
  const [topDashboard, setTopDashboard] = useState([...topDashboardInitialState])
  const [openModal, setOpenModal] = useState(false)
  const inventorySalesRef = useRef(null);
  const navigate = useNavigate()
  const {user} = useContext(Context)

  useEffect(() => {
    setPageLoading(true)
      httpRequest.get(`/dashboard/${user.cafeId}`)
          .then(({data}) => {
            console.log(data.dashbaord)
            setEvents(data.dashbaord.events)
            setCafe(data.dashbaord.cafe)
            setTopUsers(data.dashbaord.topUsers)
            setItems(data.dashbaord.items)
            setMonthlyRevenues(data.dashbaord.monthlyRevenues)
            setTopDashboard([
              {
                ...topDashboard[0],
                mainData:data.dashbaord.ordersReceived,
                secondaryData:data.dashbaord.ordersCompeleted
              },
              {
                ...topDashboard[1],
                mainData:data.dashbaord.totalSales,
                secondaryData:data.dashbaord.totalSalesThisMonth
              },
              {
                ...topDashboard[2],
                mainData:data.dashbaord.inventory,
                secondaryText:`Books: ${data.dashbaord.totalBooks}`,
                secondaryData:`Menu: ${data.dashbaord.totalMenuItems}`
              },
              {
                ...topDashboard[3],
                mainData:`${data.dashbaord.totalRevenue} RM`,
                secondaryData:`${data.dashbaord.totalRevenueThisMonth} RM`
              },
            ])
            setTopSoldItems(data.dashbaord.top3Items)
          })
          .catch(error => {
              console.error('Error fetching sales data:', error);
          }).finally(() => {setPageLoading(false)})
  }, []);

  const handleClick = (item) => {
    if(item.mainText === 'Orders Received')
      navigate('/user/profile/manage-cafe/cafe-orders')

    if(item.mainText === 'Total Sales' || item.mainText === 'Inventory')
    inventorySalesRef.current.scrollIntoView({ behavior: 'smooth' });

  }

  const checkStockStatus = (stock) => {
    console.log(stock)
    if(stock === undefined)
      return {text:'Only for reading', style:'bg-gray-200 '}

    if(stock === 0)
      return {text:'Out of stock'  , style:'bg-red-200'}

    if(stock <= 10)
      return {text:'Low stock'   , style:'bg-orange-200 '}

    return {text:'In stock'   , style:'bg-green-200 '}
  }


  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AppLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className=" font-semibold text-2xl ">Cafe Dashboard</h1>
        <span>Here where you can view all your cafe statistics and reports!</span>
      </div>
      <div className="flex flex-col gap-5 min-h-screen rounded-lg">
        <div className="grid grid-cols-4 gap-3">
          {topDashboard.map((item) => (
            <div 
            onClick={() => handleClick(item)} 
            key={uuidv4()} 
            className={`${item.mainColor} p-5 rounded-md flex flex-col gap-5 text-white shadow-lg ${item.mainText != 'Total Revenue'? 'cursor-pointer':''}`}>
              <p className='text-xl font-bold'>{item.mainText}</p>
              <div className="flex justify-between">
                {item.icon}
                <p className='font-bold text-2xl'>{item.mainData}</p>
              </div>
              <div className="flex justify-between">
                <p className='font-semibold'>{item.secondaryText}</p>
                <p className='font-semibold'>{item.secondaryData}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <div className="bg-white p-5 w-1/2 shadow-lg rounded-md ">
            <p className='text-xl font-semibold'>Top 3 sold items</p>
            <PieChart
              series={[
                {data:topSoldItems},
              ]}
              width={600}
              height={200}
            />
          </div>
          <div className="bg-white p-5 w-1/2 shadow-lg rounded-md " >
            <p className='text-xl font-semibold' ref={inventorySalesRef}>Monthly Revenue</p>
            <LineChart
              width={600}
              height={300}
              series={[{ data: monthlyRevenues.map((mnR) => mnR.revenue), label: 'Revenue', area: true, showMark: false }]}
              xAxis={[{ scaleType: 'point', data: monthlyRevenues.map((mnR) => mnR.month) }]}
              sx={{
                [`& .${lineElementClasses.root}`]: {
                  display: 'none',
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white p-5 w-fullshadow-lg rounded-md" >
          <p className='text-xl font-semibold' >Inventory and Sales Table</p>
          <div className="border border-gray-400 rounded-lg mt-5" >
            <div className={`grid grid-cols-6 p-3 rounded-t-lg bg-gray-100`}>
              <span>Product Name</span>
              <span >Date added</span> 
              <span>Price</span>
              <span>Stock Status</span>
              <span>Quantity</span>
              <span>Sales</span>
            </div>
            <div className="max-h-[300px] min-h-[200px] h-full overflow-scroll">
              {items.map(item => (
              <div className={`grid grid-cols-6 p-3 `}>
                <span>{item.name || item.title}</span>
                <span>{item.createdAt.substring(0, 10)}</span>
                <span>{item.price}</span>
                <span className={`${checkStockStatus(item?.stock).style} bg-gray-200 rounded-full w-[50%] text-center p-2 `}>{checkStockStatus(item?.stock).text}</span>
                <span>{item?.stock >= 0? item?.stock : 'Only for reading'}</span>
                <span>{item.sold}</span>
              </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="bg-white p-5 w-1/2 shadow-lg rounded-md ">
            <p className='text-xl font-semibold mb-2'>Cafe Location</p>
              {cafe && <Map cafes={[cafe]}/>}
          </div>
          <div className="bg-white p-5 w-1/2 shadow-lg rounded-md ">
            <div className="">
              <p className='text-xl font-semibold'>Top 3 Customers with Most Orders</p>
              <div onClick={()=> setOpenModal(true)} className="">
                <BarChart
                  width={600}
                  height={300}
                  sx={(theme) => ({
                    cursor:'pointer'
                  })}
                  xAxis =  {[{ data: topUsers?.map(topUser => topUser?.user?.name), scaleType: 'band' }]}
                  series={[
                    {
                      data: topUsers?.map(topUser => topUser?.orderCount),
                      label: 'Number of orders',
                    },
                  ]}
                />
              </div>
            </div>
            <div className="">
              <p className='text-xl font-semibold'>Cafe Events</p>
              <div className="max-h-[300px] h-full overflow-scroll mt-3">
                {events?.length> 0 && events.map(event => (
                  <div key={uuidv4()} className="p-3 border-b border-gray-300">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                  </div>
                ))}
                {events?.length === 0 && (
                  <div className="flex justify-center items-center h-[200px]">
                    No events available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
      <Modal.Header setOpenModal={setOpenModal}>Top 3 Customers with Most Orders</Modal.Header>
        <Modal.Body>
          <div className="lg:w-[1350px]">
            <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((customer, index) => (
                    <tr key={index} className="text-center border-t">
                      <td className="py-2">{customer.user.name}</td>
                      <td className="py-2">{customer.user.email}</td>
                      <td className="py-2">{customer.user.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table> 
          </div>
        </Modal.Body>
        <Modal.Footer onClick={() => setOpenModal(false)}></Modal.Footer>
      </Modal>
    </div>
  )
}

export default Dashboard