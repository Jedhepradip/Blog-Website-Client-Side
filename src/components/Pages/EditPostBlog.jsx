import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx';
import { useParams, useLocation, json, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPostBlog = () => {
    const [file, setFile] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [defaultdate, setdaultdate] = useState({})
    const navigate = useNavigate()

    const params = useParams();
    const location = useLocation();
    const { id } = useParams()
    console.log(id);

    console.log(params); // Access URL parameters
    console.log(location.pathname); // Access the pathname

    const onSubmit = async (formData) => {

        const data = new FormData();
        data.append('Img', file);
        data.append('title', formData.Title);
        data.append('Desc', formData.Desc);
        data.append('Date', formData.Date);
        console.log("FromDate", formData.Title);
        console.log("fromDate", formData);

        try {
            const token = localStorage.getItem("Token");
            const response = await fetch(`https://blog-website-server-side.onrender.com/blog/edit/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data // Send FormData directly
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                toast.error(errorData.message)
            }
            if (response.ok) {
                toast.success("Blog Post Edit successfully...")
                setTimeout(() => {
                    navigate("/Profile")
                }, [900])
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    };

    useEffect(() => {
        const getthedatainBlogPost = async () => {
            const token = localStorage.getItem("Token")
            const response = await fetch(`https://blog-website-server-side.onrender.com/findBlog/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            let res = await response.json()
            console.log("res :", res);
            setdaultdate(res)
        }
        getthedatainBlogPost()
    }, [])

    // fix this but to not show the response in date and print the response

    return (
        <div>
            <h2 className="text-center text-black text-3xl uppercase mb-5 mt-5 font-serif">Edit Post Blog...</h2>
            <div className='p-10'>
            <ToastContainer />
                <div className="flex items-center">
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto p-1">
                        <NavLink to={"/Profile"}>
                            <RxCross2 className="float-right text-2xl ml-5 text-red-500 font-extrabold" />
                        </NavLink>
                        <div className="py-5 px-10 font-serif">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-1">
                                    <label className="block mb-2 font-bold text-gray-600">Img</label>
                                    <input
                                        {...register("Img")}
                                        type="file"
                                        id="Img"
                                        className="border border-gray-300 shadow py-2 px-2 w-full rounded mb-"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>

                                <div className="mb-1">
                                    <label className="block mb-2 font-bold text-gray-600">Title</label>
                                    <input
                                        {...register("Title", {
                                            required: { value: true, message: "Click to The Check Box || This Field Is Required" },
                                            minLength: { value: 40, message: "Min Length is 40 Letter" },
                                            maxLength: { value: 80, message: "Max Length Is 80 Letter" }
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
                                            required: { value: true, message: "Click to The Check Box || This Field Is Required" },
                                            minLength: { value: 210, message: "Min Length is 210 Letter" },
                                            maxLength: { value: 250, message: "Max Length Is 250 Letter" }
                                        })}
                                        id="Desc"
                                        defaultValue={defaultdate.Desc}
                                        placeholder="Put In Your Description."
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPostBlog
