import React, { useContext } from 'react'
import { Context } from '../../../context/GlobalContext'
import Orders from '../../../components/Orders'

const CafeOrders = () => {
    const {user} = useContext(Context)
    const fetchUrl = `cafe-orders/${user.cafeId}`
  return (
    <div>
        <Orders fetchUrl={fetchUrl} cafeOwner={true}/>
    </div>
  )
}

export default CafeOrders