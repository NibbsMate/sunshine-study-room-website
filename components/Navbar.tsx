"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const PHONE_NUMBER = "9849076796";
const PHONE_LINK = "tel:+9779849076796";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell nav">
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

        <nav className="desktop-nav">
          <Link href="/">Home</Link>
          <Link href="/book">Book a Desk</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="nav-actions">
          <a
            href={PHONE_LINK}
            className="nav-cta call-cta"
            aria-label={`Call Sunshine Study Room at ${PHONE_NUMBER}`}
            title={`Call ${PHONE_NUMBER}`}
          >
            <Phone size={15} />
            Call Now
          </a>

          <Link href="/book" className="nav-cta book-cta">
            Book Now
          </Link>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/book" onClick={() => setOpen(false)}>
            Book a Desk
          </Link>

          <Link href="/plans" onClick={() => setOpen(false)}>
            Plans
          </Link>

          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <a
            href={PHONE_LINK}
            className="mobile-call-button"
            onClick={() => setOpen(false)}
          >
            <Phone size={17} />
            Call {PHONE_NUMBER}
          </a>

          <Link
            href="/book"
            className="mobile-book-button"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
