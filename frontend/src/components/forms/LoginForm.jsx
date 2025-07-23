import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { fetchCSRFToken } from "../../utils/csrf";

const LoginForm = () => {
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchCSRFToken();
      await login(form);
      navigate("/vendors");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

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
    </div>
  );
};

export default LoginForm;
