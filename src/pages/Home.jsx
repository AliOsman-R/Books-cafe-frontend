import React, { useEffect, useRef, useState } from "react";
import secondaryImage from "../assets/secondary-image.jpg";
import { Link } from "react-router-dom";
import { httpRequest } from "../utils/httpsRequest";
import { AppLoader } from "../components/LoaderSpinner";
import CafeCard from "../components/cards/CafeCard";
import { CgUnavailable } from "react-icons/cg";

const linkStyle =
  "min-w-[140px] h-[60px] bg-secondaryColor font-bold text-[16px] hover:bg-secondaryColorHover rounded-lg flex items-center justify-center";

const Home = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [sortedCafes, setSortedCafes] = useState([]);
  const storesRef = useRef(null);
  const titleRef = useRef(null);
  const whyChooseRef = useRef(null);
  const homeImage = useRef(null);
  const isData = sortedCafes.length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    httpRequest.get('/cafe/')
    .then(({data}) => {
      console.log(data)
      const cafes = data.cafes
      cafes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setSortedCafes(cafes.slice(0, 3));
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(()=> {setPageLoading(false)})
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if ([...entry.target.classList].includes("post"))
            entry.target.classList.add("animate-slideInFromBottom");
          else entry.target.classList.add("animate-slideInFromRight");
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(titleRef.current);
    observer.observe(whyChooseRef.current);
    if(sortedCafes.length>0)
    {
      observer.observe(storesRef.current);
    }
    // observer.observe(homeImage.current);

    return () => {
      observer.disconnect();
    };
  }, [sortedCafes]);

  return (
    <div className="flex flex-col mt-0 ">
      <div
        className="h-screen flex flex-col items-center bg-[url('./assets/main-image.jpg')] bg-cover post"
        // ref={homeImage}
      >
        <div className=" text-primaryTextColor p-5 mt-[270px] flex justify-center gap-5 flex-col items-center">
          <h1 className="lg:text-6xl ssm:text-3xl text-center">
            Discover Your Next Read and Sip!
            <br />
            Books cafes at your fingertips.
            <br />
          </h1>
          <span className="text-primaryTextColor text-center">
            For Book Lovers: Find, Savor, Repeat,
            <br />
            For Store Owners: Showcase, Connect, Grow.
            <br />
          </span>
          <span className="text-primaryTextColor text-center">
            Join CafeX – Where Stories and Coffee Brew Together.
          </span>
        </div>
        <div className="text-black flex justify-center mb-5 gap-5 ">
          <Link className={linkStyle} to={"/cafes"}>
            View cafes
          </Link>
          <Link className={linkStyle} to={"/auth/signup"}>
            Join us
          </Link>
        </div>
      </div>

      <div className="flex flex-col my-20 min-h-[50vh]">
        <div
          className="text-4xl font-semibold text-center pb-10"
          ref={titleRef}
        >
          <h1>Latest Joined Cafes</h1>
        </div>
        {
          pageLoading? (
            <div className="flex justify-center items-center h-screen">
              <AppLoader/>
            </div>
          ):
          (
          <div
            className="flex flex-wrap ssm:px-2 items-center justify-center gap-4 post"
            ref={storesRef}
          >
            {isData && sortedCafes.map(
              (cafe) => (
                <CafeCard
                  key={cafe._id}
                  item={cafe}
                  />
              )
              )}
              {!isData && (
                <div className="flex flex-col justify-center items-center mt-[250px]">
                  <h1 className="text-[40px] font-semibold text-gray-400">
                    We are sorry
                  </h1>
                  <h1 className="text-[40px] font-semibold text-gray-400 flex gap-2 items-center">
                    No Cafes Available{" "}
                    <CgUnavailable size={50} className="text-gray-400" />
                  </h1>
                </div>
              )}
          </div>
            )
        }
      </div>
      <div className="border-t-2"></div>
      <div
        className="min-h-[50vh] my-20 flex lg:flex-row ssm:flex-col justify-center items-center gap-5"
        ref={whyChooseRef}
      >
        <img src={secondaryImage} className=" size-56 rounded-3xl" alt="img" />

        <div className="flex flex-col gap-4 w-[50%]">
          <h1 className=" font-semibold text-4xl text-center md:text-start">
            Why Choose Us?
          </h1>
          <p className="ssm:w-[100%]">
            Welcome to CafeX: Where Every Page Brews a New Discovery!
            <br />
            Dive into a world where the aroma of freshly brewed coffee and the
            allure of captivating stories blend seamlessly. CafeX is your
            ultimate destination to explore and purchase from the finest
            selection of books and savor the unique atmosphere of café
            bookstores, all from the comfort of your home.
          </p>
          <p>
            Experience the Charm of Bookstore Cafés with CafeX <br />
            Because every book, like every cup of coffee, promises a new
            adventure.
          </p>
          <div className="mt-1 flex lg:justify-end ssm:justify-center">
            <Link className={linkStyle} to={"/about"}>
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
