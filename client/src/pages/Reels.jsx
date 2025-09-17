import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, Bookmark, MessageCircle } from "lucide-react";
import { themeVars } from "../themeVars";

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const [view, setView] = useState("all"); // all | saved
  const containerRef = useRef(null);

  const lastTapRef = useRef(new Map());
  const processingRef = useRef(new Set());

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_LIVE}/api/food`, {
          withCredentials: true,
        });
        const normalized = (res.data.videos || []).map((v) => ({
          _id: v._id,
          url: v.url || v.videoUrl,
          description: v.description || "",
          store: v.store || v.storeUrl || null,
          likeCount: Number(v.likeCount ?? v.likesCount ?? 0),
          savedCount: Number(v.savedCount ?? v.saveCount ?? 0),
          isLiked: Boolean(v.isLiked ?? false),
          isSaved: Boolean(v.isSaved ?? false),
          showHeart: false,
        }));
        setVideos(normalized);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Autoplay when in view
  useEffect(() => {
    const handleScroll = () => {
      const vids = containerRef.current?.querySelectorAll("video") || [];
      vids.forEach((vid) => {
        const rect = vid.getBoundingClientRect();
        const visible =
          rect.top >= -50 && rect.bottom <= window.innerHeight + 50;
        if (visible) {
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

  // Like handler
  const handleLike = async (id) => {
    if (processingRef.current.has(`like:${id}`)) return;
    processingRef.current.add(`like:${id}`);

    setVideos((prev) =>
      prev.map((v) =>
        v._id === id
          ? {
              ...v,
              isLiked: !v.isLiked,
              likeCount: !v.isLiked
                ? (v.likeCount ?? 0) + 1
                : Math.max((v.likeCount ?? 0) - 1, 0),
            }
          : v
      )
    );

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_LIVE}/api/food/like`,
        { foodItemId: id },
        { withCredentials: true }
      );
      if (res.data && typeof res.data.likeCount !== "undefined") {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === id ? { ...v, likeCount: Number(res.data.likeCount) } : v
          )
        );
      }
    } catch (err) {
      console.error("Error liking food item:", err);
    } finally {
      setTimeout(() => processingRef.current.delete(`like:${id}`), 600);
    }
  };

  // Save handler
  const handleSave = async (id) => {
    if (processingRef.current.has(`save:${id}`)) return;
    processingRef.current.add(`save:${id}`);

    setVideos((prev) =>
      prev.map((v) =>
        v._id === id
          ? {
              ...v,
              isSaved: !v.isSaved,
              savedCount: !v.isSaved
                ? (v.savedCount ?? 0) + 1
                : Math.max((v.savedCount ?? 0) - 1, 0),
            }
          : v
      )
    );

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_LIVE}/api/food/save`,
        { foodItemId: id },
        { withCredentials: true }
      );
      if (res.data && typeof res.data.savedCount !== "undefined") {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === id ? { ...v, savedCount: Number(res.data.savedCount) } : v
          )
        );
      }
    } catch (err) {
      console.error("Error saving food item:", err);
    } finally {
      setTimeout(() => processingRef.current.delete(`save:${id}`), 600);
    }
  };

  // Touch / double-tap like
  const handlePointerTap = (id, e) => {
    if (e.type === "touchstart" || e.pointerType === "touch") {
      const last = lastTapRef.current.get(id) || 0;
      const now = Date.now();
      if (now - last < 300) {
        setVideos((prev) =>
          prev.map((v) => (v._id === id ? { ...v, showHeart: true } : v))
        );
        setTimeout(() => {
          setVideos((prev) =>
            prev.map((v) => (v._id === id ? { ...v, showHeart: false } : v))
          );
        }, 800);
        handleLike(id);
        lastTapRef.current.delete(id);
      } else {
        lastTapRef.current.set(id, now);
        setTimeout(() => {
          if (Date.now() - (lastTapRef.current.get(id) || 0) >= 300)
            lastTapRef.current.delete(id);
        }, 350);
      }
    }
  };

  const handleDoubleClickDesktop = (id) => {
    setVideos((prev) =>
      prev.map((v) => (v._id === id ? { ...v, showHeart: true } : v))
    );
    setTimeout(() => {
      setVideos((prev) =>
        prev.map((v) => (v._id === id ? { ...v, showHeart: false } : v))
      );
    }, 800);
    handleLike(id);
  };

  // Filtered view
  const displayedVideos =
    view === "saved" ? videos.filter((v) => v.isSaved) : videos;

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-700">
      <div className="w-full h-screen flex justify-center items-center">
        <div
          ref={containerRef}
          className="snap-y snap-mandatory h-full w-full sm:max-w-[420px] sm:h-full sm:rounded-3xl sm:border sm:border-gray-700 bg-black/90 shadow-2xl overflow-y-scroll scrollbar-hide relative"
        >
          {displayedVideos.length > 0 ? (
            displayedVideos.map((video) => (
              <div
                key={video._id}
                className="snap-center relative w-full h-screen sm:h-full flex justify-center items-center"
                onTouchStart={(e) => handlePointerTap(video._id, e)}
                onPointerDown={(e) => {
                  if ((e.pointerType || "").toLowerCase() === "touch")
                    handlePointerTap(video._id, e);
                }}
                onDoubleClick={() => handleDoubleClickDesktop(video._id)}
              >
                {/* Video */}
                <video
                  src={video.url}
                  className="absolute top-0 left-0 w-full h-full object-cover sm:rounded-3xl"
                  loop
                  playsInline
                  muted
                  autoPlay
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:rounded-3xl" />

                {/* Heart animation */}
                {video.showHeart && (
                  <Heart
                    className="absolute text-white/95 drop-shadow-lg animate-ping-once z-30"
                    size={120}
                  />
                )}

                {/* Action buttons */}
                <div className="absolute right-4 bottom-28 flex flex-col items-center gap-5 z-20">
                  <button
                    onClick={() => handleLike(video._id)}
                    className="flex flex-col items-center bg-white/90 dark:bg-gray-800/80 rounded-full p-3 shadow-lg"
                  >
                    <Heart
                      size={28}
                      className={
                        video.isLiked
                          ? "text-red-600 fill-red-600"
                          : "text-red-500"
                      }
                    />
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
                      {Number(video.likeCount ?? 0)}
                    </span>
                  </button>

                  <button
                    onClick={() => handleSave(video._id)}
                    className="flex flex-col items-center bg-white/90 dark:bg-gray-800/80 rounded-full p-3 shadow-lg"
                  >
                    <Bookmark
                      size={28}
                      className={
                        video.isSaved
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-yellow-500"
                      }
                    />
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
                      {Number(video.savedCount ?? 0)}
                    </span>
                  </button>

                  <button className="flex flex-col items-center bg-white/90 dark:bg-gray-800/80 rounded-full p-3 shadow-lg">
                    <MessageCircle size={28} className="text-pink-500" />
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
                      {Number(video.commentsCount ?? 0)}
                    </span>
                  </button>
                </div>

                {/* Bottom description + store */}
                <div className="absolute bottom-6 left-0 w-full flex flex-col items-center z-20 px-4">
                  <div className="w-[60%] max-w-md mx-auto rounded-2xl p-3 mb-3 backdrop-blur-md bg-black/45 border border-white/8 text-white shadow-md">
                    <p className="text-sm sm:text-base font-medium text-center">
                      {video.description}
                    </p>
                  </div>
                  {video.store && (
                    <Link
                      to={video.store}
                      rel="noopener noreferrer"
                      className={`px-6 py-2 rounded-full font-semibold text-base ${theme.button} shadow-md`}
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
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-40 flex items-center gap-4 bg-white/90 dark:bg-gray-700/80 rounded-full px-3 py-1 shadow-lg">
          <button
            onClick={() => setView("all")}
            className={`px-6 py-2 rounded-full font-semibold ${
              view === "all"
                ? "bg-black text-white"
                : "text-black/70 dark:text-gray-200"
            }`}
          >
            All
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

export default Reels;
