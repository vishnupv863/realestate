import LoginForm from "../../components/forms/LoginForm";
import { login } from "../../services/authService";

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

function Login() {
  const handleLogin = async (formData) => {
    try {
      const response = await login({
        login: formData.username,
        password: formData.password,
      });
      alert("Login successful!");
      console.log(response);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}

export default Login;
