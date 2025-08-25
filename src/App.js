import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Save,
  Copy,
  Waves,
  Building2,
  BadgeCheck,
  PhoneCall,
  MessageCircle,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function AlwahaaPoolsLinktree() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    ip: "Detecting...",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
  });

  // Public asset paths
  const PUBLIC_BASE = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  // Public assets live in /public. Relative paths work on localhost and GitHub Pages subpaths.
  const WAVES_PUBLIC_PATH = `${process.env.PUBLIC_URL}/waves.mp3`;
  const LOGO_PUBLIC_PATH  = `${process.env.PUBLIC_URL}/logo.png`;
  const fallbackLogoDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>
      <rect width='256' height='256' fill='white'/>
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='#0ea5e9' font-family='Arial, Helvetica, sans-serif'>ATS</text>
    </svg>
  `)}`;
  const [logoSrc, setLogoSrc] = useState(fallbackLogoDataUri);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Load logo (fallback-safe) and set favicons/title
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoSrc(LOGO_PUBLIC_PATH);
    img.onerror = () => setLogoSrc(fallbackLogoDataUri);
    img.src = LOGO_PUBLIC_PATH;
  }, []); // only once

  useEffect(() => {
    const head = document.head;
    const updateLink = (rel) => {
      let l = head.querySelector(`link[rel="${rel}"]`);
      if (!l) {
        l = document.createElement("link");
        l.rel = rel;
        head.appendChild(l);
      }
      l.type = "image/png";
      l.href = logoSrc;
    };
    updateLink("icon");
    updateLink("apple-touch-icon");
    document.title = "Alwahaa Technical Services LLC";
  }, [logoSrc]);

  // Client info (IP)
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setClientInfo((info) => ({ ...info, ip: d.ip })))
      .catch(() =>
        setClientInfo((info) => ({ ...info, ip: "Unavailable" }))
      );
  }, []);

  const profile = {
    name: "HabibRahman",
    role: "Project Manager",
    company: "Alwahaa Technical Services (ATS)",
    mobile: "+97152 565 2771",
    email: "habib@alwahaapools.com",
    officeEmail: "Info@alwahaapools.com",
    officeTel: "+9714 255 2896",
    website: "https://alwahaapools.com",
    address:
      "M-01 - Mezzanine Floor Ismail Anbar Building - Port Saeed - Dubai - UAE",
    mapsEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.1468275082866!2d55.32835455581534!3d25.260705221797856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cdb0fab28ed%3A0xc8bb3524001dee73!2sAL%20WAHAA%20TECHNICAL%20SERVICE%20L.L.C!5e0!3m2!1sen!2sae!4v1755782907117!5m2!1sen!2sae" width="100%" height="320" style="border:0; border-radius: 1rem;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  };

  const whatsappHref = `https://wa.me/${profile.mobile.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi Habib, I’m reaching out about swimming pool services."
  )}`;

  const vcardData = useMemo(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:;${profile.name};;;`,
      `FN:${profile.name}`,
      `ORG:${profile.company}`,
      `TITLE:${profile.role}`,
      `TEL;TYPE=CELL:${profile.mobile}`,
      `TEL;TYPE=WORK,VOICE:${profile.officeTel}`,
      `EMAIL;TYPE=WORK:${profile.email}`,
      `EMAIL;TYPE=WORK:${profile.officeEmail}`,
      `ADR;TYPE=WORK:;;${profile.address};;;;`,
      `URL:${profile.website}`,
      "END:VCARD",
    ].join("\n");
    return `data:text/vcard;charset=utf-8,${encodeURIComponent(lines)}`;
  }, []); // static

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (e) {
      alert("Copy failed");
    }
  };

  // Sound handling: robust unlock for iOS/Chrome
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.85;
    a.muted = true;
    try {
      a.load();
    } catch {}

    const unlock = async () => {
      try {
        a.muted = false;
        await a.play();
        setMuted(false);
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("touchend", unlock);
        window.removeEventListener("keydown", unlock);
        document.removeEventListener("visibilitychange", onVis);
      } catch {}
    };

    const onVis = () => {
      if (document.visibilityState === "visible") unlock();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("touchend", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const toggleSound = async () => {
    const a = audioRef.current;
    if (!a) return;
    const next = !muted;
    setMuted(next);
    a.muted = !next;
    if (next) {
      try {
        await a.play();
      } catch {}
    }
  };

  const Card = ({ children }) => (
    <div className="backdrop-blur-md bg-white/50 dark:bg-white/10 rounded-3xl shadow-2xl p-6 border border-white/30">
      {children}
    </div>
  );

  const LinkBtn = ({ href, icon: Icon, label, target = "_blank" }) => (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-gradient-to-br from-cyan-100/80 to-blue-200/70 hover:from-cyan-200 hover:to-blue-300 shadow-xl backdrop-blur-sm transition active:scale-[.99] border border-white/40"
    >
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-xl bg-white/60 backdrop-blur">
          <Icon className="w-5 h-5 text-sky-700" />
        </span>
        <span className="font-medium">{label}</span>
      </div>
      <Waves className="w-5 h-5 opacity-60 text-sky-700" />
    </a>
  );

  return (
    <div
      className={`min-h-screen w-full text-slate-800 dark:text-slate-100 relative overflow-hidden ${
        reduceMotion ? "" : "motion-safe"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-b from-cyan-300 via-sky-200 to-blue-400 ${
          reduceMotion ? "" : "animate-gradient-x"
        }`}
      />

      <div className="max-w-lg mx-auto px-5 py-14">
        <div className="flex flex-col items-center text-center">
          <a
            href="https://www.alwahaapools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logoSrc}
              alt="Alwahaa Logo"
              className="max-w-[180px] h-auto object-contain bg-white p-3 shadow-2xl border border-white/70 rounded-md cursor-pointer"
            />
          </a>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight drop-shadow flex items-center gap-2">
            {profile.name}
            <BadgeCheck className="w-6 h-6 text-sky-600" />
          </h1>
          <p className="mt-1 text-sky-900/90 font-semibold">{profile.role}</p>
          <p className="mt-1 flex items-center gap-2 text-slate-700/90">
            <Building2 className="w-4 h-4" /> {profile.company}
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <Card>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{profile.mobile}</span>
                </div>
                <button
                  onClick={() => copy(profile.mobile)}
                  className="p-2 rounded-lg bg-white/70 hover:bg-white border border-white/50"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                <button
                  onClick={() => copy(profile.email)}
                  className="p-2 rounded-lg bg-white/70 hover:bg-white border border-white/50"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.officeEmail}</span>
                </div>
                <button
                  onClick={() => copy(profile.officeEmail)}
                  className="p-2 rounded-lg bg-white/70 hover:bg-white border border-white/50"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.address}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-4">
          <LinkBtn href={profile.website} icon={Globe} label="Visit Website" />
          <LinkBtn
            href={`tel:${profile.mobile.replace(/(?!^\+)[^\d]/g, "")}`}
            icon={PhoneCall}
            label="Call Habib"
          />
          <LinkBtn href={whatsappHref} icon={MessageCircle} label="WhatsApp" />
          <LinkBtn
            href={`mailto:${profile.email}`}
            icon={Mail}
            label="Email (Direct)"
          />
          <LinkBtn
            href={`mailto:${profile.officeEmail}`}
            icon={Mail}
            label="Email (Office)"
          />
          <a
            href={vcardData}
            download="HabibRahman-ATS.vcf"
            className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-gradient-to-br from-cyan-100/80 to-blue-200/70 hover:from-cyan-200 hover:to-blue-300 shadow-xl border border-white/40"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-white/60">
                <Save className="w-5 h-5 text-sky-700" />
              </span>
              <span className="font-medium">Save Contact (vCard)</span>
            </div>
            <Waves className="w-5 h-5 opacity-60 text-sky-700" />
          </a>
        </div>

        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: profile.mapsEmbed }}
        />

        <div className="mt-6 p-4 rounded-xl bg-white/60 border border-white/40 shadow text-xs text-slate-700">
          <p>
            <strong>Your IP:</strong> {clientInfo.ip}
          </p>
          <p>
            <strong>User Agent:</strong> {clientInfo.ua}
          </p>
        </div>

        <div className="mt-10 text-center text-xs text-slate-700/80">
          <p>
            Tel: {profile.officeTel} •{" "}
            <a
              href={`mailto:${profile.officeEmail}`}
              className="underline"
            >
              {profile.officeEmail}
            </a>
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Alwahaa Technical Services — Pools •
            Jacuzzi • Maintenance
          </p>
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-white/60"
          title={muted ? "Enable waves" : "Mute waves"}
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-sky-700" />
          ) : (
            <Volume2 className="w-5 h-5 text-sky-700" />
          )}
          <span className="text-sm font-medium">
            {muted ? "Enable Waves" : "Waves On"}
          </span>
        </button>
      </div>

      {/* Gentle prompt to enable sound on first load */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-20 z-50 text-[11px] px-3 py-2 rounded-full bg-white/90 border border-white/60 shadow select-none">
        {muted ? "Tap anywhere or press a key to enable wave sound" : ""}
      </div>

      <audio ref={audioRef} 
      loop 
      preload="auto" playsInline
      onCanPlay={() => { if (!muted) audioRef.current?.play().catch(() => {}); }}
      >
        <source src={WAVES_PUBLIC_PATH} type="audio/mpeg" />
      </audio>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        {!reduceMotion && (
          <>
            <svg
              className="w-[200%] h-40 animate-[wave1_14s_linear_infinite]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114-30.13,172-41.86,82-16.72,168-17.22,250,.39,65,14.63,128,42.06,192,56.24,110,24.18,221,22.9,330-3V120H0V16.81A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="rgba(255,255,255,0.45)"
              />
            </svg>
            <svg
              className="w-[200%] h-36 animate-[wave2_18s_linear_infinite] opacity-70"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,29,158,17.39C281.38,39,357.61,0,439.64,0,514,0,583.3,30.9,657.53,39.64c95.15,11.24,186.57-10.14,279.77-23.29C1047.6,3.71,1141.74,0,1200,0V120H0Z"
                fill="rgba(255,255,255,0.25)"
              />
            </svg>
          </>
        )}
      </div>
    </div>
  );
}
