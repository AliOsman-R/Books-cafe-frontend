import React from 'react'
import { FaClipboardList } from "react-icons/fa";
import { PiBasketBold } from "react-icons/pi";
import { FcShipped } from "react-icons/fc";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { FcTodoList } from "react-icons/fc";
import { MdOutlineTimer } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ProgressForm from './ProgressForm';
const orderStatusData = [
    {
        Name:'Order Placed',
        objName: 'orderPlaced',
        icon: <FcTodoList size={25} color='blue'/>
    },
    {
        Name:'Preparing',
        objName: 'preparing',
        icon:<PiBasketBold size={25} color='orange'/>
    },
    {
        Name:'Out For Delivery',
        objName: 'outForDelivery',
        icon:<FcShipped size={25}/>
    },
    {
        Name:'Delivered',
        objName: 'delivered',
        icon:<IoCheckmarkDoneCircle size={25}/>
    }
]
const Progress = ({progress, setProgress, status, cafeOwner, id, setOrders, setOrder}) => {

    const handleCheck = (objName) => {
        const isComplete = progress.find((pr) => pr.activity === objName)
        return isComplete
    }

  return (
    <div className='flex flex-col gap-10'>
        {orderStatusData.map((orderS, index) => (
            <div key={uuidv4()} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className='p-2 rounded-full border border-gray-400 shadow-md'>{orderS.icon}</span>
                    <div className="flex flex-col">
                        <p className='text-semibold'>{orderS.Name}</p>
                        <span className='text-gray-400'>
                            {progress[index]? (progress[index].date + ' | ' + progress[index].time) : 'Not available' }
                        </span>
                    </div>
                </div>
                <span>
                    {handleCheck(orderS.objName)? <IoCheckmarkDoneCircleOutline size={25} color='green'/> : <MdOutlineTimer size={25} color='gray'/>}
                </span>
            </div>
        ))}

    {cafeOwner && status === 'confirmed' && 
        <ProgressForm progress={progress} id={id} setProgress={setProgress} setOrders={setOrders} setOrder={setOrder}/>
    }
    </div>
  )
}

export default Progress