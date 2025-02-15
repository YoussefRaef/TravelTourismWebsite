import {React,useState,useRef,useEffect} from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'
import iphone1 from '../../assets/iphone2g1.jpeg';
import iphone2 from '../../assets/iphone2g2.jpeg';
import iphone3 from '../../assets/iphone2g3.jpeg';
import { FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DescriptionModal from './DescriptionModal';
function ProductCreation() {
  const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [Category, setCategory] = useState('Pick a Category');
    const [rating, setRating] = useState('All Ratings');
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [category,setcategory]=useState('Pick a Category');
    const pics = [iphone1, iphone2, iphone3];
    const [description, setDescription] = useState('');
   const [images, setImage] = useState(null);
   const [previews, setPreviews] = useState([]);
   const [modal, setModal] = useState(false);
   const descriptionRef = useRef(null);
   const [selectedDescription, setSelectedDescription] = useState("");
   const [products, setProducts] = useState([]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setModal(false);
      }
    }
    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);



   const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      setImage(files); // Store file objects for upload
  
      // (Optional) Generate preview URLs
      const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };
  
    const right = () => {
      setDirection(1); // Moving right
      setCurrentImage((prevIndex) => (prevIndex + 1) % pics.length);
    };
    const left = () => {
      setDirection(-1); // Moving left
      setCurrentImage((prevIndex) => (prevIndex - 1 + pics.length) % pics.length);
    }
    const allowedCategories = [
      'Clothing Items',
      'Camping',
      'Food Supplies',
      'Electronic Devices'
    ];

    const handleCreateProduct = async (e) => {
    
      // Validate category selection
      if (!allowedCategories.includes(category)) {
        alert('Please select a valid category.');
        return;
      }
    
      try {
        // Create a new FormData instance
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('category', category);
    
        // Append image files if they exist
        if (images && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
          }
        }
    
        // Send the POST request using axios
        const res = await axios.post(
          'http://localhost:3000/seller/products',
          formData,
          {
            withCredentials: true,
            headers: {
              // Note: You can omit this header and let axios set it automatically.
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        console.log(res.data, "Product Created Successfully");
        // (Optionally) update your UI state here with the returned product
      } catch (error) {
        console.error('Error creating product:', error.response?.data || error.message);
      }
    };

    useEffect(() => { 
   const handleShowProducts = async () => {
    
      try {
        const res = await axios.get(
          'http://localhost:3000/seller/products',
          {
            withCredentials: true,
          }
        );
    
        console.log(res.data, "Products Fetched Successfully");
        setProducts(res.data);  // Save the fetched products to state
        // (Optionally) update your UI state here with the returned products
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
      }
    }
    handleShowProducts();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex flex-grow flex-col '>
      <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-blue-900 text-4xl font-bold flex justify-center items-center mt-4"
        >
        Create and View  Products
        </motion.h1>
<h1 className='m-2 text-center font-semibold text-2xl'>Create New Product</h1>
<div className='flex flex-col justify-center items-center'>
  <form className='flex flex-col justify-center items-center'>
    <div className='grid md:grid-col-2 justify-center items-center'>
   <section>
     <label htmlFor='name'>Name:</label>
    <input type='text' placeholder='Enter Product Name' className='border border-blue-900 rounded-md m-2 p-2' value={name} onChange={(e)=>setName(e.target.value)} />
    <label htmlFor='quantity'>Quantity:</label>
    <input type='number' placeholder='Enter Product Quantity' className='border border-blue-900 rounded-md m-2 p-2'
    value={quantity} onChange={(e)=>setQuantity(e.target.value)}  />
      <label htmlFor='price'>Price($):</label>
    <input type='number' placeholder='Enter Product Price' className='border border-blue-900 rounded-md m-2 p-2' 
    value={price} onChange={(e)=>setPrice(e.target.value)} />
    </section>
    <section>
    <label htmlFor='description'>Description:</label>
    <input placeholder='Enter Product Description' className='border  border-blue-900 rounded-md  p-1 mx-1 text-center ' 
    value={description} onChange={(e)=>setDescription(e.target.value)} />
    <label htmlFor='image'>Image(s):</label>
    <input type='file' className='border border-blue-900 rounded-md m-2 p-2'  onChange={handleImageUpload}
 />
    <DropdownMenu className=" " name='Category'>
                <DropdownMenuTrigger className="hover:opacity-80  border border-blue-900 px-1 rounded-md my-4 mr-4 ml-1 ">
                  {category}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="hover:bg-gray-200 " onClick={()=>setcategory('Clothing Items')}>Clothing Items</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={()=>setcategory('Camping')}>Camping</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={()=>setcategory('Electronic Devices')}>Electronic Devices</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 border-t-2" onClick={() => setcategory('Food Supplies')}>Food Supplies</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
    </section>
     </div>
    <button className='bg-blue-900 text-white p-2 m-2 rounded-md hover:bg-opacity-75 duration-200' onClick={handleCreateProduct}>Create Product</button>
  </form>
</div>
{/* My Created Products */}
<div>
<h1 className='m-2 text-center font-semibold text-2xl'>My Created Products</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Single product card */}
          {products.map((product) => (
            <>
          <div className='mb-4' key={product.id}>
            <motion.div
              initial={{ x: direction === 1 ? 100 : -100 }}
              animate={{ x: 0 }}
              exit={{ x: direction === 1 ? -100 : 100 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url(${product.images[0] ? `http://localhost:3000/${product.images[0].replace(/\\/g, '/')}` : 'defaultImagePath'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="border border-blue-900 rounded-lg p-4 flex flex-col min-h-[300px]"
            >
              <h1 className="bg-gray-500/50 rounded-lg px-1 w-10 text-white flex flex-row">{product.price } $ </h1>
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
              {product.name}
            </h1>
            
            <div className="flex flex-row justify-center text-blue-900 mt-2">
        <h1>Quantity:{product.quantity}</h1>
              <button 
                className="ml-4 hover:opacity-80 flex flex-row items-center" 
              >
                Delete Product
              </button>
              <button
                    className="ml-4 hover:opacity-80 flex flex-row items-center"
                    onClick={() => {
                      setSelectedDescription("This is the first iPhone released by Apple in 2007.");
                      setModal(true);
                    }}
                    >
                View Description
              </button>
              
            </div>
            
          </div>
          <DescriptionModal
        ref={descriptionRef}
        show={modal}
        onClose={() => setModal(false)}
        description={product.description}
      />
                    </>
          )
          )  }
          {/* Add more product cards as needed */}
        
        </div>
</div>

      </main>
      <Footer />
    </div>
  )
}
export default ProductCreation