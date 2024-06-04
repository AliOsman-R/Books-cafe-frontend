import { useContext, useState } from "react";
import { Context } from "../context/GlobalContext";
import { httpRequest } from "../utils/httpsRequest";
import { toast } from "sonner";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, actions, selectedUserId } = useContext(Context);

	const sendMessage = (message) => {
		setLoading(true);
        httpRequest.post(`/messages/${selectedUserId}`, {message})
        .then(({data}) => {
            console.log(data)
            actions({type:'SET_MESSAGES', payload:[...messages, data.newMessage]})
            // toast.success('Message has been ')
        })
        .catch((err) => {
            console.log(err)
        }).finally(() => {setLoading(false)})
	};

	return { sendMessage, loading };
};
export default useSendMessage;