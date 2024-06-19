import React, { useEffect, useState } from 'react';
import { FaBlog, FaRegComment } from 'react-icons/fa6';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Swal from 'sweetalert2';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogDate, setBlogDate] = useState([]);
    const [UserId, setUserId] = useState(null);
    const [visibleDropdown, setVisibleDropdown] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("Token");

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('Token');
            if (!token) {
                return navigate("/SignIn");
            }
            try {
                const response = await fetch('http://localhost:3000/user/profile', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserId(data._id);
                setUserData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [navigate]);


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


    useEffect(() => {
        if (UserId) {
            const ShowBlogPostDate = async () => {
               
                try {
                    const response = await fetch(`http://localhost:3000/BlogPostDate/Profile/${UserId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setBlogDate(data);
                } catch (error) {
                    console.error("Error fetching blog post data:", error);
                }
            };
            ShowBlogPostDate();
        }
    }, [likeblog]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const refreshPage = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem("UserId");
        navigate("/Login");
        refreshPage();
    };

    const handleEditProfile = async (UserId) => {
        const token = localStorage.getItem('Token');
        try {
            let response = await fetch(`http://localhost:3000/EditProfile/${UserId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Profile Data", data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const toggleDiv = (index) => {
        console.log("index", index);
        console.log("visibleDropdown :", visibleDropdown);
        setVisibleDropdown(visibleDropdown === index ? null : index);
    };

    const DeleteOnclick = async (BlogId) => {
        try {
            console.log("BlogId", BlogId);
            const response = await fetch(`http://localhost:3000/BlogPostDelete/${BlogId}`, {
                method: 'DELETE',
            });

            const date = await response.json()
            console.log("Delter :", date);
            if (response.ok) {
                Swal.fire("Success", date.message, "success");
                navigate("/")
            }
            console.log(date.message);
        } catch (error) {

        }
    }

    return (
        <>
            <div className="h-screen bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
                <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 ease-in-out">
                    <div className="h-[180px] overflow-hidden">
                        <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img className="h-32 w-32 bg-white p-2 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div>
                    <div>
                        <div className="text-center px-14">
                            <h2 className="text-gray-800 text-3xl font-bold">{userData.Name}</h2>
                            <a className="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/immohitdhiman/" target="_blank" rel="noopener noreferrer">{userData.Email}</a>
                            <p className="mt-2 text-gray-500 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        </div>
                        <hr className="mt-6" />
                        <div className="flex bg-gray-50">
                            <div className="text-center w-1/3 p-4 hover:bg-gray-100 cursor-pointer">
                                <NavLink to="/PostBlog">
                                    <p className="flex items-center justify-center">
                                        <FaBlog className="mr-2" />
                                        <span className="font-semibold">Post Blog</span>
                                    </p>
                                </NavLink>
                            </div>
                            <div className="text-center w-1/3 p-4 hover:bg-gray-100 cursor-pointer">
                                <NavLink to="/EditProfile" onClick={() => handleEditProfile(UserId)}>
                                    <p className="flex items-center justify-center">
                                        <FaUserEdit className="mr-2" />
                                        <span className="font-semibold">Edit Profile</span>
                                    </p>
                                </NavLink>
                            </div>
                            <div className="text-center w-1/3 p-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                                <p className="flex items-center justify-center">
                                    <FaSignOutAlt className="mr-2" />
                                    <span className="font-semibold">Logout</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-center text-black font-bold text-2xl uppercase mb-5 mt-5">User Created Post</h2>


            {console.log("blog Date :", blogDate)}
            <div className='p-5 bg-neutral-300 flex justify-around flex-wrap items-center'>
                {blogDate.map((val, index) => (
                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="float-right font-serif text-[20px] relative">
                            <div>
                                <BsThreeDotsVertical onClick={() => toggleDiv(index)} className="icon" />
                                {visibleDropdown === index && (
                                    <div className="dropdown">
                                        <ul>
                                            <NavLink to={`/EditPostBlog/${val._id}`}> <li>Edit</li></NavLink>
                                            <li onClick={() => { DeleteOnclick(val._id) }}>Delete</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <a href="#">
                            <img
                                src={`http://localhost:3000/${val.Image}`}
                                alt="Image"
                                className="p-1 w-[100%] h-[260px]"
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{val.Title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{val.Desc}</p>
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            <div className="flex items-center justify-center gap-2 float-right">
                                <NavLink to={`/BlogComment/${val._id}`}><FaRegComment className='float-right font-bold text-2xl' /> </NavLink>
                                <span className='float-right text-[20px] font-semibold'>{val.comment?.length || 0}</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 float-right">
                                <AiOutlineHeart onClick={() => { likeblog(val._id) }} className='relative float-right cursor-pointer right-0 font-bold text-3xl' />
                                <span className=' text-[20px] font-semibold mr-5'>{val.likes?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Profile;
