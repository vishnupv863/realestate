import React, { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom"; // ✅ import hook

const RegisterForm = () => {
  const navigate = useNavigate(); // ✅ create navigate instance
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email && !form.phone)
      newErrors.email = "Either email or phone is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      password: form.password,
      confirm_password: form.confirmPassword,
    };

    try {
      await register(payload);
      setMessage("Registration successful!");
      navigate("/properties"); // ✅ redirect to properties page
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      const errorData = error.response?.data;

      if (errorData) {
        // ✅ Show field-based validation messages (e.g. email, phone)
        const firstKey = Object.keys(errorData)[0];
        const firstMessage = Array.isArray(errorData[firstKey])
          ? errorData[firstKey][0]
          : errorData[firstKey];

        setMessage(`${firstKey}: ${firstMessage}`);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      <button type="submit">Register</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
