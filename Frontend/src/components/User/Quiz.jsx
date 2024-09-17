import React, { useState, useEffect } from "react";
import service from "../../httpd/service";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";

const Quiz = () => {
  const [test, setTest] = useState(null); // To store fetched test data
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]); // For storing feedback from the backend
  const { testNumber } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const name = sessionStorage.getItem("name");
  const mobile = sessionStorage.getItem("mobile");

  // Fetch the test data when component mounts
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await service.get(`/admin/test/${testNumber}`);
        setTest(response.data); // Save test data in state
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };

    fetchTest();
  }, [testNumber]);

  // Handle user selecting an answer (option number is passed instead of text)
  const handleAnswerChange = (questionId, optionNumber) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionNumber,
    });
  };

  // Submit the quiz and evaluate the result
  const handleSubmitQuiz = async () => {
    const quizAnswers = Object.keys(userAnswers).map((questionId) => ({
      questionId,
      answer: userAnswers[questionId], // Option number
    }));

    try {
      const response = await service.post("/admin/submit-quiz", {
        testNumber,
        answers: quizAnswers,
      });
      setSubmitted(true);
      setScore(response.data.score);
      setFeedback(response.data.result); // Store feedback from the backend
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }

    // try {
    //   const response = await service.post("/admin/user-info", {
    //     name,
    //     mobile,
    //     testDetails: {
    //       testNumber,
    //       score,
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error submitting quiz:", error);
    // }
  };

  if (!name || !mobile) {
    return <UserInfo />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        TestNumber: {testNumber}
      </h1>

      {test ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          {test.questions.map((q, index) => {
            const feedbackForQuestion = feedback.find(
              (f) => f.questionId === q._id.toString()
            );

            return (
              <div key={q._id} className={`mb-6`}>
                <p className="font-semibold text-lg">
                  {index + 1}. {q.question}
                </p>
                <div className="mt-3 space-y-2">
                  {q.options.map((option, optIndex) => {
                    // Determine classes based on feedback
                    let optionClass = "";
                    if (submitted) {
                      if (feedbackForQuestion) {
                        if (
                          optIndex + 1 ===
                          parseInt(feedbackForQuestion.correctAnswer)
                        ) {
                          optionClass = "bg-green-200"; // Correct answer
                        } else if (
                          optIndex + 1 ===
                          parseInt(feedbackForQuestion.userAnswer)
                        ) {
                          optionClass = "bg-red-200"; // User's wrong answer
                        } else if (feedbackForQuestion.userAnswer === null) {
                          // User did not answer
                          optionClass = "bg-gray-200"; // Neutral color
                        }
                      } else {
                        optionClass = "bg-gray-200"; // Neutral color if no feedback
                      }
                    }

                    return (
                      <label
                        key={optIndex}
                        className={`block p-2 ${optionClass}`}
                      >
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          value={optIndex + 1} // Using option number here
                          disabled={submitted}
                          onChange={() =>
                            handleAnswerChange(q._id, optIndex + 1)
                          }
                          className="mr-2"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                <hr className="border border-blue-200" />
              </div>
            );
          })}

          <button
            onClick={handleSubmitQuiz}
            className={`w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg mt-4 ${
              submitted
                ? "disabled bg-gray-600 cursor-none"
                : "hover:bg-blue-600"
            }`}
          >
            Submit Quiz
          </button>

          {score !== null && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-blue-600">
                You scored {score} out of {test.questions.length}!
              </h2>
              <p className="text-gray-700 mt-2">
                Great job! Keep practicing to improve your score.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-500">Loading quiz...</p>
      )}
    </div>
  );
};

export default Quiz;
