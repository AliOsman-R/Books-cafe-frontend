import React, { useEffect, useState } from 'react'
import PageAnimationStyle from './PageAnimation'
import { useOutletContext, useParams } from 'react-router-dom'
import { httpRequest } from '../utils/httpsRequest'
import { MdOutlineEmail } from "react-icons/md";
import { AppLoader } from './LoaderSpinner'
import { PrimaryButton, transparentBtn } from './buttons';
import { v4 as uuidv4 } from 'uuid';
import Progress from '../pages/ManageCafe/Orders/Progress';
import Modal from './Modal';
import ProgressForm from '../pages/ManageCafe/Orders/ProgressForm';

const OrderDetails = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState([])
  const [order, setOrder] = useState({})
  const {id} = useParams()
  const {cafeOwner, setOrders} = useOutletContext()
  const sstRate = 0.06;
  const date = order.createdAt?.substring(0, 10)
  const status = order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1).toLowerCase()
  const statusColor = order?.status === 'pending' || order?.status === 'cancelled'? 'bg-red-400' : 'bg-green-400'
  const isComplete = order?.status === 'completed'

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/orders/${id}`)
    .then(({data}) => {
      console.log(data)
      setOrder(data.order)
      setProgress(data.order.progress)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {setPageLoading(false)})
  }, [id])


  return (
    <PageAnimationStyle>
      {pageLoading? (
        <div className="flex justify-center items-center h-screen">
          <AppLoader/>
        </div>
      ): (
        <div className='m-10 flex flex-col gap-10'>
          <div className="flex justify-between items-center">
            <h1 className='text-2xl font-bold'>Order Details</h1>
          </div>
          <div className="flex flex-grow gap-5">
            <div className="flex-1 bg-gray-50 min-h-[50vh] shadow-lg rounded-md p-5">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">Order ID <strong>#{order.orderId}</strong></h1>
                  <span className="text-gray-500">Placed on {date}</span>
                </div>
                <div className="flex gap-3">
                  <button className={`flex items-center gap-2 ${transparentBtn} px-5 hover:bg-gray-200`}>
                    <span><MdOutlineEmail size={20}/></span>
                    Message {cafeOwner? 'Customer' : 'Cafe'}
                  </button>
                  <span className={`px-5 h-[30px] py-[19px] flex items-center ${statusColor} rounded-md text-white`}>
                    {status? status : ''}
                  </span>
                </div>
              </div>
              <div className="flex flex-col border border-gray-300 bg-white mt-10 rounded-lg">
                {order?.products?.map((product) => (
                  <div className="p-3 flex justify-between items-center border-b border-gray-300" key={uuidv4()}>
                    <div className="flex items-center gap-3">
                      <img src={product.item.images[0].url} className='size-[80px] rounded-lg' alt="" />
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className='font-semibold'>{product.item.name || product.item.title}</span>
                          {isComplete &&
                          <button 
                          className={` bg-primaryColor h-[20px] py-3 px-7 flex items-center rounded-[5px] hover:bg-primaryColorHover text-white`}
                          >
                            Rate
                          </button>
                          }
                        </div>
                        <span className='text-gray-400'>Type | {product.item.type || product.item.genre}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className='font-semibold'>{product.price} RM</span>
                      <span className='text-end text-gray-400'>Qty:{product.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-5 p-3">
                <span className='font-bold flex gap-3'>
                 <span>Special Request:</span> 
                 <span className='text-gray-500 font-normal max-w-[700px] max-h-[232px] overflow-scroll'>
                    {order.specialRequest}
                  </span>
                  </span>
                <div className="flex flex-col gap-3">
                  <div className="flex py-3 justify-between  gap-10">
                    <span>Subtotal</span>
                    <span className="">{(order.totalPrice - order.deliveryFee - order.sstAmount).toFixed(2)} RM</span>
                  </div>
                  <div className="flex py-3 justify-between  gap-10">
                    <span>Delivery fee</span>
                    <span className="">{order.deliveryFee} RM</span>
                  </div>
                  <div className="flex py-3 justify-between border-b border-gray-500 gap-10">
                    <span>SST ({(sstRate * 100).toFixed(2)}%)</span>
                    <span >{order.sstAmount} RM</span>
                  </div>
                  <div className="flex py-3 justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-semibold">{order.totalPrice} RM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-2 bg-gray-50 w-[30%] shadow-lg rounded-md p-5">
              <h1 className='text-lg font-bold mb-[65px]'>Order Status</h1>
              {order.progress && 
                <Progress 
                progress={progress} 
                setProgress={setProgress} 
                status={order.status} 
                cafeOwner={cafeOwner} 
                setOrders={setOrders}
                setOrder={setOrder}
                id={id}/>
              }
              {isComplete &&
              <div className="flex items-center gap-4 mt-10 p-2 ">
                <h1 className='text-lg font-semibold'>Rate the cafe</h1>
                <button 
                className={` bg-primaryColor h-[20px] py-3 px-7 flex items-center rounded-[5px] hover:bg-primaryColorHover text-white`}
                >
                  Rate
                </button>
              </div>
                }
            </div>
          </div>

          <div className="flex flex-grow gap-5">
            <div className="flex-1 bg-gray-50 shadow-lg rounded-md p-5">
                <h1 className='className="text-xl font-bold'>{cafeOwner ? 'Cutsomer' : 'Your'} Details</h1>
                <div className="flex justify-between mt-5">
                  <div className="flex justify-between gap-20">
                    <div className="flex flex-col gap-3">
                      <span className='font-semibold'>Name</span>
                      <span className='font-semibold'>Email</span>
                      <span className='font-semibold'>Address 1</span>
                      <span className='font-semibold'>Address 2</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className='text-gray-600'>{order?.userId?.name}</span>
                      <span className='text-gray-600'>{order?.userId?.email}</span>
                      <span className='text-gray-600'>{order?.firstAddress}</span>
                      <span className='text-gray-600'>{order?.secondAddress}</span>
                    </div>
                  </div>
                  <div className="flex justify-between gap-20">
                    <div className="flex flex-col gap-3">
                        <span className='font-semibold'>Mobile</span>
                        <span className='font-semibold'>Last 4 Digits</span>
                        <span className='font-semibold'>Payment</span>
                        <span className='font-semibold'>Status</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className='text-gray-600'>{order?.phoneNumber}</span>
                        <span className='text-gray-600'>**** {order?.lastFourDigits}</span>
                        <span className='text-gray-600'>Online</span>
                        <span className='bg-green-100 rounded-md text-green-500 px-1 py-1 text-center'>
                          Paid
                        </span>
                      </div>
                    </div>
                </div>
            </div>
            <div className="flex-2 w-[30%]">
              {/* <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
                <Modal.Header setOpenModal={setOpenModal}>Manage Order Status</Modal.Header>
                <Modal.Body>
                  <div className="w-[1114px]"> */}
                    
                  {/* </div>
                </Modal.Body>
                <Modal.Footer onClick={() => setOpenModal(false)}></Modal.Footer>
              </Modal> */}
            </div>
          </div>
        </div>
      )
      }
    </PageAnimationStyle>
  )
}

export default OrderDetails