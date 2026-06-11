"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./PolicyModals.module.css";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | null;
}

export default function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
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

  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "PRIVACY POLICY" : "TERMS OF SERVICE";

  return (
    <AnimatePresence>
      {isOpen && type && (
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
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={22} />
            </button>

            <div className={styles.modalContent}>
              <h3 className={styles.title}>{title}</h3>
              <span className={styles.lastUpdated}>Last Updated: June 11, 2026</span>

              <div className={styles.bodyScroll}>
                {isPrivacy ? (
                  /* Privacy Policy Copy */
                  <div className={styles.textContent}>
                    <h4>1. Information We Collect</h4>
                    <p>
                      We collect information you provide directly to us, such as when you request an estimate, fill out our contact forms, or communicate with us. This information may include your name, email address, phone number, physical address, and any details regarding your surfacing needs.
                    </p>

                    <h4>2. How We Use Your Information</h4>
                    <p>
                      We use the information we collect to provide, maintain, and improve our services, including scheduling site assessments, calculating estimates, sending you transactional messages, and responding to your questions.
                    </p>

                    <h4>3. Text Messaging (SMS) Consent</h4>
                    <p>
                      By checking the texting consent box on our estimate forms, you explicitly authorize NE Floor & Wall to contact you via SMS text messages regarding your service request. Message and data rates may apply. Consent to receive text messages is not a condition of purchase. You can opt out at any time by replying STOP to any text message we send.
                    </p>

                    <h4>4. Sharing of Information</h4>
                    <p>
                      We do not sell, rent, or trade your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
                    </p>

                    <h4>5. Security of Your Data</h4>
                    <p>
                      We implement appropriate administrative, technical, and physical security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                    </p>
                  </div>
                ) : (
                  /* Terms of Service Copy */
                  <div className={styles.textContent}>
                    <h4>1. Terms of Use</h4>
                    <p>
                      By accessing this website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>

                    <h4>2. Service Estimations</h4>
                    <p>
                      Any estimate requested or provided through this website is a preliminary estimation based on user-provided details. All binding contracts and final project fees require a physical site assessment, detailed measurement, and a formal signed service agreement between NE Floor & Wall and the client.
                    </p>

                    <h4>3. Communications</h4>
                    <p>
                      By submitting your contact information, you agree that NE Floor & Wall may contact you by phone, email, or text message regarding your project inquiry. If you consent to SMS text messaging, you agree to receive message updates about scheduled appointments, project status, and answers to your requests. You can reply STOP to unsubscribe from SMS at any time.
                    </p>

                    <h4>4. Intellectual Property</h4>
                    <p>
                      The logo, custom graphics, website layout, and text content are the property of NE Floor & Wall. You may not copy, reproduce, republish, or distribute any assets or code from this website without explicit written permission from the company management.
                    </p>

                    <h4>5. Limitations of Liability</h4>
                    <p>
                      In no event shall NE Floor & Wall or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website, even if NE Floor & Wall has been notified orally or in writing of the possibility of such damage.
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.footerActions}>
                <button className={styles.doneBtn} onClick={onClose}>
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
