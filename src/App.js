import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Save,
  Copy,
  Building2,
  BadgeCheck,
  PhoneCall,
  MessageCircle,
  Volume2,
  VolumeX,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

export default function AlwahaaPoolsLinktree() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [clientInfo, setClientInfo] = useState({
    ip: "Detecting...",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
  });

  const WAVES_PUBLIC_PATH = `${process.env.PUBLIC_URL}/waves.mp3`;
  const LOGO_PUBLIC_PATH = `${process.env.PUBLIC_URL}/logo.png`;
  const fallbackLogoDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>
      <rect width='256' height='256' fill='white'/>
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='#00aaff' font-family='Arial, Helvetica, sans-serif'>ATS</text>
    </svg>
  `)}`;
  const [logoSrc, setLogoSrc] = useState(fallbackLogoDataUri);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoSrc(LOGO_PUBLIC_PATH);
    img.onerror = () => setLogoSrc(fallbackLogoDataUri);
    img.src = LOGO_PUBLIC_PATH;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setClientInfo((info) => ({ ...info, ip: d.ip })))
      .catch(() => setClientInfo((info) => ({ ...info, ip: "Unavailable" })));
  }, []);

  const profile = {
    name: "HabibRahman",
    role: "Project Manager",
    company: "Alwahaa Technical Services (ATS)",
    mobile: "+97152 565 2771",
    email: "habib@alwahaatechnical.com",
    officeEmail: "info@alwahaatechnical.com",
    officeTel: "+9714 255 2896",
    website: "https://alwahaatechnical.com",
    address:
      "M-01 - Mezzanine Floor Ismail Anbar Building - Port Saeed - Dubai - UAE",
    mapsEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.1468275082866!2d55.32835455581534!3d25.260705221797856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cdb0fab28ed%3A0xc8bb3524001dee73!2sAL%20WAHAA%20TECHNICAL%20SERVICE%20L.L.C!5e0!3m2!1sen!2sae!4v1755782907117!5m2!1sen!2sae" width="100%" height="320" style="border:0; border-radius: 1rem;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  };

  const whatsappHref = `https://wa.me/${profile.mobile.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi Habib, I'm reaching out about swimming pool services."
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (e) {
      alert("Copy failed");
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.85;
    a.muted = true;
    try { a.load(); } catch {}

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
    const onVis = () => { if (document.visibilityState === "visible") unlock(); };

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
    if (next) { try { await a.play(); } catch {} }
  };

  const ContactRow = ({ Icon, label, value, accent = "text-brand-blue", href, copyable }) => (
    <div className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 transition hover:border-brand-blue/40 hover:shadow-apple">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 ${accent} transition group-hover:scale-110`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mute">{label}</div>
        {href ? (
          <a href={href} className="block truncate text-sm font-semibold text-ink hover:text-brand-blue">{value}</a>
        ) : (
          <div className="truncate text-sm font-semibold text-ink">{value}</div>
        )}
      </div>
      {copyable && (
        <button
          onClick={() => copy(copyable)}
          className="rounded-lg border border-black/5 bg-surface-2 p-2 text-mute transition hover:text-brand-blue"
          aria-label={`Copy ${label}`}
        >
          <Copy className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  const LinkBtn = ({ href, icon: Icon, label, target = "_blank", primary }) => (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={
        primary
          ? "inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#1ebe5a]"
          : "group flex w-full items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 transition hover:border-brand-blue/40 hover:shadow-apple"
      }
    >
      <div className="flex items-center gap-3">
        <span className={primary ? "" : "flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-brand-blue transition group-hover:scale-110"}>
          <Icon className="h-5 w-5" />
        </span>
        <span className={primary ? "" : "text-sm font-semibold text-ink"}>{label}</span>
      </div>
      {!primary && <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mute">Open</span>}
    </a>
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white px-6 py-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,170,255,0.12) 0%, rgba(255,255,255,0) 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(26,79,154,0.10) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2">
          {[0, 1.8, 3.6, 5.4].map((delay, i) => (
            <span
              key={i}
              className="water-ripple left-1/2 top-1/2 h-72 w-72"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Logo */}
        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="fade-up">
          <img
            src={logoSrc}
            alt="Alwahaa Technical Services"
            className="h-16 w-auto md:h-20"
          />
        </a>

        {/* Eyebrow */}
        <span
          className="fade-up mt-10 inline-flex items-center gap-2 rounded-full border border-black/5 bg-surface-2 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand-blue"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-blue" />
          </span>
          Project Manager · ATS
        </span>

        {/* Headline */}
        <h1
          className="headline fade-up mt-6 text-4xl leading-[1.05] text-ink md:text-6xl"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="text-gradient-blue">{profile.name}</span>
          <span className="ml-2 inline-block align-middle">
            <BadgeCheck className="inline h-7 w-7 text-brand-blue md:h-9 md:w-9" />
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="fade-up mt-6 max-w-xl text-base font-medium text-ink-soft md:text-lg"
          style={{ animationDelay: "0.4s" }}
        >
          <Building2 className="mr-2 inline h-4 w-4 text-brand-blue" />
          {profile.company}
        </p>
        <p
          className="fade-up mt-2 text-sm font-medium tracking-[0.18em] text-mute"
          style={{ animationDelay: "0.5s" }}
        >
          For Your Expectations, We Build With Passion.
        </p>

        {/* Contact cards */}
        <div
          className="fade-up mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
          style={{ animationDelay: "0.6s" }}
        >
          <ContactRow Icon={Phone} label="Mobile" value={profile.mobile} href={`tel:${profile.mobile.replace(/[^\d+]/g, "")}`} copyable={profile.mobile} />
          <ContactRow Icon={PhoneCall} label="Office" value={profile.officeTel} href={`tel:${profile.officeTel.replace(/[^\d+]/g, "")}`} copyable={profile.officeTel} />
          <ContactRow Icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} copyable={profile.email} />
          <ContactRow Icon={Mail} label="Office Email" value={profile.officeEmail} href={`mailto:${profile.officeEmail}`} copyable={profile.officeEmail} />
        </div>

        {/* Address */}
        <div
          className="fade-up mt-3 flex w-full max-w-xl items-start gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 text-left"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-brand-blue">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mute">Address</div>
            <div className="text-sm font-medium text-ink">{profile.address}</div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="fade-up mt-8 w-full max-w-md" style={{ animationDelay: "0.8s" }}>
          <LinkBtn href={whatsappHref} icon={MessageCircle} label="Chat on WhatsApp" primary />
        </div>

        {/* Quick links */}
        <div
          className="fade-up mt-4 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
          style={{ animationDelay: "0.9s" }}
        >
          <LinkBtn href={profile.website} icon={Globe} label="Visit Website" />
          <a
            href={vcardData}
            download="HabibRahman-ATS.vcf"
            className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 transition hover:border-brand-blue/40 hover:shadow-apple"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-brand-blue transition group-hover:scale-110">
                <Save className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">Save Contact (vCard)</span>
            </div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mute">Download</span>
          </a>
        </div>

        {/* Map */}
        <div
          className="fade-up mt-8 w-full overflow-hidden rounded-2xl border border-black/5 shadow-apple"
          style={{ animationDelay: "1s" }}
          dangerouslySetInnerHTML={{ __html: profile.mapsEmbed }}
        />

        {/* Socials */}
        <div className="fade-up mt-10 flex items-center gap-3" style={{ animationDelay: "1.1s" }}>
          {[
            { Icon: Instagram, href: "https://www.instagram.com/alwahaa_pools/", label: "Instagram" },
            { Icon: Facebook, href: "https://www.facebook.com/alwahaapools", label: "Facebook" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/alwahaa-technical-services-llc-7183b080/", label: "LinkedIn" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink-soft transition hover:border-brand-blue hover:text-brand-blue"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Client info */}
        <div className="fade-up mt-8 w-full max-w-xl rounded-2xl border border-black/5 bg-surface-2 px-5 py-4 text-left text-xs text-mute" style={{ animationDelay: "1.2s" }}>
          <p><span className="font-semibold text-ink-soft">Your IP:</span> {clientInfo.ip}</p>
          <p className="mt-1 truncate"><span className="font-semibold text-ink-soft">User Agent:</span> {clientInfo.ua}</p>
        </div>

        {/* Footer */}
        <p className="fade-up mt-10 text-xs text-mute" style={{ animationDelay: "1.3s" }}>
          © {new Date().getFullYear()} Alwahaa Technical Services LLC — Dubai, UAE
        </p>
      </div>

      {/* Sound toggle */}
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={toggleSound}
          className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-apple transition hover:border-brand-blue/40"
          title={muted ? "Enable waves" : "Mute waves"}
        >
          {muted ? <VolumeX className="h-4 w-4 text-brand-blue" /> : <Volume2 className="h-4 w-4 text-brand-blue" />}
          <span>{muted ? "Enable Waves" : "Waves On"}</span>
        </button>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        onCanPlay={() => { if (!muted) audioRef.current?.play().catch(() => {}); }}
      >
        <source src={WAVES_PUBLIC_PATH} type="audio/mpeg" />
      </audio>
    </main>
  );
}
