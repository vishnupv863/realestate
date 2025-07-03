import { Link } from "react-router-dom";
function Vendors() {
  return (
    <div>
      <h1>Welcome Mr:Vendors</h1>
      <Link to="/add-properties">Add new property</Link> <br />
      <Link to="/uploads">Get your uploads</Link>
    </div>
  );
}

export default Vendors;
