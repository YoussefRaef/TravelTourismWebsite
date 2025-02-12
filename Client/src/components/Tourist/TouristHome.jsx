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
function TouristHome() {
  const productImages = [products1, products2, products3];
  const activityImages = [activities1, activities2, activities3];
    const [currentImageProducts, setCurrentImageProducts] = useState(products1);
    const [currentImageActivities, setCurrentImageActivities] = useState(activities1);
  const [hoveredProducts, setHoveredProducts] = useState(false);
  const [hoveredActivities, setHoveredActivities] = useState(false);
 const navigate = useNavigate();
  useEffect(() => {
    let interval;
    if (hoveredProducts) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % productImages.length;
        setCurrentImageProducts(productImages[index]);
      }, 2000); // Change every 1 second
    } 

    return () => clearInterval(interval);
  }, [hoveredProducts]);


  useEffect(() => {
    let interval;
    if (hoveredActivities) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % activityImages.length;
        setCurrentImageActivities(activityImages[index]);
      }, 2000); // Change every 1 second
    } 

    return () => clearInterval(interval);
  }, [hoveredActivities]);
  return (
    < div className='flex flex-col'>
    <NavBar />
    <div className=''>
    <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className=' text-blue-900 text-4xl font-bold flex justify-center items-center'>Welcome to Tourista</motion.h1>
   <div className=' flex-row flex justify-center items-center'>
     <h1 className='text-blue-900 text-2xl mt-2 font-bold '>Our Services</h1><AiOutlineCustomerService className='m-2 mt-5 text-blue-900 font-bold text-2xl'/>
    </div>
    <div className=' h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
    <motion.div
            className='border border-blue-900 rounded-lg m-4 p-4 flex flex-col justify-end min-h-[300px]'
            style={{
              backgroundImage: `url(${currentImageProducts})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 2s ease-in-out' // Smooth transition
            }}
            onClick={() => navigate('/products')}
            onMouseEnter={() => setHoveredProducts(true)}
            onMouseLeave={() => setHoveredProducts(false)}
           > 
           <button className='text-3xl text-center text-white font-bold bg-gray-500/50 rounded-lg hover:text-gray-700 hover:bg-gray-500/70 duration-300'>View out Products</button>
           </motion.div>
           <motion.div
            className="border min-h-[300px] border-blue-900 rounded-lg m-4 p-4 flex flex-col justify-end"
            style={{
              backgroundImage: `url(${currentImageActivities})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 2s ease-in-out',
            }}
            onMouseEnter={() => setHoveredActivities(true)}
            onMouseLeave={() => setHoveredActivities(false)}
          >
            <button className="text-3xl text-center text-white font-bold bg-gray-500/50 rounded-lg hover:text-gray-700 hover:bg-gray-500/70 duration-300">
              Book an Activity
            </button>
          </motion.div>
    
    </div>
    </div>
    <Footer />
    </div>
  )
}

export default TouristHome