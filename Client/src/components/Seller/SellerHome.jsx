import {React,useState,useEffect} from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'
import {motion} from 'framer-motion';
import products1 from '../../assets/products1.jpg'
import products2 from '../../assets/products2.jpeg'
import products3 from '../../assets/products3.jpeg'
import activities1 from '../../assets/activities1.jpeg'
import activities2 from '../../assets/activities2.jpeg'
import activities3 from '../../assets/activities3.jpeg'
import { AiOutlineCustomerService } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function SellerHome() {
  return (
<>
<NavBar />
<div className='h-screen flex flex-col  '>
<motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className=' text-blue-900 text-4xl font-bold flex justify-center items-center'>Seller Home</motion.h1>
</div>
<Footer />
</>  )
}

export default SellerHome