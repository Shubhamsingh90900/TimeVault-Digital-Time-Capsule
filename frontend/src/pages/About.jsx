import React from "react";

const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          padding: "35px",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
          color: "white",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "25px",
            color: "gold",
            textShadow: "0 0 12px rgba(255,255,255,0.6)",
          }}
        >
          ✨ About TimeVault
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.8,
            marginBottom: "18px",
            color: "white",
          }}
        >
          <strong>TimeVault</strong> is your personal{" "}
          <strong>Digital Time Capsule</strong> — a place to store your thoughts,
          emotions, goals, and memories for your *future self*.  
          Whether it's a message to open after years or a memory you want to
          relive later, TimeVault keeps everything safe… until the right time.
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.8,
            marginBottom: "18px",
            color: "white",
          }}
        >
          Powered by a sleek <strong>React Frontend</strong> and a secure{" "}
          <strong>Node.js + MongoDB Backend</strong>, every capsule you create is
          encrypted, stored, and unlocked only on your chosen date — making your
          memories timeless and protected.
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.8,
            marginBottom: "18px",
            color: "white",
          }}
        >
          TimeVault is more than an app — it's a futuristic journaling experience
          designed to help you reflect, grow, and preserve your journey.
        </p>

        <p
          style={{
            fontSize: "16px",
            fontStyle: "italic",
            textAlign: "right",
            marginTop: "35px",
            color: "gold",
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          Made with ❤️ by <strong>Team VaultMakers</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
