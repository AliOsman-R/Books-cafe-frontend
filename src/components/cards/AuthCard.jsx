import React from 'react'
import secondaryImage from "../../assets/secondary-image.jpg";

const AuthCard = ({children,title,text, classTextOne ='', classTextTwo = ''}) => {
  return (
    <div className={`flex justify-center ssm:px-2 lg:px-0 bg-gray-100 py-10`}>
      <div className={`max-w-6xl ${classTextTwo} w-full shadow-md border border-gray-200 rounded-lg overflow-hidden flex bg-white`}>
        <div className="w-3/5 lg:p-6 ssm:p-3">
            <div className="text-center mb-4">
                <h2 className="font-bold text-2xl text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{text}</p>
            </div>
            {children}
        </div>
        <div className="w-3/5 bg-cover" style={{ backgroundImage: `url(${secondaryImage})` }}></div>
      </div>
    </div>
  )
}

export default AuthCard