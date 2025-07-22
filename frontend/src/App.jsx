import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Properties from "./pages/properties";
import Vendors from "./pages/vendors";
import AddPropertyForm from "./components/forms/AddPropertyForm";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login"; // ✅ import your Login page
import SubmitProperty from "./pages/SubmitProperty"; // ✅ import your SubmitProperty page

import { fetchCSRFToken } from "./utils/csrf"; // ✅ import your helper

function App() {
  useEffect(() => {
    fetchCSRFToken(); // ✅ request CSRF cookie on app load
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/add-properties" element={<AddPropertyForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit-property" element={<SubmitProperty />} />
        {/* ✅ add route for SubmitProperty */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
