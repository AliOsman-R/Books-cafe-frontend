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
            const { name, value } = e?.target;
            if(name === 'longitude' || name === 'latitude')
                setCafeInfo(prevState => ({ ...prevState, [name]: parseFloat(value) }));
            else
                setCafeInfo(prevState => ({ ...prevState, [name]: value }));
        }
      };

      console.log(cafeInfo.longitude, cafeInfo.latitude)
  return (
    <>
        <div className="grid lg:grid-cols-2 md:grid-cols-1   gap-5">
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
            <Container labelName={"Bio"} >
                <TextareaInput className="min-h-[50px] max-h-full overflow-y-auto" maxLength='250' value={cafeInfo.bio} onChange={handleChange} name="bio" placeholder="Your cafe bio"/>
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