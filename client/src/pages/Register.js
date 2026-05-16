import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Register() {

  const API =
    "https://taskmanager-production-44f4.up.railway.app";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {

      alert("Please fill all fields");

      return;

    }

    try {

      await axios.post(
        `${API}/api/auth/register`,
        formData
      );

      alert("Registration Successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          Team Task Manager
        </h1>

        <h2 style={styles.subHeading}>
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">
              Select Role
            </option>

            <option value="Admin">
              Admin
            </option>

            <option value="Member">
              Member
            </option>

          </select>

          <button
            type="submit"
            style={styles.button}
          >

            Register

          </button>

        </form>

        <p style={styles.text}>

          Already Registered?

          <Link
            to="/"
            style={styles.link}
          >

            Login Here

          </Link>

        </p>

      </div>

    </div>

  );

}

const styles = {

  container: {

    height: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#f4f7fc"

  },

  card: {

    width: "350px",

    backgroundColor: "#fff",

    padding: "30px",

    borderRadius: "10px",

    boxShadow:
      "0px 0px 10px rgba(0,0,0,0.1)"

  },

  heading: {

    textAlign: "center",

    color: "#2563eb",

    marginBottom: "10px"

  },

  subHeading: {

    textAlign: "center",

    marginBottom: "20px"

  },

  input: {

    width: "100%",

    padding: "12px",

    marginBottom: "15px",

    borderRadius: "5px",

    border: "1px solid #ccc",

    fontSize: "14px"

  },

  button: {

    width: "100%",

    padding: "12px",

    backgroundColor: "#2563eb",

    color: "#fff",

    border: "none",

    borderRadius: "5px",

    cursor: "pointer",

    fontSize: "16px"

  },

  text: {

    textAlign: "center",

    marginTop: "15px"

  },

  link: {

    marginLeft: "5px",

    color: "#2563eb",

    textDecoration: "none",

    fontWeight: "bold"

  }

};

export default Register;