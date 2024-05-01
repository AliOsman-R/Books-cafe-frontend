import React, { useState } from 'react'
import Modal from '../../../../components/Modal';
import { httpRequest } from '../../../../utils/httpsRequest';
import { toast } from 'sonner';
import { PrimaryButton } from '../../../../components/buttons';
import { BtnLoader } from '../../../../components/LoaderSpinner';
import { hasImagesChanged, trimFormData } from '../../../../utils/formUtils';

const EditItem = ({openModal, itemData, setItemData, setOpenModal, originalItemData, setItems, requiredFieldsMissing, isItemDataChanged, FormComponent, type, extraImagesKey}) => {
  const [btnLoading, setBtnLoading] = useState(false)
  const modalTitle = type === 'menu'? 'Menu Item' : type === 'events' ? 'Event' : 'Book'
  const resData = type === 'menu' ? 'menuItem' : type === 'events' ? 'event' : 'book';

  const handleUploadImages = async (name) => {
      try{
          const imagesForm = new FormData();
          itemData[name].forEach(image => {
              imagesForm.append('images', image.file);
          });
          imagesForm.append("imagesChanged", JSON.stringify(itemData[name]))
          imagesForm.append("originalImages", JSON.stringify(originalItemData[name]))
          const {data} = await httpRequest.put(`/image/`, imagesForm)
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
      if (requiredFieldsMissing(itemData)) {
          toast.error('Please fill all required fields.');
          return;
      }

      if (itemData.images.length === 0 || (extraImagesKey && itemData[extraImagesKey].length === 0)) {
          toast.error('Please upload at least one image.');
          return;
      }

      let ItemImages = []
      let placeImages = []
      setBtnLoading(true)
      
      if(hasImagesChanged(originalItemData.images, itemData.images))
      {
          ItemImages = await handleUploadImages('images')
      }

      if(extraImagesKey && hasImagesChanged(originalItemData[extraImagesKey], itemData[extraImagesKey]))
    {
        placeImages = await handleUploadImages(extraImagesKey)
    }
                  
      const trimedItem = trimFormData(itemData)
      const {images, bookPlaceImages, ...rest} = trimedItem
      const newItem ={...rest}
      if(ItemImages.length > 0)
          newItem['images'] = ItemImages

    if(extraImagesKey && placeImages.length > 0)
        newItem[extraImagesKey] = placeImages

      httpRequest.put(`/${type}/${itemData._id}`, newItem)
     .then(({data}) => {
      console.log(data)
      setOpenModal(false)
      setItems(prev=> prev.map(item => item._id === data[resData]._id? data[resData] : item))
      toast.success(data.message)
      setItemData(data[resData])
     })
     .catch(err => {
      console.log(err)
     }).finally(() => {setBtnLoading(false)})

  }

return (
  <div>
      <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
          <Modal.Header setOpenModal={setOpenModal}>Edit {modalTitle}</Modal.Header>
          <Modal.Body>
              <div className="h-screen w-[60vw]">
                  {openModal && <FormComponent formData={itemData} setFormData={setItemData}/>}
              </div>
          </Modal.Body>
          <Modal.Footer onClick={() => setOpenModal(false)}>
              <PrimaryButton onClick={handleUpdate} 
              disabled={btnLoading || !isItemDataChanged(itemData, originalItemData) || requiredFieldsMissing(itemData)} 
              className="h-[30px] min-w-[117px]">
                  {btnLoading ? <BtnLoader /> : "Update"}
              </PrimaryButton>
          </Modal.Footer>
      </Modal>
  </div>
)
}

export default EditItem