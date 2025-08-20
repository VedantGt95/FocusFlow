import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";

function Login({setUser}) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
     setUser(result.user)
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoText}>FocusFlow</div>
      </nav>

      {/* Login Section */}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>
            Welcome <br /> to FocusFlow
          </h1>

          <p style={styles.description}>
            FocusFlow helps you manage tasks with clarity and ease. Plan,
            prioritize, and stay productive with a simple and secure task
            manager built for students and professionals.
          </p>

          <button onClick={handleLogin} style={styles.googleBtn}>
            <img
              src="GoogleLogo.png"
              alt="Google Logo"
              style={styles.logo}
            />
            <span style={styles.btnText}>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  navbar: {
    backgroundColor: "#3f51b5",
    padding: "15px 30px",
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    margin: 0,
  },
  logoText: {
    margin: 0,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "80px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "500px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#3f51b5",
    fontWeight: "600",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "24px",
    lineHeight: "1.5",
    maxWidth: "400px",
    marginInline: "auto",
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    color: "#444",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    margin: "0 auto",
  },

  logo: {
    width: "22px",
    height: "22px",
  },
  btnText: {
    fontWeight: "500",
  },
};

export default Login;