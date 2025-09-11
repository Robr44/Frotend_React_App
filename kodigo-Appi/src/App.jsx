import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import { LandingPage } from "./views/LandingPage.jsx";
import { Register } from "./views/Register.jsx";
import { Dashboard } from "./views/Dashboard.jsx";
import { Login } from "./views/Login.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </div>
  );
}
