import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
// import "./Password.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordToForget = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { password, Cpassword, email } = data;
        console.log(data);

        if (password === Cpassword) {
            try {
                const response = await fetch(`https://blog-website-server-side.onrender.com/CreatePassword/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password, email }),
                });

                const responsePass = await response.json();
                if (!response.ok) {
                    toast.error(responsePass.message)
                }
                if (response.ok) {
                    toast.success(responsePass.message)
                    console.log("responsePass", responsePass);
                    setTimeout(() => {
                        navigate("/Login");
                    }, [1200])
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error(error)
            }
        } else {
            toast.error("The passwords do not match. Please try again.")
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center p-5 font-serif">
                <ToastContainer />
                {/* <img src="https://media.istockphoto.com/id/537706522/photo/overhead-image-of-a-female-blogger-writing-on-the-laptop.jpg?s=612x612&w=0&k=20&c=DLQWu1ss06K9oEeW6R1tIpGMn58ZlgFyj_wrOWKRFn0=" alt="" className='absolute w-full h-[480px] object-cover blur-md' /> */}
                <div className="w-full relative">
                    <div className="about-section">
                        <h1 className="about-title">Create New<span className='ml-5'>Password...</span></h1>
                    </div>
                    <div className="bg-whie bg-slate-50 p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3 font-serif">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-1"> {/* Fix 3 */}
                                <label className="block mb-2 font-bold text-gray-600">Email</label>
                                <input {...register("email")} type="email" id="email" placeholder="Put In Your Email." className="border border-gray-300 shadow px-3 py-3 w-full rounded mb-1" /> {/* Fix 3 */}
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">New Password</label>
                                <input
                                    {...register("password", { required: "Password is required" })}
                                    type="password"
                                    id="password"
                                    placeholder="Put In Your New Password."
                                    className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow py-3 px-3 w-full rounded mb-1`}
                                />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="mb-1">
                                <label className="block mb-2 font-bold text-gray-600">Confirm New Password</label>
                                <input
                                    {...register("Cpassword", { required: "Please confirm your password" })}
                                    type="password"
                                    id="Cpassword"
                                    placeholder="Put In Your Confirm Password."
                                    className={`border ${errors.Cpassword ? 'border-red-500' : 'border-gray-300'} shadow py-3 px-3 w-full rounded mb-1`}
                                />
                                {errors.Cpassword && <p className="text-red-500">{errors.Cpassword.message}</p>}
                            </div>
                            <button type='submit' className="block w-full bg-blue-500 text-white text-[20px] mt-3 py-2 px-3 font-serif rounded-lg">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordToForget;