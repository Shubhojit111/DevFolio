"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Shubhojit is an outstanding developer. He handled the integration of our complex frontend layout with our backend systems seamlessly. The performance optimizations he introduced boosted our load times significantly.",
    name: "Rajesh Sharma",
    role: "CEO, BharatTech Solutions",
  },
  {
    quote: "Working with Shubhojit on our platform was an exceptional experience. He brings a rare combination of frontend mastery and animation engineering that elevated our entire product experience.",
    name: "Sarah Mitchell",
    role: "Founder, Lumina Studio",
  },
  {
    quote: "Shubhojit converted our complex Figma mockups into a pixel-perfect, interactive e-commerce showcase. The GSAP transitions are exceptionally smooth. A top-tier developer.",
    name: "Priya Patel",
    role: "Product Lead, Yocom E-Commerce",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 md:px-16 py-20 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-on-surface">
          What Clients Say
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={item}
            className="group bg-surface-card backdrop-blur-[30px] border border-white/[0.08] rounded-xl p-8 flex flex-col justify-between hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500"
          >
            <div>
              <Quote size={28} className="text-primary/40 mb-6 group-hover:text-primary/70 transition-colors duration-300" strokeWidth={1.5} />
              <p className="text-on-surface/90 text-base leading-relaxed mb-8">
                &quot;{t.quote}&quot;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-white/10 flex items-center justify-center text-sm font-semibold text-primary">
                {t.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-on-surface text-sm font-semibold">{t.name}</div>
                <div className="text-muted text-xs">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
