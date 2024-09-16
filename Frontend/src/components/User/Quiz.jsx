import React, { useState, useEffect } from "react";
import service from "../../httpd/service";
import { useParams } from "react-router-dom";

const Quiz = ({}) => {
  const [test, setTest] = useState(null); // To store fetched test data
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const { testNumber } = useParams();

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

  // Handle user selecting an answer
  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

  // Submit the quiz and evaluate the result
  const handleSubmitQuiz = async () => {
    // Prepare user answers
    const quizAnswers = Object.keys(userAnswers).map((questionId) => ({
      questionId,
      answer: userAnswers[questionId],
    }));

    try {
      const response = await service.post("/admin/submit-quiz", {
        testNumber,
        answers: quizAnswers,
      });
      // Assuming the response includes the correct score
      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Quiz</h1>
      {test ? (
        <>
          <div className="quiz">
            {test.questions.map((q, index) => (
              <div key={q._id} className="mb-6">
                <p className="font-semibold">
                  {index + 1}. {q.question}
                </p>
                <div className="options">
                  {q.options.map((option, optIndex) => (
                    <label key={optIndex} className="block">
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        value={option}
                        onChange={() => handleAnswerChange(q._id, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitQuiz}
            className="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            Submit Quiz
          </button>

          {score !== null && (
            <div className="mt-6">
              <h2 className="text-lg font-bold">
                You scored {score} out of {test.questions.length}.
              </h2>
            </div>
          )}
        </>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default Quiz;
