import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Proceed with the registration process
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dtz2pqiyi/image/upload",
        data
      );

      const { url } = uploadRes.data;

      // Add the profile image URL to the user data
      const newUser = {
        ...info,
        img: url,
      };

      // Send the registration request to the backend
      const res = await axios.post("http://localhost:3003/api/auth/register", newUser);
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Failed to create account. Please try again.");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
      console.log(err);
    }
  };

  return (
    <div className="signupForm">
      <ToastContainer />
      <div className="signup-container">
        <h1>Create Your Booking.com Account</h1>
        <form>
          <div className="formInput">
            <label htmlFor="file">Profile Picture:</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="formInput">
            <label>Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label>Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter your country"
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label>City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter your city"
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <button className="signupButton" onClick={handleClick}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
