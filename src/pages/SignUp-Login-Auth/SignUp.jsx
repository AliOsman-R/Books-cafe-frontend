import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, PrimaryInput } from "../../components/inputs";
import { PrimaryButton, linkStyle } from "../../components/buttons";
import { validateEmail, validatePassword } from "../../utils/validation";
import { httpRequest } from "../../utils/httpsRequest";
import { useNavigate } from "react-router-dom";
import { BtnLoader } from "../../components/LoaderSpinner";
import { toast } from "sonner";
import AuthCard from "../../components/AuthCard";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  // const [location, setLocation] = useState('')
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         console.log(latitude,longitude)
  //         try {
  //           const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
  //           const data = await response.json();
  //           const address = data.results[0].formatted_address;
  //           setLocation(address);
  //         } catch (error) {
  //           console.error('Error fetching address:', error);
  //         }
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value.trim() });
  };

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

    if (!validateEmail(credentials.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(credentials.password)) {
      setValidationError(
        "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
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
        {/* <button
            className={`flex-1 py-2 font-semibold transition-colors duration-200 ease-out cursor-auto ${tab === 'customer' ? 'text-[#cd8c42] border-[#cd8c42]' : 'text-gray-500 border-transparent'}`}
            // onClick={() => handleTabChange('customer')}
            style={{ borderBottomWidth: tab === 'customer' ? '2px' : '' }}
          >
            User
          </button>
          <button
            className={`flex-1 py-2 font-semibold transition-colors duration-200 ease-out ${tab === 'store_owner' ? 'text-[#cd8c42] border-[#cd8c42]' : 'text-gray-500 border-transparent'}`}
            onClick={() => handleTabChange('store_owner')}
            style={{ borderBottomWidth: tab === 'store_owner' ? '2px' : '' }}
          >
            Store Owner
          </button> */}
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
            <PrimaryInput
              required
              value={credentials.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Your password"
            />
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
