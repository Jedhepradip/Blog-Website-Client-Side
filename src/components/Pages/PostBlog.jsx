import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PostBlog = () => {
    const [file, setFile] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const Navigate = useNavigate()

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
                Navigate("/")
            } else {
                Swal.fire("Error", result.message || "There was an error submitting the blog post", "error");
            }
        } catch (error) {
            console.error("Error submitting the blog post:", error);
            Swal.fire("Error", "There was an error submitting the blog post", "error");
        }
    };

    return (
        <div>
            <div className="bg-blue-200 flex items-center p-5">
                <img src="https://media.istockphoto.com/id/1093508248/photo/modern-work-table-with-computer-laptop-and-cityscapes-view-from-window-business-concepts-ideas.jpg?s=612x612&w=0&k=20&c=vpMc1UR6KfgPe4GYcFG4x1FfPKLyYsoKqrAJolfBSZs=" alt="" className='absolute w-full h-[550px] object-cover blur-md' />
                <div className="w-full relative">
                    <h2 className="text-center text-black-600 font-bold text-2xl uppercase mb-5">Post Blog</h2>
                    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
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

                            <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostBlog;
