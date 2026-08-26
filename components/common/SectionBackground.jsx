"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_COLOR = "#050505";

/**
 * Watches every element with a `data-bg-color` attribute and crossfades a
 * fixed full-screen backdrop to that color whenever the section nearest the
 * viewport center changes. Gives each section its own background tint
 * without needing to hardcode per-pixel scroll math.
 */
export default function SectionBackground() {
  const [color, setColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-bg-color]"));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to vertical center among currently intersecting ones.
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        let best = visible[0];
        let bestDist = Infinity;
        for (const entry of visible) {
          const rect = entry.boundingClientRect;
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - window.innerHeight / 2);
          if (dist < bestDist) {
            bestDist = dist;
            best = entry;
          }
        }

        const next = best.target.getAttribute("data-bg-color");
        if (next) setColor(next);
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1],
        rootMargin: "-35% 0px -35% 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      animate={{ backgroundColor: color }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
