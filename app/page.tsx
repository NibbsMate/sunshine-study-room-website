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

const desks = Array.from({ length: 25 }, (_, index) => index + 1);

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

function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatInputDate(date: Date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getToday() {
  return formatInputDate(new Date());
}

function addDays(dateString: string, days: number) {
  if (!dateString) {
    return "";
  }

  const date = parseLocalDate(dateString);

  date.setDate(date.getDate() + days);

  return formatInputDate(date);
}

function addMonths(dateString: string, months: number) {
  if (!dateString) {
    return "";
  }

  const original = parseLocalDate(dateString);

  const originalDay = original.getDate();

  const result = new Date(
    original.getFullYear(),
    original.getMonth() + months,
    1,
  );

  const lastDay = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();

  result.setDate(Math.min(originalDay, lastDay));

  return formatInputDate(result);
}

function addYears(dateString: string, years: number) {
  if (!dateString) {
    return "";
  }

  const date = parseLocalDate(dateString);

  const month = date.getMonth();

  date.setFullYear(date.getFullYear() + years);

  if (date.getMonth() !== month) {
    date.setDate(0);
  }

  return formatInputDate(date);
}

function calculateSuggestedEndDate(startDate: string, plan: string) {
  if (!startDate) {
    return "";
  }

  if (plan === "1 Week") {
    return addDays(startDate, 7);
  }

  if (plan === "1 Month") {
    return addMonths(startDate, 1);
  }

  if (plan === "6 Months") {
    return addMonths(startDate, 6);
  }

  if (plan === "1 Year") {
    return addYears(startDate, 1);
  }

  return "";
}

function getDaysBetween(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = parseLocalDate(startDate);

  const end = parseLocalDate(endDate);

  const difference = end.getTime() - start.getTime();

  return Math.round(difference / (1000 * 60 * 60 * 24));
}

function formatReadableDate(dateString: string) {
  if (!dateString) {
    return "";
  }

  return parseLocalDate(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

  const [dateMessage, setDateMessage] = useState("");

  /* =====================================================
     LOAD DEMO BOOKINGS
  ===================================================== */

  useEffect(() => {
    const stored = localStorage.getItem("sunshine-demo-bookings");

    if (!stored) {
      return;
    }

    try {
      setBooked(JSON.parse(stored));
    } catch {
      // Ignore bad localStorage data
    }
  }, []);

  /* =====================================================
     DESK AVAILABILITY
  ===================================================== */

  const available = useMemo(() => {
    return desks.filter((desk) => !booked.includes(desk)).length;
  }, [booked]);

  /* =====================================================
     CURRENT PLAN
  ===================================================== */

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[1];

  /* =====================================================
     NUMBER OF BOOKING DAYS
  ===================================================== */

  const bookingDays = useMemo(() => {
    return getDaysBetween(startDate, endDate);
  }, [startDate, endDate]);

  const invalidDateRange = Boolean(startDate && endDate && bookingDays < 7);

  /* =====================================================
     START DATE
  ===================================================== */

  function handleStartDate(value: string) {
    setStartDate(value);

    setDateMessage("");

    if (!value) {
      setEndDate("");

      return;
    }

    const suggested = calculateSuggestedEndDate(value, plan);

    setEndDate(suggested);
  }

  /* =====================================================
     PLAN
  ===================================================== */

  function handlePlanChange(value: string) {
    setPlan(value);

    setDateMessage("");

    if (!startDate) {
      return;
    }

    const suggested = calculateSuggestedEndDate(startDate, value);

    setEndDate(suggested);
  }

  /* =====================================================
     END DATE
  ===================================================== */

  function handleEndDate(value: string) {
    setEndDate(value);

    if (!startDate || !value) {
      setDateMessage("");

      return;
    }

    const days = getDaysBetween(startDate, value);

    if (days < 0) {
      setDateMessage("Unavailable — end date cannot be before the start date.");

      return;
    }

    if (days < 7) {
      setDateMessage("Unavailable — minimum booking period is 1 week.");

      return;
    }

    setDateMessage("");
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDesk) {
      return;
    }

    if (!startDate || !endDate) {
      setDateMessage("Please select both a start date and an end date.");

      return;
    }

    if (bookingDays < 7) {
      setDateMessage("Unavailable — minimum booking period is 1 week.");

      return;
    }

    const next = Array.from(new Set([...booked, selectedDesk]));

    setBooked(next);

    localStorage.setItem("sunshine-demo-bookings", JSON.stringify(next));

    setSuccess(true);

    setDateMessage("");
  }

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
          BOOKING
      ================================================= */}

      <section className="section booking-page-section">
        <div className="shell booking-page-grid">
          {/* =============================================
              DESKS
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
                    className={[
                      "seat-button",

                      isBooked ? "seat-booked" : "",

                      isSelected ? "seat-selected" : "",
                    ].join(" ")}
                    onClick={() => setSelectedDesk(desk)}
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
                      MEMBERSHIP
                  ===================================== */}

                  <label>
                    Membership plan
                    <select
                      value={plan}
                      onChange={(event) => handlePlanChange(event.target.value)}
                    >
                      {plans.map((item) => (
                        <option key={item.name} value={item.name}>
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
                    <div
                      className="input-with-icon"
                      style={{
                        width: "100%",

                        maxWidth: "100%",

                        minWidth: 0,

                        overflow: "hidden",

                        position: "relative",
                      }}
                    >
                      <CalendarDays size={17} />

                      <input
                        type="date"
                        value={startDate}
                        min={getToday()}
                        onChange={(event) =>
                          handleStartDate(event.target.value)
                        }
                        required
                        style={{
                          display: "block",

                          width: "100%",

                          maxWidth: "100%",

                          minWidth: 0,

                          boxSizing: "border-box",

                          WebkitAppearance: "none",

                          appearance: "none",
                        }}
                      />
                    </div>
                  </label>

                  {/* =====================================
                      END DATE
                  ===================================== */}

                  <label>
                    End date
                    <div
                      className="input-with-icon"
                      style={{
                        width: "100%",

                        maxWidth: "100%",

                        minWidth: 0,

                        overflow: "hidden",

                        position: "relative",
                      }}
                    >
                      <CalendarDays size={17} />

                      <input
                        type="date"
                        value={endDate}
                        min={startDate || getToday()}
                        onChange={(event) => handleEndDate(event.target.value)}
                        required
                        style={{
                          display: "block",

                          width: "100%",

                          maxWidth: "100%",

                          minWidth: 0,

                          boxSizing: "border-box",

                          WebkitAppearance: "none",

                          appearance: "none",
                        }}
                      />
                    </div>
                  </label>

                  {/* =====================================
                      DATE ERROR
                  ===================================== */}

                  {dateMessage && (
                    <div
                      style={{
                        padding: "14px 15px",

                        display: "flex",

                        alignItems: "flex-start",

                        gap: "10px",

                        borderRadius: "12px",

                        border: "1px solid #ffc9b4",

                        background: "#fff0ea",

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

                      <span>{dateMessage}</span>
                    </div>
                  )}

                  {/* =====================================
                      VALID DATE
                  ===================================== */}

                  {startDate &&
                    endDate &&
                    !invalidDateRange &&
                    bookingDays >= 7 && (
                      <div
                        style={{
                          padding: "13px 15px",

                          display: "flex",

                          alignItems: "center",

                          gap: "9px",

                          borderRadius: "12px",

                          border: "1px solid #cce3d0",

                          background: "#edf6ef",

                          color: "#27643c",

                          fontSize: "13px",

                          fontWeight: "700",
                        }}
                      >
                        <Check size={17} />

                        <span>Available — {bookingDays} day booking.</span>
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
                      onChange={(event) => setName(event.target.value)}
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
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="98XXXXXXXX"
                      required
                    />
                  </label>

                  {/* =====================================
                      SUMMARY
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

                            lineHeight: "1.4",
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
                    disabled={invalidDateRange}
                    style={{
                      opacity: invalidDateRange ? 0.45 : 1,

                      cursor: invalidDateRange ? "not-allowed" : "pointer",
                    }}
                  >
                    Request booking
                    <ArrowRight size={17} />
                  </button>

                  <small
                    style={{
                      display: "block",

                      color: "#6f7772",

                      textAlign: "center",

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

                <p>
                  {bookingDays} days · {plan}
                </p>

                <p>NPR {selectedPlan.price.toLocaleString()}</p>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);

                    setStartDate("");

                    setEndDate("");

                    setDateMessage("");

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
