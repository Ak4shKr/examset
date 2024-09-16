import express from "express";
import { createTest, getTest } from "../controllers/adminController.js";
const router = express.Router();

router.post("/create", createTest);
router.get(`/test/:id`, getTest);

export default router;
