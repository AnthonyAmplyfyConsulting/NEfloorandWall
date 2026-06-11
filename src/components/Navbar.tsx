"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onRequestEstimate: () => void;
  onLeaveReview: () => void;
}

export default function Navbar({ onRequestEstimate, onLeaveReview }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling down (past hero section threshold, e.g. 700px)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll to the section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  };

  return (
    <>
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            className={styles.navbar}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.navContainer}>
              {/* Logo */}
              <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Image
                  src="/logo_transparent.png"
                  alt="NE Floor & Wall Logo"
                  width={50}
                  height={50}
                  className={styles.logoImg}
                />
                <span className={styles.logoText}>
                  NE FLOOR <span className={styles.logoTextOrange}>& WALL</span>
                </span>
              </div>

              {/* Hamburger Button */}
              <button
                className={styles.menuButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hamburger Overlay Dropdown */}
      <AnimatePresence>
        {isOpen && isScrolled && (
          <motion.div
            className={styles.overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className={styles.overlayContent}>
              <div className={styles.navLinks}>
                <motion.div variants={itemVariants} className={styles.navItem} onClick={() => handleNavClick("hero")}>
                  Home
                </motion.div>
                <motion.div variants={itemVariants} className={styles.navItem} onClick={() => handleNavClick("services")}>
                  Services
                </motion.div>
                <motion.div variants={itemVariants} className={styles.navItem} onClick={() => handleNavClick("resi-comm")}>
                  Residential vs Commercial
                </motion.div>
                <motion.div variants={itemVariants} className={styles.navItem} onClick={() => handleNavClick("testimonials")}>
                  Testimonials
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className={styles.navItem}
                  onClick={() => {
                    setIsOpen(false);
                    onLeaveReview();
                  }}
                >
                  Leave a Review
                </motion.div>
                <motion.div variants={itemVariants} className={styles.navItemCTA}>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onRequestEstimate();
                    }}
                    className={styles.ctaButton}
                  >
                    Get an Estimate
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
