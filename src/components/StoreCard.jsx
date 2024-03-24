import React from 'react'
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { PrimaryButton, SecondaryButton, TertiaryButton } from './buttons';
import ownerImg from '../assets/owner.jpg'

const StoreCard = ({title,image,price}) => {
  return (
    <div className='ssm:w-[80%] lg:w-1/4 md:w-[30%] sm:w-[40%] bg-white p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer hover:scale-105'>
        <img src={image} alt="" />
        <div className=" flex flex-col gap-5 p-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={ownerImg} alt="owner image"  className=' rounded-full size-[30px]'/>
                  <h1>Cafe Owner</h1>
                </div>
                <h3 className=" font-semibold pr-5 text-xl">{title}</h3>
            </div>
            <div className=" flex flex-row items-center justify-between gap-4">
              <div className=" flex flex-row justify-center items-center">
                  <BsStarFill className=" text-yellow-400" />
                  <BsStarFill className=" text-yellow-400" />
                  <BsStarFill className=" text-yellow-400" />
                  <BsStarFill className=" text-yellow-400" />
                  <BsStarHalf className=" text-yellow-400" />
              </div>
              <TertiaryButton>View now</TertiaryButton>
            </div>
      </div>
    </div>
  )
}

export default StoreCard