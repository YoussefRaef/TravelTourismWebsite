import React , {forwardRef} from 'react'

const  CartModal = forwardRef(({show,onClose},ref) =>  {
    if(!show) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div ref={ref} className='bg-white p-6 rounded-lg shadow-lg  relative'>
            <button className='absolute top-2 right-2 text-gray-500 hover:text-gray-800' onClick={onClose}>
            ✖
            </button>
            <div className='flex flex-col'>

            <div className='flex flex-row justify-between items-center'>
            <button className='text-md font-semibold mb-4 pr-6 hover:text-gray-500'>Pay by Wallet</button>
            <button className='text-md font-semibold mb-4 px-6 hover:text-gray-500'>Pay by Credit Card</button>
            <button className='text-md font-semibold mb-4 pl-6 pr-8 hover:text-gray-500'>Pay by COD </button>
                </div>
                <input type='text' placeholder='Enter promocode before payment.' className='border border-blue-200 rounded-md text-center py-2 my-2'/>
            </div>
        </div>
    </div>
  )
})

export default CartModal