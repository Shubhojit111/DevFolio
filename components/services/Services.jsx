"use client";

import { motion } from "framer-motion";
import { Diamond, Monitor, Paintbrush } from "lucide-react";
import TextReveal from "@/components/common/TextReveal";

const services = [
  {
    num: "01",
    title: "Brand Identity\n& Strategy",
    icon: Diamond,
    desc: "Crafting cohesive visual identities that communicate your brand's core values and resonate with your audience.",
  },
  {
    num: "02",
    title: "UI/UX Design &\nDigital Experiences",
    icon: Monitor,
    desc: "Designing intuitive interfaces and seamless user journeys that drive engagement and conversion.",
  },
  {
    num: "03",
    title: "Creative\nDirection",
    icon: Paintbrush,
    desc: "Guiding the visual narrative across all touchpoints to ensure a unified, impactful brand presence.",
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

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-16 py-20 max-w-[1440px] mx-auto">
      <div className="mb-14 max-w-2xl">
        {/* Section reveal: heading wipes in via clip-path as it enters the viewport */}
        <motion.h2
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-5"
        >
          What I{" "}
          <span className="font-serif italic text-primary font-normal">bring</span>{" "}
          to the table
        </motion.h2>
        <TextReveal
          text="From brand strategy to pixel-perfect interfaces — a focused set of services built around performance and craft."
          className="text-muted text-base md:text-lg leading-relaxed"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {services.map((s) => (
          <motion.div
            key={s.num}
            variants={item}
            className="group relative bg-surface-card backdrop-blur-[30px] border border-white/[0.08] rounded-xl p-8 flex flex-col justify-between aspect-auto md:aspect-[4/3] hover:border-primary/40 hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-500 shadow-none hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(0,102,255,0.05)]"
          >
            <div>
              <s.icon className="text-primary mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300" size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl md:text-[28px] font-semibold leading-tight text-on-surface whitespace-pre-line">
                {s.num}.<br />{s.title}
              </h3>
              <p className="text-muted/80 text-sm leading-relaxed mt-3 sm:mt-4 opacity-100 transition-opacity duration-500">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
