import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateCapsule from "./pages/CreateCapsule";
import MyCapsules from "./pages/MyCapsules";
import ViewCapsule from "./pages/ViewCapsule";
import DeleteCapsule from "./pages/DeleteCapsule";
import About from "./pages/About";
import UpdateCapsule from "./pages/UpdateCapsule";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCapsule />} />
          <Route path="/mycapsules" element={<MyCapsules />} />
          <Route path="/view/:id" element={<ViewCapsule />} />
          <Route path="/about" element={<About />} />
          <Route path="/delete" element={<DeleteCapsule/>} />
          <Route path="/update/:id" element={<UpdateCapsule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
