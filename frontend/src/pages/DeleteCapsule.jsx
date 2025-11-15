import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteCapsule = () => {
  const [capsules, setCapsules] = useState([]);

  const fetchCapsules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/capsules");
      setCapsules(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/capsules/${id}`);
      fetchCapsules();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Delete Capsule</h2>
      {capsules.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h4>{c.title}</h4>
          <p>{c.content}</p>
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteCapsule;
