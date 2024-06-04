import React, { useContext } from 'react'
import { toast } from 'sonner'
import { Context } from '../context/GlobalContext'
import { httpRequest } from '../utils/httpsRequest'

const useClearCart = () => {
    const {actions, user} = useContext(Context)
  
    const clearCart = (setAlertLoading , type, item, cafe, quantity, setOpenAlertModal) => {
        setAlertLoading(true)
        httpRequest.delete(`/cart/clear/${user._id}`)
        .then(({data}) => {
            const cartData = {
              userId:user._id,
              cafeId:cafe._id,
              type,
              productName:item.name || item.title,
              quantity
            }
            httpRequest.post(`/cart/${item._id}`, cartData)
            .then(({data}) => {
              actions({type:'SET_CART_ITEMS', payload:[{ ...item, quantity }]})
              toast.success(`${quantity} ${item.name || item.title} added to the cart`);
            })
            .catch((err) => {
              console.log(err)
              toast.error(`Something went wrong please try again later`);
            })
        })
        .catch((err) => {
          console.log(err)
          toast.error(`Something went wrong please try again later`);
        }).finally(() => {setAlertLoading(false); setOpenAlertModal(false)})
      }

      return {clearCart}
}

export default useClearCart