import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const UpdateCapsule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [capsule, setCapsule] = useState({
    title: "",
    message: "",
    unlockDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing capsule
  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const { data } = await API.get(`/capsules/${id}`);
        if (data.success) {
          setCapsule({
            title: data.capsule.title,
            message: data.capsule.message,
            unlockDate: data.capsule.unlockDate.slice(0, 10),
          });
        }
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Error loading capsule");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id]);

  const handleChange = (e) => {
    setCapsule({ ...capsule, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/capsules/${id}`, capsule);
      if (data.success) {
        alert("✔ Capsule updated successfully!");
        navigate("/mycapsules");
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error updating capsule");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px", color: "white", fontSize: "20px" }}>
        Loading Capsule...
      </p>
    );

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
          maxWidth: "550px",
          padding: "30px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "gold",
            fontSize: "28px",
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          ✏️ Edit Time Capsule
        </h2>

        {error && (
          <p style={{ color: "#ff6b6b", textAlign: "center", fontWeight: "bold" }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleUpdate}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={capsule.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Enter Message"
            rows="5"
            value={capsule.message}
            onChange={handleChange}
            required
            style={textareaStyle}
          />

          {/* Date */}
          <input
            type="date"
            name="unlockDate"
            value={capsule.unlockDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              padding: "12px",
              borderRadius: "10px",
              color: "black",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              marginTop: "10px",
            }}
          >
            💾 Update Capsule
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  outline: "none",
  fontSize: "15px",
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  outline: "none",
  fontSize: "15px",
  minHeight: "120px",
};

export default UpdateCapsule;
