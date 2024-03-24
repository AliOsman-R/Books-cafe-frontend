import React from 'react'
import Sidebar from '../../components/Sidebar'
import {Outlet } from 'react-router-dom'
import { sidebarList } from '../../data/data'

const Profile = ({}) => {

  return (
    <div>
      <div className="flex flex-grow w-full min-h-[100vh]">
        <div className="flex-2 border-r shadow-lg bg-[#1d293e] text-white">
          <Sidebar sidebarList={sidebarList} />
        </div>
        <div className="flex-1 p-5 px-20">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Profile