import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaUser } from "react-icons/fa";
import './Navigation.css';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <header>
      <nav className="Navigation text-white bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <ul className="max-w-[90vw] flex flex-wrap justify-between items-center mx-auto py-5">
          <li className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-green-500 text-white rounded-full">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zM2.24 9.36a9 9 0 0117.52 0C19.1 14.93 16.46 18.57 12 20.24c-4.46-1.67-7.1-5.31-7.76-10.88z"></path>
                </svg>
              </div>
              <span className="text-3xl font-bold text-green-500 font-pacifico">Pradip</span>
             
            </Link>
          </li>
          <input type="checkbox" id="check" className="hidden" />
          <span className="menu flex items-center space-x-8 bg-transparent font-bold">
            <li><NavLink to="/" activeClassName="text-red-700">Home</NavLink></li>
            <li><NavLink to="/About" activeClassName="text-red-700">About</NavLink></li>
            <li><NavLink to="/Gallery" activeClassName="text-red-700">Gallery</NavLink></li>
            <li><NavLink to="/Contact" activeClassName="text-red-700">Contact</NavLink></li>
            {token ? (
              <li><NavLink to="/Profile"><FaUser className="h-7 w-7" /></NavLink></li>
            ) : (
              <li><NavLink to="/SignIn">Sign In</NavLink></li>
            )}
            <label htmlFor="check" className="close-menu">X</label>
          </span>
          <label htmlFor="check" className="open-menu cursor-pointer"><FaBars className="h-7 w-7" /></label>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
