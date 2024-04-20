import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/GlobalContext';
import { Container, PrimaryInput, phoneInputStyle } from '../../../components/inputs';
import InfoCard from '../../../components/InfoCard';
import {userInitialState} from '../../../data/initialStates'
import { PrimaryButton } from '../../../components/buttons';
import 'react-phone-input-2/lib/bootstrap.css'
import { BtnLoader } from '../../../components/LoaderSpinner';
import { toast } from 'sonner';
import { validTypes, validateMalaysianPhoneNumber } from '../../../utils/validation';
import { httpRequest } from '../../../utils/httpsRequest';
import PhoneInput from 'react-phone-input-2';
import ImageContainer from '../../../components/ImageContainer';
import { isUserInfoChanged } from '../../../utils/formUtils';


const InfoForm = () => {
    const [userInfo, setUserInfo] = useState(userInitialState);
      const [originalUserInfo, setOriginalUserInfo] = useState(userInitialState);
      const [btnLoading, setBtnLoading] = useState(false);
      const { user, actions } = useContext(Context);
      console.log(user)
    
      useEffect(() => {
        if (user) setUserInfo({ ...userInfo, ...user });
        setOriginalUserInfo({ ...originalUserInfo, ...user });
      }, [user]);
    
      const handleChange = (e) => {
        const { name, value, files } = e.target || {};
        if (name === "image") {
        const file = files[0];
        const maxSize = 10 * 1024 * 1024;

        if (!validTypes.includes(file?.type)) {
            toast.error("Invalid file type. The image must be a JPEG, PNG, JPG, or SVG.");
            return;
        }

        if (file.size > maxSize) {
            toast.error("File size too large. The image must be less than 5 MB.");
            return;
        }

        setUserInfo(prevState => ({ ...prevState, profileImage: file }));
        } else if (name) {
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
        } else {
        setUserInfo(prevState => ({ ...prevState, phoneNumber: e }));
        }
      };

      const handleUpdateImage = async (changedUserImage) => {
        try{
          const {data} = await httpRequest.put(`/image/${user.imageId}`, changedUserImage)
          return data.image
        }
        catch(err) {
          console.log(err);
          toast.error("Something went wrong with uploading image please try again later");
        }
      }

      const handleSubmit = async () => {
        const changedUserInfo = {};
        const changedUserImage = new FormData();

        if (userInfo.profileImage !== originalUserInfo.profileImage) {
          changedUserImage.append("image",userInfo.profileImage)
        }
        if (userInfo.name.trim() !== originalUserInfo.name) {
          changedUserInfo["name"] = userInfo.name.trim()
        }
        if (userInfo.email.trim() !== originalUserInfo.email) {
          changedUserInfo["email"] = userInfo.email.trim()
        }
        if (userInfo.firstAddress.trim() !== originalUserInfo.firstAddress) {
          changedUserInfo["firstAddress"] = userInfo.firstAddress.trim()
        }
        if (userInfo.secondAddress.trim() !== originalUserInfo.secondAddress) {
          changedUserInfo["secondAddress"] = userInfo.secondAddress.trim()
        }
        if (userInfo.phoneNumber !== originalUserInfo.phoneNumber) {
          changedUserInfo["phoneNumber"] = userInfo.phoneNumber.toString()
        }
        if(changedUserInfo.phoneNumber)
        {
          if (!validateMalaysianPhoneNumber(userInfo.phoneNumber)) {
            return toast.error("Phone number is invalid (E.g., 60123456789, 0123456789)");
          }
        }

        if(!userInfo.name.trim() || !userInfo.email.trim())
          return toast.error("Name and Email cant be empty")

        setBtnLoading(true);
        if (userInfo.profileImage !== originalUserInfo.profileImage) {
          const profileImage = await handleUpdateImage(changedUserImage);
          changedUserInfo['profileImage'] = profileImage;
        }

        httpRequest.put(`/user/update-info/${user._id}`, changedUserInfo)
          .then(({ data }) => {
            console.log(data);
            toast.success(data?.message);
            const newData = {...user,...data.user}
            setUserInfo(newData);
            setOriginalUserInfo(newData);
            actions({ type: "SET_USER", payload: newData });
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.status === 403)
              toast.error(err?.response?.data?.message);
            else toast.error("Something went wrong please try again later");
          }).finally(() => setBtnLoading(false))
      }
    
    
  return (
    <InfoCard>
          <div className="flex-2 font-medium">
            <h1>Profile</h1>
            <h1>Information</h1>
          </div>
          <div className="flex-1 md:flex md:flex-col">
            <Container>
                <div className="w-full max-w-xs">
                  <ImageContainer 
                    handleChange={handleChange} 
                    imgName={'profileImage'} 
                    setData={setUserInfo} 
                    data={userInfo} 
                    height={'h-[240px]'}
                  />
                </div>
            </Container>
            <div className="lg:grid lg:grid-cols-2 ssm:flex ssm:flex-col gap-3">
                <Container labelName={"Email"}>
                  <PrimaryInput
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </Container>
                <Container labelName={"Full Name"}>
                  <PrimaryInput
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={userInfo.name}
                    onChange={handleChange}
                  />
                </Container>
                <Container labelName={"Phone Number"}>
                  <PhoneInput
                    country={"my"}
                    name="phoneNumber"
                    onlyCountries={['my']}
                    value={userInfo.phoneNumber}
                    onChange={handleChange}
                    inputStyle={phoneInputStyle}
                  />
                </Container>
                <Container labelName={"Region/City/Postal Code"}>
                  <PrimaryInput
                    type="text"
                    name="firstAddress"
                    placeholder="Your Region/City/Postal Code"
                    value={userInfo.firstAddress}
                    onChange={handleChange}
                  />
                </Container>
                <Container labelName={"Street/Building/Floor/Unit"}>
                  <PrimaryInput
                    type="text"
                    name="secondAddress"
                    placeholder="Your Street/Building/Floor/Unit"
                    value={userInfo.secondAddress}
                    onChange={handleChange}
                  />
                </Container>
            </div>
            <div className="flex justify-end p-3 ">
              <PrimaryButton
                disabled={btnLoading || !isUserInfoChanged(userInfo, originalUserInfo)}
                onClick={handleSubmit}
                className=" min-w-[175px] h-[45px]"
              >
                {btnLoading ? <BtnLoader /> : "Update Profile"}
              </PrimaryButton>
            </div>
          </div>
        </InfoCard>
  )
}

export default InfoForm