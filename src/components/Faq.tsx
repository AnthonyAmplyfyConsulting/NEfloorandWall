"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./Faq.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How long does a typical residential flooring installation take?",
    answer: "For most residential projects (like hardwood or luxury vinyl plank installations), it takes about 2 to 4 days depending on the square footage. Hardwood refinishing projects generally take 3 to 5 days to allow coatings to fully cure. We use dust-containment systems to keep your home clean throughout the process.",
  },
  {
    question: "What is the difference between epoxy and polyaspartic coatings?",
    answer: "Polyaspartic coatings cure much faster (often ready for foot traffic in 24 hours) and provide extreme UV resistance, making them perfect for garages and outdoor areas. Epoxy is highly durable, cost-efficient, and offers thick build protection, making it ideal for indoor commercial warehouses and retail floors.",
  },
  {
    question: "Are your wall systems waterproof?",
    answer: "Yes, we install specialized commercial-grade PVC panels and waterproof wall coverings designed specifically for high-moisture environments like commercial kitchens, bathrooms, laboratories, and residential basements. These systems are highly hygienic, easy to clean, and mold-resistant.",
  },
  {
    question: "How do I get a binding price estimate?",
    answer: "Our initial estimates requested online or over the phone are preliminary. To provide a binding contract quote, we will schedule a brief physical site assessment where one of our specialists measures the room, inspects subfloor moisture/levelness, and discusses your material selections.",
  },
  {
    question: "Do you offer warranties on your flooring systems?",
    answer: "Absolutely. We stand behind our craftsmanship. We offer a 1-year warranty on residential installations and up to a 10-year manufacturer warranty on commercial epoxy and polyaspartic coating materials. Specific warranty details are outlined in each individual service contract.",
  },
];

function FaqAccordion({ item, isOpen, onClick }: { item: FaqItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.active : ""}`}>
      <button className={styles.accordionHeader} onClick={onClick}>
        <span className={styles.questionText}>{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={styles.chevronWrapper}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.accordionContentWrapper}
          >
            <div className={styles.accordionContent}>
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <span className={styles.preTitle}>HAVE QUESTIONS?</span>
          <h2 className={styles.mainTitle}>FREQUENTLY ASKED QUESTIONS</h2>
          <p className={styles.subtext}>
            Find quick answers to common questions about our flooring, wall panels, warranties, and estimate procedures.
          </p>
        </div>

        {/* FAQ List */}
        <div className={styles.accordionList}>
          {faqData.map((item, index) => (
            <FaqAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
