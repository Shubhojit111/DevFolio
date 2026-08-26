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
  "MERN Stack",
];

const rowB = [
  "Figma Integration",
  "Stitch Design",
  "API Development",
  "JWT Auth",
  "REST APIs",
  "Git & GitHub",
  "Firebase",
  "MySQL",
];

function TechLogo({ label, size }) {
  const { Icon, color, Icon2, color2 } = getTechIcon(label);
  return (
    <span className="group/item flex shrink-0 items-center gap-6 sm:gap-8 px-4 sm:px-6">
      <span className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl transition-all duration-300 shadow-sm">
        <Icon size={size} style={{ color }} className="opacity-85 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300" />
        {Icon2 && <Icon2 size={size} style={{ color: color2 }} className="opacity-85 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300" />}
      </span>
    </span>
  );
}

/**
 * A grabbable, infinitely-looping marquee row. Auto-scrolls in `direction`
 * (1 or -1) until the user grabs it — then it tracks the pointer directly,
 * and on release it keeps drifting in whichever direction it was flung.
 */
function DraggableRow({ items, direction = 1, speed = 34, big = false }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const dirRef = useRef(direction);
  const draggingRef = useRef(false);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setSetWidth(trackRef.current.scrollWidth / 2);
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

  const iconSize = big ? 48 : 48;

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
        className={`flex w-max cursor-grab items-center ${
          big ? "text-3xl sm:text-5xl md:text-6xl" : "text-2xl sm:text-4xl md:text-5xl"
        }`}
      >
        {[...items, ...items].map((label, i) => (
          <TechLogo key={`${label}-${i}`} label={label} size={iconSize} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative py-10 md:py-14 border-y border-white/[0.06] overflow-hidden">
      <div className="absolute left-6 top-4 md:left-16 md:top-6 flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted/40 z-10 pointer-events-none">
        <span className="h-1 w-1 rounded-full bg-primary/50" />
        Grab &amp; drag
      </div>

      {/* Edge fades so the rows feel infinite */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-40 bg-gradient-to-r from-[#0d0a12] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-40 bg-gradient-to-l from-[#0d0a12] to-transparent" />

      <div className="space-y-3 md:space-y-5">
        <DraggableRow items={rowA} direction={1} speed={34} />
        <DraggableRow items={rowB} direction={-1} speed={26} />
      </div>
    </section>
  );
}
