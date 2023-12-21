'use client';
import { useForm } from "react-hook-form";
import sendEmail from "@/utils/api/sendEmail";

export default function Contact() {
  const { register, handleSubmit, } = useForm();

  function onSubmit(data) {
    sendEmail(data)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='mb-2 block font-medium text-black'
          >
            Full Name
            <span className="text-sm font-normal text-gray-500"> (required)</span>
          </label>
          <input
            type='text'
            placeholder='Full Name'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('name', { required: true })}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='mb-2 block text-base font-medium text-black'
          >
            Email Address
            <span className="text-sm font-normal text-gray-500"> (required)</span>
          </label>
          <input
            type='email'
            placeholder='example@domain.com'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('email', { required: true })}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='subject'
            className='mb-2 block font-medium text-black'
          >
            Subject
          </label>
          <input
            type='text'
            placeholder='Subject'
            className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('subject')}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='message'
            className='mb-2 block text-base font-medium text-black'
          >
            Message
            <span className="text-sm font-normal text-gray-500"> (required)</span>
          </label>
          <textarea
            rows={4}
            placeholder='Type your message'
            className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
            {...register('message', { required: true })}
          ></textarea>
        </div>
        <div>
          <button type="submit" className='hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}