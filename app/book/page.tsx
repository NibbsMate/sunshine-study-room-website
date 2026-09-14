"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  DoorOpen,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const desks = Array.from({ length: 25 }, (_, i) => i + 1);

const plans = [
  { name: "1 Week", price: 1000 },
  { name: "1 Month", price: 3000 },
  { name: "6 Months", price: 15000 },
  { name: "1 Year", price: 28000 },
];

export default function BookPage() {
  const [booked, setBooked] = useState<number[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<number | null>(1);
  const [plan, setPlan] = useState("1 Month");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sunshine-demo-bookings");
    if (stored) {
      try {
        setBooked(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const available = useMemo(
    () => desks.filter((desk) => !booked.includes(desk)).length,
    [booked]
  );

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[1];

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDesk) return;

    const next = Array.from(new Set([...booked, selectedDesk]));
    setBooked(next);
    localStorage.setItem("sunshine-demo-bookings", JSON.stringify(next));
    setSuccess(true);
  }

  return (
    <main>
      <Navbar />

      <section className="subpage-hero">
        <div className="shell">
          <span className="eyebrow">BOOK YOUR SPACE</span>
          <h1>Choose your desk.</h1>
          <p>
            Select one of 25 desks, choose your plan and send your booking request.
          </p>
        </div>
      </section>

      <section className="section booking-page-section">
        <div className="shell booking-page-grid">
          <div className="seat-card">
            <div className="seat-card-head">
              <div>
                <small>STUDY HALL</small>
                <strong>{available} of 25 available</strong>
              </div>
              <DoorOpen size={24} />
            </div>

            <div className="seat-grid">
              {desks.map((desk) => {
                const isBooked = booked.includes(desk);
                const isSelected = selectedDesk === desk;

                return (
                  <button
                    key={desk}
                    disabled={isBooked}
                    onClick={() => setSelectedDesk(desk)}
                    className={[
                      "seat-button",
                      isBooked ? "seat-booked" : "",
                      isSelected ? "seat-selected" : "",
                    ].join(" ")}
                  >
                    {desk}
                  </button>
                );
              })}
            </div>

            <div className="seat-legend">
              <span><i className="legend-available" /> Available</span>
              <span><i className="legend-selected" /> Selected</span>
              <span><i className="legend-booked" /> Reserved</span>
            </div>
          </div>

          <div className="booking-form-card">
            {!success ? (
              <>
                <span className="section-kicker">BOOKING DETAILS</span>
                <h2>Reserve Desk {selectedDesk ?? "—"}</h2>

                <form onSubmit={submit}>
                  <label>
                    Membership plan
                    <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                      {plans.map((item) => (
                        <option value={item.name} key={item.name}>
                          {item.name} — NPR {item.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Start date
                    <div className="input-with-icon">
                      <CalendarDays size={17} />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                  </label>

                  <label>
                    Full name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </label>

                  <label>
                    Phone number
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      required
                    />
                  </label>

                  <div className="booking-price-summary">
                    <span>{plan}</span>
                    <strong>NPR {selectedPlan.price.toLocaleString()}</strong>
                  </div>

                  <button type="submit" className="submit-booking-btn">
                    Request booking <ArrowRight size={17} />
                  </button>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <span><Check size={31} /></span>
                <h2>Booking request saved.</h2>
                <p>
                  Desk {selectedDesk} has been reserved in this demo for your
                  {plan.toLowerCase()} plan.
                </p>
                <button onClick={() => setSuccess(false)}>
                  Book another desk
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="discussion-note">
        <div className="shell discussion-note-inner">
          <Sparkles size={24} />
          <div>
            <strong>Studying with a group?</strong>
            <span>
              Sunshine also has one separate discussion room for collaborative work.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
