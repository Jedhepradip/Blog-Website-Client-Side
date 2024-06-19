import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        let r = await fetch("http://localhost:3000/Login/Home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        let res = await r.json()

        console.log("res Token json:", res.token);

        if (!r.ok) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Credentials To Check The Email And Password",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            navigate("/Login")
            console.log(res);
        }
        else {
            const refreshPage = () => {
                window.location.reload();
            };
            navigate("/")

            localStorage.setItem("Token", res.token)
            Swal.fire({
                position: 'center', // Use 'center' instead of 'top-center'
                icon: 'success',
                title: 'Congratulations! Login Successful',
                showConfirmButton: false,
                timer: 1500
            });
            refreshPage();
            console.log(res);
        }


    }
    return (
        <div>
            <div className="bg-blue-200 flex items-center p-5">   {/* min-h-screen */}
                <img src="https://media.istockphoto.com/id/537706522/photo/overhead-image-of-a-female-blogger-writing-on-the-laptop.jpg?s=612x612&w=0&k=20&c=DLQWu1ss06K9oEeW6R1tIpGMn58ZlgFyj_wrOWKRFn0=" alt="" className='absolute w-full h-[480px] object-cover blur-md' />
                <div className="w-full relative">
                    {/* <h2 className="text-center text-black-600 font-bold text-2xl uppercase mb-5">Login</h2>
                     */}
                       <div className="about-section">
                            <h1 className="about-title">LOGIN<span></span></h1>
                        </div>
                    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Email</label>
                                <input {...register("email", {
                                    required: { value: true, message: "This Field Is Required" },
                                    minLength: { value: 10, message: "Min Length Is 10" },
                                    maxLength: { value: 30, message: "Max Length Is 30" }
                                })} type="email" id="email" placeholder="Put In Your Email." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                {errors.email && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.email.message}</div>}
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Password</label>
                                <input {...register("password", {
                                    required: { value: true, message: "This Field Is Required" },
                                    minLength: { value: 0, message: "Min Length Is 8" },
                                })} type="password" id="password" placeholder="Put In Your Password." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                {errors.password && <div className='block mb-2 font-bold  text-center text-red-500'>{errors.password.message}</div>}

                            </div>

                            <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">Submit</button>

                            <NavLink to="/Forgrtpassword"><button className="ml-[65px] block w-[60%]  text-blue-600 font-bold p-2 rounded-lg">Forgot Password</button></NavLink>

                            <NavLink to="/SignIn"><button type='submit' className="ml-[65px] block w-[60%] bg-green-500 text-white font-bold p-2 mt-5 rounded-lg">Create New Account</button></NavLink>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
