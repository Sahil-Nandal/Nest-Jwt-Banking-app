import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login Successful");
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="loginDiv">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2 className="logo AppHeading">NestJs banking Application</h2>
        <h2 className="logo">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login" type="submit">Login</button>
        <hr></hr>
        <p>Don't have an account?</p>
      <button className="create-account" onClick={() => navigate("/register")}>Register</button>
      </form>
      
    </div>
  );
};

export default Login;
