import React, { useEffect, useState } from 'react';
import { AppLoader, BtnLoader } from '../../../components/LoaderSpinner';
import StarRating from '../../../components/StarRating';
import { PrimaryButton } from '../../../components/buttons';
import Search from '../../../components/Search';
import Modal from '../../../components/Modal';
import Rating from '../../../components/Rating';
import { toast } from 'sonner';
import { httpRequest } from '../../../utils/httpsRequest';

const ReviewPage = ({ reviews, setReviews, pageLoading, isUser }) => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [review, setReview] = useState({comment:'', rating:5})
  const [selectedReview, setSelectedReview] = useState(null)
  const areReviews = filteredReviews.length > 0;
  const isDisabled = selectedReview?.comment === review.comment && selectedReview?.rating === review.rating

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = reviews.filter(
      (item) =>
        item.comment.toLowerCase().includes(query.toLowerCase()) ||
        item.userId.name.toLowerCase().includes(query.toLowerCase()) ||
        item.productName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filteredData);
  };

  const handleClick = (review) => {
    setOpenModal(true)
    setSelectedReview(review)
  }

  const handleUpdate = () => {
    const reviewData = {
        ...review,
        oldRating:selectedReview?.rating,
        reviewableId:selectedReview?.reviewableId,
        reviewableType:selectedReview?.reviewableType,
    }
    setBtnLoading(true)
    httpRequest.put(`/reviews/${selectedReview._id}`, reviewData)
    .then(({data}) => {
      console.log(data)
      const newReviews = reviews.map(rev => rev._id === data.review._id? {...rev,...review} : rev)
      setReviews(newReviews)
      setFilteredReviews(newReviews)
      setOpenModal(false)
      toast.success(data.message)
    })
    .catch((err) => {
      console.log(err)
      toast.error(err.response.data.message)
    }).finally(() => {setBtnLoading(false)})
  }

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <AppLoader />
      </div>
    );
  }
  
  return (
    <div className="p-5">
      <Search handleSearch={handleSearch} />
      <div className="m-5 border border-gray-400 rounded-lg mt-10">
        <div className={`grid ${isUser? 'grid-cols-6' : 'grid-cols-5' } p-3 rounded-t-lg bg-gray-100`}>
          <span>{isUser ? 'Your' : 'Customer'} Name</span>
          <span>Product Or Cafe Name</span>
          <span className="col-span-2">Comment</span> 
          <span>Rating</span>
          {isUser && <span>Action</span>}
        </div>
        {areReviews && (
          <div className="h-screen overflow-scroll">
            {filteredReviews.map((review) => (
              <div key={review._id} className={`grid ${isUser? 'grid-cols-6' : 'grid-cols-5' } border border-gray-200 p-3`}>
                <p>{review.userId.name}</p>
                <p>{review.productName}</p>
                <p className="col-span-2">{review.comment}</p>
                <p>
                  <StarRating rating={review.rating}/>
                </p>
                {isUser && (
                  <div className="flex justify-start">
                    <PrimaryButton onClick={()=> handleClick(review)} className="h-[38px]">
                        Update
                    </PrimaryButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {!areReviews && (
          <div className="flex items-center justify-center h-[50vh]">
            <span className="text-gray-400 text-xl">No reviews are available</span>
          </div>
        )}
      </div>
        <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
            <Modal.Header setOpenModal={setOpenModal}>
                Update The Rating Of {selectedReview?.productName}
            </Modal.Header>
            <Modal.Body>
                <div className="w-[1114px]"> 
                    <Rating setReview={setReview} selectedReview={selectedReview} review={review} />
                </div>
            </Modal.Body>
            <Modal.Footer onClick={() => setOpenModal(false)}>
                <PrimaryButton className='h-[38px]' disabled={review.rating === 0 || btnLoading || isDisabled} onClick={handleUpdate}>
                {btnLoading ? <BtnLoader /> : "Update"}
                </PrimaryButton>
            </Modal.Footer>
        </Modal> 
    </div>
  );
};

export default ReviewPage;
