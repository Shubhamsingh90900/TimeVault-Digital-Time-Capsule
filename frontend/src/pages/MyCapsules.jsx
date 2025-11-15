import React, { useEffect, useState } from "react";
import API from "../services/api";
import CapsuleCard from "../components/CapsuleCard";

const MyCapsules = () => {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    const { data } = await API.get("/capsules");
    if (data.success) setCapsules(data.capsules);
  };

  const handleDelete = async (id) => {
    await API.delete(`/capsules/${id}`);
    fetchCapsules();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          color: "gold",
          marginBottom: "30px",
          fontSize: "36px",
          textShadow: "0 0 15px rgba(255,255,255,0.4)",
          fontWeight: "700",
        }}
      >
        📦 Your Time Capsules
      </h1>

      {/* Capsules container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          justifyItems: "center",
        }}
      >
        {capsules.length === 0 ? (
          <p
            style={{
              color: "white",
              fontSize: "20px",
              marginTop: "40px",
              gridColumn: "1 / -1",
              textAlign: "center",
              opacity: "0.9",
            }}
          >
            No Capsules Found 😕  
            <br />Create your first Time Capsule!
          </p>
        ) : (
          capsules.map((capsule) => (
            <CapsuleCard
              key={capsule._id}
              capsule={capsule}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyCapsules;
