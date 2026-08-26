"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { getTechIcon } from "@/Assets/techIcons.jsx";

const rowA = [
  "Next.js",
  "React.js",
  "Framer Motion",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "GSAP",
  "HTML5",
  "CSS3",
];

const rowB = [
  "Figma Integration",
  "Stitch Design",
  "API Development",
  "JWT Auth",
  "Git & GitHub",
  "Firebase",
  "MySQL",
  "Postman",
  "VS Code",
];

function TechLogo({ label }) {
  const { Icon, color, Icon2, color2 } = getTechIcon(label);
  return (
    <span className="group/item flex shrink-0 items-center justify-center px-6 sm:px-10 md:px-12 py-2">
      <span className="flex items-center gap-3 p-3.5 sm:p-4">
        <Icon size={38} style={{ color }} className="opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300 sm:w-11 sm:h-11 w-9 h-9" />
        {Icon2 && <Icon2 size={38} style={{ color: color2 }} className="opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300 sm:w-11 sm:h-11 w-9 h-9" />}
      </span>
      <span className="text-lg sm:text-2xl md:text-3xl font-hero-normal font-semibold text-white/90 group-hover/item:text-primary group-hover/item:scale-105 transition-all duration-300 whitespace-nowrap">{label}</span>
    </span>
  );
}

function DraggableRow({ items, direction = 1, speed = 32 }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const dirRef = useRef(direction);
  const draggingRef = useRef(false);
  const [setWidth, setSetWidth] = useState(0);

  // Quadruple items so the marquee length always exceeds screen width on all resolutions
  const quadItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setSetWidth(trackRef.current.scrollWidth / 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (draggingRef.current || !setWidth) return;
    let next = x.get() - dirRef.current * (speed / 1000) * delta;
    if (next <= -setWidth) next += setWidth;
    if (next > 0) next -= setWidth;
    x.set(next);
  });

  const wrap = () => {
    if (!setWidth) return;
    let val = x.get() % setWidth;
    if (val > 0) val -= setWidth;
    x.set(val);
  };

  const handleDragStart = () => {
    draggingRef.current = true;
  };

  const handleDragEnd = (_e, info) => {
    draggingRef.current = false;
    if (info.velocity.x < -40) dirRef.current = 1;
    else if (info.velocity.x > 40) dirRef.current = -1;
    wrap();
  };

  return (
    <div className="relative w-full overflow-hidden select-none touch-pan-y">
      <motion.div
        ref={trackRef}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -setWidth * 3, right: setWidth * 3 }}
        dragElastic={0.02}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab items-center"
      >
        {quadItems.map((label, i) => (
          <TechLogo key={`${label}-${i}`} label={label} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative py-12 md:py-16 border-y border-white/[0.06] bg-[#0d0a12] overflow-hidden">
      <div className="absolute left-6 top-4 md:left-16 md:top-5 flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted/40 z-20 pointer-events-none">
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse" />
        Grab &amp; drag
      </div>

      {/* Deep side dark masks with multi-stop gradient blur for seamless edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-48 md:w-64 bg-gradient-to-r from-[#0d0a12] via-[#0d0a12]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-48 md:w-64 bg-gradient-to-l from-[#0d0a12] via-[#0d0a12]/80 to-transparent" />

      <div className="space-y-4 md:space-y-6">
        <DraggableRow items={rowA} direction={1} speed={32} />
        <DraggableRow items={rowB} direction={-1} speed={24} />
      </div>
    </section>
  );
}

