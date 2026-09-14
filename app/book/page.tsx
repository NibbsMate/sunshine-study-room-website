"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Check,
  DoorOpen,
  Sparkles,
  X,
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

function parseDate(value: string) {
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

function addDays(value: string, days: number) {
  if (!value) {
    return "";
  }

  const date = parseDate(value);

  date.setDate(date.getDate() + days);

  return formatInputDate(date);
}

function addMonths(value: string, months: number) {
  if (!value) {
    return "";
  }

  const original = parseDate(value);

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

function addYears(value: string, years: number) {
  if (!value) {
    return "";
  }

  const original = parseDate(value);

  const result = new Date(original);

  result.setFullYear(result.getFullYear() + years);

  return formatInputDate(result);
}

function getPlanEndDate(startDate: string, plan: string) {
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

  const start = parseDate(startDate);

  const end = parseDate(endDate);

  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function readableDate(value: string) {
  if (!value) {
    return "";
  }

  return parseDate(value).toLocaleDateString("en-US", {
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

  const [popupOpen, setPopupOpen] = useState(false);

  /* =====================================================
     LOAD BOOKED DESKS
  ===================================================== */

  useEffect(() => {
    const stored = localStorage.getItem("sunshine-demo-bookings");

    if (!stored) {
      return;
    }

    try {
      setBooked(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  /* =====================================================
     AVAILABLE DESKS
  ===================================================== */

  const available = useMemo(() => {
    return desks.filter((desk) => !booked.includes(desk)).length;
  }, [booked]);

  /* =====================================================
     PLAN
  ===================================================== */

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[1];

  /* =====================================================
     NUMBER OF DAYS
  ===================================================== */

  const bookingDays = useMemo(() => {
    return getDaysBetween(startDate, endDate);
  }, [startDate, endDate]);

  /* =====================================================
     START DATE CHANGE
  ===================================================== */

  function handleStartDate(value: string) {
    setStartDate(value);

    if (!value) {
      setEndDate("");

      return;
    }

    const suggestedEnd = getPlanEndDate(value, plan);

    setEndDate(suggestedEnd);
  }

  /* =====================================================
     PLAN CHANGE
  ===================================================== */

  function handlePlanChange(value: string) {
    setPlan(value);

    if (startDate) {
      setEndDate(getPlanEndDate(startDate, value));
    }
  }

  /* =====================================================
     END DATE CHANGE
  ===================================================== */

  function handleEndDate(value: string) {
    if (!value) {
      setEndDate("");

      return;
    }

    if (!startDate) {
      setEndDate(value);

      return;
    }

    const difference = getDaysBetween(startDate, value);

    /* ===============================================
       LESS THAN 1 WEEK
    =============================================== */

    if (difference < 7) {
      setPopupOpen(true);

      setEndDate("");

      return;
    }

    setEndDate(value);
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
      return;
    }

    if (bookingDays < 7) {
      setPopupOpen(true);

      return;
    }

    const next = Array.from(new Set([...booked, selectedDesk]));

    setBooked(next);

    localStorage.setItem("sunshine-demo-bookings", JSON.stringify(next));

    setSuccess(true);
  }

  return (
    <main>
      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="subpage-hero">
        <div className="shell">
          <span className="eyebrow">BOOK A DESK</span>

          <h1>Choose your desk.</h1>

          <p>
            Select your preferred desk, choose your membership period and submit
            your booking request.
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
              FORM
          ============================================= */}

          <div className="booking-form-card">
            {!success ? (
              <>
                <span className="section-kicker">BOOKING DETAILS</span>

                <h2>Reserve Desk {selectedDesk ?? "—"}</h2>

                <form onSubmit={submit}>
                  {/* PLAN */}

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

                  {/* START DATE */}

                  <label>
                    Start date
                    <div
                      className="input-with-icon"
                      style={{
                        width: "100%",

                        minWidth: 0,

                        maxWidth: "100%",

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
                          width: "100%",

                          minWidth: 0,

                          maxWidth: "100%",

                          display: "block",

                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </label>

                  {/* END DATE */}

                  <label>
                    End date
                    <div
                      className="input-with-icon"
                      style={{
                        width: "100%",

                        minWidth: 0,

                        maxWidth: "100%",

                        overflow: "hidden",

                        position: "relative",
                      }}
                    >
                      <CalendarDays size={17} />

                      <input
                        type="date"
                        value={endDate}
                        min={startDate ? addDays(startDate, 7) : getToday()}
                        onChange={(event) => handleEndDate(event.target.value)}
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

                  {/* VALID PERIOD */}

                  {startDate && endDate && bookingDays >= 7 && (
                    <div
                      style={{
                        padding: "13px 15px",

                        display: "flex",

                        alignItems: "center",

                        gap: "8px",

                        borderRadius: "12px",

                        background: "#edf6ef",

                        color: "#27643c",

                        border: "1px solid #cce3d0",

                        fontSize: "13px",

                        fontWeight: "700",
                      }}
                    >
                      <Check size={17} />
                      {bookingDays} day booking available
                    </div>
                  )}

                  {/* NAME */}

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

                  {/* PHONE */}

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

                  {/* SUMMARY */}

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
                          {readableDate(startDate)}

                          {" → "}

                          {readableDate(endDate)}
                        </small>
                      )}
                    </div>

                    <strong>NPR {selectedPlan.price.toLocaleString()}</strong>
                  </div>

                  <button type="submit" className="submit-booking-btn">
                    Request booking
                    <ArrowRight size={17} />
                  </button>

                  <small
                    style={{
                      display: "block",

                      textAlign: "center",

                      color: "#6f7772",

                      fontSize: "11px",
                    }}
                  >
                    Minimum booking period: 1 week
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

                <p>Desk {selectedDesk} has been selected.</p>

                <p>
                  <strong>{readableDate(startDate)}</strong>

                  {" → "}

                  <strong>{readableDate(endDate)}</strong>
                </p>

                <p>{bookingDays} days</p>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);

                    setStartDate("");

                    setEndDate("");
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
              study.
            </span>
          </div>
        </div>
      </section>

      {/* =================================================
          MINIMUM BOOKING POPUP
      ================================================= */}

      {popupOpen && (
        <div
          style={{
            position: "fixed",

            inset: 0,

            zIndex: 9999,

            padding: "20px",

            display: "grid",

            placeItems: "center",

            background: "rgba(10, 16, 14, 0.72)",

            backdropFilter: "blur(8px)",
          }}
          onClick={() => setPopupOpen(false)}
        >
          <div
            style={{
              width: "min(430px, 100%)",

              position: "relative",

              padding: "34px",

              borderRadius: "24px",

              background: "#fffdf8",

              color: "#1c211f",

              boxShadow: "0 30px 80px rgba(0,0,0,0.3)",

              textAlign: "center",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",

                top: "15px",

                right: "15px",

                width: "38px",

                height: "38px",

                display: "grid",

                placeItems: "center",

                border: 0,

                borderRadius: "50%",

                background: "#f1f3ef",

                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>

            <div
              style={{
                width: "70px",

                height: "70px",

                margin: "0 auto 20px",

                display: "grid",

                placeItems: "center",

                borderRadius: "50%",

                background: "#fff0ea",

                color: "#f15a24",
              }}
            >
              <AlertTriangle size={31} />
            </div>

            <h2
              style={{
                margin: "0 0 12px",

                fontSize: "30px",

                letterSpacing: "-0.04em",
              }}
            >
              Booking unavailable
            </h2>

            <p
              style={{
                margin: "0",

                color: "#6f7772",

                lineHeight: "1.65",
              }}
            >
              The minimum booking period at Sunshine Study Room is
              <strong> 1 week</strong>. Please choose an end date at least 7
              days after your start date.
            </p>

            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              style={{
                width: "100%",

                minHeight: "50px",

                marginTop: "25px",

                border: 0,

                borderRadius: "999px",

                background: "#17382f",

                color: "#ffffff",

                fontWeight: "900",

                cursor: "pointer",
              }}
            >
              Choose another date
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
