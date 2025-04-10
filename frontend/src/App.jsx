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
import Doc1Schedule from './pages/Doc1Schedule';
import Doc2Schedule from './pages/Doc2Schedule';
import Choose from './pages/Choose';
import { ThemeProvider } from './context/ThemeContext';
import ResheduleAppointment from './pages/ResheduleAppointment';
import Userappointment from './pages/Userappointment'; // ✅ Matches file name
import Docpanel from "./pages/Docpanel";
import LoginPage from './pages/LoginPage';
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
          <Route path="/doc1Schedule" element={<Doc1Schedule />} />
          <Route path="/doc2Schedule" element={<Doc2Schedule />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donateUs" element={<DonateUs />} />
          <Route path="/docpanel" element={<Docpanel />} />
          <Route path="/reschedule" element={<ResheduleAppointment />} />
          <Route path="/user" element={<Userappointment />} />
          <Route path="/loginP" element={<LoginPage />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
