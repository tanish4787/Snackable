import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { themeVars } from "../themeVars";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [view, setView] = useState("saved"); // 'all' or 'saved'
  const containerRef = useRef(null);

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

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

  // Basic autoplay behavior (same simple handler as Reels)
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

  const handleLike = async (id) => {
    // UI-only optimistic toggle (preserve existing logic approach)
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
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/food/like`,
        { foodItemId: id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error liking:", err);
    }
  };

  const handleSave = async (id) => {
    setVideos((prev) =>
      prev.map((v) =>
        v._id === id
          ? {
              ...v,
              isSaved: !v.isSaved,
              savedCount: v.isSaved ? v.savesCount - 1 : v.savesCount + 1,
            }
          : v
      )
    );
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/food/save`,
        { foodItemId: id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  // Filter saved videos when view === 'saved'
  const displayed = view === "saved" ? videos.filter((v) => v.isSaved) : videos;

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-700">
      <div className="w-full h-screen flex justify-center items-center">
        <div
          ref={containerRef}
          className="snap-y snap-mandatory h-full w-full sm:max-w-[420px] sm:h-full sm:rounded-3xl sm:border sm:border-gray-700 bg-black/90 shadow-2xl overflow-y-scroll scrollbar-hide relative"
        >
          {displayed.length > 0 ? (
            displayed.map((video) => (
              <div
                key={video._id}
                className="snap-center relative w-full h-full flex justify-center items-center"
              >
                <video
                  src={video.url || video.videoUrl}
                  className="absolute top-0 left-0 w-full h-full object-cover sm:rounded-3xl"
                  loop
                  playsInline
                  muted
                  autoPlay
                />

                <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/70 to-transparent sm:rounded-3xl pointer-events-none z-10" />

                <div className="absolute right-5 bottom-28 flex flex-col items-center gap-6 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(video._id);
                    }}
                    className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg"
                  >
                    <Heart
                      size={28}
                      className={
                        video.isLiked
                          ? "text-red-500"
                          : "text-gray-800 dark:text-gray-200"
                      }
                    />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {video.likeCount ?? 0}
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(video._id);
                    }}
                    className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg"
                  >
                    <Bookmark size={28} className="text-yellow-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {video.savedCount ?? 0}
                    </span>
                  </button>

                  <button className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 shadow-lg">
                    <MessageCircle size={28} className="text-pink-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">
                      {video.commentsCount ?? 0}
                    </span>
                  </button>
                </div>

                <div className="absolute bottom-8 left-0 w-full flex flex-col items-center z-20 px-4">
                  <div className="w-full max-w-xl mx-auto px-2 mb-3">
                    <p
                      className={`relative z-20 text-sm sm:text-base font-medium text-center ${theme.text} drop-shadow-md px-4`}
                      style={{
                        WebkitLineClamp: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {video.description}
                    </p>
                  </div>

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
            <p className="text-white text-center mt-10">No videos to show</p>
          )}
        </div>

        {/* Bottom toggle bar */}
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-40 flex items-center gap-4 bg-white/90 dark:bg-gray-900/80 rounded-full px-2 py-1 shadow-lg">
          <button
            onClick={() => setView("all")}
            className={`px-6 py-2 rounded-full font-semibold ${
              view === "all"
                ? "bg-black text-white"
                : "text-black/70 dark:text-gray-200"
            }`}
          >
            All Reels
          </button>
          <button
            onClick={() => setView("saved")}
            className={`px-6 py-2 rounded-full font-semibold ${
              view === "saved"
                ? "bg-black text-white"
                : "text-black/70 dark:text-gray-200"
            }`}
          >
            Saved
          </button>
        </div>
      </div>
    </div>
  );
};

export default Saved;
