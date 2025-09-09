// Centralized theme variables for Tailwind (light/dark)
export const themeVars = {
  light: {
    primary: "bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400",
    card: "bg-white shadow-lg",
    text: "text-gray-900",
    accent: "text-orange-500",
    input: "bg-gray-100 border border-gray-300",
    button: "bg-orange-500 hover:bg-orange-600 text-white",
    link: "text-pink-500 hover:underline",
    border: "border-gray-200",
    placeholder: "placeholder-gray-400",
  },
  dark: {
    primary: "bg-gradient-to-r from-gray-800 via-gray-900 to-black",
    card: "bg-gray-900 shadow-xl",
    text: "text-gray-100",
    accent: "text-yellow-400",
    input: "bg-gray-800 border border-gray-700",
    button: "bg-yellow-500 hover:bg-yellow-600 text-gray-900",
    link: "text-yellow-400 hover:underline",
    border: "border-gray-700",
    placeholder: "placeholder-gray-500",
  },
};
