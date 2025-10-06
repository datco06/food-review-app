import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Foods from "../pages/Foods.jsx";
import Drinks from "../pages/Drinks.jsx";
import Snacks from "../pages/Snacks.jsx";
import Statistics from "../pages/Statistics.jsx";
import SpotDetail from "../pages/SpotDetail.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="foods" element={<Foods />} />
        <Route path="drinks" element={<Drinks />} />
        <Route path="snacks" element={<Snacks />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="spot/:category/:spotId" element={<SpotDetail />} />
      </Route>
    </Routes>
  );
}
