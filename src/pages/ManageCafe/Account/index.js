import React, { useContext, useEffect, useState } from 'react'
import InfoCard from '../../../components/cards/InfoCard'
import { Container } from '../../../components/inputs'
import { cafeInitialState } from '../../../data/initialStates'
import { PrimaryButton } from '../../../components/buttons'
import { AppLoader, BtnLoader } from '../../../components/LoaderSpinner'
import { validTypes, validateMalaysianPhoneNumber } from "../../../utils/validation";
import { toast } from 'sonner'
import { httpRequest } from '../../../utils/httpsRequest'
import { Context } from '../../../context/GlobalContext'
import ImageContainer from '../../../components/ImageContainer'
import CafeForm from './CafeForm'
import { isAnyFieldEmpty, isCafeInfoChanged } from '../../../utils/formUtils'
import { useNavigate } from 'react-router-dom'

const CafeProfile = () => {
    const [workingDays, setWorkingDays] = useState([]);
    const [cafeInfo, setCafeInfo] = useState(cafeInitialState)
    const [originalCafeInfo, setOriginalCafeInfo] = useState({...cafeInitialState,workingDays:[]})
    const [pageLoading, setPageLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const isChanged = isCafeInfoChanged(cafeInfo, originalCafeInfo, workingDays)
    const {name, phoneNumber, city, address, bio, latitude, longitude} = cafeInfo
    const cafeDataIsEmpty = {name, phoneNumber, city, address, bio, latitude, longitude}
    console.log(cafeInfo)

    useEffect(() => {
    httpRequest.get(`/cafe/user-cafe/${user._id}`)
    .then(({data}) => {
        console.log(data)
        const [longitude, latitude] = data.cafe.coordinates
        const cafeData = {...data.cafe, latitude, longitude}
        setCafeInfo(cafeData)
        setOriginalCafeInfo({...cafeData,workingDays:data.cafe?.workingDays})
        setWorkingDays(data.cafe?.workingDays.map(workDay => ({...workDay,id:workDay._id})))
    })
    .catch(err => {
        console.log(err)
        if(err?.response?.status === 401)
        {
            navigate('/auth/login')
        }
    })
    .finally(()=> {setPageLoading(false)})
    }, [])
    
    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (name === "image") {
            const file = files[0];
            const maxSize = 10 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                toast.error(
                    "Invalid file type. The image must be a JPEG, PNG, JPG, or SVG."
                );
                return;
            }

            if (file.size > maxSize) {
                toast.error("File size too large. The image must be less than 5 MB.");
                return;
            }
            if (files.length > 0) 
                setCafeInfo({ ...cafeInfo, image: file });
        }
    }

    const handleUpdateImage = async (changedCafeImage) => {
        try{
            const {data} = await httpRequest.put(`/image/${cafeInfo.imageId}`, changedCafeImage)
            return data.image
        }
        catch(err) {
            console.log(err);
            toast.error("Something went wrong with uploading image please try again later");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changedCafeInfo = {};
        const changedCafeImage = new FormData();

        if (cafeInfo.image !== originalCafeInfo.image) {
          changedCafeImage.append("image",cafeInfo.image)
        }
        if (cafeInfo.name.trim() !== originalCafeInfo.name) {
            changedCafeInfo["name"] = cafeInfo.name.trim()
        }
        if (cafeInfo.state.trim() !== originalCafeInfo.state) {
          changedCafeInfo['state'] = cafeInfo.state.trim()
        }
        if (cafeInfo.city.trim() !== originalCafeInfo.city) {
            changedCafeInfo['city'] = cafeInfo.city.trim()
        }
        if (cafeInfo.address.trim() !== originalCafeInfo.address) {
            changedCafeInfo['address'] = cafeInfo.address.trim()
        }  
        if (cafeInfo.bio.trim() !== originalCafeInfo.bio) {
            changedCafeInfo['bio'] = cafeInfo.bio.trim()
        }  
        if (cafeInfo.orderMethods.pickUpAtCafe !== originalCafeInfo.orderMethods.pickUpAtCafe) {
            changedCafeInfo['orderMethods'] = {...cafeInfo.orderMethods, pickUpAtCafe:cafeInfo.orderMethods.pickUpAtCafe}
        }  
        if (cafeInfo.orderMethods.delivery !== originalCafeInfo.orderMethods.delivery) {
            changedCafeInfo['orderMethods'] = {...cafeInfo.orderMethods, delivery:cafeInfo.orderMethods.delivery}
        }  
        if (cafeInfo.deliveryFee !== originalCafeInfo.deliveryFee) {
            changedCafeInfo['deliveryFee'] = cafeInfo.deliveryFee
        }  
        if (cafeInfo.deliveryEst.trim() !== originalCafeInfo.deliveryEst) {
            changedCafeInfo['deliveryEst'] = cafeInfo.deliveryEst.trim()
        } 
        if (cafeInfo.phoneNumber !== originalCafeInfo.phoneNumber) {
          changedCafeInfo['phoneNumber'] = cafeInfo.phoneNumber.toString()
        }
        if(changedCafeInfo.phoneNumber)
        {
          if(!validateMalaysianPhoneNumber(changedCafeInfo.phoneNumber))
            return toast.error("Phone number is invalid (E.g., 60123456789, 0123456789)")
        }

        if(isAnyFieldEmpty(cafeDataIsEmpty))
        {
            return toast.error('Cafes information must not be empty')
        }

        const coordinates = [parseFloat(cafeInfo.longitude), parseFloat(cafeInfo.latitude)]
        console.log(changedCafeInfo)

        setBtnLoading(true);
        if (cafeInfo.image !== originalCafeInfo.image) {
            const image = await handleUpdateImage(changedCafeImage);
            changedCafeInfo['image'] = image;
          }

        httpRequest.put(`/cafe/${user._id}`, {...changedCafeInfo, coordinates, workingDays})
          .then(({ data }) => {
            console.log(data);
            toast.success(data?.message);
            const {latitude,longitude} = data.cafe.coordinates
            const cafeData = {...data.cafe, latitude, longitude}
            setCafeInfo(cafeData);
            setOriginalCafeInfo(cafeData);
          })
          .catch((err) => {
            console.log(err)
            if (err?.response?.status === 403 )
              toast.error(err?.response?.data?.message);
            else toast.error("Something went wrong please try again later");
          })
          .finally(() => setBtnLoading(false));
      };

    if(pageLoading)  {
        return (
            <div className="flex justify-center items-center h-screen">
                <AppLoader/>
            </div>
        )
    }   
    
  return (
    <div>
        <div className="mb-7">
            <h1 className=" font-semibold text-2xl ">Cafe account</h1>
            <span>We are glad to see you again!</span>
        </div>
        <InfoCard>
            <div className="flex-2 font-medium">
                <h1>Cafe</h1>
                <h1>Information</h1>
            </div>
            <div className="flex-1 ">
                <Container labelName={'Cafe Image'}>
                    <ImageContainer 
                        handleChange={handleImageChange} 
                        imgName={'image'} 
                        setData={setCafeInfo} 
                        data={cafeInfo} 
                        height={'h-[350px]'}
                    />
                </Container>
                <div className="gap-5">
                    <CafeForm
                        cafeInfo={cafeInfo}
                        setCafeInfo={setCafeInfo}
                        workingDays={workingDays}
                        setWorkingDays={setWorkingDays}
                    />
                </div>
                <div className="flex justify-end p-3 ">
                    <PrimaryButton
                        disabled={btnLoading || !isChanged || isAnyFieldEmpty(cafeDataIsEmpty) || (cafeInfo.orderMethods.delivery === false && cafeInfo.orderMethods.pickUpAtCafe === false)}
                        onClick={handleSubmit}
                        className=" min-w-[192px] h-[45px]"
                    >
                        {btnLoading ? <BtnLoader  /> : "Update Cafe info"}
                    </PrimaryButton>
                </div>
            </div>
        </InfoCard>
    </div>
  )
}

export default CafeProfile