import {React,useState,useEffect} from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import {motion} from 'framer-motion';
import products1 from '../../assets/products1.jpg'
import products2 from '../../assets/products2.jpeg'
import products3 from '../../assets/products3.jpeg'
function TouristHome() {
  const images = [products1, products2, products3];
  const [currentImage, setCurrentImage] = useState(products1);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (hovered) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % images.length;
        setCurrentImage(images[index]);
      }, 1000); // Change every 1 second
    } else {
      setCurrentImage(products1); // Reset when hover stops
    }

    return () => clearInterval(interval);
  }, [hovered]);
  return (
    < div className='flex flex-col'>
    <NavBar />
    <div className=''>
    <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className=' text-blue-900 text-4xl font-bold flex justify-center items-center'>Welcome to Tourista</motion.h1>
    <div className=' h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    <motion.div
            className='border border-blue-900 rounded-lg m-4 p-4'
            style={{
              backgroundImage: `url(${currentImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 1s ease-in-out' // Smooth transition
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          
    </div>
    </div>
    <Footer />
    </div>
  )
}

export default TouristHome