import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NotFound from "../components/NotFound";
import HomePage from "../pages/HomePage";
import OtpVerification from "../components/OtpVerification";
import UserProtector from "../components/protector/UserProtector";
import LoginProtector from "../components/protector/LoginProtector";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserProtector><HomePage /></UserProtector>}/>
        <Route path="/signup" element={<LoginProtector><Signup /></LoginProtector>} />
        <Route path="/otp" element={<LoginProtector><OtpVerification /></LoginProtector>} />
        <Route path="/" element={<LoginProtector><Login /></LoginProtector>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
