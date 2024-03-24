import { Outlet, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Wrapper from './layout/Wrapper';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/SignUp-Login/Login';
import SignUp from './pages/SignUp-Login/SignUp';
import { useEffect } from 'react';
import NotFound from './pages/NotFound';
import VerifyEmail from './pages/VerifyEmail'
import Profile from './pages/Profile/Profile';
import ResetPass from './pages/ForgotPass/ResetPass';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import Account from './pages/Profile/Account'
import Orders from './pages/Profile/Orders';
import Reviews from './pages/Profile/Reviews';
import Cart from './pages/Cart';
import Cafes from './pages/Cafes';


function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route element={<OutletComp/>}>
            <Route path='/about' element={<About/>}/>
            <Route path='/auth'>
              <Route path='signup' element={<SignUp/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='forgot-password' element={<ForgotPass/>}/>
              <Route path='reset-password/:id/:token' element={<ResetPass/>}/>
            </Route>
            <Route path='/user'>
              <Route path='profile' element={<Profile/>}>
                <Route path='account' element={<Account/>}/>
                <Route path='orders' element={<Orders/>}/>
                <Route path='reviews' element={<Reviews/>}/>
              </Route>
            </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/cafes' element={<Cafes/>}/>
            <Route path='/email/:id/verify/:token' element={<VerifyEmail/>}/>
            <Route path='/*' element={<NotFound/>}/>
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
      <div className='h-[83px]' />
      <Outlet />
    </>
  )
}
export default App;
