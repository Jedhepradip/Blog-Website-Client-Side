import React, { useEffect, useState } from 'react';
import { FaBlog, FaRegComment } from 'react-icons/fa6';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineHeart } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { RxCross2 } from 'react-icons/rx';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogDate, setBlogDate] = useState([]);
    const [UserId, setUserId] = useState(null);  // remove the 
    const [visibleDropdown, setVisibleDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showpostblogfrom, setshowpostblogfroms] = useState(false)
    const [UserProfUserEdit, setuserandeditnone] = useState(false)
    const [file, setFile] = useState(null);// Post Blog
    const [defaultdate, setdefaultdate] = useState([{}])
    const [EditPostBlog, setEditpostblog] = useState(false)
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const token = localStorage.getItem("Token");

    // get User Information
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
                if (response.ok) {
                    const data = await response.json();
                    setUserId(data.user._id);
                    setUserData(data.user);
                    setBlogDate(data.Blogarr)
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [navigate, userData]);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handlepostblog = () => {
        setuserandeditnone(!UserProfUserEdit)
        setshowpostblogfroms(!showpostblogfrom)
    }

    const handelPostEdit = (BlogId) => {
        const Blog = blogDate.filter(e => {
            if (e._id == BlogId) {
                setdefaultdate(e);
            }
        })
        setEditpostblog(!EditPostBlog)
    }

    // User Like Blogs
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
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // logout the user
    const handleLogout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem("UserId");
        navigate("/Login");
        refreshPage();
    };

    // user profile Eidt 
    const handelForm = async (e) => {
        e.preventDefault()
        const fromdata = new FormData(e.target)
        const obj = Object.fromEntries(fromdata.entries())
        console.log("pradip", obj);

        try {
            const token = localStorage.getItem("Token");
            const response = await fetch("http://localhost:3000/User/Profile/Edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            });

            const data = await response.json();
            if (!response.ok) {
                console.log(data.status);
            }
            if (response.ok) {
                console.log("rani rani ", data);
                console.log(data.message);
                toggleModal()
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const toggleDiv = (index) => {
        setVisibleDropdown(visibleDropdown === index ? null : index);
    };

    // delete the blog 
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

    // Post User Bslog 
    const onSubmit = async (formData) => {
        const data = new FormData();
        data.append('Img', file);
        data.append('title', formData.Title);
        data.append('Desc', formData.Desc);
        data.append('Date', formData.Date);

        console.log("FromDate", formData.Title);
        console.log("fromDate", formData);

        console.log("date to the Post Blog :", data);

        try {
            const token = localStorage.getItem("Token");
            const response = await fetch("http://localhost:3000/BlogPost", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data
            });

            const result = await response.json();
            console.log("Response Edit Profile:", result);

            if (response.ok) {
                Swal.fire("Success", "Blog Upload successfully", "success");
                navigate("/")
            } else {
                Swal.fire("Error", result.message || "There was an error submitting the blog post", "error");
            }
        } catch (error) {
            console.error("Error submitting the blog post:", error);
            Swal.fire("Error", "There was an error submitting the blog post", "error");
        }
    };

    // Post Edit form 
    const handelPostEditform = async (e) => {
        e.preventDefault()
        const fromdata = new FormData(e.target)
        const obj = Object.fromEntries(fromdata.entries())
        const data = new FormData();
        data.append('Img', file);
        data.append('title', obj.Title);
        data.append('Desc', obj.Desc);
        data.append('Date', obj.Date);
        console.log("FromDate", obj.Title);
        console.log("fromDate", obj);

        try {
            const token = localStorage.getItem("Token");
            const response = await fetch(`http://localhost:3000/blog/edit/${defaultdate[0]._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data // Send FormData directly
            });
            const Postdate = JSON.stringify(response)
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
            }
            if (response.ok) {
                console.log("Postdate :", Postdate);
                navigate("/Profile")
                setEditpostblog(!EditPostBlog)
            }
        } catch (error) {
            console.log(error);
        }
    }


    console.log(defaultdate);


    return (
        <div className='bg-slate-50'>
            <div className='relative bg-slate-50 dark:bg-gray-800 flex flex-wrap items-center justify-center font-serif'>

                {!UserProfUserEdit && <>
                    {!isModalOpen &&
                        <div className="min-h-screen p-8">
                            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIFrTTCKBB9Y5EJV6a7_yC03klrgBV4pfKSzzExMvrKp13Fo7DkUFOtfC&s=10"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-2 border-black"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-800">{userData.Name}</h2>
                                        {/* <p className="text-gray-600">email</p> */}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                            <h4 className="font-semibold text-gray-700">Name</h4>
                                            <p className="text-gray-600">{userData.Name}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                            <h4 className="font-semibold text-gray-700">Email</h4>
                                            <p className="text-gray-600">{userData.Email}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                            <h4 className="font-semibold text-gray-700">Phone</h4>
                                            <p className="text-gray-600">91+</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                            <h4 className="font-semibold text-gray-700">Address</h4>
                                            <p className="text-gray-600">123 Street Namfe, City, Country</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-gray-700">Account Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-serif">
                                        <h1
                                        //  onClick={() => handleEditProfile(UserId)}
                                        >
                                            <button className="bg-blue-500 text-white flex w-full gap-2 py-2 px-4 rounded-lg shadow-md" onClick={() => toggleModal()}>
                                                <FaBlog className='felx text-[22px]' />
                                                Update
                                            </button>
                                        </h1>

                                        <button className="bg-green-500 w-full flex text-white gap-2 py-2 px-4 rounded-lg shadow-md" onClick={() => handlepostblog()}>
                                            <FaUserEdit className='flex text-[25px]' />
                                            Post Blog
                                        </button>

                                        <button className="bg-red-500 text-white flex gap-2 py-2 px-4 rounded-lg shadow-md" onClick={() => handleLogout()}>
                                            <FaSignOutAlt className='flex text-[22px]' />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Edit the Login User */}
                    {isModalOpen && (
                        <>
                            <div className='p-10'>
                                <div className="bg-white flex items-center">
                                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto p-1">
                                        <RxCross2 onClick={() => toggleModal()}
                                            className="float-right text-2xl ml-5 text-red-500 font-extrabold" />
                                        <div className="py-5 px-10">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Edit Profile</h2>
                                            <form onSubmit={handelForm}>

                                                <div className="mb-1">
                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                                        Username
                                                    </label>
                                                    <input
                                                        {...register('Name')}
                                                        className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="username"
                                                        defaultValue={userData.Name}
                                                        type="text"
                                                        name="Name"
                                                        placeholder="Username"
                                                    />
                                                </div>

                                                <div className="mb-1">
                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="Email">
                                                        Email
                                                    </label>
                                                    <input
                                                        {...register('Email')}
                                                        className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        name="email"
                                                        defaultValue={userData.Email}
                                                        type="email"
                                                        placeholder="Eamil"
                                                    />
                                                </div>

                                                <div className="mb-1">
                                                    <label className="block mb-2 font-bold text-gray-600">Create New Password</label>
                                                    <input
                                                        {...register("Password")}
                                                        type="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        name="Password"
                                                        className="border border-gray-300 shadow p-3 w-full rounded mb-1"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 mt-1 w-full border hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                                                        Update Profile
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>}

                {/* Post The Blog */}

                {showpostblogfrom &&
                    <>
                        <div className='p-10'>
                            <div className="bg-white flex items-center">
                                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto p-1">
                                    <RxCross2 onClick={() => handlepostblog()}
                                        className="float-right text-2xl ml-5 text-red-500 font-extrabold" />
                                    <div className="py-5 px-10">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                            Welcome To Post Blog
                                        </h2>
                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="mb-1">
                                                <label className="block mb-2 font-bold text-gray-600">Img</label>
                                                <input
                                                    {...register("Img", { required: "This Field Is Required" })}
                                                    type="file"
                                                    id="Img"
                                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                />
                                                {errors.Img && <div className='block mb-2 font-bold text-center text-red-500'>{errors.Img.message}</div>}
                                            </div>

                                            <div className="mb-1">
                                                <label className="block mb-2 font-bold text-gray-600">Title</label>
                                                <input
                                                    {...register("Title", {
                                                        required: { value: true, message: "This Field Is Required" },
                                                        minLength: { value: 40, message: "Min Length is 40 Word" },
                                                        maxLength: { value: 80, message: "Max Length Is 80 word" }
                                                    })}
                                                    type="text"
                                                    id="Title"
                                                    placeholder="Put In Your Title."
                                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                                />
                                                {errors.Title && <div className='block mb-2 font-bold text-center text-red-500'>{errors.Title.message}</div>}
                                            </div>

                                            <div className="mb-1">
                                                <label className="block mb-2 font-bold text-gray-600">Desc</label>
                                                <textarea
                                                    {...register("Desc", {
                                                        required: { value: true, message: "This Field Is Required" },
                                                        minLength: { value: 210, message: "Min Length is 210 Word" },
                                                        maxLength: { value: 250, message: "Max Length Is 250 word" }
                                                    })}

                                                    type="text"
                                                    id="Desc"
                                                    placeholder="Put In Your Desc."
                                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                                />
                                                {errors.Desc && <div className='block mb-2 font-bold text-center text-red-500'>{errors.Desc.message}</div>}
                                            </div>

                                            <div className="mb-1">
                                                <label className="block mb-2 font-bold text-gray-600">Date</label>
                                                <input
                                                    {...register("Date", { required: "This Field Is Required" })}
                                                    type="date"
                                                    id="Date"
                                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                                />
                                                {errors.Date && <div className='block mb-2 font-bold text-center text-red-500'>{errors.Date.message}</div>}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 mt-1 w-full border hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                                                    Blog Post
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>


            {!EditPostBlog &&
                <>
                    <h2 className="text-center text-black text-2xl uppercase mb-5 mt-5 font-serif">User Created Post</h2>

                    <div className='p-5 bg-slate-50 flex justify-around flex-wrap items-center font-serif'>
                        {blogDate.map((val, index) => (
                            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="float-right font-serif text-[20px] relative">
                                    <div>
                                        <BsThreeDotsVertical onClick={() => toggleDiv(index)} className="icon" />
                                        {visibleDropdown === index && (
                                            <div className="dropdown">
                                                <ul>
                                                    <li onClick={() => { handelPostEdit(val._id) }}>Edit</li>
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
            }

            {EditPostBlog &&
                <>
                    <h2 className="text-center text-black text-3xl uppercase mb-5 mt-5 font-serif ">Edit Post Blog...</h2>

                    <div className='p-10'>
                        <div className="bg-slate-50 flex items-center">
                            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto p-1">
                                <RxCross2 onClick={() => handelPostEdit()}
                                    className="float-right text-2xl ml-5 text-red-500 font-extrabold" />
                                <div className="py-5 px-10 font-serif">

                                    <form onSubmit={handelPostEditform}>

                                        <div className="mb-1">
                                            <label className="block mb-2 font-bold text-gray-600">Img</label>
                                            <input
                                                {...register("Img")}
                                                type="file"
                                                id="Img"
                                                defaultValue={defaultdate.Image}
                                                className="border border-gray-300 shadow py-2 px-2 w-full rounded mb-"
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        </div>

                                        <div className="mb-1">
                                            <label className="block mb-2 font-bold text-gray-600">Title</label>
                                            <input
                                                {...register("Title", {
                                                    required: { value: true, message: "Click to The Chcek Box || This Field Is Required" },
                                                    minLength: { value: 40, message: "Min Length is 40 Word" },
                                                    maxLength: { value: 80, message: "Max Length Is 80 word" }
                                                })}
                                                type="text"
                                                id="Title"
                                                defaultValue={defaultdate.Title}
                                                placeholder="Put In Your Title."
                                                className="border border-gray-300 shadow py-3 px-2 w-full rounded mb-"
                                            />
                                            {errors.Title && <div className='block mb-2 font-bold text-center text-red-500'>{errors.Title.message}</div>}
                                        </div>

                                        <div className="mb-1">
                                            <label className="block mb-2 font-bold text-gray-600">Desc</label>
                                            <textarea
                                                {...register("Desc", {
                                                    required: { value: true, message: "Click to The Chcek Box || This Field Is Required" },
                                                    minLength: { value: 210, message: "Min Length is 210 Word" },
                                                    maxLength: { value: 250, message: "Max Length Is 250 word" }
                                                })}
                                                type="text"
                                                id="Desc"
                                                defaultValue={defaultdate.Desc}
                                                placeholder="Put In Your Desc."
                                                className="border border-gray-300 shadow py-2 px-2 w-full rounded mb-"
                                            />
                                            {errors.Desc && <div className='block mb-2 font-bold text-center text-red-500'>{errors.Desc.message}</div>}
                                        </div>

                                        <div className="mb-1">
                                            <label className="block mb-2 font-bold text-gray-600">Date</label>
                                            <input
                                                {...register("Date")}
                                                type="date"
                                                id="Date"
                                                defaultValue={defaultdate.Date}
                                                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 mt-1 w-full border hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Submit
                                            </button>
                                        </div>
                                        {/* <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">Submit</button> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Profile;
