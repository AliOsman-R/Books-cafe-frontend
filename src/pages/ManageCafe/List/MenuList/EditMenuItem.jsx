import React, { useState } from 'react'
import Modal from '../../../../components/Modal'
import { BtnLoader } from '../../../../components/LoaderSpinner'
import { PrimaryButton } from '../../../../components/buttons'
import { toast } from 'sonner'
import { httpRequest } from '../../../../utils/httpsRequest'
import { areRequiredMenuFieldsMissing, hasImagesChanged, isMenuItemDataChanged, trimFormData } from '../../../../utils/formUtils'
import MenuItemForm from './MenuItemForm'
const EditMenuItem = ({openModal, menuItemData, setMenuItemData, setOpenModal, originalMenuData, setMenu}) => {
    const [btnLoading, setBtnLoading] = useState(false)

    const handleUploadImages = async (menuItemImages) => {
        try{
            const {data} = await httpRequest.post(`/image/`, menuItemImages)
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
        if (areRequiredMenuFieldsMissing(menuItemData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (menuItemData.images.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }

        let menuItemImages = []
        setBtnLoading(true)
        
        if(hasImagesChanged(originalMenuData.images, menuItemData.images))
        {
            const imagesForm = new FormData();
            menuItemData.images.forEach(image => {
                imagesForm.append('images', image.file);
            });
            imagesForm.append("imagesChanged", JSON.stringify(menuItemData.images))
            imagesForm.append("originalImages", JSON.stringify(originalMenuData.images))
            menuItemImages = await handleUploadImages(imagesForm)
        }
                    
        const trimedMenuItem = trimFormData(menuItemData)
        const {images, ...rest} = trimedMenuItem
        const newMenuItem ={...rest}
        if(menuItemImages.length > 0)
            newMenuItem['images'] = menuItemImages

        httpRequest.put(`/menu/${menuItemData._id}`, newMenuItem)
       .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        setMenu(prev=> prev.map(menuItem => menuItem._id === data.menuItem._id? data.menuItem : menuItem))
        toast.success(data.message)
        setMenuItemData(data.menuItem)
       })
       .catch(err => {
        console.log(err)
       }).finally(() => {setBtnLoading(false)})

    }

  return (
    <div>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>Edit Menu Item</Modal.Header>
            <Modal.Body>
                <div className="h-screen">
                    {openModal && <MenuItemForm formData={menuItemData} setFormData={setMenuItemData}/>}
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton onClick={handleUpdate} 
                disabled={btnLoading || !isMenuItemDataChanged(menuItemData, originalMenuData) || areRequiredMenuFieldsMissing(menuItemData)} 
                className="h-[30px] min-w-[117px]">
                    {btnLoading ? <BtnLoader /> : "Update"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditMenuItem