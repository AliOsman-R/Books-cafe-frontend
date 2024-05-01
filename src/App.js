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
import Profile from "./pages/Profile/index";
import ResetPass from "./pages/SignUp-Login-Auth/ForgotPass/ResetPass";
import ForgotPass from "./pages/SignUp-Login-Auth/ForgotPass/ForgotPass";
import UserAccount from "./pages/Profile/Account/index";
import Orders from "./pages/Profile/Orders";
import Reviews from "./pages/Profile/Reviews";
import Cart from "./pages/Cart";
import Cafes from "./pages/Cafes";
import Cafe from "./pages/Cafe/index";
import CafeAccount from "./pages/ManageCafe/Account/index";
import CafeList from "./pages/ManageCafe/List/index";
import Events from "./pages/Events";

function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<OutletComp />}>
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
                  <Route path="orders" element={<Orders />} />
                  <Route path="reviews" element={<Reviews />} />
                </Route>
                <Route path="manage-cafe">
                  <Route path="cafe-account" element={<CafeAccount />} />
                  <Route path="cafe-list" element={<CafeList />} />
                </Route>
              </Route>
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/cafes" element={<Cafes />}>
              <Route path=":id" element={<Cafe />} />
            </Route>
            <Route path="/email/:id/verify/:token" element={<VerifyEmail />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Wrapper>
    </Router>
  );
}

const OutletComp = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="h-[83px]" />
      <Outlet />
    </>
  );
};
export default App;
