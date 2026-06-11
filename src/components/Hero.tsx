"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";

interface HeroProps {
  onRequestEstimate: () => void;
}

export default function Hero({ onRequestEstimate }: HeroProps) {
  const videoUrl = "/hero_video.mp4";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force mobile-friendly autoplay attributes programmatically
    video.muted = true;
    video.setAttribute("playsinline", "true");
    
    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay blocked, waiting for user interaction:", error);
          
          // Play on first user touch or click if blocked by Low Power Mode or browser restrictions
          const handleFirstInteraction = () => {
            video.play().catch(e => console.error("Play on interaction failed:", e));
            window.removeEventListener("touchstart", handleFirstInteraction);
            window.removeEventListener("click", handleFirstInteraction);
          };
          window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
          window.addEventListener("click", handleFirstInteraction, { passive: true });
        });
      }
    };

    // If browser is already loaded/loading, try playing
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo);
    }

    return () => {
      video.removeEventListener("loadeddata", playVideo);
    };
  }, []);

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
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
