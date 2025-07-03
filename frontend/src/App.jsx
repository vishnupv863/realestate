import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Properties from "./pages/properties";
import Vendors from "./pages/vendors";
import AddPropertyForm from "./components/forms/AddPropertyForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/add-properties" element={<AddPropertyForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
