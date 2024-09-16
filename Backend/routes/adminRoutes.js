import express from "express";
import {
  createTest,
  getTest,
  getAllTest,
  submitQuiz,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/create", createTest);
router.get("/tests", getAllTest);
router.get(`/test/:id`, getTest);
router.post("/submit-quiz", submitQuiz);

export default router;
