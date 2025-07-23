import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h1>Your one-stop destination for finding the perfect property..</h1>
      <Link to="/submit-property">Properties?</Link>
      <br />
      <Link to="/vendors">Vendors?</Link>
      <br />
    </div>
  );
}

export default Home;
