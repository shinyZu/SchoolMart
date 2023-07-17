import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  useHistory,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (isSuccess) => {
    console.log("handleLogin");
    console.log("App.js : " + isSuccess);
    if (isSuccess) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<Home />} />

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
          element={loggedIn ? <Home /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
