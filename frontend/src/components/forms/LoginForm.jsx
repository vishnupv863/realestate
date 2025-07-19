import { useState } from "react";
import useSessionCheck from "../../hooks/useSessionCheck";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { fetchCSRFToken } from "../../utils/csrf";
import GoogleLoginButton from "../auth/GoogleLoginButton";

const LoginForm = () => {
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  // Run session check on mount, set loading to false when done
  useSessionCheck(() => setCheckingSession(false));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchCSRFToken();
      await login(form);
      navigate("/properties");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  if (checkingSession) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            name="login"
            value={form.login}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <hr />
      <h3>Or sign up with Google</h3>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginForm;
