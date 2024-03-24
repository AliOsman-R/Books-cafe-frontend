import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IoIosLogOut } from "react-icons/io";
import { Context } from '../context/GlobalContext';
import { CgProfile } from 'react-icons/cg';
import { httpRequest } from '../utils/httpsRequest';
import { toast } from 'sonner';
import { BtnLoader } from '../components/LoaderSpinner';

const Sidebar = ({sidebarList}) => {
  const [btnLoading, setBtnLoading] = useState(false)
  const {user, actions} = useContext(Context)
  const navigate = useNavigate();
  const location = useLocation()
  const activePage = location.pathname.split('/')[3]


  const handleLogout = () => {
    setBtnLoading(true)
    httpRequest.post('/auth/logout')
    .then(data => {
      toast.success("Logged out successfully")
      actions({ type: 'SET_IS_AUTH', payload: false })
      actions({ type: 'SET_USER', payload: {} })
      navigate('/auth/login')
      console.log(data)
    })
    .catch(err => {
      toast.error('Something went wrong!')
      console.log('err: ', err)
    })
    .finally(() => setBtnLoading(false))
  }

  const linkStyle = 'py-4 pl-2 pr-[130px] h-[56px] w-full flex items-center gap-2 hover:bg-[#172133]'

  return (
    <div className='flex flex-col justify-between h-[80vh]'>
      <div className="">
        <div className="flex items-center flex-col gap-2 my-4 mb-6">
          {user?.profileImage?
          <img src={user?.profileImage} alt="profile-image"  className=' rounded-full size-[80px]'/> 
          : <CgProfile className='size-[80px] rounded-full'/>} 
          <h1 className='text-[20px] font-medium overflow-hidden'>{user.name}</h1>
        </div>
        {sidebarList.map(item => (
          <div className="flex flex-col " key={uuidv4()}>
            <Link to={`/user/profile/${item.path}`} className={`${linkStyle} ${activePage.toLocaleLowerCase() === item.path? 'bg-[#172133]': '' }`}>
              <span>{item.icon}</span>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="">
        <button disabled={btnLoading} onClick={handleLogout} className={`${linkStyle}`}>
          <span><IoIosLogOut/></span>
          {btnLoading? <BtnLoader size={25}/> : 'Logout'}
        </button>
      </div>
    </div>
  )
}

export default Sidebar