import React, { useState } from "react";
import service from "../../httpd/service";

const CreateTest = () => {
  const [numQuestions, setNumQuestions] = useState();
  const [testNumber, setTestNumber] = useState();
  const [questions, setQuestions] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (numQuestions < 1) {
      alert("Number of questions should be greater than 0");
      return;
    }
    setGenerated(true);
    const emptyQuestions = Array.from({ length: numQuestions }, () => ({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    }));
    setQuestions(emptyQuestions);
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("option")[1], 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "answer") {
      updatedQuestions[index].answer = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await service.post("/admin/create", {
        testNumber,
        questions,
      });
      setTestNumber("");
      setNumQuestions();
      setQuestions([]);
      setGenerated(false);
      setLoading(false);
      alert("Test saved successfully!");
    } catch (error) {
      console.error("Error saving test:", error);
      setGenerated(false);
      setLoading(false);
      alert("Failed to save test.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 ">
        <a
          href="/admin"
          className="text-white bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md"
        >
          Back
        </a>
        <h1 className="text-2xl font-bold text-green-600 flex-grow text-center">
          Create a Test
        </h1>
      </div>
      <div className="flex flex-col w-[90%] md:w-[50%] mx-auto">
        <form
          onSubmit={handleGenerate}
          className="bg-white p-6 rounded shadow-lg"
        >
          <input
            type="number"
            value={testNumber}
            disabled={generated}
            onChange={(e) => setTestNumber(e.target.value)}
            placeholder="Enter unique Test Number"
            className="border p-2 mb-2 rounded w-full "
            required
          />
          <input
            type="number"
            value={numQuestions}
            disabled={generated}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            placeholder="Enter number of questions"
            className="border p-2 mb-2 rounded w-full "
            required
          />
          <button
            type="submit"
            className={`bg-green-500 text-white font-semibold py-2 px-4 rounded w-full ${
              generated ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generated}
          >
            Generate Questions
          </button>
        </form>
      </div>

      <div className="mt-8 w-[90%] md:w-[50%] mx-auto">
        <form onSubmit={handleSave}>
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-white p-6 mb-6 border border-green-300 rounded-md"
            >
              <h2 className="font-bold text-lg text-gray-700 mb-1">
                Question {index + 1}
              </h2>
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleInputChange(index, "question", e.target.value)
                }
                placeholder="Enter question"
                className="border p-2 rounded w-full mb-2"
                required
              />
              {q.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      `option${optIndex}`,
                      e.target.value
                    )
                  }
                  placeholder={`Option ${optIndex + 1}`}
                  className="border p-2 rounded w-full mb-2"
                  required
                />
              ))}
              <input
                type="number"
                value={q.answer}
                max={4}
                min={1}
                onChange={(e) =>
                  handleInputChange(index, "answer", e.target.value)
                }
                placeholder="Enter correct option"
                className="border p-2 rounded w-full mb-2"
                required
              />
            </div>
          ))}
          {questions.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className={`bg-blue-500 ${
                  loading ? "bg-gray-500" : ""
                } text-white font-semibold py-2 px-6 rounded`}
              >
                {loading ? "Saving..." : "Save Test"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTest;
