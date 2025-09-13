import React from "react";
import { themeVars } from "../themeVars";

const dummyProfile = {
  name: "John Doe",
  profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
  addr: "456 Elm St, Snacktown",
  meals: 24,
  following: 120,
  followers: 340,
  videos: [
    {
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://source.unsplash.com/400x400/?burger",
    },
    {
      url: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://source.unsplash.com/400x400/?pizza",
    },
    {
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://source.unsplash.com/400x400/?sushi",
    },
    {
      url: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://source.unsplash.com/400x400/?fries",
    },
    {
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://source.unsplash.com/400x400/?noodles",
    },
    {
      url: "https://www.w3schools.com/html/movie.mp4",
      thumb: "https://source.unsplash.com/400x400/?salad",
    },
  ],
};

const UserProfile = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center ${theme.primary} transition-all duration-700`}
    >
      <div
        className={`w-full max-w-2xl mx-auto mt-10 mb-6 p-6 rounded-3xl ${theme.card} border ${theme.border} shadow-2xl animate-fadeIn flex flex-col items-center`}
      >
        <img
          src={dummyProfile.profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-orange-400 shadow-lg object-cover mb-4 animate-fadeIn"
        />
        <h2 className={`text-2xl font-bold mb-1 ${theme.text}`}>
          {dummyProfile.name}
        </h2>
        <p className={`text-sm mb-2 ${theme.text}`}>{dummyProfile.addr}</p>
        <div className="flex gap-8 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-orange-500 dark:text-yellow-400">
              {dummyProfile.meals}
            </span>
            <span className={`text-xs ${theme.text}`}>Meals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-orange-500 dark:text-yellow-400">
              {dummyProfile.followers}
            </span>
            <span className={`text-xs ${theme.text}`}>Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-orange-500 dark:text-yellow-400">
              {dummyProfile.following}
            </span>
            <span className={`text-xs ${theme.text}`}>Following</span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto px-2 pb-10 animate-fadeIn">
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
          Uploaded Food Videos
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {dummyProfile.videos.map((vid, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl overflow-hidden shadow-md group relative cursor-pointer"
            >
              <video
                src={vid.url}
                poster={vid.thumb}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-4.197-2.474A1 1 0 009 9.618v4.764a1 1 0 001.555.832l4.197-2.474a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
