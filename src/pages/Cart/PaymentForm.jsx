import React, { useState } from 'react'
import { RiVisaFill } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { FaCcMastercard } from "react-icons/fa6";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { cardType, formatCardNumber } from '../../utils/AppUtils';
import { toast } from 'sonner';

const PaymentForm = ({cardNumber, setCardNumber, cvv, setCvv, expiry, setExpiry, setName , name}) => {
    const [type, setType] = useState('');
    const borderStyle = 'border border-gray-400 p-3 rounded-sm'

    const handleCardNumberChange = (e) => {
        let value = e.target.value;
        const formattedValue = formatCardNumber(value);
        setCardNumber(formattedValue);
        setType(cardType(formattedValue.replace(/-/g, '')));
      };
    
    const handleExpiryChange = (e) => {
      const value = e.target.value.slice(0, 5);
      const validFormat = value.replace(/[^0-9/]/g, '').replace(
          /^([0-9]{2})\/?([0-9]{2})$/,
          (match, p1, p2) => `${p1}/${p2}`
      );
      setExpiry(validFormat);
    };
    
    const handleCvvChange = (e) => {
    const value = e.target.value.slice(0, 3);
    setCvv(value.replace(/[^0-9]/g, ''));
    };
    

  return (
    <div className="flex flex-col mt-5">
        <p className='mb-2'>Card Information</p>
        <div className={`${borderStyle} flex items-center justify-between`}>
            <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={` outline-none border-none w-full`}
            placeholder="Enter your card number"
            inputMode="numeric" 
            maxLength="19" 
            />
            {type === 'visa' && <RiVisaFill size={25} color='blue'/>}
            {type === 'mastercard' && <FaCcMastercard size={25} color='orange' />}
            {!type && <CiCreditCard1 size={25}/>}
        </div>
        <div className={`flex`}>
            <input
            type="text"
            name="expiry"
            value={expiry}
            onChange={handleExpiryChange}
            className={`${borderStyle} outline-none border-t-0 w-full`}
            placeholder="MM/YY"
            maxLength="5"
            />
            <div className={`flex items-center ${borderStyle} border-t-0 w-full`}>
            <input
            type="text"
            name="cvv"
            value={cvv}
            onChange={handleCvvChange}
            className={` outline-none w-full`}
            placeholder="CVV"
            maxLength="3"
            />
            <HiOutlineCreditCard size={25}/>
            </div>
        </div>

        <p className='my-2 mt-5'>Name on card</p>
        <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value.trim())}
        className={`${borderStyle} outline-none w-full`}
        placeholder="Enter the name on the card"
        />
    </div>
  )
}

export default PaymentForm