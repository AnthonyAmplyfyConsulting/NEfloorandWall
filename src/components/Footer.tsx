"use client";

import Image from "next/image";
import { Star, Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

interface FooterProps {
  onOpenPolicy: (type: "privacy" | "terms") => void;
  onLeaveReview: () => void;
}

export default function Footer({ onOpenPolicy, onLeaveReview }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Company Bio */}
          <div className={styles.columnBrand}>
            <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Image
                src="/logo_transparent.png"
                alt="New England Floor & Wall Logo"
                width={50}
                height={50}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>
                NE FLOOR <span className={styles.logoTextOrange}>& WALL</span>
              </span>
            </div>
            <p className={styles.bio}>
              New England's premier surface expert systems. Offering advanced flooring installation and custom wall systems for homes and commercial facilities.
            </p>
            <div className={styles.socials}>
              {/* Custom SVG Facebook Icon */}
              <a href="#" aria-label="Facebook" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Custom SVG Instagram Icon */}
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Custom SVG Twitter Icon */}
              <a href="#" aria-label="Twitter" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.columnLinks}>
            <h4 className={styles.columnHeading}>Navigation</h4>
            <ul className={styles.linkList}>
              <li onClick={() => handleNavClick("hero")}>Home</li>
              <li onClick={() => handleNavClick("services")}>Services</li>
              <li onClick={() => handleNavClick("resi-comm")}>Residential vs Commercial</li>
              <li onClick={() => handleNavClick("testimonials")}>Testimonials</li>
              <li onClick={onLeaveReview} className={styles.reviewTrigger}>
                Leave a Review <Star size={14} className={styles.starIcon} fill="var(--color-accent-orange)" color="var(--color-accent-orange)" />
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.columnLinks}>
            <h4 className={styles.columnHeading}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <Phone size={18} className={styles.contactIcon} />
                <span>(555) 389-4920</span>
              </li>
              <li>
                <Mail size={18} className={styles.contactIcon} />
                <span>info@nefloorandwall.com</span>
              </li>
              <li>
                <MapPin size={18} className={styles.contactIcon} />
                <span>120 Industrial Parkway, Providence, RI 02904</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © {currentYear} New England Floor & Wall. All rights reserved.
          </span>
          <div className={styles.legalLinks}>
            <button onClick={() => onOpenPolicy("privacy")} className={styles.legalBtn}>
              Privacy Policy
            </button>
            <span className={styles.separator}>|</span>
            <button onClick={() => onOpenPolicy("terms")} className={styles.legalBtn}>
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
