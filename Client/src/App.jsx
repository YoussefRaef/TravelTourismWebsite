import React from 'react';
import { Button } from './components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeStart from './components/HomeStart';
import LoginPage from './components/LoginPage';
import TouristHome from './components/Tourist/TouristHome';
import AdvertiserHome from './components/Advertiser/AdvertiserHome';
import SellerHome from './components/Seller/SellerHome';
import AdminHome from './components/Admin/AdminHome';
import Promocode from './components/Tourist/Promocode';
import Activities from './components/Tourist/Activities';
import Flights from './components/Tourist/Flights';
import Notifications from './components/Tourist/Notifications';
import Profile from './components/Tourist/Profile';
import Products from './components/Tourist/Products';
import ProductCreation from './components/Seller/ProductCreation';
import Sales from './components/Seller/Sales';
import SellerProfile from './components/Seller/SellerProfile';
import Cart from './components/Tourist/Cart';
function App() {
  return (
    <main>
      <Router>
      <Routes>
      <Route path="/" element={<HomeStart />} />  {/* Set LoginForm as the default route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tourist" element={<TouristHome />} />
      <Route path="/advertiser" element={<AdvertiserHome />} />
      <Route path="/seller" element={<SellerHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/promocode" element={<Promocode />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<Products />} />
      <Route path ="/productcreation" element={<ProductCreation />} />
      <Route path ="/sales" element={<Sales />} />
      <Route path ="/sellerprofile" element={<SellerProfile />} />
      <Route path ="/cart" element={<Cart />} />
      </Routes>
      </Router>
    </main>
  );
}

export default App;
