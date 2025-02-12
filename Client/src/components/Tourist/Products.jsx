import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import iphone1 from '../../assets/iphone2g1.jpeg';
import iphone2 from '../../assets/iphone2g2.jpeg';
import iphone3 from '../../assets/iphone2g3.jpeg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

function Products() {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const images = [iphone1, iphone2, iphone3];
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [Category, setCategory] = useState('All Products');
  const [rating, setRating] = useState('All Ratings');
  const [Price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const right = () => {
    setDirection(1); // Moving right
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const left = () => {
    setDirection(-1); // Moving left
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    // This div ensures the page takes at least full viewport height and uses flex layout.
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      {/* Main content area grows to push the footer to the bottom */}
      <main className="flex-grow">
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-blue-900 text-4xl font-bold flex justify-center items-center mt-4"
        >
          Products
        </motion.h1>
        {/*header section */}
        <button className="mx-4 mt-2 flex flex-row underline hover:opacity-60 duration-300">
          <AiOutlineShoppingCart className="mt-1 m-1" />
          <h1>View Shopping Cart</h1>
        </button>
        <div className='flex flex-row justify-center items-center'>
        <label htmlFor="Name">Name:</label>
  <input
    type="text"
    id="Name"
    name="Name"
    className="border border-blue-900 px-1 py-1 rounded-md my-4 ml-1 sm:max-w-16 md:max-w-32 lg:max-w-48 mr-4"
    placeholder="Enter name"
    onChange={(e) => setName(e.target.value)}
  />
        <label htmlFor='Category'>Category :</label>
        <DropdownMenu className=" " name='Category'>
                <DropdownMenuTrigger className="hover:opacity-80  border border-blue-900 px-1 rounded-md my-4 mr-4 ml-1 ">
                  {Category}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="hover:bg-gray-200 " onClick={() => setCategory("Clothing Items")}>Clothing Items</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setCategory('Camping')}>Camping</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setCategory('Electronic Devices')}>Electronic Devices</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setCategory('Food Supplies')}>Food Supplies</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setCategory('All Categories')}>All Categories</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

      <label htmlFor='Rating'>Rating :</label>
        <DropdownMenu className=" " name='Rating'>
                <DropdownMenuTrigger className="hover:opacity-80  border border-blue-900 px-1 rounded-md my-4 mr-4 ml-1 ">
                  {rating}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="hover:bg-gray-200 " onClick={() => setRating(0)}>Better than 0 Stars</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setRating(1)}>Better than 1 Star</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setRating(2)}>Better than 2 Stars</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setRating(3)}>Better than 3 Stars</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setRating(4)}>Better than 4 Stars</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <label htmlFor="Price">Price:</label>
  <input
    type="number"
    id="Price"
    name="Price"
    className="border border-blue-900 px-1 py-1 rounded-md my-4 ml-1 sm:max-w-16 md:max-w-32 lg:max-w-48"
    placeholder="Enter price"
    min="0"
    onChange={(e) => setPrice(e.target.value)}
  />
        </div>
        {/*header section */}
        {/* Remove fixed height (h-screen) here so the grid expands with content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Single product card */}
          <div className='mb-4'>
            <motion.div
              key={currentImage} // Forces animation when the image changes
              initial={{ x: direction === 1 ? 100 : -100 }}
              animate={{ x: 0 }}
              exit={{ x: direction === 1 ? -100 : 100 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="border border-blue-900 rounded-lg p-4 flex flex-col min-h-[300px]"
            >
              <h1 className="bg-gray-500/50 rounded-lg px-1 w-10 text-white">90 $</h1>
              <div className="flex flex-row justify-between items-center min-h-[250px]">
                <button className="hover:opacity-80" onClick={left}>
                  <FaArrowLeft />
                </button>
                <button className="hover:opacity-80" onClick={right}>
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
            
            <h1 className="text-blue-900 text-3xl font-semibold flex justify-center items-center mt-2">
              iPhone 2G
            </h1>
            
            <div className="flex flex-row justify-center text-blue-900 mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:opacity-80">
                  Quantity
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="border-b hover:bg-gray-200">1</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200" onClick={() => setQuantity(2)}>2</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200" onClick={() => setQuantity(3)}>3</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200" onClick={() => setQuantity(4)}>4</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200" onClick={() => setQuantity(5)}>5</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <button 
                className="ml-4 hover:opacity-80 flex flex-row items-center" 
                onClick={() => setAdded(!added)}
              >
                <h1>
                  {!added ? "Add to Cart" : `${quantity} Items Added to Cart`}
                </h1>
                <AiOutlineShoppingCart className="mt-1 ml-1" />
              </button>
              
              <button 
                className="ml-4 hover:opacity-80 flex flex-row items-center" 
                onClick={() => setLiked(!liked)}
              >
                {liked ? <AiOutlineHeart className="mt-1 ml-1" /> : <FaHeart className="mt-1 text-red-600 ml-1" />}
              </button>
            </div>
          </div>
          {/* Add more product cards as needed */}
        </div>
      </main>
      
      {/* Footer appears after all content */}
      <Footer />
    </div>
  );
}

export default Products;
