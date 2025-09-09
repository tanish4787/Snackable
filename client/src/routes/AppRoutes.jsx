import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUser from "../pages/RegisterUser";
import LoginUser from "../pages/LoginUser";
import RegisterPartner from "../pages/RegisterPartner";
import LoginPartner from "../pages/LoginPartner";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/food-partner/register" element={<RegisterPartner />} />
        <Route path="/food-partner/login" element={<LoginPartner />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
