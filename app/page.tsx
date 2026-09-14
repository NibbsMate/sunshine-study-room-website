"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  DoorOpen,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =====================================================
   DESKS
===================================================== */

const desks = Array.from(
  {
    length: 25,
  },
  (_, i) => i + 1,
);

/* =====================================================
   PLANS
===================================================== */

const plans = [
  {
    name: "1 Week",
    price: 1000,
  },
  {
    name: "1 Month",
    price: 3000,
  },
  {
    name: "6 Months",
    price: 15000,
  },
  {
    name: "1 Year",
    price: 28000,
  },
];

/* =====================================================
   DATE HELPERS
===================================================== */

function getToday() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number) {
  if (!dateString) {
    return "";
  }

  const date = new Date(`${dateString}T00:00:00`);

  date.setDate(date.getDate() + days);

  return formatInputDate(date);
}

function calculateSuggestedEndDate(startDate: string, plan: string) {
  if (!startDate) {
    return "";
  }

  const date = new Date(`${startDate}T00:00:00`);

  if (plan === "1 Week") {
    date.setDate(date.getDate() + 7);
  }

  if (plan === "1 Month") {
    date.setMonth(date.getMonth() + 1);
  }

  if (plan === "6 Months") {
    date.setMonth(date.getMonth() + 6);
  }

  if (plan === "1 Year") {
    date.setFullYear(date.getFullYear() + 1);
  }

  return formatInputDate(date);
}

function formatInputDate(date: Date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatReadableDate(dateString: string) {
  if (!dateString) {
    return "";
  }

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDaysBetween(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);

  const end = new Date(`${endDate}T00:00:00`);

  const difference = end.getTime() - start.getTime();

  return Math.round(difference / (1000 * 60 * 60 * 24));
}

/* =====================================================
   PAGE
===================================================== */

export default function BookPage() {
  const [booked, setBooked] = useState<number[]>([]);

  const [selectedDesk, setSelectedDesk] = useState<number | null>(1);

  const [plan, setPlan] = useState("1 Month");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [success, setSuccess] = useState(false);

  const [availabilityMessage, setAvailabilityMessage] = useState("");

  /* =====================================================
     LOAD LOCAL DEMO BOOKINGS
  ===================================================== */

  useEffect(() => {
    const stored = localStorage.getItem("sunshine-demo-bookings");

    if (stored) {
      try {
        setBooked(JSON.parse(stored));
      } catch {
        // Ignore invalid local storage
      }
    }
  }, []);

  /* =====================================================
     DESK AVAILABILITY
  ===================================================== */

  const available = useMemo(() => {
    return desks.filter((desk) => !booked.includes(desk)).length;
  }, [booked]);

  /* =====================================================
     SELECTED PLAN
  ===================================================== */

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[1];

  /* =====================================================
     BOOKING DAYS
  ===================================================== */

  const bookingDays = useMemo(() => {
    return getDaysBetween(startDate, endDate);
  }, [startDate, endDate]);

  const bookingUnavailable = Boolean(startDate && endDate && bookingDays < 7);

  /* =====================================================
     START DATE CHANGE
  ===================================================== */

  function handleStartDateChange(value: string) {
    setStartDate(value);

    setAvailabilityMessage("");

    if (!value) {
      setEndDate("");
      return;
    }

    const suggestedEndDate = calculateSuggestedEndDate(value, plan);

    setEndDate(suggestedEndDate);
  }

  /* =====================================================
     PLAN CHANGE
  ===================================================== */

  function handlePlanChange(value: string) {
    setPlan(value);

    setAvailabilityMessage("");

    if (startDate) {
      const suggestedEndDate = calculateSuggestedEndDate(startDate, value);

      setEndDate(suggestedEndDate);
    }
  }

  /* =====================================================
     END DATE CHANGE
  ===================================================== */

  function handleEndDateChange(value: string) {
    setEndDate(value);

    if (!startDate || !value) {
      setAvailabilityMessage("");
      return;
    }

    const days = getDaysBetween(startDate, value);

    if (days < 7) {
      setAvailabilityMessage("Unavailable — minimum booking period is 1 week.");

      return;
    }

    setAvailabilityMessage("");
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedDesk) {
      return;
    }

    if (!startDate || !endDate) {
      setAvailabilityMessage(
        "Please select both your start date and end date.",
      );

      return;
    }

    if (bookingDays < 7) {
      setAvailabilityMessage("Unavailable — minimum booking period is 1 week.");

      return;
    }

    const next = Array.from(new Set([...booked, selectedDesk]));

    setBooked(next);

    localStorage.setItem("sunshine-demo-bookings", JSON.stringify(next));

    setSuccess(true);

    setAvailabilityMessage("");
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main>
      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="subpage-hero">
        <div className="shell">
          <span className="eyebrow">BOOK YOUR SPACE</span>

          <h1>Choose your desk.</h1>

          <p>
            Select one of 25 desks, choose your membership plan and send your
            booking request.
          </p>
        </div>
      </section>

      {/* =================================================
          BOOKING SECTION
      ================================================= */}

      <section className="section booking-page-section">
        <div className="shell booking-page-grid">
          {/* =============================================
              DESK SELECTOR
          ============================================= */}

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
                    type="button"
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
              <span>
                <i className="legend-available" />
                Available
              </span>

              <span>
                <i className="legend-selected" />
                Selected
              </span>

              <span>
                <i className="legend-booked" />
                Reserved
              </span>
            </div>
          </div>

          {/* =============================================
              BOOKING FORM
          ============================================= */}

          <div className="booking-form-card">
            {!success ? (
              <>
                <span className="section-kicker">BOOKING DETAILS</span>

                <h2>Reserve Desk {selectedDesk ?? "—"}</h2>

                <form onSubmit={submit}>
                  {/* =====================================
                      PLAN
                  ===================================== */}

                  <label>
                    Membership plan
                    <select
                      value={plan}
                      onChange={(e) => handlePlanChange(e.target.value)}
                    >
                      {plans.map((item) => (
                        <option value={item.name} key={item.name}>
                          {item.name} — NPR {item.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* =====================================
                      START DATE
                  ===================================== */}

                  <label>
                    Start date
                    <div className="input-with-icon">
                      <CalendarDays size={17} />

                      <input
                        type="date"
                        value={startDate}
                        min={getToday()}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          minWidth: 0,
                          maxWidth: "100%",
                          display: "block",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </label>

                  {/* =====================================
                      END DATE
                  ===================================== */}

                  <label>
                    End date
                    <div className="input-with-icon">
                      <CalendarDays size={17} />

                      <input
                        type="date"
                        value={endDate}
                        min={startDate ? startDate : getToday()}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          minWidth: 0,
                          maxWidth: "100%",
                          display: "block",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </label>

                  {/* =====================================
                      UNAVAILABLE MESSAGE
                  ===================================== */}

                  {availabilityMessage && (
                    <div
                      style={{
                        display: "flex",

                        alignItems: "flex-start",

                        gap: "10px",

                        padding: "14px 15px",

                        borderRadius: "12px",

                        background: "#fff0ea",

                        border: "1px solid #ffc9b4",

                        color: "#d94b18",

                        fontSize: "13px",

                        fontWeight: "700",

                        lineHeight: "1.5",
                      }}
                    >
                      <AlertCircle
                        size={18}
                        style={{
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      />

                      <span>{availabilityMessage}</span>
                    </div>
                  )}

                  {/* =====================================
                      VALID BOOKING MESSAGE
                  ===================================== */}

                  {startDate &&
                    endDate &&
                    !bookingUnavailable &&
                    bookingDays >= 7 && (
                      <div
                        style={{
                          display: "flex",

                          alignItems: "center",

                          gap: "9px",

                          padding: "13px 15px",

                          borderRadius: "12px",

                          background: "#edf6ef",

                          border: "1px solid #cce3d0",

                          color: "#27643c",

                          fontSize: "13px",

                          fontWeight: "700",
                        }}
                      >
                        <Check size={17} />
                        Available — {bookingDays} day booking.
                      </div>
                    )}

                  {/* =====================================
                      NAME
                  ===================================== */}

                  <label>
                    Full name
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </label>

                  {/* =====================================
                      PHONE
                  ===================================== */}

                  <label>
                    Phone number
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      required
                    />
                  </label>

                  {/* =====================================
                      BOOKING SUMMARY
                  ===================================== */}

                  <div className="booking-price-summary">
                    <div
                      style={{
                        display: "grid",

                        gap: "5px",
                      }}
                    >
                      <span>{plan}</span>

                      {startDate && endDate && (
                        <small
                          style={{
                            color: "#6f7772",

                            fontSize: "11px",
                          }}
                        >
                          {formatReadableDate(startDate)}

                          {" → "}

                          {formatReadableDate(endDate)}
                        </small>
                      )}
                    </div>

                    <strong>NPR {selectedPlan.price.toLocaleString()}</strong>
                  </div>

                  {/* =====================================
                      SUBMIT
                  ===================================== */}

                  <button
                    type="submit"
                    className="submit-booking-btn"
                    disabled={bookingUnavailable}
                    style={{
                      opacity: bookingUnavailable ? 0.45 : 1,

                      cursor: bookingUnavailable ? "not-allowed" : "pointer",
                    }}
                  >
                    Request booking
                    <ArrowRight size={17} />
                  </button>

                  <small
                    style={{
                      display: "block",

                      textAlign: "center",

                      color: "#6f7772",

                      fontSize: "11px",

                      lineHeight: "1.5",
                    }}
                  >
                    Minimum booking period is 1 week.
                  </small>
                </form>
              </>
            ) : (
              /* =========================================
                 SUCCESS
              ========================================= */

              <div className="booking-success">
                <span>
                  <Check size={31} />
                </span>

                <h2>Booking request saved.</h2>

                <p>Desk {selectedDesk} has been reserved in this demo.</p>

                <p>
                  <strong>{formatReadableDate(startDate)}</strong>

                  {" → "}

                  <strong>{formatReadableDate(endDate)}</strong>
                </p>

                <p>{bookingDays} days</p>

                <p>
                  {plan}
                  {" — "}
                  NPR {selectedPlan.price.toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);

                    setStartDate("");

                    setEndDate("");

                    setAvailabilityMessage("");

                    const nextDesk = desks.find(
                      (desk) => !booked.includes(desk),
                    );

                    setSelectedDesk(nextDesk ?? null);
                  }}
                >
                  Book another desk
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          DISCUSSION ROOM
      ================================================= */}

      <section className="discussion-note">
        <div className="shell discussion-note-inner">
          <Sparkles size={24} />

          <div>
            <strong>Studying with a group?</strong>

            <span>
              Sunshine also has one separate discussion room for collaborative
              work.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
