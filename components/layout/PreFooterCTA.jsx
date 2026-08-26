"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CursorImageTrail from "@/components/common/CursorImageTrail";
import Assets from "@/Assets/Assets.jsx";

const allProjectImages = [
  Assets.Techzuno,
  Assets.Hostzuno,
  Assets.Dune,
  Assets.India,
  Assets.Creamy,
  Assets.Wearit,
  Assets.Wati,
  Assets.Significo,
  Assets.Yocom,
];

function MagneticButton({ children, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e) => {
    if ("ontouchstart" in window) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative inline-flex items-center gap-3 bg-primary text-white text-sm md:text-base font-semibold px-9 py-5 rounded-full hover:bg-primary-hover transition-colors duration-300 shadow-[0_15px_40px_rgba(0,102,255,0.35)]"
    >
      {children}
      <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.a>
  );
}

export default function PreFooterCTA() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.2, 1, 1, 0.2]);
  const meshY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const dotsY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-44 bg-surface-lowest overflow-hidden border-t border-white/[0.06] flex items-center justify-center"
    >
      {/* Animated drifting gradient mesh */}
      <motion.div style={{ y: meshY }} className="absolute inset-0 pointer-events-none">
        <div className="animate-mesh absolute top-[10%] left-[15%] w-[420px] h-[420px] bg-primary/[0.1] rounded-full blur-[130px]" />
        <div className="animate-mesh absolute bottom-[5%] right-[15%] w-[360px] h-[360px] bg-indigo-500/[0.08] rounded-full blur-[120px]" style={{ animationDelay: "-6s" }} />
      </motion.div>

      {/* Parallax scattered accent dots */}
      <motion.div style={{ y: dotsY }} className="absolute inset-0 pointer-events-none hidden md:block">
        <span className="absolute top-[20%] left-[12%] w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="absolute top-[70%] left-[22%] w-1 h-1 rounded-full bg-primary/30" />
        <span className="absolute top-[30%] right-[18%] w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="absolute top-[75%] right-[10%] w-1 h-1 rounded-full bg-primary/30" />
        <span className="absolute top-[15%] right-[35%] w-1 h-1 rounded-full bg-primary/20" />
      </motion.div>

      <CursorImageTrail
        images={allProjectImages}
        imageSize={110}
        trailLength={7}
        spawnDistance={60}
        className="w-full flex items-center justify-center py-6"
      >
        <div className="relative z-10 px-6 md:px-16 max-w-[1100px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.28em] font-semibold text-primary mb-6"
          >
            Got an idea worth building?
          </motion.p>

          <motion.h2
            style={{ scale, opacity }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-[1.05] mb-12"
          >
            Let&apos;s turn it into a{" "}
            <span className="font-serif italic text-primary font-normal">product</span>{" "}
            people love.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MagneticButton href="#contact">Start a conversation</MagneticButton>
          </motion.div>
        </div>
      </CursorImageTrail>
    </section>
  );
}
