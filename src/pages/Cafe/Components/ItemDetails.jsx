import React, { useContext, useState } from 'react';
import { PrimaryButton, TertiaryButton } from '../../../components/buttons';
import { TextareaInput } from '../../../components/inputs';
import Reviews from '../../../components/Reviews';
import { sampleReviews } from '../../../data/data';
import StarRating from '../../../components/StarRating';
import { Context } from '../../../context/GlobalContext';
import { toast } from 'sonner';
import { BtnLoader } from '../../../components/LoaderSpinner';
import AlertModal from '../../../components/AlertModal';
import { useNavigate } from 'react-router-dom';

const ItemDetails = ({ item, type, isDisabled , isForSelling, cafe }) => {
  const [reviewLoading, setReviewLoading] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(item.stock === 0? 0 : 1);
  // const [specialRequest, setSpecialRequest] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [btnLoading, setBtnLoading] = useState({id:null, loading:false})
  const [alertLoading, setAlertLoading] = useState(false)
  const {addToCart, isAuth, clearCart} = useContext(Context)
  const navigate = useNavigate()
  const isItBook = type === 'books'
  const incrReduBtn = `border px-4 py-2 border-gray-500 ${item.stock === 0? 'cursor-auto' : 'cursor-pointer'}`

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

  // const handleQuantityChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   if (value < 0 || value > item.stock) return;
  //   setQuantity(value);
  // };

  const handleReduce = () => {
    if (quantity === 1 || item.stock === 0 ) return;
    setQuantity(quantity - 1)
  }

  const handleIncrement = () => {
    if (quantity >= item.stock || item.stock === 0 ) return;
    setQuantity(quantity + 1)
  }

  const handleClick = () => {
    addToCart(setBtnLoading, type, item, cafe, quantity)
  }

  const handleConfirm = () => {
    if(!isAuth)
      return navigate('/auth/login')

    clearCart(setAlertLoading, type, item, cafe, quantity, setOpenAlertModal)
  }

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
                  className={`size-[100px] cursor-pointer ${index === currentImageIndex? 'border-2 shadow-md border-primaryColor' : ''}`}
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
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">{item.title || item.name}</h1>
                <div className="flex items-center gap-1">
                  <StarRating rating={item.averageRating} />
                  <span className='text-gray-400'>(0 Reviews) ({item.sold} sold)</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-4">Details:</h2>
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
                <p className="text-xl font-semibold text-primaryColor m-1">{item.price} RM</p>
                <div className="flex">
                  <button className={incrReduBtn} onClick={handleReduce}>-</button>
                  <span className='border-b border-t px-4 py-2 border-gray-500'>{quantity}</span>
                  <button className={incrReduBtn} onClick={handleIncrement}>+</button>
                </div>
                {/* <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded-md p-2 w-16"
                /> */}
                <PrimaryButton
                disabled={isDisabled || btnLoading.id === item._id}
                onClick={handleClick}
                className='h-[30px] min-w-[154px]'
                // className={`h-[30px] border border-gray-500 font-[600] py-[19px] text-[16px] px-10 flex items-center 
                // rounded-[5px] hover:bg-gray-100 disabled:bg-[#c6c6c6] disabled:border-[#c6c6c6] disabled:cursor-auto disabled:text-white`}
                >
                  {btnLoading.id === item._id ? <BtnLoader/> : ' Add to Cart'}
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

        {/* <div className=" rounded-md px-6 ">
          <h2 className="text-xl font-semibold mb-4">Special Requests</h2>
          <TextareaInput
            className="border rounded-md p-2 w-full h-24"
            placeholder="Any special instructions or requests?"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </div> */}

        {/* Reviews Section */}
        <Reviews reviews={sampleReviews} />
      </div>

      <AlertModal openModal={openAlertModal} setopenModal={setOpenAlertModal} onConfirm={handleConfirm} loading={alertLoading}>
        {isAuth &&
        <div className='flex flex-col'>
          <p className=" font-bold">Adding this item will clear your cart. Add anyway?</p>
          <p className='text-gray-500'>You already have items from another cafe in your cart</p>
        </div>
        }
        {!isAuth &&
        <div className='flex flex-col'>
          <p className=" font-bold">Please login to able to add to the cart</p>
          <p className='text-gray-500'>You want to be redirected to the login page?</p>
        </div>
        }
      </AlertModal>
    </div>
  );
};

export default ItemDetails;
