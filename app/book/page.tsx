"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  Check,
  DoorOpen,
  Info,
  Phone,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PHONE_NUMBER = "9849076796";
const PHONE_LINK = "tel:+9779849076796";

/* =====================================================
   47 DESKS
===================================================== */

const desks = Array.from({ length: 47 }, (_, index) => index + 1);

/* =====================================================
   PLANS
===================================================== */

const plans = [
  {
    name: "Daily",
    price: 200,
    duration: "1 day",
    fixedSeat: false,
    locker: false,
  },
  {
    name: "Weekly",
    price: 1000,
    duration: "7 days",
    fixedSeat: false,
    locker: false,
  },
  {
    name: "Monthly",
    price: 3500,
    duration: "30 days",
    fixedSeat: true,
    locker: true,
  },
  {
    name: "Quarterly",
    price: 10500,
    duration: "90 days",
    fixedSeat: true,
    locker: true,
  },
  {
    name: "Semi-Annual",
    price: 21000,
    duration: "180 days",
    fixedSeat: true,
    locker: true,
  },
  {
    name: "Annual",
    price: 42000,
    duration: "360 days",
    fixedSeat: true,
    locker: true,
  },
];

export default function BookPage() {
  const [booked, setBooked] = useState<number[]>([]);

  const [selectedDesk, setSelectedDesk] = useState<number | null>(1);

  const [plan, setPlan] = useState("Monthly");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [success, setSuccess] = useState(false);

  /* =====================================================
     LOAD SAVED BOOKINGS
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
     AVAILABLE DESKS
  ===================================================== */

  const available = useMemo(() => {
    return desks.filter((desk) => !booked.includes(desk)).length;
  }, [booked]);

  /* =====================================================
     SELECTED PLAN
  ===================================================== */

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[2];

  const fixedSeatAllowed = selectedPlan.fixedSeat;

  const isDailyPlan = selectedPlan.name === "Daily";

  /* =====================================================
     PLAN CHANGE
  ===================================================== */

  function handlePlanChange(value: string) {
    setPlan(value);

    const nextPlan = plans.find((item) => item.name === value);

    if (!nextPlan) {
      return;
    }

    if (!nextPlan.fixedSeat) {
      setSelectedDesk(null);
      return;
    }

    if (nextPlan.fixedSeat && selectedDesk === null) {
      const nextAvailable = desks.find((desk) => !booked.includes(desk));

      setSelectedDesk(nextAvailable ?? null);
    }
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (fixedSeatAllowed && !selectedDesk) {
      return;
    }

    if (fixedSeatAllowed && selectedDesk) {
      const next = Array.from(new Set([...booked, selectedDesk]));

      setBooked(next);

      localStorage.setItem("sunshine-demo-bookings", JSON.stringify(next));
    }

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
          <span className="eyebrow">BOOK YOUR SPACE</span>

          <h1>Choose your desk.</h1>

          <p>
            Select a membership plan and choose a desk when your plan includes a
            fixed seat.
          </p>
        </div>
      </section>

      {/* =================================================
          BOOKING SECTION
      ================================================= */}

      <section className="section booking-page-section">
        <div className="shell booking-page-grid">
          {/* =============================================
              DESK GRID
          ============================================= */}

          <div
            className="seat-card"
            style={{
              opacity: fixedSeatAllowed ? 1 : 0.72,
            }}
          >
            <div className="seat-card-head">
              <div>
                <small>DESK SELECTION</small>

                <strong>
                  {fixedSeatAllowed
                    ? `${available} of 47 available`
                    : "No fixed desk included"}
                </strong>
              </div>

              <DoorOpen size={24} />
            </div>

            {/* NO FIXED SEAT NOTE */}

            {!fixedSeatAllowed && (
              <div
                style={{
                  marginTop: "22px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  borderRadius: "14px",
                  background: "#fff1e9",
                  border: "1px solid #ffd1bd",
                  color: "#d94b18",
                  fontSize: "13px",
                  lineHeight: "1.55",
                }}
              >
                <Info
                  size={18}
                  style={{
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                />

                <span>
                  <strong>{selectedPlan.name}</strong> membership does not
                  include a fixed seat. Desk selection is available from the
                  Monthly plan onwards.
                </span>
              </div>
            )}

            {/* 47 NUMBERED DESKS */}

            <div className="seat-grid">
              {desks.map((desk) => {
                const isBooked = booked.includes(desk);

                const isSelected = selectedDesk === desk;

                return (
                  <button
                    key={desk}
                    type="button"
                    disabled={!fixedSeatAllowed || isBooked}
                    onClick={() => setSelectedDesk(desk)}
                    className={[
                      "seat-button",

                      isBooked ? "seat-booked" : "",

                      isSelected && fixedSeatAllowed ? "seat-selected" : "",
                    ].join(" ")}
                    style={{
                      cursor:
                        fixedSeatAllowed && !isBooked
                          ? "pointer"
                          : "not-allowed",
                    }}
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

                <h2>
                  {fixedSeatAllowed
                    ? `Reserve Desk ${selectedDesk ?? "—"}`
                    : "Request Membership"}
                </h2>

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

                  {/* =====================================
                      DAILY CALL CONFIRMATION
                  ===================================== */}

                  {isDailyPlan && (
                    <div
                      style={{
                        padding: "18px",
                        display: "grid",
                        gap: "13px",
                        borderRadius: "16px",
                        background: "#fff1e9",
                        border: "1px solid #ffd1bd",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <Phone
                          size={19}
                          style={{
                            flexShrink: 0,
                            marginTop: "2px",
                            color: "#f15a24",
                          }}
                        />

                        <div>
                          <strong
                            style={{
                              display: "block",
                              color: "#17382f",
                              marginBottom: "5px",
                            }}
                          >
                            Daily booking confirmation
                          </strong>

                          <span
                            style={{
                              color: "#6f7772",
                              fontSize: "13px",
                              lineHeight: "1.55",
                            }}
                          >
                            Please call Sunshine Study Room to confirm
                            availability before visiting.
                          </span>
                        </div>
                      </div>

                      <a
                        href={PHONE_LINK}
                        aria-label={`Call Sunshine Study Room at ${PHONE_NUMBER}`}
                        style={{
                          minHeight: "49px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          borderRadius: "999px",
                          background: "#f15a24",
                          color: "#ffffff",
                          fontWeight: "900",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Phone size={17} />
                        Call for Confirmation
                      </a>

                      <small
                        style={{
                          textAlign: "center",
                          color: "#6f7772",
                          fontSize: "11px",
                        }}
                      >
                        {PHONE_NUMBER}
                      </small>
                    </div>
                  )}

                  {/* =====================================
                      PLAN DETAILS
                  ===================================== */}

                  <div
                    style={{
                      padding: "16px",
                      display: "grid",
                      gap: "10px",
                      borderRadius: "14px",
                      background: "#f1f4ef",
                      color: "#17382f",
                      fontSize: "13px",
                    }}
                  >
                    {/* DURATION */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >
                      <span>Duration</span>

                      <strong>{selectedPlan.duration}</strong>
                    </div>

                    {/* FIXED SEAT */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >
                      <span>Fixed seat</span>

                      <strong>
                        {selectedPlan.fixedSeat ? "Included" : "Not included"}
                      </strong>
                    </div>

                    {/* LOCKER */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >
                      <span>Locker</span>

                      <strong>
                        {selectedPlan.locker ? "Free locker" : "Not included"}
                      </strong>
                    </div>
                  </div>

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
                        gap: "4px",
                      }}
                    >
                      <span>{plan}</span>

                      <small
                        style={{
                          color: "#6f7772",
                          fontSize: "11px",
                          lineHeight: "1.4",
                        }}
                      >
                        {selectedPlan.duration}

                        {fixedSeatAllowed &&
                          selectedDesk &&
                          ` · Desk ${selectedDesk}`}
                      </small>
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

                  <small
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#6f7772",
                      fontSize: "11px",
                      lineHeight: "1.5",
                    }}
                  >
                    Membership payments are non-refundable.
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

                <p>
                  Your <strong>{selectedPlan.name}</strong> membership request
                  has been saved.
                </p>

                {fixedSeatAllowed && selectedDesk && (
                  <p>
                    Fixed desk: <strong>{selectedDesk}</strong>
                  </p>
                )}

                <p>NPR {selectedPlan.price.toLocaleString()}</p>

                {isDailyPlan && (
                  <a
                    href={PHONE_LINK}
                    style={{
                      minHeight: "48px",
                      margin: "20px auto 0",
                      padding: "0 20px",
                      width: "fit-content",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      borderRadius: "999px",
                      background: "#f15a24",
                      color: "white",
                      fontWeight: "900",
                    }}
                  >
                    <Phone size={17} />
                    Call to Confirm
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);

                    if (selectedPlan.fixedSeat) {
                      const nextAvailable = desks.find(
                        (desk) => !booked.includes(desk),
                      );

                      setSelectedDesk(nextAvailable ?? null);
                    }
                  }}
                >
                  Make another booking
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
