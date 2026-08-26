"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Frontend UI Sprint",
    price: "₹4,999",
    desc: "Conversion of your design files (Figma, Stitch) into pixel-perfect React/Next.js pages.",
    items: [
      "Framer Motion & GSAP transitions",
      "SEO optimized semantic HTML",
      "Fully responsive layouts",
      "Interactive customized components",
    ],
  },
  {
    name: "Full-Stack Presence",
    price: "₹29,999",
    desc: "Complete frontend and backend application built for scale and premium performance.",
    items: [
      "Next.js App Router frontends",
      "Express.js & Node.js REST APIs",
      "MongoDB / MySQL setup",
      "Secure JWT or Firebase Auth integration",
    ],
    featured: true,
  },
  {
    name: "Custom Product Partner",
    price: "₹59,999+",
    desc: "Bespoke SaaS, e-commerce, or complex web system architectures built to your specific business needs.",
    items: [
      "Comprehensive system design documentation",
      "E-commerce payment gateways",
      "API Security & Middleware audits",
      "Dedicated optimization & launch support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 md:px-16 py-20 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-muted mb-4">
            Pricing Plans
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-on-surface">
            Flexible ways to build<br className="hidden md:block" /> your next product.
          </h2>
        </div>
        <a
          href="#contact"
          data-cursor="hover"
          className="text-sm text-muted hover:text-white transition-colors"
        >
          Need a custom scope?
        </a>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`relative rounded-xl p-8 border backdrop-blur-[30px] transition-all duration-500 ${
              plan.featured
                ? "bg-primary/10 border-primary/50 shadow-[0_20px_60px_-30px_rgba(0,102,255,0.8)]"
                : "bg-surface-card border-white/[0.08] hover:border-primary/30"
            }`}
          >
            {plan.featured && (
              <div className="absolute right-6 top-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-primary font-semibold">
                <Sparkles size={14} />
                Popular
              </div>
            )}
            <h3 className="font-display text-2xl font-semibold text-on-surface mb-3">
              {plan.name}
            </h3>
            <p className="text-muted text-sm leading-relaxed min-h-12 mb-8">
              {plan.desc}
            </p>
            <div className="font-display text-4xl font-bold text-on-surface mb-8">
              {plan.price}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-on-surface/85">
                  <Check size={16} className="text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              data-cursor="hover"
              className={`inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors ${
                plan.featured
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "border border-white/15 text-white hover:bg-white/[0.04]"
              }`}
            >
              Start a Project
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
