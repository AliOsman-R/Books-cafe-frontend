import { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";
import { httpRequest } from "../utils/httpsRequest";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, actions, selectedUserId } = useContext(Context);

	useEffect(() => {
		const getMessages = () => {
			setLoading(true);
            httpRequest.get(`/messages/${selectedUserId}`)
            .then(({data}) => {
                console.log(data)
                 actions({type:'SET_MESSAGES', payload:data.messages});
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {setLoading(false)})
		};

		if (selectedUserId) getMessages();
	}, [selectedUserId]);

	return { messages, loading };
};
export default useGetMessages;