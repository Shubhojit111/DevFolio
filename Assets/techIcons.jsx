import {
  SiNextdotjs,
  SiReact,
  SiFramer,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFigma,
  SiJsonwebtokens,
  SiGit,
  SiGithub,
  SiFirebase,
  SiMysql,
  SiGreensock,
  SiHtml5,
  SiCss,
  SiPostman,
} from "react-icons/si";
import { Layers, Webhook, Sparkles, Bot, Paintbrush2, Code2, FileSpreadsheet, Presentation } from "lucide-react";

/**
 * Central map of "tech label" -> real logo + brand color.
 * Anything not covered here falls back to a neutral generic icon so the
 * UI never breaks on a new label, but every tag actually used across the
 * site (Marquee, Project cards, About skills) is listed explicitly.
 */
const TECH_ICON_MAP = {
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "React": { Icon: SiReact, color: "#61DAFB" },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Node.js & Express": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { Icon: SiExpress, color: "#FFFFFF" },
  "MongoDB": { Icon: SiMongodb, color: "#47A248" },
  "MERN Stack": { Icon: Layers, color: "#00ED64" },
  "Figma Integration": { Icon: SiFigma, color: "#F24E1E" },
  "Figma": { Icon: SiFigma, color: "#F24E1E" },
  "Stitch Design": { Icon: Paintbrush2, color: "#A78BFA" },
  "Stitch": { Icon: Paintbrush2, color: "#A78BFA" },
  "API Development": { Icon: Webhook, color: "#0066FF" },
  "JWT Auth": { Icon: SiJsonwebtokens, color: "#FB015B" },
  "REST APIs": { Icon: Webhook, color: "#0066FF" },
  "Git & GitHub": { Icon: SiGithub, color: "#FFFFFF" },
  "Git": { Icon: SiGit, color: "#F05032" },
  "GitHub": { Icon: SiGithub, color: "#FFFFFF" },
  "Firebase": { Icon: SiFirebase, color: "#FFCA28" },
  "Firebase Auth": { Icon: SiFirebase, color: "#FFCA28" },
  "MySQL": { Icon: SiMysql, color: "#4479A1" },
  "GSAP": { Icon: SiGreensock, color: "#88CE02" },
  "GSAP Animations": { Icon: SiGreensock, color: "#88CE02" },
  "GSAP ScrollTrigger": { Icon: SiGreensock, color: "#88CE02" },
  "GSAP / ScrollTrigger": { Icon: SiGreensock, color: "#88CE02" },
  "HTML5 & CSS3": { Icon: SiHtml5, color: "#E34F26", Icon2: SiCss, color2: "#1572B6" },
  "Postman": { Icon: SiPostman, color: "#FF6C37" },
  "VS Code": { Icon: Code2, color: "#007ACC" },
  "MS Excel": { Icon: FileSpreadsheet, color: "#217346" },
  "MS PowerPoint": { Icon: Presentation, color: "#B7472A" },
  "Google Antigravity": { Icon: Sparkles, color: "#8C90A1" },
  "Claude AI": { Icon: Bot, color: "#D97757" },
};

const FALLBACK = { Icon: Sparkles, color: "#8C90A1" };

export function getTechIcon(label) {
  return TECH_ICON_MAP[label] || FALLBACK;
}

export default TECH_ICON_MAP;
