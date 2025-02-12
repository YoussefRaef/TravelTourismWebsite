import React from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'
import { AiOutlineClose } from 'react-icons/ai'
function Notifications() {


  
  return (
    <div>
      <NavBar />
      <h1 className='text-4xl font-bold text-center mt-8 mb-3'>Notifications</h1>
      <div className='h-screen '>
          <div className=' flex flex-col  border rounded-lg bg-blue-200 border-black px-2 py-2 pb-6 m-3 mb-5 mx-4'>
            <h3 className=" text-gray-500 text-sm text-center">12:30 PM - Jan 1, 2024</h3>
            <div className='text-xl justify-between flex flex-row'>
            <h1 className='font-semibold ml-1 '>This is A NOTIFICATION</h1>
            <button><AiOutlineClose className='hover:opacity-30 duration-300 text-3xl'/></button>
            </div>
            </div>
          <div className=' flex flex-col  border rounded-lg bg-blue-200 border-black px-2 py-2 pb-6 m-3 mb-5 mx-4'>
            <h3 className=" text-gray-500 text-sm text-center">12:30 PM - Jan 1, 2024</h3>
            <div className='text-xl justify-between flex flex-row'>
            <h1 className='font-semibold ml-1 '>This is A NOTIFICATION</h1>
            <button><AiOutlineClose className='hover:opacity-30 duration-300 text-3xl'/></button>
            </div>
            </div>
          <div className=' flex flex-col  border rounded-lg bg-blue-200 border-black px-2 py-2 pb-6 m-3 mb-5 mx-4'>
            <h3 className=" text-gray-500 text-sm text-center">12:30 PM - Jan 1, 2024</h3>
            <div className='text-xl justify-between flex flex-row'>
            <h1 className='font-semibold ml-1 '>This is A NOTIFICATION</h1>
            <button><AiOutlineClose className='hover:opacity-30 duration-300 text-3xl'/></button>
            </div>
            </div>
        
      </div>
      <Footer />
    </div>
  )
}

export default Notifications