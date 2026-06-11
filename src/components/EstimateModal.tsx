"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import styles from "./EstimateModal.module.css";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    address: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      // Reset form states on close
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        address: "",
        consent: false,
      });
      setStatus("idle");
      setErrors({});
    }

    // Escape key closes modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.consent) newErrors.consent = "SMS consent is required to contact you";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
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
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={22} />
            </button>

            {status !== "success" ? (
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <h3 className={styles.title}>REQUEST AN ESTIMATE</h3>
                  <p className={styles.subtitle}>
                    Fill out the form below. Our surface specialists will review your project details and reach out within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  {/* Name Input */}
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      className={`${styles.input} ${formData.name ? styles.hasValue : ""}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name"
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      className={`${styles.input} ${formData.email ? styles.hasValue : ""}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address"
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>

                  {/* Phone Input */}
                  <div className={styles.formGroup}>
                    <input
                      type="tel"
                      className={`${styles.input} ${formData.phone ? styles.hasValue : ""}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone Number"
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>

                  {/* Service Dropdown */}
                  <div className={styles.formGroup}>
                    <select
                      className={`${styles.select} ${formData.service ? styles.hasValue : ""}`}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="" disabled hidden>Select Service Type</option>
                      <option value="residential">Residential Flooring (Hardwood, Vinyl, Tile)</option>
                      <option value="commercial">Commercial Flooring (Epoxy, Polyaspartic)</option>
                      <option value="walls">Wall & Surface Systems (Panels, Covering)</option>
                    </select>
                    {errors.service && <span className={styles.errorText}>{errors.service}</span>}
                  </div>

                  {/* Address Input */}
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      className={`${styles.input} ${formData.address ? styles.hasValue : ""}`}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Project Site Address"
                    />
                    {errors.address && <span className={styles.errorText}>{errors.address}</span>}
                  </div>

                  {/* SMS Consent Checkbox */}
                  <div className={styles.consentGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxCustom} />
                      <span className={styles.consentText}>
                        I consent to receive text messages or calls from NE Floor & Wall at the phone number provided. Msg & data rates may apply. Reply STOP to cancel.
                      </span>
                    </label>
                    {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className={styles.spinner} size={20} />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Request Free Estimate</span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success State */
              <motion.div
                className={styles.successScreen}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={64} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Request Submitted!</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{formData.name}</strong>. We have received your estimate request for <strong>{formData.service === "residential" ? "Residential Flooring" : formData.service === "commercial" ? "Commercial Flooring" : "Wall Systems"}</strong>.
                </p>
                <p className={styles.successSub}>
                  A surface expert will text or call you at <strong>{formData.phone}</strong> shortly to schedule your site assessment.
                </p>
                <button className={styles.doneBtn} onClick={onClose}>
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
