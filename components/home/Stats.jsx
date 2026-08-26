"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Award, Medal, Star, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Projects Completed", value: 30, suffix: "+", icon: Star },
  { label: "Happy Clients", value: 50, suffix: "+", icon: Trophy },
  { label: "Years Experience", value: 2, suffix: "+", icon: Medal },
];

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const spring = useSpring(0, { stiffness: 70, damping: 18 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  return (
    <section className="px-6 md:px-16 py-16 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            className="bg-surface-card backdrop-blur-[30px] border border-white/[0.08] rounded-xl p-6 md:p-8 text-center hover:border-primary/30 transition-all duration-500 group"
          >
            <s.icon size={24} className="text-primary mx-auto mb-4 opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            <div className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-muted text-xs uppercase tracking-[0.12em] font-medium">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
