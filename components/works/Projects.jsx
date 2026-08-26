"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Assets from "@/Assets/Assets.jsx";
import TextReveal from "@/components/common/TextReveal";
import { getTechIcon } from "@/Assets/techIcons.jsx";

const projects = [
  {
    title: "Techzuno Agency",
    category: "Full Stack & Design Services",
    year: "2025",
    image: Assets.Techzuno,
    link: "https://techzuno.vercel.app/",
    tech: ["Next.js", "MERN Stack", "GSAP Animations", "Tailwind CSS"],
  },
  {
    title: "Hostzuno Platform",
    category: "Web Hosting Services Layout",
    year: "2025",
    image: Assets.Hostzuno,
    link: "https://hostzuno.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "MERN Stack", "GSAP Animations"],
  },
  {
    title: "Dune",
    category: "Ecommerce Store",
    year: "2026",
    image: Assets.Dune,
    link: "https://dune-ecommerce.vercel.app/",
    tech: ["Next.js", "Node.js & Express", "MongoDB", "JWT Auth"],
  },
  {
    title: "Visit India",
    category: "Tourism Showcase & Platform",
    year: "2024",
    image: Assets.India,
    link: "https://visit-india-pi.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "MERN Stack", "GSAP Animations"],
  },
  {
    title: "Creamy",
    category: "Premium Ice Cream Brand Experience",
    year: "2025",
    image: Assets.Creamy,
    link: "https://creamy-five.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP Animations"],
  },
  {
    title: "Wearit",
    category: "Premium Clothing Brand Storefront",
    year: "2025",
    image: Assets.Wearit,
    link: "https://wear-it2.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP Animations"],
  },
  {
    title: "Wati Homepage",
    category: "Interactive Homepage Reconstruction",
    year: "2024",
    image: Assets.Wati,
    link: "https://wati-ashy.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    title: "Significo Web Clone",
    category: "Immersive Canvas & Scroll Showcase",
    year: "2024",
    image: Assets.Significo,
    link: "https://significo-p2tf.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "MERN Stack", "GSAP ScrollTrigger"],
  },
  {
    title: "DevFeed Hub",
    category: "Developer Social Feed Web Application",
    year: "2024",
    image: Assets.India,
    link: "https://devfeed-zero.vercel.app/",
    tech: ["React.js", "Tailwind CSS", "Node.js & Express", "MongoDB"],
  },
  {
    title: "HireTrack System",
    category: "Full-Stack Job Application Tracker",
    year: "2024",
    image: Assets.India,
    link: "https://hiretrack-shubhojit.vercel.app/",
    tech: ["React.js", "Node.js & Express", "MongoDB", "JWT Auth"],
  },
  {
    title: "Yocom E-Commerce",
    category: "E-Commerce Frontend UI Showcase",
    year: "2024",
    image: Assets.Yocom,
    link: "https://yocom-rho.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "GSAP Animations", "Framer Motion"],
  },
];

function ProjectCard({ p, idx, isActive = false, onMouseMove, onMouseLeave, onMouseEnter, className = "" }) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.7 }}
      className={className}
    >
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        className={`group relative bg-surface-card backdrop-blur-[20px] border rounded-2xl p-5 overflow-hidden cursor-pointer transition-colors duration-500 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] ${
          isActive ? "border-primary/50 bg-white/[0.03]" : "border-white/[0.08] hover:border-primary/40 hover:bg-white/[0.03]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
        data-cursor="project"
        data-cursor-text="VISIT"
        onClick={() => p.link && window.open(p.link, "_blank")}
      >
      <div className="card-glare absolute inset-0 pointer-events-none rounded-2xl z-20" />

      <div
        className="w-full h-56 md:h-72 rounded-xl overflow-hidden mb-6 bg-surface-high relative"
        style={{ transform: "translateZ(30px)" }}
      >
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 45vw"
          priority={idx < 2}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 shadow-[0_0_20px_rgba(0,102,255,0.6)]">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div
        className="flex justify-between items-start px-2 pb-2"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex-1 pr-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-on-surface leading-snug">
            {p.title}
          </h3>
          <p className="text-muted text-sm mt-1">{p.category}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {p.tech.map((t) => {
              const { Icon, color } = getTechIcon(t);
              return (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-[10px] bg-white/[0.04] text-muted border border-white/[0.06] px-2 py-0.5 rounded-md"
                >
                  <Icon size={11} style={{ color }} />
                  {t}
                </span>
              );
            })}
          </div>
        </div>
        <span className="text-[11px] uppercase tracking-[0.1em] text-muted border border-muted/20 px-3 py-1 rounded-full whitespace-nowrap">
          {p.year}
        </span>
      </div>
      </div>
    </motion.div>
  );
}

/**
 * Desktop: pinned section that translates a horizontal track as the user
 * scrolls vertically. A left-hand info panel stays pinned in place the
 * entire time, swapping its title/index as different cards pass by.
 */
function HorizontalGallery({ tiltHandlers }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const panelRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [panelWidth, setPanelWidth] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
      if (panelRef.current) setPanelWidth(panelRef.current.offsetWidth);
      setViewportWidth(window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(projects.length - 1, Math.floor(v * projects.length));
      setActiveIdx((prev) => (prev === idx ? prev : idx));
    });
  }, [scrollYProgress]);

  const availableWidth = Math.max(viewportWidth - panelWidth, 1);
  const scrollDistance = Math.max(trackWidth - availableWidth, 0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Section height controls scroll "runway": how long the pin lasts.
  const sectionHeight = `calc(100vh + ${scrollDistance}px)`;
  const active = projects[activeIdx];

  return (
    <div ref={sectionRef} style={{ height: sectionHeight }} className="relative hidden lg:block">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Pinned info panel — opaque + overflow-hidden so cards actually
            disappear beneath it (rather than showing through) as the
            track scrolls past. Narrower than before so more of the
            gallery is visible. */}
        <div
          ref={panelRef}
          className="w-[240px] xl:w-[280px] shrink-0 h-full flex flex-col justify-center px-8 xl:px-12 relative z-20 overflow-hidden bg-surface-lowest/95 backdrop-blur-2xl"
        >
          <div className="absolute inset-y-0 right-0 w-px bg-white/[0.06]" />
          {/* Soft fade on the inner edge so cards sliding underneath
              blend out rather than hard-clipping at the seam. */}
          <div className="pointer-events-none absolute inset-y-0 -right-10 w-10 bg-gradient-to-r from-surface-lowest/95 to-transparent" />

          <motion.span
            key={`n-${activeIdx}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl xl:text-7xl font-black text-primary/25 leading-none mb-6 tabular-nums"
          >
            {String(activeIdx + 1).padStart(2, "0")}
          </motion.span>
          <motion.h3
            key={`t-${activeIdx}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl xl:text-3xl font-bold text-on-surface mb-3 leading-tight"
          >
            {active.title}
          </motion.h3>
          <motion.p
            key={`c-${activeIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted text-sm mb-8"
          >
            {active.category}
          </motion.p>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted/40">
            {String(activeIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-8 pl-10 xl:pl-14 pr-16 will-change-transform"
        >
          {projects.map((p, idx) => (
            <ProjectCard
              key={p.title}
              p={p}
              idx={idx}
              isActive={idx === activeIdx}
              className="w-[420px] xl:w-[480px] flex-shrink-0"
              {...tiltHandlers}
            />
          ))}
          {/* End cap so the last card doesn't touch the edge */}
          <div className="w-4 flex-shrink-0" />
        </motion.div>

        {/* Progress rail */}
        <div className="absolute bottom-10 left-[240px] xl:left-[280px] right-16 h-px bg-white/[0.08]">
          <motion.div
            className="h-full bg-primary origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    const maxRotateX = 10;
    const maxRotateY = 10;

    const rX = -mouseY * maxRotateX;
    const rY = mouseX * maxRotateY;

    card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glare = card.querySelector(".card-glare");
    if (glare) {
      const gX = (mouseX + 0.5) * 100;
      const gY = (mouseY + 0.5) * 100;
      glare.style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

    const glare = card.querySelector(".card-glare");
    if (glare) {
      glare.style.background = "none";
    }
  };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    card.style.transition = "none";
  };

  const tiltHandlers = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };

  return (
    <section id="projects" className="relative">
      <div className="px-6 md:px-16 pt-24 pb-12 lg:pb-0 max-w-[1440px] mx-auto lg:max-w-none">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-4 lg:mb-16 gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">
              Featured{" "}
              <span className="font-serif italic text-primary font-normal">
                Creations
              </span>
            </h2>
            <TextReveal
              text="A showcase of production systems, e-commerce applications, and interactive web layouts — scroll to explore."
              className="text-muted text-base md:text-lg max-w-lg leading-relaxed"
            />
          </div>
          <span className="hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted/50 flex-shrink-0">
            <span className="w-8 h-px bg-muted/30" />
            Scroll to pan
            <span className="w-8 h-px bg-muted/30" />
          </span>
        </div>
      </div>

      {/* Desktop: pinned horizontal-scroll gallery */}
      <HorizontalGallery tiltHandlers={tiltHandlers} />

      {/* Mobile / tablet: swipeable horizontal strip (native touch scroll, no pin) */}
      <div className="lg:hidden px-6 md:px-16 pb-24">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:-mx-16 md:px-16">
          {projects.map((p, idx) => (
            <ProjectCard
              key={p.title}
              p={p}
              idx={idx}
              className="w-[85vw] sm:w-[420px] flex-shrink-0 snap-center"
              {...tiltHandlers}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
