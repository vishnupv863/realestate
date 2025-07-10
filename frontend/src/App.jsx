import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Properties from "./pages/properties";
import Vendors from "./pages/vendors";
import AddPropertyForm from "./components/forms/AddPropertyForm";
import Register from "./pages/auth/Register";

function App() {
  useEffect(() => {
    // Fetch CSRF token when app loads
    fetch("http://127.0.0.1:8000/auth/csrf/", {
      credentials: "include",
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/add-properties" element={<AddPropertyForm />} />
        <Route path="/register" element={<Register />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
