import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Wrapper from "./layout/Wrapper";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/SignUp-Login-Auth/Login";
import SignUp from "./pages/SignUp-Login-Auth/SignUp";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/SignUp-Login-Auth/VerifyEmail";
import Profile from "./pages/Profile";
import ResetPass from "./pages/SignUp-Login-Auth/ForgotPass/ResetPass";
import ForgotPass from "./pages/SignUp-Login-Auth/ForgotPass/ForgotPass";
import UserAccount from "./pages/ManageUser/Account/index";
import UserReviews from "./pages/ManageUser/Reviews/";
import Cart from "./pages/Cart/";
import Cafes from "./pages/Cafes";
import Cafe from "./pages/Cafe/index";
import CafeAccount from "./pages/ManageCafe/Account/index";
import CafeList from "./pages/ManageCafe/List/index";
import Events from "./pages/Events";
import CheckOut from "./pages/Cart/CheckOut";
import Success from "./pages/Cart/Success";
import UserOrders from "./pages/ManageUser/Orders";
import CafeOrders from "./pages/ManageCafe/Orders";
import OrderDetails from "./components/OrderDetails";
import Dashboard from "./pages/ManageCafe/Dashboard/Dashboard";
import CafeReviews from "./pages/ManageCafe/Reviews/";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Chat from "./pages/Chat/";

function App() {
  return (
    <Router>
        <Routes>
          <Route element={<WrapperWithOutlet />}>
            <Route path="/admin" >
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/auth">
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPass />} />
              <Route path="reset-password/:id/:token" element={<ResetPass />} />
            </Route>
            <Route path="/user">
              <Route path="profile" element={<Profile />}>
                <Route path="manage-user">
                  <Route path="user-account" element={<UserAccount />} />
                  <Route path="orders" element={<UserOrders />} >
                    <Route path=":id" element={<OrderDetails/>}/>
                  </Route>
                  <Route path="reviews" element={<UserReviews />} />
                  <Route path="chat" element={<Chat />} />
                </Route>
                <Route path="manage-cafe">
                  <Route path="cafe-dashboard" element={<Dashboard />} />
                  <Route path="cafe-account" element={<CafeAccount />} />
                  <Route path="cafe-list" element={<CafeList />} />
                  <Route path="cafe-orders" element={<CafeOrders />}>
                    <Route path=":id" element={<OrderDetails/>}/>
                  </Route>
                  <Route path="cafe-reviews" element={<CafeReviews />} />
                </Route>
              </Route>
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/success" element={<Success />} />
            <Route path="/check-out" element={<CheckOut />} />
            <Route path="/cafes" element={<Cafes />}>
              <Route path=":id" element={<Cafe />} />
            </Route>
            <Route path="/email/:id/verify/:token" element={<VerifyEmail />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
    </Router>
  );
}

const WrapperWithOutlet = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Wrapper>
        {location.pathname !== '/' && <div className="h-[83px]" />}
        <Outlet />
      </Wrapper>
    </>
  );
};
export default App;
