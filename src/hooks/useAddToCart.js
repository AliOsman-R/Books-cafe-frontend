import { useContext } from "react";
import { toast } from "sonner";
import { Context } from "../context/GlobalContext";
import { httpRequest } from "../utils/httpsRequest";

const useAddToCart = () => {
    const {actions, isAuth, cartItems, user} = useContext(Context)

    const addToCart = (setBtnLoading, type, item, cafe, quantity, setOpenAlertModal) => {
        const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
    
        if(!isAuth){
          setOpenAlertModal(true)
          return ''; 
        }
    
        if(cartItems.length > 0 && cartItems[0].cafeId._id !== item.cafeId._id) {
          setOpenAlertModal(true)
          return '';
        }
    
        if (existingItem) {
          const updatedQuantity = existingItem.quantity + quantity;
          if (updatedQuantity > item.stock) {
            toast.error(`Maximum stock reached for ${item.name || item.title}`);
            return; 
          }
          const updatedItems = cartItems.map(cartItem =>
            cartItem._id === existingItem._id ? { ...cartItem, quantity: updatedQuantity } : cartItem
          );
          httpRequest.put(`/cart/${item._id}`, {quantity:updatedQuantity})
          .then(({data}) => {
            actions({type:'SET_CART_ITEMS', payload:updatedItems})
            toast.success(`${quantity} ${item.name || item.title} added to the cart`);
          })
          .catch((err) => {
            console.log(err)
            toast.error(`Something went wrong please try again later`);
          }).finally(() => {setBtnLoading({id:null, loading:false})})
          
        } else {
          const cartData = {
            userId:user._id,
            cafeId:cafe._id,
            type,
            productName:item.name || item.title,
            quantity
          }
          setBtnLoading({id:item._id, loading:true})
          httpRequest.post(`/cart/${item._id}`, cartData)
          .then(({data}) => {
            actions({type:'SET_CART_ITEMS', payload:[...cartItems, { ...item, quantity }]})
            toast.success(`${quantity} ${item.name || item.title} added to the cart`);
          })
          .catch((err) => {
            console.log(err)
            toast.error(`Something went wrong please try again later`);
          }).finally(() => {setBtnLoading({id:null, loading:false})})
          }
      }

      return {addToCart}
}

export default useAddToCart;