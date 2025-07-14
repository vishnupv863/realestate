import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to home or login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
