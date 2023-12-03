import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    // api
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    // console.log(json)
    if (json.success) {
      // save suthtoken and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Account Created SuccesFully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mid">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Signup</span>
          <span className="subtitle">Create a To Use iNoteBook</span>
          <div className="form-container">
            <input
              type="text"
              onChange={onChange}
              id="name"
              name="name"
              className="input"
              placeholder="Full Name"
            />
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              className="input"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
              id="password"
              className="input"
              placeholder="Password"
            />
            <input
              type="password"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
              className="input"
              placeholder="Confirm Password"
            />
          </div>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
