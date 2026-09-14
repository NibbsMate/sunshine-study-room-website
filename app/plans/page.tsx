import Link from "next/link";

import { ArrowRight, Check, X } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    title: "Daily",
    price: "NPR 200",
    duration: "1 day",
    locker: false,
    description: "Perfect for a single focused study day.",
  },
  {
    title: "Weekly",
    price: "NPR 1,000",
    duration: "7 days",
    locker: false,
    description: "A short-term option for revision and intensive study.",
  },
  {
    title: "Monthly",
    price: "NPR 3,500",
    duration: "30 days",
    locker: true,
    description:
      "A balanced plan for building a consistent monthly study routine.",
    popular: true,
  },
  {
    title: "Quarterly",
    price: "NPR 10,500",
    duration: "90 days",
    locker: true,
    description: "Three months of consistent study access.",
    extra: "NPR 1,000 discount on upfront payment",
  },
  {
    title: "Semi-Annual",
    price: "NPR 21,000",
    duration: "180 days",
    locker: true,
    description: "A six-month membership for long-term study goals.",
    extra: "One month discount on upfront payment",
  },
  {
    title: "Annual",
    price: "NPR 42,000",
    duration: "360 days",
    locker: true,
    description: "Year-round access for maximum consistency.",
    extra: "Two months discount on upfront payment",
  },
];

export default function PlansPage() {
  return (
    <main>
      <Navbar />

      <section className="subpage-hero">
        <div className="shell">
          <span className="eyebrow">MEMBERSHIP PLANS</span>

          <h1>Find the plan that fits.</h1>

          <p>
            Choose anything from a single study day to a full-year membership.
          </p>
        </div>
      </section>

      <section className="section plans-page">
        <div className="shell plans-page-grid">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`large-plan-card ${
                plan.popular ? "large-plan-featured" : ""
              }`}
            >
              {plan.popular && (
                <span className="popular-tag">MOST POPULAR</span>
              )}

              <small>MEMBERSHIP</small>

              <h2>{plan.title}</h2>

              <strong>{plan.price}</strong>

              <p>{plan.description}</p>

              <div className="plan-benefits">
                <span>
                  <Check size={15} />

                  {plan.duration}
                </span>

                <span>
                  <Check size={15} />
                  Access to 47 shared study desks
                </span>

                <span>
                  {plan.locker ? <Check size={15} /> : <X size={15} />}

                  {plan.locker ? "Free locker" : "No locker"}
                </span>

                <span>
                  <X size={15} />
                  No refund
                </span>

                {plan.extra && (
                  <span>
                    <Check size={15} />

                    {plan.extra}
                  </span>
                )}
              </div>

              <Link href={`/book?plan=${encodeURIComponent(plan.title)}`}>
                Choose {plan.title}
                <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
