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
      <div className="relative flex items-center min-h-screen">
        <div className="relative w-full flex p-7 justify-center items-center object-cover">
          <div className="bg-neutral-200 py-5 px-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-2/5">
            <div class="about-section"><h1 class="about-title">Contact <span>US</span></h1></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label className="block mb-1 font-bold text-gray-600 text-[18px] font-serif">Name</label>
                <input {...register("name", {
                  required: { value: true, message: "This Field Is Required" },
                })} type="text" id="name" placeholder="Put In Your Fullname." className="border border-gray-300 shadow md:py-[11px] py-3 px-2 w-full rounded" />
                {errors.name && <div className='block font-bold text-center text-red-500'>{errors.name.message}</div>}
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-bold text-gray-600 text-[18px] font-serif">Number</label>
                <input {...register("number", {
                  required: { value: true, message: "This Field Is Required" }
                })} type="text" id="number" placeholder="Put In Your Number." className="border border-gray-300 shadow md:py-[11px] py-3 px-2 w-full rounded " />
                {errors.number && <div className='block font-bold text-center text-red-500'>{errors.number.message}</div>}
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-bold text-gray-600 text-[18px] font-serif">Subject</label>
                <input {...register("subject", {
                  required: { value: true, message: "This Field Is Required" }
                })} type="text" id="subject" placeholder="Put In Your Subject." className="border border-gray-300 shadow md:py-[11px] py-3 px-2 w-full rounded" />
                {errors.subject && <div className='block font-bold text-center text-red-500'>{errors.subject.message}</div>}
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-bold text-gray-600 text-[18px] font-serif">Message</label>
                <textarea {...register("message", {
                  required: { value: true, message: "This Field Is Required" }
                })} id="message" placeholder="Put In Your Message." className="border border-gray-300 shadow 
                md:py-[11px] py-3 px-2 w-full rounded" />
                {errors.message && <div className='block font-bold text-center text-red-500'>{errors.message.message}</div>}
              </div>
              <button type='submit' className="block bg-blue-500 text-white font-serif text-[23px]  rounded-lg md:py-[5px] py-3 px-2 w-full">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
