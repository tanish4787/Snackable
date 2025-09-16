import React, { useState } from "react";
import { themeVars } from "../themeVars";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/auth/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/reels");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${theme.primary} transition-all duration-700 px-2`}
    >
      <div
        className={`w-full max-w-md sm:p-8 p-4 rounded-2xl ${theme.card} border ${theme.border} shadow-2xl animate-fadeIn`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${theme.accent}`}>
          User Login
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/user/register" className={`${theme.link}`}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
