import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  useHistory,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
// import CartTest1 from "./pages/Cart/CartTest1";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetails from "./pages/ProductInfo/ProductDetails";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import NotFound from "./pages/Session/NotFound";

const App = () => {
  // const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(() => {
    const isLoggedOut = localStorage.getItem("isLoggedOut");
    return isLoggedOut ? true : false;
  });

  const [tokenAvailable, setTokenAvailable] = useState(() => {
    const tokenAvailable = localStorage.getItem("token");
    return tokenAvailable ? true : false;
  });

  useEffect(() => {
    console.log("-useEffect 1 in App js-----");
    console.log(loggedIn);
    console.log(tokenAvailable);
  });

  useEffect(() => {
    console.log("-useEffect 2 in App js-----");

    console.log(tokenAvailable);
    handleLogin(tokenAvailable);
  }, [tokenAvailable]);

  const handleLogin = (isSuccess) => {
    console.log("handleLogin");
    console.log("App.js : " + isSuccess);

    console.log(isSuccess);
    console.log(loggedOut);
    console.log(tokenAvailable);

    const token = localStorage.getItem("token");
    if (token) {
      setTokenAvailable(true);
    }

    if (isSuccess) {
      console.log("-------is Logged in------");
      setLoggedIn(true);
      setLoggedOut(false);
    } else {
      console.log("-------is Logged out------");
      setLoggedIn(false);
      setLoggedOut(true);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home handleLogin={handleLogin} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/cart" element={<CartTest1 />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate replace to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            loggedIn ? (
              <Home handleLogin={handleLogin} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
