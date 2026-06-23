import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GSAP + SplitText + ScrambleText loaded via CDN
   EmailJS loaded via CDN for real Gmail delivery
───────────────────────────────────────────── */

/* ══ EMAILJS CONFIG — fill these 3 values ══
   1. Go to https://emailjs.com → free account
   2. Add Service → Gmail → connect vijaykarri220910125@gmail.com
   3. Create Template with variables: {{from_name}} {{from_email}} {{message}}
   4. Paste your IDs below
════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "AbCdEfGhIjKlMnOp"

const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/vijay-karri-0961382a6",
  github: "https://github.com/VijayGit-code",
  email: "vijaykarri220910125@gmail.com",
  leetcode: "https://leetcode.com/u/VIJAY_2204/",
};

const ROLES = ["Full Stack Developer", "MERN Stack Engineer", "Data Analyst", "AI Enthusiast", "Problem Solver"];

/* ── Premium SVG Icon System (Lucide-style) ── */
const Icon = ({ name, size = 18, color = "currentColor", style = {} }) => {
  const icons = {
    monitor:    <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    server:     <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    code2:      <><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></>,
    database:   <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></>,
    brain:      <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></>,
    wrench:     <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    zap:        <><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></>,
    trophy:     <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
    briefcase:  <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M2 12h20"/></>,
    rocket:     <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>,
    graduationcap: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
    mappin:     <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    calendar:   <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    target:     <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    lightbulb:  <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>,
    linkedin:   <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    github:     <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></>,
    mail:       <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    code:       <><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></>,
    activity:   <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    checkmark:  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    sendhorizonal: <><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></>,
    alertcircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    externallink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    star:       <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    cpu:        <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
    barChart:   <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    award:      <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    shield:     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display:"inline-block", flexShrink:0, ...style }}>
      {icons[name] || icons.code}
    </svg>
  );
};

const SKILLS = {
  Frontend:   { items: ["React.js","HTML5","CSS3","JavaScript","Tailwind CSS","Bootstrap"], iconName: "monitor",  color: "#00d4ff" },
  Backend:    { items: ["Node.js","Express.js","RESTful APIs","JWT Auth"],                  iconName: "server",   color: "#a855f7" },
  Languages:  { items: ["Java","Python","C++"],                                              iconName: "code2",    color: "#10b981" },
  Database:   { items: ["MongoDB","MySQL","Mongoose"],                                       iconName: "database", color: "#f59e0b" },
  "Data & AI":{ items: ["Pandas","NumPy","Scikit-Learn","Matplotlib","Seaborn","Power BI"], iconName: "brain",    color: "#ef4444" },
  Tools:      { items: ["Git","Postman","VS Code","Linux","Jupyter Notebook"],               iconName: "wrench",   color: "#06b6d4" },
};

const EXPERIENCE = [
  {
    role: "MERN Stack Developer Intern",
    company: "SmartBridge & APSCHE",
    period: "Apr 2025 – Jul 2025",
    color: "#00d4ff",
    badge: "Full Stack",
    highlights: ["Reduced backend latency by 35% via optimised Express routes","JWT & bcrypt authentication — 90% security uplift","Mongoose schema validation at 95% accuracy"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Cognizant Technology",
    period: "Feb 2025 – May 2025",
    color: "#a855f7",
    badge: "Full Stack",
    highlights: ["30% productivity boost with modular MERN components","RESTful API integration reducing data errors by 40%","Advanced React components for UI consistency"],
  },
  {
    role: "AI / ML Intern",
    company: "IBM SkillsBuild & APSSDC",
    period: "Feb 2024 – Aug 2024",
    color: "#10b981",
    badge: "AI / ML",
    highlights: ["70% increase in practical skill application","Boosted supervised model accuracy by 25%","Automated Python preprocessing (60% efficiency gain)"],
  },
  {
    role: "Data Analytics Intern",
    company: "APSSDC",
    period: "Apr 2024 – Aug 2025",
    color: "#f59e0b",
    badge: "Data",
    highlights: ["Accelerated dataset processing speeds by 40%","Power BI dashboards expanding data visibility by 30%","100% on-time project delivery coordination"],
  },
];

const PROJECTS = [
  {
    title: "Food Ordering Web App",
    tech: ["React.js","Node.js","Express.js","MongoDB","JWT"],
    desc: "Full-featured MERN food platform with user module, admin dashboard, real-time cart, JWT auth, and live order tracking.",
    iconName: "rocket", color: "#00d4ff", type: "fullstack",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80",
    stat: "40% faster order flow", github: `https://food-app-frontend-biy2.onrender.com/`,
  },
  {
    title: "Complaint Analysis System",
    tech: ["React.js","Node.js","MongoDB","JWT"],
    desc: "Real-time complaint management with admin dashboards, secure JWT auth, RESTful APIs, and Mongoose data modelling.",
    iconName: "activity", color: "#a855f7", type: "fullstack",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
    stat: "Resolution speed ↑ 40%", github: SOCIAL.github,
  },
  {
    title: "Language Translator App",
    tech: ["React.js","Node.js","Google Translate API","Web Speech API"],
    desc: "Multilingual voice translation with speech recognition, bcrypt security, responsive UI, and 80% engagement uplift.",
    iconName: "cpu", color: "#10b981", type: "fullstack",
    img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=700&q=80",
    stat: "100+ languages supported", github: SOCIAL.github,
  },
  {
    title: "Credit Card Fraud Detection",
    tech: ["Python","Scikit-Learn","Logistic Regression","Feature Eng."],
    desc: "ML model achieving 87% fraud detection accuracy. Reduced false positives 16% via advanced feature engineering & hyperparameter tuning.",
    iconName: "shield", color: "#f59e0b", type: "data",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80",
    stat: "87% accuracy achieved", github: SOCIAL.github,
  },
  {
    title: "T20 Cricket Insights Hub",
    tech: ["Python","Power BI","JSON","Data Processing"],
    desc: "5 JSON datasets preprocessed, Top 11 player prediction with 22% accuracy gain, interactive Power BI dashboard.",
    iconName: "barChart", color: "#ef4444", type: "data",
    img: "cricket.jpg",
    stat: "Data readiness ↑ 95%", github: SOCIAL.github,
  },
];

const ACHIEVEMENTS = [
  { label: "LeetCode Problems", value: 200, suffix: "+",    iconName: "zap",          desc: "Algorithms & DS",    prefix: "" },
  { label: "LeetCode Ranking",  value: 25,  suffix: "%",    iconName: "trophy",       desc: "Global percentile",  prefix: "Top " },
  { label: "Internships",       value: 4,   suffix: "",     iconName: "briefcase",    desc: "Industry experience", prefix: "" },
  { label: "Projects Shipped",  value: 5,   suffix: "+",    iconName: "rocket",       desc: "Production-grade",   prefix: "" },
  { label: "ML Accuracy",       value: 87,  suffix: "%",    iconName: "brain",        desc: "Fraud detection",    prefix: "" },
  { label: "CGPA",              value: 8.59,suffix: "",     iconName: "graduationcap",desc: "B.Tech CSE",          prefix: "" },
];

const CERTS = [
  "IBM Python Essentials","IBM Data Science","Cisco Data Analytics",
  "Power BI – Simplilearn","Generative AI – GUVI","MERN Stack – Infosys",
  "DSA in Java – Geekster","Java Basics – Ninja Code",
];

const TIMELINE = [
  { year: "2022", event: "Started B.Tech in CSE at Aditya College of Engineering", iconName: "graduationcap", color: "#00d4ff" },
  { year: "2024", event: "AI/ML Internship — IBM SkillsBuild & APSSDC",             iconName: "brain",         color: "#a855f7" },
  { year: "2024", event: "Data Analytics Internship — APSSDC",                       iconName: "barChart",      color: "#10b981" },
  { year: "2025", event: "MERN Stack Intern — SmartBridge | Full Stack — Cognizant", iconName: "code2",         color: "#f59e0b" },
  { year: "2025", event: "Shipped 5+ production-grade projects",                      iconName: "rocket",        color: "#ef4444" },
  { year: "2026", event: "Target: Software Engineer / Data Analyst role",             iconName: "target",        color: "#00d4ff" },
];

/* ───── useGSAP helper ───── */
function useGSAP(cb, deps = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const run = () => cb(window.gsap, window.ScrollTrigger, window.SplitText, window.ScrambleTextPlugin);
    if (window.gsap && window.ScrollTrigger) { run(); return; }
    const id = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) { clearInterval(id); run(); }
    }, 80);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, deps);
}

/* ───── Aurora Background (replaces old flat dark) ───── */
function AuroraBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Base gradient — deep navy-to-black */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, #020510 0%, #050d1a 35%, #08011a 65%, #020510 100%)",
      }} />
      {/* Noise texture overlay for depth */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.028,
        mixBlendMode: "overlay",
      }} />
      {/* Aurora blob 1 — cyan */}
      <div style={{
        position: "absolute", top: "-15%", left: "-10%",
        width: "70vw", height: "70vw", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(0,200,255,0.13) 0%, rgba(0,120,255,0.07) 40%, transparent 70%)",
        animation: "auroraFloat1 18s ease-in-out infinite",
        filter: "blur(40px)",
      }} />
      {/* Aurora blob 2 — violet */}
      <div style={{
        position: "absolute", top: "20%", right: "-15%",
        width: "60vw", height: "60vw", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(168,85,247,0.06) 45%, transparent 70%)",
        animation: "auroraFloat2 22s ease-in-out infinite",
        filter: "blur(50px)",
      }} />
      {/* Aurora blob 3 — teal accent */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "25%",
        width: "55vw", height: "50vw", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(6,182,212,0.09) 0%, rgba(0,212,255,0.04) 50%, transparent 75%)",
        animation: "auroraFloat3 26s ease-in-out infinite",
        filter: "blur(45px)",
      }} />
      {/* Aurora blob 4 — deep pink accent */}
      <div style={{
        position: "absolute", top: "55%", left: "10%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(236,72,153,0.05) 0%, transparent 65%)",
        animation: "auroraFloat4 20s ease-in-out infinite",
        filter: "blur(60px)",
      }} />
      {/* Horizontal scanline grid — very subtle */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,212,255,0.012) 60px, rgba(0,212,255,0.012) 61px)",
        pointerEvents: "none",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(2,5,16,0.7) 100%)",
      }} />
    </div>
  );
}

/* ───── Particle Canvas (enhanced — fewer, more elegant) ───── */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.2 + .3,
      hue: ["#00d4ff","#a855f7","#06b6d4","#818cf8"][Math.floor(Math.random()*4)],
      a: Math.random() * .45 + .1,
    }));
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width)  p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.globalAlpha = p.a;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue; ctx.fill();
      });
      ctx.globalAlpha = .05;
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist2 = dx*dx + dy*dy;
          if (dist2 < 14000) {
            ctx.globalAlpha = .05 * (1 - dist2 / 14000);
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = "#00d4ff"; ctx.lineWidth = .4; ctx.stroke();
          }
        }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

/* ───── Typing effect ───── */
function TypedText({ texts }) {
  const [idx, setIdx]   = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const cur = texts[idx]; let t;
    if (!del && disp.length < cur.length)       t = setTimeout(() => setDisp(cur.slice(0, disp.length + 1)), 55);
    else if (!del && disp.length === cur.length) t = setTimeout(() => setDel(true), 2000);
    else if (del && disp.length > 0)             t = setTimeout(() => setDisp(disp.slice(0, -1)), 28);
    else { setDel(false); setIdx((idx + 1) % texts.length); }
    return () => clearTimeout(t);
  }, [disp, del, idx, texts]);
  return (
    <span style={{ color: "#00d4ff", fontFamily: "'Orbitron',monospace" }}>
      {disp}<span style={{ animation: "blink 1s step-end infinite", color: "#a855f7" }}>█</span>
    </span>
  );
}

/* ───── Animated Counter ───── */
function Counter({ item }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const end = parseFloat(item.value), step = end / 70;
      let cur = 0;
      const t = setInterval(() => {
        cur += step;
        if (cur >= end) { setVal(end); clearInterval(t); }
        else setVal(parseFloat(cur.toFixed(2)));
      }, 18);
    }, { threshold: .5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [item.value]);
  const display = item.prefix === "Top "
    ? `Top ${Math.round(val)}%`
    : `${item.prefix || ""}${Number.isInteger(item.value) ? Math.round(val) : val}${item.suffix}`;
  return (
    <div ref={ref} style={{ background: "linear-gradient(135deg,rgba(0,212,255,.07),rgba(168,85,247,.07))", border: "1px solid rgba(0,212,255,.18)", borderRadius: 18, padding: "30px 22px", textAlign: "center", backdropFilter: "blur(14px)", transition: "transform .3s,box-shadow .3s", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(0,212,255,.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom: 14 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,rgba(0,212,255,.15),rgba(168,85,247,.15))", border:"1px solid rgba(0,212,255,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name={item.iconName} size={20} color="#00d4ff" />
        </div>
      </div>
      <div style={{ fontSize: 38, fontWeight: 900, fontFamily: "'Orbitron',monospace", background: "linear-gradient(90deg,#00d4ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
        {display}
      </div>
      <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 6, fontFamily: "'Space Mono',monospace" }}>{item.label}</div>
      <div style={{ color: "#475569", fontSize: 11, marginTop: 3 }}>{item.desc}</div>
    </div>
  );
}

/* ───── Section Header (GSAP SplitText) ───── */
function SectionHeader({ title, sub }) {
  const titleRef = useRef(null);
  const subRef   = useRef(null);
  const lineRef  = useRef(null);
  useGSAP((gsap, ST, SplitText) => {
    if (!titleRef.current) return;
    if (SplitText) {
      const split = new SplitText(titleRef.current, { type: "chars,words" });
      gsap.from(split.chars, {
        scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none reverse" },
        opacity: 0, y: 60, rotateX: -90, stagger: .045, duration: .85, ease: "back.out(1.7)",
        transformOrigin: "center top",
      });
    } else {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: "top 88%" },
        opacity: 0, y: 40, duration: .8, ease: "power3.out",
      });
    }
    gsap.from(subRef.current, {
      scrollTrigger: { trigger: subRef.current, start: "top 90%" },
      opacity: 0, y: -22, duration: .6, ease: "power3.out",
    });
    gsap.from(lineRef.current, {
      scrollTrigger: { trigger: lineRef.current, start: "top 92%" },
      scaleX: 0, transformOrigin: "left center", duration: .9, ease: "power4.out", delay: .25,
    });
  }, [title]);
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div ref={subRef} style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, letterSpacing: 5, color: "#00d4ff", textTransform: "uppercase", marginBottom: 14 }}>{sub}</div>
      <h2 ref={titleRef} style={{ fontSize: "clamp(30px,5.5vw,52px)", fontWeight: 900, fontFamily: "'Orbitron',monospace", background: "linear-gradient(135deg,#fff 40%,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, lineHeight: 1.1, perspective: 600 }}>
        {title}
      </h2>
      <div ref={lineRef} style={{ width: 70, height: 3, background: "linear-gradient(90deg,#00d4ff,#a855f7)", margin: "18px auto 0", borderRadius: 2 }} />
    </div>
  );
}

/* ───── Skill Badge ───── */
function Badge({ s, c }) {
  return (
    <span style={{ display: "inline-block", padding: "6px 13px", borderRadius: 20, background: `${c}12`, border: `1px solid ${c}30`, color: "#cbd5e1", fontSize: 12, margin: "3px", fontFamily: "'Space Mono',monospace", transition: "all .25s", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.background = `${c}25`; e.currentTarget.style.color = c; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 14px ${c}30`; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${c}12`; e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >{s}</span>
  );
}

/* ───── Project Card ───── */
function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="proj-card"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${hov ? p.color + "55" : "rgba(255,255,255,.06)"}`, background: "rgba(255,255,255,.02)", backdropFilter: "blur(14px)", transition: "all .4s cubic-bezier(.25,.8,.25,1)", transform: hov ? "translateY(-10px) scale(1.01)" : "", boxShadow: hov ? `0 32px 64px ${p.color}20` : "", position: "relative" }}>
      {/* Accent top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, zIndex: 2 }} />
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
        <img src={p.img} alt={p.title} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .65s ease", transform: hov ? "scale(1.1)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 25%, rgba(4,6,18,.95) 100%)` }} />
        <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, padding: "4px 10px", borderRadius: 12, background: p.type === "data" ? "rgba(168,85,247,.75)" : "rgba(0,212,255,.75)", color: "#fff", fontFamily: "'Space Mono',monospace", backdropFilter: "blur(6px)", letterSpacing: 1 }}>
          {p.type === "data" ? "DATA & AI" : "FULL STACK"}
        </span>
        <span style={{ position: "absolute", bottom: 12, left: 12, fontSize: 11, padding: "4px 12px", borderRadius: 12, background: "rgba(0,0,0,.65)", color: p.color, fontFamily: "'Space Mono',monospace", border: `1px solid ${p.color}40`, backdropFilter: "blur(6px)" }}>
          ↑ {p.stat}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`${p.color}15`, border:`1px solid ${p.color}25`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Icon name={p.iconName} size={18} color={p.color} />
          </div>
          <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, color: "#f1f5f9", margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
        </div>
        <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 12, background: `${p.color}12`, color: p.color, fontFamily: "'Space Mono',monospace", border: `1px solid ${p.color}20` }}>{t}</span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, color: p.color, fontSize: 12, fontFamily: "'Space Mono',monospace", textDecoration: "none", padding: "8px 16px", borderRadius: 8, border: `1px solid ${p.color}30`, background: `${p.color}08`, transition: "all .25s" }}
          onMouseEnter={e => e.currentTarget.style.background = `${p.color}20`}
          onMouseLeave={e => e.currentTarget.style.background = `${p.color}08`}
        ><Icon name="github" size={13} color={p.color} /> View on GitHub <Icon name="externallink" size={11} color={p.color} /></a>
      </div>
    </div>
  );
}

/* ───── Nav ───── */
function Nav({ active }) {
  const links = ["Home","About","Skills","Experience","Projects","Achievements","Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(scrollY > 50);
    addEventListener("scroll", h);
    return () => removeEventListener("scroll", h);
  }, []);
  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(2,5,16,.92)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,212,255,.1)" : "none", transition: "all .4s", padding: "15px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: 20, background: "linear-gradient(90deg,#00d4ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 2 }}>KV</div>
      <div style={{ display: "flex", gap: 30 }} className="nd">
        {links.map(l => (
          <button key={l} onClick={() => go(l)}
            style={{ background: "none", border: "none", cursor: "pointer", color: active === l ? "#00d4ff" : "#64748b", fontFamily: "'Space Mono',monospace", fontSize: 12, padding: 0, transition: "color .25s,transform .25s", letterSpacing: 1 }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = active === l ? "#00d4ff" : "#64748b"; e.currentTarget.style.transform = ""; }}
          >{l}</button>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} className="nm" style={{ background: "none", border: "none", cursor: "pointer", color: "#00d4ff", fontSize: 24, display: "none" }}>
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div style={{ position: "fixed", top: 58, inset: "58px 0 0 0", background: "rgba(2,5,16,.97)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, zIndex: 999 }}>
          {links.map(l => (
            <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontFamily: "'Orbitron',monospace", fontSize: 18, letterSpacing: 3, padding: "8px 0" }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   MAIN PORTFOLIO
═══════════════════════════════════════════ */
export default function Portfolio() {
  const [active, setActive]   = useState("Home");
  const [filter, setFilter]   = useState("all");
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setSendError("");
    try {
      if (!window.emailjs) throw new Error("EmailJS not loaded");
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_email:   "vijaykarri220910125@gmail.com",
          reply_to:   form.email,
        }
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSendError("Failed to send. Please email directly: vijaykarri220910125@gmail.com");
    } finally {
      setSending(false);
    }
  };
  const heroNameRef  = useRef(null);
  const heroSubRef   = useRef(null);
  const heroBtnsRef  = useRef(null);
  const heroTagRef   = useRef(null);
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);

  /* Load GSAP + plugins + EmailJS from CDN */
  useEffect(() => {
    const scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js",
      "https://assets.codepen.io/16327/SplitText3.min.js",
      "https://assets.codepen.io/16327/ScrambleTextPlugin3.min.js",
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
    ];
    const load = src => new Promise(res => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
      const s = document.createElement("script");
      s.src = src; s.async = false; s.onload = res; s.onerror = res;
      document.head.appendChild(s);
    });
    (async () => {
      for (const s of scripts) await load(s);
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
        if (window.SplitText)          window.gsap.registerPlugin(window.SplitText);
        if (window.ScrambleTextPlugin) window.gsap.registerPlugin(window.ScrambleTextPlugin);
      }
      if (window.emailjs) {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
    })();
  }, []);

  /* Custom cursor */
  useEffect(() => {
    const ring = cursorRef.current;
    const dot  = cursorDotRef.current;
    if (!ring || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const move = e => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      cx += (mx - cx) * .12; cy += (my - cy) * .12;
      ring.style.transform = `translate(${cx - 18}px,${cy - 18}px)`;
      dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`;
      requestAnimationFrame(tick);
    };
    addEventListener("mousemove", move);
    requestAnimationFrame(tick);
    return () => removeEventListener("mousemove", move);
  }, []);

  /* Hero GSAP SplitText entrance */
  useGSAP((gsap, ST, SplitText, Scramble) => {
    if (!heroNameRef.current) return;
    const tl = gsap.timeline({ delay: .4 });
    if (SplitText) {
      const split = new SplitText(heroNameRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0, y: 130, rotateY: 90, skewX: 15,
        stagger: .055, duration: 1.1, ease: "expo.out",
        transformOrigin: "left center",
      });
    } else {
      tl.from(heroNameRef.current, { opacity: 0, y: 80, duration: 1.1, ease: "expo.out" });
    }
    tl.from(heroTagRef.current,  { opacity: 0, x: -50, duration: .75, ease: "power3.out" }, "-=.6")
      .from(heroSubRef.current,  { opacity: 0, y: 30,  duration: .7,  ease: "power3.out" }, "-=.4")
      .from(heroBtnsRef.current ? Array.from(heroBtnsRef.current.children) : [], {
        opacity: 0, y: 24, stagger: .12, duration: .65, ease: "back.out(1.5)"
      }, "-=.35");

    /* ScrambleText hover on name */
    if (Scramble && heroNameRef.current) {
      const orig = heroNameRef.current.textContent;
      heroNameRef.current.addEventListener("mouseenter", () => {
        gsap.to(heroNameRef.current, {
          duration: .9,
          scrambleText: { text: orig, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", revealDelay: .3, speed: 1.2 },
          ease: "none",
        });
      });
    }
  }, []);

  /* Scroll-based reveals with ScrollTrigger */
  useGSAP((gsap, ST) => {
    if (!ST) return;
    gsap.utils.toArray(".skill-card").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        opacity: 0, y: 55, rotateX: -20, duration: .8, delay: i * .08,
        ease: "back.out(1.4)", transformOrigin: "top center",
      });
    });
    gsap.utils.toArray(".exp-card").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        opacity: 0, x: i % 2 === 0 ? -70 : 70, duration: .85, ease: "power3.out",
      });
    });
    gsap.utils.toArray(".proj-card").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        opacity: 0, y: 75, duration: .85, delay: i * .09, ease: "power3.out",
      });
    });
    gsap.utils.toArray(".tl-item").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0, x: -55, duration: .7, delay: i * .1, ease: "power3.out",
      });
    });
    gsap.utils.toArray(".ach-card").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0, scale: .75, duration: .65, delay: i * .09, ease: "back.out(1.7)",
      });
    });
    gsap.utils.toArray(".cert-badge").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%" },
        opacity: 0, y: 22, duration: .5, delay: i * .04, ease: "power2.out",
      });
    });
    /* Horizontal pin-scroll for skills section on desktop */
    const skillsWrap = document.querySelector(".marquee-inner");
    if (skillsWrap && window.innerWidth > 900) {
      gsap.to(skillsWrap, {
        scrollTrigger: { trigger: ".skills-pin", pin: false, scrub: 1.2 },
        ease: "none",
      });
    }
  }, []);

  /* Active nav */
  useEffect(() => {
    const secs = ["home","about","skills","experience","projects","achievements","contact"];
    const h = () => {
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && scrollY >= el.offsetTop - 220) {
          setActive(secs[i][0].toUpperCase() + secs[i].slice(1)); break;
        }
      }
    };
    addEventListener("scroll", h);
    return () => removeEventListener("scroll", h);
  }, []);

  const filteredProjects = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <div style={{ background: "transparent", color: "#e2e8f0", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,212,255,.2)}50%{box-shadow:0 0 55px rgba(168,85,247,.4),0 0 80px rgba(0,212,255,.12)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulseDot{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.6)}}
        @keyframes auroraFloat1{
          0%{transform:translate(0,0) scale(1)}
          33%{transform:translate(6vw,4vh) scale(1.08)}
          66%{transform:translate(-4vw,8vh) scale(.94)}
          100%{transform:translate(0,0) scale(1)}
        }
        @keyframes auroraFloat2{
          0%{transform:translate(0,0) scale(1)}
          40%{transform:translate(-7vw,-5vh) scale(1.1)}
          70%{transform:translate(5vw,6vh) scale(.92)}
          100%{transform:translate(0,0) scale(1)}
        }
        @keyframes auroraFloat3{
          0%{transform:translate(0,0) scale(1)}
          30%{transform:translate(5vw,-6vh) scale(1.06)}
          65%{transform:translate(-6vw,4vh) scale(.96)}
          100%{transform:translate(0,0) scale(1)}
        }
        @keyframes auroraFloat4{
          0%{transform:translate(0,0) rotate(0deg)}
          50%{transform:translate(8vw,-8vh) rotate(20deg)}
          100%{transform:translate(0,0) rotate(0deg)}
        }
        html{scroll-behavior:smooth;background:#020510}
        body{background:#020510}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#020510}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#00d4ff,#a855f7);border-radius:2px}
        .glass{
          background:linear-gradient(135deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.015) 100%);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,.07);
          box-shadow:0 4px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);
        }
        .section-bg-alt{background:linear-gradient(180deg,rgba(0,212,255,.025) 0%,rgba(139,92,246,.018) 50%,transparent 100%)}
        .cursor-ring{position:fixed;width:36px;height:36px;border-radius:50%;border:1.5px solid rgba(0,212,255,.55);pointer-events:none;z-index:9999;transition:opacity .3s}
        .cursor-dot{position:fixed;width:8px;height:8px;border-radius:50%;background:#00d4ff;pointer-events:none;z-index:9999}
        @media(max-width:900px){
          .nd{display:none!important}.nm{display:block!important}
          .two-col{grid-template-columns:1fr!important}
          .skill-grid{grid-template-columns:1fr 1fr!important}
          .proj-grid{grid-template-columns:1fr!important}
          .ach-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:500px){
          .skill-grid,.ach-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* Custom cursor */}
      <div ref={cursorRef}  className="cursor-ring" />
      <div ref={cursorDotRef} className="cursor-dot" />

      {/* NEW: Aurora mesh background */}
      <AuroraBackground />
      <ParticleCanvas />
      <Nav active={active} />

      {/* ════════════ HERO ════════════ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "0 6vw", overflow: "hidden", zIndex: 2 }}>
        {/* Wireframe globe */}
        <div style={{ position: "absolute", right: "3%", top: "6%", width: "min(430px,45vw)", height: "min(430px,45vw)", opacity: .13, pointerEvents: "none" }}>
          <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: "spin 30s linear infinite" }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#00d4ff" strokeWidth=".5" />
            {[15,30,45,60,75,90,105,120,135,150,165].map(y => (
              <ellipse key={y} cx="100" cy={y} rx={Math.sqrt(Math.max(0, 92*92-(y-100)*(y-100)))} ry="5" fill="none" stroke="#00d4ff" strokeWidth=".35" />
            ))}
            {[0,25,50,75,100,125,150].map(a => (
              <ellipse key={a} cx="100" cy="100" rx="5" ry="92" fill="none" stroke="#a855f7" strokeWidth=".35" transform={`rotate(${a},100,100)`} />
            ))}
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div ref={heroTagRef} style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, letterSpacing: 5, color: "#a855f7", textTransform: "uppercase", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 32, height: 1, background: "#a855f7", display: "inline-block" }} />
            Portfolio 2025 · Open to Opportunities
          </div>
          <h1 ref={heroNameRef} style={{ fontSize: "clamp(52px,10vw,110px)", fontWeight: 900, fontFamily: "'Orbitron',monospace", margin: "0 0 6px", lineHeight: .95, background: "linear-gradient(135deg,#fff 45%,#00d4ff 72%,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "default", userSelect: "none" }}>
            KARRI VIJAY
          </h1>
          <div ref={heroSubRef} style={{ fontSize: "clamp(16px,2.6vw,26px)", marginBottom: 22, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ color: "#475569" }}>I build as a </span>
            <TypedText texts={ROLES} />
          </div>
          <p style={{ color: "#475569", fontSize: 15, maxWidth: 560, lineHeight: 1.9, marginBottom: 38 }}>
            Crafting full-stack MERN applications & uncovering data-driven insights.
            4 internships · 5 production projects · Top 25% LeetCode. Ready to make an impact.
          </p>
          <div ref={heroBtnsRef} style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "14px 30px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#00d4ff,#a855f7)", color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .3s", backgroundSize: "200% 200%", animation: "gradShift 4s ease infinite" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,212,255,.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>View Projects</button>
            <a href={SOCIAL.github} target="_blank" rel="noreferrer"
              style={{ padding: "14px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)", color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: 12, textDecoration: "none", transition: "all .3s", display: "inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = ""; }}><Icon name="github" size={14} color="#fff" style={{marginRight:6}} /> GitHub</a>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "14px 28px", borderRadius: 10, border: "1px solid rgba(0,212,255,.35)", background: "rgba(0,212,255,.06)", color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: 12, cursor: "pointer", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,.18)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,255,.06)"; e.currentTarget.style.transform = ""; }}>Hire Me →</button>
          </div>
          {/* Social icons */}
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { label: "LinkedIn", href: SOCIAL.linkedin, iconName: "linkedin", color: "#0a66c2" },
              { label: "GitHub",   href: SOCIAL.github,   iconName: "github",   color: "#ffffff" },
              { label: "Email",    href: `mailto:${SOCIAL.email}`, iconName: "mail", color: "#00d4ff" },
              { label: "LeetCode", href: SOCIAL.leetcode,  iconName: "code",    color: "#f59e0b" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", textDecoration: "none", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${s.color}20`; e.currentTarget.style.borderColor = `${s.color}50`; e.currentTarget.style.transform = "translateY(-4px) scale(1.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.transform = ""; }}
              ><Icon name={s.iconName} size={18} color="#94a3b8" /></a>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 2.6s ease infinite" }}>
          <div style={{ width: 1, height: 58, background: "linear-gradient(to bottom,transparent,#00d4ff)" }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#334155", letterSpacing: 4 }}>SCROLL</span>
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(0,212,255,.08)", borderBottom: "1px solid rgba(0,212,255,.08)", padding: "13px 0", background: "rgba(2,5,16,.5)", backdropFilter: "blur(10px)", position: "relative", zIndex: 2 }}>
        <div className="marquee-inner" style={{ display: "flex", animation: "marquee 24s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, ri) => (
            <span key={ri} style={{ display: "inline-flex", gap: 50, paddingRight: 50 }}>
              {["React.js","Node.js","Python","Power BI","MongoDB","Machine Learning","Express.js","Data Analytics","MERN Stack","Scikit-Learn","JWT Auth","REST APIs","Pandas","NumPy","SQL"].map(t => (
                <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#334155", letterSpacing: 2, textTransform: "uppercase" }}>
                  <span style={{ color: "#00d4ff", marginRight: 18 }}>◈</span>{t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════ ABOUT ════ */}
      <section id="about" style={{ padding: "110px 6vw", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionHeader title="About Me" sub="Who I Am" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="two-col">
            <div>
              <p style={{ color: "#94a3b8", lineHeight: 1.95, marginBottom: 18, fontSize: 15 }}>
                Full Stack Developer with hands-on expertise in the <span style={{ color: "#00d4ff", fontWeight: 600 }}>MERN stack</span>, building secure, scalable, user-centric web applications. Skilled in RESTful APIs, JWT auth, and real-time data solutions.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.95, fontSize: 15, marginBottom: 28 }}>
                Simultaneously a <span style={{ color: "#a855f7", fontWeight: 600 }}>Data Analytics & AI/ML enthusiast</span> — delivering predictive models, Power BI dashboards, and actionable insights from complex datasets.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["mappin","Location","Kakinada, AP","#00d4ff"],
                  ["graduationcap","Degree","B.Tech CSE","#a855f7"],
                  ["calendar","Graduation","June 2026","#10b981"],
                  ["zap","CGPA","8.59 / 10","#f59e0b"],
                  ["lightbulb","Focus","Full Stack + Data","#ef4444"],
                  ["trophy","LeetCode","Top 25%","#00d4ff"],
                ].map(([ic,k,v,c]) => (
                  <div key={k} style={{ padding: "14px 18px", borderRadius: 10, background: "rgba(0,212,255,.03)", border: "1px solid rgba(0,212,255,.1)", transition: "border-color .25s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,212,255,.35)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,212,255,.1)"}>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "'Space Mono',monospace", marginBottom: 6, display:"flex", alignItems:"center", gap:6 }}>
                      <Icon name={ic} size={12} color={c} />{k}
                    </div>
                    <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 8, border: "1px solid #0a66c230", background: "rgba(10,102,194,.08)", color: "#0a66c2", fontSize: 12, fontFamily: "'Space Mono',monospace", textDecoration: "none", transition: "all .25s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(10,102,194,.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(10,102,194,.08)"}
                ><Icon name="linkedin" size={13} color="#0a66c2" /> LinkedIn →</a>
                <a href={SOCIAL.github} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#94a3b8", fontSize: 12, fontFamily: "'Space Mono',monospace", textDecoration: "none", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.color = "#94a3b8"; }}
                ><Icon name="github" size={13} color="#94a3b8" /> GitHub →</a>
              </div>
            </div>
            {/* Timeline */}
            <div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, color: "#00d4ff", letterSpacing: 3, marginBottom: 28, textTransform: "uppercase" }}>Career Timeline</div>
              <div style={{ position: "relative", paddingLeft: 36 }}>
                <div style={{ position: "absolute", left: 12, top: 0, bottom: 0, width: 1.5, background: "linear-gradient(to bottom,#00d4ff,#a855f7,rgba(168,85,247,.1))" }} />
                {TIMELINE.map((t, i) => (
                  <div key={i} className="tl-item" style={{ marginBottom: 28, position: "relative" }}>
                    <div style={{ position: "absolute", left: -30, top: 6, width: 12, height: 12, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},#a855f7)`, boxShadow: `0 0 14px ${t.color}80`, animation: "pulseDot 2.5s ease infinite" }} />
                    <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, color: t.color, marginBottom: 6, letterSpacing: 1 }}>{t.year}</div>
                    <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.65, display:"flex", alignItems:"center", gap:8 }}>
                      <Icon name={t.iconName} size={14} color={t.color} style={{ opacity:.8, flexShrink:0 }} />
                      {t.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ SKILLS ════ */}
      <section id="skills" className="skills-pin section-bg-alt" style={{ padding: "110px 6vw", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionHeader title="Technical Skills" sub="Arsenal" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="skill-grid">
            {Object.entries(SKILLS).map(([cat, { items, iconName, color }]) => (
              <div key={cat} className="skill-card glass" style={{ borderRadius: 18, padding: "26px 24px", transition: "border-color .3s,box-shadow .3s,transform .3s", border: `1px solid ${color}18` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.boxShadow = `0 16px 40px ${color}15`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}18`; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:`${color}15`, border:`1px solid ${color}25`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name={iconName} size={17} color={color} />
                  </div>
                  <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, color, letterSpacing: 2, textTransform: "uppercase" }}>{cat}</span>
                </div>
                <div>{items.map(s => <Badge key={s} s={s} c={color} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ EDUCATION ════ */}
      <section style={{ padding: "80px 6vw", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <SectionHeader title="Education" sub="Academic" />
          <div className="glass" style={{ borderRadius: 22, padding: "42px 44px", border: "1px solid rgba(0,212,255,.18)", animation: "glow 5s ease infinite", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#00d4ff,#a855f7)" }} />
            <div style={{ fontSize: 44, marginBottom: 14 }}>🎓</div>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 17, color: "#f1f5f9", margin: "0 0 8px" }}>Bachelor of Technology</h3>
            <div style={{ color: "#00d4ff", fontSize: 14, marginBottom: 8, fontFamily: "'Space Mono',monospace" }}>Computer Science & Engineering</div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 26 }}>Aditya College of Engineering · JNTUK University</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
              {[["8.59","CGPA"],["2022–2026","Duration"],["CSE","Branch"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 24, fontWeight: 900, background: "linear-gradient(90deg,#00d4ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
                  <div style={{ color: "#475569", fontSize: 11, fontFamily: "'Space Mono',monospace", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ EXPERIENCE ════ */}
      <section id="experience" style={{ padding: "110px 6vw", position: "relative", zIndex: 2, background: "linear-gradient(180deg,transparent,rgba(139,92,246,.03) 50%,transparent)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionHeader title="Experience" sub="Work History" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-card glass" style={{ borderRadius: 18, padding: "28px 30px", borderLeft: `3px solid ${e.color}`, transition: "transform .3s,box-shadow .3s" }}
                onMouseEnter={el => { el.currentTarget.style.transform = "translateY(-5px)"; el.currentTarget.style.boxShadow = `0 20px 44px ${e.color}15`; }}
                onMouseLeave={el => { el.currentTarget.style.transform = ""; el.currentTarget.style.boxShadow = ""; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, color: "#f1f5f9", margin: "0 0 5px", lineHeight: 1.35 }}>{e.role}</h3>
                    <div style={{ color: e.color, fontSize: 13, fontWeight: 600 }}>{e.company}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ fontSize: 10, fontFamily: "'Space Mono',monospace", color: "#475569", padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,.04)", whiteSpace: "nowrap" }}>{e.period}</span>
                    <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 10, background: `${e.color}18`, color: e.color, fontFamily: "'Space Mono',monospace" }}>{e.badge}</span>
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, color: "#64748b", fontSize: 13, lineHeight: 1.9 }}>
                  {e.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PROJECTS ════ */}
      <section id="projects" style={{ padding: "110px 6vw", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionHeader title="Featured Projects" sub="Portfolio" />
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
            {[["all","All Projects"],["fullstack","Full Stack"],["data","Data & AI"]].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{ padding: "11px 26px", borderRadius: 28, border: "1px solid rgba(0,212,255,.3)", background: filter === v ? "linear-gradient(135deg,#00d4ff,#a855f7)" : "rgba(0,212,255,.05)", color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: 12, cursor: "pointer", transition: "all .3s" }}
                onMouseEnter={e => { if (filter !== v) e.currentTarget.style.background = "rgba(0,212,255,.12)"; }}
                onMouseLeave={e => { if (filter !== v) e.currentTarget.style.background = "rgba(0,212,255,.05)"; }}
              >{l}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 26 }} className="proj-grid">
            {filteredProjects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ════ ACHIEVEMENTS ════ */}
      <section id="achievements" style={{ padding: "110px 6vw", position: "relative", zIndex: 2, background: "linear-gradient(180deg,transparent,rgba(0,212,255,.025) 50%,transparent)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionHeader title="Achievements" sub="By The Numbers" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 70 }} className="ach-grid">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="ach-card"><Counter item={a} /></div>
            ))}
          </div>
          {/* Certifications */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, color: "#a855f7", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Certifications</div>
            <div style={{ width: 40, height: 2, background: "linear-gradient(90deg,#a855f7,#00d4ff)", margin: "0 auto 32px" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {CERTS.map((c, i) => (
              <div key={i} className="cert-badge" style={{ padding: "12px 20px", borderRadius: 10, background: "rgba(168,85,247,.05)", border: "1px solid rgba(168,85,247,.2)", color: "#cbd5e1", fontSize: 13, fontFamily: "'Space Mono',monospace", display: "flex", alignItems: "center", gap: 8, transition: "all .25s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,.5)"; e.currentTarget.style.color = "#a855f7"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(168,85,247,.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,.2)"; e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              ><span style={{ color: "#a855f7", fontSize: 10 }}>◈</span>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" style={{ padding: "110px 6vw", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionHeader title="Let's Connect" sub="Contact" />
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 40, flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: SOCIAL.linkedin, iconName: "linkedin", color: "#0a66c2", bg: "rgba(10,102,194,.12)" },
              { label: "GitHub",   href: SOCIAL.github,   iconName: "github",   color: "#fff",    bg: "rgba(255,255,255,.07)" },
              { label: "Email",    href: `mailto:${SOCIAL.email}`, iconName: "mail", color: "#00d4ff", bg: "rgba(0,212,255,.07)" },
              { label: "LeetCode", href: SOCIAL.leetcode,  iconName: "code",    color: "#f59e0b", bg: "rgba(245,158,11,.07)" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 30, border: `1px solid ${s.color}30`, background: s.bg, color: s.color, textDecoration: "none", fontFamily: "'Space Mono',monospace", fontSize: 12, transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${s.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              ><Icon name={s.iconName} size={14} color={s.color} /> {s.label}</a>
            ))}
          </div>
          <div className="glass" style={{ borderRadius: 22, padding: "44px", border: "1px solid rgba(0,212,255,.12)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#00d4ff,#a855f7)" }} />
            {sent ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom: 20 }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,rgba(0,212,255,.15),rgba(168,85,247,.15))", border:"1px solid rgba(0,212,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", animation:"glow 3s ease infinite" }}>
                    <Icon name="checkmark" size={34} color="#00d4ff" />
                  </div>
                </div>
                <h3 style={{ fontFamily: "'Orbitron',monospace", color: "#00d4ff", marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "#64748b", marginBottom: 20 }}>Thanks for reaching out. I'll respond within 24 hours.</p>
                <button onClick={() => { setSent(false); setSendError(""); }} style={{ padding: "10px 24px", borderRadius: 8, background: "rgba(0,212,255,.1)", border: "1px solid rgba(0,212,255,.3)", color: "#00d4ff", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: 12 }}>Send Another</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="two-col">
                  {[["Name","text","Your full name","name"],["Email","email","your@email.com","email"]].map(([l,t,ph,k]) => (
                    <div key={k}>
                      <label style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#475569", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>{l}</label>
                      <input type={t} placeholder={ph} value={form[k]}
                        onChange={e => setForm({ ...form, [k]: e.target.value })}
                        style={{ width: "100%", background: "rgba(255,255,255,.03)", border: "1px solid rgba(0,212,255,.12)", borderRadius: 10, padding: "13px 16px", color: "#e2e8f0", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", transition: "border-color .25s" }}
                        onFocus={e => e.target.style.borderColor = "rgba(0,212,255,.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(0,212,255,.12)"}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#475569", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Message</label>
                  <textarea rows={5} placeholder="Tell me about the role, project, or opportunity..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,.03)", border: "1px solid rgba(0,212,255,.12)", borderRadius: 10, padding: "13px 16px", color: "#e2e8f0", fontSize: 14, resize: "vertical", outline: "none", fontFamily: "'DM Sans',sans-serif", transition: "border-color .25s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(0,212,255,.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(0,212,255,.12)"}
                  />
                </div>
                <button onClick={handleSend} disabled={sending || !form.name || !form.email || !form.message}
                  style={{ padding: "16px", borderRadius: 12, border: "none", background: sending ? "rgba(0,212,255,.3)" : "linear-gradient(135deg,#00d4ff,#a855f7)", color: "#fff", fontFamily: "'Orbitron',monospace", fontSize: 13, cursor: sending ? "not-allowed" : "pointer", letterSpacing: 2, fontWeight: 700, transition: "all .3s", backgroundSize: "200% 200%", animation: sending ? "none" : "gradShift 4s ease infinite", opacity: (!form.name || !form.email || !form.message) ? .5 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                  onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,212,255,.4)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  {sending ? (
                    <>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
                      SENDING...
                    </>
                  ) : <><Icon name="sendhorizonal" size={16} color="#fff" style={{marginRight:8}} /> SEND MESSAGE</>}
                </button>
                {sendError && (
                  <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", fontSize: 13, fontFamily: "'Space Mono',monospace", textAlign: "center", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    <Icon name="alertcircle" size={15} color="#f87171" /> {sendError}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ textAlign: "center", padding: "44px 6vw 28px", borderTop: "1px solid rgba(0,212,255,.07)", position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: 22, background: "linear-gradient(90deg,#00d4ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 3, marginBottom: 14 }}>KARRI VIJAY</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 18, flexWrap: "wrap" }}>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" style={{ color: "#0a66c2", fontSize: 12, fontFamily: "'Space Mono',monospace", textDecoration: "none" }}>LinkedIn</a>
          <span style={{ color: "#1e293b" }}>·</span>
          <a href={SOCIAL.github} target="_blank" rel="noreferrer" style={{ color: "#94a3b8", fontSize: 12, fontFamily: "'Space Mono',monospace", textDecoration: "none" }}>GitHub</a>
          <span style={{ color: "#1e293b" }}>·</span>
          <a href={`mailto:${SOCIAL.email}`} style={{ color: "#00d4ff", fontSize: 12, fontFamily: "'Space Mono',monospace", textDecoration: "none" }}>{SOCIAL.email}</a>
        </div>
        <p style={{ color: "#1e293b", fontSize: 12, fontFamily: "'Space Mono',monospace", margin: 0 }}>
          Built with React · vijaykarri220910125@gmail.com · 8143957022   © 2025 Karri Vijay
        </p>
      </footer>
    </div>
  );
}
