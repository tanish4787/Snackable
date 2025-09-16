import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, Bookmark, MessageCircle } from "lucide-react";
import { themeVars } from "../themeVars";

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/food`,
          {
            withCredentials: true,
          }
        );
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Auto play/pause videos
  useEffect(() => {
    const handleScroll = () => {
      const vids = containerRef.current?.querySelectorAll("video") || [];
      vids.forEach((vid) => {
        const rect = vid.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 200);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Double tap like
  const handleDoubleTap = (id) => {
    setVideos((prev) =>
      prev.map((v) =>
        v._id === id
          ? { ...v, likeCount: (v.likeCount ?? 0) + 1, showHeart: true }
          : v
      )
    );
    setTimeout(() => {
      setVideos((prev) =>
        prev.map((v) => (v._id === id ? { ...v, showHeart: false } : v))
      );
    }, 800);
  };

  // --- inside Reels.jsx ---
  const handleLike = async (id) => {
    try {
      // Optimistic UI update
      setVideos((prev) =>
        prev.map((v) =>
          v._id === id
            ? {
                ...v,
                isLiked: !v.isLiked,
                likeCount: v.isLiked ? v.likeCount - 1 : v.likeCount + 1,
              }
            : v
        )
      );

      // API call
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/food/like`,
        { foodItemId: id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error liking food item:", err);
    }
  };

  const handleSave = async (id) => {
    try {
      // Optimistic UI update
      setVideos((prev) =>
        prev.map((v) =>
          v._id === id
            ? {
                ...v,
                isSaved: !v.isSaved,
                savesCount: v.isSaved ? v.savesCount - 1 : v.savesCount + 1,
              }
            : v
        )
      );

      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/food/save`,
        { foodItemId: id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error saving food item:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-700">
      <div className="w-full h-screen flex justify-center items-center">
        {/* Phone-like container */}
        <div
          ref={containerRef}
          className="snap-y snap-mandatory h-full w-full
            sm:max-w-[420px] sm:h-full sm:rounded-3xl sm:border sm:border-gray-700
            bg-black/90 shadow-2xl overflow-y-scroll scrollbar-hide relative"
        >
          {videos.length > 0 ? (
            videos.map((video,) => (
              <div
                key={video._id}
                className="snap-center relative w-full h-full flex justify-center items-center"
                onDoubleClick={() => handleDoubleTap(video._id)}
              >
                {/* Background video */}
                <video
                  src={video.url || video.videoUrl}
                  className="absolute top-0 left-0 w-full h-full object-cover sm:rounded-3xl"
                  loop
                  playsInline
                  muted
                  autoPlay
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:rounded-3xl" />

                {/* Big double-tap heart */}
                {video.showHeart && (
                  <Heart
                    className="absolute text-white/90 drop-shadow-lg animate-ping-once"
                    size={120}
                  />
                )}

                {/* Action buttons */}
                <div className="absolute right-5 bottom-28 flex flex-col items-center gap-6 z-20">
                  {/* Like */}
                  <button
                    onClick={() => handleLike(video._id)}
                    className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg"
                  >
                    <Heart size={28} className="text-red-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {video.likeCount ?? 0}
                    </span>
                  </button>

                  {/* Save */}
                  <button
                    onClick={() => handleSave(video._id)}
                    className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg"
                  >
                    <Bookmark size={28} className="text-yellow-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {video.savedCount ?? 0}
                    </span>
                  </button>

                  {/* Comment */}
                  <button className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg">
                    <MessageCircle size={28} className="text-pink-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {video.commentsCount ?? 0}
                    </span>
                  </button>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-8 left-0 w-full flex flex-col items-center z-20 px-4">
                  {/* Description */}
                  <div
                    className={`w-full max-w-xs mx-auto ${theme.card} bg-opacity-70 rounded-xl p-4 mb-3 backdrop-blur-md shadow-xl`}
                  >
                    <p
                      className={`text-base sm:text-lg font-medium text-center ${theme.text}`}
                    >
                      {video.description}
                    </p>
                  </div>

                  {/* Store Button */}
                  {video.store && (
                    <Link
                      to={video.store}
                      rel="noopener noreferrer"
                      className={`px-8 py-3 rounded-full font-bold text-lg ${theme.button} shadow-lg transition-transform hover:scale-105 active:scale-95`}
                    >
                      Visit Store
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center mt-10">Loading videos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reels;
