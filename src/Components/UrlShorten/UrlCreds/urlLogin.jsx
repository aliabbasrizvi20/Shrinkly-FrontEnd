import { useState } from "react";
import "./urlLogin.css";
import axiosClient from "../../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

export default function UrlLogin() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const nav = useNavigate();

  const handleUrlLoginSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(`/user/login`, {
        email: loginEmail,
        password: loginPassword,
      })
      .then((res) => {
        if (res.data.success === true) {
          setLoginModal(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          nav("/");
        } else {
          setLoginModal(res.data.message);
        }
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message || "Network error. Server not reachable.";
        setLoginModal(msg);
      });
  };
  const onUrlEmailHandleChange = (e) => {
    setLoginEmail(e.target.value);
  };
  const onUrlPasswordHandleChange = (e) => {
    setLoginPassword(e.target.value);
  };
  return (
    <>
      <div className="url-login-container">
        <div className="url-logging">
          <form onSubmit={handleUrlLoginSubmit}>
            <h3>Login</h3>
            <input
              type="text"
              name="email"
              id=""
              placeholder="Enter Your Email "
              onChange={onUrlEmailHandleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter Your Password"
              onChange={onUrlPasswordHandleChange}
            />
            <br />
            <button type="submit">Login</button>
          </form>
          <p>
            Haven't created an account?{" "}
            <Link to="/urlShorter/register">Register Now</Link>{" "}
          </p>
          <h6>{loginModal}</h6>
        </div>
      </div>
    </>
  );
}
