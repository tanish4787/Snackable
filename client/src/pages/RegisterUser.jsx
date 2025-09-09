import React, { useState } from "react";
import { themeVars } from "../themeVars";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/auth/user/register", {
      username,
      email,
      password,
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${theme.primary} transition-all duration-700 px-2`}
    >
      <div
        className={`w-full max-w-md sm:p-8 p-4 rounded-2xl ${theme.card} border ${theme.border} shadow-2xl animate-fadeIn`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${theme.accent}`}>
          User Register
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${theme.input} ${theme.text} ${theme.placeholder}`}
            placeholder="Full Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${theme.input} ${theme.text} ${theme.placeholder}`}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${theme.input} ${theme.text} ${theme.placeholder}`}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-lg mt-2 shadow-md transition-transform duration-300 transform hover:scale-105 ${theme.button}`}
          >
            Register
          </button>
        </form>
        <div className="flex overflow-x-auto flex-col">
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/user/login" className={`${theme.link}`}>
              Login
            </Link>
          </p>

          <p className="mt-6 text-center text-sm">
            Register as Food Partner?{" "}
            <Link to="/food-partner/register" className={`${theme.link}`}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
