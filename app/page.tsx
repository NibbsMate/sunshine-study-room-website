"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  BookOpen,
  Clock3,
  LockKeyhole,
  MapPin,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    duration: "Daily",
    price: "NPR 200",
  },
  {
    duration: "Weekly",
    price: "NPR 1,000",
  },
  {
    duration: "Monthly",
    price: "NPR 3,500",
    popular: true,
  },
  {
    duration: "Quarterly",
    price: "NPR 10,500",
  },
  {
    duration: "Semi-Annual",
    price: "NPR 21,000",
  },
  {
    duration: "Annual",
    price: "NPR 42,000",
  },
];

const features = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    text: "Reliable connectivity for research, online classes and productive study sessions.",
  },
  {
    icon: LockKeyhole,
    title: "Personal Lockers",
    text: "Free locker access is included with monthly and longer memberships.",
  },
  {
    icon: Zap,
    title: "Power-Friendly Desks",
    text: "Comfortable individual spaces designed for laptops and long study sessions.",
  },
  {
    icon: Clock3,
    title: "Open 7 AM – 9 PM",
    text: "A long daily study window for morning, daytime and evening study.",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">
        <div className="home-hero-grid" />

        <div className="shell home-hero-layout">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},

              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.span className="eyebrow" variants={reveal}>
              SAMAKHUSI · KATHMANDU
            </motion.span>

            <motion.h1 variants={reveal}>
              Your place to
              <span>focus better.</span>
            </motion.h1>

            <motion.p variants={reveal}>
              A quiet and comfortable study environment with 47 study desks,
              dependable internet and flexible plans from one day to one year.
            </motion.p>

            <motion.div className="hero-actions" variants={reveal}>
              <Link href="/book" className="primary-btn">
                Book a desk
                <ArrowRight size={18} />
              </Link>

              <Link href="/plans" className="secondary-btn">
                View plans
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={reveal}>
              <div>
                <strong>47</strong>

                <span>Study desks</span>
              </div>

              <div>
                <strong>6</strong>

                <span>Membership plans</span>
              </div>

              <div>
                <strong>7 days</strong>

                <span>Open weekly</span>
              </div>
            </motion.div>
          </motion.div>

          {/* =================================================
              INFORMATION CARD
          ================================================= */}

          <motion.div
            className="hero-panel"
            initial={{
              opacity: 0,
              x: 55,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25,
            }}
          >
            <div className="hero-panel-top">
              <span>SUNSHINE STUDY ROOM</span>

              <i />
            </div>

            <div
              style={{
                marginTop: "26px",
                display: "grid",
                gap: "13px",
              }}
            >
              {/* DESKS */}

              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  borderRadius: "17px",
                  background: "#eef2ed",
                }}
              >
                <BookOpen size={23} color="#f15a24" />

                <div>
                  <small>STUDY SPACE</small>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    47 Study Desks
                  </strong>
                </div>
              </div>

              {/* HOURS */}

              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  borderRadius: "17px",
                  background: "#eef2ed",
                }}
              >
                <Clock3 size={23} color="#f15a24" />

                <div>
                  <small>OPEN DAILY</small>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    7 AM – 9 PM
                  </strong>
                </div>
              </div>

              {/* LOCATION */}

              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  borderRadius: "17px",
                  background: "#eef2ed",
                }}
              >
                <MapPin size={23} color="#f15a24" />

                <div>
                  <small>LOCATION</small>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    Samakhusi, Kathmandu
                  </strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="section intro-section">
        <div className="shell two-column-copy">
          <div>
            <span className="section-kicker">01 · BUILT FOR FOCUS</span>
          </div>

          <div>
            <h2>Less distraction. More progress.</h2>

            <p>
              Sunshine Study Room gives students and professionals a quiet
              environment for reading, exam preparation, remote work and
              consistent study.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DISCUSSION ROOM
      ===================================================== */}

      <section className="section discussion-highlight">
        <div className="shell discussion-banner">
          <div className="discussion-icon">
            <Users size={30} />
          </div>

          <div>
            <span className="section-kicker">STUDYING TOGETHER?</span>

            <h2>
              A separate discussion room is available for collaborative study.
            </h2>

            <p>
              Ideal for revision, projects, presentation practice and small
              group discussions.
            </p>
          </div>

          <Link href="/about" className="discussion-link">
            Learn more
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          PRICE LIST
      ===================================================== */}

      <section className="section home-plans">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">02 · PRICE LIST</span>

              <h2>Study for a day or stay for the year.</h2>
            </div>

            <p>
              Six membership options designed for different study routines and
              commitments.
            </p>
          </div>

          <div className="plan-grid">
            {plans.map((plan, index) => (
              <motion.article
                className={`price-card ${plan.popular ? "featured-card" : ""}`}
                key={plan.duration}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                }}
              >
                {plan.popular && (
                  <span className="popular-tag">MOST POPULAR</span>
                )}

                <small>MEMBERSHIP</small>

                <h3>{plan.duration}</h3>

                <strong>{plan.price}</strong>

                <p>Choose this plan for your next study routine.</p>

                <Link href={`/book?plan=${encodeURIComponent(plan.duration)}`}>
                  Choose plan
                  <ArrowRight size={16} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          AMENITIES
      ===================================================== */}

      <section className="section amenities-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">03 · AMENITIES</span>

              <h2>Everything around you supports focus.</h2>
            </div>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <Icon size={24} />

                  <h3>{feature.title}</h3>

                  <p>{feature.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="location-cta">
        <div className="shell location-layout">
          <div>
            <span className="section-kicker dark-kicker">04 · VISIT</span>

            <h2>Find your study spot in Samakhusi.</h2>

            <p>Jaldhara Marg, Samakhusi, Kathmandu 44600, Nepal.</p>
          </div>

          <div className="location-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sunshine+Study+Room+Jaldhara+Marg+Kathmandu"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={17} />
              Get directions
            </a>

            <Link href="/book">
              <BookOpen size={17} />
              Book now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
