import React, { useState } from "react";
import service from "../../httpd/service";

const CreateTest = () => {
  const [numQuestions, setNumQuestions] = useState(""); // To store number of questions
  const [testNumber, setTestNumber] = useState(""); // To store the test number
  const [questions, setquestions] = useState([]); // To store the questions and their options

  const handleGenerate = () => {
    if (
      testNumber === undefined ||
      testNumber === "" ||
      numQuestions === undefined ||
      numQuestions === 0
    ) {
      window.alert("Please enter a valid test number and number of questions");
      return;
    }
    // Clear the existing questions and generate new ones based on input number
    const emptyQuestions = Array.from({ length: parseInt(numQuestions) }).map(
      () => ({
        question: "",
        options: ["", "", "", ""],
        answer: "",
      })
    );
    setquestions(emptyQuestions);
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
    setquestions(updatedQuestions);
  };

  const handleSave = () => {
    console.log(testNumber); // Log or send the test number to a backend
    console.log(questions); // Log or send the questions to a backend
    // call backend
    service
      .post("/admin/create", {
        testNumber,
        questions,
      })
      .then((res) => {
        if (res.status === 201) {
          // Clear all input fields by resetting state
          setTestNumber(" ");
          setNumQuestions("");
          setquestions([]);

          // Show success message
          window.alert("Test successfully created!");
          console.log("Test successfully created");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <h2 className="font-semibold text-xl text-green-500 flex justify-center mt-3">
        Create Your Test Here!
      </h2>
      {/* Input for number of questions */}
      <div className="flex flex-col w-[90%] md:w-[60%] mx-auto justify-center mt-4">
        <input
          type="text"
          onChange={(e) => setTestNumber(e.target.value)}
          placeholder="Enter unique TestNumber..."
          className="border p-2 mr-2 my-2"
        />
        <input
          type="text"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          placeholder="Enter number of questions..."
          className="border p-2 mr-2"
        />
        <button
          onClick={handleGenerate}
          className="bg-green-500 text-white px-4 my-2 py-2 rounded"
        >
          Generate
        </button>
      </div>

      {/* Render generated question cards */}
      <div className="mt-6 w-[90%] md:w-[60%] mx-auto">
        {questions.map((q, index) => (
          <div key={index} className="border p-4 mb-4">
            <h2 className="font-bold">Question {index + 1}</h2>
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleInputChange(index, "question", e.target.value)
              }
              placeholder="Enter question"
              className="border p-2 w-full mb-2"
            />
            <div className="flex flex-col mb-2">
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
                  className="border p-2 mb-1"
                />
              ))}
            </div>
            <input
              type="text"
              value={q.answer}
              onChange={(e) =>
                handleInputChange(index, "answer", e.target.value)
              }
              placeholder="Enter correct answer"
              className="border p-2 w-full"
            />
          </div>
        ))}
      </div>

      {/* Save button */}
      {questions.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Test
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateTest;
