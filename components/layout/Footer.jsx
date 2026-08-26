"use client";

import { ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shubhojitddev" },
  { label: "GitHub", href: "https://github.com/Shubhojit111" },
];

export default function Footer() {
  return (
    <footer className="bg-surface py-16 px-6 md:px-16 relative z-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <a
            href="#"
            data-cursor="hover"
            className="font-display text-2xl font-bold tracking-tighter text-on-surface hover:text-primary transition-colors duration-300"
          >
            Shubhojit<span className="text-primary">.</span>
          </a>
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                data-cursor="hover"
                className="text-[11px] uppercase tracking-[0.15em] font-medium text-muted hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="h-[0.5px] bg-white/[0.06] w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted/60 text-[11px] uppercase tracking-[0.12em]">
            &copy; {new Date().getFullYear()} Shubhojit Deb. Built with Next.js
            & Framer Motion.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor="hover"
            className="flex items-center gap-2 text-muted text-xs hover:text-white transition-colors duration-300 group"
          >
            Back to top
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
