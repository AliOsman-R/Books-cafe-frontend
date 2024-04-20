import React, { useContext, useState } from 'react'
import Modal from '../../../../components/Modal';
import { PrimaryButton } from '../../../../components/buttons';
import { toast } from 'sonner';
import { BtnLoader } from '../../../../components/LoaderSpinner';
import { httpRequest } from '../../../../utils/httpsRequest';
import { Context } from '../../../../context/GlobalContext';
import { areRequiredEventFieldsMissing, trimFormData } from '../../../../utils/formUtils';
import { eventInitialState } from '../../../../data/initialStates';
import EventForm from './EventForm';

const AddEvent = ({setEvents}) => {
    const [openModal, setOpenModal] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [eventData, setEventData] = useState(eventInitialState);
    const {user} = useContext(Context)

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

    const handleAdd =async (e) => {
        e.preventDefault();
        if (areRequiredEventFieldsMissing(eventData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (eventData.images.length === 0 ) {
            toast.error('Please upload at least one image.');
            return;
        }
        
        const imagesForm = new FormData();
        eventData.images.forEach(image => {
            imagesForm.append('images', image.file);
        });

        setBtnLoading(true)
        const eventImages = await handleUploadImages(imagesForm)
        
       const trimedEventData = trimFormData(eventData)

       const newEventData ={...trimedEventData, images:eventImages || []}

       httpRequest.post(`/event/${user._id}`, newEventData)
       .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        setEvents(prev=> ([...prev, data.event]))
        toast.success(data.message)
        setEventData(eventInitialState)
       })
       .catch(err => {
        console.log(err)
       }).finally(() => {setBtnLoading(false)})

    };
  return (
    <div>
        <PrimaryButton className='h-[20px]' onClick={()=> setOpenModal(true)}>
            Add Event
        </PrimaryButton>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>Add Event</Modal.Header>
            <Modal.Body>
                <div className="h-screen">
                    {openModal && <EventForm formData={eventData} setFormData={setEventData} setBtnLoading={setBtnLoading}/>}
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton onClick={handleAdd} disabled={btnLoading || areRequiredEventFieldsMissing(eventData)}  className="h-[30px] min-w-[117px]">
                    {btnLoading ? <BtnLoader /> : "Add"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AddEvent