import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  testDetails: [
    {
      testNumber: { type: Number, required: true },
      score: { type: Number, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
