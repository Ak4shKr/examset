import Test from "../models/testModel.js";
import User from "../models/userModel.js";

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

    // Create an array to hold the correct answers and the result
    const questionAnswers = [];
    const result = [];

    // Populate the questionAnswers array with the correct answers
    test.questions.forEach((question) => {
      questionAnswers.push({
        questionId: question._id.toString(), // Convert ObjectId to string
        answer: question.answer.toString(), // Ensure the answer is a string
      });
    });

    // Calculate the score and prepare the result
    let score = 0;
    questionAnswers.forEach(({ questionId, answer }) => {
      const userAnswerObj = answers.find((q) => q.questionId === questionId);

      if (userAnswerObj) {
        const userAnswer = userAnswerObj.answer.toString(); // Ensure user answer is a string
        const isCorrect = answer === userAnswer;

        // Increment the score if the answer is correct
        if (isCorrect) {
          score++;
        }

        // Push the result for this question
        result.push({
          questionId,
          correctAnswer: answer,
          userAnswer: userAnswer,
          isCorrect: isCorrect,
        });
      } else {
        // Handle cases where the user's answer is not found in the provided answers
        result.push({
          questionId,
          correctAnswer: answer,
          userAnswer: null,
          isCorrect: false,
        });
      }
    });

    // Send the response with the score and detailed results
    res.status(200).json({ score, result });
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

export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findOne({ testNumber: id });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    await test.deleteOne();
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const saveResult = async (req, res) => {
  try {
    const { name, mobile, testDetails } = req.body;
    const user = await User.findOne({ mobile });
    if (user) {
      user.testDetails.push(testDetails);
      await user.save();
      return res.status(200).json({ message: "Result saved successfully" });
    }
    const newUser = new User({
      name,
      mobile,
      testDetails,
    });
    await newUser.save();
    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
      usersCount: users.length,
      message: "All results fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
