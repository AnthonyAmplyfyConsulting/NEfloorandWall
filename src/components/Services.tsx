"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, ShieldCheck, Layers, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import styles from "./Services.module.css";

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
}

const services: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential Flooring",
    icon: <Home size={32} />,
    tagline: "ELEGANT & DURABLE HOME COVERS",
    description: "Tailored flooring solutions that enhance the beauty, warmth, and resale value of your home.",
    features: ["Premium Hardwood Install & Refinishing", "Luxury Vinyl Plank (LVP)", "Laminate & Custom Tile Designs"],
    imageUrl: "/residential_flooring.png",
  },
  {
    id: "commercial",
    title: "Commercial Flooring",
    icon: <ShieldCheck size={32} />,
    tagline: "HIGH-TRAFFIC PERFORMANCE SYSTEMS",
    description: "Robust, slip-resistant floor installations built to withstand heavy machinery and endless foot traffic.",
    features: ["Epoxy & Polyaspartic Coatings", "Polished Concrete & Quartz Systems", "Garages, Offices, Retail & Warehouse Floors"],
    imageUrl: "/commercial_flooring.png",
  },
  {
    id: "walls",
    title: "Wall & Surface Systems",
    icon: <Layers size={32} />,
    tagline: "PROTECTIVE & ACCENT COATINGS",
    description: "High-end wall panels, waterproof coverings, and decorative accent systems for any room.",
    features: ["Decorative Wood & Stone Accent Walls", "Waterproof PVC Panel Systems", "Wall Repairs, Epoxy Coatings & Protective Sheets"],
    imageUrl: "/commercial2.png",
  },
];

function ServiceCard({ service, index, onAction }: { service: ServiceItem; index: number; onAction: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse movement (for 3D tilt effect)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jumpy rotations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className={styles.cardInner} style={{ transform: "translateZ(30px)" }}>
        {/* Image Visual Spot */}
        <div className={styles.visualSpot}>
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={index === 0}
            className={styles.cardImage}
          />
          <div className={styles.imageOverlay} />
          
          <div className={styles.iconWrapper} style={{ transform: "translateZ(40px)" }}>
            {service.icon}
          </div>
          {/* Wireframe Grid Accent */}
          <div className={styles.gridAccent} />
        </div>

        {/* Content */}
        <div className={styles.cardContent} style={{ transform: "translateZ(20px)" }}>
          <span className={styles.cardTagline}>{service.tagline}</span>
          <h4 className={styles.cardTitle}>{service.title}</h4>
          <p className={styles.cardDescription}>{service.description}</p>

          <ul className={styles.featureList}>
            {service.features.map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span> {feature}
              </li>
            ))}
          </ul>

          <button onClick={onAction} className={styles.cardBtn}>
            <span>Request Details</span>
            <ArrowUpRight size={18} className={styles.btnArrow} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services({ onRequestEstimate }: { onRequestEstimate: () => void }) {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <span className={styles.preTitle}>OUR CORE EXPERTISE</span>
          <h2 className={styles.mainTitle}>
            STATE-OF-THE-ART SURFACE SOLUTIONS
          </h2>
          <p className={styles.subtext}>
            Whether you are remodeling your home's entryway or designing a high-capacity warehouse floor, we bring New England's highest craftsmanship to your surfaces.
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onAction={onRequestEstimate} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
