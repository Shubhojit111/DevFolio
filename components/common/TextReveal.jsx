"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function Word({ children, range, progress }) {
  const y = useTransform(progress, range, ["120%", "0%"]);
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <span className="relative mr-[0.28em] inline-block overflow-hidden align-bottom pb-[0.08em]">
      <motion.span
        style={{ y, opacity, filter }}
        className="inline-block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Scroll-scrubbed text reveal — each word rises smoothly from below and
 * fades/unblurs in as the section moves through the scroll offset window.
 * Heavily spring-smoothed (low stiffness, high damping + mass) so it reads
 * as a fluid, continuous motion rather than a scrubby, jittery one — even
 * on fast or janky scrolls.
 */
export default function TextReveal({ text, className = "", offset = ["start 0.92", "start 0.35"] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        // Slight overlap between neighboring words' ranges makes the wave
        // of motion feel continuous instead of a strict one-by-one reveal.
        const start = Math.max(0, (i / words.length) * 0.85);
        const end = start + 1.6 / words.length;
        return (
          <Word key={`${word}-${i}`} range={[start, Math.min(1, end)]} progress={smoothProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
