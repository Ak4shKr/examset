import React, { useEffect, useState } from "react";
import service from "../../httpd/service";

const AdminSet = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  // Copy link to clipboard
  const handleCopyLink = (testNumber) => {
    navigator.clipboard.writeText(
      `https://examset-xkvv.vercel.app/user/${testNumber}`
    );
    alert(`Link copied: https://examset-xkvv.vercel.app/user/${testNumber}`);
  };

  const handleDelete = async (testNumber) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this test?"
    );
    if (!confirmation) {
      return;
    }
    const response = await service.delete(`/admin/delete-test/${testNumber}`);
    if (response.status === 200) {
      alert("Test deleted successfully");
      setRefresh(!refresh);
    }
  };

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
        setLoading(true);
        const response = await service.get("/admin/tests");
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-600 sticky top-0 p-4 flex justify-between items-center shadow-md">
        <div className="text-white text-2xl font-bold">ExamSet</div>
        <a
          href="/admin/result"
          className="bg-white border text-green-600 px-4 py-2 rounded font-semibold hover:bg-green-500 hover:text-white hover:border-blue-500 transition duration-300"
        >
          Results
        </a>
        <a
          href="/admin/createtest"
          className="bg-white border text-green-600 px-4 py-2 rounded font-semibold hover:bg-green-500 hover:text-white hover:border-blue-500 transition duration-300"
        >
          Create Test
        </a>
      </nav>

      {/* Main Content */}
      <div className="p-2">
        {loading ? (
          // Loader implementation
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="loader border-t-transparent border-solid rounded-full border-green-600 border-4 h-12 w-12 animate-spin"></div>
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center text-red-600 font-bold">
            No tests available
          </div>
        ) : (
          tests.map((test) => (
            <div
              key={test._id}
              className="bg-white p-4 rounded-lg shadow-md mt-4 flex justify-between items-center"
            >
              <h2 className="font-bold text-lg text-green-700">
                Test Number: {test.testNumber}
              </h2>
              <div className="space-x-4 text-right">
                <button
                  onClick={() => handleView(test)}
                  className="text-green-600 font-semibold hover:text-green-800 transition duration-200"
                >
                  View
                </button>
                <button
                  onClick={() => handleCopyLink(test.testNumber)}
                  className="text-blue-500 font-semibold hover:text-blue-700 transition duration-200"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => handleDelete(test.testNumber)}
                  className="text-red-500 font-semibold hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] md:w-1/2 max-h-screen overflow-y-auto relative">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Test Number: {selectedTest.testNumber}
            </h2>
            {selectedTest.questions.map((question) => (
              <div key={question._id} className="mb-6">
                <h3 className="font-bold text-lg text-gray-800">
                  {question.question}
                </h3>
                <ul className="list-disc pl-5 mt-2">
                  {question.options.map((option, index) => (
                    <li
                      key={index}
                      className={`text-gray-700 ${
                        question.answer == index + 1
                          ? "font-semibold text-green-600"
                          : ""
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                <hr className="border border-green-500 mt-2 opacity-50" />
              </div>
            ))}
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-4 right-4"
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
