import React, { useContext, useState } from 'react'
import { bookInitialState } from '../../../../data/initialStates';
import BookForm from './BookForm';
import Modal from '../../../../components/Modal';
import { PrimaryButton } from '../../../../components/buttons';
import { toast } from 'sonner';
import { BtnLoader } from '../../../../components/LoaderSpinner';
import { httpRequest } from '../../../../utils/httpsRequest';
import { Context } from '../../../../context/GlobalContext';
import { areRequiredBookFieldsMissing, trimFormData } from '../../../../utils/formUtils';

const AddBook = ({setBooks}) => {
    const [openModal, setOpenModal] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [bookData, setBookData] = useState(bookInitialState);
    const {user} = useContext(Context)

    const isEmptyImages = bookData.images.length === 0 || bookData.bookPlaceImages.length === 0

    const handleUploadImages = async (bookImages) => {
        try{
            const {data} = await httpRequest.post(`/image/`, bookImages)
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
        if (areRequiredBookFieldsMissing(bookData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (isEmptyImages) {
            toast.error('Please upload at least one image and one book place image.');
            return;
        }
        
        const imagesForm = new FormData();
        const placeImagesForm = new FormData();
        bookData.images.forEach(image => {
            imagesForm.append('images', image.file);
        });
        bookData.bookPlaceImages.forEach(image => {
            placeImagesForm.append('images', image.file);
        });

        setBtnLoading(true)
        const booksImagesPromise =  handleUploadImages(imagesForm)
        const placeImagesPromise = handleUploadImages(placeImagesForm)
        
       const [booksImages, placeImages] = await Promise.all([booksImagesPromise, placeImagesPromise])
       const trimedBookData = trimFormData(bookData)

       const newBookData ={...trimedBookData, images:booksImages || [], bookPlaceImages:placeImages || []}

       httpRequest.post(`/book/${user._id}`, newBookData)
       .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        setBooks(prev=> ([...prev, data.book]))
        toast.success(data.message)
        setBookData(bookInitialState)
       })
       .catch(err => {
        console.log(err)
       }).finally(() => {setBtnLoading(false)})

    };
  return (
    <div>
        <PrimaryButton className='h-[20px]' onClick={()=> setOpenModal(true)}>
            Add book
        </PrimaryButton>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>Add book</Modal.Header>
            <Modal.Body>
                <div className="h-screen">
                    {openModal && <BookForm bookData={bookData} setBookData={setBookData} setBtnLoading={setBtnLoading}/>}
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton onClick={handleAdd} disabled={btnLoading || areRequiredBookFieldsMissing(bookData)}  className="h-[30px] min-w-[117px]">
                    {btnLoading ? <BtnLoader /> : "Add"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AddBook