import React, { useState } from 'react'
import Modal from '../../../../components/Modal'
import { BtnLoader } from '../../../../components/LoaderSpinner'
import { PrimaryButton } from '../../../../components/buttons'
import { toast } from 'sonner'
import { httpRequest } from '../../../../utils/httpsRequest'
import { areRequiredEventFieldsMissing, hasImagesChanged, isEventDataChanged, trimFormData } from '../../../../utils/formUtils'
import EventForm from './EventForm'

const EditEvent = ({openModal, eventData, setEventData, setOpenModal, originalEventData, setEvents}) => {
    const [btnLoading, setBtnLoading] = useState(false)

    const handleUploadImages = async (eventImages) => {
        try{
            const {data} = await httpRequest.post(`/image/`, eventImages)
            console.log(data.imageIds)
            return data.imageIds
        }
        catch(err) {
            console.log(err);
            toast.error("Something went wrong with uploading image please try again later");
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (areRequiredEventFieldsMissing(eventData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (eventData.images.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }

        let eventImages = []
        setBtnLoading(true)
        
        if(hasImagesChanged(originalEventData.images, eventData.images))
        {
            const imagesForm = new FormData();
            eventData.images.forEach(image => {
                imagesForm.append('images', image.file);
            });
            imagesForm.append("imagesChanged", JSON.stringify(eventData.images))
            imagesForm.append("originalImages", JSON.stringify(originalEventData.images))
            eventImages = await handleUploadImages(imagesForm)
        }
                    
        const trimedEvent = trimFormData(eventData)
        const {images, ...rest} = trimedEvent
        const newEvent ={...rest}
        if(eventImages.length > 0)
            newEvent['images'] = eventImages

        httpRequest.put(`/event/${eventData._id}`, newEvent)
       .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        setEvents(prev=> prev.map(event => event._id === data.event._id? data.event : event))
        toast.success(data.message)
        setEventData(data.event)
       })
       .catch(err => {
        console.log(err)
       }).finally(() => {setBtnLoading(false)})

    }

  return (
    <div>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>Edit Event</Modal.Header>
            <Modal.Body>
                <div className="h-screen">
                    {openModal && <EventForm formData={eventData} setFormData={setEventData}/>}
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton onClick={handleUpdate} 
                disabled={btnLoading || !isEventDataChanged(eventData, originalEventData) || areRequiredEventFieldsMissing(eventData)} 
                className="h-[30px] min-w-[117px]">
                    {btnLoading ? <BtnLoader /> : "Update"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditEvent