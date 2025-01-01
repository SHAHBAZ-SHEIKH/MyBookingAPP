import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `http://localhost:3003/api/auth/login`,
        credentials,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        },1000);
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginWrapper">
        <h1 className="loginTitle">Welcome Back</h1>
        <p className="loginSubtitle">Sign in to continue to Booking.com</p>
        <div className="loginContainer">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="loginInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="loginInput"
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="loginButton"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <span className="errorMessage">{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
