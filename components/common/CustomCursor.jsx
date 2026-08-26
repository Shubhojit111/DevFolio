"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 400, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Event delegation to check hover elements
    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        setCursorType(type);
        setCursorText(target.getAttribute("data-cursor-text") || "");
      } else {
        // Fallback checks for normal interactive elements
        const isInteractive = e.target.closest("a, button, input, textarea, select");
        if (isInteractive) {
          setCursorType("hover");
        } else {
          setCursorType("default");
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "rgba(229, 226, 225, 0.9)", // Foreground color
      borderRadius: "50%",
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(0, 102, 255, 0.15)", // Primary theme color transparent
      border: "1px solid rgba(0, 102, 255, 0.5)",
      borderRadius: "50%",
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: "#0066ff",
      color: "#ffffff",
      borderRadius: "50%",
    },
    text: {
      width: 90,
      height: 90,
      backgroundColor: "rgba(0, 102, 255, 0.9)",
      color: "#ffffff",
      borderRadius: "50%",
    },
  };

  return (
    <motion.div
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        x: "-50%",
        y: "-50%",
      }}
      animate={cursorType}
      variants={variants}
      transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.2 }}
      className="fixed pointer-events-none z-50 flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-center"
    >
      {cursorType === "project" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white drop-shadow-sm"
        >
          {cursorText || "VIEW"}
        </motion.span>
      )}
      {cursorType === "text" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white px-2"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
