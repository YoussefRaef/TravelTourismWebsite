import React from 'react'

function Footer() {
  return (
    <div className=' bottom-0 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full bg-blue-900 text-white items-center justify-center p-4'>
<div className='flex flex-col w-full text-center '><h1 className='text-xl font-bold'>Company</h1>
<ul>
<li>About Us</li>
<li>Our Team</li>
<li>Careers</li>
</ul>
</div>
<div className='flex flex-col w-full text-center'><h1 className='text-xl font-bold'>Contact Us</h1>
<ul>
<li>Tourista@Tourista.com</li>
<li>Youssef Morgan</li>
<li>+20 12345678</li>
</ul>
</div>
<div className='flex flex-col w-full text-center'><h1 className='text-xl font-bold'>Newsletter</h1>
<input type='email' placeholder='Enter your email' className='p-1 w-full m-1 rounded-md bg-blue-600 text-center' />
<button className='bg-blue-950 text-white p-1 m-1 w-full hover:bg-blue-600 rounded-md'>Subscribe</button>
</div>
</div>  

)

}

export default Footer