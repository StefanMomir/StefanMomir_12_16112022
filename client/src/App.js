import React from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <div className="wrapper">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          {/* <---------------------- MODIFICATION AFTER SOUTENANCE () */}
          <Route path="/user" element={<Home />} />
          <Route path="/user/:Id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
