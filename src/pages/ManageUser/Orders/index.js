import React, { useContext } from 'react'
import Orders from '../../../components/Orders'
import { Context } from '../../../context/GlobalContext'

const UserOrders = () => {
    const {user} = useContext(Context)
    const fetchUrl = `user-orders/${user._id}`
  return (
    <div>
        <Orders fetchUrl={fetchUrl} />
    </div>
  )
}

export default UserOrders