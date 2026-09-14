"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  LockKeyhole,
  MapPin,
  Sparkles,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  { duration: "1 Week", price: "NPR 1,000" },
  { duration: "1 Month", price: "NPR 3,000" },
  { duration: "6 Months", price: "NPR 15,000" },
  { duration: "1 Year", price: "NPR 28,000" },
];

const features = [
  [Wifi, "High-Speed Internet", "Reliable connectivity for focused work and online classes."],
  [LockKeyhole, "Personal Lockers", "Keep your books, notes and daily essentials secure."],
  [Zap, "Power-Friendly Desks", "Work comfortably with laptops and devices for long sessions."],
  [Clock3, "Open 7 AM – 9 PM", "A long daily study window designed around your routine."],
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="home-hero">
        <div className="home-hero-grid" />
        <div className="shell home-hero-layout">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span className="eyebrow" variants={reveal}>
              SAMAKHUSI · KATHMANDU
            </motion.span>

            <motion.h1 variants={reveal}>
              Your place to
              <span>focus better.</span>
            </motion.h1>

            <motion.p variants={reveal}>
              A quiet, comfortable study environment with 25 dedicated desks,
              dependable internet and plans that fit the way you study.
            </motion.p>

            <motion.div className="hero-actions" variants={reveal}>
              <Link href="/book" className="primary-btn">
                Book a desk <ArrowRight size={18} />
              </Link>
              <Link href="/plans" className="secondary-btn">
                View plans
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={reveal}>
              <div><strong>25</strong><span>Study desks</span></div>
              <div><strong>4</strong><span>Membership options</span></div>
              <div><strong>7 days</strong><span>Open weekly</span></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <div className="hero-panel-top">
              <span>DESK AVAILABILITY</span>
              <i />
            </div>

            <div className="hero-desk-grid">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <div className="hero-panel-bottom">
              <div>
                <small>STUDY HALL</small>
                <strong>25 desks ready to book</strong>
              </div>
              <Link href="/book">Choose desk</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="shell two-column-copy">
          <div>
            <span className="section-kicker">01 · BUILT FOR FOCUS</span>
          </div>
          <div>
            <h2>Less distraction. More progress.</h2>
            <p>
              Sunshine Study Room gives students and professionals a dedicated
              place to read, prepare, work and stay consistent without the noise
              and interruptions of cafés or crowded public spaces.
            </p>
          </div>
        </div>
      </section>

      <section className="section discussion-highlight">
        <div className="shell discussion-banner">
          <div className="discussion-icon">
            <Users size={30} />
          </div>

          <div>
            <span className="section-kicker">NEED TO TALK IT THROUGH?</span>
            <h2>One private discussion room is available for collaborative study.</h2>
            <p>
              Perfect for group revision, presentations, project planning and
              focused discussions without disturbing the main study hall.
            </p>
          </div>

          <Link href="/about" className="discussion-link">
            Learn more <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section home-plans">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">02 · PLANS</span>
              <h2>Choose your rhythm.</h2>
            </div>
            <p>
              Simple membership options for short-term revision, monthly study
              routines and long-term consistency.
            </p>
          </div>

          <div className="plan-grid">
            {plans.map((plan, index) => (
              <motion.article
                className={`price-card ${index === 1 ? "featured-card" : ""}`}
                key={plan.duration}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                {index === 1 && <span className="popular-tag">POPULAR</span>}
                <small>MEMBERSHIP</small>
                <h3>{plan.duration}</h3>
                <strong>{plan.price}</strong>
                <p>Dedicated access for your study routine.</p>
                <Link href="/book">
                  Choose plan <ArrowRight size={16} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section amenities-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">03 · AMENITIES</span>
              <h2>Everything around you supports focus.</h2>
            </div>
          </div>

          <div className="feature-grid">
            {features.map(([Icon, title, text], index) => {
              const IconComponent = Icon as typeof Wifi;
              return (
                <motion.article
                  key={String(title)}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <IconComponent size={24} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="location-cta">
        <div className="shell location-layout">
          <div>
            <span className="section-kicker dark-kicker">04 · VISIT</span>
            <h2>Find your study spot in Samakhusi.</h2>
            <p>
              Jaldhara Marg, Samakhusi, Kathmandu 44600, Nepal.
            </p>
          </div>

          <div className="location-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sunshine+Study+Room+Jaldhara+Marg+Kathmandu"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={17} /> Get directions
            </a>
            <Link href="/book">
              <BookOpen size={17} /> Book a desk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
