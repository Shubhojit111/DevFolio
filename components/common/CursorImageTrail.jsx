"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A trail of images that follows the cursor with fade, scale, and rotation
 * animations — adapted from the "Cursor Image Trail" component (Motion-
 * powered) for use inside this codebase without the shadcn CLI/registry.
 *
 * Usage:
 *   <CursorImageTrail images={[...]} className="h-[480px] w-full">
 *     <p>Move your cursor</p>
 *   </CursorImageTrail>
 */
export default function CursorImageTrail({
  images,
  imageSize = 120,
  trailLength = 8,
  spawnDistance = 80,
  rotationRange = 20,
  containerRef,
  className = "",
  children,
}) {
  const [trail, setTrail] = useState([]);
  const lastPoint = useRef(null);
  const nextIndex = useRef(0);
  const nextId = useRef(0);
  const localRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = (containerRef && containerRef.current) || localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastPoint.current) {
        const dx = x - lastPoint.current.x;
        const dy = y - lastPoint.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < spawnDistance) return;
      }
      lastPoint.current = { x, y };

      const rawImage = images[nextIndex.current % images.length];
      const image = typeof rawImage === "string" ? rawImage : rawImage?.src || rawImage;
      nextIndex.current += 1;
      const id = nextId.current++;
      const rotation = (Math.random() * 2 - 1) * rotationRange;

      setTrail((prev) => {
        const next = [...prev, { id, image, x, y, rotation }];
        return next.slice(-trailLength);
      });
    },
    [containerRef, images, spawnDistance, rotationRange, trailLength]
  );

  const handleMouseLeave = useCallback(() => {
    setTrail([]);
    lastPoint.current = null;
  }, []);

  return (
    <div
      ref={localRef}
      onMouseMove={handleMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {trail.map((item, i) => {
          const isNewest = i === trail.length - 1;
          const depth = trail.length - 1 - i;
          const scale = Math.max(0.35, 1 - depth * 0.09);
          const opacity = Math.max(0.08, 1 - depth * 0.12);

          return (
            <motion.img
              key={item.id}
              src={item.image}
              alt=""
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: isNewest ? 1 : opacity,
                scale,
                rotate: item.rotation,
              }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                width: imageSize,
                height: imageSize,
                objectFit: "cover",
                borderRadius: 12,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          );
        })}
      </AnimatePresence>
      {children}
    </div>
  );
}

/*
Credits: adapted from the "Cursor Image Trail" component — a trail of
images that follows the cursor with fade, scale, and rotation animations
powered by Motion. Most components like this are inspired by / recreated
from existing patterns across the web; this local version drops the
shadcn registry install step so it can live directly in this repo.
*/
