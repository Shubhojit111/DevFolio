"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const STYLES = {
  success: {
    wrap: "bg-emerald-500/15 border-emerald-400/30",
    badge: "bg-emerald-500",
    sub: "text-emerald-200/70",
    bar: "bg-emerald-400/50",
    glow: "shadow-[0_20px_60px_rgba(16,185,129,0.3)]",
  },
  error: {
    wrap: "bg-rose-500/15 border-rose-400/30",
    badge: "bg-rose-500",
    sub: "text-rose-200/70",
    bar: "bg-rose-400/50",
    glow: "shadow-[0_20px_60px_rgba(244,63,94,0.3)]",
  },
  info: {
    wrap: "bg-primary/15 border-primary/30",
    badge: "bg-primary",
    sub: "text-primary/70",
    bar: "bg-primary/50",
    glow: "shadow-[0_20px_60px_rgba(0,102,255,0.3)]",
  },
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "success", title, message, duration = 5000 }) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}

      <div className="fixed top-8 right-6 z-[200] flex flex-col items-end gap-3 pointer-events-none w-[min(92vw,380px)]">
        <AnimatePresence>
          {toasts.map((t) => {
            const s = STYLES[t.type] || STYLES.info;
            const Icon = ICONS[t.type] || Info;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 120, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 120, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto relative flex items-center gap-3 backdrop-blur-2xl border ${s.wrap} ${s.glow} text-white px-6 py-4 rounded-2xl overflow-hidden w-full`}
              >
                <div className={`w-8 h-8 rounded-full ${s.badge} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="pr-6 flex-1">
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.message && (
                    <p className={`text-xs ${s.sub} mt-0.5`}>{t.message}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="ml-2 text-white/40 hover:text-white transition-colors text-lg leading-none flex-shrink-0"
                  aria-label="Dismiss"
                >
                  ×
                </button>
                {t.duration > 0 && (
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: t.duration / 1000, ease: "linear" }}
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${s.bar} origin-left`}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}