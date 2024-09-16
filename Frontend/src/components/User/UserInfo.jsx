import React, { useState } from "react";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  return (
    // userinfo
    <div className="bg-[#b9e4b7] h-[100vh] flex justify-center items-center my-auto">
      <div className="bg-green-500 w-full md:w-[36%] border rounded-md p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-white mb-2">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="bg-[#3232a1] text-white py-2 px-2 rounded-md w-fit m-auto hover:bg-blue-700 hover:border">
          <button>Proceed...</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
