
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import Footer from './Footer';

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [occupation, setOccupation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [wallet, setWallet] = useState('');
  const [promocodes, setPromocodes] = useState(false);
  const [password , setPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');

  // Fetch user profile on mount using the HttpOnly cookie for authentication.
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        console.log('Fetching user profile...');
        const response = await axios.get('http://localhost:3000/user/getUser', {
          withCredentials: true, // Automatically sends the HttpOnly cookie
        });

        console.log('Profile response:', response.data);
        const { user, subUser } = response.data;

        setUsername(user.username);
        setEmail(user.email);
        setPhone(subUser.mobileNumber);
        setCountry(subUser.nationality);
        setOccupation(subUser.job);
        setDateOfBirth(subUser.dateOfBirth);
        setWallet(subUser.wallet || 'N/A');
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        alert('Failed to fetch profile: ' + error.message);
      }
    };

    getUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      console.log('Updating user profile...');
      const response = await axios.put(
        'http://localhost:3000/user/updateUser',
        {
          username,
          email,
          password,
          mobileNumber: phone,    // rename phone to mobileNumber
          nationality :country,
          job: occupation,        // rename occupation to job
          dateOfBirth,
          role: "Tourist"         // include role if necessary
        },
        {
          withCredentials: true, // Automatically sends the HttpOnly cookie
        }
      );
  
      console.log('Profile update response:', response.data);
      alert('Profile updated successfully!');
      // Optionally, refetch the profile to update the UI:
      // getUserProfile(); // if you extract it as a separate function
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };
const [showDate, setShowDate] = useState(false);
  return (
    <div>
      <NavBar />

      <h1 className="text-4xl font-bold text-center mt-8">Profile</h1>
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold mx-8">Promocodes Available:</h1>
        <div className="flex flex-row">
          {promocodes ? (
            <div className="mt-1 mx-3 text-lg">
              No Promocodes are Available at the Moment
            </div>
          ) : (
            <>
              <div className="mt-1 mx-3 text-lg">50%OFF</div>
              <div className="mt-1 mx-3 text-lg">25%OFF</div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col mx-8 justify-between h-screen border-t">
        <ul className="flex flex-col">
          <li className="py-4 text-2xl font-bold flex flex-row">
            Wallet: {wallet} $
          </li>
          <li className="py-4 text-2xl font-bold flex flex-row">
            Username: {username} 
          </li>
          <li className="py-4 text-2xl font-bold flex flex-row">
            Email: <input type='email' placeholder={email} />
          </li>
          <li className="py-4 text-2xl font-bold flex flex-row">
            Password: <input
  type="text"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter new password"
/>

          </li>

          <li className="py-4 text-2xl font-bold flex flex-row">
            Phone Number: <input placeholder={phone} onChange={(e)=>setPhone(e.target.value)} />
          </li>
          <li className="py-4 text-2xl font-bold flex flex-row">
            Country: <input type='text' value={country} placeholder={country} onChange={(e)=>setCountry(e.target.value)} />
          </li>
          <li className="py-4 text-2xl font-bold flex flex-row">
            Occupation:<input type='text'  placeholder={occupation} onChange={(e)=>setOccupation(e.target.value)} />
          </li>
          <li className="py-4 text-2xl font-bold flex flex-row">
  Date of Birth: 
  <input 
    value={dateOfBirth} 
    type={showDate ? 'date' : 'text'}
    onChange={(e) => setDateOfBirth(e.target.value)}
    onClick={() => {
      // Only change to date type if not already date
      if (!showDate) {
        setShowDate(true);
      }
    }} 
  />
</li>
          <button className="bg-blue-900 text-white p-2 rounded-md hover:opacity-70 duration-200"
            onClick={handleUpdateProfile}>
            Save
          </button>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
