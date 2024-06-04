import { useContext, useEffect } from "react";


import { Context } from "../context/GlobalContext";

const useListenMessages = () => {
	const { socket, messages, actions } = useContext(Context);

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			actions({type:'SET_MESSAGES', payload:[...messages, newMessage]});
		});

		return () => socket?.off("newMessage");
	}, [socket, messages]);
};
export default useListenMessages;