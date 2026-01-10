import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './other/Contact';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Catalogue from './Catalogue';
import Aboutus from './other/Aboutus';
import FAQ from './other/FAQ';
import Links from './other/Links';
import Terms from './other/Terms';
import Login from './loginsignup/Login';
import Signup from './loginsignup/Signup';
import Newsletter from './other/newsletter';
import Cart from './Cart';
import Subscribe from './other/Subscribe';
import Error404 from './other/Error404';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />*
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/links" element={<Links />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;