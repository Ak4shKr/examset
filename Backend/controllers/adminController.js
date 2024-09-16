import Test from "../models/testModel.js";

export const createTest = async (req, res) => {
  try {
    const { testNumber, questions } = req.body;
    const existingTest = await Test.findOne({ testNumber });
    if (existingTest) {
      return res.status(400).json({ message: "Test already exists" });
    }
    const test = new Test({
      testNumber,
      questions,
    });
    await test.save();
    res.status(201).json({ message: "Test created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};