import React from 'react';
import { FaHome } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { GiRotaryPhone } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
const Footer = () => {
  return (
    <>
    <footer
      className="bg-gray-800 text-white text-center dark:bg-neutral-600 dark:text-neutral-200 lg:text-left mt-0">
         <div className="mx-6 py-10 text-center md:text-left">

        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="">
            <h6
              className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-4 w-4">
                <path
                  d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              TW Elements
            </h6>
            <p>
              Here you can use rows and columns to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p>
          </div>
          <div className="">
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              service
            </h6>
            <p className="mb-4">
              <a className="text-neutral-600 dark:text-neutral-200"
              >HOME</a>
            </p>
            <p className="mb-4">
              <a className="text-neutral-600 dark:text-neutral-200  "
              >ABOUT</a>
            </p>
            <p className="mb-4">
              <a className="text-neutral-600 dark:text-neutral-200"
              >BLOG</a>
            </p>
            <p>
              <a className="text-neutral-600 dark:text-neutral-200"
              >CONTACT</a>
            </p>
          </div>
          {/* <!-- Useful links section --> */}
          <div className="">
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <a className="text-neutral-600 dark:text-neutral-200"
              >Pricing</a>
            </p>
            <p className="mb-4">
              <a className="text-neutral-600 dark:text-neutral-200"
              >Settings</a>
            </p>
            <p className="mb-4">
              <a className="text-neutral-600 dark:text-neutral-200"
              >Orders</a>
            </p>
            <p>
              <a className="text-neutral-600 dark:text-neutral-200"
              >Help</a>
            </p>
          </div>
          {/* <!-- Contact section --> */}
          <div>
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <FaHome className='mr-3 h-5 w-5'/>
              Bhavinimgaon , Maharashtra
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
            <MdEmail className='mr-3 h-5 w-5'/>
              PradipJedhe69@gmail.com
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
            <IoCall className='mr-3 h-5 w-5'/>
             8459844605
            </p>
            <p className="flex items-center justify-center md:justify-start">
             <GiRotaryPhone className='mr-3 h-5 w-5'/>
              + 01 234 567 89
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer;
