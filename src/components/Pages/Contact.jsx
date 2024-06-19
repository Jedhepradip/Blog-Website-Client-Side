import React from 'react'
import { useForm } from 'react-hook-form'
import { json } from 'react-router-dom'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/User/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) return console.log(response.status);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="relative bg-blue-200 flex items-center min-h-screen p-0">
        <img src="https://as2.ftcdn.net/v2/jpg/08/12/75/39/1000_F_812753919_EDfGcM93UCQIf76LYr8jO8KMQ2c3Gmlk.jpg" alt="" className='absolute w-full h-full object-cover blur-md' />

        <div className="relative w-full flex justify-center p-5 object-cover">

          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-2/5 ">
            <div class="about-section">
              <h1 class="about-title ">Contact <span>US</span></h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-600">Name</label>
                <input {...register("name", {
                  required: { value: true, message: "This Field Is Required" },
                })} type="text" id="name" placeholder="Put In Your Fullname." className="border border-gray-300 shadow p-3 w-full rounded mb-1" />
                {errors.name && <div className='block mb-2 font-bold text-center text-red-500'>{errors.name.message}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-600">Number</label>
                <input {...register("number", {
                  required: { value: true, message: "This Field Is Required" }
                })} type="text" id="number" placeholder="Put In Your Number." className="border border-gray-300 shadow p-3 w-full rounded mb-1" />
                {errors.number && <div className='block mb-2 font-bold text-center text-red-500'>{errors.number.message}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-600">Subject</label>
                <input {...register("subject", {
                  required: { value: true, message: "This Field Is Required" }
                })} type="text" id="subject" placeholder="Put In Your Subject." className="border border-gray-300 shadow p-3 w-full rounded mb-1" />
                {errors.subject && <div className='block mb-2 font-bold text-center text-red-500'>{errors.subject.message}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-600">Message</label>
                <textarea {...register("message", {
                  required: { value: true, message: "This Field Is Required" }
                })} id="message" placeholder="Put In Your Message." className="border border-gray-300 shadow p-3 w-full rounded mb-1" />
                {errors.message && <div className='block mb-2 font-bold text-center text-red-500'>{errors.message.message}</div>}
              </div>
              <button type='submit' className="block w-full bg-blue-500 text-white font-bold p-4 mt-5 rounded-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
