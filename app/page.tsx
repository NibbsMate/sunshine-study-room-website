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

  const year = original.getFullYear() + years;

  const month = original.getMonth();

  const day = original.getDate();

  const result = new Date(year, month, day);

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

  const difference = end.getTime() - start.getTime();

  return Math.round(difference / (1000 * 60 * 60 * 24));
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

  const [popupMessage, setPopupMessage] = useState("");

  /* =====================================================
     LOAD BOOKINGS
  ===================================================== */

  useEffect(() => {
    const stored = localStorage.getItem("sunshine-demo-bookings");

    if (!stored) {
      return;
    }

    try {
      setBooked(JSON.parse(stored));
    } catch {
      // Ignore invalid stored data
    }
  }, []);

  /* =====================================================
     AVAILABLE DESKS
  ===================================================== */

  const available = useMemo(() => {
    return desks.filter((desk) => !booked.includes(desk)).length;
  }, [booked]);

  /* =====================================================
     SELECTED PLAN
  ===================================================== */

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[1];

  /* =====================================================
     BOOKING LENGTH
  ===================================================== */

  const bookingDays = useMemo(() => {
    return getDaysBetween(startDate, endDate);
  }, [startDate, endDate]);

  /* =====================================================
     START DATE
  ===================================================== */

  function handleStartDate(value: string) {
    setStartDate(value);

    if (!value) {
      setEndDate("");
      return;
    }

    /*
      Automatically suggest the correct
      end date based on selected plan.
    */

    const suggested = getPlanEndDate(value, plan);

    setEndDate(suggested);
  }

  /* =====================================================
     PLAN CHANGE
  ===================================================== */

  function handlePlanChange(value: string) {
    setPlan(value);

    if (!startDate) {
      return;
    }

    const suggested = getPlanEndDate(startDate, value);

    setEndDate(suggested);
  }

  /* =====================================================
     END DATE
  ===================================================== */

  function handleEndDate(value: string) {
    /*
      Save the value first so React
      receives every manually selected date.
    */

    setEndDate(value);

    if (!startDate || !value) {
      return;
    }

    const difference = getDaysBetween(startDate, value);

    /* -----------------------------------------
       END DATE BEFORE START DATE
    ----------------------------------------- */

    if (difference < 0) {
      setPopupMessage(
        "The end date cannot be before your start date. Please choose another date.",
      );

      setPopupOpen(true);

      setEndDate("");

      return;
    }

    /* -----------------------------------------
       LESS THAN 7 DAYS
    ----------------------------------------- */

    if (difference < 7) {
      setPopupMessage(
        "The minimum booking period at Sunshine Study Room is 1 week. Please choose an end date at least 7 days after your start date.",
      );

      setPopupOpen(true);

      /*
        Clear the invalid end date after
        showing the popup.
      */

      setEndDate("");

      return;
    }
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDesk) {
      return;
    }

    if (!startDate) {
      setPopupMessage("Please choose your start date.");

      setPopupOpen(true);

      return;
    }

    if (!endDate) {
      setPopupMessage(
        "Please choose your end date. The minimum booking period is 1 week.",
      );

      setPopupOpen(true);

      return;
    }

    if (bookingDays < 7) {
      setPopupMessage(
        "The minimum booking period at Sunshine Study Room is 1 week. Please choose an end date at least 7 days after your start date.",
      );

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
          BOOKING SECTION
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
                  {/* =====================================
                      MEMBERSHIP PLAN
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
                    <div className="booking-date-wrapper">
                      <CalendarDays size={17} className="booking-date-icon" />

                      <input
                        className="booking-date-input"
                        type="date"
                        value={startDate}
                        min={getToday()}
                        onChange={(event) =>
                          handleStartDate(event.target.value)
                        }
                        required
                      />
                    </div>
                  </label>

                  {/* =====================================
                      END DATE
                  ===================================== */}

                  <label>
                    End date
                    <div className="booking-date-wrapper">
                      <CalendarDays size={17} className="booking-date-icon" />

                      <input
                        className="booking-date-input"
                        type="date"
                        value={endDate}
                        /*
                          IMPORTANT FIX:

                          Do NOT use:
                          addDays(startDate, 7)

                          Otherwise Safari / Chrome blocks
                          the user from selecting less than
                          seven days and React never receives
                          the invalid value.

                          We allow dates from startDate onward
                          and handle the one-week rule ourselves.
                        */

                        min={startDate ? startDate : getToday()}
                        onChange={(event) => handleEndDate(event.target.value)}
                        required
                      />
                    </div>
                  </label>

                  {/* =====================================
                      VALID DATE MESSAGE
                  ===================================== */}

                  {startDate && endDate && bookingDays >= 7 && (
                    <div className="booking-valid-message">
                      <Check size={17} />

                      <span>Available — {bookingDays} day booking.</span>
                    </div>
                  )}

                  {/* =====================================
                      FULL NAME
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
                    <div className="booking-summary-left">
                      <span>{plan}</span>

                      {startDate && endDate && (
                        <small>
                          {readableDate(startDate)}

                          {" → "}

                          {readableDate(endDate)}
                        </small>
                      )}
                    </div>

                    <strong>NPR {selectedPlan.price.toLocaleString()}</strong>
                  </div>

                  {/* =====================================
                      SUBMIT
                  ===================================== */}

                  <button type="submit" className="submit-booking-btn">
                    Request booking
                    <ArrowRight size={17} />
                  </button>

                  <small className="minimum-booking-note">
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
          POPUP
      ================================================= */}

      {popupOpen && (
        <div
          className="booking-popup-backdrop"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="booking-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="booking-popup-close"
              onClick={() => setPopupOpen(false)}
              aria-label="Close popup"
            >
              <X size={18} />
            </button>

            <div className="booking-popup-icon">
              <AlertTriangle size={31} />
            </div>

            <h2>Booking unavailable</h2>

            <p>{popupMessage}</p>

            <button
              type="button"
              className="booking-popup-action"
              onClick={() => setPopupOpen(false)}
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
