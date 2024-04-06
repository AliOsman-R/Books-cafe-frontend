import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LuCheckCircle } from "react-icons/lu";
import { AppLoader } from '../../components/LoaderSpinner';
import { PrimaryButton } from '../../components/buttons';
import { httpRequest } from '../../utils/httpsRequest';

const VerifyEmail = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id, token } = useParams();

    useEffect(() => {
        httpRequest.get(`/auth/email/${id}/verify/${token}`)
            .then(data => {
                console.log(data);
                setValidUrl(true);
            })
            .catch(err => {
                console.log(err);
                toast.error('Something went wrong try agin later');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-[100vh]">
                    <AppLoader />
                </div>
            ) : validUrl ? (
                <div className='flex justify-center items-center h-[70vh] '> 
                    <div className="flex justify-center flex-col gap-5 items-center max-w-6xl w-[30%] p-10 shadow-xl rounded-lg overflow-hidden  bg-white">
                        {/* <img src={success} alt="email verified" /> */}
                        <LuCheckCircle className=' text-green-500' size={80}/>
                        <h1  className=' text-green-500'>Email verified successfully</h1>
                        <PrimaryButton className='w-[40%]'>
                            <Link to={'/auth/login'} >Login</Link>
                        </PrimaryButton>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col h-[50vh]">
                    <h1 className="text-3xl text-red-500 mb-4">Oops! Invalid URL</h1>
                    <p className="text-lg text-gray-600 mb-8">The link you followed is either expired or incorrect.</p>
                    <p className="text-lg text-gray-600 mb-4">Don't worry, you can request a new verification email by login:</p>
                    <PrimaryButton className='w-[20%]'>
                        <Link to={'/auth/login'} >Request Verification Email</Link>
                    </PrimaryButton>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
