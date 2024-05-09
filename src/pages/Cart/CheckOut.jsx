import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/GlobalContext'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom'
import { calculateItemTotal, calculateOverallTotal, validateCardNumber, validateExpiry } from '../../utils/AppUtils';
import PaymentForm from './PaymentForm';
import { PrimaryButton } from '../../components/buttons';
import { httpRequest } from '../../utils/httpsRequest';
import { validateMalaysianPhoneNumber } from "../../utils/validation";
import { toast } from 'sonner';
import { BtnLoader } from '../../components/LoaderSpinner';
import PhoneInput from 'react-phone-input-2';

const phoneInputStyle = {
  width: "100%",
  borderRadius: "2px",
  padding: "12px 50px",
  borderTop:'0px',
  borderColor:'gray'
};
const CheckOut = () => {
  const {user, cartItems, actions, deliveryFee, orderOpt, specialRequest} = useContext(Context)
  const [address, setAddress] = useState({firstAddress:user.firstAddress || '', secondAddress:user.secondAddress|| ''})
  const [btnLoading, setBtnLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate()
  const sstRate = 0.06;
  const borderStyle = 'border border-gray-400 p-3 rounded-sm'

  useEffect(() => {
    if(cartItems.length === 0)
     navigate('/cart')
   }, [])

  const handleAddressChange = (e) => {
    const {name, value} = e.target
    setAddress({...address, [name]:value})
  }

  const handleChange = (type) => {
    if(type === 'delivery'){
      actions({type:'SET_ORDER_OPT', payload:"delivery"}); 
      actions({type:'SET_DELIVERY_FEE', payload:cartItems[0]?.cafeId.deliveryFee})
    }else{
      actions({type:'SET_ORDER_OPT', payload:"pick"}); 
      actions({type:'SET_DELIVERY_FEE', payload:0})
    }
  }

  const checkValidation = () => {
    const isCardNumberValid = validateCardNumber(cardNumber);
    return (
      cartItems.length === 0 || 
      (orderOpt === 'delivery' && (address.firstAddress?.trim() === '' || address.secondAddress?.trim() === '')) ||
      !name || 
      !isCardNumberValid || 
      expiry.length < 5 || 
      cvv.length < 3 || !phoneNumber
    );
  };

  const calculateSST = () => {
    const totalAmount = calculateOverallTotal(cartItems) ;
    const sstAmount = totalAmount * sstRate;
    return parseFloat(sstAmount.toFixed(2)); 
  };

  const totalAmount = (calculateOverallTotal(cartItems) + deliveryFee + calculateSST()).toFixed(2)

  const handlePay = () => {
    if(!validateExpiry(expiry)) return;

    if(!validateMalaysianPhoneNumber(phoneNumber))
    return toast.error("Phone number is invalid (E.g., 60123456789, 0123456789)")

    const orderData = {
      user,
      totalPrice : parseFloat(totalAmount),
      deliveryFee,
      sstAmount:calculateSST(),
      cafeId: cartItems[0].cafeId._id,
      cartItems,
      phoneNumber,
      lastFourDigits:cardNumber.slice(15,19),
      firstAddress:address.firstAddress,
      secondAddress:address.secondAddress,
      specialRequest
    }

    setBtnLoading(true)
    httpRequest.post(`/cart/place-order/${user._id}`, orderData)
    .then(({data}) => {
      console.log(data)
      actions({ type: 'SET_CART_ITEMS', payload: [] });
      actions({ type: 'SET_COMPELETED_ORDER', payload: true });
      navigate('/order/success')
    })
    .catch((err) => {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }).finally(() => {setBtnLoading(false)})
  }

  
  return (
      <div className="flex gap-5 flex-grow m-5 bg-white min-h-screen p-5 shadow-lg rounded-lg">

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-10">
            <GoArrowLeft 
            onClick={() => navigate('/cart')} 
            size={40} 
            className=' cursor-pointer hover:bg-gray-200 p-2 bg-gray-100 rounded-full'/>
            <span>Back to cart</span>
          </div>
          <div className="pl-20">
            <div className="">
              <h1 className='text-gray-500 text-2xl py-2'>Amount to be payed</h1>
              <span className="font-semibold text-4xl">{totalAmount} RM</span>
            </div>
            <div className="flex flex-col gap-3 mt-10">
            {cartItems.map(item => (
                <div className="flex  justify-between">
                  <div className="flex">
                    <img src={item.images[0].url} alt={item.name} className="w-10 h-10 object-cover rounded-lg mr-4" />
                    <div className="flex flex-col">
                      <span className='font-semibold'>{item.name || item.title}</span>
                      <span className='text-gray-400'>Qty <strong className='text-black'>{item.quantity}</strong></span>
                    </div>
                  </div>
                  <span className='font-semibold'>{calculateItemTotal(item)} RM</span>
                </div>
              ))}
              <span className='mt-7 text-gray-400'>
                Special Request: {specialRequest}
              </span>
            </div>
            <div className="mt-10 ml-[50px]">
                <div className="flex py-3 justify-between border-b border-gray-300">
                  <span>Subtotal</span>
                  <span className="">{calculateOverallTotal(cartItems)} RM</span>
                </div>
                <div className="flex py-3 justify-between border-b border-gray-300">
                  <span>Delivery fee</span>
                  <span className="">{deliveryFee} RM</span>
                </div>
                <div className="flex py-3 justify-between">
                  <span>SST ({(sstRate * 100).toFixed(2)}%)</span>
                  <span >{calculateSST()} RM</span>
                </div>
                <div className="flex py-3 justify-between">
                  <span className="font-semibold text-lg">Total due</span>
                  <span className="font-semibold">{totalAmount} RM</span>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 flex-1 border-l border-gray-300 pl-10">
          <h1 className='text-3xl py-2 font-semibold'>Pay with card</h1>
          <div className="flex flex-col mt-2">
            <p className='mb-2'>Delivery Option</p>
            {cartItems[0]?.cafeId.orderMethods.pickUpAtCafe &&
            <div className={`${borderStyle} flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                  <input 
                  type="radio" 
                  id="pickUp" 
                  name="order" 
                  checked={orderOpt === "pick"} 
                  onChange={() => {handleChange('pick')}} 
                  className="form-radio h-4 w-4 text-primaryColor cursor-pointer" />
                  <span className="text-gray-900">Pick up at the cafe</span>
              </div>
              <span>0 RM</span>
            </div>
            }
            {cartItems[0]?.cafeId.orderMethods.delivery  &&
            <div className={`${borderStyle} border-t-0 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <input 
                type="radio" 
                id="delivery" 
                name="order" 
                checked={orderOpt === "delivery"}
                onChange={() => {handleChange('delivery')}} 
                className="form-radio h-4 w-4 text-primaryColor cursor-pointer" />
                <span className="text-gray-900">Delivery</span>
                <span className='text-gray-400 text-sm'>({cartItems[0]?.cafeId.deliveryEst})</span>
              </div>
              <span>{cartItems[0]?.cafeId.deliveryFee} RM</span>
            </div>
            }
          </div>
          <PaymentForm
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cvv={cvv}
            setCvv={setCvv}
            expiry={expiry}
            setExpiry={setExpiry}
            name={name}
            setName={setName}
          />
          <div className="flex flex-col">
            <p className='mb-2'>Delivery Address</p>
            <input
              type="text"
              name="firstAddress"
              placeholder="Your Region/City/Postal Code"
              className={`${borderStyle} outline-none w-full`}
              value={address.firstAddress}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="secondAddress"
              placeholder="Your Street/Building/Floor/Unit"
              className={`${borderStyle} outline-none border-t-0 w-full`}
              value={address.secondAddress}
              onChange={handleAddressChange}
            />
            <PhoneInput
              country={"my"}
              name="phoneNumber"
              onlyCountries={['my']}
              value={phoneNumber}
              onChange={e => setPhoneNumber(e)}
              inputStyle={phoneInputStyle}
            />
          </div>
          <PrimaryButton 
          disabled={checkValidation() || btnLoading} 
          className='h-[45px]'
          onClick={handlePay}
          >
            {btnLoading ? <BtnLoader/> : 'Pay'}
          </PrimaryButton>
        </div>

      </div>
  )
}

export default CheckOut