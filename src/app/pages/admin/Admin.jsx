import React, { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminLoginApiUrl } from "../../../constants";
import { useTheme } from "../../context/ThemeProvider";

const Admin = () => {
  const navigate = useNavigate();
  const { isDayMode } = useTheme();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    // validation;
    if (!loginData.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      emailError = "Email is invalid";
    }

    if (!loginData.password) {
      passwordError = "Password is required";
    } else if (loginData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long";
    }

    //if there are errors
    if (emailError || passwordError) {
      setLoginData({ ...loginData, emailError, passwordError });
      return false;
    }
    // submit form
    if (loginError) setLoginError("");
    if (loginData.emailError || loginData.passwordError) {
      setLoginData({ ...loginData, emailError: "", passwordError: "" });
    }
    axios
      .post(adminLoginApiUrl, {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          if (
            response.data &&
            response.data.success == true &&
            response.data.token
          ) {
            sessionStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            setLoginData({
              email: "",
              password: "",
              emailError: "",
              passwordError: "",
            });
          } else {
            setLoginError("Login failed. Please try again.");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          setLoginData({
            ...loginData,
            passwordError: "Invalid email or password",
          });
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <div
      className={`min-h-screen ${
        isDayMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
      } transition-colors duration-300`}
    >
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="login-container">
          <div
            className={`login-form ${isDayMode ? "bg-slate-50" : "bg-slate-800"}`}
          >
            <h2
              className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 ${
                isDayMode ? "text-black" : "text-white"
              }`}
            >
              Admin Login
            </h2>
            <form onSubmit={handleForm}>
              <label
                className={`text-lg max-w-3xl ${
                  isDayMode ? "text-slate-500" : "text-slate-400"
                }`}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                value={loginData.email}
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDayMode ? "bg-white text-black" : "bg-slate-700 text-white"
                } placeholder:text-slate-400 ${isDayMode ? "text-black" : "text-white"}`}
                onChange={handleChange}
              />
              {loginData.emailError ? (
                <span className="error-msg">{loginData.emailError}</span>
              ) : null}
              <label
                className={`text-lg max-w-3xl ${
                  isDayMode ? "text-slate-500" : "text-slate-400"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={loginData.password}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                className={`w-full p-2 border border-gray-300 rounded ${
                  isDayMode ? "bg-white text-black" : "bg-slate-700 text-white"
                } placeholder:text-slate-400 ${isDayMode ? "text-black" : "text-white"}`}
                onChange={handleChange}
              />
              {loginData.passwordError ? (
                <span className="error-msg">{loginData.passwordError}</span>
              ) : null}
              <input
                type="submit"
                value="Login"
                className="submit-btn bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleForm}
              />
            </form>

            <span className="error-msg login">
              {loginError ? loginError : null}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
