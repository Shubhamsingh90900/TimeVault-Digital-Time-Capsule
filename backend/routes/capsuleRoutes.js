import express from "express";
import { createCapsule, getCapsuleById, deleteCapsule, getAllCapsules, updateCapsule  } from "../controllers/capsuleController.js";

const router = express.Router();

router.post("/", createCapsule);
router.get("/", getAllCapsules);
router.get("/:id", getCapsuleById);
router.delete("/:id", deleteCapsule);
router.put("/:id", updateCapsule);
export default router;
