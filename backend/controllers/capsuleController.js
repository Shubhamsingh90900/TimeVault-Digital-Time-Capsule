// controllers/capsuleController.js
import Capsule from "../models/CapsuleModel.js";
import CryptoJS from "crypto-js";

/**
 * Use the exact same key as frontend decrypt code:
 * frontend used "secretkey123"
 */
const SECRET_KEY = "secretkey123";

/* Encrypt using CryptoJS so frontend (CryptoJS) can decrypt easily */
const encrypt = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
};

/* Decrypt helper (not used for API responses; kept for utility) */
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Create Capsule
export const createCapsule = async (req, res) => {
  try {
    const { title, message, unlockDate } = req.body;

    if (!title || !message || !unlockDate) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Encrypt message once using CryptoJS (compatible with frontend CryptoJS)
    const encryptedMessage = encrypt(message);

    const newCapsule = await Capsule.create({
      title,
      message: encryptedMessage,
      unlockDate,
    });

    res.status(201).json({ success: true, capsule: newCapsule });
  } catch (error) {
    console.error("Error creating capsule:", error);
    res.status(500).json({ success: false, message: "Error creating capsule" });
  }
};

// Get capsule by id
// NOTE: we return the encrypted message as-is so frontend can decrypt when time arrives
export const getCapsuleById = async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ success: false, message: "Capsule not found" });
    }

    // Return encrypted message; frontend handles decrypt after unlock time
    res.json({
      success: true,
      capsule: {
        _id: capsule._id,
        title: capsule.title,
        message: capsule.message, // encrypted string
        unlockDate: capsule.unlockDate,
      },
    });
  } catch (error) {
    console.error("Error fetching capsule:", error);
    res.status(500).json({ success: false, message: "Error fetching capsule" });
  }
};

// Get all capsules
export const getAllCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find();
    res.json({ success: true, capsules });
  } catch (error) {
    console.error("Error fetching capsules:", error);
    res.status(500).json({ success: false, message: "Error fetching capsules" });
  }
};

// Delete capsule
export const deleteCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findByIdAndDelete(req.params.id);
    if (!capsule) return res.status(404).json({ success: false, message: "Capsule not found" });
    res.json({ success: true, message: "Capsule deleted successfully" });
  } catch (error) {
    console.error("Error deleting capsule:", error);
    res.status(500).json({ success: false, message: "Error deleting capsule" });
  }
};

// Update capsule
export const updateCapsule = async (req, res) => {
  try {
    let { title, message, unlockDate } = req.body;

    // Force unlockDate to local midnight (12:00 AM IST)
    const d = new Date(unlockDate);
    d.setHours(0, 0, 0, 0);

    // Encrypt message only if updated
    const encryptedMessage = message ? encrypt(message) : undefined;

    const updateObj = {
      title,
      unlockDate: d,   // FIXED HERE
    };

    if (encryptedMessage) {
      updateObj.message = encryptedMessage;
    }

    const updated = await Capsule.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );

    res.json({ success: true, capsule: updated });
  } catch (error) {
    console.error("Error updating capsule:", error);
    res.status(500).json({ success: false, message: "Error updating capsule" });
  }
};

