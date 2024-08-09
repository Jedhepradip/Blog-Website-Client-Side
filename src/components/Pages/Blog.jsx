import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const Blog = () => {
  const [blogDate, setBlogDate] = useState([]);


  const token = localStorage.getItem("Token")
  const likeblog = async (like) => {
    const response = await fetch(`http://localhost:3000/blog/like/${like}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (!response.ok) return console.log(response.status);
    console.log(data);
  }

  const getTheDateToBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/Blog/Date', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBlogDate(data);
      // console.log("Dateblog response:", data); // log the response
    } catch (error) {
      console.error("Error fetching the blog date:", error);
    }
  };

  useEffect(() => {
    getTheDateToBlogs();
  }, [likeblog,blogDate]);



  return (
    <>
      {/* <div className='flex flex-col items-center bg-gray-50 dark:bg-gray-900 py-8 px-4'>
        <h1 className='text-[50px] font-bold font-serif'>Latest Blogs</h1>
        <div className='flex justify-around flex-wrap items-center'>
          {blogDate.map((val, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 p-0 mb-[30px] mt-5"
            >
              <a href="#">
                <img
                  src={`http://localhost:3000/${val.Image}`}
                  alt="Image"
                  className="p-1 w-[100%] h-[270px] object-cover rounded-t-lg"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold font-serif tracking-tight text-gray-900 dark:text-white ">{val.Title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-serif">{val.Desc}</p>
                <a
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-serif"
                >
                  Read Comment
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <div className="flex items-center justify-center gap-2 float-right mt-2">
                  <NavLink to={`/BlogComment/${val._id}`}>
                    <FaRegComment className='font-bold text-2xl text-gray-600 dark:text-gray-300' />
                  </NavLink>
                  <span className='text-[20px] font-semibold text-gray-600 dark:text-gray-300'>{val.comment?.length || 0}</span>
                </div>
                <div className="flex items-center justify-center gap-2 float-right mt-2">
                  <AiOutlineHeart
                    onClick={() => { likeblog(val._id) }}
                    className='relative cursor-pointer font-bold text-3xl text-gray-600 dark:text-gray-300'
                  />
                  <span className='text-[20px] font-semibold text-gray-600 dark:text-gray-300 mr-5'>{val.likes?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div
        //  className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 py-8 px-4"
        className='p-5 bg-white flex-col py-8 px-4 flex justify-around flex-wrap items-center font-serif'
      >
        <h1 className="text-[50px] font-bold font-serif mb-8">Latest Blogs</h1>
        <div className="flex justify-around flex-wrap items-center gap-6">
          {blogDate.map((val, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 p-0"
            >
              <div className='overflow-hidden'>
                <img
                  src={`http://localhost:3000/${val.Image}`}
                  alt="Image"
                  className="p-1 w-[100%] h-[280px] object-cover rounded-t-lg rounded-l transform transition duration-300 hover:scale-110 hover:rounded-l"
                />
              </div>
              <div className="p-5">

                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold font-serif tracking-tight text-gray-900 dark:text-white">{val.Title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-serif">{val.Desc}</p>
                <a className="inline-flex items-center px-3 py-2 text-sm text-center text-black rounded-lg text-[21px] font-bold">
                Date  {val.Date} </a>

                <div className="flex items-center justify-center gap-2 float-right mt-2">
                  <NavLink to={`/BlogComment/${val._id}`}>
                    <FaRegComment className='font-bold text-2xl text-gray-600 dark:text-gray-300' />
                  </NavLink>
                  <span className='text-[20px] font-semibold text-gray-600 dark:text-gray-300'>{val.comment?.length || 0}</span>
                </div>

                <div className="flex items-center justify-center gap-2 float-right mt-2">
                  <AiOutlineHeart
                    onClick={() => { likeblog(val._id) }}
                    className='relative cursor-pointer font-bold text-3xl text-gray-600 dark:text-gray-300'
                  />
                  <span className='text-[20px] font-semibold text-gray-600 dark:text-gray-300 mr-5'>{val.likes?.length || 0}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default Blog;
