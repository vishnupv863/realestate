import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Vendors from "./pages/vendors";
import AddPropertyForm from "./components/forms/AddPropertyForm";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login"; // ✅ import your Login page
import SubmitProperty from "./components/forms/SubmitProperty"; // ✅ import your SubmitProperty page
import { fetchCSRFToken } from "./utils/csrf"; // ✅ import your helper
import LogoutForm from "./components/forms/LogoutForm"; // ✅ import your LogoutButton component

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
        <Route path="/logout" element={<LogoutForm />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
