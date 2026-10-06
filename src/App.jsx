import { useEffect, useRef, useState } from "react";
import { APK_DOWNLOAD_URL, APP_VERSION, GITHUB_URL } from "./config";
import logoLight from "./public/found-it-icon-light.svg";
import logoDark from "./public/found-it-icon-dark.png";
import homeLight from "./public/home-light.jpg";
import homeDark from "./public/home-dark.jpg";
import loginLight from "./public/login-light.jpg";
import loginDark from "./public/login-dark.jpg";
import lostLight from "./public/lost-light.jpg";
import lostDark from "./public/lost-dark.jpg";
import matchScreen from "./public/match.jpg";
import messageLight from "./public/message-light.jpg";
import messageDark from "./public/message-dark.jpg";
import reportsLight from "./public/reports-light.jpg";
import reportsDark from "./public/reports-dark.jpg";
import searchLight from "./public/search-light.jpg";
import searchDark from "./public/search-dark.jpg";

/* Theme-aware Android screenshot set, driven by the existing website
   theme state (single source of truth). match.jpg is intentionally
   theme-independent and shared by both themes. */
const LOGOS = { light: logoLight, dark: logoDark };
const SHOTS = {
  home: { light: homeLight, dark: homeDark },
  login: { light: loginLight, dark: loginDark },
  lost: { light: lostLight, dark: lostDark },
  message: { light: messageLight, dark: messageDark },
  reports: { light: reportsLight, dark: reportsDark },
  search: { light: searchLight, dark: searchDark },
};
const pickShot = (key, dark) => SHOTS[key][dark ? "dark" : "light"];

/* ---------------------------------- hooks --------------------------------- */

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("foundit-theme");
      if (saved) return saved === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("foundit-theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);
  return [dark, setDark];
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* --------------------------------- pieces --------------------------------- */

function Logo({ dark = false, compact = false }) {
  const logoSrc = dark ? LOGOS.dark : LOGOS.light;
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label="FoundIT home">
      <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border-2 border-ink bg-white shadow-brutal-sm dark:border-night-border dark:shadow-none">
        <img
          key={logoSrc}
          src={logoSrc}
          alt=""
          className="themed-fade h-full w-full object-contain p-1"
        />
      </span>
      {!compact && (
        <span className="text-xl font-extrabold tracking-tight">
          Found<span style={{ color: "var(--primary)" }}>IT</span>
        </span>
      )}
    </a>
  );
}

function Tag({ children, tone = "default" }) {
  const tones = {
    default: "border-line text-muted dark:border-night-border",
    blue: "border-brand bg-brand-light text-brand-dark dark:border-night-border dark:bg-night-elevated dark:text-brand-accent",
    red: "border-red-200 bg-red-50 text-lost dark:border-night-border dark:bg-night-elevated dark:text-lost-dark",
    green:
      "border-green-200 bg-green-50 text-found dark:border-night-border dark:bg-night-elevated dark:text-found-dark",
    amber:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-night-border dark:bg-night-elevated dark:text-amber-300",
    solid: "border-ink bg-ink text-white dark:border-night-border dark:bg-night-elevated dark:text-white",
  };
  return <span className={`tag ${tones[tone]}`}>{children}</span>;
}

function SectionHeader({ id, eyebrow, title, sub }) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}

function Phone({ image, alt, label, status }) {
  return (
    <div>
      <div className="phone">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-slate-950"
        />
        <div className="phone-screen">
          <img key={image} src={image} alt={alt} loading="lazy" className="shot themed-fade" />
        </div>
      </div>
      {(label || status) && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {label && (
            <p className="meta-label" style={{ color: "var(--muted)" }}>
              {label}
            </p>
          )}
          {status && <Tag tone={status === "LOST" ? "red" : status === "FOUND" ? "green" : "blue"}>{status}</Tag>}
        </div>
      )}
    </div>
  );
}

/* Compact consistent SVG icon set (no giant emoji icons) */
function FIcon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const ICONS = {
  search: "M11 4a7 7 0 1 0 4.9 12L21 21l-1.4 1.4-5.1-5.1A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z",
  photos:
    "M4 7h3l2-2h6l2 2h3v12H4V7Zm4 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 1 1 12 15a2.5 2.5 0 0 1 0-4.5Z",
  pin: "M12 21s-6.5-5.2-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.8-6.5 10-6.5 10Zm0-7.5A2.5 2.5 0 1 0 12 8.5a2.5 2.5 0 0 0 0 5Z",
  match:
    "M7 4h4v4H7zM13 4h4v4h-4zM7 10h4v4H7zM13 10h4v4h-4zM7 16h4v4H7zM13 16h4v4h-4z",
  chat: "M4 5h16v11H9l-5 4V5Zm4 4v2m3-2v2m3-2v2",
  board: "M5 5h14v14H5zM9 9h6m-6 3.5h6M9 16h3",
  bell: "M6 16v-5a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Zm4.5 5a1.8 1.8 0 0 0 3 0",
  moon: "M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z",
};

function Navbar({ dark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const links = [
    ["Home", "home"],
    ["Features", "features"],
    ["How It Works", "how"],
    ["Screenshots", "screens"],
    ["Download", "download"],
  ];
  useEffect(() => {
    const onScroll = () => {
      const ids = ["home", "features", "how", "screens", "download"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--surface) 88%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="shell flex min-h-[68px] items-center justify-between gap-4" aria-label="Primary">
        <Logo dark={dark} />
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="nav-link" data-active={active === id}>
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => onToggleTheme(!dark)}
            className="btn btn-secondary !min-h-[44px] !rounded-xl !px-4"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
            <span className="meta-label">{dark ? "Light" : "Dark"}</span>
          </button>
          <a href={APK_DOWNLOAD_URL} className="btn btn-primary !min-h-[44px]">
            Get FoundIT <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onToggleTheme(!dark)}
            className="grid h-10 w-10 place-items-center rounded-xl border text-lg"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-white text-xl font-bold dark:border-night-border dark:bg-night-surface dark:text-white"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t px-5 py-4 lg:hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="grid gap-2">
            {links.map(([label, id]) => (
              <a
                key={id}
                onClick={() => setOpen(false)}
                href={`#${id}`}
                className="rounded-xl border px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest"
                style={{ borderColor: "var(--border)" }}
              >
                {label}
              </a>
            ))}
            <a href={APK_DOWNLOAD_URL} className="btn btn-primary mt-1">
              Get FoundIT <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- data ---------------------------------- */

const FEATURES = [
  {
    key: "search",
    title: "Smart Search",
    text: "Find reports by item, category, location, and date.",
  },
  {
    key: "photos",
    title: "Multiple Photos",
    text: "Add up to five photos to help identify an item.",
  },
  {
    key: "pin",
    title: "Campus Locations",
    text: "Provide useful location information for lost and found reports.",
  },
  {
    key: "match",
    title: "Possible Matches",
    text: "Discover items that may match a lost report.",
  },
  {
    key: "chat",
    title: "Messaging",
    text: "Contact other users through the existing FoundIT messaging system.",
  },
  {
    key: "board",
    title: "Report Tracking",
    text: "Manage Lost, Found, and Resolved reports.",
  },
  {
    key: "bell",
    title: "Notifications",
    text: "Stay informed about matches and report activity.",
  },
  {
    key: "moon",
    title: "Light & Dark Mode",
    text: "Use FoundIT comfortably in different environments.",
  },
];

const SOLUTION_POINTS = [
  "Report lost items",
  "Report found items",
  "Search campus reports",
  "Discover possible matches",
  "Contact reporters",
  "Track your reports",
  "Resolve recovered items",
];

const STEPS = [
  ["01", "Report", "Tell the campus community what was lost or found."],
  ["02", "Search", "Browse reports using useful filters."],
  ["03", "Match", "Discover possible matches."],
  ["04", "Recover", "Contact the other user and resolve the report."],
];

const FAQS = [
  ["What is FoundIT?", "FoundIT is a campus Lost & Found application for students — report, search, match, and recover belongings in one place."],
  ["Can I report something I found?", "Yes. Create a Found report with the item details, location, and photos so its owner can reach you."],
  ["Can I upload photos?", "Yes, up to five photos per report to help identify the item."],
  ["Can I search by date?", "Yes. Filter campus reports by item, category, location, and date."],
  ["Can I contact the person who reported an item?", "Yes, through the existing messaging functionality where applicable."],
  ["Does FoundIT support dark mode?", "Yes. Both the Android app and this site support comfortable Light and Dark modes."],
];

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-8 grid gap-3">
      {FAQS.map(([q, a], i) => {
        const open = active === i;
        return (
          <div key={q} className="card overflow-hidden !rounded-2xl">
            <button
              onClick={() => setActive(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold"
            >
              <span>{q}</span>
              <span
                aria-hidden="true"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-lg leading-none"
                style={{
                  borderColor: "var(--border)",
                  background: open ? "var(--primary)" : "transparent",
                  color: open ? "#fff" : "var(--primary)",
                }}
              >
                {open ? "−" : "+"}
              </span>
            </button>
            {open && (
              <p className="border-t px-5 py-4 leading-7" style={{ borderColor: "var(--divider)", color: "var(--muted)" }}>
                {a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const [dark, setDark] = useTheme();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar dark={dark} onToggleTheme={setDark} />

      <main id="main">
        {/* ------------------------------- HERO ------------------------------- */}
        <section id="home" className="grid-paper overflow-hidden border-b" style={{ borderColor: "var(--border)" }}>
          <div className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                <Tag tone="blue">● Campus network</Tag>
                <Tag tone="default">Found / Campus</Tag>
                <Tag tone="default">Android app</Tag>
              </div>
              <h1
                className="mt-6 font-extrabold tracking-tight text-balance"
                style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)", lineHeight: 1.04 }}
              >
                Find what you&rsquo;ve lost.
                <br />
                <span style={{ color: "var(--primary)" }}>Return what you&rsquo;ve found.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
                FoundIT is a campus Lost &amp; Found platform that helps students
                report, discover, match, and recover lost belongings.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={APK_DOWNLOAD_URL} className="btn btn-primary text-base">
                  Download FoundIT <span aria-hidden="true">→</span>
                </a>
                <a href="#features" className="btn btn-secondary">
                  Explore Features
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] font-bold uppercase tracking-[.14em]" style={{ color: "var(--muted)" }}>
                <span>Match status / Active</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-40" />
                <span>
                  <span className="text-lost dark:text-lost-dark">Lost: 12</span> · <span className="text-found dark:text-found-dark">Found: 08</span>
                </span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-40" />
                <span>{APP_VERSION}</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto max-w-[340px] py-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-8 h-[92%] -rotate-3 rounded-3xl border-2 border-ink bg-brand-light dark:border-night-border dark:bg-night-elevated"
                />
                <div className="relative">
                  <Phone image={pickShot("home", dark)} alt="FoundIT Home screen" />
                  <div
                    className="brutal-accent absolute -bottom-3 -left-4 rounded-xl bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest dark:bg-night-surface dark:text-white sm:-left-8"
                  >
                    Home.screen
                    <br />
                    <span style={{ color: "var(--primary)" }}>Live preview</span>
                  </div>
                  <div className="absolute -right-3 top-14 sm:-right-6">
                    <Tag tone="green">● Found-01</Tag>
                  </div>
                  <div className="absolute -left-3 top-1/3 sm:-left-8">
                    <Tag tone="red">Lost item / 01</Tag>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------ PROBLEM ----------------------------- */}
        <section className="shell py-16 sm:py-24" aria-labelledby="problem-title">
          <SectionHeader
            id="problem-title"
            eyebrow="The problem"
            title="Lost something? You shouldn't have to chase group chats."
            sub="Students often rely on social media posts, group chats, scattered announcements, and asking classmates individually. This makes finding belongings slow and unreliable."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <article className="card h-full p-7 opacity-90" aria-label="Scattered reports">
                <div className="flex items-center justify-between">
                  <Tag tone="amber">✕ Scattered reports</Tag>
                  <span className="meta-label" style={{ color: "var(--muted)" }}>Before</span>
                </div>
                <ul className="mt-5 space-y-3 text-[15px] leading-7" style={{ color: "var(--muted)" }}>
                  {["Buried group-chat messages", "Screenshots passed hand to hand", "No clear owner or status", "No way to track what was returned"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden="true" className="mt-1 text-lost">✕</span> {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="card card-hover pixel-corners h-full border-2 p-7" style={{ borderColor: "var(--primary)" }} aria-label="One campus platform">
                <div className="flex items-center justify-between">
                  <Tag tone="blue">✓ One campus platform</Tag>
                  <span className="meta-label" style={{ color: "var(--muted)" }}>FoundIT</span>
                </div>
                <ul className="mt-5 space-y-3 text-[15px] leading-7 font-medium">
                  {["Every report in one searchable place", "Photos, locations, and dates attached", "LOST / FOUND / RESOLVED status is always clear", "Messaging built in to arrange returns"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden="true" className="mt-1 text-found">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------ SOLUTION ---------------------------- */}
        <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }} aria-labelledby="solution-title">
          <div className="shell py-16 sm:py-24">
            <SectionHeader
              id="solution-title"
              eyebrow="The solution"
              title="One place for your campus Lost & Found."
              sub="Report it, search it, match it, return it — without leaving the app your campus already uses."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SOLUTION_POINTS.map((point, i) => (
                <Reveal key={point} delay={Math.min(i * 40, 200)}>
                  <div className="card card-hover flex items-center gap-3 p-4">
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-brand-light font-mono text-xs font-bold text-brand-dark dark:border-night-border dark:bg-night-elevated dark:text-brand-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold leading-6">{point}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={200}>
                <div
                  className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-ink p-4 text-white dark:border-night-border dark:bg-night-elevated"
                  role="note"
                  aria-label="Campus flow"
                >
                  <span aria-hidden="true" className="font-pixel text-[10px] text-amber-300">▸▸</span>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[.14em]">Lost → Match → Return</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------ FEATURES ---------------------------- */}
        <section id="features" className="shell py-16 sm:py-24" aria-labelledby="features-title">
          <SectionHeader
            id="features-title"
            eyebrow="Features"
            title="Everything a busy campus needs."
            sub="Compact tools that turn a missing-item moment into a reunion — no clutter, no learning curve."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.key} delay={Math.min((i % 4) * 60, 200)}>
                <article className="card card-hover h-full p-6">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: "var(--primary)", color: "#fff" }}
                  >
                    <FIcon d={ICONS[f.key]} />
                  </span>
                  <p className="meta-label mt-5" style={{ color: "var(--muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                    {f.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------- LOST VS FOUND -------------------------- */}
        <section className="shell pb-16 sm:pb-24" aria-label="Lost versus Found">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="card h-full overflow-hidden">
                <div className="h-1.5 bg-lost" aria-hidden="true" />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-2">
                    <Tag tone="red">● Lost</Tag>
                    <span className="meta-label" style={{ color: "var(--muted)" }}>Status / Report</span>
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight">“I lost something.”</h3>
                  <p className="mt-2 leading-7" style={{ color: "var(--muted)" }}>
                    Report an item you&rsquo;ve lost and provide:
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] font-medium leading-7">
                    {["Item details & category", "Last known location", "Date lost", "Up to 5 photos", "Contact information"].map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span aria-hidden="true" className="text-lost">▪</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="card h-full overflow-hidden">
                <div className="h-1.5 bg-found" aria-hidden="true" />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-2">
                    <Tag tone="green">● Found</Tag>
                    <span className="meta-label" style={{ color: "var(--muted)" }}>Status / Report</span>
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight">“I found something.”</h3>
                  <p className="mt-2 leading-7" style={{ color: "var(--muted)" }}>
                    Report an item you&rsquo;ve found and help its owner recover it — same clear
                    form, same campus audience, resolved together.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag tone="default">Photo proof</Tag>
                    <Tag tone="default">Pickup location</Tag>
                    <Tag tone="default">Resolved ✓</Tag>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------- HOW IT WORKS -------------------------- */}
        <section id="how" className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="shell py-16 sm:py-24">
            <SectionHeader
              eyebrow="How it works"
              title="Report. Search. Match. Recover."
              sub="Four steps, one campus community looking out for each other."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-4">
              {STEPS.map(([n, t, p], i) => (
                <Reveal key={n} delay={i * 70}>
                  <li className="card relative h-full p-6">
                    <p className="font-pixel text-sm" style={{ color: "var(--primary)" }}>{n}</p>
                    <h3 className="mt-4 text-xl font-extrabold">{t}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{p}</p>
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-4 left-8 hidden h-8 w-8 place-items-center rounded-full border-2 border-ink bg-amber-300 font-bold md:grid"
                      >
                        →
                      </span>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------- SCREENSHOTS --------------------------- */}
        <section id="screens" className="shell py-16 sm:py-24" aria-labelledby="screens-title">
          <SectionHeader
            id="screens-title"
            eyebrow="Inside the app"
            title="Real Android UI, made for campus moments."
            sub="Actual FoundIT screens — the same premium design language as the redesigned app. Additional views (Item Details, Notifications, Profile) share this system."
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal><Phone image={pickShot("search", dark)} alt="FoundIT Search screen" label="02 / Search" status="FOUND" /></Reveal>
            <Reveal delay={70}><Phone image={pickShot("lost", dark)} alt="FoundIT Lost item screen" label="03 / Report lost" status="LOST" /></Reveal>
            <Reveal delay={140}><Phone image={matchScreen} alt="FoundIT Possible Match screen" label="04 / Possible match" /></Reveal>
            <Reveal><Phone image={pickShot("message", dark)} alt="FoundIT Messages screen" label="05 / Messaging" /></Reveal>
            <Reveal delay={70}><Phone image={pickShot("reports", dark)} alt="FoundIT My Reports screen" label="06 / My reports" /></Reveal>
            <Reveal delay={140}><Phone image={pickShot("login", dark)} alt="FoundIT Login screen" label="01 / Login" /></Reveal>
          </div>
        </section>

        {/* ------------------------------ SHOWCASE ----------------------------- */}
        <section className="border-y" style={{ borderColor: "var(--border)", background: "#0B1020" }} aria-label="App showcase">
          <div className="shell py-16 text-white sm:py-24">
            <Reveal>
              <p className="eyebrow !text-brand-accent">Showcase</p>
              <h2 className="section-title !text-white">Built for campus life.</h2>
              <p className="section-sub !text-slate-300">
                Classrooms, libraries, cafeterias, laboratories — FoundIT travels with you
                across campus in your pocket.
              </p>
            </Reveal>
            <div className="mt-12 grid items-end justify-center gap-10 sm:grid-cols-3 sm:gap-6">
              <Reveal className="hidden sm:block">
                <div className="scale-[.88] opacity-90">
                  <Phone image={pickShot("lost", dark)} alt="FoundIT Lost item screen" label="Report" />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <Phone image={pickShot("home", dark)} alt="FoundIT Home screen" label="Home" status="FOUND" />
                </div>
              </Reveal>
              <Reveal delay={140} className="hidden sm:block">
                <div className="scale-[.88] opacity-90">
                  <Phone image={pickShot("message", dark)} alt="FoundIT Messages screen" label="Messages" />
                </div>
              </Reveal>
            </div>
            <Reveal>
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {["Library", "Cafeteria", "Classroom", "Laboratory", "Student Center"].map((x) => (
                  <span key={x} className="tag border-white/20 bg-white/5 text-slate-200">⌖ {x}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------- HCI / UX ---------------------------- */}
        <section className="shell py-16 sm:py-24" aria-labelledby="hci-title">
          <SectionHeader
            id="hci-title"
            eyebrow="HCI / UX principles"
            title="Designed with people in mind."
            sub="A BSIT HCI/UI project — practical choices that make finding and returning feel straightforward."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Clear Navigation", "Home, Search, Messages, My Reports, and Profile are always one tap away."],
              ["Recognition Over Recall", "Important actions and LOST / FOUND / RESOLVED statuses are clearly labeled — never memorized."],
              ["Accessible Interaction", "Large touch targets, readable typography, and visible focus states throughout."],
              ["Clear Status", "LOST, FOUND, RESOLVED, loading, and error states are visually distinct — never color alone."],
              ["Consistent Design", "Reusable cards, buttons, inputs, navigation, and 8dp spacing keep every screen familiar."],
              ["Low Cognitive Load", "Short forms, smart defaults, and filters that match how students actually search."],
            ].map(([t, p], i) => (
              <Reveal key={t} delay={Math.min((i % 3) * 60, 150)}>
                <article className="card card-hover h-full p-6">
                  <p className="meta-label" style={{ color: "var(--primary)" }}>0{i + 1}</p>
                  <h3 className="mt-2 text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{p}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------ COMMUNITY ---------------------------- */}
        <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="shell grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Campus community</p>
              <h2 className="section-title">Lost something on campus? You&rsquo;re not alone.</h2>
              <p className="section-sub">
                FoundIT helps students help other students — every found item posted is
                someone&rsquo;s day saved, every resolved report makes campus a little better.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag tone="green">Students helping students</Tag>
                <Tag tone="blue">Campus network</Tag>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card pixel-corners p-6 sm:p-8">
                <p className="meta-label" style={{ color: "var(--muted)" }}>Match status / Active</p>
                <blockquote className="mt-3 text-xl font-bold leading-8">
                  “Left my ID in the cafeteria — FoundIT matched it before lunch was over.”
                </blockquote>
                <p className="mt-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                  — A very typical campus story · Resolved ✓
                </p>
                <div className="mt-5 flex gap-2 border-t pt-5" style={{ borderColor: "var(--divider)" }}>
                  <Tag tone="red">Lost</Tag>
                  <span aria-hidden="true" className="self-center font-bold" style={{ color: "var(--muted)" }}>→</span>
                  <Tag tone="green">Found</Tag>
                  <span aria-hidden="true" className="self-center font-bold" style={{ color: "var(--muted)" }}>→</span>
                  <Tag tone="blue">Resolved</Tag>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------ DOWNLOAD ----------------------------- */}
        <section id="download" className="grid-paper border-b" style={{ borderColor: "var(--border)" }}>
          <div className="shell grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_.85fr]">
            <Reveal>
              <p className="eyebrow">Android download</p>
              <h2 className="section-title">Bring FoundIT to your campus.</h2>
              <p className="section-sub">
                Download the Android application and start reporting, searching, and
                recovering campus belongings.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={APK_DOWNLOAD_URL} className="btn btn-primary text-base" download>
                  ⬇ Download APK
                </a>
                <a
                  href={GITHUB_URL}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="mt-5 font-mono text-xs" style={{ color: "var(--muted)" }}>
                * FoundIT is currently available for Android.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <aside className="card brutal-accent p-6 sm:p-7" aria-label="Release information">
                <div className="flex items-center gap-3">
                  <Logo dark={dark} compact />
                  <span className="ml-auto"><Tag tone="blue">Android</Tag></span>
                </div>
                <p className="meta-label mt-6" style={{ color: "var(--primary)" }}>Release information</p>
                <dl className="mt-3 divide-y font-mono text-sm" style={{ borderColor: "var(--divider)" }}>
                  {[
                    ["Version", APP_VERSION],
                    ["Platform", "Android"],
                    ["File", `FoundIT-${APP_VERSION}.apk`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 py-3" style={{ borderColor: "var(--divider)" }}>
                      <dt className="uppercase tracking-widest text-[11px]" style={{ color: "var(--muted)" }}>{k}</dt>
                      <dd className="font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={APK_DOWNLOAD_URL} className="btn btn-primary mt-5 w-full" download>
                  ⬇ Download APK
                </a>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------- INSTALL ----------------------------- */}
        <section className="shell py-16 sm:py-20" aria-label="How to install">
          <SectionHeader eyebrow="Installation" title="How to install" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Download the APK.",
              "Open the downloaded APK.",
              "Allow installation from your browser or file manager if Android asks.",
              "Install FoundIT and open the app.",
            ].map((step, i) => (
              <Reveal key={step} delay={i * 60}>
                <li className="card h-full p-5">
                  <p className="font-pixel text-sm" style={{ color: "var(--primary)" }}>0{i + 1}</p>
                  <p className="mt-4 font-semibold leading-6">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* --------------------------------- FAQ ------------------------------- */}
        <section id="faq" className="shell pb-16 sm:pb-24" aria-labelledby="faq-title">
          <SectionHeader id="faq-title" eyebrow="Help desk" title="Questions, answered." />
          <FAQ />
        </section>

        {/* ------------------------------ FINAL CTA ---------------------------- */}
        <section className="border-t-2 border-ink bg-brand py-16 text-white dark:border-night-border sm:py-20">
          <div className="shell grid items-end gap-8 md:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-blue-100">
                // Final call
              </p>
              <h2 className="mt-3 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                Find it. Return it.
                <br />
                Make campus better.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="leading-7 text-blue-100">
                One campus system for the little things that matter.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={APK_DOWNLOAD_URL} className="btn btn-ghost-light" download>
                  Download FoundIT
                </a>
                <a
                  href="#features"
                  className="btn border-2 border-white/70 text-white hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Explore FoundIT
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-night text-white" style={{ background: "#0B1020" }}>
        <div className="shell grid gap-8 py-12 md:grid-cols-3">
          <div>
            <Logo dark={dark} />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Find what you&rsquo;ve lost. Return what you&rsquo;ve found.
            </p>
            <p className="mt-3 font-mono text-[11px] text-slate-500">{APP_VERSION} · Android</p>
          </div>
          <nav className="flex flex-wrap content-start gap-x-6 gap-y-3 font-mono text-[11px] font-bold uppercase tracking-[.14em]" aria-label="Footer">
            <a href="#features" className="text-slate-300 hover:text-white">Features</a>
            <a href="#how" className="text-slate-300 hover:text-white">How It Works</a>
            <a href="#download" className="text-slate-300 hover:text-white">Download</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
              GitHub ↗
            </a>
          </nav>
          <div className="font-mono text-xs leading-6 text-slate-400">
            FoundIT — Campus Lost &amp; Found
            <br />
            Built as a BSIT HCI / UI Design project.
          </div>
        </div>
      </footer>
    </>
  );
}
