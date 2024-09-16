import React, { useEffect, useState } from "react";
import service from "../../httpd/service";

const AdminSet = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyLink = (testNumber) => {
    navigator.clipboard.writeText(
      `http://localhost:5173/user/quiz/${testNumber}`
    );
    // alert(`Link copied: http://localhost:5173/test/${testNumber}`);
  };

  const handledelete = async () => {};
  const handleView = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
  };

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await service.get("/admin/tests");
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  return (
    <div>
      <nav className="bg-green-500 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">ExamSet</div>
        <div className="text-white text-lg">Admin Panel</div>
        <a
          href="/admin/createtest"
          className="bg-white text-green-500 px-4 py-2 rounded hover:text-white hover:bg-gray-600"
        >
          Create Test
        </a>
      </nav>
      <div className="p-4">
        {tests.map((test) => (
          <div key={test._id} className="border p-4 mt-4 flex justify-between">
            <h2 className="font-bold">Test Number: {test.testNumber}</h2>
            <div className="space-x-4">
              <button
                onClick={() => handleView(test)}
                className="hover:text-green-500"
              >
                View
              </button>
              <button
                onClick={() => handleCopyLink(test.testNumber)}
                className="hover:text-blue-500"
              >
                Copy the link
              </button>
              <button onClick={handledelete} className="hover:text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedTest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/2 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Test Number: {selectedTest.testNumber}
            </h2>
            {selectedTest.questions.map((question) => (
              <div key={question._id} className="mb-4">
                <h3 className="font-bold">{question.question}</h3>
                <ul className="list-disc pl-5">
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                <p className="font-bold">Answer: {question.answer}</p>
              </div>
            ))}
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSet;
