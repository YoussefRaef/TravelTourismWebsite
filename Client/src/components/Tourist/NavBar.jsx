import React,{useState} from 'react'
import {AiOutlineClose,AiOutlineMenu,AiOutlineShoppingCart} from 'react-icons/ai'
import Tourista from '../../assets/tourista.png'
import {motion} from 'framer-motion';
import axios from 'axios';
function NavBar() {
const [open,setOpen] = useState(false)  
const handleOpen = () => {  
    setOpen(!open)
}
const handleLogout = async () => {
    try {
        console.log("Attempting to log out...");

        const response = await axios.get('http://localhost:3000/user/logout', { 
            withCredentials: true // Ensure cookies are sent with the request
        });

        console.log('Logout response:', response);
        window.location.replace('/login'); // Redirect to login page
    } catch (error) {
        console.error('Logout failed', error);
        alert("Logout failed: " + error.message); // Show a user-friendly message
    }
};

  return (
    <div className='bg-blue-900 flex justify-between items-center h-30 w-full mx-auto px-8 text-white overflow-hidden'>
   <img src={Tourista} alt='Tourista' className='w-24 scale-150'/>
   <ul className='hidden md:flex text-white'>
   <li className='p-4'><button className='hover:text-gray-400'>Notifications</button></li>
   <li className='p-4'><button className='hover:text-gray-400'>Hotels</button></li>
        <li className='p-4'><button className='hover:text-gray-400'>Flights</button></li>
        <li className='p-4 '><button className='hover:text-gray-400 flex flex-row' ><AiOutlineShoppingCart className='text-xl'/>Cart</button></li>
        <li className='p-4'><button className='hover:text-gray-400'>Events</button></li>
        <li className='p-4'><button className='hover:text-gray-400'>Profile</button></li>
        <li className='p-4'><button className='hover:text-gray-400' onClick={handleLogout}>Logout</button></li>
   </ul>
    <div className='md:hidden'>
     <button onClick={handleOpen}>{open ? <AiOutlineClose className='text-2xl'/> : <AiOutlineMenu className='text-2xl'/>}</button>
    <motion.div className={open ? 'fixed left-0 top-0 w-[50%] border-r h-full border-r-gray-900 bg-blue-900' : 'fixed left-[-100%] '}
    initial={{x:-300}}
    animate={{x:0}}
    transition={{duration:0.5}}
    >
        <img src={Tourista} alt='Tourista' className='w-24 scale-150 mx-auto'/>
        <ul className='uppercase p-3'>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'  onClick={handleLogout}><button>Logout</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'><button>Profile</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'><button>Events</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'><button className='flex flex-row'><AiOutlineShoppingCart className='text-xl'/>Cart</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'><button>Flights</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'><button>Hotels</button></li>
        <li className='p-4 hover:text-gray-400'><button>Notifications</button></li>
        </ul>
    </motion.div>
    
    </div>
    
    
    </div>
  )
}

export default NavBar