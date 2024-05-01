import React, { useState } from 'react';
import { Container, PrimaryInput, TextareaInput, inputStyle } from '../../../../components/inputs';
import { toast } from 'sonner';
import ImagesUploader from '../../../../components/ImagesUploader';

const BookForm = ({formData, setFormData}) => {
    const isForSelling = formData.availability === 'Selling'

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "number" && value < 0) {
            toast.error("Please enter a non-negative value.");
            return;
        }
    
        let formattedValue = value;

        if (name === "genre") {
            formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        } 
    
        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    return (
        <div className="pb-[30px]">
            <form className="space-y-4">
                <Container labelName='Title'>
                    <PrimaryInput
                        type="text"
                        name="title"
                        className="mt-1 p-2 block w-full border"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Author'>
                    <PrimaryInput
                        type="text"
                        name="author"
                        placeholder="Enter author"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Genre'>
                    <PrimaryInput
                        type="text"
                        name="genre"
                        placeholder="Enter genre"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Availability'>
                    <select
                        name="availability"
                        className={inputStyle}
                        value={formData.availability}
                        onChange={handleChange}
                        required
                    >
                        <option value="Selling">Selling</option>
                        <option value="Reading">Reading</option>
                    </select>
                </Container>
                {!isForSelling && <Container labelName='Status'>
                    <select
                        name="status"
                        className={inputStyle}
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </Container>}
                {isForSelling && <Container labelName='Price ($)'>
                    <PrimaryInput
                        type="number"
                        name="price"
                        min={0}
                        placeholder="Enter price"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.price}
                        onChange={handleChange}
                        required={formData.availability === 'selling'}
                    />
                </Container>}
                <Container labelName='Description'>
                    <TextareaInput
                        name="description"
                        placeholder="Enter description"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Container>
                {isForSelling && <Container labelName='Stock'>
                    <PrimaryInput
                        type="number"
                        name="stock"
                        min={0}
                        placeholder="Enter stock"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.stock}
                        onChange={handleChange}
                        required={formData.availability === 'selling'}
                    />
                </Container>}
                <Container labelName='Publish Year'>
                    <PrimaryInput
                        type="number"
                        min={0}
                        name="publishYear"
                        placeholder="Enter publish year"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.publishYear}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <ImagesUploader
                    formData={formData}
                    setFormData={setFormData}
                    name="images"
                    labelName="Book Images"
                />
                <ImagesUploader
                    formData={formData}
                    setFormData={setFormData}
                    name="bookPlaceImages"
                    labelName="Book Place Images"
                />
            </form>
        </div>
    );
};

export default BookForm;
