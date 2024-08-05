import React from 'react';
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
      <div className='bg-gray-800 text-white py-5 px-2'>
        <div className='flex flex-wrap justify-around items-center mb-5 cursor-pointer'>
          <ul className='w-full md:w-auto mb-4 md:mb-0 md:mt-0 mt-5'>
            <h3 className='text-2xl mb-3 uppercase font-serif'>Support</h3>
            <li className='font-serif py-1 hover:font-bold'>FAQ</li>
            <li className='font-serif py-1 hover:font-bold'>Contact Us</li>
            <li className='font-serif py-1 hover:font-bold'>Privacy Policy</li>
            <li className='font-serif py-1 hover:font-bold'>Terms of Service</li>
          </ul>

          <ul className='w-full md:w-auto mb-4 md:mb-0 md:mt-0 mt-5'>
            <h3 className='text-2xl mb-3 uppercase font-serif'>Discover</h3>
            <li className='font-serif py-1 hover:font-bold'>Latest Posts</li>
            <li className='font-serif py-1 hover:font-bold'>Popular Tags</li>
            <li className='font-serif py-1 hover:font-bold'>Categories</li>
            <li className='font-serif py-1 hover:font-bold'>Archives</li>
          </ul>

          <ul className='w-full md:w-auto mb-4 md:mb-0 md:mt-0 mt-5'>
            <h3 className='text-2xl mb-3 uppercase font-serif'>Blog</h3>
            <li className='font-serif py-1 hover:font-bold'> Personal Blog</li>
            <li className='font-serif py-1 hover:font-bold'>Food Blog</li>
            <li className='font-serif py-1 hover:font-bold'>Travel Blog</li>
            <li className='font-serif py-1 hover:font-bold'>Lifestyle Blogs</li>
          </ul>

          <ul className='w-full md:w-auto mb-4 md:mb-0 md:mt-0 mt-5'>
            <h3 className='text-2xl mb-3 uppercase font-serif'>Partners</h3>
            <li className='font-serif py-1 hover:font-bold'>Advertise with Us</li>
            <li className='font-serif py-1 hover:font-bold'>Write for Us</li>
            <li className='font-serif py-1 hover:font-bold'>Affiliate Program</li>
            <li className='font-serif py-1 hover:font-bold'>Sponsorships</li>
          </ul>

          <ul className='w-full md:w-auto md:mt-0 mt-5'>
            <h3 className='text-2xl mb-3 uppercase font-serif'>About</h3>
            <li className='font-serif py-1 hover:font-bold'>Our Story</li>
            <li className='font-serif py-1 hover:font-bold'>Team</li>
            <li className='font-serif py-1 hover:font-bold'>Careers</li>
            <li className='font-serif py-1 hover:font-bold'>Contact</li>
          </ul>

          <ul className='w-full md:w-auto md:mt-0 mt-5'>
            <h3 className='text-2xl mb-3 uppercase font-serif'>Subscribe</h3>
            <li className='font-serif py-1'>Email: pradipjedhe69@gmail.com</li>
            <li className='font-serif py-1'>Contact: +91 8459844605</li>
            <li className='font-serif py-1'>Address: Bhavinimgaon, Tal.Shevgaon</li>
            <li className='font-serif py-0'>
              <div className='flex justify-around items-center'>
                <a href="https://in.linkedin.com/">
                  <FaLinkedinIn className='text-3xl bg-white h-9 mt-4 w-9 p-1 rounded-[50%] text-black' />
                </a>
                <a href="https://www.instagram.com/">
                  <FaInstagram className='text-3xl bg-white h-9 mt-4 w-9 p-1 rounded-[50%] text-black' />
                </a>
                <a href="https://www.google.co.in/">
                  <FaGoogle className='text-3xl bg-white h-9 mt-4 w-9 p-1 rounded-[50%] text-black' />
                </a>
                <a href="https://m.facebook.com/">
                  <FaFacebook className='text-3xl bg-white h-9 mt-4 w-9 p-1 rounded-[50%] text-black' />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer;
