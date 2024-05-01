import React, { useContext, useState } from 'react';
import Modal from '../../../../components/Modal';
import { PrimaryButton } from '../../../../components/buttons';
import { toast } from 'sonner';
import { BtnLoader } from '../../../../components/LoaderSpinner';
import { httpRequest } from '../../../../utils/httpsRequest';
import { Context } from '../../../../context/GlobalContext';
import { trimFormData } from '../../../../utils/formUtils';

const AddItem = ({ type, FormComponent, initialState, requiredFieldsMissing, setItems, extraImagesKey = null }) => {
    const [openModal, setOpenModal] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [itemData, setItemData] = useState(initialState);
    const { user } = useContext(Context);
    const modalTitle = type === 'menu'? 'Menu Item' : type === 'events' ? 'Event' : 'Book'
    const resData = type === 'menu' ? 'menuItem' : type === 'events' ? 'event' : 'book';

    const handleUploadImages = async (images) => {
        try {
            const formData = new FormData();
            images.forEach(image => formData.append('images', image.file));
            const { data } = await httpRequest.post(`/image/`, formData);
            console.log(data.imageIds);
            return data.imageIds;
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong with uploading image please try again later");
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (requiredFieldsMissing(itemData)) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (itemData.images.length === 0 || (extraImagesKey && itemData[extraImagesKey].length === 0)) {
            toast.error('Please upload at least one image for each required category.');
            return;
        }

        setBtnLoading(true);
        const itemImagesPromise = handleUploadImages(itemData.images);
        const extraImagesPromise = extraImagesKey ? handleUploadImages(itemData[extraImagesKey]) : Promise.resolve([]);

        const [itemImages, extraImages] = await Promise.all([itemImagesPromise, extraImagesPromise]);

        const trimedItemData = trimFormData(itemData)

        const newItemData = {
            ...trimedItemData,
            images: itemImages || [],
            ...(extraImagesKey && { [extraImagesKey]: extraImages || [] })
        };

        httpRequest.post(`/${type}/${user._id}`, newItemData)
            .then(({ data }) => {
                console.log(data);
                setOpenModal(false);
                setItems(prev => ([...prev, data[resData]]));
                toast.success(data.message);
                setItemData(initialState);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setBtnLoading(false);
            });
    };

    return (
        <div>
            <PrimaryButton className='h-[20px]' onClick={() => setOpenModal(true)}>
                {`Add ${modalTitle}`}
            </PrimaryButton>
            <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
                <Modal.Header setOpenModal={setOpenModal}>{`Add ${modalTitle}`}</Modal.Header>
                <Modal.Body>
                    <div className="h-screen w-[60vw]">
                        {openModal && <FormComponent formData={itemData} setFormData={setItemData} setBtnLoading={setBtnLoading} />}
                    </div>
                </Modal.Body>
                <Modal.Footer onClick={() => setOpenModal(false)}>
                    <PrimaryButton onClick={handleAdd} disabled={btnLoading || requiredFieldsMissing(itemData)} className="h-[30px] min-w-[117px]">
                        {btnLoading ? <BtnLoader /> : "Add"}
                    </PrimaryButton>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddItem;
