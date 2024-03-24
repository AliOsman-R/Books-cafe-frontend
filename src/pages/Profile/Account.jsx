import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, PrimaryInput } from '../../components/inputs'
import { RiUploadCloud2Line } from "react-icons/ri";
import 'react-phone-input-2/lib/bootstrap.css'
import { toast } from 'sonner';
import PhoneInput from 'react-phone-input-2';
import { Context } from '../../context/GlobalContext';
import { PrimaryButton } from '../../components/buttons';
import { BtnLoader } from '../../components/LoaderSpinner';
import { httpRequest } from '../../utils/httpsRequest';
import { validatePassword } from '../../utils/validation';

const phoneInputStyle = {width:'100%',borderRadius:'8px', padding:'12px 50px'}

const Account = () => {
  const [userInfo, setUserInfo] = useState({name:'', email:'', phoneNumber:'', profileImage:''})
  const [originalUserInfo, setOriginalUserInfo] = useState({name:'', email:'', phoneNumber:'',profileImage:''})
  const [password, setPassword] = useState({oldPass:'', pass:'', confPass:''})
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnLoadingPass, setBtnLoadingPass] = useState(false)
  const {user, actions} = useContext(Context)
  const fileInputRef = useRef(null);

  useEffect(() => {
   if(user)
    setUserInfo({...userInfo,...user})
    setOriginalUserInfo({...originalUserInfo,...user});
  }, [user])
  
  const handleRemove = () => {
    setUserInfo({ ...userInfo, profileImage: '' });
    if (fileInputRef.current) {
      console.log("run")
        fileInputRef.current.value = "";
    }
};

const handleChange = (e) => {
  console.log(e)
  if(!e?.target)
    setUserInfo({ ...userInfo, phoneNumber: e });
  else
  {
    const { name, value, files } = e.target;
    if (name === 'image') {
      
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type. The image must be a JPEG, PNG, JPG, or SVG.');
        return;
      }

      if (file.size > maxSize) {
        toast.error('File size too large. The image must be less than 5 MB.');
        return;
      }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserInfo({ ...userInfo, profileImage: reader.result });

      };
      reader.readAsDataURL(files[0]);
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  }
}

const handlePassChange = (e) => {
  const { name, value } = e.target;
  setPassword({ ...password, [name]: value });
}

const handleSubmit = (e) => {
  e.preventDefault();
  const changedUserInfo = {};
  if (userInfo.name !== originalUserInfo.name) {
    changedUserInfo.name = userInfo.name.trim();
  }
  if (userInfo.email !== originalUserInfo.email) {
    changedUserInfo.email = userInfo.email;
  }
  if (userInfo.phoneNumber !== originalUserInfo.phoneNumber) {
    changedUserInfo.phoneNumber = userInfo.phoneNumber.toString();
  }
  if (userInfo.profileImage !== originalUserInfo.profileImage) {
    changedUserInfo.profileImage = userInfo.profileImage;
  }

  setBtnLoading(true)
  httpRequest.put(`/user/${user._id}`, changedUserInfo)
  .then(({data}) => {
    console.log(data)
    toast.success(data?.message)
    setUserInfo(data.user)
    setOriginalUserInfo(data.user)
    actions({ type: 'SET_USER', payload: data.user })
  })
  .catch(err => {
    console.log(err)
    if(err?.response?.status === 403)
      toast.error(err?.response?.data?.message)
    else
      toast.error("Something went wrong please try again later")
  })
  .finally(()=> setBtnLoading(false))
  
}

const handleSubmitPass = (e) => {
  e.preventDefault();
  if(!password.pass.trim() || !password.oldPass.trim() || !password.confPass.trim())
  return toast.error('Please enter all passwords fields')

  if(password.pass.trim() !== password.confPass.trim())
  return toast.error("Password and Confirm password don't match")

  if (!validatePassword(password.pass)) {
    toast.error('Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
    return;
  }

  setBtnLoadingPass(true)
  httpRequest.put(`/user/${user._id}`, password)
  .then(({data}) => {
    console.log(data)
    toast.success("Password has been updated successfully")
    setPassword({oldPass:'', pass:'', confPass:''})
  })
  .catch(err => {
    console.log(err)
    if(err?.response?.status === 400 || err?.response?.status === 403)
      toast.error(err?.response?.data?.message)
    else
      toast.error("Something went wrong please try again later")
  })
  .finally(()=> setBtnLoadingPass(false))
}

const isUserInfoChanged = () => {
  return (
    userInfo.name !== originalUserInfo.name ||
    userInfo.email !== originalUserInfo.email ||
    userInfo.phoneNumber !== originalUserInfo.phoneNumber ||
    userInfo.profileImage !== originalUserInfo.profileImage
  );
};

const isPasswordChanged = () => {
  return (
    password.oldPass.trim() !== '' ||
    password.pass.trim() !== '' ||
    password.confPass.trim() !== ''
  );
};

  return (
    <div>
      <div className="mb-7">
        <h1 className=' font-semibold text-2xl '>My Profile</h1>
        <span>We are glad to see you again!</span>
      </div>
      <div className="flex flex-col gap-10">
        <div className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-grow p-4 gap-20 ">
          <div className="flex-2 font-medium">
            <h1>Profile</h1>
            <h1>Information</h1>
          </div>
          <div className="flex-1">
             <Container>
              <label className="w-1/4 flex flex-col gap-2" htmlFor="file-upload">
                {userInfo?.profileImage ? 
                  <div className=" relative">
                    <img src={userInfo?.profileImage} alt="profile-image" className='h-[230px] w-full object-cover rounded-md'/>
                    <p className='absolute bottom-5 left-3 px-2 py-2 rounded-md bg-white z-50 cursor-pointer flex items-center gap-1'>
                      <RiUploadCloud2Line size={20}/>
                      Upload Photo
                    </p>
                  </div>
                  :
                  <div className=" bg-gray-100 p-10 h-[230px] flex flex-col justify-center items-center gap-3 rounded-md cursor-pointer">
                    <RiUploadCloud2Line size={30}/>
                    <p className='text-center text-xs text-gray-500'>
                      Use high-quality JPEG, PNG, JPG, SVG less than 5 MB
                    </p>
                  </div>
                }                 
              </label>
              {userInfo?.profileImage ? 
                <div className="flex">
                  <button onClick={handleRemove} className='inline-block mb-5 w-[110px] px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700'>
                    Remove
                  </button> 
                </div>
                :
                <span className='h-[58px]'></span>
              }
              <PrimaryInput
                id='file-upload'
                onChange={handleChange}
                name="image"
                type="file"
                className='hidden'
                ref={fileInputRef} 
              />
            </Container>
            <div onSubmit={handleSubmit} className="flex flex-wrap w-full gap-3">
              <div className="w-[45%]">
                <Container labelName={'Email'}>
                  <PrimaryInput 
                  type='email' 
                  name='email' 
                  placeholder="example@gmail.com"
                  value={userInfo.email} 
                  onChange={handleChange}/>
                </Container>
              </div>
              <div className="w-[45%]">
                <Container labelName={'Full Name'}>
                  <PrimaryInput 
                  type='text' 
                  name='name' 
                  placeholder="Your name"
                  value={userInfo.name} 
                  onChange={handleChange}/>
                </Container>
              </div>
              <div className="w-[45%]">
              <Container labelName={'Phone Number'}>
                <PhoneInput 
                country={'my'} 
                name='phoneNumber'
                value={userInfo.phoneNumber}
                onChange={handleChange}
                enableSearch={true} 
                inputStyle={phoneInputStyle}
                />
              </Container>
              </div>
            </div>
            <div className="flex justify-end p-3">
              <PrimaryButton disabled={btnLoading || !isUserInfoChanged()} onClick={handleSubmit} className=' min-w-[175px]'>
                {btnLoading? <BtnLoader/>  : 'Update Profile'}
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-grow p-4 gap-20 mb-20">
          <div className="flex-2 font-medium">
            <h1>Change</h1>
            <h1>Password</h1>
          </div>
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <div className="w-[45%]">
                <Container labelName={'Old Password'}>
                  <PrimaryInput 
                  type='password' 
                  required 
                  name='oldPass' 
                  placeholder='*********' 
                  value={password.oldPass} 
                  onChange={handlePassChange}/>
                </Container>
              </div>
              <div className="w-[100%] flex gap-3">
                <div className="w-[45%]">
                  <Container labelName={'Password'}>
                    <PrimaryInput 
                    type='password' 
                    required 
                    name='pass' 
                    placeholder='*********' 
                    value={password.pass} 
                    onChange={handlePassChange}/>
                  </Container>
                </div>
                <div className="w-[45%]">
                  <Container labelName={'Confirm Password'}>
                    <PrimaryInput 
                    type='password' 
                    required 
                    name='confPass' 
                    placeholder='*********' 
                    value={password.confPass} 
                    onChange={handlePassChange}/>
                  </Container>
                </div>
              </div>
            </div> 
            <div className="flex justify-end p-3  pt-8">
              <PrimaryButton onClick={handleSubmitPass} disabled={btnLoadingPass || !isPasswordChanged()} className=' min-w-[195px]'>
                {btnLoadingPass? <BtnLoader/>  : 'Update Password'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account