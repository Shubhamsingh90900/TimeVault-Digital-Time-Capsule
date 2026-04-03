import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import capsuleRoutes from "./routes/capsuleRoutes.js";
import bodyParser from "body-parser";
import AuthRouter from "./routes/AuthRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// MongoDB connect
connectDB();

// Routes
app.use("/api/capsules", capsuleRoutes);
app.use('/auth', AuthRouter)

// Default route
app.get("/", (req, res) => {
  res.send("TimeVault Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
