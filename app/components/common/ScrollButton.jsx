"use client";

import React, { useState, useEffect } from "react";
import { IoChevronUp } from "react-icons/io5";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 200px
  useEffect(() => {
    const toggleVisibility = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrolledToBottom =
        scrollHeight - windowHeight - window.scrollY <= 200;

      setIsVisible(window.scrollY > 200 && !scrolledToBottom);
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-50 hover:bg-gray-700 bg-academia-general duration-200 text-white p-3 rounded-full transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
      style={{ opacity: isVisible ? 1 : 0 }}
      title="Back to Top"
    >
      <IoChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
