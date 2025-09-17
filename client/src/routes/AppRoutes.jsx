import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUser from "../pages/RegisterUser";
import LoginUser from "../pages/LoginUser";
import RegisterPartner from "../pages/RegisterPartner";
import LoginPartner from "../pages/LoginPartner";
import Reels from "../pages/Reels";
import CreateFood from "../pages/CreateFood";
import LandingPage from "../pages/LandingPage";
import PartnerProfile from "../pages/PartnerProfile";
import Saved from "../pages/Saved";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/food-partner/register" element={<RegisterPartner />} />
        <Route path="/food-partner/login" element={<LoginPartner />} />
        <Route path="/food/food-partner/:id" element={<PartnerProfile />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
