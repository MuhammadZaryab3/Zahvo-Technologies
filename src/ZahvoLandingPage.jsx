import React, { useState, useEffect, useRef, useCallback } from "react";
import logo from "./assets/ZahvoLogo.png";
import {
  Menu,
  X,
  ArrowUpRight,
  Palette,
  Globe,
  Braces,
  Workflow,
  Sparkles,
  Rocket,
  Cpu,
  Layers,
  Repeat,
  ChevronDown,
  Check,
  Mail,
  Phone,
  MapPin,
  Quote,
} from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact us" },
];

const TAG_ROWS = [
  [{ label: "Web Design", rotate: -3 }],
  [{ label: "MERN Stack", rotate: 2 }, { label: "WordPress", rotate: -4 }],
  [{ label: "Automation", rotate: 3 }],
  [{ label: "Branding", rotate: -2 }, { label: "UI / UX", rotate: 2 }],
];

const SERVICES = [
  {
    icon: Palette,
    title: "Web Design",
    desc: "Interfaces built around your users, not a template — wireframes through pixel-perfect UI.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Fast, editable WordPress builds for content-driven sites that your team can update solo.",
  },
  {
    icon: Braces,
    title: "MERN Stack Development",
    desc: "Custom full-stack apps on MongoDB, Express, React and Node — built to your product spec.",
  },
  {
    icon: Sparkles,
    title: "Branding & Identity ",
    desc: "A visual identity — logo, palette, type, voice — that holds up across every touchpoint. Our most requested engagement, and where a project usually starts.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "We connect your tools and remove the manual steps, so your team ships work, not busywork.",
    featured: true,
  },
];

const LOGO_SRC = logo

const WHY_US = [
  {
    icon: Layers,
    title: "Full-stack expertise",
    desc: "One team covers design, engineering and automation, so nothing gets lost between handoffs.",
  },
  {
    icon: Cpu,
    title: "Automation-first thinking",
    desc: "We look for the manual step to remove before we look for the feature to add.",
  },
  {
    icon: Repeat,
    title: "Scalable engagements",
    desc: "Start with one project or a full retainer — the setup grows with what you actually need.",
  },
  {
    icon: Rocket,
    title: "Faster time to launch",
    desc: "Reusable systems and a lean process mean fewer weeks between kickoff and going live.",
  },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handleScroll = () => {
      const offset = 140; // clears the sticky navbar height
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids]);
  return active;
}

function ServiceDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleOption = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="zv-dropdown" ref={ref}>
      <button
        type="button"
        className="zv-dropdown__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          {selected.length === 0
            ? "Select services"
            : selected.length === 1
            ? selected[0]
            : `${selected.length} services selected`}
        </span>
        <ChevronDown
          size={18}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>
      {open && (
        <div className="zv-dropdown__panel" role="listbox">
          {SERVICES.map((s) => (
            <label className="zv-dropdown__option" key={s.title}>
              <span className="zv-checkbox">
                {selected.includes(s.title) && <Check size={13} strokeWidth={3} />}
              </span>
              <input
                type="checkbox"
                checked={selected.includes(s.title)}
                onChange={() => toggleOption(s.title)}
              />
              {s.title}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useScrollSpy(["home", "about", "services", "contact"]);

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    services: [],
    description: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }, []);

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.companyName.trim() || form.services.length === 0 || !form.description.trim()) {
      setError("Fill in every field and pick at least one service.");
      return;
    }
    setError("");
    const subject = `New project inquiry from ${form.fullName}`;
    const body = [
      `Full name: ${form.fullName}`,
      `Company name: ${form.companyName}`,
      `Services: ${form.services.join(", ")}`,
      "",
      "Project description:",
      form.description,
    ].join("\n");
    window.location.href = `mailto:zaryabmuhammad321@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="zv-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

        /*
          Custom brand fonts — TAN Songbird (headings) and Maleah (paragraphs)
          are licensed commercial fonts and are not hosted on any free font CDN,
          so they can't be fetched automatically here. Drop your licensed font
          files into your project (e.g. /public/fonts/) and point the src below
          at them — once the files are present the page will pick them up
          automatically. Until then it falls back to Fraunces / Lora, which sit
          in a similar register (a warm display serif and a soft text serif).
        */
        @font-face {
          font-family: 'TAN Songbird';
          src: url('/fonts/TANSongbird.woff2') format('woff2'),
               url('/fonts/TANSongbird.woff') format('woff'),
               url('/fonts/TANSongbird.otf') format('opentype');
          font-weight: 400 700;
          font-display: swap;
        }
        @font-face {
          font-family: 'Maleah';
          src: url('/fonts/Maleah.woff2') format('woff2'),
               url('/fonts/Maleah.woff') format('woff'),
               url('/fonts/Maleah.otf') format('opentype');
          font-weight: 400 600;
          font-display: swap;
        }

        .zv-root {
          --cream: #f6f3ec;
          --ink: #121214;
          --ink-soft: #3a3a3b;
          --muted: #8a8a83;
          --yellow: #f4b740;
          --yellow-dark: #d99f2e;
          --line: #e2ded2;
          --white: #ffffff;
          --font-heading: 'TAN Songbird', 'Fraunces', Georgia, serif;
          --font-body: 'Maleah', 'Lora', Georgia, serif;
          font-family: var(--font-body);
          background: var(--cream);
          color: var(--ink);
          width: 100%;
          overflow-x: clip;
        }
        .zv-root * { box-sizing: border-box; }
        .zv-root h1, .zv-root h2, .zv-root h3 {
          font-family: var(--font-heading);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .zv-root p { margin: 0; font-family: var(--font-body); }
        .zv-root button { font-family: 'Inter', sans-serif; cursor: pointer; }
        .zv-root a { color: inherit; text-decoration: none; }
        .zv-root :focus-visible {
          outline: 2px solid var(--ink);
          outline-offset: 3px;
        }

        .zv-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- NAVBAR ---------- */
        .zv-navwrap {
          position: sticky;
          top: 16px;
          z-index: 50;
          display: flex;
          justify-content: center;
          padding: 0 16px;
        }
        .zv-nav {
          width: 100%;
          max-width: 780px;
          background: var(--ink);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 8px 8px 22px;
          box-shadow: 0 8px 24px rgba(18,18,20,0.18);
        }
        .zv-logo {
          color: var(--white);
          font-weight: 700;
          font-size: 17px;
          display: flex;
          align-items: center;
          gap: 9px;
          white-space: nowrap;
        }
        .zv-logo-mark {
          height: 26px;
          width: auto;
          display: block;
          filter: invert(1) brightness(1.15);
        }
        .zv-logo-mark.footer {
          filter: none;
          height: 24px;
        }
        .zv-navlinks {
          display: flex;
          gap: 28px;
        }
        .zv-navlinks button {
          background: none;
          border: none;
          color: rgba(255,255,255,0.62);
          font-size: 14px;
          font-weight: 500;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s ease;
        }
        .zv-navlinks button.active,
        .zv-navlinks button:hover { color: var(--white); }
        .zv-navlinks button.active::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px;
          background: var(--yellow);
          border-radius: 2px;
        }
        .zv-cta {
  background: var(--yellow);
  color: var(--ink);
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.15s ease, background 0.15s ease;
}
.zv-cta:hover { background: var(--yellow-dark); transform: translateY(-1px); }
.zv-cta:active { transform: translateY(0); }
.zv-burger {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  padding: 6px;
}
.zv-mobile-panel {
  display: none;
}

@media (max-width: 760px) {
  .zv-navlinks { display: none; }
  .zv-burger { display: flex; }
  .zv-nav .zv-cta { display: none; }
  .zv-mobile-panel.open {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: var(--ink);
    margin-top: 8px;
    border-radius: 20px;
    padding: 12px;
    max-width: 780px;
    width: calc(100% - 32px);
  }
  .zv-mobile-panel button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.75);
    text-align: left;
    font-size: 15px;
    padding: 10px 12px;
    border-radius: 10px;
  }
  .zv-mobile-panel button.active { color: var(--white); background: rgba(255,255,255,0.08); }
  .zv-mobile-panel button.zv-cta {
    background: var(--yellow);
    color: var(--ink);
    border: none;
    border-radius: 999px;
    padding: 12px 18px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    justify-content: center;
    margin-top: 6px;
  }
  .zv-mobile-panel button.zv-cta span.zv-cta-label { display: inline; }
}

        /* ---------- HERO ---------- */
        .zv-hero {
          padding: 88px 0 56px;
          text-align: center;
        }
        .zv-hero h1 {
          font-size: clamp(38px, 6vw, 68px);
          line-height: 1.05;
          font-weight: 700;
        }
        .zv-hero h1 .zv-arrow {
          display: inline-flex;
          vertical-align: middle;
          color: var(--yellow-dark);
        }
        .zv-hero p {
          max-width: 560px;
          margin: 22px auto 0;
          color: var(--ink-soft);
          font-size: 16px;
          line-height: 1.6;
        }
        .zv-hero-cta {
          margin-top: 32px;
          display: inline-flex;
        }
        .zv-fadeup {
          opacity: 0;
          transform: translateY(18px);
          animation: zv-fadeup 0.7s ease forwards;
        }
        @keyframes zv-fadeup {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- HERO CARDS ---------- */
        .zv-cardsrow {
          display: grid;
          grid-template-columns: 1.1fr 0.85fr 1.1fr;
          gap: 18px;
          margin-top: 64px;
          align-items: stretch;
        }
        .zv-card {
          background: var(--white);
          border-radius: 20px;
          border: 1px solid var(--line);
          padding: 26px;
        }
        .zv-card.dark {
          background: var(--ink);
          color: var(--white);
          border: none;
        }
        .zv-card-stack { display: flex; flex-direction: column; gap: 18px; }
        .zv-card h3 { font-size: 15px; font-weight: 600; margin-bottom: 16px; }
        .zv-tagcloud { display: flex; flex-direction: column; gap: 2px; }
        .zv-tagrow { display: flex; gap: 10px; align-items: center; }
        .zv-tagrow:not(:first-child) { margin-top: -4px; }
        .zv-tag {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          background: var(--cream);
          white-space: nowrap;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .zv-tag:hover { background: var(--yellow); transform: rotate(0deg) scale(1.06) !important; }
        .zv-tag-icon {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        .zv-tag-icon:hover { transform: scale(1.1) rotate(12deg); }
        .zv-stat-num { font-family: var(--font-heading); font-size: 34px; font-weight: 700; }
        .zv-stat-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-top: 6px; line-height: 1.5; }
        .zv-stat-label.on-light { color: var(--muted); }
        .zv-quote-icon { color: var(--yellow-dark); margin-bottom: 12px; }
        .zv-quote-text { font-size: 15px; font-weight: 500; line-height: 1.5; }
        .zv-quote-sub { font-size: 13px; color: var(--muted); margin-top: 10px; }
        .zv-avatars { display: flex; margin-top: 14px; }
        .zv-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2px solid var(--white);
          margin-left: -8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; color: var(--white);
        }
        .zv-avatar:first-child { margin-left: 0; }

        @media (max-width: 900px) {
          .zv-cardsrow { grid-template-columns: 1fr; }
        }

        /* ---------- SECTION HEADS ---------- */
        .zv-section { padding: 96px 0; }
        .zv-section.dark { background: var(--ink); color: var(--white); }
        .zv-eyebrow-label { font-size: 14px; color: var(--yellow-dark); font-weight: 600; margin-bottom: 10px; }
        .zv-section-head { font-size: clamp(28px, 4vw, 38px); font-weight: 700; max-width: 480px; padding-top:8px; }
        .dark .zv-section-head { color: var(--white); }
        .zv-section-sub { color: var(--ink-soft); font-size: 15px; line-height: 1.65; max-width: 460px; margin-top: 16px; padding-top: 16px; }
        .dark .zv-section-sub { color: rgba(255,255,255,0.68); }

        /* ---------- ABOUT ---------- */
        .zv-about-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 56px;
          align-items: center;
        }
        .zv-collage {
          position: relative;
          height: 380px;
        }
        .zv-mock {
          position: absolute;
          border-radius: 16px;
          border: 1px solid var(--line);
          background: var(--white);
          box-shadow: 0 16px 30px rgba(18,18,20,0.08);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .zv-mock:hover { transform: translateY(-6px) rotate(0deg) !important; }
        .zv-mock-browser { width: 66%; height: 210px; top: 0; left: 0; transform: rotate(-4deg); z-index: 2; }
        .zv-mock-code { width: 58%; height: 190px; bottom: 0; right: 0; transform: rotate(3deg); z-index: 3; background: var(--ink); }
        .zv-mock-mobile { width: 26%; height: 260px; bottom: 10px; left: 6%; transform: rotate(-6deg); z-index: 4; }
        .zv-mock-chip { width: 30%; height: 96px; top: 46%; right: 4%; transform: translateY(-50%) rotate(6deg); z-index: 1; background: var(--yellow); border: none; }
        .zv-browserbar { display: flex; gap: 5px; padding: 10px 12px; border-bottom: 1px solid var(--line); background: var(--white); position: relative; z-index: 2; }
        .zv-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--line); }
        .zv-mock-photo { display: block; width: 100%; height: 100%; object-fit: cover; }
        .zv-mock-browser .zv-mock-photo { height: calc(100% - 33px); }
        .zv-mock-mobile .zv-mock-photo { height: calc(100% - 24px); }
        .zv-chip-inner { padding: 16px; display: flex; flex-direction: column; justify-content: center; height: 100%; color: var(--ink); }
        .zv-chip-inner strong { font-family: var(--font-heading); font-size: 20px; }
        .zv-chip-inner span { font-size: 12px; margin-top: 4px; }
        .zv-mobile-notch { width: 30px; height: 4px; border-radius: 2px; background: var(--line); margin: 10px auto; position: relative; z-index: 2; }

        .zv-about-text p { color: var(--ink-soft); font-size: 15px; line-height: 1.7; margin-top: 18px; }
        .zv-about-statcard {
          margin-top: 26px;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .zv-about-statcard strong { font-family: var(--font-heading); font-size: 26px; display: block; }
        .zv-about-statcard span { font-size: 13px; color: var(--muted); }

        @media (max-width: 900px) {
          .zv-about-grid { grid-template-columns: 1fr; }
          .zv-collage { height: 320px; margin-bottom: 16px; }
        }

        /* ---------- SERVICES ---------- */
        .zv-services-head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; }
        .zv-svc-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 1fr 1fr 1.15fr;
          grid-template-rows: repeat(2, minmax(180px, 1fr));
          gap: 20px;
        }
        .zv-svc-card {
          --offset: 0px;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 28px 24px;
          transform: translateY(var(--offset));
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .zv-svc-card:nth-child(1) { grid-column: 1; grid-row: 1; }
        .zv-svc-card:nth-child(2) { grid-column: 2; grid-row: 1; --offset: 28px; }
        .zv-svc-card:nth-child(3) { grid-column: 1; grid-row: 2; --offset: -28px; }
        .zv-svc-card:nth-child(4) { grid-column: 2; grid-row: 2; }
        .zv-svc-card:hover {
          transform: translateY(calc(var(--offset) - 4px));
          border-color: var(--ink);
          box-shadow: 0 14px 26px rgba(18,18,20,0.08);
        }
        .zv-svc-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--cream);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink);
          margin-bottom: 18px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .zv-svc-card:hover .zv-svc-icon { background: var(--yellow); transform: rotate(-6deg); }
        .zv-svc-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
        .zv-svc-card p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; }

        /* Featured 5th service card */
        .zv-svc-card.featured {
          grid-column: 3;
          grid-row: 1 / 3;
          background: var(--yellow);
          border: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 28px;
        }
        .zv-svc-card.featured .zv-svc-icon {
          background: var(--ink);
          color: var(--yellow);
          width: 52px; height: 52px;
        }
        .zv-svc-card.featured:hover .zv-svc-icon { background: var(--ink); transform: rotate(-6deg); }
        .zv-svc-card.featured .zv-badge {
          align-self: flex-start;
          background: var(--ink);
          color: var(--yellow);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .zv-svc-card.featured h3 { font-size: 21px; color: var(--ink); }
        .zv-svc-card.featured p { font-size: 14.5px; color: rgba(18,18,20,0.72); line-height: 1.65; }

        @media (max-width: 900px) {
          .zv-svc-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: none; }
          .zv-svc-card { --offset: 0px !important; }
          .zv-svc-card:nth-child(1),
          .zv-svc-card:nth-child(2),
          .zv-svc-card:nth-child(3),
          .zv-svc-card:nth-child(4) { grid-column: auto; grid-row: auto; }
          .zv-svc-card.featured { grid-column: 1 / 3; grid-row: auto; }
        }
        @media (max-width: 600px) {
          .zv-svc-grid { grid-template-columns: 1fr; }
          .zv-svc-card.featured { grid-column: 1; }
        }

        /* ---------- WHY US (dark) ---------- */
        .zv-why-grid {
          display: grid;
          grid-template-columns: 0.9fr 1fr 1fr;
          gap: 36px;
          margin-top: 56px;
        }
        .zv-why-item .zv-svc-icon { background: rgba(255,255,255,0.08); color: var(--yellow); }
        .zv-why-item h3 { color: var(--white); font-size: 16px; margin-bottom: 8px; }
        .zv-why-item p { color: rgba(255,255,255,0.62); font-size: 14px; line-height: 1.65; }
        .zv-why-head { grid-column: span 1; }
        .zv-why-pairs { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 32px 28px; }

        @media (max-width: 900px) {
          .zv-why-grid { grid-template-columns: 1fr; }
          .zv-why-pairs { grid-column: span 1; grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .zv-why-pairs { grid-template-columns: 1fr; }
        }

        /* ---------- CONTACT ---------- */
        .zv-contact-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 48px;
        }
        .zv-contact-info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          font-size: 14px;
          color: var(--ink-soft);
        }
        .zv-contact-info-item .zv-svc-icon { width: 38px; height: 38px; margin-bottom: 0; border-radius: 10px; }
        .zv-form-card {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 32px;
        }
        .zv-field { margin-bottom: 18px; display: flex; flex-direction: column; gap: 8px; }
        .zv-field label { font-size: 13px; font-weight: 600; color: var(--ink); }
        .zv-field input, .zv-field textarea {
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .zv-field input:focus, .zv-field textarea:focus {
          outline: none;
          border-color: var(--ink);
          background: var(--white);
        }
        .zv-field textarea { resize: vertical; min-height: 110px; }
        .zv-dropdown { position: relative; }
        .zv-dropdown__trigger {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 12px 14px;
          background: var(--cream);
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--ink);
        }
        .zv-dropdown__panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 12px 24px rgba(18,18,20,0.12);
          z-index: 10;
          max-height: 220px;
          overflow-y: auto;
        }
        .zv-dropdown__option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 8px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
        }
        .zv-dropdown__option:hover { background: var(--cream); }
        .zv-dropdown__option input { display: none; }
        .zv-checkbox {
          width: 17px; height: 17px;
          border-radius: 5px;
          border: 1.5px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: var(--cream);
        }
        .zv-dropdown__option input:checked + .zv-checkbox,
        .zv-checkbox:has(svg) { background: var(--yellow); border-color: var(--yellow-dark); }
        .zv-error { color: #b3432f; font-size: 13px; margin-top: -8px; margin-bottom: 14px; }
        .zv-submit {
          width: 100%;
          background: var(--ink);
          color: var(--white);
          border: none;
          border-radius: 999px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .zv-submit:hover { background: #2a2a2c; transform: translateY(-1px); }
        .zv-sent {
          margin-top: 14px;
          font-size: 13px;
          color: var(--muted);
          text-align: center;
        }

        @media (max-width: 900px) {
          .zv-contact-grid { grid-template-columns: 1fr; }
        }

        /* ---------- FOOTER ---------- */
        .zv-footer {
          padding: 36px 0;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          font-size: 13px;
          color: var(--muted);
        }

        @media (prefers-reduced-motion: reduce) {
          .zv-fadeup, .zv-mock, .zv-svc-card, .zv-tag, .zv-cta { animation: none !important; transition: none !important; }
        }
      `}</style>

     {/* NAVBAR */}
<div className="zv-navwrap">
  <div style={{ width: "100%", maxWidth: 780 }}>
    <nav className="zv-nav">
      <span className="zv-logo">
        <img src={LOGO_SRC} alt="ZAHVO Technologies" className="zv-logo-mark" />
        ZAHVO
      </span>
      <div className="zv-navlinks">
        {NAV_LINKS.map((l) => (
          <button
            key={l.id}
            className={active === l.id ? "active" : ""}
            onClick={() => scrollTo(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="zv-cta" onClick={() => scrollTo("contact")}>
          <span className="zv-cta-label">Book a call</span>
          <ArrowUpRight size={16} />
        </button>
        <button className="zv-burger" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
    <div className={`zv-mobile-panel ${mobileOpen ? "open" : ""}`}>
      {NAV_LINKS.map((l) => (
        <button
          key={l.id}
          className={active === l.id ? "active" : ""}
          onClick={() => scrollTo(l.id)}
        >
          {l.label}
        </button>
      ))}
      <button className="zv-cta" onClick={() => scrollTo("contact")}>
        <span className="zv-cta-label">Book a call</span>
        <ArrowUpRight size={16} />
      </button>
    </div>
  </div>
</div>

      {/* HOME / HERO */}
      <section id="home" className="zv-section" style={{ paddingTop: 24 }}>
        <div className="zv-container">
          <div className="zv-hero">
            <h1 className="zv-fadeup">
              We build digital products
              <br />
              that grow your business{" "}
              <span className="zv-arrow">
                <ArrowUpRight size={44} strokeWidth={2.4} />
              </span>
            </h1>
            <p className="zv-fadeup" style={{ animationDelay: "0.1s" }}>
              Websites, web apps and automation built by ZAHVO Technologies —
              from first sketch to the systems that run behind the scenes.
            </p>
            <div className="zv-hero-cta zv-fadeup" style={{ animationDelay: "0.18s" }}>
              <button className="zv-cta" style={{ padding: "14px 24px", fontSize: 15 }} onClick={() => scrollTo("contact")}>
                <span className="zv-cta-label">Book a call</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="zv-cardsrow zv-fadeup" style={{ animationDelay: "0.26s" }}>
            <div className="zv-card">
              <h3>Services</h3>
              <div className="zv-tagcloud">
                {TAG_ROWS.map((row, i) => (
                  <div className="zv-tagrow" key={i}>
                    {row.map((item, j) =>
                      item.icon ? (
                        <span className="zv-tag-icon" key={j}>
                          <Sparkles size={15} />
                        </span>
                      ) : (
                        <span
                          className="zv-tag"
                          key={j}
                          style={{ transform: `rotate(${item.rotate}deg)` }}
                        >
                          {item.label}
                        </span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="zv-card-stack">
              <div className="zv-card dark" style={{ flex: 1 }}>
                <p className="zv-stat-num">3+</p>
                <p className="zv-stat-label">projects shipped across web, product and automation.</p>
              </div>
              <div className="zv-card" style={{ flex: 1 }}>
                <p className="zv-stat-num">100%</p>
                <p className="zv-stat-label on-light">of our clients are satisfied with our work</p>
              </div>
            </div>

            <div className="zv-card">
              <Quote size={26} className="zv-quote-icon" />
              <p className="zv-quote-text">
                They shipped faster than our own team expected, and the handover docs meant we could take it from there.
              </p>
              <div className="zv-avatars">
                <div className="zv-avatar" style={{ background: "#2b6cb0" }}>JR</div>
                {/* <div className="zv-avatar" style={{ background: "#b3432f" }}>SK</div>
                <div className="zv-avatar" style={{ background: "var(--yellow-dark)" }}>AL</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="zv-section">
        <div className="zv-container">
          <div className="zv-about-grid">
            <div className="zv-collage">
              <div className="zv-mock zv-mock-browser">
                <div className="zv-browserbar">
                  <span className="zv-dot" /><span className="zv-dot" /><span className="zv-dot" />
                </div>
                <img
                  className="zv-mock-photo"
                  src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?auto=format&fit=crop&w=500&q=70"
                  alt="Team collaborating on a laptop"
                />
              </div>
              <div className="zv-mock zv-mock-code">
                <img
                  className="zv-mock-photo"
                  src="https://images.unsplash.com/photo-1487505983481-9aa2d9f9901a?auto=format&fit=crop&w=460&q=70"
                  alt="Close-up of code on a screen"
                />
              </div>
              <div className="zv-mock zv-mock-mobile">
                <div className="zv-mobile-notch" />
                <img
                  className="zv-mock-photo"
                  src="https://images.unsplash.com/photo-1546016366-f58281251e3d?auto=format&fit=crop&w=300&q=70"
                  alt="Sketching a wireframe layout"
                />
              </div>
              <div className="zv-mock zv-mock-chip">
                <div className="zv-chip-inner">
                  <strong>+35%</strong>
                  <span>avg. speed to launch</span>
                </div>
              </div>
            </div>

            <div className="zv-about-text">
              <p className="zv-eyebrow-label">About ZAHVO</p>
              <h2 className="zv-section-head">The team behind your next build</h2>
              <p>
                ZAHVO Technologies is a small, senior team of designers and engineers.
                We take a project from a rough idea to a live product — writing the
                code ourselves rather than handing you off between departments.
              </p>
              <p>
                Our approach pairs practical design with automation from day one:
                fewer manual steps for your team, and a site or app that keeps working
                after we ship it.
              </p>
              <div className="zv-about-statcard">
                <Layers size={28} color="var(--yellow-dark)" />
                <div>
                  <strong>One team, every layer</strong>
                  <span>Design, development and automation under one roof.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US - dark */}
      <section className="zv-section dark">
        <div className="zv-container">
          <div className="zv-why-grid">
            <div className="zv-why-head">
              <p className="zv-eyebrow-label">Why ZAHVO</p>
              <h2 className="zv-section-head">Why our clients choose us as partners</h2>
            </div>
            <div className="zv-why-pairs">
              {WHY_US.map((item) => (
                <div className="zv-why-item" key={item.title}>
                  <div className="zv-svc-icon">
                    <item.icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="zv-section">
        <div className="zv-container">
          <div className="zv-services-head">
            <div>
              <p className="zv-eyebrow-label">What we do</p>
              <h2 className="zv-section-head">Services built to cover the full build</h2>
            </div>
            <p className="zv-section-sub" style={{ marginTop: 0 }}>
              From the first pixel to the systems running quietly in the background —
              pick one service or combine a few.
            </p>
          </div>
          <div className="zv-svc-grid">
            {SERVICES.map((s) => (
              <div className={`zv-svc-card ${s.featured ? "featured" : ""}`} key={s.title}>
                {s.featured && <span className="zv-badge">Most requested</span>}
                <div className="zv-svc-icon">
                  <s.icon size={s.featured ? 24 : 20} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="zv-section">
        <div className="zv-container">
          <div className="zv-contact-grid">
            <div>
              <p className="zv-eyebrow-label">Get in touch</p>
              <h2 className="zv-section-head">Tell us about your project</h2>
              <p className="zv-section-sub">
                Share a few details and we'll get back to you within one business day
                with next steps.
              </p>
              <div className="zv-contact-info-item">
                <div className="zv-svc-icon"><Mail size={17} /></div>
                zaryabmuhammad321@gmail.com
              </div>
              <div className="zv-contact-info-item">
                <div className="zv-svc-icon"><Phone size={17} /></div>
                +92 325 8741423
              </div>
              {/* <div className="zv-contact-info-item">
                <div className="zv-svc-icon"><MapPin size={17} /></div>
                Remote-first, working worldwide
              </div> */}
            </div>

            <form className="zv-form-card" onSubmit={handleSubmit} noValidate>
              <div className="zv-field">
                <label htmlFor="zv-name">Full name</label>
                <input
                  id="zv-name"
                  type="text"
                  placeholder="Zaryab Muhammad"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              </div>
              <div className="zv-field">
                <label htmlFor="zv-company">Company name</label>
                <input
                  id="zv-company"
                  type="text"
                  placeholder="Your company"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </div>
              <div className="zv-field">
                <label>Services</label>
                <ServiceDropdown
                  selected={form.services}
                  onChange={(val) => updateField("services", val)}
                />
              </div>
              <div className="zv-field">
                <label htmlFor="zv-desc">Project description</label>
                <textarea
                  id="zv-desc"
                  placeholder="What are you looking to build?"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
              {error && <p className="zv-error">{error}</p>}
              <button type="submit" className="zv-submit">
                Send message <ArrowUpRight size={17} />
              </button>
              {sent && (
                <p className="zv-sent">
                  Your email app should now be open with this message ready to send to zaryabmuhammad321@gmail.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="zv-footer">
        <div className="zv-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, width: "100%" }}>
          <span className="zv-logo" style={{ color: "var(--ink)" }}>
            <img src={LOGO_SRC} alt="ZAHVO Technologies" className="zv-logo-mark footer" />
            ZAHVO Technologies
          </span>
          <span>© {new Date().getFullYear()} ZAHVO Technologies. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
