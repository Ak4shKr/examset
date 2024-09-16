import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSet from "./components/Admin/AdminSet";
import UserUI from "./components/User/Quiz";
import CreateTest from "./components/Admin/CreateTest";
import NavbarAdmin from "./components/Admin/NavbarAdmin";
import UserInfo from "./components/User/UserInfo";
import Quiz from "./components/User/Quiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminSet />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/user/quiz/:testNumber" element={<Quiz />} />
        <Route path="/admin/createtest" element={<CreateTest />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
