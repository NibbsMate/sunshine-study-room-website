import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  MapPin,
  Users,
  Wifi,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className="subpage-hero">
        <div className="shell">
          <span className="eyebrow">ABOUT SUNSHINE</span>
          <h1>A calmer place to get things done.</h1>
          <p>
            Sunshine Study Room is designed for focused individual study while
            still giving groups a separate place to collaborate when needed.
          </p>
        </div>
      </section>

      <section className="section about-page">
        <div className="shell about-intro">
          <div>
            <span className="section-kicker">THE IDEA</span>
          </div>
          <div>
            <h2>A study space built around consistency.</h2>
            <p>
              The main study hall offers 25 individual desks for reading, exam
              preparation, remote work and long focus sessions. The environment
              is intentionally simple: dependable internet, access to power,
              lockers and a long daily opening window.
            </p>
          </div>
        </div>

        <div className="shell about-feature-grid">
          <article><BookOpen size={23} /><strong>25 study desks</strong><p>Individual spaces for uninterrupted focus.</p></article>
          <article><Wifi size={23} /><strong>Fast internet</strong><p>Useful for online learning, research and work.</p></article>
          <article><Clock3 size={23} /><strong>7 AM – 9 PM</strong><p>A study schedule that works from morning to evening.</p></article>
          <article><MapPin size={23} /><strong>Samakhusi</strong><p>Located at Jaldhara Marg, Kathmandu.</p></article>
        </div>
      </section>

      <section className="about-discussion-section">
        <div className="shell about-discussion-grid">
          <div className="discussion-room-visual">
            <Users size={46} />
            <span>1 PRIVATE ROOM</span>
          </div>

          <div>
            <span className="section-kicker">THE DISCUSSION ROOM</span>
            <h2>When collaboration needs its own space.</h2>
            <p>
              Sunshine also includes one separate discussion room for group
              revision, project planning, presentation practice and academic
              discussions. Keeping it separate helps the main hall stay quiet
              while groups still have somewhere useful to work together.
            </p>

            <Link href="/book">
              Book your individual desk <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
