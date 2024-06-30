import React, { useContext } from 'react'
import { Context } from '../../context/GlobalContext';
import { extractTime } from "../../utils/AppUtils";
import defaultUserImage from '../../assets/default-user-image.jpg';

const Message = ({message, selectedUser}) => {
    const { user } = useContext(Context);
    const fromMe = message.senderId === user._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'justify-end' : 'justify-start';
    const profileImage = fromMe ? user.profileImage : selectedUser?.userId?.profileImage;
    const bubbleBgColor = fromMe ? 'bg-blue-500 rounded-l-[10px] rounded-tr-[10px]' : 'bg-gray-300 rounded-r-[10px] rounded-tl-[10px]';
    const textColor = fromMe ? 'text-white' : 'text-black';
    const flexReverse = fromMe ? '' : 'flex-row-reverse';
    const shakeClass = message.shouldShake ? 'animate-shake' : '';


    return (
        <div className={`flex ${chatClassName} mb-4`}>
            <div className="flex flex-col">
                <div className={`flex ${flexReverse} gap-2 items-center`}>
                    <div className={`p-2 ${bubbleBgColor} ${textColor} ${shakeClass}`}>
                        {message.message}
                    </div>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img
                            className='object-cover w-full h-full'
                            alt='User profile'
                            src={profileImage || defaultUserImage}
                        />
                    </div>
                </div>
                <div className={`flex ${chatClassName} opacity-50 text-xs mt-1`}>
                    {formattedTime}
                </div>
            </div>
        </div>
    );
}

export default Message