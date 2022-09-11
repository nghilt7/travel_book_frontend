import { Routes, Route } from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "./../components/Auth/Login";
import Register from "./../components/Auth/Register";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default WebRoutes;
