import React, { useContext, useEffect, useState } from 'react'
import { httpRequest } from '../../utils/httpsRequest'
import defaultUserImage from '../../assets/default-user-image.jpg';
import { Context } from '../../context/GlobalContext'
import MessageContainer from './MessageContainer';
import { AppLoader } from '../../components/LoaderSpinner';
import { toast } from 'sonner';

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const {selectedUserId, user, actions, onlineUsers, userChats} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const areUserChats = userChats.length > 0
    userChats?.sort((a,b) => new Date(b.date).valueOf() - new Date(a.date).valueOf() )
    const isOnline = onlineUsers?.includes(selectedUser?.userId?._id)

    useEffect(() => {
        if(selectedUserId)
        {
            setLoading(true)
            httpRequest.get(`/user/chat-user/${selectedUserId}`)
            .then(({data}) => {
                console.log(data)
                setSelectedUser(data.toChatUser)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Cafe might has been deleted")
            }).finally(() => {setLoading(false)})
        }
     
    }, [])
    
    useEffect(() => {
        console.log('run')
        httpRequest.get(`/user/chat-users/${user._id}`)
        .then(({data}) => {
            console.log(data)
            actions({type:'SET_USER_CHATS', payload:data.chatUsers})
        })
        .catch((err) => {
            console.log(err)
        }).finally(() => {})
    }, [])

    const handleClick = (userChat) => {
        actions({type:'SET_SELECTED_USER_ID', payload:userChat?.userId?._id})
        setSelectedUser(userChat)
    }

  return (
    <div className="">
        <div className="mb-7">
            <h1 className=" font-semibold text-2xl ">My Chat</h1>
            <span>Here where you can view all your chats!</span>
        </div>
        <div className="flex flex-grow bg-white min-h-[70vh] max-h-[70vh] shadow-md rounded-lg">
            <div className="flex flex-col w-[30%] border-r border-r-gray-200">
                <div className="border-b border-b-gray-300  flex flex-col ">
                    <h1 className='font-semibold text-center text-white bg-gray-700 px-4 py-2 '>Slected Chat</h1>
                    {selectedUser && 
                    <div className="flex gap-2 items-center bg-gray-300 p-4 relative">
                        <span className={` absolute ${isOnline?'bg-green-400 rounded-full size-3 left-[60px] top-3' : ''}`}></span>
                        <img src={selectedUser?.userId?.profileImage || defaultUserImage} alt="" className="rounded-full h-[65px] w-[65px]"/>
                        {/* <p className='text-white font-semibold'>{selectedUser?.userId?.name}</p> */}
                        <div className='flex flex-col gap-1 '>
                            <p>{selectedUser?.userId?.name}</p>
                            <p className=' text-sm text-gray-400 max-w-[200px] overflow-hidden'>{selectedUser?.lastMessage}</p>
                        </div>
                    </div>}
                    {!selectedUser && !loading &&
                    <div className="flex justify-center items-center h-[81px]">
                        <p className='p-2 text-center text-gray-300 '>No chat selected</p>
                    </div>}
                    {loading && (
                        <div className='flex justify-center items-center h-full'>
                            <AppLoader />
                        </div>
                    )}
                </div>
                <div className="flex flex-col p-2">
                    {areUserChats && 
                        userChats.map(userChat => (
                            <div key={userChat._id}>
                                <ChatUsers userChat={userChat} handleClick={handleClick} onlineUsers={onlineUsers}/>
                            </div>
                        ))
                    }
                    {!areUserChats && (
                        <div className='flex justify-center items-center h-full'>
                            <AppLoader />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 w-full ">
                <MessageContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </div>
    </div>
  )
}

export default Chat


const ChatUsers = ({userChat ,handleClick, onlineUsers}) => {
    const isOnline = onlineUsers?.includes(userChat?.userId?._id)

    return (
        <div onClick={() => handleClick(userChat)} className="flex gap-2 items-center p-2 cursor-pointer relative">
            <span className={` absolute ${isOnline?'bg-green-400 rounded-full size-3 left-[60px] top-3' : ''}`}></span>
            <img src={userChat?.userId?.profileImage || defaultUserImage} alt="" className="rounded-full h-[65px] w-[65px]"/>
            <div className='flex flex-col gap-1 '>
                <p>{userChat?.userId?.name}</p>
                <p className=' text-sm text-gray-400 max-w-[200px] overflow-hidden'>{userChat?.lastMessage}</p>
            </div>
        </div>
    )
}