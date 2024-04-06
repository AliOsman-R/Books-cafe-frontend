import React from 'react'

const InfoCard = ({children}) => {
  return (
    
    <div className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-grow lg:flex-row ssm:flex-col  p-4 ssm:gap-5 lg:gap-20 ">
        {children}
    </div>
  )
}

export default InfoCard