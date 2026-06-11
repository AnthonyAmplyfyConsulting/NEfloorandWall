"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 868);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop mouse movement (3D tilt on hover)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const desktopRotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 200 });
  const desktopRotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 });

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

  // Mobile scroll-driven 3D tilt and translation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });
  const scrollRotateX = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [12, 0, 0, -12]);
  const scrollScale = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.93, 1, 1, 0.93]);
  const scrollOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scrollY = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [40, 0, 0, -40]);

  // Combine based on viewport
  const rotateX = isMobile ? scrollRotateX : desktopRotateX;
  const rotateY = isMobile ? 0 : desktopRotateY;
  const scale = isMobile ? scrollScale : 1;
  const opacity = isMobile ? scrollOpacity : 1;
  const translateY = isMobile ? scrollY : 0;

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardContainer}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        opacity,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      {...(!isMobile ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: index * 0.15 }
      } : {})}
    >
      <div className={styles.cardInner} style={{ transform: "translateZ(30px)" }}>
        {/* Image Visual Spot - Clean Photo Only */}
        <div className={styles.visualSpot}>
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={index === 0}
            className={styles.cardImage}
          />
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
