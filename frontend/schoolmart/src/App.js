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
import jwtDecode from "jwt-decode";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
// import CartTest1 from "./pages/Cart/CartTest1";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderHistoryDetails from "./pages/OrderHistoryDetails/OrderHistoryDetails";
import ProductDetails from "./pages/ProductInfo/ProductDetails";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import NotFound from "./pages/Session/NotFound";

const App = () => {
  // const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isAdmin = jwtDecode(token).user_role === "Admin";
      return isAdmin ? true : false;
    }
  });

  const [isCustomer, setIsCustomer] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isCustomer = jwtDecode(token).user_role === "Customer";
      return isCustomer ? true : false;
    }
  });

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
    console.log("isAdmin : " + isAdmin);
    console.log("isCustomer : " + isCustomer);
  });

  useEffect(() => {
    console.log("-useEffect 2 in App js-----");

    console.log("isAdmin : " + isAdmin);
    console.log("isCustomer : " + isCustomer);
    if (isAdmin) {
      handleLogin(isAdmin, "Admin");
    } else {
      handleLogin(isCustomer, "Customer");
    }
  }, [isAdmin, isCustomer]);

  const handleLogin = (isSuccess, userRole) => {
    console.log("handleLogin");
    console.log("App.js : " + isSuccess);

    if (isSuccess && userRole === "Admin") {
      console.log("-------is Logged in as Admin------");
      setIsAdmin(true);
    } else if (isSuccess && userRole === "Customer") {
      console.log("-------is Logged in as Customer------");
      setIsCustomer(true);
    } else {
      console.log("-------is Logged out------");
      setIsAdmin(false);
      setIsCustomer(false);
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
        {/* <Route path="/order/history" element={<OrderHistory />} /> */}
        {/* <Route
          path="/order/history/details"
          element={<OrderHistoryDetails />}
        /> */}
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/admin" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/login"
          element={
            // loggedIn ? (
            isCustomer || isAdmin ? (
              <Navigate replace to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            // loggedIn && !isAdmin ? (
            isCustomer && !isAdmin ? (
              <Home handleLogin={handleLogin} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/admin/panel"
          element={
            // loggedIn ? (
            isAdmin && !isCustomer ? (
              <AdminPanel />
            ) : (
              <Navigate replace to="/home" />
            )
          }
        />

        <Route
          path="/order/history"
          element={
            isCustomer && !isAdmin ? (
              <OrderHistory />
            ) : (
              <Navigate replace to="/home" />
            )
          }
        />

        <Route
          path="/order/history/details"
          element={
            isCustomer && !isAdmin ? (
              <OrderHistoryDetails />
            ) : (
              <Navigate replace to="/home" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
