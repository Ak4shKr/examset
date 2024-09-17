import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const { testNumber } = useParams();

  const handleSubmit = () => {
    if (name === "" || mobile === "") {
      alert("Please fill the form");
      return;
    }
    console.log(name, mobile);
    // Storing the values in sessionStorage
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("mobile", mobile);
    alert("User info saved successfully");
    navigate(`/user/quiz/${testNumber}`);
    setName("");
    setMobile("");
  };

  return (
    <div className="bg-gray-100 h-[100vh] flex justify-center items-center my-auto">
      <div className="bg-blue-500 w-[95%] md:w-[36%] border rounded-md p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-black font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-2 rounded-md w-full border-gray-500 "
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-black font-semibold mb-2"
          >
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="p-2 border-2 rounded-md w-full border-gray-500"
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="bg-[#36c260] text-gray-100 font-semibold py-2 px-2 rounded-md w-fit m-auto hover:bg-blue-700 hover:border">
          <button onClick={handleSubmit}>Proceed...</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
