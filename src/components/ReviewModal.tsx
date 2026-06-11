"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, HeartCrack, Loader2, ArrowRight } from "lucide-react";
import styles from "./ReviewModal.module.css";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [step, setStep] = useState<"rating" | "feedback" | "redirecting" | "success">("rating");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      // Reset state
      setRating(0);
      setHoveredRating(0);
      setFeedback("");
      setStep("rating");
      setIsSubmitting(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating >= 4) {
      setStep("redirecting");
      // Redirect to Yelp after a short delay
      setTimeout(() => {
        window.open("https://www.yelp.com", "_blank", "noopener,noreferrer");
        onClose();
      }, 2000);
    } else {
      setStep("feedback");
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    // Simulate feedback submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalWindow}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={22} />
            </button>

            <div className={styles.modalContent}>
              {step === "rating" && (
                <div className={styles.centerAlign}>
                  <h3 className={styles.title}>LEAVE A REVIEW</h3>
                  <p className={styles.subtitle}>
                    Your opinion matters to us! How would you rate your experience with NE Floor & Wall?
                  </p>
                  
                  <div className={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        key={starValue}
                        type="button"
                        className={styles.starBtn}
                        onClick={() => handleStarClick(starValue)}
                        onMouseEnter={() => setHoveredRating(starValue)}
                        onMouseLeave={() => setHoveredRating(0)}
                        aria-label={`Rate ${starValue} stars`}
                      >
                        <Star
                          size={46}
                          className={styles.starIcon}
                          fill={
                            starValue <= (hoveredRating || rating)
                              ? "var(--color-accent-orange)"
                              : "transparent"
                          }
                          color={
                            starValue <= (hoveredRating || rating)
                              ? "var(--color-accent-orange)"
                              : "var(--border-light)"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <span className={styles.helperText}>Click stars to submit rating</span>
                </div>
              )}

              {step === "redirecting" && (
                <div className={styles.centerAlign}>
                  <h3 className={styles.title}>Thank You!</h3>
                  <div className={styles.successStars}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={28} fill="var(--color-accent-orange)" color="var(--color-accent-orange)" />
                    ))}
                  </div>
                  <p className={styles.successMessage}>
                    We are thrilled you had a 5-star experience! We are now redirecting you to Yelp to share your review with the world.
                  </p>
                  <div className={styles.redirectLoader}>
                    <Loader2 className={styles.spinner} size={28} />
                    <span>Opening Yelp...</span>
                  </div>
                </div>
              )}

              {step === "feedback" && (
                <div className={styles.leftAlign}>
                  <div className={styles.sadHeader}>
                    <HeartCrack size={36} className={styles.sadIcon} />
                    <div>
                      <h3 className={styles.title}>We Appreciate Your Honesty</h3>
                      <p className={styles.subtitle}>
                        We strive for perfection and apologize if we fell short. Please let us know what we can do to make it right.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
                    <div className={styles.formGroup}>
                      <textarea
                        className={styles.textarea}
                        rows={5}
                        placeholder="Tell us what went wrong or how we can improve..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={isSubmitting || !feedback.trim()}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className={styles.spinner} size={18} />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Feedback</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {step === "success" && (
                <div className={styles.centerAlign}>
                  <h3 className={styles.title}>Feedback Received</h3>
                  <p className={styles.successMessage}>
                    Thank you for your constructive comments. Your feedback has been sent directly to our management team. We will review this to improve our quality of work.
                  </p>
                  <button className={styles.doneBtn} onClick={onClose}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
