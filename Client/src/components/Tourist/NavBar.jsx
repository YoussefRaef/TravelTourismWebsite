import React,{useState,useRef,useEffect} from 'react'
import {AiOutlineClose,AiOutlineMenu,AiOutlineShoppingCart} from 'react-icons/ai'
import Tourista from '../../assets/tourista.png'
import {motion} from 'framer-motion';
import Promocode from './Promocode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NavBar() {
 const navigate = useNavigate();
 const [open,setOpen] = useState(false)  
 const navRef = useRef(null)
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
useEffect(() => {
    function handleClickOutside(event) {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setOpen(false);
        }
    }

    if (open) {
        document.addEventListener("mousedown", handleClickOutside);
    } else {
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [open]);
  return (
    <div className='bg-blue-900 flex justify-between items-center h-30 w-full mx-auto px-8 text-white overflow-hidden'>
   <img src={Tourista} alt='Tourista' className='w-24 scale-150'/>
   <ul className='hidden md:flex text-white'>
   <li className='p-4'><button className='hover:text-gray-400' onClick={()=> navigate('/promocode')}>Promocode</button></li>
   <li className='p-4'><button className='hover:text-gray-400'onClick={()=> navigate('/notifications')}>Notifications</button></li>
        <li className='p-4'><button className='hover:text-gray-400'onClick={()=> navigate('/flights')}>Flights</button></li>
        <li className='p-4 '><button className='hover:text-gray-400 flex flex-row'onClick={()=> navigate('/cart')} ><AiOutlineShoppingCart className='text-xl'/>Cart</button></li>
        <li className='p-4'><button className='hover:text-gray-400'onClick={()=> navigate('/activities')}>Events</button></li>
        <li className='p-4'><button className='hover:text-gray-400'onClick={()=> navigate('/profile')}>Profile</button></li>
        <li className='p-4'><button className='hover:text-gray-400'onClick={()=> navigate('/tourist')}>Home</button></li>
        <li className='p-4'><button className='hover:text-gray-400' onClick={handleLogout}>Logout</button></li>
   </ul>

    <div className='md:hidden' ref={navRef}>
     <button onClick={handleOpen}>{open ? <AiOutlineClose className='text-2xl'/> : <AiOutlineMenu className='text-2xl'/>}</button>
    <motion.div className={open ? 'fixed left-0 top-0 w-[50%] border-r h-full border-r-gray-900 bg-blue-900' : 'fixed left-[-100%] '}
    initial={{x:-300}}
    animate={{x:0}}
    transition={{duration:0.5}}
    >
        <img src={Tourista} alt='Tourista' className='w-24 scale-150 mx-auto'/>
        <ul className='uppercase p-3'>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'  onClick={handleLogout}><button>Logout</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400' onClick={()=> navigate('/tourist')}><button>Home</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400' onClick={()=> navigate('/profile')}><button>Profile</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'onClick={()=> navigate('/activities')}><button>Events</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'onClick={()=> navigate('/cart')}><button className='flex flex-row'><AiOutlineShoppingCart className='text-xl'/>Cart</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'onClick={()=> navigate('/flights')}><button>Flights</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'onClick={()=> navigate('/promocode')}><button>Hotels</button></li>
        <li className='p-4 border-b border-b-gray-700 hover:text-gray-400'onClick={()=> navigate('/promocode')}><button>Promocodes</button></li>
        <li className='p-4 hover:text-gray-400'><button>Notifications</button></li>
        </ul>
    </motion.div>
    
    </div>
    
    
    </div>
  )
}

export default NavBar