import React from "react";
import PasswordForm from "./PasswordForm";
import InfoForm from "./InfoForm";


const Account = () => {
  return (
    <>
      <div className="mb-7">
        <h1 className=" font-semibold text-2xl ">My Profile</h1>
        <span>We are glad to see you again!</span>
      </div>
      <div className="flex flex-col gap-10">
       <InfoForm/>
       <PasswordForm/>
      </div>
    </>
  );
};

export default Account;
