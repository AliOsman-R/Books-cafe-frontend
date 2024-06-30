import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, PrimaryInput, inputStyle } from "../../components/inputs";
import { PrimaryButton, linkStyle } from "../../components/buttons";
import { validateEmail, validatePassword } from "../../utils/validation";
import { httpRequest } from "../../utils/httpsRequest";
import { useNavigate } from "react-router-dom";
import { BtnLoader } from "../../components/LoaderSpinner";
import { toast } from "sonner";
import AuthCard from "../../components/cards/AuthCard";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate();
  const showPassRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'name'){
      setCredentials({ ...credentials, [name]: value });
    }else{
      setCredentials({ ...credentials, [name]: value.trim() });
    }
  };

  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  useEffect(() => {
    let timer;
    if (validationError) {
      timer = setTimeout(() => {
        setValidationError("");
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [validationError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if(credentials.name.trim() === ''){
      setValidationError("Full name can't be empty.");
      return;
    }


    if (!validateEmail(credentials.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(credentials.password)) {
      setValidationError(
        "Password must include at least one uppercase letter, " +
        "one lowercase letter, one number, one special character, and be at least 8 characters long."
      );
      return;
    }

    setBtnLoading(true);
    httpRequest
      .post("/auth/signup", credentials)
      .then(({ data }) => {
        console.log(data);
        navigate("/auth/login");
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => setBtnLoading(false));
  };

  return (
    <AuthCard title={"Sign Up"} text={"Welcome to CafeX"}>
      <div className="flex border-primaryColor border-b">
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-3 ssm:p-3 lg:p-8">
          {validationError && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded"
              role="alert"
            >
              <span className="block sm:inline">{validationError}</span>
            </div>
          )}
          <Container labelName="Full Name">
            <PrimaryInput
              required
              value={credentials.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Your full name"
            />
          </Container>
          <Container labelName="Email">
            <PrimaryInput
              required
              value={credentials.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Your email"
            />
          </Container>
          <Container labelName="Password">
             <div className={` ${inputStyle} flex items-center justify-between `}>
                <input className='flex border-none focus:outline-none w-full' ref={showPassRef} required value={credentials.password} onChange={handleChange} name="password" type={showPass ? 'text' : 'password'} placeholder="Your password" />
                <div className=' cursor-pointer' onClick={handleShowPass}>
                  {showPass ?<IoEye size={20}/> : <IoMdEyeOff size={20}/> } 
                </div>
            </div>
          </Container>
          <PrimaryButton
            className="w-full h-[48px]"
            disabled={btnLoading}
            type="submit"
          >
            {btnLoading ? <BtnLoader /> : "Sign Up"}
          </PrimaryButton>
        </form>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?
          <Link to="/auth/login" className={linkStyle}>
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default SignUp;
