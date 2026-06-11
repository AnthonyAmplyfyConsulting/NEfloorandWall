"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";

interface HeroProps {
  onRequestEstimate: () => void;
}

export default function Hero({ onRequestEstimate }: HeroProps) {
  // Looping construction/interior design stock video placeholder
  const videoUrl = "/hero_video.mp4";

  const handleScrollDown = () => {
    const nextSection = document.getElementById("ticker");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBg}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Light Overlay for contrast */}
      <div className={styles.overlay} />

      {/* Hero Content */}
      <div className={styles.contentContainer}>
        {/* Logo in hero before scroll */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={styles.topBranding}
        >
          <Image
            src="/logo_transparent.png"
            alt="New England Floor & Wall Logo"
            width={90}
            height={90}
            priority
          />
          <h2 className={styles.brandingTitle}>NEW ENGLAND FLOOR & WALL</h2>
        </motion.div>

        {/* Headlines */}
        <div className={styles.headlineWrapper}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            SURFACES EXPERT <span className={styles.orangeText}>SYSTEMS</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            Providing New England with state-of-the-art flooring, wall panels, and high-performance surface systems. Built to last. Designed to impress.
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={styles.ctaWrapper}
        >
          <button
            onClick={onRequestEstimate}
            className={styles.heroCta}
          >
            Get an Estimate
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          onClick={handleScrollDown}
        >
          <span>Explore Our Services</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={24} className={styles.arrow} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
