"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hiddenForProjects, setHiddenForProjects] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The pinned horizontal-scroll Projects gallery gets its own full-bleed
  // moment — the navbar tucks away while it's in view and slides back
  // down once the user scrolls past it.
  useEffect(() => {
    const targets = [
      document.getElementById("projects"),
      document.getElementById("newest-build"),
    ].filter(Boolean);

    if (targets.length === 0) return;

    const visibleMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.isIntersecting);
        });
        const isAnyVisible = Array.from(visibleMap.values()).some(Boolean);
        setHiddenForProjects(isAnyVisible);
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hiddenForProjects && !mobileOpen ? -120 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface-lowest/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/60 py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 max-w-[1440px] mx-auto">
          <a
            href="#"
            className="font-display text-2xl font-bold tracking-tighter text-on-surface hover:text-primary transition-colors duration-300"
            data-cursor="hover"
          >
            Shubhojit<span className="text-primary">.</span>
          </a>

          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted text-sm font-medium hover:text-white transition-colors duration-300 relative group"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex gap-4 items-center">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-semibold text-muted border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
              Available for Work
            </div>
            <a
              href="#contact"
              className="relative text-[11px] uppercase tracking-[0.15em] font-semibold bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]"
              data-cursor="hover"
            >
              Get in Touch
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-on-surface p-2"
            aria-label="Toggle menu"
            data-cursor="hover"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="text-2xl font-display font-semibold text-on-surface hover:text-primary transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: navLinks.length * 0.08,
                duration: 0.4,
              }}
              className="mt-4 text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-white px-8 py-4 rounded-md"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
