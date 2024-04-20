import React, { useContext, useState } from 'react'
import Modal from '../../../../components/Modal';
import { PrimaryButton } from '../../../../components/buttons';
import { toast } from 'sonner';
import { BtnLoader } from '../../../../components/LoaderSpinner';
import { httpRequest } from '../../../../utils/httpsRequest';
import { Context } from '../../../../context/GlobalContext';
import { areRequiredMenuFieldsMissing, trimFormData } from '../../../../utils/formUtils';
import { menuInitialState } from '../../../../data/initialStates';
import MenuItemForm from './MenuItemForm';


const AddMenuItem = ({setMenu}) => {
    const [openModal, setOpenModal] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [menuItemData, setMenuItemData] = useState(menuInitialState);
    const {user} = useContext(Context)

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

    const handleAdd =async (e) => {
        e.preventDefault();
        if (areRequiredMenuFieldsMissing(menuItemData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (menuItemData.images.length === 0 ) {
            toast.error('Please upload at least one image.');
            return;
        }
        
        const imagesForm = new FormData();
        menuItemData.images.forEach(image => {
            imagesForm.append('images', image.file);
        });

        setBtnLoading(true)
        const menuItemImages = await handleUploadImages(imagesForm)
        
       const trimedMenuItemData = trimFormData(menuItemData)

       const newMenuItemData ={...trimedMenuItemData, images:menuItemImages || []}

       httpRequest.post(`/menu/${user._id}`, newMenuItemData)
       .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        setMenu(prev=> ([...prev, data.menuItem]))
        toast.success(data.message)
        setMenuItemData(menuInitialState)
       })
       .catch(err => {
        console.log(err)
       }).finally(() => {setBtnLoading(false)})

    };
  return (
    <div>
        <PrimaryButton className='h-[20px]' onClick={()=> setOpenModal(true)}>
            Add Menu Item
        </PrimaryButton>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>Add Menu Item</Modal.Header>
            <Modal.Body>
                <div className="h-screen">
                    {openModal && <MenuItemForm formData={menuItemData} setFormData={setMenuItemData} setBtnLoading={setBtnLoading}/>}
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton onClick={handleAdd} disabled={btnLoading || areRequiredMenuFieldsMissing(menuItemData)}  className="h-[30px] min-w-[117px]">
                    {btnLoading ? <BtnLoader /> : "Add"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AddMenuItem