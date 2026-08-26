"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import TextReveal from "@/components/common/TextReveal";
import { getTechIcon } from "@/Assets/techIcons.jsx";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["React.js", "Next.js", "Tailwind CSS", "GSAP / ScrollTrigger", "Framer Motion", "HTML5 & CSS3"],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Session & Cookies", "API Security / Middlewares"],
  },
  {
    title: "Databases & Core Tools",
    skills: ["MongoDB", "MySQL", "Firebase Auth", "Postman", "Git & GitHub"],
  },
  {
    title: "Design & Office",
    skills: ["Figma", "Stitch", "MS Excel", "MS PowerPoint"],
  },
  {
    title: "IDEs & AI Assistants",
    skills: ["VS Code", "Google Antigravity", "Claude AI"],
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 md:px-16 py-24 max-w-[1440px] mx-auto relative">
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Biography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-8">
            Crafting Systems &<br />
            <span className="font-serif italic text-primary font-normal">
              Fluid Interfaces
            </span>
          </h2>
          
          <div className="space-y-6 text-muted text-base md:text-lg leading-relaxed">
            <TextReveal
              text="I am a frontend-focused full-stack developer with a passion for building highly responsive, interactive web applications. Currently studying Computer Science and Engineering and working at Techzuno, I blend clean software engineering principles with dynamic animation libraries like GSAP and Framer Motion."
            />
            <p>
              I specialize in the MERN stack and Next.js, bridging the gap between back-end data architectures and pixel-perfect front-end presentations. I love solving puzzles, optimizing load times, and designing layouts that feel premium and alive.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 size={16} className="text-primary" />
              <span>Clean Code Architectures</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 size={16} className="text-primary" />
              <span>Stunning Micro-animations</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Bento Skills Stack */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`bg-surface-card backdrop-blur-[20px] border border-white/[0.08] p-6 rounded-2xl hover:border-primary/40 hover:bg-white/[0.03] transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${
                index === 4 ? "sm:col-span-2" : ""
              }`}
            >
              <h3 className="font-display text-lg font-bold text-on-surface mb-4 pb-2 border-b border-white/[0.05] tracking-wide uppercase text-primary/80">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => {
                  const { Icon, color } = getTechIcon(skill);
                  return (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 text-xs bg-white/[0.04] text-muted hover:bg-primary/10 hover:text-primary border border-white/[0.08] hover:border-primary/20 px-3 py-1.5 rounded-lg transition-colors duration-300"
                    >
                      <Icon size={13} style={{ color }} />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 to-indigo-500/5 border border-primary/20 p-6 rounded-2xl flex flex-col justify-between sm:col-span-2"
          >
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                Always Learning & Evolving
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                Applying rigorous computer science education alongside real-world projects deployment at scale. Open to collaboration on cutting-edge design engineering and full-stack solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
