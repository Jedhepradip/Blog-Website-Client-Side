import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { NavLink, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const [data, setData] = useState({})
    const navigator = useNavigate()
    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("Token")
                const response = await axios.get(`http://localhost:3000/EditProfileUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.AdityaUser);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (formData) => {
        try {
            const token = localStorage.getItem("Token");

            const response = await fetch("http://localhost:3000/UpdateProfile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Response Edit Profile:", data);

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error: ${data.message || response.statusText}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                navigator("/EditProfile");
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Profile updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigator("/Profile");
            }
            console.log("EditProfile response:", response);
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while updating the profile.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return (
        <div className="bg-blue-200 flex items-center p-5">
            <div className="w-full relative">
                <h1 className="text-3xl font-bold text-center text-gray-800 my-4">Edit Profile</h1>
                <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                name='name'
                                defaultValue={data.Name}
                                placeholder="Put In Your Fullname."
                                className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                                {...register('Name')}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                defaultValue={data.Email}
                                placeholder="Put In Your Email."
                                className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                                {...register('Email')}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 font-bold text-gray-600">Create a New Password</label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                placeholder="Create a New Password"
                                className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                                {...register('Password')}
                            />
                        </div>

                        <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">Submit</button>
                        <NavLink to="/Profile"><span className='text-blue-800 ml-[110px]'>Back to Profile</span></NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;
