import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const ViewCapsule = () => {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const navigate = useNavigate();

  const SECRET_KEY = "secretkey123";

  // Fetch capsule
  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const { data } = await API.get(`/capsules/${id}`);
        if (data.success) {
          setCapsule(data.capsule);
          setError("");
        } else {
          setError("Capsule not found");
        }
      } catch (err) {
        setError("Error fetching capsule");
      } finally {
        setLoading(false);
      }
    };
    fetchCapsule();
  }, [id]);

  // Countdown + Decrypt logic
  useEffect(() => {
    if (!capsule) return;

    const unlockTime = new Date(capsule.unlockDate.split("/").reverse().join("-")).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = unlockTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        try {
          const bytes = CryptoJS.AES.decrypt(capsule.message, SECRET_KEY);
          const originalText = bytes.toString(CryptoJS.enc.Utf8);
          setDecryptedMessage(originalText || "Unable to decrypt message");
          setTimeLeft("Unlocked 🎉");
        } catch (err) {
          setDecryptedMessage("Unable to decrypt message");
        }
      } else {
        const days = Math.floor(diff/(1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${days}d ${hours}h ${minutes}m ${seconds}$` 
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  if (loading)
    return (
      <h3 style={{ textAlign: "center", marginTop: "80px", color: "white" }}>
        Loading Capsule...
      </h3>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <h2>{error}</h2>
        <button
          onClick={() => navigate("/all-capsules")}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            color: "white",
            background: "#ff4d4d",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(14px)",
          padding: "30px",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "420px",
          color: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <h2 style={{ color: "gold", marginBottom: "10px" }}>🎁 Capsule Details</h2>

        <h3 style={{ marginTop: "10px", color: "#fff" }}>{capsule.title}</h3>

        <p style={{ fontSize: "15px", opacity: "0.9" }}>
          <strong>Unlock Date:</strong>{" "}
          {new Date(capsule.unlockDate).toLocaleString()}
        </p>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {timeLeft !== "Unlocked 🎉" ? (
          <p style={{ fontSize: "20px", color: "yellow" }}>
            ⏳ Unlocks in: <b>{timeLeft}</b>
          </p>
        ) : (
          <p
            style={{
              marginTop: "10px",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              fontSize: "16px",
              color: "#fff",
              overflow :"hidden",
              maxWidth:"100%",
              wordWrap:"break-word"
            }}
          >
            {decryptedMessage}
          </p>
        )}

        <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <button
          onClick={() => navigate(`/update/${capsule._id}`)}
          style={{
            background: "gold",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ✏️ Edit Capsule
        </button>
      </div>
    </div>
  );
};

export default ViewCapsule;
