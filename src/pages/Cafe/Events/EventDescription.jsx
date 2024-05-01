import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EventDescription = ({ description }) => {
    // Function to convert JSON data to EditorState
    const convertFromJSON = (json) => {
        if (!json) {
            return EditorState.createEmpty(); // If no data, return empty state
        }
        const contentState = convertFromRaw(JSON.parse(json));
        return EditorState.createWithContent(contentState);
    };

    // Convert stored JSON data back to EditorState
    const editorState = convertFromJSON(description);

    return (
        <div className="mt-4">
            <Editor
                editorState={editorState}
                toolbarHidden={true} // Hide toolbar for display mode
                readOnly={true} // Make editor read-only
            />
        </div>
    );
};

export default EventDescription;
