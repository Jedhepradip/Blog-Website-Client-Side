import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import logo from "../../assets/logoBlog.png"
import logo from "../../assets/websiteLogo.png"
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Token, setToken] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <nav className="bg-gray-200 sticky t-0 l-0 z-[500] top-0 left-0 text-black border-gray-200 dark:bg-gray-900 t-0 l-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-14 w-28" alt="Flowbite Logo" />
          {/* <span className="self-center text-3xl whitespace-nowrap dark:text-white font-bold">Pradip</span> */}
        </a>
        <button
          id="menu-toggle"
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isMenuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-10 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-200 text-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 font-serif">
            {/* <li>
              <NavLink to={"/"} className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 bg-blue-400" aria-current="page"><h1 className='py-1 px-3'>Home</h1></NavLink>
            </li> */}

            <li>
              <NavLink to={"/"} className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blak md:p-0 dark:text-black md:hover:bg-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent bg-gray-400  text-black md:mt-0 mt-3" aria-current="page"><h1 className='py-1 px-3'>Home</h1></NavLink>
            </li>

            <li>
              <NavLink to={"/About"} className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-black md:hover:bg-white md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent bg-gray-700 text-white md:mt-0 mt-3"><h1 className='p-1 px-3'>About</h1></NavLink>
            </li>

            <li>
              <NavLink to={"/Gallery"} className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:hover:bg-white md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent bg-gray-700 text-white md:mt-0 mt-3"><h1 className='p-1 px-3'>Gallery</h1></NavLink>
            </li>

            <li>
              <NavLink to={"/Contact"} className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:hover:bg-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent bg-gray-700 text-white md:mt-0 mt-3"><h1 className='p-1 px-3'>Contact</h1></NavLink>
            </li>

            {Token ?
              <>
                <li>
                  <NavLink to={"/Profile"} className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:hover:bg-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent bg-gray-700 text-white md:mt-0 mt-3"><h1 className='py-1 px-3'>Profile</h1></NavLink>
                </li>
              </>
              :
              <>
                <li>
                  <NavLink to={'/SignIn'} className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:hover:bg-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent bg-blue-800 text-white md:mt-0 mt-3"><h1 className='py-1 px-3'>SignIn</h1></NavLink>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
