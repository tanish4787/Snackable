import React, { useRef, useEffect } from "react";
import { themeVars } from "../themeVars";

// Dummy video data for UI demo
const videos = [
  {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Welcome to Burger Palace! Try our delicious burgers, fries, and shakes. Order now and get a free drink with your meal!",
    store: "https://burgerpalace.com",
  },
  {
    url: "https://www.w3schools.com/html/movie.mp4",
    description:
      "Pizza World: Hot, cheesy pizzas delivered to your door. Taste the best Margherita in town! Limited time offer.",
    store: "https://pizzaworld.com",
  },
  {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Sushi Express: Fresh sushi rolls, sashimi, and more. Visit us for authentic Japanese flavors!",
    store: "https://sushiexpress.com",
  },
];

const Home = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;
  const containerRef = useRef(null);

  // Auto play/pause videos based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const videos = containerRef.current.querySelectorAll("video");
      videos.forEach((vid) => {
        const rect = vid.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight + 1) {
          vid.play();
        } else {
          vid.pause();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 100); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen w-full ${theme.primary} transition-all duration-700 flex justify-center items-center`}
    >
      <div className="w-full h-screen flex justify-center items-center">
        {/* Mobile-like container for videos on larger screens */}

        <div
          ref={containerRef}
          className="snap-y snap-mandatory h-full w-full max-w-[420px] sm:max-w-[420px] md:max-w-[420px] lg:max-w-[420px] xl:max-w-[420px] 2xl:max-w-[420px] bg-black/80 rounded-none sm:rounded-3xl shadow-2xl overflow-y-scroll scrollbar-hide relative border border-gray-700"
          style={{
            WebkitOverflowScrolling: "touch",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            msOverflowStyle: "none",
            scrollbarWidth: "none"
          }}
        >
          
          {videos.map((video, idx) => (
            <div
              key={idx}
              className={`snap-center flex flex-col justify-end items-center h-full min-h-screen w-full relative transition-all duration-700 `}
            >
              <video
                src={video.url}
                className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-all duration-700 rounded-none sm:rounded-3xl"
                loop
                playsInline
                preload="auto"
                style={{ background: "#000" }}
              />
              {/* Overlay for description and button */}
              <div className="relative z-10 w-full h-full flex flex-col justify-end items-center">
                {/* Description */}
                <div
                  className={`w-full px-2 pt-3 pb-22 sm:pb-24 flex flex-col items-center animate-fadeIn`}
                >
                  <div
                    className={`w-full max-w-xs mx-auto ${theme.card} bg-opacity-50 rounded-xl p-4 mb-4 shadow-xl border ${theme.border} backdrop-blur-md transition-all duration-500`}
                    style={{
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      background: isDark
                        ? "rgba(30,30,30,0.7)"
                        : "rgba(255,255,255,0.7)",
                    }}
                  >
                    <p
                      className={`text-base sm:text-lg font-medium text-center ${theme.text} transition-all duration-300`}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minHeight: "2.5em",
                      }}
                    >
                      {video.description}
                    </p>
                  </div>
                </div>
                {/* Modern bottom-centered button */}
                <div className="absolute bottom-8 left-0 w-full flex justify-center items-center pointer-events-none">
                  <a
                    href={video.store}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pointer-events-auto px-8 py-3 rounded-full font-bold text-lg shadow-xl transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none ${theme.button} border-2 border-white/30 backdrop-blur-lg bg-opacity-90 animate-fadeIn flex items-center gap-2`}
                    style={{
                      animationDuration: "1.2s",
                      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v10.5A2.25 2.25 0 009.75 19.5h4.5a2.25 2.25 0 002.25-2.25V13.5m-6-3h6m-6 3h3"
                      />
                    </svg>
                    Visit Store
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
