import React, { useState } from "react";
import API from "../services/api";

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Set unlock date to local midnight
      const localMidnight = new Date(unlockDate);
      localMidnight.setHours(0, 0, 0, 0);

      const newCapsule = {
        title,
        message,
        unlockDate: localMidnight,
      };

      const res = await API.post("/capsules", newCapsule);

      if (res.data.success) {
        alert("🎉 Capsule Created Successfully!");
      } else {
        alert("⚠️ Failed to create capsule!");
      }

      setTitle("");
      setMessage("");
      setUnlockDate("");
    } catch (err) {
      console.error("Error creating capsule:", err);
      alert("Error creating capsule. Check console for errors.");
    } finally {
      setLoading(false);
    }
  };

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
          width: "450px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#ffd700",
            fontSize: "32px",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          ✨ Create Your Capsule
        </h2>

        <form style={{ marginRight: "16px" }} onSubmit={handleSubmit}>
          {/* Title */}
          <label style={{ fontSize: "16px", fontWeight: "600" }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.8)",
              fontSize: "16px",
            }}
          />

          {/* Message */}
          <label style={{ fontSize: "16px", fontWeight: "600" }}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.8)",
              fontSize: "16px",
            }}
          />

          {/* Unlock Date */}
          <label style={{ fontSize: "16px", fontWeight: "600" }}>
            Unlock Date
          </label>
          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.8)",
              fontSize: "16px",
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "50%",
              padding: "12px",
              background: loading ? "#999" : "#ffd700",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "18px",
              fontWeight: "700",
              marginLeft: "115px",
            }}
          >
            {loading ? "Saving..." : "Save Capsule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
