import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant transition-colors duration-200">
      <div className="flex justify-between items-center px-margin-edge h-20 w-full max-w-[1440px] mx-auto">
        {/* Brand Logo */}
        <Link
          to="/"
          className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary tracking-tighter hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            terminal
          </span>
          DevSolve
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-gutter">
          <Link
            to="/"
            className={`font-body-md py-1 transition-all ${
              isActive("/")
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-2 py-1 rounded"
            }`}
          >
            Explore
          </Link>
          <Link
            to="/rooms"
            className={`font-body-md py-1 transition-all ${
              isActive("/rooms")
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-2 py-1 rounded"
            }`}
          >
            Multiplayer Hub
          </Link>
          <Link
            to="/problems/reverse-k-group"
            className={`font-body-md py-1 transition-all ${
              isActive("/problems/reverse-k-group")
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-2 py-1 rounded"
            }`}
          >
            Coding Workspace
          </Link>
          <Link
            to="/studio"
            className={`font-body-md py-1 transition-all ${
              isActive("/studio")
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-2 py-1 rounded"
            }`}
          >
            Studio
          </Link>
        </div>

        {/* Actions & Theme Toggle */}
        <div className="flex items-center gap-stack-md">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors flex items-center justify-center focus:outline-none"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[24px]">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <Link
            to="/login"
            className="hidden md:block font-body-md text-on-surface hover:bg-surface-container px-4 py-2 rounded border border-outline-variant transition-colors"
          >
            Log In
          </Link>
          
          <Link
            to="/signup"
            className="font-body-md bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-5 py-2 rounded transition-colors font-bold shadow-sm"
          >
            Join For Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
