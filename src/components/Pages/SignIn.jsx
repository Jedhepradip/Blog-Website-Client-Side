import React, { useEffect, useState } from 'react'
import { NavLink, json } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Token } from '@mui/icons-material'

const SignIn = () => {
    const navigate = useNavigate()
    const [Checkpassword, setpassword] = useState(true)
    const [show, seterror] = useState()
    const [emailerror, setemailserror] = useState()
    let collectedEmails = [];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        let checkthepassword = data.password === data.Cpassword
        const email = data.email
        const start = email.length - 10;
        for (let i = start; i < email.length; i++) {
            collectedEmails.push(email[i]);
        }
        let newarray = collectedEmails.join("")
        let pradip = newarray === "@gmail.com"

        if (pradip) {
            setemailserror("")
            setpassword(checkthepassword)
            if (checkthepassword) {
                let r = await fetch("http://localhost:3000/signin/data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                let res = await r.json()
                if (!r.ok) {
                    toast.error(res.message)
                    setTimeout(() => {
                        navigate("/SignIn")
                    }, [700])
                }
                else {
                    let token = res.token
                    localStorage.setItem("Token",token)
                    toast.success("Congratulations! Registration Successful")
                    setTimeout(() => {
                        navigate("/")
                    }, 800);
                }
                seterror("")
            }
            else {
                seterror("CPassword is a Not Mach")
            }
        } else {
            setemailserror("Check The Email Syntax")
        }
    }

    return (
        <div>
            {/* {console.log("dateData",dateData.Name)} */}
            <ToastContainer />
            <div className="bg-blue-200  flex items-center p-5 font-serif">   {/* min-h-screen */}
                <img src="https://media.istockphoto.com/id/1093508248/photo/modern-work-table-with-computer-laptop-and-cityscapes-view-from-window-business-concepts-ideas.jpg?s=612x612&w=0&k=20&c=vpMc1UR6KfgPe4GYcFG4x1FfPKLyYsoKqrAJolfBSZs=" alt="" className='absolute w-full h-[550px] object-cover blur-md' />
                <div className="w-full relative">

                    <div className="bg-white pl-10 pr-10 pb-10 pt-2 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                        <div className='flex justify-center items-center py-0 px-2'>
                            <h1 className='text-[35px] font-serif p-3'>Registration</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Name</label>
                                <input {...register("name", {
                                    required: { value: true, message: "This Field Is Required" },
                                    minLength: { value: 5, message: "Min Length Is 5" },
                                    maxLength: { value: 15, message: "Max Length Is 15" }
                                })} type="text" id="name" placeholder="Put In Your Fullname." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                {errors.name && <div className='block mb-2 font-bold text-center text-red-500'>{errors.name.message}</div>}
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Email</label>
                                <input {...register("email", {
                                    required: { value: true, message: "This Field Is Required" },
                                    minLength: { value: 10, message: "Min Length Is 10" },
                                    maxLength: { value: 30, message: "Max Length Is 30" },
                                })} type="email" id="email" placeholder="Put In Your Email." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                {errors.email && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.email.message}</div>}
                                {emailerror && <div className='block mb-2 font-bold  text-center text-red-500'>{emailerror}</div>}
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Password</label>
                                <input {...register("password", {
                                    required: { value: true, message: "This Field Is Required" },
                                    minLength: { value: 8, message: "Min Length Is 8" },
                                    maxLength: { value: 12, message: "Max Length Is 12" }
                                })} type="password" id="password" placeholder="Put In Your Password." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                {errors.password && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.password.message}</div>}
                            </div>

                            <div className="mb-">
                                <label className="block mb-2 font-bold text-gray-600">CPassword</label>
                                <input {...register("Cpassword", {
                                    required: { value: true, message: "This Field Is Required" },
                                    minLength: { value: 6, message: "Min Length Is 6" },
                                    maxLength: { value: 10, message: "Max Length Is 10" }
                                })} type="password" id="Cpassword" placeholder="Put In Your Password." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                {errors.Cpassword && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.Cpassword.message}</div>}
                            </div>

                            <span><NavLink to="/Login" id='a' className={({ isActive }) => `${isActive} text-blue-700 text-[14px] mt-1 `}>Already Has An Account</NavLink></span>
                            
                            <button type='submit' className="block w-full bg-blue-500 text-white rounded-lg text-[22px] font-serif py-2 mt-3">Submit</button>

                            {show && <div className='block mb-2 font-bold  text-center text-red-500'>{show}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn