import { createContext, useState, useEffect } from "react";
import { httpRequest } from "../utils/httpsRequest";
import { toast } from "sonner";

export const Context = createContext({});

export default function GlobalContext() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderOpt, setOrderOpt] = useState('delivery');
  const [specialRequest, setSpecialRequest] = useState('');
  const [completedOrder, setCompletedOrder] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(1200)
  const [selectedCafe, setSelectedCafe] = useState({});

  const actions = (action) => {
    const { type, payload } = action;

    switch (type) {
      case "SET_LOADING":
        return setLoading(payload);
      case "SET_USER":
        return setUser(payload);
      case "SET_IS_AUTH":
        return setIsAuth(payload);
      case "SET_SELECED_CAFE":
        return setSelectedCafe(payload);
      case "SET_MAX_DISTANCE":
        return setMaxDistance(payload);
      case "SET_CART_ITEMS":
        return setCartItems(payload);
      case "SET_DELIVERY_FEE":
        return setDeliveryFee(payload);
      case "SET_ORDER_OPT":
        return setOrderOpt(payload); 
      case "SET_COMPELETED_ORDER":
        return setCompletedOrder(payload); 
      case "SET_SPECIAL_REQUEST":
        return setSpecialRequest(payload);
      default:
        return loading;
    }
  };

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
        setCartItems( updatedItems )
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
        setCartItems([...cartItems, { ...item, quantity }])
        toast.success(`${quantity} ${item.name || item.title} added to the cart`);
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Something went wrong please try again later`);
      }).finally(() => {setBtnLoading({id:null, loading:false})})
      }
  }

  const clearCart = (setAlertLoading , type, item, cafe, quantity, setOpenAlertModal) => {
    setAlertLoading(true)
    httpRequest.delete(`/cart/clear/${user._id}`)
    .then(({data}) => {
        const cartData = {
          userId:user._id,
          cafeId:cafe._id,
          type,
          productName:item.name || item.title,
          quantity
        }
        httpRequest.post(`/cart/${item._id}`, cartData)
        .then(({data}) => {
          setCartItems([{ ...item, quantity }])
          toast.success(`${quantity} ${item.name || item.title} added to the cart`);
        })
        .catch((err) => {
          console.log(err)
          toast.error(`Something went wrong please try again later`);
        })
    })
    .catch((err) => {
      console.log(err)
      toast.error(`Something went wrong please try again later`);
    }).finally(() => {setAlertLoading(false); setOpenAlertModal(false)})
  }

  useEffect(() => {
    if(user._id)
    {
      setPageLoading(true)
      httpRequest.get(`/cart/${user._id}`)
      .then(({data}) => {
        console.log(data)
        setCartItems(data.cartItems);
      })
      .catch((err) => {
        console.log(err)
      }).finally(() => {setPageLoading(false)}) 
    }
  }, [user])

  useEffect(() => {
    httpRequest
      .get("/auth/is-user-auth")
      .then((res) => {
        if (res.data.auth) {
          setUser(res.data.user);
        }
        setIsAuth(res.data.auth);
        console.log("res: ", res);
      })
      .catch((err) => {
        setUser({});
        setIsAuth(false);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { 
    actions, 
    addToCart, 
    clearCart, 
    loading, 
    user, 
    isAuth, 
    selectedCafe, 
    maxDistance, 
    cartItems, 
    pageLoading, 
    deliveryFee, 
    orderOpt, 
    completedOrder,
    specialRequest
  };
}
