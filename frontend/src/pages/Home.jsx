import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          padding: "40px 50px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "white",
            marginBottom: "15px",
            fontWeight: "700",
          }}
        >
          Welcome to <span style={{ color: "#ffd700" }}>TimeVault ⏳</span>
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "white",
            maxWidth: "500px",
            margin: "0 auto 25px auto",
            lineHeight: "1.6",
          }}
        >
          Store your memories, notes, messages and unlock them in the future.
          A secure time capsule for your emotions ❤️.
        </p>

        {/* Buttons */}
        <div style={{ marginTop: "25px", display: "flex", gap: "20px", justifyContent: "center" }}>
          <Link
            to="/create"
            style={{
              padding: "12px 25px",
              background: "#ffd700",
              color: "#000",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            ➕ Create Capsule
          </Link>

          <Link
            to="/mycapsules"
            style={{
              padding: "12px 25px",
              background: "white",
              color: "#2575fc",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            📂 My Capsules
          </Link>
        </div>

        {/* Feature Highlights */}
        <div
          style={{
            marginTop: "35px",
            color: "white",
            fontSize: "15px",
            lineHeight: "1.7",
          }}
        >
          <p>🔐 AES-Encrypted Messages</p>
          <p>⏰ Unlock Automatically at Set Date</p>
          <p>💾 Stored Securely in Mongodb Database</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
