import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { httpRequest } from '../../../utils/httpsRequest'
import { AppLoader, BtnLoader } from '../../../components/LoaderSpinner'
import { Container, PrimaryInput } from '../../../components/inputs'
import { PrimaryButton } from '../../../components/buttons'
import { validatePassword } from '../../../utils/validation'

const ResetPass = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const { id, token } = useParams();
    const navigate = useNavigate()
  

    useEffect(() => {
      httpRequest.get(`/auth/reset-password/${id}/verify/${token}`)
          .then(data => {
              console.log(data);
              setValidUrl(true);
          })
          .catch(err => {
              console.log(err);
              toast.error('Something went wrong please try again later!');
          })
          .finally(() => setLoading(false));
  }, []);

    const  handleSubmit = (e) => {

      e.preventDefault()

      if(password !== confPass)
      {
        return toast.error("Password and confirm password doesn't match")
      }

      if (!validatePassword(password)) {
        return toast.error('Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
      }

      setBtnLoading(true)
      httpRequest.put(`/auth/reset-password/${id}/verify/${token}`,{password})
      .then(({data}) => {
          console.log(data);
          toast.success(data.message)
          navigate('/auth/login')
      })
      .catch(err => {
          console.log(err);
          toast.error("Something went wrong");
      })
      .finally(() => setBtnLoading(false));
    }

  return (
    <div>
        {loading ? (
                <div className="flex justify-center items-center h-[80vh]">
                    <AppLoader />
                </div>
            ) : validUrl ? (
                <div className="flex justify-center">
                    <form className="p-8 space-y-3 w-2/4">
                      <Container labelName="Password">
                          <PrimaryInput required onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='********'/>
                      </Container>
                      <Container labelName="Confirm Password">
                          <PrimaryInput required onChange={(e)=> setConfPass(e.target.value)} type='password' placeholder='********'/>
                      </Container>
                      <PrimaryButton className='h-[48px]' disabled={btnLoading} onClick={handleSubmit}>
                        {btnLoading? <BtnLoader/> : 'Reset'} 
                      </PrimaryButton>
                    </form>
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col h-[70vh]">
                    <h1 className="text-3xl text-red-500 mb-4">Oops! Invalid URL</h1>
                    <p className="text-lg text-gray-600 mb-8">The link you followed is either expired or incorrect.</p>
                    <p className="text-lg text-gray-600 mb-4">Don't worry, you can request a new reset password by clciking the link below:</p>
                    <PrimaryButton className='w-[20%]'>
                      <Link to={'/auth/forgot-password'}>Request reset password </Link>
                    </PrimaryButton>
                </div>
            )}
    </div>
  )
}

export default ResetPass