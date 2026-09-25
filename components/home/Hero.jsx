"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import CursorImageTrail from "@/components/common/CursorImageTrail";
import Assets from "@/Assets/Assets.jsx";

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "Freelancer",
];

const allProjectImages = [
  Assets.Techzuno,
  Assets.Hostzuno,
  Assets.Dune,
  Assets.India,
  Assets.Creamy,
  Assets.Wearit,
  Assets.Fightclub,
  Assets.DevCreates,
  Assets.Wati,
  Assets.Significo,
  Assets.Yocom,
];

export default function Hero() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const textRowVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handlePanelMove = (e) => {
    const el = panelRef.current;
    if (!el || "ontouchstart" in window) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${-py * 5}deg) rotateY(${px * 6}deg)`;
  };

  const handlePanelLeave = () => {
    const el = panelRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
  };

  const handlePanelEnter = () => {
    const el = panelRef.current;
    if (el) el.style.transition = "none";
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Ambient gradients */}
      <div className="absolute top-[18%] left-[8%] w-[300px] sm:w-[420px] md:w-[560px] h-[300px] sm:h-[420px] md:h-[560px] bg-primary/[0.07] rounded-full blur-[100px] md:blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-6 right-[12%] w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] bg-indigo-500/[0.04] rounded-full blur-[90px] md:blur-[110px] pointer-events-none z-0" />

      <CursorImageTrail
        images={allProjectImages}
        imageSize={160}
        trailLength={7}
        spawnDistance={60}
        className="w-full"
      >
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-10 relative z-10 py-4">
          {/* Left: Kinetic headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY, opacity: textOpacity }}
            className="max-w-5xl relative z-10 w-full lg:w-[58%]"
          >
            <motion.div
              variants={elementVariants}
              className="flex items-center gap-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-primary mb-6 md:mb-8 flex-wrap"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="hidden sm:inline text-muted/30"> / </span>
              <span className="hidden sm:inline text-muted/80 normal-case tracking-[0.18em]">Kolkata, India</span>
            </motion.div>

            <h1 className="font-hero-thin text-[2.2rem] sm:text-5xl md:text-6xl lg:text-6xl leading-[1.08] tracking-[-0.03em] text-on-surface mb-6 md:mb-8 font-bold">
              <span className="block overflow-hidden py-1">
                <motion.span variants={textRowVariants} className="inline-block">
                  Shubhojit Deb
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span variants={textRowVariants} className="inline-block">
                  designs &amp; builds{" "}
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span variants={textRowVariants} className="inline-block">
                  <span className="font-serif italic font-normal text-primary tracking-tight">
                    exceptional
                  </span>{" "}
                  products.
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={elementVariants}
              className="text-muted text-sm sm:text-base md:text-[17px] leading-[1.65] max-w-xl mb-8 md:mb-10"
            >
              Frontend Specialist &amp; Full-Stack Developer engineering highly performant,
              custom-animated interfaces with solid backend implementations.
            </motion.p>

            <motion.div
              variants={elementVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start"
            >
              <a
                href="#projects"
                data-cursor="hover"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-7 py-3.5 rounded-md hover:bg-primary-hover transition-all duration-300 shadow-[0_10px_30px_rgba(0,102,255,0.22)] hover:shadow-[0_15px_40px_rgba(0,102,255,0.38)]"
              >
                Explore Projects
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </a>
              <a
                href="#contact"
                data-cursor="hover"
                className="inline-flex items-center justify-center border border-white/15 text-white/90 text-[11px] uppercase tracking-[0.15em] font-semibold px-7 py-3.5 rounded-md hover:bg-white/[0.04] hover:border-white/25 transition-all duration-300"
              >
                Get in touch
              </a>
              <a
                href="/api/resume"
                download
                data-cursor="hover"
                className="group inline-flex items-center justify-center gap-2 text-primary text-[11px] uppercase tracking-[0.15em] font-semibold px-3 py-3.5 hover:text-primary-hover transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                R&eacute;sum&eacute;
              </a>
            </motion.div>
          </motion.div>

          {/* Right: live "code snippet" panel */}
          <motion.div
            style={{ y: panelY }}
            className="lg:w-[38%] relative z-10 flex-shrink-0 w-full"
          >
            <div
              ref={panelRef}
              onMouseMove={handlePanelMove}
              onMouseLeave={handlePanelLeave}
              onMouseEnter={handlePanelEnter}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full rounded-2xl bg-[#0b0b0f]/85 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_70px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Editor title bar */}
              <div className="relative flex items-center gap-2 px-4 sm:px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-[11px] font-mono text-muted/60">about.me.js</span>
                <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-muted/40">
                  <Star size={10} className="text-primary/60" />
                  node
                </span>
              </div>

              {/* Code body */}
              <div className="relative px-4 sm:px-7 py-5 sm:py-7 font-mono text-[12px] sm:text-[13.5px] leading-[1.85] overflow-x-auto">
                <p>
                  <span className="text-[#c586c0]">const</span>{" "}
                  <span className="text-[#9cdcfe]">shubhojitDeb</span>{" "}
                  <span className="text-white/50">=</span>{" "}
                  <span className="text-white/50">{"{"}</span>
                </p>

                <p className="pl-4 sm:pl-5 flex items-baseline flex-wrap">
                  <span className="text-[#9cdcfe]">role</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="relative inline-flex h-[1.4em] overflow-hidden ml-1 align-bottom">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roleIdx}
                        initial={{ y: "60%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-60%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#ce9178] whitespace-nowrap"
                      >
                        &apos;{roles[roleIdx]}&apos;
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-white/50">,</span>
                </p>

                <p className="pl-4 sm:pl-5">
                  <span className="text-[#9cdcfe]">location</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-[#ce9178]">&apos;Kolkata, India&apos;</span>
                  <span className="text-white/50">,</span>
                </p>

                <p className="pl-4 sm:pl-5">
                  <span className="text-[#9cdcfe]">stack</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-white/50">[</span>
                  <span className="text-[#ce9178]">&apos;Next.js&apos;</span>
                  <span className="text-white/50">,</span>{" "}
                  <span className="text-[#ce9178]">&apos;MERN&apos;</span>
                  <span className="text-white/50">,</span>{" "}
                  <span className="text-[#ce9178]">&apos;Tailwind&apos;</span>
                  <span className="text-white/50">],</span>
                </p>

                <p className="pl-4 sm:pl-5">
                  <span className="text-[#9cdcfe]">projects</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-[#b5cea8]">30+</span>
                  <span className="text-white/50">,</span>
                </p>

                <p className="pl-4 sm:pl-5">
                  <span className="text-[#9cdcfe]">experience</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-[#ce9178]">&apos;2+ years&apos;</span>
                  <span className="text-white/50">,</span>
                </p>

                <p className="pl-4 sm:pl-5">
                  <span className="text-[#9cdcfe]">availableForWork</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-[#569cd6]">true</span>
                  <span className="w-2 bg-white/60 ml-1.5 inline-block h-[1em] align-middle animate-caret" />
                </p>

                <p>
                  <span className="text-white/50">{"};"}</span>
                </p>
              </div>

              <div className="relative flex items-center justify-between gap-3 mx-4 sm:mx-7 mb-5 sm:mb-7 text-[11px] uppercase tracking-[0.15em] font-semibold text-muted border border-white/10 rounded-full px-4 py-2.5">
                <span className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                  Available for Work
                </span>
                <a href="#contact" data-cursor="hover" className="text-primary hover:text-primary-hover transition-colors">
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </CursorImageTrail>

      <motion.div
        variants={elementVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 left-6 md:left-16 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted/50 z-10"
      >
        <span className="w-8 h-px bg-muted/30" />
        Scroll
      </motion.div>
    </section>
  );
}

