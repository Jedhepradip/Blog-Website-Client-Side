import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const navigate = useNavigate()

    const {register, handleSubmit,formState: { errors },} = useForm()

    const onSubmit = async (data) => {
        try {
            let r = await fetch("https://blog-website-server-side.onrender.com/Login/Home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            let res = await r.json()

            console.log("res Token json:", res.token);

            if (!r.ok) {
                toast.error(res.message)
                setTimeout(() => {
                    navigate("/Login")
                }, 1100);
            }
            else {
                let Token = res.token
                localStorage.setItem("Token",Token)
                toast.success("Congratulations! Login Successful")
                setTimeout(() => {
                    navigate("/")
                }, 1100);
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className="about-section">
                <h1 className="about-title">LOGIN<span></span></h1>
            </div>
            <div className=" flex items-center justify-center p-5">   {/* min-h-screen */}
                {/* md:w-3/4 mx-auto lg:w-1/3 */}
                <div className="bg-slate-50 py-5 px-5 rounded-lg mb-5 shadow md:w-[30%] w-[90%]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-1">
                            <label className="block mb-2 font-bold text-gray-600">Email</label>
                            <input {...register("email", {
                                required: { value: true, message: "This Field Is Required" },
                                minLength: { value: 10, message: "Min Length Is 10" },
                                maxLength: { value: 30, message: "Max Length Is 30" }
                            })} type="email" id="email" placeholder="Put In Your Email." className="border border-gray-300 shadow py-3 px-3 w-full rounded-lg" />
                            {errors.email && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.email.message}</div>}
                        </div>

                        <div className="mb-1">
                            <label className="block mb-2 font-bold text-gray-600">Password</label>
                            <input {...register("password", {
                                required: { value: true, message: "This Field Is Required" },
                                minLength: { value: 0, message: "Min Length Is 8" },
                            })} type="password" id="password" placeholder="Put In Your Password." className="border border-gray-300 shadow py-3 px-3 w-full rounded mb-" />
                            {errors.password && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.password.message}</div>}

                        </div>

                        <button type='submit' className="block w-full bg-blue-500 text-white rounded-lg text-[22px] font-serif py-2 mt-3">Submit</button>

                        <NavLink to="/Forgrtpassword"><button className="ml-[65px] block w-[60%]  text-blue-600 font-bold p-2 rounded-lg">Forgot Password</button></NavLink>

                        <NavLink to="/SignIn"><button type='submit' className="ml-[65px] block w-[60%] bg-green-500 text-white p-2 mt-2 rounded-lg">Create New Account</button></NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
