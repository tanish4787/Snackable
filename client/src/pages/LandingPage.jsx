import React from "react";
import { themeVars } from "../themeVars";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center ${theme.primary} transition-all duration-700`}
    >
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center px-4 pt-20 pb-10 animate-fadeIn">
        <h1
          className={`text-4xl sm:text-6xl font-extrabold text-center mb-6 tracking-tight drop-shadow-lg ${theme.text}`}
          style={{ textShadow: isDark ? "0 2px 16px #000" : "0 2px 16px #fff" }}
        >
          Snackable
        </h1>
        <p
          className={`max-w-2xl text-center text-lg sm:text-2xl mb-10 font-medium ${theme.text} transition-all duration-300`}
        >
          Discover, Watch, and enjoy food from the best local partners.{" "}
          <span className="font-bold text-orange-500 dark:text-yellow-400">
            Snackable
          </span>{" "}
          brings foodies and food partners together for a seamless, fun, and
          delicious experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
          <Link
            to="/user/login"
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none ${theme.button} border-2 border-white/30 backdrop-blur-lg bg-opacity-90 animate-fadeIn flex items-center gap-2`}
            style={{ animationDuration: "1.2s" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75"
              />
            </svg>
            User Login / Signup
          </Link>
          <Link
            to="/food-partner/login"
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none ${theme.button} border-2 border-white/30 backdrop-blur-lg bg-opacity-90 animate-fadeIn flex items-center gap-2`}
            style={{ animationDuration: "1.2s" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v10.5A2.25 2.25 0 009.75 19.5h4.5a2.25 2.25 0 002.25-2.25V13.5m-6-3h6m-6 3h3"
              />
            </svg>
            Partner Login / Signup
          </Link>
        </div>
      </div>
      {/* Animated Illustration or Call to Action */}
      <div className="flex-1 flex flex-col items-center justify-end w-full pb-10 animate-fadeIn">
        <div className="w-full flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-300 shadow-2xl flex items-center justify-center animate-bounce-slow">
            <svg
              className="w-40 h-40 sm:w-56 sm:h-56"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="50"
                cy="50"
                rx="48"
                ry="48"
                fill="#fff"
                fillOpacity="0.8"
              />
              <path
                d="M30 60 Q50 80 70 60"
                stroke="#f59e42"
                strokeWidth="4"
                fill="none"
              />
              <ellipse cx="40" cy="45" rx="4" ry="6" fill="#f59e42" />
              <ellipse cx="60" cy="45" rx="4" ry="6" fill="#f59e42" />
            </svg>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg font-semibold text-orange-600 bg-white/80 px-4 py-1 rounded-full shadow-md animate-fadeIn">
              Eat. Share. Enjoy!
            </span>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
				@keyframes bounce-slow {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-18px); }
				}
				.animate-bounce-slow {
					animation: bounce-slow 2.8s infinite cubic-bezier(0.4,0,0.2,1);
				}
			`}</style>
    </div>
  );
};

export default LandingPage;
