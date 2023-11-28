import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./Layout/Home/Home";
import Login from "./Layout/Login/Login";
import UserProfile from "./Layout/UserProfile/UserProfile"
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element= {
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }/>
        </Routes>          
      <Footer />
    </Router>
  );
}

export default App;
