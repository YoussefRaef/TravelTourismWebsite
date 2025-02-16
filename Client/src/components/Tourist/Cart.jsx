import {React,useState,useEffect,useRef} from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'
import Iphone from '../../assets/iphone2g1.jpeg'
import { motion } from 'framer-motion'
import CartModal from './CartModal'
function Cart() {
   const modalRef = useRef()
   const [showModal, setShowModal] = useState(false)
   useEffect(() => { 
    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false)
        }
        }
     if (showModal) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showModal]);   

  return (
    <div className='flex flex-col min-h-screen'>
        <NavBar />
        <div className="flex-grow">
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-blue-900 text-4xl font-bold flex justify-center items-center mt-4"
        >
          Shopping Cart
        </motion.h1>

        <div className='flex flex-col border border-blue-200 rounded-md m-3 p-3'>
            <div className='flex flex-row justify-between border-t p-1 my-3 items-center'>
                <img src={Iphone} alt='Product' className='w-24 h-24'/>
                <h1 className='text-blue-900 font-bold  '>Product Name</h1>
                <h1 className='text-blue-900 font-bold  '>Price</h1>
                <h1 className='text-blue-900 font-bold  '>Quantity</h1>
                <h1 className='text-blue-900 font-bold '>Total</h1>
            </div>
           
            <div className='flex flex-row justify-between border-t-2 border-black mt-3'>     
                <h1 className='text-blue-900 font-bold'>Total</h1>
                <h1 className='text-blue-900 font-bold'>$4200</h1>
              </div>
        </div>
        <button className='bg-blue-900 text-white w-1/4 mx-auto p-2 rounded-md my-4 flex text-center justify-center hover:opacity-75 duration-300' 
        onClick={()=>setShowModal(true)}>Buy Products</button>

          <CartModal ref={modalRef}
          show={showModal}
          onClose={()=>setShowModal(false)}/>
            </div>
        <Footer />
    </div>
  )
}

export default Cart