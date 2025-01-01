import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const loginHandler = async (dispatch, credentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`http://localhost:3003/api/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log("res",res.data);
      toast.success("Login successful");
      setTimeout(()=>{
        navigate("/");
      },2000)
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="login-container">
        <h1>Login to Booking.com</h1>
        <p>Enter your credentials to access your account</p>
        <div className="input-container">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="login-btn"
          disabled={loading}
          onClick={() => loginHandler(dispatch, credentials)}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <span className="error">{error.message}</span>}
        <div className="signup-prompt">
          Don't have an account? <a href="/signup">Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
