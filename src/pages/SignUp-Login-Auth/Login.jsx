import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, PrimaryInput, inputStyle } from '../../components/inputs';
import { PrimaryButton, linkStyle } from '../../components/buttons';
import { httpRequest } from '../../utils/httpsRequest';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { BtnLoader } from '../../components/LoaderSpinner';
import { toast } from 'sonner'
import { Context } from '../../context/GlobalContext';
import AuthCard from '../../components/cards/AuthCard';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({email:'', password:''});
  const [btnLoading, setBtnLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const {actions} = useContext(Context)
  const navigate = useNavigate()
  const showPassRef = useRef(null)


  const handleChange = (e) => {
    setLoginInfo({...loginInfo, [e.target.name]:e.target.value})
  }

  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true)
    httpRequest.post('/auth/login', loginInfo)
      .then(({data}) => {
        console.log(data.user);
        toast.success("Logged in successfully")
        actions({ type: 'SET_IS_AUTH', payload: true })
        actions({ type: 'SET_USER', payload: data.user })
        navigate('/user/profile/manage-user/user-account')
      })
      .catch(err => {
        toast.error(err?.response?.data.message)
        console.log(err);
      })
      .finally(() => setBtnLoading(false))
  };

  return (
      <AuthCard title={'Login'} text={'Login to access your account'} classTextTwo={'max-h-[500px]'}>
        <form onSubmit={handleSubmit} className='ssm:p-3 lg:p-8 space-y-4'>
          <Container labelName="Email">
              <PrimaryInput required value={loginInfo.email} onChange={handleChange} name="email" type="email" placeholder="example@gmail.com" />
          </Container>
          <Container labelName="Password">
            <div className={` ${inputStyle} flex items-center justify-between `}>
                <input className='flex border-none focus:outline-none w-full' ref={showPassRef} required value={loginInfo.password} onChange={handleChange} name="password" type={showPass ? 'text' : 'password'} placeholder="**************" />
                <div className=' cursor-pointer' onClick={handleShowPass}>
                  {showPass ?<IoEye size={20}/> : <IoMdEyeOff size={20}/> } 
                </div>
            </div>
          </Container>
          <PrimaryButton className='w-full h-[48px]' disabled={btnLoading} type="submit">{btnLoading? <BtnLoader/> : 'Login'}</PrimaryButton>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Need an account? 
            <Link to="/auth/signup" className={linkStyle}> Sign up!</Link>
          </p>
          <p className="text-gray-600">
            <Link to="/auth/forgot-password" className={linkStyle}> Forgot password?</Link>
          </p>
        </div>
      </AuthCard> 
  );
};

export default Login;
