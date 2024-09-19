import express from "express";
import {
  createTest,
  getTest,
  getAllTest,
  submitQuiz,
  deleteTest,
  saveResult,
  getAllResults,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/create", createTest);
router.get("/tests", getAllTest);
router.get(`/test/:id`, getTest);
router.post("/submit-quiz", submitQuiz);
router.delete("/delete-test/:id", deleteTest);
router.post("/save-result", saveResult);
router.get("/results", getAllResults);

export default router;
