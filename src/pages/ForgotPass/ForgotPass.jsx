import React from 'react'
import { Container, PrimaryInput } from '../../components/inputs'
import { PrimaryButton, linkStyle } from '../../components/buttons'
import secondaryImage from "../../assets/secondary-image.jpg";
import { useState } from 'react'
import { httpRequest } from '../../utils/httpsRequest'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { BtnLoader } from '../../components/LoaderSpinner';
import AuthCard from '../../components/AuthCard';

const ForgotPass = () => {
    const [email, setEmail] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!email)
      {
        return toast.error("Please enter your email")
      }
      setBtnLoading(true)
        httpRequest.post('/auth/forgot-password',{email})
        .then(data => {
            console.log(data)
            toast.success("An email has been sent to your eamil address")
            navigate('/auth/login')
        })
        .catch(err => {
            console.log(err)
            if(err?.response?.status === 404)
              toast.error(err.response.data.message)
            else
              toast.error("Something went wrong please try again later")
        })
        .finally(() => setBtnLoading(false))
    }
const text = 'Please enter your email address that you used when you signed up for your account'

  return (
      <AuthCard title={'Forgot your password'} text={text} classTextTwo={'max-h-[500px]'}>
        <form className="ssm:p-3 lg:p-8 space-y-4">
            <Container labelName="Email">
                <PrimaryInput required value={email} onChange={(e)=> setEmail(e.target.value)} name="email" type='email' placeholder='example@gmail.com'/>
            </Container>
            <PrimaryButton className='w-full' disabled={btnLoading} type="submit" onClick={handleSubmit}>
                {btnLoading? <BtnLoader/> : 'Request reset link'}
            </PrimaryButton>
        </form>
        <div className="text-center mt-4">
            <Link to="/auth/login" className={linkStyle}>Back to login</Link>
        </div>
      </AuthCard>
  )
}

export default ForgotPass