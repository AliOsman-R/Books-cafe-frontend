import React from 'react'
import StoreCard from '../components/StoreCard'
import secondaryImage from "../assets/secondary-image.jpg";
import { PrimaryInput } from '../components/inputs';
import { IoIosSearch } from "react-icons/io";
import { RiFilter3Fill } from "react-icons/ri";

const Cafes = () => {
  return (
    <div>
        <div className="py-7 pb-10">
            <div className="flex justify-center items-center gap-5 mb-10">
                <PrimaryInput type='text' className=' w-1/2' placeholder='Search....'/>
                <IoIosSearch size={30}/>
                <RiFilter3Fill size={30}/>
            </div>
            <div className="flex sm:flex-wrap sm:flex-row p-5 ssm:flex ssm:flex-col items-center gap-4 justify-center overflow-scroll max-h-screen">
                <StoreCard image={secondaryImage} title='CafeX' />
                <StoreCard image={secondaryImage} title='CafeX' />
                <StoreCard image={secondaryImage} title='CafeX' />
                <StoreCard image={secondaryImage} title='CafeX' />
                <StoreCard image={secondaryImage} title='CafeX' />
                <StoreCard image={secondaryImage} title='CafeX' />
            </div>
        </div>
    </div>
  )
}

export default Cafes