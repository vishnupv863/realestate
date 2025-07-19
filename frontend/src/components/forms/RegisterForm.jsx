import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import GoogleLoginButton from "../../components/auth/GoogleLoginButton";
import useSessionCheck from "../../hooks/useSessionCheck";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  // Run session check on mount, set loading to false when done
  useSessionCheck(() => setCheckingSession(false));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirmPassword, // ✅ underscore
      });
      navigate("/properties");
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        const errors = Object.values(errorData).flat().join(" ");
        setMessage(errors || "Registration failed.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  if (checkingSession) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Register</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <hr />

      <GoogleLoginButton />

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
