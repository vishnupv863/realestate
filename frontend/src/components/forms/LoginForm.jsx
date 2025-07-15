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
    setError(null); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchCSRFToken();
      const res = await login(form);
      console.log("Login success:", res);
      navigate("/properties"); // redirect to properties page on success
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="login"
        placeholder="Email or Phone"
        value={form.login}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
