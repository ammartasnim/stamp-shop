import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingRedirect from './LandingRedirect';
import Home from '../Home';
import Contact from '../other/Contact';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import Catalogue from '../Catalogue';
import Aboutus from '../other/Aboutus';
import FAQ from '../other/FAQ';
import Terms from '../other/Terms';
import Login from '../loginsignup/Login';
import Signup from '../loginsignup/Signup';
import Cart from '../Cart';
import Subscribe from '../other/Subscribe';
import SubscriptionStatus from '../profile/SubscriptionStatus';
import Resetpassword from '../loginsignup/Resetpassword';
import Printing from '../other/Printing';
import News from '../other/News';
import Checkout from '../Checkout';
import Profile from '../profile/Profile';
import PersonalInfo from '../profile/PersonalInfo';
import OrderHistory from '../profile/OrderHistory';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import AdminDash from '../admin/AdminDash';
import StampDash from '../admin/StampDash';
import StampForm from '../admin/StampForm';
import UserDash from '../admin/UserDash';
import ContactInbox from '../admin/ContactInbox';
import Subscriptions from '../admin/Subscriptions';
import OrderDash from '../admin/OrderDash';
import Error404 from '../other/Error404';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from 'react-hot-toast';


function App() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(Boolean(token));
  const [showNewsletter, setShowNewsletter] = useState(true);
  
  let role = 'user';
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }
  
  const [subscribed, setSubscribed] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState(false);
  
  useEffect(() => {
    if (!token) { return setSubscribed(false); }
    
    fetch('/api/subscriptions/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then(data => {
      setSubscribed(data.subscribed ?? false);
      setActiveSubscription(data.subscription.active ?? false);
    })
    .catch(err => console.error(err));
    
    fetch('/api/newsletters/me', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
      setShowNewsletter(!data.subscribed);
    })
    .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Router>
        {role === "admin" ? (
          <Routes>
            <Route path="/" element={<Navigate to="/admindash" replace />} />
            <Route element={<AdminRoute role={role} loggedIn={loggedIn} />}>
              <Route path="/admindash" element={<AdminDash setLoggedIn={setLoggedIn} />}>
                <Route index element={<Navigate to="stampdash" replace />} />
                <Route path="stampdash" element={<StampDash />} />
                <Route path="stampform" element={<StampForm />} />
                <Route path="userdash" element={<UserDash />} />
                <Route path="contactinbox" element={<ContactInbox />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="orderdash" element={<OrderDash />} />
              </Route>
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        ) : (
          <>
            <Navbar 
              loggedIn={loggedIn} 
              setLoggedIn={setLoggedIn} 
              role={role} 
              showNewsletter={showNewsletter} 
              setShowNewsletter={setShowNewsletter} 
              username={token ? jwtDecode(token).username : ''}
            />
            <Routes>
              <Route path="/" element={<Home loggedIn={loggedIn} activeSubscription={activeSubscription} />} />
              <Route path="/home" element={<Home loggedIn={loggedIn} activeSubscription={activeSubscription} />} />
              <Route path="/catalogue" element={<Catalogue loggedIn={loggedIn} activeSubscription={activeSubscription} role={role} />} />
              <Route path="/aboutus" element={<Aboutus setShowNewsletter={setShowNewsletter} setSubscribed={setSubscribed} />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
              <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/subscribe" element={
                loggedIn ? (
                  <Subscribe setSubscribed={setSubscribed} />
                ) : (
                  <Login setLoggedIn={setLoggedIn} />
                )
              } />
              <Route element={<UserRoute loggedIn={loggedIn} subscribed={subscribed} />}>
                <Route path="/subscription" element={
                  (loggedIn && subscribed) ? (
                    <SubscriptionStatus />
                  ) : (
                    <Login setLoggedIn={setLoggedIn} />
                  )
                } />
              </Route>
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/printing" element={<Printing />} />
              <Route path="/news" element={<News />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route element={<UserRoute loggedIn={loggedIn} subscribed={true} />}>
                <Route path="/profile" element={<Profile subscribed={subscribed} />}>
                  <Route index element={<Navigate to="personalinfo" replace />} />
                  <Route path="personalinfo" element={<PersonalInfo />} />
                  <Route path="orderhistory" element={<OrderHistory />} />
                  <Route path="subscription" element={<SubscriptionStatus />} />
                </Route>
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;