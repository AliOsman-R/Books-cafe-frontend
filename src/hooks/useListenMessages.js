import { useContext, useEffect } from "react";


import { Context } from "../context/GlobalContext";

const useListenMessages = () => {
	const { socket, messages, actions, userChats, selectedUserId } = useContext(Context);

	useEffect(() => {
		socket?.on("newMessage", ({newMessage, senderId}) => {
			if(senderId === selectedUserId)
				actions({type:'SET_MESSAGES', payload:[...messages, newMessage]});

			const newUserChats = userChats.map((userChat) => {
                	if(userChat?.userId?._id === senderId){
                		userChat.lastMessage = newMessage.message
                		userChat.date = new Date()
                	}
        
                	return userChat
                })
            actions({type:'SET_USER_CHATS', payload:newUserChats})
		});

		return () => socket?.off("newMessage");
	}, [socket, messages]);
};
export default useListenMessages;