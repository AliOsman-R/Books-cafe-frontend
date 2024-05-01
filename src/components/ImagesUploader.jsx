import React from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { Container, PrimaryInput } from './inputs';
import { FaTrashAlt } from 'react-icons/fa';
import { validTypes } from '../utils/validation';
import { toast } from 'sonner';

const ImagesUploader = ({ formData, setFormData, name, labelName }) => {
    const handleImageChange = (e) => {
        const { files } = e.target;
        const newFiles = Array.from(files);
    
        if (newFiles.length + formData[name].length > 4) {
            toast.error('You can upload a maximum of 4 images.');
            return;
        }
    
        const filteredValidFiles = newFiles.filter(file => {
            const maxSize = 10 * 1024 * 1024;
            if (!validTypes.includes(file.type)) {
                toast.error('Invalid file type. The image must be a JPEG, PNG, JPG, or SVG.');
                return false;
            }
            if (file.size > maxSize) {
                toast.error(`File "${file.name}" size too large. The image must be less than 10 MB.`);
                return false;
            }
            return true;
        });
    
        const newImages = filteredValidFiles.map(file => ({
            file,
            url: URL.createObjectURL(file),
            isNew: true,
        }));
    
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: [...prevFormData[name], ...newImages],
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: prevFormData[name].filter((_, i) => i !== index),
        }));
    };

    return (
        <Container labelName={labelName}>
            <div className="flex items-center gap-4 mb-2">
                {formData[name].map((image, index) => (
                    <div className="relative" key={index}>
                        <img className="size-[160px]" src={image.url} alt="" />
                        <span
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-3 right-3 bg-red-500 p-2 rounded-lg text-white cursor-pointer"
                        >
                            <FaTrashAlt />
                        </span>
                    </div>
                ))}
            </div>
            <label className="flex flex-col gap-2 mb-2" htmlFor={`${name}-upload`}>
                <div
                    className={`h-56 bg-gray-100 p-10 flex flex-col justify-center items-center gap-3 rounded-md cursor-pointer`}
                >
                    <RiUploadCloud2Line size={30} />
                    <p className="text-center text-xs text-gray-500">
                        Use high-quality JPEG, PNG, JPG, SVG less than 5 MB
                    </p>
                </div>
            </label>
            <PrimaryInput
                id={`${name}-upload`}
                onChange={handleImageChange}
                name={name}
                type="file"
                className="hidden"
            />
        </Container>
    );
};

export default ImagesUploader