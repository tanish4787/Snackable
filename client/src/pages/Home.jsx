import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { themeVars } from "../themeVars";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  // Fetch food videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        setVideos(res.data.videos || []); // API returns { url, description, store }
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Auto play/pause videos based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const vids = containerRef.current?.querySelectorAll("video") || [];
      vids.forEach((vid) => {
        const rect = vid.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          vid.play().catch(() => {}); // prevent autoplay block
        } else {
          vid.pause();
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 200); // run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen w-full ${theme.primary} flex justify-center items-center`}
    >
      <div className="w-full h-screen flex justify-center items-center">
        <div
          ref={containerRef}
          className="snap-y snap-mandatory h-full w-full max-w-[420px] bg-black/80 rounded-3xl shadow-2xl overflow-y-scroll scrollbar-hide relative border border-gray-700"
        >
          {videos.length > 0 ? (
            videos.map((video, idx) => (
              <div
                key={idx}
                className="snap-center flex flex-col justify-end items-center h-full min-h-screen relative"
              >
                {/* Background video */}
                <video
                  src={video.url}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  loop
                  playsInline
                  muted // required for autoplay
                  autoPlay
                />

                {/* Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center">
                  {/* Description */}
                  <div className="w-full px-2 pt-3 pb-20 flex flex-col items-center">
                    <div
                      className={`w-full max-w-xs mx-auto ${theme.card} bg-opacity-60 rounded-xl p-4 mb-4`}
                    >
                      <p
                        className={`text-base sm:text-lg font-medium text-center ${theme.text}`}
                      >
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Store Button */}
                  <div className="absolute bottom-8 left-0 w-full flex justify-center">
                    <Link
                      to={video.store || "#"}
                      rel="noopener noreferrer"
                      className={`px-8 py-3 rounded-full font-bold text-lg ${theme.button}`}
                    >
                      Visit Store
                    </Link>
                  </div>
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

export default Home;
