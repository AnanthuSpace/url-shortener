import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NotFound from "../components/NotFound";
import HomePage from "../pages/HomePage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
