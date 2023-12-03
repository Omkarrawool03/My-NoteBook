import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // api
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json)
    if (json.success) {
      // save suthtoken and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in SuccesFully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="mid">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Login</span>
          <span className="subtitle">Login To Continue to iNoteBook</span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              id="email"
              value={credentials.email}
              onChange={onChange}
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <input
              type="password"
              className="input"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
