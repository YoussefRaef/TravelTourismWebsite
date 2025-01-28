
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {FaFacebookSquare,FaInstagram,FaGithub,FaTwitterSquare,FaGoogle} from 'react-icons/fa'
  import { IoLockClosed } from "react-icons/io5";
  import { faUser, faEye, faEyeSlash,faMailBulk,faPhone,faFlag,faCalendar,faSuitcase,faLock} from '@fortawesome/free-solid-svg-icons';

  function LoginPage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
  const [role, setRole] = React.useState('Select a Role')
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = React.useState({});
  const [idFile, setIdFile] = React.useState(null);
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const [certificates, setCertificates] = React.useState(null);
  const [formDatatLogin, setFormDataLogin] = React.useState({
    username: '',
    password: '',
  });
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  const [formDataTourist, setFormDataTourist] = React.useState({
    mobile: '',
    nationality: '',
    occupation: '',
    dob: '',
  });  const [formDataSeller, setFormDataSeller] = React.useState({
    profileSeller: '',
    idSeller: '',
    certificateSeller: '',
  });  const [formDataAdvertiser, setFormDataAdvertiser] = React.useState({
    profileAdvertiser: '',
    idAdvertiser: '',
    certificateAdvertiser: '',
  });
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);

    // Generate a preview of the uploaded image
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Update formDataSeller
    setFormDataSeller((prev) => ({
      ...prev,
      profileSeller: file.name, // Or store the file object, if needed
    }));

    // Clear error
    setErrors((prevErrors) => ({ ...prevErrors, profileSeller: '' }));
  }
};

    const handleIdFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setIdFile(file);
        alert(`ID File Uploaded: ${file.name}`);
      }
    };
    const handleCertFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCertificates(file);
        alert(`Certificate File Uploaded: ${file.name}`);
      }
    };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleInputChangeLogin = (e) => {
    setFormDataLogin({ ...formDatatLogin, [e.target.name]: e.target.value });
  };
  const handleInputchangeTourist = (e) => {
    setFormDataTourist({ ...formDataTourist, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    let validationErrors = {};
    if (!formData.username) validationErrors.username = 'Username is required.';
    if (!formData.email) validationErrors.email = 'Email is required.';
    if (!formData.password) validationErrors.password = 'Password is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateFormTourist = () => {
    let validationErrors = {};
    if (!formDataTourist.mobile) validationErrors.mobile = 'Mobile number is required.';
    if (!formDataTourist.nationality) validationErrors.nationality = 'Nationality is required.';
    if (!formDataTourist.occupation) validationErrors.occupation = 'Occupation is required.';
    if (!formDataTourist.dob) validationErrors.dob = 'Date of Birth is required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateFormSeller = () => {
    let validationErrors = {};
    if (!formDataSeller.profileSeller) validationErrors.profileSeller = 'Profile Image is required.';
   if (!formDataSeller.idSeller) validationErrors.idSeller = 'ID File is required.';
   if (!formDataSeller.certificateSeller) validationErrors.certificateSeller = 'Certificates are required.';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  const validateFormAdvertiser = () => {
    let validationErrors = {};
    if (!formDataAdvertiser.profileAdvertiser) validationErrors.profileAdvertiser = 'Profile Image is required.';
    if (!formDataAdvertiser.idAdvertiser) validationErrors.idAdvertiser = 'ID File is required.';
    if (!formDataAdvertiser.certificateAdvertiser) validationErrors.certificateAdvertiser = 'Certificates are required .';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form based on the selected role
    if (role === 'Tourist' && validateForm() && validateFormTourist()) {
        const form = new FormData();

        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('role', role);

        // Add tourist-specific fields
        form.append('mobileNumber', formDataTourist.mobile);
        form.append('nationality', formDataTourist.nationality);
        form.append('job', formDataTourist.occupation);
        form.append('dateOfBirth', formDataTourist.dob);

        // Send form data via API
        handleFormSubmission(form);
    } 
    else if (role === 'Seller' && validateForm() && validateFormSeller()) {
        const form = new FormData();

        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('role', role);

        // Add seller-specific fields
        form.append('idFile', idFile);
        form.append('certificatesFile', certificates);
        form.append('imageFile', image);

        // Send form data via API
        handleFormSubmission(form);
    } 
    else if (role === 'Advertiser' && validateForm() && validateFormAdvertiser()) {
        const form = new FormData();

        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('role', role);

        // Add advertiser-specific fields
        form.append('idFile', idFile);
        form.append('certificatesFile', certificates);
        form.append('imageFile', image);

        // Send form data via API
        handleFormSubmission(form);
    }
};
const handleFormSubmission = async (formData) => {
  try {
      // Make the POST request to the registration endpoint
      const response = await axios.post('http://localhost:3000/user/registerUser', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      // Handle successful response
      if (response.status === 201) {
          console.log('User registered successfully!');
          // Redirect user to the desired page, e.g., login page
          if (role === 'Tourist') {
            navigate('/tourist')
          }
        else if (role === 'Seller') {
            navigate('/seller')
          }
        else if (role === 'Advertiser') {
            navigate('/advertiser')
          }
      }
  } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
  }
};
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // Make the POST request to the login endpoint
    const response = await axios.post('http://localhost:3000/user/login', {
      username: formDatatLogin.username,
      password: formDatatLogin.password,
    });

    // Handle successful response
    if (response.status === 200) {
      console.log('User logged in successfully!');
      // Redirect user to the desired page, e.g., dashboard
      if (response.data.role === 'Tourist') {
        navigate('/tourist')
      }
    else if (response.data.role === 'Seller') {
        navigate('/seller')
      }
    else if (response.data.role === 'Advertiser') {
        navigate('/advertiser')
      }
      else if (response.data.role=== 'Admin') {
        navigate('/admin')
      }
    }
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.msg;
    
    alert(errorMessage || 'An error occurred. Please try again.');
  }
}

  return (
    
    <>
  <button className='m-5 px-3 py-1 underline hover:text-gray-400 duration-200'
  onClick={()=>navigate(-1)}
  >Back to HomePage</button>
   <div className='flex flex-col-2  mx-auto mt-24 justify-center lg:scale-125 scale-85 sm:scale-100'>
 
  {login&&( <motion.div className='border rounded-r-lg rounded-l-3xl bg-blue-800  p-2  flex flex-col justify-center  text-white text-center gap-2.5'
 initial={{ x:200,opacity:0 }} // Starts above the viewport and invisible
 animate={{ x: 0 ,opacity:1}} // Moves to its final position and becomes visible
 transition={{
   duration: 1, // Animation duration
   ease: "easeInOut", // Easing function for smooth entry and exit
 }}>
    <h1 className='text-3xl '>Don't Have an Account? </h1>
      <h1 className=' text-blue-200 text-2xl'>Sign up Right Here!</h1>
      <button className=' border rounded-lg px-5 py-0.5 bg-blue-200 text-black mx-auto justify-center text-lg font-semibold hover:opacity-70 duration-300' onClick={() => setLogin(!login)}>Signup</button>
   
    </motion.div>)}
  { login && (<motion.form 
  initial={{ x:-200 }} // Starts above the viewport and invisible
  animate={{ x: 0 }} // Moves to its final position and becomes visible
  transition={{
    duration: 1, // Animation duration
    ease: "easeInOut", // Easing function for smooth entry and exit
  }}
  className='flex flex-col bg-white rounded-lg shadow-lg p-5'
  onSubmit={handleLogin}
  >
    <h1 className='text-center text-2xl font-bold text-blue-800 m-2'>Put Your Information Down Below</h1>
    <p className='mx-auto'><FontAwesomeIcon icon={faUser} className="icon text-md px-1" />Username</p>
  <input 
              name='username'
              type='text'
              className='border border-gray-300 rounded-lg p-2 my-2 text-center w-1/2 mx-auto'
              placeholder='Enter your Username'
              value={formDatatLogin.username}
              onChange={handleInputChangeLogin}
            />
            <p  className='mx-auto'><FontAwesomeIcon icon={faLock} className="icon text-md px-1" />Password</p>
     <div className='mx-auto flex flex-row justify-center items-center gap-2'>

<input
  type={showPassword ? 'text' : 'password'}
  name='password'
  className='border border-gray-300 rounded-lg p-2 my-2 text-center ml-8'
  placeholder='Enter your Password'
  value={formDatatLogin.password}
  onChange={handleInputChangeLogin}
  />
   <button
type="button"
onClick={togglePasswordVisibility}
className=" text-gray-500"
> <FontAwesomeIcon className="icon text-md px-1" icon={showPassword ? faEyeSlash : faEye} /></button>
  </div>
  <button className=' border rounded-lg my-2 px-5 py-0.5 bg-blue-200 text-black mx-auto justify-center text-lg font-semibold hover:opacity-70 duration-300'
  onClick={handleLogin}
  type='submit'>Login</button>
  <button  className='hover:underline my-2' type="button ">Forgot Passsword?</button>
  <button  className='hover:underline ' type="button ">Continue as Guest</button>
  </motion.form>)}  


   {!login&&(<motion.form
   className='flex flex-col bg-white rounded-lg shadow-lg p-5 '
   initial={{ x:200 }} // Starts above the viewport and invisible
   animate={{ x: 0 }} // Moves to its final position and becomes visible
   transition={{
     duration: 1, // Animation duration
     ease: "easeInOut", // Easing function for smooth entry and exit
   }}
   >
    
    <h1 className='text-center text-3xl font-bold text-blue-800 m-2'>Create an Account</h1>
    <DropdownMenu>
  <DropdownMenuTrigger className='border border-gray-300 rounded-lg bg-blue-200 hover:opacity-80'>{role}</DropdownMenuTrigger>
  <DropdownMenuContent>
  <DropdownMenuItem
  className="border-b hover:bg-gray-200"
  onClick={() => {
    setRole('Tourist');
    setFormData(() => ({
      username: '', 
      email: '',
    password: '',   
    }));
  }}
>Tourist</DropdownMenuItem>
    <DropdownMenuItem className = 'border-b hover:bg-gray-200' onClick={() => setRole('Seller')} >Seller</DropdownMenuItem>
    <DropdownMenuItem className =' hover:bg-gray-200' onClick={() => setRole('Advertiser')}>Advertiser</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<div className='flex flex-col mt-2'>
  <p><FontAwesomeIcon icon={faUser} className="icon text-md px-1" />Username</p>
  <input
              type='text'
              name='username'
              className='border border-gray-300 rounded-lg p-2 my-2'
              placeholder='Enter your Username'
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
  <p><FontAwesomeIcon icon={faMailBulk} className="icon text-md px-1" />Email</p>
  <input
              type='email'
              name='email'
              className='border border-gray-300 rounded-lg p-2 my-2'
              placeholder='Enter your Email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}


            <p><FontAwesomeIcon icon={faLock} className="icon text-md px-1" />Password</p>
            <div>

            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              className='border border-gray-300 rounded-lg p-2 my-2'
              placeholder='Enter your Password'
              value={formData.password}
              onChange={handleInputChange}
              />
               <button
          type="button"
          onClick={togglePasswordVisibility}
          className=" text-gray-500"
        > <FontAwesomeIcon className="icon text-md px-1" icon={showPassword ? faEyeSlash : faEye} /></button>
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>

{role== 'Tourist' && (
 <>
  <p><FontAwesomeIcon icon={faPhone} className="icon text-md px-1" />Mobile Number</p>
            <input
              type='tel'
              name='mobile'
              className='border border-gray-300 rounded-lg p-2 my-2'
              placeholder='Enter your Mobile Number'
              value={formDataTourist.mobile}
              onChange={handleInputchangeTourist}
            />
            {errors.mobile && <div className="text-red-500 text-sm">{errors.mobile}</div>}
  <p><FontAwesomeIcon icon={faFlag} className="icon text-md px-1" />Nationality</p>
  <select      name='nationality'
              className='border border-gray-300 rounded-lg p-2 my-2'
              value={formDataTourist.nationality}
              onChange={handleInputchangeTourist}>
  <option value="">Select your Nationality</option>
  {[
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", 
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", 
    "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", 
    "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", 
    "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", 
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", 
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", 
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", 
    "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", 
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", 
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", 
    "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
    "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", 
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", 
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ].map(country => <option key={country} value={country}>{country}</option>)}
</select>
{errors.nationality && <div className="text-red-500 text-sm">{errors.nationality}</div>}

<p><FontAwesomeIcon icon={faSuitcase} className="icon text-md px-1" />Occupation</p>
            <input
              type='text'
              name='occupation'
              className='border border-gray-300 rounded-lg p-2 my-2'
              placeholder='Enter your Occupation'
              value={formDataTourist.occupation}
              onChange={handleInputchangeTourist}
            />
            {errors.occupation && <div className="text-red-500 text-sm">{errors.occupation}</div>}

            <p><FontAwesomeIcon icon={faCalendar} className="icon text-md px-1" />Date of Birth</p>
            <input
              type='date'
              name='dob'
              className='border border-gray-300 rounded-lg p-2 my-2'
              value={formDataTourist.dob}
              onChange={handleInputchangeTourist}
            />
            {errors.dob && <div className="text-red-500 text-sm">{errors.dob}</div>}

            <button
              type="button"
              onClick={handleSubmit}
              className='m-1 hover:opacity-80 border-gray-300 rounded border bg-blue-200'
            >
              Register
            </button>
              <button type="button"
  onClick={handleSubmit} className='flex flex-row underline hover:text-blue-800 mb-1' > <FaFacebookSquare size={20} className='mx-1'/>Signup with Facebook</button>
  <button className='flex flex-row underline hover:text-red-700' > <FaGoogle size={20} className='mx-1'/>Signup with Google</button>
  </>
)}
{role==  'Seller' && (<>
  <div className="flex flex-col items-center gap-4  my-4 border-t-2">
      <p className="text-md">Upload Profile Image</p>
      <label
        htmlFor="profile-upload"
        className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-full cursor-pointer bg-blue-200 overflow-hidden hover:border-blue-800"
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-500 text-sm text-center">Click to Upload</span>
        )}
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleImageUpload(e);
          setFormDataSeller((prev) => ({
            ...prev,
            profileSeller: e.target.files[0], // Store the file object
          }));
        }}
        className="hidden"
      />
    </div>
    {errors.profileSeller && <div className="text-red-500 text-sm">{errors.profileSeller}</div>}
    <div className="flex flex-col items-center space-y-2 my-4 border-t-2">
  <p className="icon text-md px-1">Upload ID File</p>
  <label
    htmlFor="id-upload"
    className="flex items-center justify-center p-2 border-2  border-gray-300 rounded-sm cursor-pointer hover:border-blue-800 bg-blue-200"
  >
    Click to Upload
  </label>
  <input
    id="id-upload"
    type="file"
    accept=".pdf,.doc,.docx,.jpg,.png"
    onChange={(e)=>{
      handleIdFileUpload(e);
      setFormDataSeller((prev) => ({
        ...prev,
        idSeller: e.target.files[0], // Store the file object
      }));
    }}
    className="hidden"
  />
  {idFile && <p className="text-sm text-green-600">Uploaded: {idFile.name}</p>}
</div>
{errors.idSeller && <div className="text-red-500 text-sm">{errors.idSeller}</div>}

<div className="flex flex-col items-center space-y-2 my-4 border-t-2">
  <p className="icon text-md px-1">Upload Certificate File</p>
  <label
    htmlFor="id-uploadcertificates"
    className="flex items-center justify-center p-2 border-2  border-gray-300 rounded-sm cursor-pointer hover:border-blue-800 bg-blue-200"
  >
    Click to Upload
  </label>
  <input
    id="id-uploadcertificates"
    type="file"
    accept=".pdf,.doc,.docx,.jpg,.png"
    onChange={(e)=>{
      handleCertFileUpload(e);
      setFormDataSeller((prev) => ({
        ...prev,
        certificateSeller: e.target.files[0], // Store the file object
      }));
    }}
    className="hidden"
  />
  {certificates && <p className="text-sm text-green-600">Uploaded: {certificates.name}</p>}
</div>
{errors.certificateSeller && <div className="text-red-500 text-sm">{errors.certificateSeller}</div>}

<button
              type="button"
              onClick={handleSubmit}
              className='m-1 w-[8rem]  hover:opacity-80 border-gray-300 rounded border bg-blue-200 p-1 mx-auto'
            >
              Register
            </button>
</> )}
{role==  'Advertiser' && (<>
  <div className="flex flex-col items-center gap-4  my-4 border-t-2">
      <p className="text-md">Upload Profile Image</p>
      <label
        htmlFor="profile-upload"
        className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-full cursor-pointer bg-blue-200 overflow-hidden hover:border-blue-800"
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-500 text-sm text-center">Click to Upload</span>
        )}
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleImageUpload(e);
          setFormDataAdvertiser((prev) => ({
            ...prev,
            profileAdvertiser: e.target.files[0], // Store the file object
          }));
        }}
        className="hidden"
      />
    </div>
    {errors.profileAdvertiser && <div className="text-red-500 text-sm">{errors.profileAdvertiser}</div>}
    <div className="flex flex-col items-center space-y-2 my-4 border-t-2">
  <p className="icon text-md px-1">Upload ID File</p>
  <label
    htmlFor="id-upload"
    className="flex items-center justify-center p-2 border-2  border-gray-300 rounded-sm cursor-pointer hover:border-blue-800 bg-blue-200"
  >
    Click to Upload
  </label>
  <input
    id="id-upload"
    type="file"
    accept=".pdf,.doc,.docx,.jpg,.png"
    onChange={(e)=>{
      handleIdFileUpload(e);
      setFormDataAdvertiser((prev) => ({
        ...prev,
        idAdvertiser: e.target.files[0], // Store the file object
      }));
    }}
    className="hidden"
  />
  {idFile && <p className="text-sm text-green-600">Uploaded: {idFile.name}</p>}
</div>
{errors.idAdvertiser && <div className="text-red-500 text-sm">{errors.idAdvertiser}</div>}

<div className="flex flex-col items-center space-y-2 my-4 border-t-2">
  <p className="icon text-md px-1">Upload Certificate File</p>
  <label
    htmlFor="id-uploadcertificates"
    className="flex items-center justify-center p-2 border-2  border-gray-300 rounded-sm cursor-pointer hover:border-blue-800 bg-blue-200"
  >
    Click to Upload
  </label>
  <input
    id="id-uploadcertificates"
    type="file"
    accept=".pdf,.doc,.docx,.jpg,.png"
    onChange={(e)=>{
      handleCertFileUpload(e);
      setFormDataAdvertiser((prev) => ({
        ...prev,
        certificateAdvertiser: e.target.files[0], // Store the file object
      }));
    }}
    className="hidden"
  />
  {certificates && <p className="text-sm text-green-600">Uploaded: {certificates.name}</p>}
</div>
{errors.certificateAdvertiser && <div className="text-red-500 text-sm">{errors.certificateAdvertiser}</div>}

<button
              type="button"
              onClick={handleSubmit}
              className='m-1 w-[8rem]  hover:opacity-80 border-gray-300 rounded border bg-blue-200 p-1 mx-auto'
            >
              Register
            </button>
</> )}
</div>

    </motion.form>)}
   
    {!login&&(<motion.div 
     initial={{ x:-200,opacity:0 }} // Starts above the viewport and invisible
     animate={{ x: 0,opacity:1 }} // Moves to its final position and becomes visible
     transition={{
       duration: 1, // Animation duration
       ease: "easeInOut", // Easing function for smooth entry and exit
     }}
    className='border rounded-r-lg rounded-l-3xl bg-blue-800  p-2  flex flex-col justify-center  text-white text-center gap-2.5  '>
      <h1 className='text-3xl '>Already Registered? </h1>
      <h1 className=' text-blue-200 text-2xl'>Log in Right Here!</h1>
      <button className=' border rounded-lg px-5 py-0.5 bg-blue-200 text-black mx-auto justify-center text-lg font-semibold hover:opacity-70 duration-300' onClick={() => setLogin(!login)}>Login</button>
    </motion.div>)}
</div>
</>
  )
}

export default LoginPage