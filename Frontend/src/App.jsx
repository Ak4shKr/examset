import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSet from "./components/Admin/AdminSet";
import UserUI from "./components/User/UserUI";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminSet />} />
        <Route path="/user" element={<UserUI />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
