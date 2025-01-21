import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HotelBooking = () => {
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookedHotels, setBookedHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [touristId] = useState("674b64cbd03522fb24ac9d06"); // Hardcoded for now
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
  const [searchId, setSearchId] = useState(null);
  const [hotelId, setHotelId] = useState(null); // Set after selecting the hotel
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Payment modal state
  const [enteredPromocode, setEnteredPromocode] = useState('');
  const [enteredPromocodeCredit, setEnteredPromocodeCredit] = useState('');
  const navigate = useNavigate();

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch( ` http://localhost:4000/hotels/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
  );
    const data = await response.json();

    if (data.hotels) {
      setSearchResults(data.hotels)
      setSearchId(data.searchId);
      setHotelId(data.hotels.hotelId);
    } else {
      console.error('Error fetching hotel data');
    }
  };

  // Select a hotel
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setHotelId(hotel.hotelId);
    setIsPaymentModalOpen(true); // Open payment modal
  };

  // Confirm booking for the selected hotel
  const handleWalletPayment = async () => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
    if (!touristId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }
    try {
      console.log('Sending request to book wallet:', {
        touristId,
        searchId,
        hotelId,
        promoCode: enteredPromocode,
      });
  
      const response = await axios.post('http://localhost:4000/hotels/bookWallet', {
        touristId,
        searchId,
        hotelId,
        promoCode: enteredPromocode,
      });
  
      console.log('Response received:', response.data);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setBookedHotels([...bookedHotels, response.data.bookingDetails]);
      setSelectedHotel(null);
    } catch (error) {
      console.error('Error booking wallet:', error);
      setErrorMessage(error.response?.data?.message || 'Error booking hotel');
      setSuccessMessage('');
    }
  };
  

  // Cancel booking
  const handleCancelBooking = (hotelId) => {
    const updatedBookings = bookedHotels.filter(hotel => hotel.id !== hotelId);
    setBookedHotels(updatedBookings);
  };


  // Handle credit card payment
  const handleCreditCardPayment = async () => {
    try {
      // Create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
        itemName: selectedItem.name,
        itemPrice: selectedItem.price,
      });

      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    }
  };

  return (
    
    <div style={{ padding: "20px" }}>
      {/* Back Button */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
      <h3>Hotel Booking</h3>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: "20px" }}>
        <label>
          City Code:
          <input
            type="text"
            placeholder="Enter city code"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Check-In Date:
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Check-Out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {searchResults.map((hotelData) => (
              <li key={hotelData.hotelId} style={listItemStyle}>
                {hotelData.name} from {hotelData.checkInDate} to{" "}
                {hotelData.checkOutDate}
                <div>
                  <strong>Price:</strong> {hotelData.price}
                </div>
                <button
                  onClick={() => handleHotelSelect(hotelData)}
                  style={buttonStyle}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedHotel && (
        <div style={modal}>
          <h4>Selected Hotel:</h4>
          <p>
            {selectedHotel.name} from {selectedHotel.checkInDate} to{" "}
            {selectedHotel.checkOutDate}
          </p>
          <p>
            <strong>Amount to Pay:</strong> {selectedHotel.price}
          </p>
          <h4>Choose Payment Method:</h4>
          <div style={modalButtonContainer}>
    <div style={styles.paymentOption}>
        <button onClick={handleCreditCardPayment} style={creditCardButton}>
          Pay with Credit Card
        </button>
        <input
          type="text"
          placeholder="Enter Promocode"
          value={enteredPromocodeCredit}
          onChange={(e) => setEnteredPromocodeCredit(e.target.value)}
          style={promocodeInput}
        />
     
      </div>
      <div style={styles.paymentOption}>
        <button onClick={handleWalletPayment} style={bookButton}>
          Pay with Wallet
        </button>
        <input
          type="text"
          placeholder="Enter Promocode"
          value={enteredPromocode}
          onChange={(e) => setEnteredPromocode(e.target.value)}
          style={promocodeInput}
        />
      </div>
      <button
        onClick={() => setIsPaymentModalOpen(false)}
        style={cancelButton}
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {/* Booked Hotels List */}
      {bookedHotels.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Booked Hotels:</h4>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {bookedHotels.map((hotelData) => (
              <li key={hotelData.id} style={listItemStyle}>
                {hotelData.hotelName} from {hotelData.checkInDate} to{" "}
                {hotelData.checkOutDate} - Booked
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Styles for buttons, inputs, and list items
const styles = {

};
const modalButtonContainer= {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  marginTop: '20px',
};
const promocodeInput= {
  marginTop: '10px',
  width: '90%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '14px',
  textAlign: 'center',
};
const cancelButton= {
  padding: '10px 15px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px',
};
const creditCardButton= {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px',
};
const modal= {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  textAlign: 'center',
  width: '750px',
};
const bookButton= {
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px',
};
const buttonStyle = {
  margin: "10px",
  padding: "5px 10px",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "1px solid #ccc",
  backgroundColor: "#f0f0f0",
};

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "5px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const listItemStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "20px",
  border: "2px solid #ccc",
  borderRadius: "10px",
  zIndex: 1000,
};

export default HotelBooking;