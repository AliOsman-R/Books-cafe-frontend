import React, { useContext, useEffect, useState } from 'react'
import StarRating from '../StarRating'
import { PrimaryButton } from '../buttons'
import { calculateTimeLeft, getDayInfo } from '../../utils/AppUtils'
import { FaTrashAlt } from 'react-icons/fa'
import { Context } from '../../context/GlobalContext';
import { BtnLoader } from '../LoaderSpinner'
import Modal from '../Modal'
import ItemDetails from '../../pages/Cafe/Components/ItemDetails'
import AlertModal from '../../components/AlertModal'
import EventDetails from '../../pages/Cafe/Events/EventDetails'
import { useNavigate } from 'react-router-dom'

const ItemCard = ({ item , isManage, setOpenModal, handleDelete, setItemData, setOriginalItemData, deleteLoading, cafe, type}) => {
    const [openModalItem, setOpenModalItem] = useState(false)
    const [openAlertModal, setOpenAlertModal] = useState(false)
    const [btnLoading, setBtnLoading] = useState({id:null, loading:false})
    const [alertLoading, setAlertLoading] = useState(false)
    const {user, addToCart, isAuth, clearCart} = useContext(Context)
    const navigate = useNavigate()

    const isDisabled = item?.stock === 0 || getDayInfo(cafe?.workingDays || []).status === 'Closed' 
    || item?.status === 'Not Available' || user._id === cafe?.userId?._id
    const isForSelling = item?.availability === 'Selling'
    const noEvents = (type !== 'events' && type !== 'event')

    const handleEditClick = () => {
        setOpenModal(true); 
        setItemData(item); 
        setOriginalItemData(item)
    }

    const handleClick = () => {
      addToCart(setBtnLoading, type, item, cafe, 1, setOpenAlertModal)
    }

    const handleConfirm = () => {
      if(!isAuth)
        return navigate('/auth/login')

      clearCart(setAlertLoading, type, item, cafe, 1, setOpenAlertModal)
    }

    useEffect(() => {
      if(cafe?._id)
        document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = "auto";
      }
    }, []);

    const contentSwitch = () => {
      switch (type) {
        case 'books':
            return <BookCard item={item} isForSelling={isForSelling} />;
        case 'menu':
            return <MenuCard item={item} />;
        case 'events':
            return <EventCard item={item} isManage={isManage} cafe={cafe} />;
        case 'event':
          return <EventCard item={item} isManage={isManage} cafe={cafe} />;
        default:
            return <div>Unknown Type</div>;
    }
    }

  return (
    <div className="max-w-[350px] h-[458px] rounded-lg overflow-hidden shadow-md bg-white m-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img className="w-full min-w-[350px] h-56 object-cover object-center" src={item?.images[0].url} alt={item.name} />

      <div className="p-5 flex flex-col justify-between">
        {contentSwitch()}
        {!isManage &&
          <div className="flex justify-between items-center mt-4">
            {noEvents &&
              <PrimaryButton 
              onClick={handleClick} 
              disabled={isDisabled || btnLoading.id === item._id} 
              className='h-[20px] min-w-[154px]'
              >
                {btnLoading.id === item._id ? <BtnLoader/> : ' Add to Cart'}
              </PrimaryButton>
            }
            <button onClick={()=> setOpenModalItem(true)} className="text-xs font-bold text-primaryColor hover:underline">
              View Details
            </button>
          </div>
        }
        {isManage &&
          <div className="flex justify-between items-center mt-4">
            <PrimaryButton onClick={handleEditClick} className='h-[20px]'>
              Edit
            </PrimaryButton>
            <button 
              disabled={deleteLoading.id === item._id} 
              onClick={() => handleDelete(item)} 
              className=' bg-red-500 max-w-[32px] max-h-[32px] rounded-full p-2 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 disabled:bg-gray-300'
              >
              {deleteLoading.id === item._id ? <BtnLoader/> : <FaTrashAlt/>}
            </button>
          </div>
        }
      </div>

      <Modal setOpenModal={setOpenModalItem} $isOpen={openModalItem}>
        <Modal.Header setOpenModal={setOpenModalItem}>{item.name}</Modal.Header>
        <Modal.Body>
          <div className="lg:w-[1350px]">
            {noEvents ? 
              (
                <ItemDetails 
                isDisabled={isDisabled} 
                item={item} 
                type={type} 
                isForSelling={type === 'books'? isForSelling : true} 
                cafe={cafe}
                />
              )
              :
              (
                <EventDetails event={item}/>
              )
            }
          </div>
        </Modal.Body>
        <Modal.Footer onClick={() => setOpenModalItem(false)}></Modal.Footer>
      </Modal>
      <AlertModal openModal={openAlertModal} setopenModal={setOpenAlertModal} onConfirm={handleConfirm} loading={alertLoading}>
        {isAuth &&
        <div className='flex flex-col'>
          <p className=" font-bold text-lg">Adding this item will clear your cart. Add anyway?</p>
          <p className='text-gray-500 text-md'>You already have items from another cafe in your cart</p>
        </div>
        }
        {!isAuth &&
        <div className='flex flex-col'>
          <p className=" font-bold text-lg">Please login to able to add to the cart</p>
          <p className='text-gray-500 text-md'>You want to be redirected to the login page?</p>
        </div>
        }
      </AlertModal>
    </div>
);
}

export default ItemCard


const BookCard = ({item, isForSelling}) => {
    return (
      <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 overflow-hidden max-h-[28px]">{item.title}</h5>
          <div className="mb-2">
            <StarRating rating={item.averageRating} />
          </div>
          <div className="text-sm">
            <p className="text-primaryColor font-bold max-h-[20px] overflow-hidden">Author: {item.author}</p>
            <p className='font-semibold max-h-[20px] overflow-hidden'>
              Genre: <span className="text-gray-600 font-bold">{item.genre}</span>
            </p>
            <p className='font-semibold'>
              Price: <span className="font-bold text-gray-600">{isForSelling?item.price.toFixed(2) + ' RM' : 'Not for sell'}</span>
            </p>
            <div className="flex justify-between">
              {isForSelling && 
                <p className='font-semibold'>Stock: {" "}
                  <span className={`${item.stock > 0 ? "text-green-500" : "text-red-500"} font-bold`}>
                    {item.stock > 0 ? `${item.stock} available` : "Out of Stock"}
                  </span>
                </p>
              }
              {!isForSelling && 
                <p className={`${item.status=== 'Available'? "text-green-500" : "text-red-500"} font-semibold`}>
                  {item.status}
                </p>
              }
              <p className='font-semibold'>{item.availability}</p>
            </div>
          </div>
        </div>
    )
  }


  const MenuCard = ({item}) => {
    return (
      <div>
        <h5 className="mb-1 text-lg font-semibold tracking-tight text-gray-900">{item.name}</h5>
        <div className="flex justify-between">
          <p className={`${item.stock > 0 ? "text-green-500" : "text-red-500"} mb-2`}>{item.stock > 0  && item.status === 'Available'? `${item.stock} available` : "Not Available"}</p>
          <div className="mb-2">
              <StarRating rating={item.averageRating} />
          </div>
        </div>
        <p className="mb-3 text-sm text-gray-700 overflow-hidden min-w-[310px] min-h-[40px] max-h-[40px]">{item.description}</p>
        <div className="text-sm mb-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Type: {item.type}</p>
            <p className="font-semibold text-gray-900 ">{item.price.toFixed(2)} RM</p>
          </div>
        </div>
      </div>
    )
  }


  const EventCard = ({item, isManage, cafe}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(item.date, item.startTime, item.endTime));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(item.date, item.startTime, item.endTime));
      }, 1000);
  
      return () => clearInterval(timer);
    }, [item.date, item.startTime, item.endTime]);
  
    const displayTimeLeft = () => {
      if (timeLeft.over) {
        return 'Event has ended!';
      } else if (timeLeft.happening) {
        return 'Event is happening now!';
      } else {
        const parts = [];
        if (timeLeft.days) parts.push(`${timeLeft.days}d`);
        if (timeLeft.hours) parts.push(`${timeLeft.hours}h`);
        if (timeLeft.minutes) parts.push(`${timeLeft.minutes}m`);
        if (timeLeft.seconds) parts.push(`${timeLeft.seconds}s`);
        return parts.join(' ') + ' remaining';
      }
      };


    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-900 font-bold text-2xl">{item.title}</h2>
        <p className={`${displayTimeLeft().includes('ended') ? 'text-red-600' : 'text-green-600'} text-sm`}>
          {displayTimeLeft()}
        </p>
        {!isManage && 
          <p className="text-gray-600 text-sm max-h-[20px] overflow-hidden font-semibold">
            Cafe Name: { cafe? cafe?.name : item.cafeId.name}
          </p>
        }
        <p className="text-gray-600 text-sm h-[40px] overflow-hidden font-semibold">{item.location}</p>
        <p className="text-sm font-semibold text-primaryColor">
          {new Date(item.date).toLocaleDateString()} - {item.startTime} - {item.endTime}
        </p>
      </div>
    )
  }