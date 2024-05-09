import React, { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { PrimaryButton, transparentBtn } from '../buttons';
import AlertModal from '../AlertModal';
import { BtnLoader } from '../LoaderSpinner';
import { Link } from 'react-router-dom';

const OrderCard = ({ order, cafeOwner, handleUpdateStatus, alertLoading, btnLoading, openAlertModal, setOpenAlertModal }) => {
    const date = order.createdAt.substring(0, 10)
    const isPending = order.status === 'pending'
    const status = order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()
    const statusColor = order.status === 'pending' || order.status === 'cancelled'? 'bg-red-400' : 'bg-green-400'


  return (
    <div className="bg-[#fdfdfd] max-h-[302px] shadow-lg border border-gray-400 rounded-lg p-4">
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-primaryColor">Order #{order.orderId}</h2>
                <span className="text-gray-500">Placed on {date}</span>
            </div>
            <Link to={`${order._id}`}  className="flex items-center gap-2 text-lg font-semibold text-primaryColor cursor-pointer">
                <IoEyeOutline size={25} className='mt-1'/>
                <span>View order details</span>
            </Link>
        </div>
        <div className="flex flex-col max-h-[200px] border-t border-gray-300 my-4">
                <div className="mt-4 flex justify-between items-center">
                    <h3 className="text-md font-semibold">Items:</h3>
                    {/* <span className="text-gray-600">Total:</span> */}
                    <span className="text-lg font-semibold">{order.totalPrice} RM</span>
                </div>
                <ul className="list-disc list-inside h-[100px] overflow-scroll">
                {order?.products.map((product, index) => (
                    <li key={index}>{product.item.name || product.item.title}</li>
                ))}
                </ul>
        </div>
        <div className="flex justify-between items-center">
        <span className={`px-5 h-[30px] py-[19px] flex items-center ${statusColor} rounded-md text-white`}>
            {status}
        </span>
            {isPending && 
                <div className="flex justify-end gap-2">
                    <button 
                    onClick={() => setOpenAlertModal(true)}
                    className={transparentBtn}
                    >
                        Cancel
                    </button>
                    {cafeOwner && 
                    <PrimaryButton 
                    disabled={btnLoading.id === order._id} 
                    onClick={() => handleUpdateStatus('confirmed', order._id)} 
                    className='h-[38px] min-w-[129px]'
                    >
                        {btnLoading.id === order._id ? <BtnLoader/> : 'Confirm'}
                    </PrimaryButton>
                    }
                </div>
            }
        </div>

        <AlertModal 
        openModal={openAlertModal} 
        setopenModal={setOpenAlertModal} 
        onConfirm={() => handleUpdateStatus('cancelled', order._id)} 
        loading={alertLoading}
        >
            <p className=" font-bold text-lg">Are you sure you want to cancel the order?</p>
            <p className='text-gray-500 text-md'>Once canceled, this order will no longer be confirmed.</p>
        </AlertModal>
    </div>
  );
};

export default OrderCard;
