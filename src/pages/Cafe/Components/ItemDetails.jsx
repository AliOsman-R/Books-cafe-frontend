import React, { useState } from 'react';
import { PrimaryButton, TertiaryButton } from '../../../components/buttons';
import { TextareaInput } from '../../../components/inputs';
import Reviews from '../../../components/Reviews';
import { sampleReviews } from '../../../data/data';

const ItemDetails = ({ item, type, isDisabled , isForSelling }) => {
  const [reviewLoading, setReviewLoading] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isItBook = type === 'book'


    // useEffect(() => {
    // setReviewLoading(true)
    //  httpRequest.get(`/review/${item._id}`)
    //  .then(({data}) => {
    //   console.log(data)
    //   setReviews(data.reviews)
    //  })
    //  .catch((err) => {
    //   console.log(err)
    //  }).finally(() => {setReviewLoading(false)})
    // }, [item]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 0 || value > item.stock) return;
    setQuantity(value);
  };

  const addToCart = () => {
  };

  if (!item) {
    return <div className="flex justify-center items-center h-screen">No item found, please try again later.</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10 bg-white rounded-xl">
        <div className="flex">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {item.images.map((image, index) => (
                <img
                  key={image.imageId._id}
                  onClick={() => setCurrentImageIndex(index)}
                  className="size-[100px] cursor-pointer"
                  src={image.url}
                  alt=""
                />
              ))}
            </div>
            <img
              className="h-[435px] min-w-[540px] max-w-[540px] rounded-lg"
              src={item.images[currentImageIndex]?.url}
              alt=""
            />
          </div>
          <div className="md:w-1/2 mx-4 flex flex-col justify-between">
            <div className="">
              <h1 className="text-3xl font-semibold mb-4">{item.title || item.name}</h1>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-lg mb-2 max-h-[118px] overflow-scroll">{item.description}</p>
              {item.author && <p className="text-md mb-1 font-semibold">Author: <span className='font-[400]'>{item.author}</span> </p>}
              {item.genre && <p className="text-md mb-1 font-semibold">Genre: <span className='font-[400]'>{item.genre}</span> </p>}
              {item.publishYear && <p className="text-md mb-1 font-semibold">Publish Year: <span className='font-[400]'>{item.publishYear}</span> </p>}
              {item.ingredients && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                    <ul className="flex flex-wrap gap-2 text-lg max-w-[764px] max-h-[135px] overflow-scroll">
                    {item.ingredients.map(ingredient => (
                        <li key={ingredient} className="border-[1.5px] border-primaryColor p-1 rounded-lg">{ingredient}</li>
                    ))}
                    </ul>
                </div>
              )}
            </div>
            {isForSelling &&
            <div className="flex items-center gap-5 mb-4">
                <p className="text-xl font-semibold">{item.price} RM</p>
                <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded-md p-2 w-16"
                />
                <PrimaryButton
                disabled={isDisabled}
                onClick={addToCart}
                className="h-[30px]"
                >
                Add to Cart
                </PrimaryButton>
            </div>
            }
          </div>
        </div>

        {isItBook && 
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Book Place images</h2>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span>Check Images</span>
                    <TertiaryButton onClick={()=> setOpenView(!openView)} className='h-[30px]'>{openView ? 'Close' : 'View'}</TertiaryButton>
                </div>
                {openView && 
                     <div className="flex mt-2 gap-3">
                     {item.bookPlaceImages.map((image, index) => (
                       <img
                         key={image.imageId._id}
                         className="size-[280px]"
                         src={image.url}
                         alt=""
                       />
                     ))}
                   </div>
                }
            </div>
        </div>
        }   

        <div className=" rounded-md px-6 ">
          <h2 className="text-xl font-semibold mb-4">Special Requests</h2>
          <TextareaInput
            className="border rounded-md p-2 w-full h-24"
            placeholder="Any special instructions or requests?"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </div>

        {/* Reviews Section */}
        <Reviews reviews={sampleReviews} />
      </div>
    </div>
  );
};

export default ItemDetails;
