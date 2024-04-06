import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, linkBtnStyle } from "../components/buttons";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center flex justify-center flex-col items-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-800 md:text-8xl">
          404
        </h1>
        <p className="mb-4 text-2xl font-semibold text-gray-600 md:text-3xl">
          Page Not Found
        </p>
        <p className="mb-8 text-md text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link className={`${linkBtnStyle}`} to="/">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
