"use client";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Head from "next/head";
import {
  FiCpu,
  FiTrendingUp,
  FiCompass,
  FiGrid,
  FiLink,
  FiLayers,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const SEO = {
  title: "Rifky Setiawan | Let's Build Together",
  description:
    "Ready to start something great? Reach out for projects, consultation, or collaboration.",
  keywords:
    "Rifky Setiawan, contact, collaborate, data science, AI engineer, consultation",
};

type Particle = {
  angleRad: number;
  distance: number;
  size: number;
  delay: number;
  pill?: boolean;
};
const particles: Particle[] = Array.from({ length: 32 }).map((_, i) => ({
  angleRad: Math.random() * Math.PI * 2,
  distance: 120 + Math.random() * 220,
  size: 8 + Math.random() * 10,
  delay: i * 0.05,
  pill: Math.random() > 0.7,
}));

const collab = [
  {
    icon: <FiCpu className="w-5 h-5 text-cyan-300" />,
    title: "Data & ML Pipelines",
    desc: "Clean data ingestion, model training, evaluation, and monitoring tuned to business KPIs.",
    tags: ["Data contracts", "Eval loops", "Observability"],
  },
  {
    icon: <FiTrendingUp className="w-5 h-5 text-emerald-300" />,
    title: "Product Experiments",
    desc: "Ship lightweight experiments (dashboards, microservices, feature tests) to learn fast.",
    tags: ["Rapid protos", "Dashboards", "Feature flags"],
  },
  {
    icon: <FiCompass className="w-5 h-5 text-blue-300" />,
    title: "Tech Guidance",
    desc: "Architecture reviews, stack decisions, and actionable next steps for your team.",
    tags: ["Architecture", "Roadmaps", "Reviews"],
  },
];

const flows = [
  {
    id: "build",
    label: "Build Sprint",
    accent: "from-cyan-400 via-sky-400 to-emerald-400",
    summary: "Ship a measurable v1 in ~2-3 weeks with instrumentation baked in.",
    phases: [
      { title: "Discovery", detail: "45m call, success metric, non-goals" },
      { title: "Prototype", detail: "Clickable demo or API spike to validate" },
      { title: "Pilot", detail: "Hardened slice + observability for rollout" },
    ],
    metric: "Fast lane",
  },
  {
    id: "automate",
    label: "Automation Track",
    accent: "from-emerald-400 via-teal-400 to-blue-400",
    summary: "Replace manual loops with monitored jobs, alerts, and human-in-the-loop safeguards.",
    phases: [
      { title: "Map", detail: "Identify repetitive flows + owners" },
      { title: "Wire", detail: "Integrate data, APIs, and review gates" },
      { title: "Monitor", detail: "Set SLOs, alerts, dashboards, and fallbacks" },
    ],
    metric: "Ops steady",
  },
  {
    id: "advise",
    label: "Technical Advisory",
    accent: "from-indigo-400 via-blue-400 to-cyan-400",
    summary: "Bring a sounding board for architecture, stack choices, and hiring signals.",
    phases: [
      { title: "Pulse", detail: "Context download + constraints" },
      { title: "Decide", detail: "Decision doc with trade-offs + next 3 moves" },
      { title: "Pair", detail: "Working session or review to unblock teams" },
    ],
    metric: "Guided",
  },
];

export default function ContactCta() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 40, damping: 10, mass: 0.8 });
  const smoothY = useSpring(cursorY, { stiffness: 40, damping: 10, mass: 0.8 });
  const smoothGlowX = useSpring(glowX, { stiffness: 50, damping: 12 });
  const smoothGlowY = useSpring(glowY, { stiffness: 50, damping: 12 });
  const parallaxX = useTransform(smoothX, (v) => v * 0.02);
  const parallaxY = useTransform(smoothY, (v) => v * 0.02);
  const [activeFlow, setActiveFlow] = useState(flows[0]);
  const [flowLocked, setFlowLocked] = useState(false);
  const [activeTile, setActiveTile] = useState(0);
  const [tileLocked, setTileLocked] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cursorX.set(x);
    cursorY.set(y);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
    setHover(true);
  };

  const handleLeave = () => setHover(false);

  useEffect(() => {
    if (flowLocked) return;
    const id = setInterval(() => {
      setActiveFlow((prev) => {
        const idx = flows.findIndex((f) => f.id === prev.id);
        return flows[(idx + 1) % flows.length];
      });
    }, 5200);
    return () => clearInterval(id);
  }, [flowLocked]);

  useEffect(() => {
    if (tileLocked) return;
    const id = setInterval(() => {
      setActiveTile((prev) => (prev + 1) % collab.length);
    }, 4200);
    return () => clearInterval(id);
  }, [tileLocked]);

  const activeCard = collab[activeTile];

  return (
    <>
      <Head>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
      </Head>

      <div className="relative w-full text-white py-16 md:py-24 px-4 md:px-6">
        {/* keep global background; add subtle overlay for cohesion */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,234,212,0.05),_transparent_50%)]" />
        </div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={handleLeave}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-3xl shadow-2xl border border-slate-800/80 backdrop-blur-md overflow-hidden"
        >
          {/* background tint to stay consistent */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-cyan-100/5 pointer-events-none" />

          {/* hover-driven orbiting particles */}
          {particles.map((p, idx) => (
            <motion.span
              key={idx}
              className="absolute left-1/2 top-1/2 block bg-gradient-to-br from-cyan-300/80 via-cyan-200/60 to-emerald-300/60"
              style={{
                width: p.pill ? p.size * 1.6 : p.size,
                height: p.size,
                borderRadius: p.pill ? p.size : "999px",
                filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.35))",
              }}
              animate={{
                x:
                  Math.cos(p.angleRad) * p.distance * (hover ? 1 : 0.78) +
                  smoothX.get() * 0.18,
                y:
                  Math.sin(p.angleRad) * p.distance * (hover ? 1 : 0.78) +
                  smoothY.get() * 0.18,
                opacity: hover ? 0.95 : 0.6,
                rotate: hover ? 4 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 12,
                mass: 0.7,
                restDelta: 0.004,
                delay: p.delay,
              }}
            />
          ))}

          {/* cursor glow */}
          <motion.div
            className="pointer-events-none absolute w-56 h-56 rounded-full bg-cyan-500/12 blur-3xl"
            style={{
              left: smoothGlowX,
              top: smoothGlowY,
              x: "-50%",
              y: "-50%",
              opacity: hover ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
          />

          <div className="relative z-10 px-6 sm:px-10 py-10 sm:py-14 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 text-center"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-cyan-300">
                LET&apos;S COLLABORATE
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Interactive Collaboration Deck
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
                Move your cursor to wake the orbit, tap a track to lock it, and hover a tile to see how we can work together without the corporate stiffness.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-7 text-left">
                <div className="lg:col-span-2">
                  <div className="relative rounded-2xl border border-slate-800 bg-white/5 backdrop-blur-lg p-5 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-blue-500/10"
                      style={{ x: parallaxX, y: parallaxY, opacity: hover ? 0.35 : 0.18 }}
                    />
                    <div className="relative flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                          Collab modes
                        </p>
                        <p className="text-sm text-slate-300">Pick a lane or let it autoplay</p>
                      </div>
                      <motion.span
                        layout
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/50 bg-cyan-500/10 text-cyan-100 shadow-cyan-500/10 shadow-sm"
                        animate={{ scale: hover ? 1.03 : 1 }}
                      >
                        {activeFlow.metric}
                      </motion.span>
                    </div>

                    <LayoutGroup>
                      <div className="flex flex-wrap gap-2">
                        {flows.map((flow) => (
                          <button
                            key={flow.id}
                            onMouseEnter={() => {
                              setActiveFlow(flow);
                              setFlowLocked(true);
                            }}
                            onMouseLeave={() => setFlowLocked(false)}
                            onFocus={() => setFlowLocked(true)}
                            onBlur={() => setFlowLocked(false)}
                            className="relative overflow-hidden rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 text-sm font-semibold text-slate-200 transition-colors focus:outline-none"
                          >
                            {activeFlow.id === flow.id && (
                              <motion.span
                                layoutId="flow-pill"
                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${flow.accent} opacity-30`}
                                transition={{ type: "spring", stiffness: 250, damping: 28 }}
                              />
                            )}
                            <span className="relative z-10">{flow.label}</span>
                          </button>
                        ))}
                      </div>
                    </LayoutGroup>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFlow.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="relative mt-5 space-y-4"
                      >
                        <p className="text-sm text-slate-200/90 leading-relaxed">
                          {activeFlow.summary}
                        </p>

                        <div className="grid gap-3">
                          {activeFlow.phases.map((phase, index) => (
                            <motion.div
                              key={phase.title}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.08 * index }}
                              className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 shadow-inner shadow-black/10"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <motion.span
                                    className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                                    animate={{
                                      scale: hover ? [1, 1.1, 1] : 1,
                                      opacity: [0.7, 1, 0.7],
                                    }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.1 }}
                                  />
                                  <p className="text-sm font-semibold text-white">
                                    {index + 1}. {phase.title}
                                  </p>
                                </div>
                                <span className="text-[11px] text-cyan-200/80">Live</span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1">{phase.detail}</p>
                              <div className="relative mt-2 h-[3px] overflow-hidden rounded-full bg-slate-800">
                                <motion.span
                                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${activeFlow.accent}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${68 + index * 10}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-4">
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
                    onMouseLeave={() => setTileLocked(false)}
                  >
                    {collab.map((item, idx) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + idx * 0.08 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        onMouseEnter={() => {
                          setActiveTile(idx);
                          setTileLocked(true);
                        }}
                        className={`relative rounded-2xl border backdrop-blur-md p-5 text-left shadow-lg shadow-black/30 transition-all duration-300 ${activeTile === idx
                          ? "border-cyan-400/60 bg-white/10"
                          : "border-slate-800 bg-white/5"
                          }`}
                      >
                        {activeTile === idx && (
                          <motion.span
                            layoutId="tile-glow"
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-blue-500/10 pointer-events-none"
                            transition={{ type: "spring", stiffness: 220, damping: 26 }}
                          />
                        )}
                        <div className="relative flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-slate-700 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/80">
                              {activeTile === idx ? "Pinned" : "Preview"}
                            </p>
                          </div>
                        </div>
                        <p className="relative text-sm text-slate-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCard.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-5 shadow-lg shadow-cyan-500/10"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10"
                        animate={{ opacity: [0.35, 0.15, 0.35] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="relative flex flex-wrap items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-cyan-500/30 flex items-center justify-center">
                          {activeCard.icon}
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                            Active lane
                          </p>
                          <h3 className="text-xl font-semibold text-white">
                            {activeCard.title}
                          </h3>
                        </div>
                        <motion.span
                          className="relative px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-100 text-xs font-semibold"
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        >
                          Smooth handoff
                        </motion.span>
                      </div>
                      <p className="relative mt-3 text-sm text-slate-200 leading-relaxed">
                        {activeCard.desc}
                      </p>
                      <div className="relative mt-3 flex flex-wrap gap-2">
                        {activeCard.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/5 border border-slate-700 text-xs font-semibold text-slate-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                <motion.a
                  href="/projects"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/30 border border-cyan-400/40"
                >
                  <FiGrid className="w-5 h-5" />
                  Explore Work
                </motion.a>

                <motion.a
                  href="/resume"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-slate-700 bg-slate-800 text-white font-semibold shadow-md hover:border-cyan-400/60 hover:shadow-cyan-500/20"
                >
                  <FiLayers className="w-5 h-5" />
                  Process & Resume
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-cyan-400/50 bg-white/5 text-cyan-100 font-semibold shadow-md hover:border-cyan-300/60 hover:shadow-cyan-500/20"
                >
                  <FiLink className="w-5 h-5" />
                  Start a Discovery
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
