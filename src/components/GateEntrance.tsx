"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./GateEntrance.module.css";

interface GateEntranceProps {
  onComplete: () => void;
}

export default function GateEntrance({ onComplete }: GateEntranceProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling during animation
    document.body.classList.add("no-scroll");
    
    // Duration matches our entrance animations
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Let the body scroll again
      document.body.classList.remove("no-scroll");
      onComplete();
    }, 2800); // 2.8 seconds total sequence

    return () => {
      document.body.classList.remove("no-scroll");
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className={styles.overlay} exit={{ pointerEvents: "none" }}>
          {/* Left Gate Panel */}
          <motion.div
            className={`${styles.gate} ${styles.leftGate}`}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ delay: 1.5, duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Right Gate Panel */}
          <motion.div
            className={`${styles.gate} ${styles.rightGate}`}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ delay: 1.5, duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Centered Logo / Branding */}
          <div className={styles.logoContainer}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className={styles.logoWrapper}
            >
              <Image
                src="/logo.png"
                alt="New England Floor & Wall Logo"
                width={260}
                height={260}
                priority
                className={styles.logoImage}
              />
              <motion.div
                className={styles.glow}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            <motion.div
              className={styles.subtext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className={styles.tagline}>Surfaces Expert Systems</p>
              <div className={styles.lineLoader}>
                <motion.div 
                  className={styles.progress}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
