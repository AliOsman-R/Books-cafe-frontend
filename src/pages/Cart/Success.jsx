import React, { useState, useEffect, useContext } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { Context } from '../../context/GlobalContext';
import { runFireworks } from '../../utils/AppUtils';
import { Link, useNavigate } from 'react-router-dom';
import { linkBtnStyle, linkStyle } from '../../components/buttons';

const Success = () => {
    const {isAuth, actions, completedOrder} = useContext(Context)
    const navigate = useNavigate()
  
  useEffect(() => {
    if(isAuth && completedOrder)
    {
        actions({ type: 'SET_COMPELETED_ORDER', payload: false });
        runFireworks();
    }
    else
        navigate('/cafes') 

  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="px-[300px] py-[100px] bg-white flex flex-col gap-5 justify-center items-center rounded-md shadow-lg">
        <p className="icon">
          <BsBagCheckFill size={40} color='green'/>
        </p>
        <h2 className='font-bold text-3xl'>Thank you for your order!</h2>
        <p className='text-gray-500'>The order is pending now, once the cafe confirm it the status will be changed</p>
        <p className="text-gray-500 flex gap-2 ">
          If you have any questions, please email
          <a className={`${linkStyle}`} href="mailto:cafeX@example.com">
            cafeX@example.com
          </a>
        </p>
        <div className="flex gap-5">
            <Link to="/cafes" className={`${linkBtnStyle} px-5`}>
                Continue Shopping
            </Link>
            <Link to="/user/profile/manage-user/orders" className={`${linkBtnStyle}`}>
                View Order
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Success