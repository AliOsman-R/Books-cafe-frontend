import React, { useEffect, useRef } from 'react'
import { AppLoader } from '../../components/LoaderSpinner';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = ({selectedUser}) => {
	const { messages, loading } = useGetMessages();
    useListenMessages()
    const lastMessageRef = useRef();

    useEffect(() => {
        if (messages.length > 0) {
            // setTimeout(() => {
                lastMessageRef.current.scrollTo({
                    top: lastMessageRef.current.scrollHeight,
                    behavior: 'smooth'
                  });
            // }, 100);
        }
    }, [messages]);

    return (
        <div className='flex-1 overflow-auto p-4' ref={lastMessageRef}>
            {loading && (
                <div className='flex justify-center items-center h-full'>
                    <AppLoader />
                </div>
            )}
            {!loading && messages?.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
            {!loading &&
                messages?.length > 0 &&
                messages?.map((message, index) => {
                    return (
                        <div key={message._id} >
                            <Message message={message} selectedUser={selectedUser} />
                        </div>
                    );
                })}
        </div>
    );
}

export default Messages