import { useContext, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { Context } from "../../context/GlobalContext";

const MessageContainer = ({selectedUser, setSelectedUser}) => {
	const {actions} = useContext(Context)

	useEffect(() => {
		return () => {
			setSelectedUser(null)
			actions({type:'SET_SELECTED_USER_ID', payload:null})
		};
	}, [setSelectedUser]);

	return (
		<div className='md:min-w-[450px] h-full flex flex-col'>
			{!selectedUser ? (
				<NoChatSelected />
			) : (
				<>
					<div className='bg-gray-700 px-4 py-2 mb-2'>
						<span className='text-white font-bold'>{selectedUser?.userId?.name}</span>
					</div>
					<Messages selectedUser={selectedUser}/>
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { user } = useContext(Context);
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-600 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {user.name} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

