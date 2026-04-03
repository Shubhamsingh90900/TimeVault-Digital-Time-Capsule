import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// import {FiLogOut} from "react-icons/fi";

const Navbar = () => {

 
  return (
    <nav className="navbar">
      <h1 className="logo">⏳ TimeVault</h1>

      <div className="nav-links">

       
          <>
            <Link to="/">Home</Link>
            <Link to="/create">Create Capsule</Link>
            <Link to="/mycapsules">My Capsules</Link>
            <Link to="/about">About</Link>
            

           
          </>
        

  

      </div>
    </nav>
  );
};

export default Navbar;
