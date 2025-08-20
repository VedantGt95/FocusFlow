
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "'Poppins', sans-serif" }}>
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for does not exist or an error occurred.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#3f51b5",
          color: "white",
          marginTop: "20px",
        }}
      >
        Go to Login
      </button>
    </div>
  );
}

export default ErrorPage;
