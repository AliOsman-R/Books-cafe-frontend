import React, { useRef } from 'react'
import { PrimaryInput } from './inputs'
import { RiUploadCloud2Line } from 'react-icons/ri';
import { PrimaryButton } from './buttons';

const ImageContainer = ({handleChange, imgName , setData, data, height}) => {
    const fileInputRef = useRef(null);
    
    const handleRemove = (e) => {
        setData({ ...data, [imgName]: "" });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      };
      console.log(data[imgName])
  return (
    <>
        <label className="flex flex-col gap-2 mb-2" htmlFor="file-upload">
            {data[imgName] ? (
            <div className="relative">
                <img 
                    src={typeof(data[imgName]) === 'string'?data[imgName]:URL.createObjectURL(data[imgName])} 
                    alt={imgName}
                    className={`w-full object-cover rounded-md ${height}`}
                />
                <p className="absolute bottom-5 left-3 px-2 py-2 rounded-md bg-white z-50 cursor-pointer flex items-center gap-1">
                    <RiUploadCloud2Line size={20} />
                    Upload Photo
                </p>
            </div>
            ) : (
            <div className={` ${height} bg-gray-100 p-10 flex flex-col justify-center items-center gap-3 rounded-md cursor-pointer`}>
                <RiUploadCloud2Line size={30} />
                <p className="text-center text-xs text-gray-500">
                    Use high-quality JPEG, PNG, JPG, SVG less than 5 MB
                </p>
            </div>
            )}
        </label>
        {data[imgName] ? (
        <div className="flex">
        <PrimaryButton
            onClick={handleRemove}
            className="mb-5 w-[110px] h-[37px]"
        >
            Remove
        </PrimaryButton>
        </div>
        ) : (
            <div className="h-[58px]"></div>
        )}
        <PrimaryInput
            id="file-upload"
            onChange={handleChange}
            name="image"
            type="file"
            className="hidden"
            ref={fileInputRef}
        />
    </>
  )
}

export default ImageContainer