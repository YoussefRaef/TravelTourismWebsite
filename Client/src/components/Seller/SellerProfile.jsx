import {React,useState,useEffect} from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'
function SellerProfile() {
      const [Username, setUsername] = useState('');
      const [Email, setEmail] = useState('');
      const [Phone, setPhone] = useState('');
      const [Country, setCountry] = useState('');
      const [Occupation, setOccupation] = useState('');
      const [DateOfBirth, setDateOfBirth] = useState('');
      const [Wallet, setWallet] = useState('');
    
      const [userId, setUserId] = useState('');
  return (
<>
<NavBar />
<h1 className='text-4xl font-bold text-center mt-8'>Profile</h1>
<div className='flex flex-col  mx-8  justify-between h-screen border-t'>
        <ul className='flex flex-col'>
          <li className='py-4 text-2xl font-bold flex flex-row'>Username: {Username}<input /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Email: <input placeholder={Email} /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Password</li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Phone Number: <input placeholder={Phone} /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Country: <input placeholder={Country} /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Occupation: <input placeholder={Occupation} /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Date of Birth: <input placeholder={DateOfBirth} /></li>
          <button className='bg-blue-900 text-white p-2 rounded-md hover:opacity-70 duration-200'>Save</button>
        </ul>
      </div>
      <Footer />

</>  )
}

export default SellerProfile