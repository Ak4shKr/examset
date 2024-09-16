import React from "react";

const NavbarAdmin = () => {
  return (
    <div>
      <nav className="bg-green-500 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">ExamSet</div>
        <div className="text-white text-lg">Admin Panel</div>
        <a
          href="/admin/createtest"
          className="bg-white text-green-500 px-4 py-2 rounded"
        >
          Create Test
        </a>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
