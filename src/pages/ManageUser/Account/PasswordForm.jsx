import React, { useContext, useState } from 'react'
import { Context } from '../../../context/GlobalContext';
import { Container, PrimaryInput } from '../../../components/inputs';
import { PrimaryButton } from '../../../components/buttons';
import { BtnLoader } from '../../../components/LoaderSpinner';
import { toast } from 'sonner';
import { validatePassword } from '../../../utils/validation';
import { httpRequest } from '../../../utils/httpsRequest';
import InfoCard from '../../../components/cards/InfoCard';

const PasswordForm = () => {
      const [password, setPassword] = useState({oldPass: "", pass: "", confPass: "",});
      const [btnLoading, setBtnLoading] = useState(false);
      const { user } = useContext(Context);
    
      const handlePassChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
      };
    
      const handleSubmitPass = (e) => {
        e.preventDefault();
        if (
          !password.pass.trim() ||
          !password.oldPass.trim() ||
          !password.confPass.trim()
        )
          return toast.error("Please enter all passwords fields");
    
        if (password.pass.trim() !== password.confPass.trim())
          return toast.error("Password and Confirm password don't match");
    
        if (!validatePassword(password.pass)) {
          toast.error('Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
          return;
        }
        setBtnLoading(true);
        httpRequest.put(`/user/update-password/${user._id}`, password)
          .then(({ data }) => {
            console.log(data);
            toast.success("Password has been updated successfully");
            setPassword({ oldPass: "", pass: "", confPass: "" });
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.status === 400 || err?.response?.status === 403)
              toast.error(err?.response?.data?.message);
            else toast.error("Something went wrong please try again later");
          })
          .finally(() => setBtnLoading(false));
      };
    
      const isPasswordChanged = () => {
        return (
          password.oldPass.trim() !== "" &&
          password.pass.trim() !== "" &&
          password.confPass.trim() !== ""
        );
      };

  return (
    <InfoCard>
    <div className="flex-2 font-medium">
      <h1>Change</h1>
      <h1>Password</h1>
    </div>
    <div className="flex-1 w-full">
      <div className="flex flex-col w-full">
        <Container labelName={"Old Password"}>
          <PrimaryInput
            type="password"
            required
            className='lg:w-[50%]'
            name="oldPass"
            placeholder="*********"
            value={password.oldPass}
            onChange={handlePassChange}
          />
        </Container>
        <div className="w-full flex lg:flex-row ssm:flex-col gap-3">
          <Container labelName={"Password"}>
            <PrimaryInput
              type="password"
              required
              name="pass"
              placeholder="*********"
              value={password.pass}
              onChange={handlePassChange}
            />
          </Container>
          <Container labelName={"Confirm Password"}>
            <PrimaryInput
              type="password"
              required
              name="confPass"
              placeholder="*********"
              value={password.confPass}
              onChange={handlePassChange}
            />
          </Container>
        </div>
      </div>
      <div className="flex justify-end p-3  pt-8">
        <PrimaryButton
          onClick={handleSubmitPass}
          disabled={btnLoading || !isPasswordChanged()}
          className=" min-w-[195px] h-[45px]"
        >
          {btnLoading ? <BtnLoader /> : "Update Password"}
        </PrimaryButton>
      </div>
    </div>
  </InfoCard>
  )
}

export default PasswordForm