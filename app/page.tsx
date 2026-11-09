 "use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowDown, ArrowUpRight, AudioLines, BriefcaseBusiness, Check,
  ChevronLeft, ChevronRight, Code2, Cpu, ExternalLink, Github,
  GraduationCap, Headphones, Linkedin, Mail, Menu, Moon, Pause,
  Play, Radio, Send, ShieldCheck, Sparkles, Sun, Volume2, VolumeX, X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import type { WorldSection } from "@/components/ImmersiveWorld";

const ImmersiveWorld = dynamic(() => import("@/components/ImmersiveWorld"), {
  ssr: false,
  loading: () => <div className="world-loading"><span className="loader-orbit" /><p>INITIALIZING DIGITAL UNIVERSE</p></div>,
});

type Theme = "dark" | "light" | "cyber";

const navItems: { id: WorldSection; label: string; index: string }[] = [
  { id: "home", label: "HOME", index: "00" },
  { id: "about", label: "IDENTITY", index: "01" },
  { id: "skills", label: "ARSENAL", index: "02" },
  { id: "projects", label: "CREATIONS", index: "03" },
  { id: "experience", label: "JOURNEY", index: "04" },
  { id: "community", label: "TRANSMISSION", index: "05" },
  { id: "contact", label: "CONNECT", index: "06" },
];

const projects = [
  {
    id: "01", name: "ADRISHYA", type: "PERSONAL AI ASSISTANT", status: "IN DEVELOPMENT",
    description: "A personal AI assistant exploring model training, speech recognition and natural voice interaction. Designed around a command interface, microphone controls, system telemetry and an animated intelligence layer.",
    stack: ["Python", "AI / ML", "Speech Recognition", "Automation"],
    image: "/adrishya-prototype.png", featured: true,
  },
  {
    id: "02", name: "AI SaaS PLATFORM", type: "GENERATIVE AI PRODUCT",
    description: "An AI-powered SaaS platform with tools for article generation, blog title ideas, image generation and resume analysis, built around a modern web application stack.",
    stack: ["React", "Express", "PostgreSQL", "AI APIs"],
    image: "", featured: false,
  },
  {
    id: "03", name: "ELINK", type: "WEB3 / SOCIAL TRUST",
    description: "A Web3 social trust concept exploring digital identity, reputation and trust signals in connected communities.",
    stack: ["Web3", "Blockchain", "JavaScript"],
    image: "", featured: false,
  },
  {
    id: "04", name: "SMART HOME AUTOMATION", type: "IOT SYSTEM",
    description: "An embedded smart-home automation project using an ESP-based controller to connect sensors, devices and control workflows.",
    stack: ["ESP", "IoT", "Embedded Systems"],
    image: "", featured: false,
  },
  {
    id: "05", name: "GOVERNMENT JOB SCRAPER", type: "AUTOMATION TOOL",
    description: "A desktop utility that collects government job notifications from web sources and presents them in a simple Tkinter interface.",
    stack: ["Python", "Tkinter", "BeautifulSoup", "Requests"],
    image: "", featured: false,
  },
  {
    id: "06", name: "SECURITY RESEARCH TOOLS", type: "CYBERSECURITY",
    description: "A collection of learning and research utilities for authorized lab environments, defensive analysis and security experimentation.",
    stack: ["Python", "Linux", "OSINT", "Web Security"],
    image: "", featured: false,
  },
];

const skillGroups = [
  { icon: Code2, title: "ENGINEERING", items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "REST APIs"] },
  { icon: Cpu, title: "INTELLIGENCE", items: ["AI / ML Fundamentals", "Generative AI", "AI APIs", "Model Training", "Automation", "RAG Systems"] },
  { icon: ShieldCheck, title: "SECURITY", items: ["Digital Forensics", "OSINT", "Threat Analysis", "Web Security", "Linux", "Networking"] },
  { icon: Radio, title: "SYSTEMS", items: ["PostgreSQL", "MongoDB", "Git & GitHub", "Google Cloud", "Azure", "Docker", "DSA", "DBMS", "Operating Systems"] },
];

const experiences = [
  {
    date: "JUL 2026 — PRESENT", role: "Cybersecurity & Digital Forensics Intern",
    org: "Delhi Police · Cyber Crime Unit",
    detail: "Supervised exposure to cybercrime investigation workflows, digital evidence handling, preservation and documentation, with an emphasis on responsible forensic practices.",
    tag: "CYBER FORENSICS",
  },
  {
    date: "2025", role: "Full Stack Development Intern",
    org: "IbtidaaTech",
    detail: "Worked across frontend and backend development workflows, APIs and practical web application features.",
    tag: "FULL STACK",
  },
  {
    date: "2025", role: "Front-End Development Intern",
    org: "SaiKet Systems",
    detail: "Built and refined responsive user interfaces while strengthening frontend development fundamentals.",
    tag: "FRONTEND",
  },
  {
    date: "ONGOING", role: "Founder & Community Builder",
    org: "THE AI 👽 GUY 🤖",
    detail: "Building a technical community around AI, software development, cybersecurity, cloud, open source, hackathons and collaborative learning.",
    tag: "COMMUNITY",
  },
];

const socials = [
  { label: "GITHUB", href: "https://github.com/invisiblehqck", icon: Github },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/satyam-gupta-0b0637294/", icon: Linkedin },
  { label: "YOUTUBE", href: "https://www.youtube.com/@The_AI_gUi", icon: Play },
  { label: "TELEGRAM", href: "https://t.me/The_AI_gUi", icon: Send },
  { label: "INSTAGRAM", href: "https://www.instagram.com/the_ai_guy9/", icon: Radio },
];

function playUiTone(frequency = 520) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.17);
    oscillator.onended = () => void context.close();
  } catch { /* Audio is an optional enhancement. */ }
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState<WorldSection>("home");
  const [theme, setTheme] = useState<Theme>("dark");
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [musicName, setMusicName] = useState("NO TRACK LOADED");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showMusicPicker, setShowMusicPicker] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("sg-immersive-theme") as Theme | null;
    if (saved && ["dark", "light", "cyber"].includes(saved)) setTheme(saved);
    const timer = window.setTimeout(() => setShowIntro(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("sg-immersive-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenu(false);
      if (event.key === "ArrowRight") moveProject(1);
      if (event.key === "ArrowLeft") moveProject(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const sectionIds = navItems.map((item) => `content-${item.id}`);
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id.replace("content-", "") as WorldSection);
    }, { rootMargin: "-28% 0px -42% 0px", threshold: [0.05, 0.2, 0.45] });
    elements.forEach((element) => observer.observe(element));

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => () => {
    if (musicUrl.startsWith("blob:")) URL.revokeObjectURL(musicUrl);
  }, [musicUrl]);

  const navigate = useCallback((section: WorldSection) => {
    setActive(section);
    setMobileMenu(false);
    if (soundOn) playUiTone(420 + navItems.findIndex((item) => item.id === section) * 42);
    if (section !== "home") {
      window.setTimeout(() => {
        document.getElementById(`content-${section}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [soundOn]);

  const changeTheme = (next: Theme) => {
    setTheme(next);
    if (soundOn) playUiTone(660);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) {
      setShowMusicPicker(true);
      return;
    }
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
        setShowMusicPicker(true);
      }
    }
  };

  const loadMusic = (file?: File) => {
    if (!file) return;
    if (musicUrl.startsWith("blob:")) URL.revokeObjectURL(musicUrl);
    const nextUrl = URL.createObjectURL(file);
    setMusicUrl(nextUrl);
    setMusicName(file.name.toUpperCase());
    setMusicOn(false);
    setShowMusicPicker(false);
    window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = nextUrl;
        void audioRef.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
      }
    }, 50);
  };

  const moveProject = (direction: number) => {
    setProjectIndex((current) => (current + direction + projects.length) % projects.length);
  };

  const currentProject = projects[projectIndex];
  const themeLabel = useMemo(() => ({ dark: "DARK", light: "LIGHT", cyber: "CYBER" }[theme]), [theme]);

  return (
    <main ref={mainRef} className="portfolio-shell">
      <audio ref={audioRef} loop onEnded={() => setMusicOn(false)} />
      <AnimatePresence>
        {showIntro && (
          <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.7 } }}>
            <div className="intro-mark">SG<span>.</span></div>
            <div className="intro-line"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1 }} /></div>
            <p>ESTABLISHING SECURE CONNECTION</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="world-fixed">
        <ImmersiveWorld active={active} onNavigate={navigate} theme={theme} />
        <div className="world-vignette" />
        <div className="world-grid" />
      </div>

      <header className="topbar">
        <button className="brand-lockup" onClick={() => navigate("home")} aria-label="Go to home">
          <span className="brand-monogram">SG<span>.</span></span>
          <span className="brand-divider" />
          <span className="brand-text">SATYAM GUPTA<small>DIGITAL UNIVERSE / 2026</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.id} className={active === item.id ? "nav-link active" : "nav-link"} onClick={() => navigate(item.id)}>
              <span>{item.index}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <span className="status-pill"><i /> AVAILABLE</span>
          <button className="icon-button mobile-menu-trigger" onClick={() => setMobileMenu((v) => !v)} aria-label="Toggle navigation">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenu && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {navItems.map((item) => <button key={item.id} onClick={() => navigate(item.id)}><span>{item.index}</span>{item.label}<ArrowUpRight size={14} /></button>)}
          </motion.nav>
        )}
      </AnimatePresence>

      <aside className="side-rail">
        <span className="rail-label">EXPLORE THE UNIVERSE</span>
        <div className="rail-line" />
        {navItems.map((item) => (
          <button key={item.id} className={active === item.id ? "rail-dot active" : "rail-dot"} onClick={() => navigate(item.id)} title={item.label}>
            <span>{item.index}</span>
          </button>
        ))}
        <div className="rail-line" />
        <span className="rail-current">{navItems.find((n) => n.id === active)?.index}</span>
      </aside>

      <section className="hero-section" id="content-home">
        <div className="hero-copy">
          <motion.div className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <span className="live-dot" /> SYSTEM ONLINE <span className="kicker-separator">/</span> OPEN TO OPPORTUNITIES
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }}>
            I BUILD<br /><span>INTELLIGENT</span><br />EXPERIENCES<span className="hero-period">.</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            Software Engineer <b>·</b> AI / ML <b>·</b> Full-Stack <b>·</b> Cybersecurity
            <br />I turn complex ideas into useful, secure and intelligent digital experiences.
          </motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }}>
            <button className="primary-button" onClick={() => navigate("projects")}>EXPLORE MY WORK <ArrowUpRight size={16} /></button>
            <button className="text-button" onClick={() => navigate("contact")}>LET&apos;S CONNECT <ArrowDown size={15} /></button>
          </motion.div>
          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55 }}>
            <span><i /> FARIDABAD, INDIA</span><span>LAT 28.4° N / LONG 77.3° E</span>
          </motion.div>
        </div>

        <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.86, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 1.05, duration: 1 }}>
          <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
          <div className="portrait-image-wrap">
            <Image src="/satyam-hero.png" alt="Satyam Gupta portrait" fill priority sizes="(max-width: 800px) 70vw, 360px" className="portrait-image" />
            <div className="portrait-image-shade" />
          </div>
          <div className="portrait-caption"><span>IDENTITY VERIFIED</span><strong>SG / 001</strong></div>
          <div className="portrait-crosshair crosshair-a">+</div><div className="portrait-crosshair crosshair-b">+</div>
        </motion.div>

        <div className="hero-world-hint"><span className="hint-mouse"><i /></span><span>SCROLL TO TRAVERSE</span><span className="hint-line" /></div>
        <div className="hero-coordinate">WORLD 01 <span>—</span> THE BEGINNING</div>
      </section>

      <section className="content-section about-section" id="content-about">
        <div className="section-index">01 <span>/ 06</span></div>
        <div className="content-grid">
          <div>
            <SectionHeading eyebrow="IDENTITY PROTOCOL" title={<>CURIOUS BY<br /><em>DEFAULT.</em></>} description="A builder at the intersection of software, intelligence and security." />
            <p className="body-copy">I&apos;m Satyam Gupta, a Computer Science Engineering student focused on AI &amp; ML. I enjoy understanding how systems work, building things that solve real problems, and exploring the boundary between intelligent software and digital security.</p>
            <p className="body-copy">My approach is simple: learn deeply, build consistently, experiment responsibly, and share what I discover.</p>
            <div className="education-chip"><GraduationCap size={18} /><span><b>B.TECH · CSE (AI &amp; ML)</b><small>J.C. Bose University of Science &amp; Technology, YMCA · 2023–2027</small></span></div>
          </div>
          <div className="identity-card">
            <div className="identity-card-top"><span>PERSONAL DATA / PUBLIC</span><span className="verified"><Check size={12} /> VERIFIED</span></div>
            <div className="identity-monogram">SG<span>.</span></div>
            <h3>SATYAM GUPTA</h3>
            <p>SOFTWARE ENGINEER · AI / ML · FULL-STACK</p>
            <div className="identity-divider" />
            <div className="identity-stats"><div><strong>03<span>+</span></strong><small>DOMAINS</small></div><div><strong>06</strong><small>PROJECTS</small></div><div><strong>∞</strong><small>CURIOSITY</small></div></div>
            <div className="identity-card-bottom"><span>BUILT TO EXPLORE</span><span>INVISIBLEHQCK ↗</span></div>
          </div>
        </div>
      </section>

      <section className="content-section skills-section" id="content-skills">
        <div className="section-index">02 <span>/ 06</span></div>
        <SectionHeading eyebrow="CAPABILITY MATRIX" title={<>MY <em>ARSENAL.</em></>} description="Tools, technologies and concepts I use to turn ideas into working systems." />
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return <motion.article className="skill-card" key={group.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }}>
              <div className="skill-card-head"><span className="skill-icon"><Icon size={20} /></span><span>0{index + 1} / 04</span></div>
              <h3>{group.title}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="skill-card-line" />
            </motion.article>;
          })}
        </div>
      </section>

      <section className="content-section projects-section" id="content-projects">
        <div className="section-index">03 <span>/ 06</span></div>
        <SectionHeading eyebrow="SELECTED EXPERIMENTS" title={<>THINGS I <em>CREATE.</em></>} description="A selection of experiments, tools and products across AI, web and security." />
        <div className="project-showcase">
          <div className="project-visual">
            <div className="project-visual-grid" />
            {currentProject.image ? (
              <Image src={currentProject.image} alt={`${currentProject.name} preview`} fill sizes="(max-width: 800px) 90vw, 48vw" className="project-image" />
            ) : (
              <div className="project-symbol"><span>{currentProject.id}</span><div className="symbol-ring ring-one" /><div className="symbol-ring ring-two" /><div className="symbol-core"><Cpu size={54} /></div></div>
            )}
            <span className="visual-corner top-left">PROJECT / {currentProject.id}</span><span className="visual-corner bottom-right">SG LABS © 2026</span>
            {currentProject.featured && <span className="featured-stamp">FEATURED BUILD</span>}
          </div>
          <div className="project-info">
            <div className="project-count"><span>PROJECT {currentProject.id}</span><span>{String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
            <span className="eyebrow"><i />{currentProject.type}</span>
            <h3>{currentProject.name}</h3>
            {currentProject.status && <span className="project-status"><i />{currentProject.status}</span>}
            <p>{currentProject.description}</p>
            <div className="project-stack">{currentProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="project-controls"><button onClick={() => moveProject(-1)} aria-label="Previous project"><ChevronLeft /></button><button onClick={() => moveProject(1)} aria-label="Next project"><ChevronRight /></button><span>USE ← → TO EXPLORE</span></div>
          </div>
        </div>
        <div className="project-progress">{projects.map((project, index) => <button key={project.id} className={index === projectIndex ? "progress-segment active" : "progress-segment"} onClick={() => setProjectIndex(index)} aria-label={`Show project ${project.name}`} />)}</div>
      </section>

      <section className="content-section experience-section" id="content-experience">
        <div className="section-index">04 <span>/ 06</span></div>
        <SectionHeading eyebrow="MISSION LOG" title={<>THE <em>JOURNEY.</em></>} description="Experiences that are shaping how I think, build and contribute." />
        <div className="timeline">
          {experiences.map((item, index) => <motion.article className="timeline-item" key={item.role} initial={{ opacity: 0, x: index % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className="timeline-content"><div className="timeline-top"><span>{item.date}</span><span className="timeline-tag">{item.tag}</span></div><h3>{item.role}</h3><h4>{item.org}</h4><p>{item.detail}</p></div>
          </motion.article>)}
        </div>
      </section>

      <section className="content-section community-section" id="content-community">
        <div className="section-index">05 <span>/ 06</span></div>
        <div className="community-panel">
          <div className="community-glow" />
          <span className="eyebrow"><i /> COMMUNITY TRANSMISSION</span>
          <div className="community-brand">THE AI <span>👽</span><br />GUY <span>🤖</span></div>
          <p>A growing technical community for curious minds who love building, breaking, learning and sharing. Exploring AI, software, cybersecurity, cloud, open source and the next big idea.</p>
          <div className="community-links">
            <a href="https://github.com/The-AI-gUi" target="_blank" rel="noreferrer"><Github size={17} /> GITHUB <ArrowUpRight size={14} /></a>
            <a href="https://www.youtube.com/@The_AI_gUi" target="_blank" rel="noreferrer"><Play size={16} /> YOUTUBE <ArrowUpRight size={14} /></a>
            <a href="https://t.me/The_AI_gUi" target="_blank" rel="noreferrer"><Send size={16} /> TELEGRAM <ArrowUpRight size={14} /></a>
            <a href="https://www.instagram.com/the_ai_guy9/" target="_blank" rel="noreferrer"><Radio size={16} /> INSTAGRAM <ArrowUpRight size={14} /></a>
          </div>
          <div className="community-watermark">- INVISIBLEHQCK</div>
        </div>
      </section>

      <section className="content-section contact-section" id="content-contact">
        <div className="section-index">06 <span>/ 06</span></div>
        <div className="contact-layout">
          <div><SectionHeading eyebrow="OPEN CHANNEL" title={<>LET&apos;S BUILD<br /><em>SOMETHING.</em></>} description="Have an opportunity, a collaboration idea, or a problem worth solving? Let's talk." />
            <a className="contact-email" href="mailto:satyamgupta97180@gmail.com"><Mail size={19} /> satyamgupta97180@gmail.com <ArrowUpRight size={17} /></a>
          </div>
          <div className="contact-side">
            <div className="contact-availability"><span className="live-dot" /> CURRENTLY OPEN TO OPPORTUNITIES</div>
            <p>Internships · Software Engineering · AI / ML · Full-Stack Development · Cybersecurity · Freelance Projects</p>
            <div className="social-list">{socials.map((social) => { const Icon = social.icon; return <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><span><Icon size={16} />{social.label}</span><ArrowUpRight size={15} /></a>; })}</div>
          </div>
        </div>
        <footer className="site-footer"><span>© 2026 SATYAM GUPTA</span><span>DESIGNED TO EXPLORE <b>✳</b> BUILT TO CREATE</span><button onClick={() => navigate("home")}>BACK TO TOP <ArrowUpRight size={14} /></button></footer>
      </section>

      <div className="control-dock">
        <div className="dock-status"><span className="dock-pulse" /><span>WORLD ACTIVE</span></div>
        <div className="dock-divider" />
        <div className="theme-switcher" aria-label="Choose theme">
          <button className={theme === "dark" ? "selected" : ""} onClick={() => changeTheme("dark")} title="Dark theme"><Moon size={14} /></button>
          <button className={theme === "light" ? "selected" : ""} onClick={() => changeTheme("light")} title="Light theme"><Sun size={14} /></button>
          <button className={theme === "cyber" ? "selected" : ""} onClick={() => changeTheme("cyber")} title="Cyber theme"><Sparkles size={14} /></button>
        </div>
        <span className="dock-theme-label">{themeLabel}</span>
        <div className="dock-divider" />
        <button className={soundOn ? "dock-control enabled" : "dock-control"} onClick={() => setSoundOn((v) => !v)} title="Toggle UI sound effects">{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>SFX</span></button>
        <button className={musicOn ? "dock-control enabled" : "dock-control"} onClick={toggleMusic} title="Play or load background music">{musicOn ? <Pause size={16} /> : <Headphones size={16} />}<span>MUSIC</span></button>
        <button className="dock-load" onClick={() => setShowMusicPicker((v) => !v)} title="Load your own MP3"><AudioLines size={16} /></button>
      </div>

      <AnimatePresence>
        {showMusicPicker && <motion.div className="music-popover" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }}>
          <button className="popover-close" onClick={() => setShowMusicPicker(false)}><X size={15} /></button>
          <span className="eyebrow"><i /> AUDIO SYSTEM</span><h3>AMBIENT AUDIO</h3>
          <p>{musicName}</p>
          <button className="load-track-button" onClick={() => fileRef.current?.click()}><Play size={14} /> SELECT AUDIO FILE</button>
          <small>Choose an MP3 or audio file from your device. Playback starts after selection.</small>
          <input ref={fileRef} type="file" accept="audio/*" hidden onChange={(event) => loadMusic(event.target.files?.[0])} />
        </motion.div>}
      </AnimatePresence>

      <div className="scroll-progress"><motion.i style={{ scaleX: scrollProgress }} /></div>
      <div className="ambient-label"><span>SG</span> / DIGITAL UNIVERSE</div>
    </main>
  );
}
