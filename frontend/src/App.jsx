import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Properties from "./pages/Properties/Properties";
import Vendors from "./pages/Vendors/Vendors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/vendors" element={<Vendors />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
