import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/listings/")
      .then((res) => setListings(res.data.listings))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Your one-stop destination for finding the perfect property..</h1>
      <h2>Properties?</h2>
      <h2>Vendors?</h2>
    </div>
  );
}

export default Home;
