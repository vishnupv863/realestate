import { useEffect, useState } from "react";
import axios from "axios";

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
      <h2>Listings</h2>
      <ul>
        {listings.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
