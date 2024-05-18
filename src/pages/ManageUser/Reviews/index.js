import React, { useContext, useEffect, useState } from 'react'
import { httpRequest } from '../../../utils/httpsRequest'
import { Context } from '../../../context/GlobalContext'
import ReviewPage from './ReviewPage'

const UserReviews = () => {
  const [reviews, setReviews] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const {user} = useContext(Context)

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/reviews/user/${user._id}`)
    .then(({data}) => {
      console.log(data)
      setReviews(data.reviews)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {setPageLoading(false)})
  }, [])
  

  return (
    <div className=''>
       <div className="mb-7">
        <h1 className=" font-semibold text-2xl ">My Reviews</h1>
        <span>Here where you can view all your reviews!</span>
      </div>
      <div className="flex flex-col bg-white min-h-screen shadow-md rounded-lg">
        <ReviewPage reviews={reviews} pageLoading={pageLoading} isUser={true} setReviews={setReviews}/>
      </div>
    </div>
  )
}

export default UserReviews