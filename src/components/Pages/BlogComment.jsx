import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const BlogComment = () => {
    const [comments, setComments] = useState([{}]);
    const [name, setname] = useState([])
    const [currentUserID, setId] = useState([])

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { id } = useParams();
    const token = localStorage.getItem("Token");

    const onSubmit = async (data) => {
        const response = await fetch(`http://localhost:3000/comment/blog/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ comment: data.Comment })
        });
        const responseData = await response.json();
        console.log("responseData :", responseData);
        // You may want to handle the new comment addition here, such as re-fetching the comments
        if (response.ok) {
            BlogComments();
            reset();
        }
    };

    const CommentDelete = async (BlogId) => {
        const response = await fetch(`http://localhost:3000/${BlogId}/BlogId/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }

    const BlogComments = async () => {
        const response = await fetch(`http://localhost:3000/blog/comments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.log(response.status);
            return;
        }
        const data = await response.json();
        console.log("data.UserName :", data.UserName);
        console.log("data.UserId :", data.UserId);
        setId(data.UserId)
        setname(data.UserName)
        setComments(data.comments.comment); // Make sure to set comments array from the response
    };

    useEffect(() => {
        BlogComments();
    }, [CommentDelete]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Comments</h1>
            <div className="bg-white shadow rounded-lg p-6 mb-4">
                <h2 className="text-lg font-semibold mb-3">Leave a Comment</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {token ? (
                        <>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                    Comment
                                </label>
                                <textarea
                                    {...register("Comment", { required: true })}
                                    id="comment"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Your comment"
                                />
                                {errors.Comment && <span>This field is required</span>}
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Post Comment
                            </button>
                        </>
                    ) : (
                        // navigate("/SignIn")
                      null
                    )}
                </form>
            </div>

            <div>
                {comments.map((comment, i) => (
                    <div key={i} className="bg-white shadow rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="text-sm font-medium text-gray-900">{name[i]}</div>
                            <div className="text-xs text-gray-500">{comment.date}</div>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.comments}</p>
                        <div className="container bg-white relative mb-5 m-0">
                            {currentUserID == comment.createdBy && (
                                <span className="right hover:scale-110 transition duration-300 cursor-pointer absolute right-0 top-0 text-gray-600">
                                    <MdDelete size={24} onClick={() => CommentDelete(comment._id)} />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogComment;