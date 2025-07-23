import { Link, Navigate } from "react-router-dom";
import useSessionCheck from "../../hooks/useSessionCheck";

function Vendors() {
  const isAuthenticated = useSessionCheck();

  if (isAuthenticated === null) return <p>Checking session...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div>
      <h1>Welcome Mr:Vendors</h1>
      <Link to="/submit-property">Add new property</Link> <br />
      <Link to="/uploads">Get your uploads</Link>
      <br />
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Vendors;
