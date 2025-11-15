import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const CapsuleCard = ({ capsule, onDelete }) => {
  const { _id, title, message, unlockDate } = capsule;
  const [timeLeft, setTimeLeft] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const handleDeleteClick = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this capsule?");
  if (!confirmDelete) return;

  try {
    await onDelete(_id); // WAIT for delete to happen
    alert("Capsule deleted successfully ✅");
  } catch (err) {
    alert("Error deleting capsule ❌");
  }
};


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const unlockTime = new Date(unlockDate);
      const diff = unlockTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        try {
          const bytes = CryptoJS.AES.decrypt(message, "secretkey123");
          const originalText = bytes.toString(CryptoJS.enc.Utf8);
          setDecryptedMessage(originalText || "⚠️ Unable to decrypt message");
        } catch (err) {
          setDecryptedMessage("❌ Error decrypting message");
        }
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unlockDate, message]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "320px",
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        color: "white",
        margin: "10px",
        transition: "0.3s",
      }}
    >
      {/* Title */}
      <h3
        style={{
          marginBottom: "10px",
          fontSize: "20px",
          fontWeight: "600",
          color: "gold",
          textShadow: "0 0 6px rgba(255,255,255,0.5)",
        }}
      >
        {title}
      </h3>

      {/* Message Area */}
      {decryptedMessage ? (
        <p
          style={{
            fontSize: "14px",
            color: "#fff",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "rgba(0,0,0,0.2)",
            padding: "10px",
            borderRadius: "6px",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.3)",
          }}
        >
          {decryptedMessage}
        </p>
      ) : (
        <>
          <p
            style={{
              fontSize: "14px",
              color: "#e8e8e8",
              fontStyle: "italic",
              textAlign: "center",
              padding: "10px 0",
            }}
          >
            🔒 Message Locked
          </p>
          {/* <p
            style={{
              textAlign: "center",
              color: "lightgreen",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Unlocks in: {timeLeft || "Calculating..."}
          </p> */}
        </>
      )}

      {/* Unlock Date */}
      {/* <p
        style={{
          fontSize: "13px",
          color: "#d1e0ff",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Unlock Date:{" "}
        <b style={{ color: "#fff" }}>
          {new Date(unlockDate).toLocaleString()}
        </b>
      </p> */}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Link
          to={`/view/${_id}`}
          style={{
            flex: 1,
            textAlign: "center",
            background: "linear-gradient(135deg, #4facfe, #00f2fe)",
            padding: "8px 0",
            borderRadius: "6px",
            textDecoration: "none",
            color: "black",
            fontWeight: "600",
            boxShadow: "0 5px 12px rgba(0,0,0,0.3)",
          }}
        >
          View
        </Link>

        <Link
          to={`/update/${_id}`}
          style={{
            flex: 1,
            textAlign: "center",
            background: "linear-gradient(135deg, #f6d365, #fda085)",
            padding: "8px 0",
            borderRadius: "6px",
            textDecoration: "none",
            color: "black",
            fontWeight: "600",
            boxShadow: "0 5px 12px rgba(0,0,0,0.3)",
          }}
        >
          Edit
        </Link>

       <button
  onClick={handleDeleteClick}
  style={{
    flex: 1,
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "6px 0",
  }}
>
  Delete
</button>

      </div>
    </div>
  );
};

export default CapsuleCard;
