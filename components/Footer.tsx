import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/sunshine_study_room/";

const FACEBOOK_URL = "https://www.facebook.com/sunshinestudyroom";

const PHONE_NUMBER = "9849076796";

const PHONE_LINK = "tel:+9779849076796";

/*
  Direct Google review link for
  Sunshine Study Room.
*/
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJBxwweTMZ6zkR5GzVgkfuwPs";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Sunshine+Study+Room/@27.734102,85.3195677,17z";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        {/* =========================================
            BRAND
        ========================================= */}

        <div className="footer-brand">
          <Link href="/" aria-label="Sunshine Study Room home">
            <Image
              src="/images/sunshine-logo.png"
              alt="Sunshine Study Room"
              width={1600}
              height={900}
              className="footer-logo"
              unoptimized
            />
          </Link>

          <p>
            A quiet and comfortable place to study, focus and stay consistent in
            Samakhusi, Kathmandu.
          </p>

          {/* SOCIALS */}

          <div className="footer-socials">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-button"
              aria-label="Sunshine Study Room Instagram"
            >
              <Instagram size={18} />

              <span>Instagram</span>
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-button"
              aria-label="Sunshine Study Room Facebook"
            >
              <Facebook size={18} />

              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* =========================================
            NAVIGATION
        ========================================= */}

        <div className="footer-links">
          <strong>Explore</strong>

          <Link href="/">Home</Link>

          <Link href="/book">Book a Desk</Link>

          <Link href="/plans">Plans</Link>

          <Link href="/about">About</Link>
        </div>

        {/* =========================================
            CONTACT
        ========================================= */}

        <div className="footer-contact">
          <strong>Visit & Contact</strong>

          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
            <MapPin size={15} />

            <span>Jaldhara Marg, Samakhusi, Kathmandu</span>
          </a>

          <a href={PHONE_LINK}>
            <Phone size={15} />

            <span>{PHONE_NUMBER}</span>
          </a>

          {/* GOOGLE REVIEW */}

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-review-button"
          >
            <Star size={17} />

            <span>Leave us a Review</span>

            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Sunshine Study Room.</span>

        <span>Lighting up your learning experience.</span>
      </div>
    </footer>
  );
}
