import React, { useState } from 'react'
import Modal from '../../../../components/Modal'
import BookForm from './BookForm'
import { BtnLoader } from '../../../../components/LoaderSpinner'
import { PrimaryButton } from '../../../../components/buttons'
import { toast } from 'sonner'
import { httpRequest } from '../../../../utils/httpsRequest'
import { areRequiredBookFieldsMissing, hasImagesChanged, isBookDataChanged, trimFormData } from '../../../../utils/formUtils'

const EditBook = ({openModal, bookData, setBookData, setOpenModal, originalBookData, setBooks}) => {
    const [btnLoading, setBtnLoading] = useState(false)

    const handleUploadImages = async (bookImages) => {
        try{
            const {data} = await httpRequest.put(`/image/`, bookImages)
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
        if (areRequiredBookFieldsMissing(bookData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (bookData.images.length === 0 || bookData.bookPlaceImages.length === 0) {
            toast.error('Please upload at least one image and one book place image.');
            return;
        }

        let booksImages = []
        let placeImages = []
        setBtnLoading(true)
        
        if(hasImagesChanged(originalBookData.images, bookData.images))
        {
            const imagesForm = new FormData();
            bookData.images.forEach(image => {
                imagesForm.append('images', image.file);
            });
            imagesForm.append("imagesChanged", JSON.stringify(bookData.images))
            imagesForm.append("originalImages", JSON.stringify(originalBookData.images))
            booksImages = await handleUploadImages(imagesForm)
        }
        if(hasImagesChanged(originalBookData.bookPlaceImages, bookData.bookPlaceImages))
        {
            const placeImagesForm = new FormData();
            bookData.bookPlaceImages.forEach(image => {
                placeImagesForm.append('images', image.file);
            });
            placeImagesForm.append("originalImages", JSON.stringify(originalBookData.bookPlaceImages))
            placeImagesForm.append("imagesChanged", JSON.stringify(bookData.bookPlaceImages))
            placeImages = await handleUploadImages(placeImagesForm)
        }
                    
        const trimedBookData = trimFormData(bookData)
        const {images, bookPlaceImages, ...rest} = trimedBookData
        const newBookData ={...rest}
        if(booksImages.length > 0)
            newBookData['images'] = booksImages

        if(placeImages.length > 0)
            newBookData['bookPlaceImages'] = placeImages

        httpRequest.put(`/book/${bookData._id}`, newBookData)
       .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        setBooks(prev=> prev.map(book => book._id === data.book._id? data.book : book))
        toast.success(data.message)
        setBookData(data.book)
       })
       .catch(err => {
        console.log(err)
       }).finally(() => {setBtnLoading(false)})

    }

  return (
    <div>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>Edit book</Modal.Header>
            <Modal.Body>
                <div className="h-screen">
                    {openModal && <BookForm bookData={bookData} setBookData={setBookData}/>}
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton onClick={handleUpdate} 
                disabled={btnLoading || !isBookDataChanged(bookData, originalBookData) || areRequiredBookFieldsMissing(bookData)} 
                className="h-[30px] min-w-[117px]">
                    {btnLoading ? <BtnLoader /> : "Update"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditBook