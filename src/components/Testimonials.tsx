"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import styles from "./Testimonials.module.css";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  // Position adjustments for the floating animation layout
  initialX: string;
  initialY: string;
  orbitDuration: number;
}

const reviewsData: Review[] = [
  {
    id: 1,
    author: "John M. (Providence, RI)",
    rating: 5,
    text: "NE Floor and Wall refinished our living room hardwood floors. Unbelievable results, zero dust, and very professional! The finish is durable and looks stunning.",
    date: "2 weeks ago",
    initialX: "10%",
    initialY: "15%",
    orbitDuration: 12,
  },
  {
    id: 2,
    author: "Sarah T. (Boston, MA)",
    rating: 5,
    text: "We hired them for our commercial showroom epoxy flooring. The floor is indestructible, slip-resistant, and looks super premium. Highly recommend!",
    date: "1 month ago",
    initialX: "65%",
    initialY: "10%",
    orbitDuration: 14,
  },
  {
    id: 3,
    author: "Robert K. (Hartford, CT)",
    rating: 5,
    text: "Excellent work on our custom PVC accent wall panels. They were fast, clean, and the estimate was spot on. Our clients always compliment the wall.",
    date: "3 weeks ago",
    initialX: "15%",
    initialY: "60%",
    orbitDuration: 10,
  },
  {
    id: 4,
    author: "Elena R. (Newton, MA)",
    rating: 5,
    text: "The LVP flooring they installed in our basement is completely waterproof and looks like real oak wood. Professional crew and finished right on schedule.",
    date: "2 months ago",
    initialX: "70%",
    initialY: "55%",
    orbitDuration: 16,
  },
  {
    id: 5,
    author: "David P. (Worcester, MA)",
    rating: 5,
    text: "Their team was extremely respectful of our home. Cleaned up every day, and the hardwood blending is flawless. Easily 5 stars.",
    date: "3 days ago",
    initialX: "42%",
    initialY: "38%",
    orbitDuration: 11,
  },
];

export default function Testimonials({ onLeaveReview }: { onLeaveReview: () => void }) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 868);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    // Cycle the review spotlight every 4.5 seconds on desktop only
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % reviewsData.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <span className={styles.preTitle}>CLIENT SATISFACTION</span>
          <h2 className={styles.mainTitle}>WHAT OUR CLIENTS SAY</h2>
          <div className={styles.googleSummary}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="var(--color-accent-orange)" color="var(--color-accent-orange)" />
              ))}
            </div>
            <span className={styles.ratingText}>
              <strong>4.9 / 5.0</strong> based on 140+ Google Reviews
            </span>
          </div>
        </div>

        {/* Floating Reviews Canvas */}
        <div className={styles.canvas}>
          {reviewsData.map((review, index) => {
            const isSpotlight = index === spotlightIndex;
            
            return (
              <motion.div
                key={review.id}
                className={`${styles.reviewCard} ${isMobile || isSpotlight ? styles.spotlightCard : styles.dimmedCard}`}
                style={
                  isMobile
                    ? { transformStyle: "preserve-3d" }
                    : {
                        left: review.initialX,
                        top: review.initialY,
                      }
                }
                {...(isMobile
                  ? {
                      initial: { opacity: 0, y: 50, rotateX: 10, scale: 0.96 },
                      whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
                      viewport: { once: true, margin: "-80px" },
                      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.05 },
                    }
                  : {
                      animate: isSpotlight
                        ? {
                            scale: 1.12,
                            zIndex: 100,
                            boxShadow: "0 25px 50px rgba(0, 47, 108, 0.12), 0 0 0 3px var(--color-accent-orange)",
                            x: 0,
                            y: 0,
                          }
                        : {
                            scale: 0.95,
                            zIndex: 10,
                            boxShadow: "var(--shadow-md)",
                            // Slow, continuous organic drift animation
                            x: [0, 8, -8, 0],
                            y: [0, -10, 10, 0],
                          },
                      transition: isSpotlight
                        ? { type: "spring", stiffness: 180, damping: 20 }
                        : {
                            x: {
                              repeat: Infinity,
                              duration: review.orbitDuration,
                              ease: "easeInOut",
                            },
                            y: {
                              repeat: Infinity,
                              duration: review.orbitDuration + 2,
                              ease: "easeInOut",
                            },
                            scale: { duration: 0.4 },
                            zIndex: { duration: 0.4 },
                          },
                    })}
                onClick={isMobile ? undefined : () => setSpotlightIndex(index)}
              >
                {/* Google Badge Overlay */}
                <div className={styles.cardHeader}>
                  <div className={styles.googleLogoPlaceholder}>G</div>
                  <div>
                    <h4 className={styles.author}>{review.author}</h4>
                    <span className={styles.date}>{review.date}</span>
                  </div>
                </div>

                <div className={styles.cardStars}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#FABB05" color="#FABB05" />
                  ))}
                </div>

                <p className={styles.reviewText}>{review.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action for reviews */}
        <div className={styles.ctaWrapper}>
          <p className={styles.ctaText}>Had a great experience with our team?</p>
          <button onClick={onLeaveReview} className={styles.leaveReviewBtn}>
            <MessageSquare size={18} />
            <span>Leave Us a Review</span>
          </button>
        </div>
      </div>
    </section>
  );
}
