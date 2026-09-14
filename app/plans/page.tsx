import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    title: "1 Week",
    price: "NPR 1,000",
    text: "A simple short-term option for exam preparation or a focused study sprint.",
  },
  {
    title: "1 Month",
    price: "NPR 3,000",
    text: "A balanced plan for building a consistent daily or weekly study routine.",
    popular: true,
  },
  {
    title: "6 Months",
    price: "NPR 15,000",
    text: "Designed for students preparing for longer academic cycles and competitive exams.",
  },
  {
    title: "1 Year",
    price: "NPR 28,000",
    text: "The best long-term value for anyone who wants a dependable year-round study base.",
  },
];

export default function PlansPage() {
  return (
    <main>
      <Navbar />

      <section className="subpage-hero">
        <div className="shell">
          <span className="eyebrow">MEMBERSHIP PLANS</span>
          <h1>Study longer. Pay smarter.</h1>
          <p>
            Four straightforward plans, from one focused week to a full year.
          </p>
        </div>
      </section>

      <section className="section plans-page">
        <div className="shell plans-page-grid">
          {plans.map((plan) => (
            <article
              className={`large-plan-card ${plan.popular ? "large-plan-featured" : ""}`}
              key={plan.title}
            >
              {plan.popular && <span className="popular-tag">POPULAR</span>}
              <small>MEMBERSHIP</small>
              <h2>{plan.title}</h2>
              <strong>{plan.price}</strong>
              <p>{plan.text}</p>

              <div className="plan-benefits">
                <span><Check size={15} /> Dedicated study desk access</span>
                <span><Check size={15} /> High-speed internet</span>
                <span><Check size={15} /> Personal locker availability</span>
                <span><Check size={15} /> Open seven days a week</span>
              </div>

              <Link href="/book">
                Book this plan <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
