import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-black text-white md:mt-0 ">
    <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
      <div className=" w-full md:w-1/4">
        <h1 className="font-semibold text-xl pb-4">CafeX</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, odit!
        </p>
      </div>
      <div>
        <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
        <nav className=" flex flex-col gap-2">
          <Link to="/" >Home</Link>
          <Link to="/cafes" >Cafes</Link>
          <Link to="/events" >Events</Link>
          <Link to="/about" >About</Link>
        </nav>
      </div>
      <div>
        <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Social Media</h1>
        <nav className=" flex flex-col gap-2">
          <a
            className=" hover:text-brightColor transition-all cursor-pointer"
            href="/"
          >
            Instagram
          </a>
          <a
            className=" hover:text-brightColor transition-all cursor-pointer"
            href="/"
          >
            Facebook
          </a>
        </nav>
      </div>
      <div>
        <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
        <nav className=" flex flex-col gap-2">
          <a
            className=" hover:text-brightColor transition-all cursor-pointer"
            href="/"
          >
            CafeX@email.com
          </a>
          <a
            className=" hover:text-brightColor transition-all cursor-pointer"
            href="/"
          >
            +60 011 011 011
          </a>
          <a
            className=" hover:text-brightColor transition-all cursor-pointer"
            href="/"
          >
            Social media
          </a>
        </nav>
      </div>
    </div>
    <div>
        <p className=" text-center py-4">
          @copyright developed by
          <span className=" text-brightColor"> Ali programmer</span> |
          All rights reserved
        </p>
    </div>
  </div>
  )
}

export default Footer