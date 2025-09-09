import React from "react";
import { themeVars } from "../themeVars";
import { Link } from "react-router-dom";

const RegisterPartner = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${theme.primary} transition-all duration-700 px-2`}
    >

        
      <div
        className={`w-full max-w-md sm:p-8 p-4 rounded-2xl ${theme.card} border ${theme.border} shadow-2xl animate-fadeIn`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${theme.accent}`}>
          Food Partner Register
        </h2>
        <form className="space-y-5">
          <input
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${theme.input} ${theme.text} ${theme.placeholder}`}
            placeholder="Restaurant Name"
          />
          <input
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${theme.input} ${theme.text} ${theme.placeholder}`}
            placeholder="Email"
          />
          <input
            type="password"
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${theme.input} ${theme.text} ${theme.placeholder}`}
            placeholder="Password"
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-lg mt-2 shadow-md transition-transform duration-300 transform hover:scale-105 ${theme.button}`}
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already a partner?{" "}
          <Link to="/food-partner/login" className={`${theme.link}`}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPartner;
