import { React, useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import Footer from './Footer';
import { jwtDecode } from 'jwt-decode';
function Profile() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Country, setCountry] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Wallet, setWallet] = useState('');

  const [userId, setUserId] = useState('');

  // Load userId from cookies (if needed)
  useEffect(() => {
    const token = Cookies.get('jwt'); // Get JWT token from cookies
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT
        if (decoded.user && decoded.user.id) {
          setUserId(decoded.user.id);
          console.log("Extracted userId:", decoded.user.id);
        } else {
          console.warn("userId not found in JWT");
        }
      } catch (error) {
        console.error("Invalid JWT:", error);
      }
    } else {
      console.warn("No JWT found in cookies.");
    }
  }, []);

  useEffect(() => {
    // Check if touristId is available before making the request
    if (!userId) {
      console.warn("No userId found, cannot fetch profile.");
      return;
    }

    const getTourist = async () => {
      try {
        console.log("Fetching user profile...");

        // Send GET request to the backend to fetch user profile data
        const response = await axios.get(`http://localhost:3000/user/getUser/${userId}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        console.log("Profile response:", response.data);

        // Set the received user data to state
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);
        setPhone(response.data.subUser.mobileNumber);
        setCountry(response.data.subUser.nationality);
        setOccupation(response.data.subUser.job);
        setDateOfBirth(response.data.subUser.dateOfBirth);
        setWallet(response.data.subUser?.wallet || "N/A");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        alert("Failed to fetch profile: " + error.message);
      }
    };

    getTourist();
  }, [userId]); // Re-run if touristId changes
 const [Promocodes, setPromocodes] = useState(false);
  return (
    <div >
      <NavBar />
     
      <h1 className='text-4xl font-bold text-center mt-8'>Profile</h1>
      <div className='flex flex-row  '>
        <h1 className='text-2xl font-bold  mx-8'>Promocodes Available:</h1>
        <div className='flex flex-row'>
          
         {Promocodes&& <div className='mt-1 mx-3 text-lg'>No Promocodes are Available at the Moment</div>}
         {!Promocodes&&( <><div className='mt-1 mx-3 text-lg'>50%OFF</div>
          <div className='mt-1 mx-3 text-lg'>25%OFF</div></>)}
          </div>
        </div>
      <div className='flex flex-col  mx-8  justify-between h-screen border-t'>
        <ul className='flex flex-col'>
          <li className='py-4 text-2xl font-bold flex flex-row'>Wallet: {Wallet}</li>
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
    </div>
  );
}

export default Profile;
