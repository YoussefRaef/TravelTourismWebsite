import { React, useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import Footer from './Footer';

function Profile() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Country, setCountry] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Wallet, setWallet] = useState('');
  
  const [touristId, setTouristId] = useState('');
  const [token, setToken] = useState('');

  // useEffect hook to load touristId and token from cookies
  useEffect(() => {
    const storedToken = Cookies.get('jwt');
    const storedId = Cookies.get('userId');
    
    console.log("Loaded touristId from cookies:", storedId);
    console.log("Loaded token from cookies:", storedToken);

    setToken(storedToken || '');
    setTouristId(storedId || ''); // Update state based on cookies

  }, []);

  useEffect(() => {
    // Check if token and touristId are available before making the request
    if (!token || !touristId) {
      alert("No token or userId found, please login.");
      console.log("No token or userId found, please login.");
      return; // Stop execution if token or touristId is missing
    }

    const getTourist = async () => {
      try {
        console.log("Attempting to get profile...");
        
        // Send GET request to the backend to fetch user profile data
        const response = await axios.get(`http://localhost:3000/user/getUser/${touristId}`, {
          withCredentials: true, // Ensure cookies are sent along with the request
        });

        console.log("Profile response:", response.data);

        // Set the received user data to state
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);  // Adjust this based on the response structure
        setPhone(response.data.user.phone);  // Adjust this based on the response structure
        setCountry(response.data.user.country);  // Adjust this based on the response structure
        setOccupation(response.data.user.occupation);  // Adjust this based on the response structure
        setDateOfBirth(response.data.user.dateOfBirth);  // Adjust this based on the response structure
        setWallet(response.data.subUser?.wallet || "N/A");

        // Set the token and userId in cookies after successful response
        Cookies.set('jwt', response.data.token, { expires: 7, secure: true, httpOnly: true }); // token with httpOnly, secure flags
        Cookies.set('id', response.data.userId, { expires: 7 });

      } catch (error) {
        console.error("Get profile failed:", error);
        alert("Get profile failed: " + error.message);
      }
    };

    getTourist();

  }, [touristId, token]);  // Re-run if touristId or token changes
  
  return (
    <div className=''>
      <NavBar />
      <div className='flex flex-col m-8 justify-between h-screen'>
        <ul className='flex flex-col'>
          <li className='py-4 text-2xl font-bold flex flex-row'>Wallet: {Wallet}</li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Username: {Username}<input /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Email: <input placeholder='{}' /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Password</li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Phone Number: <input placeholder='' /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Country: <input placeholder='' /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Occupation: <input placeholder='' /></li>
          <li className='py-4 text-2xl font-bold flex flex-row'>Date of Birth: <input placeholder='' /></li>
          <button className='bg-blue-900 text-white p-2 rounded-md hover:opacity-70 duration-200'>Save</button>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
