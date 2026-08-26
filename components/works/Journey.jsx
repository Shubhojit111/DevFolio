"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { getTechIcon } from "@/Assets/techIcons.jsx";

const milestones = [
  {
    type: "education",
    title: "Secondary Education (Class X)",
    subtitle: "New Barrackpur Colony Boys' High School (WBBSE)",
    date: "2019",
    description: "Passed general secondary curriculum with distinction. Score: 80.0%",
    skills: ["General Science", "Mathematics"],
    icon: GraduationCap,
  },
  {
    type: "education",
    title: "Higher Secondary (Class XII)",
    subtitle: "New Barrackpur Colony Boys' High School (WBCHSE)",
    date: "2021",
    description: "Completed secondary education focusing on Science stream (Physics, Chemistry, Math, Computer Science). Score: 85.2%",
    skills: ["Physics", "Mathematics", "Computer Science"],
    icon: GraduationCap,
  },
  {
    type: "education",
    title: "BTech in Computer Science & Engineering",
    subtitle: "Sister Nivedita University (SNU), Kolkata",
    date: "2021 - 2025",
    description: "Built strong foundations in data structures, database management, and full-stack software development. Maintained a cumulative CGPA of 7.12.",
    skills: ["Data Structures", "DBMS", "Software Engineering", "Full-Stack Dev"],
    icon: GraduationCap,
  },
  {
    type: "work",
    title: "Frontend Engineer",
    subtitle: "Techzuno",
    date: "DEC 2024 - JAN 2025",
    description: "Built performant UI components and layouts, optimized rendering speed, and collaborated with designers to implement dynamic animations.",
    skills: ["React", "Framer Motion", "GSAP", "Tailwind CSS"],
    icon: Briefcase,
  },
  {
    type: "work",
    title: "Full Stack Developer",
    subtitle: "Techzuno",
    date: "JAN 2025 - PRESENT",
    description: "Developed production-ready client web products including 'Organic' (marketplace) and 'Waterly'. Converted Figma mockups to pixel-perfect code, enhanced responsiveness, and integrated Firebase Authentication.",
    skills: ["React", "Tailwind CSS", "JavaScript", "Firebase Auth", "Responsive UI"],
    icon: Briefcase,
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const runnerTop = useTransform(pathLength, [0, 1], [0, 100]);
  const runnerTopPercent = useMotionTemplate`${runnerTop}%`;

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative px-6 md:px-16 py-24 max-w-[1200px] mx-auto overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 relative"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-6">
          My{" "}
          <span className="font-serif italic text-primary font-normal">
            Journey
          </span>
        </h2>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          A timeline of my professional experience, academic achievements, and growth.
        </p>
      </motion.div>



      <div className="relative mt-12">
        <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.08] -translate-x-1/2" />

        <svg
          className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-1 h-full -translate-x-1/2 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 4 100"
          style={{ height: "calc(100% - 32px)" }}
        >
          <motion.line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="#0066ff"
            strokeWidth="4"
            style={{ pathLength }}
            strokeLinecap="round"
            className="shadow-[0_0_10px_rgba(0,102,255,0.8)]"
          />
        </svg>

        {/* Glowing "runner" that travels down the line with scroll progress —
            gives the timeline a sense of continuous motion rather than
            each card just appearing statically. */}
        <motion.div
          style={{ top: runnerTopPercent }}
          className="absolute left-[30px] md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary shadow-[0_0_16px_rgba(0,102,255,0.9)]" />
          </span>
        </motion.div>

        <div className="space-y-16">
          {milestones.map((item, idx) => {
            const IconComponent = item.icon;
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row relative ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-[30px] md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,102,255,0.2)]"
                  >
                    <IconComponent size={18} className="md:w-5 md:h-5" />
                  </motion.div>
                </div>

                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  <motion.div
                    initial={isMobile ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isLeft ? 45 : -45, y: 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: isMobile ? "0px" : "-30px" }}
                    transition={isMobile ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-surface-card backdrop-blur-[20px] border border-white/[0.08] p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-tr-2xl blur-xl pointer-events-none" />

                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold text-primary uppercase tracking-wider">
                      <span className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                      {item.type === "work" && (
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-3 py-1">
                          Work Experience
                        </span>
                      )}
                      {item.type === "education" && (
                        <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full px-3 py-1">
                          Education
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold text-on-surface mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <h4 className="text-muted text-sm font-medium mb-4">
                      {item.subtitle}
                    </h4>

                    <p className="text-muted/80 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => {
                        const { Icon, color } = getTechIcon(skill);
                        return (
                          <span
                            key={skill}
                            className="flex items-center gap-1.5 text-[11px] bg-white/[0.04] text-muted border border-white/[0.08] px-2.5 py-1 rounded-md"
                          >
                            <Icon size={12} style={{ color }} />
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}