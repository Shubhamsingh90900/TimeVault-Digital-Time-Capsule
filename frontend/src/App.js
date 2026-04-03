import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateCapsule from "./pages/CreateCapsule";
import MyCapsules from "./pages/MyCapsules";
import ViewCapsule from "./pages/ViewCapsule";
import DeleteCapsule from "./pages/DeleteCapsule";
import About from "./pages/About";
import UpdateCapsule from "./pages/UpdateCapsule";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

function App() {

  const isAuthenticated = localStorage.getItem("token");

  return (
    <>
      {isAuthenticated && <Navbar />}

      <div className="container">
        <Routes>

          {/* Default Route */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Home /> : <Navigate to="/signup" />
            } 
          />

          {/* Auth Pages */}
          <Route 
            path="/signup" 
            element={
              !isAuthenticated ? <Signup /> : <Navigate to="/" />
            } 
          />

          <Route 
            path="/login" 
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/" />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/create" 
            element={
              isAuthenticated ? <CreateCapsule /> : <Navigate to="/login" />
            } 
          />

          <Route 
            path="/mycapsules" 
            element={
              isAuthenticated ? <MyCapsules /> : <Navigate to="/login" />
            } 
          />

          <Route 
            path="/view/:id" 
            element={
              isAuthenticated ? <ViewCapsule /> : <Navigate to="/login" />
            } 
          />

          <Route 
            path="/update/:id" 
            element={
              isAuthenticated ? <UpdateCapsule /> : <Navigate to="/login" />
            } 
          />

          <Route 
            path="/delete" 
            element={
              isAuthenticated ? <DeleteCapsule /> : <Navigate to="/login" />
            } 
          />

          <Route 
            path="/about" 
            element={
              isAuthenticated ? <About /> : <Navigate to="/login" />
            } 
          />

        </Routes>
      </div>
    </>
  );
}

export default App;