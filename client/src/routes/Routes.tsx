import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NotFound from "../components/NotFound";
import HomePage from "../pages/HomePage";
import OtpVerification from "../components/OtpVerification";
import UserProtector from "../components/protector/UserProtector";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserProtector><HomePage /></UserProtector>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
