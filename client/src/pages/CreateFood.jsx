import React, { useState } from "react";
import axios from "axios";
import { themeVars } from "../themeVars";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDark ? themeVars.dark : themeVars.light;

  // Handle text inputs
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setVideo(e.target.files[0] || null);
  };
  const navigate = useNavigate();

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      setMessage("Please upload a video file.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append("video", video);

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(
        `${import.meta.env.VITE_LIVE}/api/food`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(res.data.message || "Upload successful!");
      setFormData({ name: "", description: "", price: "", category: "" });
      setVideo(null);
      navigate("/reels");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${theme.primary} px-4 py-8`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg ${theme.card} border ${theme.border} rounded-2xl shadow-xl p-8 flex flex-col gap-6`}
        style={{
          background: isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.18)",
        }}
      >
        <h2 className={`text-2xl font-bold text-center ${theme.accent}`}>
          Create Food Item
        </h2>

        {/* Name */}
        <div>
          <label className={`block font-semibold mb-1 ${theme.text}`}>
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food name"
            className={`w-full px-4 py-3 rounded-lg ${theme.input} ${theme.text} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-orange-400`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className={`block font-semibold mb-1 ${theme.text}`}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
            rows={3}
            maxLength={120}
            className={`w-full px-4 py-3 rounded-lg resize-none ${theme.input} ${theme.text} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-orange-400`}
            required
          />
        </div>

        {/* Price + Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className={`block font-semibold mb-1 ${theme.text}`}>
              Price
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              className={`w-full px-4 py-3 rounded-lg ${theme.input} ${theme.text} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-orange-400`}
              required
            />
          </div>
          <div className="flex-1">
            <label className={`block font-semibold mb-1 ${theme.text}`}>
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className={`w-full px-4 py-3 rounded-lg ${theme.input} ${theme.text} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-orange-400`}
              required
            />
          </div>
        </div>

        {/* File input */}
        <div>
          <label className={`block font-semibold mb-1 ${theme.text}`}>
            Food Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-lg mt-2 shadow-md transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 ${theme.button}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-2 text-sm font-medium text-red-500">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateFood;
