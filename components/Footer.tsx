import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

const PHONE_DISPLAY = "+977 9845165828";
const PHONE_LINK = "tel:+9779845165828";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Sunshine+Study+Room+Jaldhara+Marg+Kathmandu";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Image
            src="/images/sunshine-logo.png"
            alt="Sunshine Study Room"
            width={1600}
            height={900}
            className="footer-logo"
            unoptimized
          />
          <p>Lighting up your learning experience.</p>
        </div>

        <div>
          <strong>Explore</strong>
          <Link href="/book">Book a Desk</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/about">About</Link>
        </div>

        <div>
          <strong>Contact</strong>
          <a href={PHONE_LINK}><Phone size={15} /> {PHONE_DISPLAY}</a>
          <a href={MAP_LINK} target="_blank" rel="noreferrer">
            <MapPin size={15} /> Samakhusi, Kathmandu
          </a>
        </div>
      </div>
    </footer>
  );
}
