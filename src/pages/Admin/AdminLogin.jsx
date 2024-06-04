import React, { useContext, useState } from 'react'
import { PrimaryButton } from '../../components/buttons'
import { Container, PrimaryInput } from '../../components/inputs'
import { BtnLoader } from '../../components/LoaderSpinner'
import { Toaster, toast } from 'sonner'
import { Navigate, useNavigate } from 'react-router-dom'
import { httpRequest } from '../../utils/httpsRequest'
import { Context } from '../../context/GlobalContext'

const AdminLogin = () => {
    const [loginInfo, setLoginInfo] = useState({userName:'', password:''});
    const [btnLoading, setBtnLoading] = useState(false)
    const {actions, isAdminAuth} = useContext(Context)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setLoginInfo({...loginInfo, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnLoading(true)
        httpRequest.post('/admin/login', loginInfo)
            .then(({data}) => {
            console.log(data);
            toast.success("Logged in successfully")
            actions({ type: 'SET_IS_ADMIN_AUTH', payload: true })
            actions({ type: 'SET_ADMIN', payload: data.admin })
            navigate('/admin/dashboard')
            })
            .catch(err => {
            toast.error(err?.response?.data.message)
            console.log(err);
            })
            .finally(() => setBtnLoading(false))
        };

    if(isAdminAuth){
        return <Navigate to={'/admin/dashboard'}/>
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* <Toaster position="top-center"  duration='4000' richColors/> */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleSubmit} className=' w-full space-y-4'>
                <Container labelName="Admin Username" >
                    <PrimaryInput required value={loginInfo.userName} onChange={handleChange} name="userName" type="text" placeholder="admin" />
                </Container>
                <Container labelName="Password">
                    <PrimaryInput required value={loginInfo.password} onChange={handleChange} name="password" type='password' placeholder="**************" />
                </Container>
                <PrimaryButton className='w-full h-[48px]' disabled={btnLoading} type="submit">{btnLoading? <BtnLoader/> : 'Login'}</PrimaryButton>
            </form>
        </div>
    </div>
    )
}

export default AdminLogin