import React, { useContext, useState } from 'react'
import { Context } from '../context/GlobalContext';
import { toast } from 'sonner';
import { httpRequest } from '../utils/httpsRequest';

const useSwitch = () => {
  const [alertLoading, setAlertLoading] = useState(false)
  const { user, actions } = useContext(Context);

    const handleSwitchToCustomer = (setToggle, setOpenAlertModal) => {
        setAlertLoading(true)
        httpRequest.post(`/cafe/switch-to-customer/${user._id}`)
        .then(({data}) => {
          console.log(data)
          actions({ type: 'SET_USER', payload: {...user, role:'customer'} })
          setToggle(false)
          setOpenAlertModal(false)
          toast.success("Switched back successfully")
        })
        .catch((err)=> {
          console.log(err)
          toast.error(err?.response?.data?.message)
          setToggle(true)
        }).finally(() => {setAlertLoading(false)} )
    }

    const handleSwitchToExistentCafe = (setToggle) => {
        setAlertLoading(true)
        httpRequest.post(`/cafe/switch-to-existent-cafe/${user._id}`)
        .then(({data}) => {
          console.log(data)
          actions({ type: 'SET_USER', payload: {...user, role:'owner'} })
          setToggle(true)
          toast.success("Switched back successfully")
        })
        .catch((err)=> {
          console.log(err)
          toast.error(err?.response?.data?.message)
          setToggle(false)
        }).finally(() => {setAlertLoading(false)} )
    }

    return {alertLoading, handleSwitchToCustomer, handleSwitchToExistentCafe}

}

export default useSwitch