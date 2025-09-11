import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import { LandingPage } from "./views/LandingPage.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<div>Registro</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
    </div>
  );
}
