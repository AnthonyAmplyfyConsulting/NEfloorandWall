"use client";

import { motion } from "framer-motion";
import styles from "./LogoTicker.module.css";

const row1Companies = [
  "Boston Builders Inc.",
  "Hartford Construction",
  "Providence Dev Group",
  "Worcester Contracting",
  "Mass Commercial Group",
  "Newport Renovations",
  "Bay State Properties",
  "Vanguard Retail Spaces",
];

const row2Companies = [
  "Rhode Island Realty",
  "CT Concrete & Design",
  "VT Timber & Stone",
  "Maine Surface Systems",
  "Granite State Builders",
  "Green Mountain Corp",
  "Beacon Hill Development",
  "Pioneer Property Management",
];

export default function LogoTicker() {
  // We duplicate arrays to ensure seamless infinite looping transition
  const tickerRow1 = [...row1Companies, ...row1Companies];
  const tickerRow2 = [...row2Companies, ...row2Companies];

  return (
    <section id="ticker" className={styles.tickerSection}>
      <div className={styles.sectionTitleWrapper}>
        <span className={styles.preTitle}>TRUSTED BY INDUSTRY LEADERS</span>
        <h3 className={styles.title}>PROJECTS COMPLETED ACROSS NEW ENGLAND</h3>
      </div>

      <div className={styles.tickerContainer}>
        {/* Row 1 - Scroll Left */}
        <div className={styles.tickerTrack}>
          <motion.div
            className={styles.tickerList}
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {tickerRow1.map((company, index) => (
              <div key={`row1-${index}`} className={styles.companyBadge}>
                <div className={styles.dot} />
                <span className={styles.companyName}>{company}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scroll Right */}
        <div className={styles.tickerTrack}>
          <motion.div
            className={styles.tickerList}
            animate={{ x: ["-50%", 0] }}
            transition={{
              ease: "linear",
              duration: 28,
              repeat: Infinity,
            }}
          >
            {tickerRow2.map((company, index) => (
              <div key={`row2-${index}`} className={styles.companyBadge}>
                <div className={styles.dotOrange} />
                <span className={styles.companyName}>{company}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
