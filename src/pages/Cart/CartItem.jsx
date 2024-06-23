import { useState } from "react";
import { BtnLoader } from "../../components/LoaderSpinner";
import { CiCircleRemove } from "react-icons/ci";
import { calculateItemTotal } from "../../utils/AppUtils";
import { toast } from "sonner";

const CartItem = ({ item, handleUpdateQuantity, handleRemove, deleteLoading }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const incrReduBtn = `border px-3 py-1 border-gray-500 ${item.stock === 0? 'cursor-auto' : 'cursor-pointer'}`
  
    const handleReduce = () => {
      if (quantity === 1 || item.stock === 0 ) {
        return toast.warning("You wont be able to reduce the quantity due to " +
         " 0 stock of the item or trying to make the quantity 0")
      };
      const newQuantity = parseInt(quantity - 1)
      setQuantity(newQuantity)
      handleUpdateQuantity(item._id, newQuantity);
    }
  
    const handleIncrement = () => {
      if (quantity >= item.stock || item.stock === 0 ){
        return toast.warning("You wont be able to increase the quantity due to " +
        " 0 stock of the item or reaching the max stock quantity")
      };
      const newQuantity = parseInt(quantity + 1)
      setQuantity(newQuantity)
      handleUpdateQuantity(item._id, newQuantity);
    }
  
    return (
      <div className=" grid grid-cols-7 items-center  border-b border-gray-400 py-4">
        <img src={item.images[0].url} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
        <h3 className="text-lg font-semibold mx-h-[56px] overflow-hidden max-w-[220px]">{item.name || item.title}</h3>
        <p className="text-gray-500">{item.price} RM</p>
        <div className="flex">
          <button className={incrReduBtn} onClick={handleReduce}>-</button>
          <span className='border-b border-t max-w-[33px] px-3 py-1 border-gray-500'>{quantity}</span>
          <button className={incrReduBtn} onClick={handleIncrement}>+</button>
        </div>
        <p>{calculateItemTotal(item)}</p>
        <p>{item.stock}</p>
        <button 
        disabled={deleteLoading.id === item._id} 
        onClick={() => handleRemove(item._id)} 
        className="text-gray-500 max-w-[30px] hover:text-gray-800 flex items-center focus:outline-none disabled:bg-gray-300 disabled:rounded-full disabled:max-h-[40px] disabled:cursor-auto"
        >
          {deleteLoading.id === item._id ? <BtnLoader /> : <CiCircleRemove size={30}/> }
        </button>
      </div>
    );
  };


  export default CartItem