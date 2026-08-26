"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

// Inline brand icons since Lucide removed them
const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const FacebookIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const socials = [
  { name: "GitHub", icon: GithubIcon, href: "https://github.com/Shubhojit111", color: "hover:text-white hover:bg-white/10" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/shubhojitddev", color: "hover:text-[#0a66c2] hover:bg-[#0a66c2]/10" },
  { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/shubhojitdeb.YES", color: "hover:text-[#1877f2] hover:bg-[#1877f2]/10" },
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/hiits.deb/", color: "hover:text-[#e4405f] hover:bg-[#e4405f]/10" },
  { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/918336819093", color: "hover:text-[#25d366] hover:bg-[#25d366]/10" },
];

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-8 z-[100] flex flex-col items-center gap-3">
      {/* Social links container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3 pb-2"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.3, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: 10 }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`w-10 h-10 rounded-full bg-surface-card border border-white/10 flex items-center justify-center text-muted backdrop-blur-md transition-colors duration-300 ${social.color} shadow-[0_5px_15px_rgba(0,0,0,0.3)]`}
                title={social.name}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer shadow-[0_0_20px_rgba(0,102,255,0.4)] relative z-10 transition-transform duration-200 hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close social menu" : "Open social menu"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.div>
      </button>
    </div>
  );
}