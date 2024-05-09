import React, { useContext, useEffect, useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { PrimaryButton } from '../../components/buttons';
import { Container, PrimaryInput, TextareaInput } from '../../components/inputs';
import {Context} from '../../context/GlobalContext'
import { httpRequest } from '../../utils/httpsRequest';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import {AppLoader} from '../../components/LoaderSpinner'
import CartItem from './CartItem'
import { calculateOverallTotal } from '../../utils/AppUtils';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartItems, actions, pageLoading, isAuth, deliveryFee, orderOpt, specialRequest} = useContext(Context)
  const [deleteLoading, setDeleteLoading] = useState({loading:false, id:null});
  const navigate = useNavigate()
  const totalAmount = (calculateOverallTotal(cartItems) + deliveryFee).toFixed(2)

  const isDisable = cartItems.length === 0 

  const handleChange = (type) => {
    if(type === 'delivery'){
      actions({type:'SET_ORDER_OPT', payload:"delivery"}); 
      actions({type:'SET_DELIVERY_FEE', payload:cartItems[0]?.cafeId.deliveryFee})
    }else{
      actions({type:'SET_ORDER_OPT', payload:"pick"}); 
      actions({type:'SET_DELIVERY_FEE', payload:0})
    }
  }

  const handleSpecialReq = (e) => {
    actions({type:'SET_SPECIAL_REQUEST', payload:e.target.value})
  }

  const handleRemove = (itemId) => {
    setDeleteLoading({id:itemId, loading:true})
    httpRequest.delete(`/cart/${itemId}`)
    .then(({data}) => {
      const updatedItems = cartItems.filter(item => item._id !== itemId);
      toast.success(data.message)
      actions({ type: 'SET_CART_ITEMS', payload: updatedItems });
    })
    .catch((err) => {
      console.log(err)
      toast.error(`Something went wrong please try again later`);
    }).finally(() => { setDeleteLoading({id:null, loading:false})})
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    httpRequest.put(`/cart/${itemId}`, {quantity:newQuantity})
      .then(({data}) => {
        console.log(data)
        const updatedItems = cartItems.map(item =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
        actions({ type: 'SET_CART_ITEMS', payload: updatedItems });
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Something went wrong please try again later`);
      })
  };

  const handleCheckOut = () => {
    navigate('/check-out')
  }

  useEffect(() => {
   if(cartItems[0])
   {
    const fee = cartItems[0]?.cafeId.orderMethods.delivery? cartItems[0]?.cafeId.deliveryFee : 0
    actions({type:'SET_DELIVERY_FEE', payload:fee})
    actions({type:'SET_ORDER_OPT', payload:cartItems[0]?.cafeId.orderMethods.delivery? 'delivery' : 'pick'})
   }else{
    actions({type:'SET_DELIVERY_FEE', payload:0})
   }
  }, [cartItems[0]])

  useEffect(() => {
    if(!isAuth)
      actions({ type: 'SET_CART_ITEMS', payload: [] });
  }, [isAuth])

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AppLoader />
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 min-h-screen m-5 pb-20">
      <h2 className="text-2xl font-semibold mb-10">Shopping Cart</h2>
        <div className='mx-20'>
          <div className="min-h-[200px]">
            <div className="grid grid-cols-6 border-b border-gray-400 py-4">
              <span>Products</span>
              <span>Title</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Remove</span>
            </div>
            {cartItems.map(item => (
              <CartItem 
              key={uuidv4()} 
              deleteLoading={deleteLoading}
              item={item} 
              handleUpdateQuantity={handleUpdateQuantity} 
              handleRemove={handleRemove} 
              />
            ))}
          </div>
          {cartItems.length > 0 && 
          <div className="flex flex-col gap-4 my-10">
            <h1 className='font-bold text-xl'>Order Options:</h1>
            <div className="flex gap-4">
              {cartItems[0]?.cafeId.orderMethods.pickUpAtCafe &&
              <label htmlFor="pickUp" className="flex items-center gap-4 cursor-pointer">
                <span className="text-gray-900">Pick up at the cafe</span>
                <input 
                type="radio" 
                id="pickUp" 
                name="order" 
                checked={orderOpt === "pick"} 
                onChange={() => {handleChange('pick')}} 
                className="form-radio h-4 w-4 text-primaryColor" />
              </label>
              }
              {cartItems[0]?.cafeId.orderMethods.delivery  &&
              <label htmlFor="delivery" className="flex items-center gap-4 cursor-pointer">
                <span className="text-gray-900">Delivery</span>
                <input 
                type="radio" 
                id="delivery" 
                name="order" 
                checked={orderOpt === "delivery"}
                onChange={() => {handleChange('delivery')}} 
                className="form-radio h-4 w-4 text-primaryColor" />
                <span className='text-gray-400 text-sm'>({cartItems[0]?.cafeId.deliveryEst})</span>
              </label>
              }
            </div>
            <div className=" rounded-md mt-7 ">
                <h2 className="text-xl font-bold mb-4">Special Requests</h2>
                <TextareaInput
                  className="border rounded-md p-2 w-full h-24"
                  placeholder="Any special instructions or requests?"
                  value={specialRequest}
                  onChange={handleSpecialReq}
                />
             </div>
          </div>
          }
          <div className="flex gap-10 w-full mt-10">
            <div className="w-full mb-5">
                {/* <h1 className='mb-10 font-bold text-2xl'>Cart Totals</h1> */}
                <div className="flex py-3 justify-between border-b border-gray-300">
                  <span>Subtotal</span>
                  <span className="">{calculateOverallTotal(cartItems)} RM</span>
                </div>
                <div className="flex py-3 justify-between border-b border-gray-300">
                  <span>Delivery fee</span>
                  <span className="">{deliveryFee} RM</span>
                </div>
                <div className="flex py-3 justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold">{totalAmount} RM</span>
                </div>
            </div>
             
            {/* <div className="mb-5 w-full">
              <h1 className='mb-10 font-bold text-2xl'>Delivery Details</h1>
              <div className="flex flex-col gap-3">
                <Container labelName={"Region/City/Postal Code"}>
                    <PrimaryInput
                      type="text"
                      name="firstAddress"
                      placeholder="Your Region/City/Postal Code"
                      value={address.firstAddress}
                      onChange={handleChange}
                    />
                  </Container>
                  <Container labelName={"Street/Building/Floor/Unit"}>
                    <PrimaryInput
                      type="text"
                      name="secondAddress"
                      placeholder="Your Street/Building/Floor/Unit"
                      value={address.secondAddress}
                      onChange={handleChange}
                    />
                  </Container>
              </div>
            </div> */}
          </div>
          <div className="w-[30%]">
            <PrimaryButton disabled={isDisable} onClick={handleCheckOut} className='h-[38px] w-full'>
              Check Out
            </PrimaryButton>
          </div>
        </div>
    </div>
  );
}

export default Cart


