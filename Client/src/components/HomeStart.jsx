import React from 'react'
import BgHero from '../assets/bg-hero.jpg'
import About from '../assets/about.jpg'
import dest1 from '../assets/destination-1.jpg'
import dest2 from '../assets/destination-2.jpg'
import dest3 from '../assets/destination-3.jpg'
import dest4 from '../assets/destination-4.jpg'
import guy1 from '../assets/guy1.jpg'
import guy2 from '../assets/guy2.jpg'
import woman1 from '../assets/woman1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus, faCity, faUserMinus,faPlane,faBus,faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function HomeStart() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the login/signup button click
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the /login route
  };
  return (
    <>
    <div className=' w-full h-96 relative'>
        <img src={BgHero} alt='hero' className='w-full h-96  object-cover object-[50%_25%] mt-1 mb-4 ml-2  p-3' />
    <h1 className='absolute inset-0 flex items-center justify-center text-white text-5xl italic'>Explora</h1>
<button className='absolute top-4 left-4 underline text-white px-4 py-2 hover:text-gray-500 duration-300' onClick={handleLoginClick}>Sign Up/Login</button>
    </div>
    <h1 className='text-4xl mb-2 font-semibold text-center italic text-blue-800 m-5'>About Us</h1>
    <div className='grid grid-cols-2 '>
        <div>
        <img src={About} alt='about' className='w-[200px] rounded-lg md:w-[300px] lg:w-[400px] h-75 my-5 mx-5 ' />
        </div>
        <div>
        <h2 className='text-1xl md:text-3xl lg:text-4xl text-center mt-6 font-semibold'>Welcome to <span className='text-blue-800'>Explora!</span></h2>
        <p className='text-center md:text-xl mt-4'>     Discover the ultimate travel companion with Explora! Plan your dream vacation effortlessly with our seamless booking platform for activities, itineraries, flights, and accommodations. Whether you're seeking adventure, relaxation, or cultural exploration, we've got you covered. Your journey begins here!
        </p>
        <ul className='md:text-xl mt-4'>
            <li className='border-b border-b-gray-300'> <FontAwesomeIcon icon={faCheck} className="icon text-green-400" /> 24/7 Service</li>
            <li className='border-b border-b-gray-300'><FontAwesomeIcon icon={faCheck} className="icon text-green-400" /> 5 Star Hotels </li>
            <li className='border-b border-b-gray-300'><FontAwesomeIcon icon={faCheck} className="icon text-green-400" /> 1000+ Airlines with Deals </li>
            <li ><FontAwesomeIcon icon={faCheck} className="icon text-green-400" />Flexible and Varied Transportation</li>
        </ul>
        </div>
    </div>
    <h1 className='text-4xl font-semibold text-center italic text-blue-800 my-3 mb-5'>Our Services</h1>
    <div className='grid grid-cols-3  gap-4 m-2 md:m-4 md:gap-6 lg:gap-38  lg:m-24'>
     <div className='shadow-lg   rounded-md bg-blue-200  text-center py-3 flex flex-col'><FontAwesomeIcon icon={faCity} className="icon text-5xl py-2" />Hotel Booking</div>
     <div className='shadow-lg  rounded-md bg-blue-200 text-center py-3 flex flex-col'> <FontAwesomeIcon icon={faPlane} className="icon text-5xl py-2" />Flight Booking</div>
     <div className=' shadow-lg rounded-md bg-blue-200 text-center py-3 flex flex-col'><FontAwesomeIcon icon={faBus} className="icon text-5xl py-2" />Transportation Booking</div>
     <div className=' shadow-lg rounded-md bg-blue-200 text-center py-3 flex flex-col'><FontAwesomeIcon icon={faUserPlus} className="icon text-5xl py-2" />Activity Booking</div>
     <div className='shadow-lg  rounded-md bg-blue-200 text-center py-3 flex flex-col'><FontAwesomeIcon icon={faUserMinus} className="icon text-5xl py-2" />All Cancellations</div>
     <div className=' shadow-lg rounded-md bg-blue-200 text-center py-3 flex flex-col'><FontAwesomeIcon icon={faBirthdayCake} className="icon text-5xl py-2" />Birthday Promocodes</div>
  </div>
  <h1 className='text-4xl font-semibold text-center italic text-blue-800 my-3 mb-5'>Popular Destinations</h1>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 m-2 md:m-4 lg:m-4">
  <div className="relative overflow-hidden w-[200px] h-[200px] sm:w-[250px]  sm:h-[250px] rounded-lg md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] mx-5 my-5 group">
    <img
      src={dest1}
      alt="dest1"
      className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
    />
    <p className='absolute rounded-lg bottom-0 text-center bg-gray-800 bg-opacity-60 text-white p-2 m-2 font-semibold'>Thailand</p>

  </div>
  <div className="relative overflow-hidden w-[200px] h-[200px] sm:w-[250px]  sm:h-[250px] rounded-lg md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] mx-5 my-5 group">
    <img
      src={dest2}
      alt="dest2"
      className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
    />
        <p className='absolute rounded-lg bottom-0 text-center bg-gray-800 bg-opacity-60 text-white p-2 m-2 font-semibold'>Indonesia</p>

  </div>
  <div className="relative overflow-hidden w-[200px] h-[200px] sm:w-[250px]  sm:h-[250px] rounded-lg md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] mx-5 my-5 group">
    <img
      src={dest3}
      alt="dest3"
      className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
    />
        <p className='absolute rounded-lg bottom-0 text-center bg-gray-800 bg-opacity-60 text-white p-2 m-2 font-semibold'>Malaysia</p>

  </div>
  <div className="relative overflow-hidden w-[200px] h-[200px] sm:w-[250px]  sm:h-[250px] rounded-lg md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] mx-5 my-5 group">
    <img
      src={dest4}
      alt="dest4"
      className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
    />
        <p className='absolute rounded-lg bottom-0 text-center bg-gray-800 bg-opacity-60 text-white p-2 m-2 font-semibold'>Australia</p>

  </div>
</div>
<h1 className='text-4xl font-semibold text-center italic text-blue-800 my-3 mb-5'>What our Users Say about Us!</h1>

<div className='grid grid-cols-3 gap-4 m-2 md:m-4 lg:m-5'>
<div  className='border rounded-md p-4 border-gray-300 bg-blue-200'><div>
  <img src={guy1} alt='guy1' className='w-[100px] rounded-full mx-auto' />
  </div>
  <h1 className='text-center py-2 font-semibold'>John Doe</h1>
<p>Amazing website with great activities offered for users, but bad experoence in thailand.
  #ladyboyseverywhere</p>
  </div>
<div className='border rounded-md p-4 border-gray-300 bg-blue-200'><div>
<img src={guy2} alt='guy2' className='w-[100px] h-[100px] rounded-full mx-auto' />
  </div>
  <h1 className='text-center py-2 font-semibold'>Adam Ligma</h1>
<p>I'm never using this website again.</p>
  </div>

<div className='border rounded-md p-4 border-gray-300 bg-blue-200'><div>
<img src={woman1} alt='woman1' className='w-[100px] h-[100px] rounded-full mx-auto' />
  </div> 
   <h1 className='text-center py-2 font-semibold'>Joanna Doe</h1>
<p>This is the best website ever with the best deals and the best user experience!</p>
  </div>

</div>

<div className='bg-blue-800 mx-2 my-6 py-2'>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <div className='flex flex-col text-white  text-center text-xl'>Company
    <p className='  text-sm p-1'>Explora</p>
    <p className='text-sm p-1'>www.Explora.com</p>
    <p className='text-sm p-1'>blalbla</p>
    </div>
    <div className='text-white text-center p-2 text-xl'>Contact 
    <p className='  text-sm p-1'>explora@explora.com</p>
    <p className='text-sm p-1'>123 Street, New York, USA</p>
    <p className='text-sm p-1'>+20 128986389</p>
    </div>
    <div className='text-white text-center p-2 text-xl'><span>Newsletter</span>
   <p className='text-sm w-full'>Subscribe to our Newsletter</p>
   <input type='email' placeholder='Enter your email' className='p-1 w-full m-1 rounded-md bg-blue-600 text-center' />
    <button className='bg-blue-950 text-white p-1 m-1 w-full hover:bg-blue-600 rounded-md'>Subscribe</button>
    </div>
  </div>



  <div className='border-t border-t-gray-400  text-white text-center text-sm p-2'>
  © Explora, All Rights Reserved. Designed by team Explora
  </div>
</div>

  </>
  )
}

export default HomeStart