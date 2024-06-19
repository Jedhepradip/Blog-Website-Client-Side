import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useLocation, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
            const response = await fetch(`http://localhost:3000/blog/edit/${id}`, {
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
            console.log("Postdate :", Postdate);
            navigate("/Profile")
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getthedatainBlogPost = async () => {
            const token = localStorage.getItem("Token")
            const response = await fetch(`http://localhost:3000/findBlog/${id}`, {
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
            { }
            <div className="bg-blue-200 flex items-center p-5">
                <img src="https://media.istockphoto.com/id/1093508248/photo/modern-work-table-with-computer-laptop-and-cityscapes-view-from-window-business-concepts-ideas.jpg?s=612x612&w=0&k=20&c=vpMc1UR6KfgPe4GYcFG4x1FfPKLyYsoKqrAJolfBSZs=" alt="" className='absolute w-full h-[550px] object-cover blur-md' />
                <div className="w-full relative">
                    <h2 className="text-center text-black-600 font-bold text-2xl uppercase mb-5">Edit Post Blog</h2>
                    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Img</label>
                                <input
                                    {...register("Img")}
                                    type="file"
                                    id="Img"
                                    defaultValue={defaultdate.Image}
                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Title</label>
                                <input
                                    {...register("Title")}
                                    type="text"
                                    id="Title"
                                    defaultValue={defaultdate.Title}
                                    placeholder="Put In Your Title."
                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                />
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Desc</label>
                                <textarea
                                    {...register("Desc")}
                                    type="text"
                                    id="Desc"
                                    defaultValue={defaultdate.Desc}
                                    placeholder="Put In Your Desc."
                                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                                />
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

                            <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPostBlog
