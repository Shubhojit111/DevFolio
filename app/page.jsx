"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/services/Services";
import Marquee from "@/components/home/Marquee";
import Projects from "@/components/works/Projects";
import Journey from "@/components/works/Journey";
import About from "@/components/about/About";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/pricing/Pricing";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";

import CustomCursor from "@/components/common/CustomCursor";
import ParticlesBg from "@/components/common/ParticlesBg";
import SectionBackground from "@/components/common/SectionBackground";
import ZoomSpotlight from "@/components/common/ZoomSpotlight";
import PreFooterCTA from "@/components/layout/PreFooterCTA";
import Assets from "@/Assets/Assets.jsx";

const NAME_CHARS = "SHUBHOJIT DEB".split("");

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const duration = 1400; // total loading time in ms
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out curve for smooth deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);

      if (value !== progressRef.current) {
        progressRef.current = value;
        setDisplayProgress(value);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLoading(false), 450);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Animated Entrance Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-surface-lowest z-[100] flex flex-col items-center justify-center px-8"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/[0.08] rounded-full blur-[80px] sm:blur-[140px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="flex overflow-hidden mb-6 sm:mb-8 flex-wrap justify-center max-w-[90vw]">
                {NAME_CHARS.map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-on-surface inline-block"
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </div>

              <div className="w-[180px] sm:w-[280px] md:w-[320px] h-[2px] bg-white/[0.08] rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-primary"
                  style={{ scaleX: displayProgress / 100, transformOrigin: "left" }}
                />
              </div>

              <div className="flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted/60">
                <span>Loading experience</span>
                <span className="text-primary font-semibold tabular-nums">{displayProgress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Animated Elements */}
      <SectionBackground />
      <CustomCursor />
      <ParticlesBg />

      {/* Main Page Layout — always mounted, fades in after preloader exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: loading ? 0 : 0.3 }}
      >
        <Navbar />
        <main className="min-h-screen relative z-10">
          <div data-bg-color="#0a0a0f">
            <Hero />
          </div>
          <div data-bg-color="#0a0e14">
            <Services />
          </div>
          <div data-bg-color="#0d0a12">
            <Marquee />
          </div>
          <ZoomSpotlight
            image={Assets.Creamy}
            mobileImage={Assets.CreamyMobile}
            eyebrow="Newest Build"
            title="Creamy"
            subtitle="A premium ice cream brand experience & web application built with Next.js, Framer Motion, and Tailwind CSS."
            href="https://creamy-five.vercel.app/"
          />
          <div data-bg-color="#0d0a12">
            <Projects />
          </div>
          <div data-bg-color="#0a120e">
            <Journey />
          </div>
          <div data-bg-color="#120e0a">
            <About />
          </div>
          <div data-bg-color="#0a0a0a">
            <Stats />
            <Testimonials />
          </div>
          <div data-bg-color="#0e0a12">
            <Pricing />
          </div>
          <div data-bg-color="#050505">
            <Contact />
            <PreFooterCTA />
          </div>
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
