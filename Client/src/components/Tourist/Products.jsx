import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import {motion} from 'framer-motion';
import {AiOutlineClose,AiOutlineMenu,AiOutlineShoppingCart} from 'react-icons/ai'
function Products() {
  return (
    <div>
<NavBar />
<div className='h-screen'>
<motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className=' text-blue-900 text-4xl font-bold flex justify-center items-center'>Products</motion.h1>
<button className=' ml-2 mt-2 flex flex-row underline hover:opacity-60 duration-300'><AiOutlineShoppingCart className='mt-1 m-1'/><h1>View Shopping cart</h1></button>

{/* the div that has all items for a product */}
<div className='h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    <div>
<div className='border border-blue-900 rounded-lg ml-4 mr-4 mt-4 p-4 flex flex-col  min-h-[300px]'>
    </div>
    <button className='ml-4'>Add to Cart</button>
</div>
</div>


</div>

<Footer />
    </div>
  )
}

export default Products