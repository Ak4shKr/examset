import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const testSchema = new mongoose.Schema({
  testNumber: {
    type: Number,
    required: true,
  },
  questions: [questionSchema],
});

const Test = mongoose.model("Test", testSchema);
export default Test;
