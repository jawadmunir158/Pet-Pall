import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ❌ Remove BrowserRouter
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Placeorder from './pages/Placeorder';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ai from './pages/Ai';
import Appointment from './pages/Appointment';
import DonateUs from './pages/DonateUs';
import Donate from './pages/Donate';
import Doctors from './pages/Doctors';
import MyProfile from './pages/MyProfile';
import Doc2Schedule from './pages/Doc2Schedule';
import Choose from './pages/Choose';
import Forgotpassword from './pages/Forgotpassword';
import { ThemeProvider } from './context/ThemeContext';
import Verify from './pages/Verify';

const App = () => {
  return (
    <ThemeProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/Forgotpassword" element={<Forgotpassword />} />
          <Route path="/doc2Schedule" element={<Doc2Schedule />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/donateUs" element={<DonateUs />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
