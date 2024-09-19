import React, { useState, useEffect } from "react";
import service from "../../httpd/service.js";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch results when the component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await service.get("/admin/results");
        setResults(response.data.users);
        console.log(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-2">
      <div className="flex items-center mb-4 p-2 bg-gray-100 w-full">
        <a
          href="/admin"
          className="text-white bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md"
        >
          Back
        </a>
        <h1 className="text-2xl font-bold text-green-600 mx-auto">
          Test Results
        </h1>
      </div>
      {loading ? (
        <div className="text-center text-lg text-gray-600 font-semibold">
          Loading...
        </div>
      ) : results.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          {results.map((result, index) => (
            <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg shadow">
              <p className="font-semibold text-lg">Name: {result.name}</p>
              <p className="font-semibold text-md">Mobile: {result.mobile}</p>
              {result.testDetails.map((testDetail, i) => (
                <div
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-gray-100 mb-1" : "bg-gray-200"
                  } p-2 rounded-lg mb-1`}
                >
                  <p>Test Number: {testDetail.testNumber}</p>
                  <p>Score: {testDetail.score}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-red-600 font-semibold">
          No tests available
        </div>
      )}
    </div>
  );
};

export default Results;
