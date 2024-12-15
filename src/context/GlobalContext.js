import { createContext, useState, useEffect } from "react";
import { httpRequest } from "../utils/httpsRequest";
import { io } from "socket.io-client";

export const Context = createContext({});
export default function GlobalContext() {
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState({});
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderOpt, setOrderOpt] = useState('delivery');
  const [specialRequest, setSpecialRequest] = useState('');
  const [completedOrder, setCompletedOrder] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(2000)
  const [selectedCafe, setSelectedCafe] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
  const [userChats, setUserChats] = useState([])
  const serverUrl = process.env.REACT_APP_NODE_ENV === 'dev' ? 'http://localhost:5000' : 'https://books-cafe-backend.vercel.app'

  const actions = (action) => {
    const { type, payload } = action;

    switch (type) {
      case "SET_LOADING":
        return setLoading(payload);
      case "SET_USER":
        return setUser(payload);
      case "SET_IS_AUTH":
        return setIsAuth(payload);
      case "SET_ADMIN":
        return setAdmin(payload);
      case "SET_IS_ADMIN_AUTH":
        return setIsAdminAuth(payload);
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
      case "SET_SELECTED_USER_ID":
        return setSelectedUserId(payload);
      case "SET_MESSAGES":
        return setMessages(payload);
      case "SET_USER_CHATS":
        return setUserChats(payload);
      default:
        return loading;
    }
  };

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

  useEffect(() => {
    httpRequest
      .get("/admin/is-admin-auth")
      .then((res) => {
        console.log(res.data)
        if (res.data.adminAuth) {
          setAdmin(res.data.admin);
        }
        setIsAdminAuth(res.data.adminAuth);
        console.log("res: ", res);
      })
      .catch((err) => {
        setAdmin({});
        setIsAdminAuth(false);
        console.log(err);
      })
      .finally(() => {
        setAdminLoading(false);
      });
  }, []);

  useEffect(() => {
		if (user) {
			const socket = io(serverUrl, {
				query: {
					userId: user._id,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user]);

  return { 
    actions, 
    loading, 
    user, 
    isAuth, 
    admin,
    isAdminAuth,
    selectedCafe, 
    maxDistance, 
    cartItems, 
    pageLoading, 
    deliveryFee, 
    orderOpt, 
    completedOrder,
    specialRequest,
    selectedUserId,
    adminLoading,
    messages,
    socket,
    onlineUsers,
    userChats
  };
}
