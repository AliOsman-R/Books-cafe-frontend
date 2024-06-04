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
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [messages]);

    return (
        <div className='flex-1 overflow-auto p-4'>
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
                    const isLastMessage = index === messages.length - 1;
                    return (
                        <div key={message._id} ref={isLastMessage ? lastMessageRef : null}>
                            <Message message={message} selectedUser={selectedUser} />
                        </div>
                    );
                })}
        </div>
    );
}

export default Messages