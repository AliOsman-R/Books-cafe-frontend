import React from 'react';
import aliOsmanImage from '../assets/aliOsman.jpg'

const About = () => {
  return (
    <div className="bg-gray-100 p-6 md:p-12">
      <div className="max-w-10xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to CafeX: Where Every Page Brews a New Discovery!</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At CafeX, our mission is to create a unique and inviting platform where café owners and customers can connect seamlessly. We believe in the power of stories, the comfort of a good cup of coffee, and the joy of discovering new places and events.
          </p>
          <p className="text-lg text-gray-700">
            Whether you're a café owner looking to showcase your offerings or a customer searching for the perfect spot to unwind, CafeX aims to make every visit to our platform a memorable one.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="text-lg text-gray-700 mb-6">
            Dive into a world where the aroma of freshly brewed coffee and the allure of captivating stories blend seamlessly. CafeX is your ultimate destination to explore and purchase from the finest selection of café menus and books, and to discover unique café events, all from the comfort of your home.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
            <li>Explore and purchase from a wide selection of books and café menus.</li>
            <li>Discover and register for events hosted by your favorite cafés.</li>
            <li>View and visit all the cafés near you and across the platform.</li>
          </ul>
          <p className="text-lg text-gray-700">
            Because every book, like every cup of coffee, promises a new adventure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Customer Testimonials</h2>
          <div className="space-y-6">
            <blockquote className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-lg text-gray-700 italic">"CafeX has transformed the way I discover new cafés and books. It's a fantastic platform with a great user experience!"</p>
              <p className="text-right text-lg font-semibold text-gray-800">- Sarah Lee</p>
            </blockquote>
            <blockquote className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-lg text-gray-700 italic">"As a café owner, CafeX has been invaluable for reaching new customers and promoting our events. Highly recommended!"</p>
              <p className="text-right text-lg font-semibold text-gray-800">- Mark Johnson</p>
            </blockquote>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">The Developer</h2>
          <div className="text-center">
            <img src={aliOsmanImage} alt="Ali Osman" className="w-32 h-32 mx-auto rounded-full mb-4"/>
            <h3 className="text-xl font-semibold">Ali Osman</h3>
            <p className="text-gray-700">Developer & Software Engineering Student at UNITEN</p>
            <p className="text-lg text-gray-700 mt-4">
              Hi, I'm Ali Osman, a 23-year-old software engineering student at UNITEN. I'm passionate about creating unique experiences that bring together my love for books and coffee. I founded CafeX to provide a platform where café owners can showcase their offerings and customers can discover new and exciting places to enjoy their favorite reads and brews.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
