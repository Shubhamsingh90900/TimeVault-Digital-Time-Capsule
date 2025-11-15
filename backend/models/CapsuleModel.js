import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema({
  title: String,
  message: String,
  encryptedData: String,   // actual encrypted content
  unlockDate: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Capsule", capsuleSchema);
