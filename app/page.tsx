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
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    duration: "1 Week",
    price: "NPR 1,000",
  },
  {
    duration: "1 Month",
    price: "NPR 3,000",
  },
  {
    duration: "6 Months",
    price: "NPR 15,000",
  },
  {
    duration: "1 Year",
    price: "NPR 28,000",
  },
];

const features = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    text: "Reliable connectivity for focused study, research and online classes.",
  },
  {
    icon: LockKeyhole,
    title: "Personal Lockers",
    text: "Keep books, notes and everyday study materials safely stored.",
  },
  {
    icon: Zap,
    title: "Power-Friendly Desks",
    text: "Comfortable individual desks designed for laptops and long study sessions.",
  },
  {
    icon: Clock3,
    title: "Open 7 AM – 9 PM",
    text: "A long daily study window that works around your routine.",
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
          {/* LEFT SIDE */}

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
              A quiet, comfortable study environment with 25 dedicated desks,
              dependable internet and flexible membership plans for students and
              professionals.
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
                <strong>25</strong>

                <span>Study desks</span>
              </div>

              <div>
                <strong>4</strong>

                <span>Membership options</span>
              </div>

              <div>
                <strong>7 days</strong>

                <span>Open weekly</span>
              </div>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT SIDE

              IMPORTANT:
              No booking/table selector on the homepage.
              Actual desk selection only happens on /book.
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

            {/* QUICK INFO */}

            <div
              style={{
                marginTop: "26px",

                display: "grid",

                gap: "13px",
              }}
            >
              {/* ITEM 1 */}

              <div
                style={{
                  padding: "18px",

                  display: "flex",

                  alignItems: "center",

                  gap: "14px",

                  borderRadius: "16px",

                  background: "#eef2ed",
                }}
              >
                <div
                  style={{
                    width: "46px",

                    height: "46px",

                    flexShrink: 0,

                    display: "grid",

                    placeItems: "center",

                    borderRadius: "13px",

                    background: "#ffffff",

                    color: "#f15a24",
                  }}
                >
                  <BookOpen size={21} />
                </div>

                <div>
                  <small
                    style={{
                      display: "block",

                      marginBottom: "4px",

                      color: "#6f7772",

                      fontSize: "9px",

                      fontWeight: "900",

                      letterSpacing: "0.13em",
                    }}
                  >
                    STUDY SPACE
                  </small>

                  <strong
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    25 Individual Desks
                  </strong>
                </div>
              </div>

              {/* ITEM 2 */}

              <div
                style={{
                  padding: "18px",

                  display: "flex",

                  alignItems: "center",

                  gap: "14px",

                  borderRadius: "16px",

                  background: "#eef2ed",
                }}
              >
                <div
                  style={{
                    width: "46px",

                    height: "46px",

                    flexShrink: 0,

                    display: "grid",

                    placeItems: "center",

                    borderRadius: "13px",

                    background: "#ffffff",

                    color: "#f15a24",
                  }}
                >
                  <Clock3 size={21} />
                </div>

                <div>
                  <small
                    style={{
                      display: "block",

                      marginBottom: "4px",

                      color: "#6f7772",

                      fontSize: "9px",

                      fontWeight: "900",

                      letterSpacing: "0.13em",
                    }}
                  >
                    OPEN DAILY
                  </small>

                  <strong
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    7:00 AM – 9:00 PM
                  </strong>
                </div>
              </div>

              {/* ITEM 3 */}

              <div
                style={{
                  padding: "18px",

                  display: "flex",

                  alignItems: "center",

                  gap: "14px",

                  borderRadius: "16px",

                  background: "#eef2ed",
                }}
              >
                <div
                  style={{
                    width: "46px",

                    height: "46px",

                    flexShrink: 0,

                    display: "grid",

                    placeItems: "center",

                    borderRadius: "13px",

                    background: "#ffffff",

                    color: "#f15a24",
                  }}
                >
                  <MapPin size={21} />
                </div>

                <div>
                  <small
                    style={{
                      display: "block",

                      marginBottom: "4px",

                      color: "#6f7772",

                      fontSize: "9px",

                      fontWeight: "900",

                      letterSpacing: "0.13em",
                    }}
                  >
                    LOCATION
                  </small>

                  <strong
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Samakhusi, Kathmandu
                  </strong>
                </div>
              </div>
            </div>

            <div
              className="hero-panel-bottom"
              style={{
                marginTop: "25px",
              }}
            >
              <div>
                <small>READY TO STUDY?</small>

                <strong>Choose your desk online</strong>
              </div>

              <Link href="/book">Book now</Link>
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
              Sunshine Study Room gives students and professionals a dedicated
              place to read, prepare, work and stay consistent without the
              distractions of cafés, busy homes or crowded public spaces.
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
            <span className="section-kicker">NEED TO TALK IT THROUGH?</span>

            <h2>
              One private discussion room is available for collaborative study.
            </h2>

            <p>
              Perfect for group revision, presentations, project planning and
              focused discussions without disturbing the main study hall.
            </p>
          </div>

          <Link href="/about" className="discussion-link">
            Learn more
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          PLANS
      ===================================================== */}

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
                  delay: index * 0.08,
                }}
              >
                {index === 1 && <span className="popular-tag">POPULAR</span>}

                <small>MEMBERSHIP</small>

                <h3>{plan.duration}</h3>

                <strong>{plan.price}</strong>

                <p>Dedicated access for your study routine.</p>

                <Link href="/book">
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
              Book a desk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
