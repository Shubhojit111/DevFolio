"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/common/ToastProvider";

// Inline SVG components for robust cross-version compatibility
const LinkedInIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    style={{ width: props.size || 24, height: props.size || 24 }}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    style={{ width: props.size || 24, height: props.size || 24 }}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState("idle"); // idle, sending, success
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const phone = "918336819093";
    const text = `Hi Sir/Ma'am, I'm ${formData.name} (${formData.email}).%0A%0A${formData.message}`;
    const waUrl = `https://wa.me/${phone}?text=${text}`;
    window.open(waUrl, "_blank");

    setFormState("success");
    toast({
      type: "success",
      title: "Opening WhatsApp...",
      message: "Your message is ready to send via WhatsApp.",
    });
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="px-6 md:px-16 py-24 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="bg-surface-card backdrop-blur-[20px] border border-white/[0.08] rounded-3xl p-8 md:p-16 relative overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-on-surface leading-[1.1] mb-6">
              Let&apos;s Create Something{" "}
              <span className="font-serif italic text-primary font-normal">
                Exceptional.
              </span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10 max-w-md">
              Have a project in mind, want to collaborate, or just say hello? Drop me a message and let&apos;s build it.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:shubhojityes@gmail.com"
                data-cursor="hover"
                className="flex items-center gap-4 text-muted hover:text-white transition-colors duration-300 group w-fit"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Mail size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted/60 font-semibold">Email Me</div>
                  <div className="text-sm font-medium">shubhojityes@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/shubhojitddev"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-center gap-4 text-muted hover:text-white transition-colors duration-300 group w-fit"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <LinkedInIcon size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted/60 font-semibold">Connect</div>
                  <div className="text-sm font-medium">linkedin.com/in/shubhojitddev</div>
                </div>
              </a>

              <a
                href="https://github.com/Shubhojit111"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-center gap-4 text-muted hover:text-white transition-colors duration-300 group w-fit"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <GitHubIcon size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted/60 font-semibold">GitHub</div>
                  <div className="text-sm font-medium">Explore repositories</div>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase tracking-widest font-semibold text-[10px] ${
                  focusedField === "name" || formData.name
                    ? "-top-2.5 left-3 bg-background rounded-sm px-2 text-primary"
                    : "top-4 text-muted/60"
                }`}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={formState !== "idle"}
                value={formData.name}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                onChange={handleInputChange}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase tracking-widest font-semibold text-[10px] ${
                  focusedField === "email" || formData.email
                    ? "-top-2.5 left-3 bg-background rounded-sm px-2 text-primary"
                    : "top-4 text-muted/60"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={formState !== "idle"}
                value={formData.email}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                onChange={handleInputChange}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase tracking-widest font-semibold text-[10px] ${
                  focusedField === "message" || formData.message
                    ? "-top-2.5 left-3 bg-background rounded-sm px-2 text-primary"
                    : "top-4 text-muted/60"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                disabled={formState !== "idle"}
                value={formData.message}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                onChange={handleInputChange}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-on-surface text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none disabled:opacity-50"
              />
            </div>

            {/* Premium Interactive Button */}
            <motion.button
              type="submit"
              disabled={formState !== "idle"}
              whileHover={formState === "idle" ? { scale: 1.01 } : {}}
              whileTap={formState === "idle" ? { scale: 0.99 } : {}}
              data-cursor="hover"
              className={`flex items-center justify-center gap-3 w-full text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,102,255,0.2)] ${
                formState === "success"
                  ? "bg-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                  : "bg-primary hover:bg-primary-hover"
              } disabled:cursor-not-allowed`}
            >
              <AnimatePresence mode="wait">
                {formState === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <Send size={15} />
                    <span>Send via WhatsApp</span>
                  </motion.div>
                )}

                {formState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={15} className="text-white" />
                    <span>Message Sent!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}