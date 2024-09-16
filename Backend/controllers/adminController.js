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

    // Remove the answer field from each question
    const questionsWithoutAnswers = test.questions.map((question) => {
      const { answer, ...questionWithoutAnswer } = question.toObject();
      return questionWithoutAnswer;
    });

    res.status(200).json({
      questions: questionsWithoutAnswers,
      testNumber: test.testNumber,
      _id: test._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { testNumber, answers } = req.body;

    // Fetch the test from the database
    const test = await Test.findOne({ testNumber });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Calculate the score
    let score = 0;
    answers.forEach(({ questionId, answer }) => {
      const question = test.questions.find(
        (q) => q._id.toString() === questionId
      );
      if (question && question.answer === answer) {
        score++;
      }
    });

    res.status(200).json({ score });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTest = async (req, res) => {
  try {
    const tests = await Test.find();
    console.log(tests.length);
    // for (let i = 0; i < tests.length; i++) {
    //   console.log(tests[i].testNumber);
    // }
    res.status(200).json({ tests, message: "All tests fetched successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
