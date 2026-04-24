import { useState } from "react";
import loginSideImage from "../assets/login-side.png";

function LoginPage({ setCurrentUser, setCurrentPage }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login user
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setCurrentUser(data.user);
      setCurrentPage("home");

    } catch (error) {
      setError(error.message);
    }
  };

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setCurrentUser(data.user);
      setCurrentPage("home");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <div style={styles.imagePanel}>
          <img src={loginSideImage} alt="Study Session" style={styles.image} />
        </div>

        <div style={styles.formPanel}>
          <h2 style={styles.title}>Login</h2>

          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>

          <p style={styles.smallText}>Forgot password?</p>
        </div>

        <div style={styles.orCircle}>or</div>

        <div style={styles.formPanel}>
          <h2 style={styles.title}>Create account</h2>

          <form onSubmit={handleRegister} style={styles.form}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>
        </div>
      </div>

      {(error || success) && (
        <div style={styles.messageBox}>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </div>
      )}
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5ebe0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px"
  },

  container: {
    width: "100%",
    maxWidth: "1400px",
    minHeight: "620px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    display: "grid",
    gridTemplateColumns: "1.05fr 1fr 1fr",
    position: "relative",
    overflow: "hidden"
  },

  imagePanel: {
    backgroundColor: "#e3d5ca"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  formPanel: {
    padding: "80px 56px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderLeft: "1px solid #eee2d8"
  },

  title: {
    fontSize: "28px",
    color: "#2f2723",
    marginBottom: "32px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#3a322e",
    marginTop: "8px"
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e3d5ca",
    fontSize: "14px",
    outline: "none",
    marginBottom: "8px"
  },

  button: {
    marginTop: "24px",
    padding: "14px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#d5bdaf",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },

  smallText: {
    marginTop: "18px",
    fontSize: "13px",
    color: "#6b5b52",
    textDecoration: "underline",
    textAlign: "center"
  },

  orCircle: {
    position: "absolute",
    left: "67.3%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    border: "1px solid #e3d5ca",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b5b52",
    fontSize: "13px",
    zIndex: 2
  },

  messageBox: {
    position: "fixed",
    bottom: "24px",
    backgroundColor: "#ffffff",
    padding: "14px 22px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
  },

  error: {
    margin: 0,
    color: "#c2410c"
  },

  success: {
    margin: 0,
    color: "#15803d"
  }
};

export default LoginPage;