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

export const getTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findOne({ testNumber: id });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
