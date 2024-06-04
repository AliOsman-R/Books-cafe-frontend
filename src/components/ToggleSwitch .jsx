import React from 'react'
import { BtnLoader } from './LoaderSpinner'

export const ToggleSwitch  = ({ checked, onChange, name, isOwner, alertLoading }) => {

  if(alertLoading){
    return(
      <div className="ml-[12px] w-[50px]">
        <BtnLoader/>
      </div>
    )
  }

  return (
    <label
    className={`rounded-2xl relative w-[50px] flex items-center ${alertLoading? 'disabled:cursor-auto': 'cursor-pointer'}
    ml-3 py-3 ${checked || isOwner ? "bg-green-400" : "bg-gray-200"}`}
    >
    <input
      type="checkbox"
      onChange={onChange}
      name={name}
      checked={checked}
      className="hidden"
      disabled={alertLoading}
    />
    <span
      className={`absolute bg-white rounded-full h-[21px] w-[20px] transition-transform duration-[0.4s] ${
        checked || isOwner? "translate-x-[29px]" : "translate-x-[2px]"
      }`}
    ></span>
  </label>
  )
}
