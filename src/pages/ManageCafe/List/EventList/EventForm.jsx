import React, { useState } from 'react';
import { Container, PrimaryInput, TextareaInput } from '../../../../components/inputs';
import { toast } from 'sonner';
import ImagesUploader from '../../../../components/ImagesUploader';
import { compareTimes } from '../../../../utils/AppUtils';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const EventForm = ({formData, setFormData}) => {
    const [editorState, setEditorState] = useState(() => {
        if (formData.description) {
            return EditorState.createWithContent(convertFromRaw(JSON.parse(formData.description)));
        } else {
            return EditorState.createEmpty();
        }
    });
    const formattedDate = formData.date ? formData.date.split('T')[0] : '';

    const handleDesChange = (editorState) => {
        setEditorState(editorState);
        setFormData(prev => ({
            ...prev,
            description: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        }));
    };

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
                        value={formattedDate}
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
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleDesChange}
                        toolbar={{
                            options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
                            inline: {
                                options: ['bold', 'italic', 'underline', 'strikethrough'],
                                className: 'demo-option-custom',
                            },
                            list: {
                                options: ['unordered', 'ordered'],
                            },
                        }}
                    />
                </Container>
                <ImagesUploader
                    formData={formData}
                    setFormData={setFormData}
                    name="images"
                    labelName="Event Images"
                />
            </form>
        </div>
    );
}

export default EventForm