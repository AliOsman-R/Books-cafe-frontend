import React, { useState } from 'react';
import { Container, PrimaryInput, TextareaInput } from '../../../../components/inputs';
import { toast } from 'sonner';
import ImagesUploader from '../../../../components/ImagesUploader';
import { compareTimes } from '../../../../utils/AppUtils';
const EventForm = ({formData, setFormData}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === 'endTime')
        {
            if(!compareTimes(formData.startTime, value))
            {
                toast.error('End time must be greater than start time');
                return;
            }
        }

        if(name === 'startTime' && formData.endTime)
        {
            if(!compareTimes(value, formData.endTime))
            {
                toast.error('End time must be greater than start time');
                return;
            }
        }
    
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(formData)

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
                <Container labelName='Location'>
                    <TextareaInput
                        type="text"
                        name="location"
                        placeholder="Enter event's location"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Date'>
                    <PrimaryInput
                        type="date"
                        name="date"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Start Time'>
                    <PrimaryInput
                        type="time"
                        name="startTime"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='End Time'>
                    <PrimaryInput
                        type="time"
                        name="endTime"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </Container>
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
                <ImagesUploader
                    formData={formData}
                    setFormData={setFormData}
                    name="images"
                    labelName="Menu Item Images"
                />
            </form>
        </div>
    );
}

export default EventForm