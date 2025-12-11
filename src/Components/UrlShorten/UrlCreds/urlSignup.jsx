import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./urlsignup.css";

export default function UrlSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpModal, setSignUpModal] = useState(false);
  const onHandleUrlChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(`/user/register`, formData)
      .then((res) => {
        if (res.data.success === true) {
          setSignUpModal(res.data.message);
        } else {
          setSignUpModal(res.data.message);
        }
      })

      .catch((err) => {
        const msgs =
          err.response?.data?.message || "Network error. Server not reachable.";
        setSignUpModal(msgs);
      });
  };

  return (
    <>
      <div className="Url-register-wrapper">
        <div className="Url-register">
          <h4>Registration Form</h4>
          <form onSubmit={handleUrlSubmit}>
            <input
              type="text"
              name="name"
              id=""
              placeholder="Enter Your Name "
              onChange={onHandleUrlChange}
            />
            <br />
            <input
              type="text"
              name="email"
              id=""
              placeholder="Enter Your Email "
              onChange={onHandleUrlChange}
            />
            <br />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter Your Password"
              onChange={onHandleUrlChange}
            />
            <br />
            <button type="submit">Register</button>
          </form>
          <p>
            Already Registered? <Link to="/urlShorter/login">Login</Link>{" "}
          </p>
          <h6>{signUpModal}</h6>
        </div>
      </div>
    </>
  );
}
