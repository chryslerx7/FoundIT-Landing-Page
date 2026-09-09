import { useState } from "react";
import { APK_DOWNLOAD_URL, APP_VERSION, GITHUB_URL } from "./config";
import homeScreen from "./public/Home.jpg";
import founditIcon from "./public/foundit-icon.png";
import loginScreen from "./public/login.jpg";
import lostScreen from "./public/lost.jpg";
import matchScreen from "./public/match.jpg";
import messageScreen from "./public/message.jpg";
import reportsScreen from "./public/reports.jpg";
import searchScreen from "./public/search.jpg";

const Icon = ({ children, className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-grid h-8 w-8 shrink-0 place-items-center border-2 border-current font-mono font-bold ${className}`}
  >
    {children}
  </span>
);
function Logo() {
  return (
    <a
      href="#home"
      className="flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="FoundIT home"
    >
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden border-[3px] border-slate-950 bg-white shadow-[3px_3px_0_#0f172a]">
        <img
          src={founditIcon}
          alt="FoundIT logo"
          className="h-full w-full object-contain p-1"
        />
      </span>
      <span className="font-black text-xl tracking-[-.08em]">
        Found<span className="text-blue-600">IT</span>
      </span>
    </a>
  );
}

function Button({ children, href, kind = "blue", className = "" }) {
  const styles = {
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    white: "bg-white text-slate-950 hover:bg-amber-200",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    green: "bg-green-600 text-white hover:bg-green-700",
  };
  return (
    <a href={href} className={`btn ${styles[kind]} ${className}`}>
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
function SectionHeader({ label, title, children }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">// {label}</p>
      <h2 className="section-title">{title}</h2>
      {children && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {children}
        </p>
      )}
    </div>
  );
}
function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: "border-blue-700 bg-blue-100 text-blue-800",
    red: "border-red-700 bg-red-100 text-red-800",
    green: "border-green-700 bg-green-100 text-green-800",
    amber: "border-amber-700 bg-amber-100 text-amber-900",
  };
  return (
    <span
      className={`inline-flex border-2 px-2 py-1 font-mono text-[11px] font-bold uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
function PhoneMockup({ screen = "home", image, alt }) {
  const isLogin = screen === "login",
    isSearch = screen === "search",
    isReport = screen === "report",
    isMatch = screen === "match",
    isMessage = screen === "message",
    isProfile = screen === "profile";
  return (
    <div className="phone">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-slate-950" />
      <div className="phone-screen overflow-hidden font-sans text-[10px]">
        {image ? (
          <div className="relative h-full w-full bg-[#eff6ff]">
            <img
              src={image}
              alt={alt || `${screen} screen preview`}
              className="pixelated-screen h-full w-full object-contain object-top"
            />
            <div
              aria-hidden="true"
              className="screen-pixel-overlay pointer-events-none absolute inset-0 opacity-35"
            />
          </div>
        ) : (
          <div className="p-4 pt-9">
            {isLogin ? (
            <>
              <div className="mt-9 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center border-[3px] border-slate-950 bg-blue-600 text-3xl text-white">
                ⌕
              </div>
              <h3 className="mt-4 text-xl font-black">Welcome back.</h3>
              <p className="mt-1 text-slate-500">Campus items, one place.</p>
            </div>
            <div className="mt-8 space-y-3">
              <input
                aria-label="Email address example"
                placeholder="email@campus.edu"
                className="w-full border-2 border-slate-900 bg-white p-3 outline-none"
              />
              <input
                aria-label="Password example"
                placeholder="••••••••"
                className="w-full border-2 border-slate-900 bg-white p-3 outline-none"
              />
              <button className="w-full border-2 border-slate-950 bg-blue-600 p-3 font-bold text-white">
                LOG IN
              </button>
            </div>
          </>
        ) : isSearch ? (
          <>
            <Top title="Search items" />
            <div className="mt-3 border-2 border-slate-900 bg-white p-2 text-slate-400">
              ⌕ &nbsp; keys, wallet, ID...
            </div>
            <div className="mt-3 flex gap-1">
              <Badge tone="red">LOST</Badge>
              <Badge>ALL CAMPUS</Badge>
            </div>
            <Item
              color="bg-red-500"
              name="Black wallet"
              place="Student Center"
            />
            <Item color="bg-amber-400" name="Blue umbrella" place="Library" />
          </>
        ) : isReport ? (
          <>
            <Top title="Report a lost item" />
            <label className="mt-4 block font-bold">
              Item name
              <input
                placeholder="e.g. Blue backpack"
                className="mt-1 w-full border-2 border-slate-900 bg-white p-2"
              />
            </label>
            <div className="mt-3 grid h-20 place-items-center border-2 border-dashed border-slate-800 bg-white font-mono">
              + ADD PHOTO
            </div>
            <label className="mt-3 block font-bold">
              Last seen
              <input
                placeholder="Campus location"
                className="mt-1 w-full border-2 border-slate-900 bg-white p-2"
              />
            </label>
            <button className="mt-4 w-full border-2 border-slate-950 bg-red-600 p-3 font-bold text-white">
              POST LOST REPORT
            </button>
          </>
        ) : isMatch ? (
          <>
            <Top title="Possible match" />
            <Badge tone="amber">MATCH SCORE: HIGH</Badge>
            <div className="mt-4 border-2 border-slate-950 bg-white p-3">
              <p className="font-bold">Your report</p>
              <Item color="bg-red-500" name="Black wallet" place="Library" />
            </div>
            <p className="my-3 text-center font-black">≋ POSSIBLE MATCH ≋</p>
            <div className="border-2 border-slate-950 bg-green-50 p-3">
              <p className="font-bold">Found report</p>
              <Item
                color="bg-green-500"
                name="Leather wallet"
                place="Library"
              />
            </div>
            <button className="mt-4 w-full border-2 border-slate-950 bg-blue-600 p-3 font-bold text-white">
              CONTACT REPORTER
            </button>
          </>
        ) : isMessage ? (
          <>
            <Top title="Messages" />
            <p className="mt-4 text-center font-mono text-[9px] text-slate-500">
              TODAY · 10:42 AM
            </p>
            <div className="mt-4 ml-8 bg-white p-3">
              Hi! I think I found your wallet.
            </div>
            <div className="ml-auto mt-3 mr-0 w-4/5 bg-blue-600 p-3 text-white">
              That sounds like mine — can I see it?
            </div>
            <div className="mt-3 ml-8 bg-white p-3">
              Sure. Meet at the library desk?
            </div>
            <div className="absolute bottom-4 left-4 right-4 border-2 border-slate-900 bg-white p-2 text-slate-400">
              Write a message...{" "}
              <b className="float-right text-blue-600">SEND</b>
            </div>
          </>
        ) : isProfile ? (
          <>
            <Top title="My reports" />
            <div className="mt-4 flex items-center gap-3 border-2 border-slate-950 bg-white p-3">
              <div className="grid h-11 w-11 place-items-center bg-blue-600 text-xl text-white">
                J
              </div>
              <div>
                <b>Jamie Rivera</b>
                <p className="text-slate-500">Computer Science</p>
              </div>
            </div>
            <p className="mt-5 font-mono font-bold">ACTIVE REPORTS (02)</p>
            <Item
              color="bg-red-500"
              name="Black wallet"
              place="Lost · Library"
            />
            <Item
              color="bg-green-500"
              name="USB drive"
              place="Found · Lab 204"
            />
          </>
        ) : (
          <>
            <Top title="Good morning, Jamie." />
            <div className="mt-3 bg-blue-600 p-4 text-white">
              <span className="font-mono text-[9px]">
                CAMPUS NETWORK · ONLINE
              </span>
              <h3 className="mt-2 text-xl font-black leading-none">
                What are you looking for?
              </h3>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="border-2 border-slate-950 bg-red-100 p-3">
                <b>LOST</b>
                <p className="mt-2">Report an item</p>
              </div>
              <div className="border-2 border-slate-950 bg-green-100 p-3">
                <b>FOUND</b>
                <p className="mt-2">Help return it</p>
              </div>
            </div>
            <p className="mt-4 font-mono font-bold">RECENT ACTIVITY</p>
            <Item
              color="bg-amber-400"
              name="Blue umbrella"
              place="Found · Library"
            />
              <Item
                color="bg-red-500"
                name="Student ID card"
                place="Lost · Cafeteria"
              />
            </>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
function Top({ title }) {
  return (
    <div className="flex items-center justify-between">
      <b className="text-sm">{title}</b>
      <span className="grid h-6 w-6 place-items-center border-2 border-slate-950 bg-white">
        ⌕
      </span>
    </div>
  );
}
function Item({ color, name, place }) {
  return (
    <div className="mt-3 flex items-center gap-2 border-b border-slate-300 pb-2">
      <span
        className={`grid h-9 w-9 place-items-center border-2 border-slate-950 ${color}`}
      >
        ●
      </span>
      <div>
        <b>{name}</b>
        <p className="text-slate-500">{place}</p>
      </div>
      <span className="ml-auto">›</span>
    </div>
  );
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "#home"],
    ["Features", "#features"],
    ["How It Works", "#how"],
    ["Screens", "#screens"],
    ["Download", "#download"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-slate-950 bg-slate-50/95 backdrop-blur">
      <nav className="shell flex min-h-[72px] items-center justify-between gap-5">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          {links.map(([n, h]) => (
            <a
              className="font-mono text-xs font-bold uppercase hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              href={h}
              key={n}
            >
              {n}
            </a>
          ))}
        </div>
        <Button href={APK_DOWNLOAD_URL} className="hidden md:inline-flex">
          Download app
        </Button>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center border-[3px] border-slate-950 bg-white text-xl md:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </nav>
      {open && (
        <div className="border-t-[3px] border-slate-950 bg-white p-5 md:hidden">
          <div className="shell grid gap-3">
            {links.map(([n, h]) => (
              <a
                onClick={() => setOpen(false)}
                className="border-2 border-slate-950 p-3 font-mono font-bold"
                href={h}
                key={n}
              >
                {n}
              </a>
            ))}
            <Button href={APK_DOWNLOAD_URL}>Download app</Button>
          </div>
        </div>
      )}
    </header>
  );
}
const features = [
  [
    "01",
    "REPORT LOST ITEMS",
    "Report belongings with photos, descriptions, dates and locations.",
    "⌁",
  ],
  [
    "02",
    "REPORT FOUND ITEMS",
    "Give found belongings a clear route back to their owner.",
    "+",
  ],
  [
    "03",
    "SMART POSSIBLE MATCHES",
    "Surface likely matches between lost and found reports.",
    "⌕",
  ],
  [
    "04",
    "SEARCH & FILTER",
    "Browse by item, category, location and report status.",
    "↯",
  ],
  ["05", "MESSAGING", "Talk directly when a possible match appears.", "✉"],
  ["06", "MY REPORTS", "Manage every report from one clear dashboard.", "▣"],
  [
    "07",
    "NOTIFICATIONS",
    "Get timely updates about report activity and matches.",
    "!",
  ],
  ["08", "RESOLVE ITEMS", "Close the loop when an item makes it home.", "✓"],
];
const faqs = [
  [
    "What is FoundIT?",
    "FoundIT is a campus-based Android app for reporting, searching and returning lost belongings.",
  ],
  [
    "Who can use FoundIT?",
    "It is designed for college and university students and their campus communities.",
  ],
  [
    "Is FoundIT free?",
    "Yes. FoundIT is a student project made to make campus lost and found easier.",
  ],
  [
    "What Android devices are supported?",
    "FoundIT is currently available for Android devices. Check the release notes for the latest compatibility details.",
  ],
  [
    "How do possible matches work?",
    "FoundIT helps identify reports that may describe the same item, then lets students contact each other.",
  ],
  [
    "Where can I download the app?",
    "Use any Download APK button on this page once the release URL has been configured.",
  ],
];
function FAQ() {
  const [active, setActive] = useState(null);
  return (
    <div className="mt-10 grid gap-3">
      {faqs.map(([q, a], i) => (
        <div className="brutal-sm bg-white" key={q}>
          <button
            onClick={() => setActive(active === i ? null : i)}
            className="flex w-full items-center justify-between gap-5 p-4 text-left font-bold focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-expanded={active === i}
          >
            <span>{q}</span>
            <span className="text-2xl">{active === i ? "−" : "+"}</span>
          </button>
          {active === i && (
            <p className="border-t-2 border-slate-950 p-4 pt-3 leading-7 text-slate-600">
              {a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
function App() {
  return (
    <>
      <Navbar />
      <main>
        <section
          id="home"
          className="grid-paper overflow-hidden border-b-[3px] border-slate-950"
        >
          <div className="shell grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>STATUS: ONLINE</Badge>
                <Badge tone="amber">CAMPUS NETWORK</Badge>
                <Badge tone="green">ANDROID APP</Badge>
              </div>
              <h1 className="mt-7 font-black uppercase leading-[.83] tracking-[-.08em] text-slate-950 text-[clamp(3.1rem,9vw,7.6rem)]">
                Lost
                <br />
                something?
                <br />
                <span className="text-blue-600">Found</span> something?
              </h1>
              <p className="mt-7 max-w-xl text-lg font-semibold leading-8 sm:text-xl">
                FoundIT makes campus Lost &amp; Found simple.
              </p>
              <p className="mt-2 max-w-lg font-mono text-sm leading-6 text-slate-600">
                Find what you've lost. Return what you've found.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href={APK_DOWNLOAD_URL}>Download FoundIT</Button>
                <Button href="#features" kind="white">
                  Explore features
                </Button>
              </div>
              <p className="mt-8 font-mono text-xs font-bold">
                &gt; SYSTEM READY_ &nbsp;{" "}
                <span className="text-red-600">LOST: 12</span> /{" "}
                <span className="text-green-700">FOUND: 08</span>
              </p>
            </div>
            <div className="relative py-7">
              <div className="absolute inset-x-0 top-10 h-[90%] -rotate-3 border-[3px] border-slate-950 bg-amber-300" />
              <div className="relative">
                <PhoneMockup image={homeScreen} alt="FoundIT home screen preview" />
                <div className="absolute -bottom-2 -left-2 brutal bg-white p-3 font-mono text-xs font-bold">
                  HOME.SCREEN
                  <br />
                  <span className="text-blue-600">LIVE PREVIEW</span>
                </div>
                <div className="absolute -right-2 top-12 brutal-sm bg-green-400 p-2 font-mono text-[10px] font-bold">
                  ● FOUND
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="shell py-20 sm:py-28">
          <SectionHeader label="THE PROBLEM" title="Lost on campus?">
            Your missing item should not depend on a scattered post, a lucky
            sighting or a group chat you never saw.
          </SectionHeader>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                "01",
                "WHERE DID I SEE IT?",
                "A busy campus makes the last known location hard to trace.",
              ],
              [
                "02",
                "WHO FOUND IT?",
                "Good intentions get lost when reports have no central place.",
              ],
              [
                "03",
                "HOW DO I GET IT BACK?",
                "The right owner and finder need a simple way to connect.",
              ],
            ].map(([n, t, p]) => (
              <article className="brutal bg-white p-6" key={n}>
                <p className="font-pixel text-lg text-red-600">{n}</p>
                <h3 className="mt-8 text-2xl font-black uppercase leading-none">
                  {t}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="border-y-[3px] border-slate-950 bg-blue-600 py-20 text-white">
          <div className="shell">
            <SectionHeader label="THE SOLUTION" title="Meet FoundIT.">
              <span className="text-blue-100">
                One campus. One place for lost and found items.
              </span>
            </SectionHeader>
            <div className="mt-12 grid gap-3 border-[3px] border-slate-950 bg-white p-4 text-slate-950 md:grid-cols-4 md:p-5">
              {["LOST", "MATCH", "CONTACT", "RETURNED"].map((x, i) => (
                <div
                  className="flex items-center justify-between border-2 border-slate-950 p-5 md:block"
                  key={x}
                >
                  <span className="font-pixel text-base sm:text-lg">{x}</span>
                  {i < 3 && (
                    <span className="text-3xl md:mt-8 md:block">→</span>
                  )}
                  <p className="mt-2 font-mono text-xs text-slate-500">
                    0{i + 1}. CAMPUS FLOW
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="features" className="shell py-20 sm:py-28">
          <SectionHeader label="CORE TOOLS" title="Built for campus.">
            Everything students need to turn a missing-item moment into a
            return.
          </SectionHeader>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([n, t, p, i], idx) => (
              <article
                className={`brutal relative min-h-[245px] p-5 ${idx === 2 ? "bg-amber-300" : idx === 5 ? "bg-blue-600 text-white" : "bg-white"}`}
                key={n}
              >
                <span className="absolute right-4 top-3 text-3xl font-black opacity-80">
                  {i}
                </span>
                <p className="font-mono text-xs font-bold">FEATURE_{n}</p>
                <h3 className="mt-10 text-xl font-black uppercase leading-none">
                  {t}
                </h3>
                <p
                  className={`mt-4 text-sm leading-6 ${idx === 5 ? "text-blue-100" : "text-slate-600"}`}
                >
                  {p}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="how"
          className="border-y-[3px] border-slate-950 bg-amber-300 py-20"
        >
          <div className="shell">
            <SectionHeader label="SIMPLE BY DESIGN" title="How FoundIT works" />
            <div className="mt-12 grid gap-0 md:grid-cols-4">
              {[
                ["01", "REPORT", "Lost something? Create a Lost Report."],
                ["02", "SEARCH", "Browse Lost and Found reports."],
                ["03", "MATCH", "FoundIT spots possible connections."],
                ["04", "RETURN", "Contact the user and return the item."],
              ].map(([n, t, p], i) => (
                <div
                  className="relative border-[3px] border-slate-950 bg-white p-6"
                  key={n}
                >
                  <p className="font-pixel text-2xl text-blue-600">{n}</p>
                  <h3 className="mt-9 text-2xl font-black">{t}</h3>
                  <p className="mt-3 leading-6 text-slate-600">{p}</p>
                  {i < 3 && (
                    <span className="absolute -bottom-5 left-1/2 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center border-2 border-slate-950 bg-blue-600 text-xl text-white md:-right-5 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="screens" className="shell py-20 sm:py-28">
          <SectionHeader label="ANDROID INTERFACE" title="Inside the app">
            A focused interface for the moments when you need it most.
          </SectionHeader>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <PhoneMockup
                screen="login"
                image={loginScreen}
                alt="FoundIT login screen preview"
              />
              <p className="mt-5 text-center font-mono text-xs font-bold">
                01 / LOGIN
              </p>
            </div>
            <div>
              <PhoneMockup
                screen="search"
                image={searchScreen}
                alt="FoundIT search screen preview"
              />
              <p className="mt-5 text-center font-mono text-xs font-bold">
                02 / SEARCH
              </p>
            </div>
            <div>
              <PhoneMockup
                screen="report"
                image={lostScreen}
                alt="FoundIT lost report screen preview"
              />
              <p className="mt-5 text-center font-mono text-xs font-bold">
                03 / REPORT LOST
              </p>
            </div>
            <div>
              <PhoneMockup
                screen="match"
                image={matchScreen}
                alt="FoundIT possible match screen preview"
              />
              <p className="mt-5 text-center font-mono text-xs font-bold">
                04 / POSSIBLE MATCH
              </p>
            </div>
            <div>
              <PhoneMockup
                screen="message"
                image={messageScreen}
                alt="FoundIT messaging screen preview"
              />
              <p className="mt-5 text-center font-mono text-xs font-bold">
                05 / MESSAGING
              </p>
            </div>
            <div>
              <PhoneMockup
                screen="profile"
                image={reportsScreen}
                alt="FoundIT my reports screen preview"
              />
              <p className="mt-5 text-center font-mono text-xs font-bold">
                06 / MY REPORTS
              </p>
            </div>
          </div>
          <p className="mt-10 font-mono text-xs text-slate-500">
            MORE VIEWS: HOME · REPORT FOUND · ITEM DETAILS · NOTIFICATIONS ·
            PROFILE
          </p>
        </section>
        <section className="border-y-[3px] border-slate-950">
          <div className="grid md:grid-cols-2">
            <article className="bg-red-600 p-8 text-white sm:p-14">
              <Badge tone="red">STATUS: LOST</Badge>
              <h2 className="mt-6 text-6xl font-black uppercase tracking-[-.08em]">
                Lost
              </h2>
              <p className="mt-4 text-xl font-bold">“I lost something.”</p>
              <p className="mt-3 max-w-md leading-7 text-red-100">
                Create a report with what, when and where. Let campus help look.
              </p>
            </article>
            <article className="bg-green-600 p-8 text-white sm:p-14">
              <Badge tone="green">STATUS: FOUND</Badge>
              <h2 className="mt-6 text-6xl font-black uppercase tracking-[-.08em]">
                Found
              </h2>
              <p className="mt-4 text-xl font-bold">“I found something.”</p>
              <p className="mt-3 max-w-md leading-7 text-green-100">
                Post the item and give its owner a direct path to it.
              </p>
            </article>
          </div>
        </section>
        <section className="shell py-20 sm:py-28">
          <SectionHeader label="CAMPUS COMMUNITY" title="Built for students.">
            FoundIT is designed around the way students actually move around
            campus — classrooms, libraries, cafeterias, laboratories, halls and
            common areas.
          </SectionHeader>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "LIBRARY",
              "CAFETERIA",
              "CLASSROOM",
              "LABORATORY",
              "STUDENT CENTER",
            ].map((x, i) => (
              <span
                className={`brutal-sm px-5 py-4 font-pixel text-[10px] ${i % 2 ? "bg-amber-300" : "bg-white"}`}
                key={x}
              >
                ⌖ {x}
              </span>
            ))}
          </div>
        </section>
        <section className="bg-slate-950 py-20 text-white">
          <div className="shell">
            <SectionHeader className="text-slate-300"
              label="HCI / UI DESIGN"
              Title1="Designed with people in mind."
            >
              <span className="text-slate-300">
                Quietly practical choices that make finding and returning feel
                straightforward.
              </span>
            </SectionHeader>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "CLEAR NAVIGATION",
                "CONSISTENT UI",
                "RECOGNITION OVER RECALL",
                "ACCESSIBLE TOUCH TARGETS",
                "CLEAR SYSTEM STATUS",
                "ERROR PREVENTION",
                "FEEDBACK",
                "ACCESSIBLE CONTRAST",
                "LOW COGNITIVE LOAD",
                "MOBILE-FIRST",
              ].map((x, i) => (
                <div
                  className="border-2 border-white bg-slate-900 p-4 font-mono text-xs font-bold"
                  key={x}
                >
                  <span className="mr-2 text-blue-400">0{i + 1}</span>
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="download"
          className="grid-paper border-y-[3px] border-slate-950 py-20 sm:py-28"
        >
          <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
            <div>
              <SectionHeader label="ANDROID DOWNLOAD" title="Ready to find it?">
                Download FoundIT for Android.
              </SectionHeader>
              <div className="mt-8">
                <Button href={APK_DOWNLOAD_URL} className="text-base">
                  Download APK
                </Button>
                <a
                  className="ml-4 inline-block border-b-2 border-slate-950 pb-1 font-mono text-sm font-bold hover:text-blue-600"
                  href={GITHUB_URL}
                >
                  VIEW ON GITHUB ↗
                </a>
              </div>
            </div>
            <aside className="brutal bg-white p-6">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="ml-auto">
                  <Badge>ANDROID</Badge>
                </span>
              </div>
              <p className="mt-7 font-mono text-xs font-bold text-blue-700">
                RELEASE INFORMATION
              </p>
              <dl className="mt-3 divide-y-2 divide-slate-950 border-y-2 border-slate-950 font-mono text-sm">
                <div className="flex justify-between py-3">
                  <dt>VERSION</dt>
                  <dd>{APP_VERSION}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt>PLATFORM</dt>
                  <dd>Android</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt>FILE</dt>
                  <dd>FoundIT-{APP_VERSION}.apk</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
        <section className="shell py-20 sm:py-28">
          <SectionHeader label="INSTALLATION" title="How to install" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Download the APK.",
              "Open the downloaded APK.",
              "Allow installation from your browser or file manager if Android asks.",
              "Install FoundIT and open the app.",
            ].map((x, i) => (
              <article className="brutal-sm bg-white p-5" key={x}>
                <p className="font-pixel text-lg text-blue-600">0{i + 1}</p>
                <p className="mt-7 font-semibold leading-6">{x}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs text-slate-500">
            * FoundIT is currently available for Android.
          </p>
        </section>
        <section className="shell pb-20 sm:pb-28">
          <SectionHeader label="HELP DESK" title="Questions, answered." />
          <FAQ />
        </section>
        <section className="border-y-[3px] border-slate-950 bg-blue-600 py-20 text-white">
          <div className="shell grid items-end gap-8 md:grid-cols-2">
            <h2 className="font-black uppercase leading-[.82] tracking-[-.08em] text-6xl sm:text-8xl">
              Lost it?
              <br />
              Find it.
              <br />
              <span className="text-amber-300">Found it?</span>
              <br />
              Return it.
            </h2>
            <div>
              <p className="font-mono leading-7 text-blue-100">
                One campus system for the little things that matter.
              </p>
              <Button href={APK_DOWNLOAD_URL} kind="white" className="mt-6">
                Download FoundIT
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-950 py-10 text-white">
        <div className="shell grid gap-8 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Find what you've lost. Return what you've found.
            </p>
          </div>
          <div className="flex flex-wrap content-start gap-x-5 gap-y-3 font-mono text-xs font-bold">
            <a href="#home">HOME</a>
            <a href="#features">FEATURES</a>
            <a href="#how">HOW IT WORKS</a>
            <a href="#download">DOWNLOAD</a>
            <a href={GITHUB_URL}>GITHUB</a>
          </div>
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
export default App;

