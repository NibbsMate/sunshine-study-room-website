"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

const PHONE_NUMBER = "9849076796";
const PHONE_LINK = "tel:+9779849076796";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="shell nav">
        {/* LOGO */}
        <Link
          href="/"
          className="brand-link"
          aria-label="Sunshine Study Room home"
        >
          <Image
            src="/images/sunshine-logo.png"
            alt="Sunshine Study Room"
            width={1600}
            height={900}
            className="site-logo"
            priority
            unoptimized
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          <Link href="/">Home</Link>

          <Link href="/book">Book a Desk</Link>

          <Link href="/plans">Plans</Link>

          <Link href="/about">About</Link>
        </nav>

        {/* ALWAYS VISIBLE ACTIONS */}
        <div className="nav-actions">
          <a
            href={PHONE_LINK}
            className="nav-cta call-cta"
            aria-label={`Call Sunshine Study Room at ${PHONE_NUMBER}`}
          >
            <Phone className="nav-phone-icon" size={15} />

            <span className="desktop-button-text">Call Now</span>

            <span className="mobile-button-text">Call</span>
          </a>

          <Link href="/book" className="nav-cta book-cta">
            <span className="desktop-button-text">Book Now</span>

            <span className="mobile-button-text">Book</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
