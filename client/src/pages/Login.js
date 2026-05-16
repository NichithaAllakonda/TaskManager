import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

import "./Auth.css";

function Login() {

  const API =
    "https://taskmanager-production-44f4.up.railway.app";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${API}/api/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Invalid Email or Password");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Team Task Manager</h1>

        <p className="subtitle">

          Login to manage projects and tasks

        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">

            Login

          </button>

        </form>

        <p className="bottom-text">

          Don't have an account?

          <Link to="/register">

            Register Here

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;