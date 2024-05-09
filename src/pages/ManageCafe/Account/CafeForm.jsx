import React, { useEffect, useRef, useState } from 'react'
import { Container, PrimaryInput, TextareaInput, inputStyle, phoneInputStyle } from '../../../components/inputs';
import PhoneInput from 'react-phone-input-2';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import WorkingDaysSelector from './WorkingDaysSelector';
import { states } from '../../../data/data';
import { v4 as uuidv4 } from 'uuid';

const CafeForm = ({workingDays, setWorkingDays, cafeInfo, setCafeInfo}) => {
    const [showDescription, setShowDescription] = useState(false);
    const descriptionRef = useRef(null);
  
    const handleToggleDescription = () => {
      setShowDescription((prev) => !prev);
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);
  
    const handleClickOutside = (event) => {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setShowDescription(false);
      }
    };

    const handleChange = (e) => {
        if (!e?.target) {
          setCafeInfo(prevState => ({ ...prevState, phoneNumber: e }));
        } else {
            const { name, value, checked  } = e?.target;
            if (name === 'longitude' || name === 'latitude') {
                setCafeInfo(prevState => ({ ...prevState, [name]: parseFloat(value) }));
            } else if (name === 'pickUpAtCafe' || name === 'delivery') {
                setCafeInfo(prevState => ({ ...prevState, orderMethods: { ...prevState.orderMethods, [name]: checked } }));
            } else if (name === 'deliveryFee') {
                setCafeInfo(prevState => ({ ...prevState, [name]: parseFloat(value) }));
            } else {
                setCafeInfo(prevState => ({ ...prevState, [name]: value }));
            }
        }
      };
      
  return (
    <>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5">
            <Container labelName={"Cafe Name"}>
                <PrimaryInput type="text" value={cafeInfo.name} onChange={handleChange} name="name" placeholder="Your cafe name" />
            </Container>
            <Container labelName={"Phone Number"}>
                <PhoneInput
                    country={"my"}
                    name="phoneNumber"
                    onlyCountries={['my']}
                    value={cafeInfo.phoneNumber}
                    onChange={handleChange}
                    inputStyle={phoneInputStyle}
                />
            </Container>
            <Container labelName={"State"}>
                <select value={cafeInfo.state} className={inputStyle} onChange={handleChange} name="state" id="">
                {states.map((state) => (
                    <option key={uuidv4()} value={state}>{state}</option>
                ))}
                </select>
            </Container>
            <Container labelName={"City"}>
                <PrimaryInput type="text" value={cafeInfo.city} maxLength={'15'} onChange={handleChange} name="city" placeholder="Your cafe city" />
            </Container>
            <Container labelName={"Address"}>
                <PrimaryInput type="text" value={cafeInfo.address} onChange={handleChange} name="address" placeholder="Your cafe address"/>
            </Container>
        </div>
        <Container labelName={"Bio"} className='mt-5'>
            <TextareaInput className="min-h-[50px] max-h-full overflow-y-auto" maxLength='250' value={cafeInfo.bio} onChange={handleChange} name="bio" placeholder="Your cafe bio"/>
        </Container>
        <div className="mt-5">
        <Container labelName={"Order Fulfillment Options"}>
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={cafeInfo.orderMethods.pickUpAtCafe} onChange={handleChange} name='pickUpAtCafe' className="form-checkbox h-5 w-5" />
                <span className="ml-2 text-gray-900">Pick up at the cafe</span>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={cafeInfo.orderMethods.delivery} onChange={handleChange} name='delivery' className="form-checkbox h-5 w-5" />
                <span className="ml-2 text-gray-900">Delivery</span>
            </div>
            {cafeInfo.orderMethods.delivery &&
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5">
                <Container labelName={"Delivery fee"}>
                    <PrimaryInput type="number" min={0} value={cafeInfo.deliveryFee} onChange={handleChange} name="deliveryFee"  />
                </Container>
                <Container labelName={"Delivery Estimation"}>
                    <PrimaryInput type="text" value={cafeInfo.deliveryEst} onChange={handleChange} name="deliveryEst" placeholder="e.g., 30-45 minutes" />
                </Container>
            </div> 
            }
        </Container>
        </div>
        <div className="my-5">
            <div className="flex gap-2 mb-2 items-center" >
                <span className="text-gray-500"> Latitude & Longitude </span>
                <div className="relative">
                    <HiQuestionMarkCircle
                    className="text-gray-500 cursor-pointer"
                    onClick={handleToggleDescription}
                    />
                    {showDescription && (
                        <div
                        className="absolute top-0 left-full ml-2 p-3 bg-white border border-gray-300 shadow-lg rounded-lg z-10"
                        ref={descriptionRef}
                        >
                            <p className="text-sm">
                                Latitude and longitude are coordinates used to specify locations
                                on the Earth's surface. Check{" "}
                                <a
                                className="text-blue-500 hover:underline"
                                href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                https://support.google.com/maps
                                </a>{" "}
                                for more information.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-4 ssm:flex-col md:flex-row">
                <Container labelName='Latitude'>
                    <PrimaryInput value={cafeInfo.latitude} min={0} placeholder="Cafe latitude" onChange={handleChange} name='latitude' type="number" />
                </Container>
                <Container labelName='Longitude'>
                    <PrimaryInput value={cafeInfo.longitude} min={0} placeholder="Cafe longitude" onChange={handleChange} name='longitude' type="number" />
                </Container>
            </div>
        </div>
        <WorkingDaysSelector workingDays={workingDays} setWorkingDays={setWorkingDays} />
    </>
  )
}

export default CafeForm