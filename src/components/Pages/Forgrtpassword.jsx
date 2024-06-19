import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Forgrtpassword = () => {
    const [show, setShow] = useState(false); // Fix 2
    const [UserId , setUserid] = useState()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const showandhide = () => { // Fix 1
        setShow(prevState => !prevState);
    };

    const onSubmit = async (data) => {
        console.log("Forgrtpassword :", data);
        const response = await fetch("http://localhost:3000/Forgrtpassword/Email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const response_Data = await response.json();
        // console.log("response_Data UserId",response_Data.UserId);
        setUserid(response_Data.UserId)
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response_Data.message,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } else { // Moved the logic inside else
            Swal.fire({
                title: `${response_Data.message}`,
                text: "You clicked the button!",
                icon: "success"
            });
            showandhide(); // Fix 1
        }
    };

    const onSubmitOTP = async (data) => {
        console.log(data);
        try {
            const response = await fetch("http://localhost:3000/Forgrtpassword/OTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            
            const responseOTP = await response.json();
            console.log("responseOTP :", responseOTP);
            
            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${responseOTP.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            } else {
                Swal.fire({
                    title: `${responseOTP.message}`,
                    text: "You clicked the button!",
                    icon: "success"
                });
                navigate(`/Password_to_forget/${UserId}`)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };    

    return (
        <div>
            <div className="bg-blue-200 flex items-center p-5 mb-16 w-"> {/* min-h-screen */}
                <img src="https://media.istockphoto.com/id/537706522/photo/overhead-image-of-a-female-blogger-writing-on-the-laptop.jpg?s=612x612&w=0&k=20&c=DLQWu1ss06K9oEeW6R1tIpGMn58ZlgFyj_wrOWKRFn0=" alt="" className='absolute w-full h-[480px] object-cover blur-md' />
                <div className="w-full relative">
                    {/* <h2 className="text-center text-black-600 font-bold text-2xl uppercase mb-5">Forgrt password</h2> */}
                    <div className="about-section">
                            <h1 className="about-title">SEND <span>OPT</span></h1>
                        </div>
                    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5"> {/* Fix 3 */}
                                <label className="block mb-2 font-bold text-gray-600">Email</label>
                                <input {...register("email")} type="email" id="email" placeholder="Put In Your Email." className="border border-gray-300 shadow p-3 w-full rounded mb-5" /> {/* Fix 3 */}
                            </div>
                            <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg" >Send OPT</button>
                        </form>

                        {show && (
                            <form onSubmit={handleSubmit(onSubmitOTP)}>
                                <div className="mb-5 mt-5"> {/* Fix 3 */}
                                    <label className="block mb-2 font-bold text-gray-600">OTP</label>
                                    <input
                                        {...register("otp", { required: "OTP is required" })}
                                        type="text"
                                        id="otp"
                                        placeholder="Put In Your OTP."
                                        className="border border-gray-300 shadow p-3 w-full rounded mb-5" /> {/* Fix 3 */}
                                    {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
                                </div>
                                <button type="submit" className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">
                                    Verify
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgrtpassword;


