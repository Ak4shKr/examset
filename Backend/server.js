import express from "express";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URI;

const app = express();
app.use(
  cors({
    origin: "*", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/admin", adminRoutes);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
