"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Building2 } from "lucide-react";
import styles from "./ResiCommSplit.module.css";

export default function ResiCommSplit({ onRequestEstimate }: { onRequestEstimate: () => void }) {
  const [hoveredSide, setHoveredSide] = useState<"residential" | "commercial" | null>(null);

  return (
    <section id="resi-comm" className={styles.splitSection}>
      <div className={styles.headerWrapper}>
        <span className={styles.preTitle}>DIVERSE CAPABILITIES</span>
        <h2 className={styles.mainTitle}>RESIDENTIAL VS. COMMERCIAL</h2>
        <p className={styles.subtext}>
          We tailor our methods, materials, and designs to fit the unique demands of your space, whether it is a private residence or a massive commercial facility.
        </p>
      </div>

      <div className={styles.splitWrapper}>
        {/* Residential Side */}
        <motion.div
          className={`${styles.pane} ${styles.residentialPane} ${
            hoveredSide === "residential" ? styles.expanded : hoveredSide === "commercial" ? styles.collapsed : ""
          }`}
          onMouseEnter={() => setHoveredSide("residential")}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{
            flex: hoveredSide === "residential" ? 1.6 : hoveredSide === "commercial" ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <div className={styles.paneBg} />
          
          <div className={styles.paneContent}>
            <div className={styles.paneIconWrapper}>
              <Home size={36} className={styles.resiIcon} />
            </div>

            <span className={styles.paneTag}>PREMIUM HOME CRAFTSMANSHIP</span>
            <h3 className={styles.paneTitle}>Residential Flooring</h3>
            <p className={styles.paneDescription}>
              Transform your living spaces with flooring that balances high-end aesthetics with everyday durability. We handle everything from precision wood placements to dustless sanding and waterproofing.
            </p>

            <div className={styles.detailsBlock}>
              <h4 className={styles.blockHeading}>Key Focus Areas:</h4>
              <ul className={styles.detailsList}>
                <li>Hardwood sand & refinish (zero dust)</li>
                <li>Living spaces, custom kitchen tile</li>
                <li>Waterproof basement LVP systems</li>
                <li>Garage polyaspartic coatings</li>
              </ul>
            </div>

            <button onClick={onRequestEstimate} className={`${styles.paneBtn} ${styles.resiBtn}`}>
              <span>Get Home Estimate</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Commercial Side */}
        <motion.div
          className={`${styles.pane} ${styles.commercialPane} ${
            hoveredSide === "commercial" ? styles.expanded : hoveredSide === "residential" ? styles.collapsed : ""
          }`}
          onMouseEnter={() => setHoveredSide("commercial")}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{
            flex: hoveredSide === "commercial" ? 1.6 : hoveredSide === "residential" ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <div className={styles.paneBg} />

          <div className={styles.paneContent}>
            <div className={styles.paneIconWrapper}>
              <Building2 size={36} className={styles.commIcon} />
            </div>

            <span className={styles.paneTag}>HEAVY-DUTY SPECIAL SYSTEMS</span>
            <h3 className={styles.paneTitle}>Commercial Flooring</h3>
            <p className={styles.paneDescription}>
              High-performance surfaces engineered to meet industry standards. From food-grade seamless epoxy systems to corporate lobbies, we build floors that support your business operations.
            </p>

            <div className={styles.detailsBlock}>
              <h4 className={styles.blockHeading}>Key Focus Areas:</h4>
              <ul className={styles.detailsList}>
                <li>High-traffic retail & corporate lobbies</li>
                <li>Industrial seamless epoxy coatings</li>
                <li>Hygienic wall panels & cove bases</li>
                <li>Fast-cure systems for zero downtime</li>
              </ul>
            </div>

            <button onClick={onRequestEstimate} className={`${styles.paneBtn} ${styles.commBtn}`}>
              <span>Get Commercial Estimate</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
