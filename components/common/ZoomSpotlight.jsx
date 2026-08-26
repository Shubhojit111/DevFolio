"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * A pinned section whose image scales from a small rounded card up to a
 * full-bleed screen as the user scrolls through it, with the overlay text
 * fading in once it reaches full size, then fading out on exit.
 */
export default function ZoomSpotlight({ image, mobileImage, eyebrow, title, subtitle, href }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1, 1.12]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [28, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.82, 1], [0, 0.1, 0.2, 0.6]);
  const textOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.78, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.32, 0.48], [36, 0]);

  const activeImage = isMobile && mobileImage ? mobileImage : image;

  return (
    <section
      id="newest-build"
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? "170vh" : "230vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="absolute inset-0 overflow-hidden bg-black/40"
        >
          <Image
            src={activeImage}
            alt={title}
            fill
            className={isMobile && mobileImage ? "object-contain bg-[#050505]" : "object-cover"}
            sizes="100vw"
            priority
          />
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
        </motion.div>

        {/* Overlay copy pinned to the right — the image is the visual
            subject, so the text/CTA sit off to the side rather than
            competing for the center. */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 ml-auto text-right px-6 sm:px-10 md:px-16 max-w-xl"
        >
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4 sm:mb-5">
            {eyebrow}
          </p>
          <h2 className="font-hero-thin text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[1.02] mb-5 sm:mb-6">
            {title}
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-md ml-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 border border-white/30 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-colors duration-300"
            >
              View Project
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
