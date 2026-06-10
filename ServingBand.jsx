import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * GrainJourney — the signature scroll piece, kept quiet.
 * A thin stream of rice grains follows the processing line and shifts
 * from raw green paddy → warm dried gold → pale polished rice as the
 * reader scrolls, settling into a small pile at the end. Muted tones,
 * hairline guide, no glow — at home in a minimalist light layout.
 * ------------------------------------------------------------------ */

const STAGES = [
  {
    num: '01',
    kicker: 'Intake · Raw Paddy',
    title: 'It starts at\n24% moisture.',
    body: 'Freshly harvested paddy arrives wet and unstable — prone to cracking, spoilage and weight loss. The path to market-grade rice begins the moment it enters the line.',
    stat: '24%',
    statLabel: 'Incoming moisture, every harvest',
    cta: { label: 'See the process', to: '/services' },
  },
  {
    num: '02',
    kicker: 'Precision Drying',
    title: 'Moisture out.\nQuality in.',
    body: 'MDT driers bring moisture down to a stable 14% with ±0.5% uniformity across the whole batch — the difference between broken grain and whole, premium rice.',
    stat: '±0.5%',
    statLabel: 'Moisture uniformity, guaranteed',
    cta: { label: 'See driers', to: '/products' },
  },
  {
    num: '03',
    kicker: 'Energy Efficiency',
    title: 'Less fuel.\nMore rice.',
    body: 'A considered heat-exchange design runs 18–22% more fuel-efficient than conventional driers. Lower cost per tonne is the baseline, not a feature.',
    stat: '22%',
    statLabel: 'Fuel saved vs conventional systems',
    cta: { label: 'View specs', to: '/products' },
  },
  {
    num: '04',
    kicker: 'Polished & Proven',
    title: 'Market-grade rice.\n1000+ plants.',
    body: 'Uniform, ready for the mill — across India, Bangladesh, Sri Lanka, Nepal and beyond. The same grain quality, every batch, since 2001.',
    stat: '8',
    statLabel: 'Countries running MDT plants',
    cta: { label: 'See plants', to: '/plants' },
  },
];

/* processing-line path, in viewport fractions */
const PATH = [
  { x: 0.08, y: 0.20 },
  { x: 0.24, y: 0.30 },
  { x: 0.34, y: 0.52 },
  { x: 0.50, y: 0.46 },
  { x: 0.64, y: 0.40 },
  { x: 0.76, y: 0.52 },
  { x: 0.90, y: 0.72 },
];

/* muted colour stops: green paddy → khaki → gold → cream → pale rice */
const GRAIN_STOPS = [
  { at: 0.0, c: [150, 158, 104] },
  { at: 0.3, c: [186, 166, 110] },
  { at: 0.56, c: [200, 149, 44] },
  { at: 0.8, c: [214, 198, 162] },
  { at: 1.0, c: [232, 222, 200] },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function grainColor(s) {
  const x = Math.max(0, Math.min(1, s));
  for (let i = 0; i < GRAIN_STOPS.length - 1; i++) {
    const a = GRAIN_STOPS[i];
    const b = GRAIN_STOPS[i + 1];
    if (x >= a.at && x <= b.at) {
      const t = (x - a.at) / (b.at - a.at || 1);
      return [
        Math.round(lerp(a.c[0], b.c[0], t)),
        Math.round(lerp(a.c[1], b.c[1], t)),
        Math.round(lerp(a.c[2], b.c[2], t)),
      ];
    }
  }
  return GRAIN_STOPS[GRAIN_STOPS.length - 1].c;
}

function pathAt(s) {
  const x = Math.max(0, Math.min(0.9999, s));
  const seg = x * (PATH.length - 1);
  const i = Math.floor(seg);
  const t = seg - i;
  const p0 = PATH[i];
  const p1 = PATH[Math.min(PATH.length - 1, i + 1)];
  return {
    x: lerp(p0.x, p1.x, t),
    y: lerp(p0.y, p1.y, t),
    angle: Math.atan2(p1.y - p0.y, p1.x - p0.x),
  };
}

const GRAIN_COUNT = 150;

function makeGrains() {
  const grains = [];
  for (let i = 0; i < GRAIN_COUNT; i++) {
    grains.push({
      u: Math.random(),
      lane: (Math.random() - 0.5) * 0.04,
      len: 8 + Math.random() * 5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.4 + Math.random() * 0.9,
      spin: (Math.random() - 0.5) * 0.5,
      size: 0.8 + Math.random() * 0.4,
    });
  }
  return grains;
}

function drawGrain(ctx, x, y, angle, len, color, alpha) {
  const w = len;
  const h = len * 0.42;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  // hairline edge so pale grains still read on the paper background
  ctx.globalAlpha = alpha * 0.35;
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = 'rgba(26,23,18,0.5)';
  ctx.stroke();
  ctx.restore();
}

function GrainCanvas({ scrollRef, reduceMotion }) {
  const canvasRef = useRef(null);
  const grainsRef = useRef(makeGrains());
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const smooth = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener('pointermove', onMove);

    const drawGuide = (parX, parY) => {
      ctx.save();
      ctx.translate(parX, parY);
      ctx.strokeStyle = 'rgba(26,23,18,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let s = 0; s <= 1.0001; s += 0.02) {
        const p = pathAt(s);
        const px = p.x * W;
        const py = p.y * H;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      const target = reduceMotion ? 0.5 : scrollRef.current;
      smooth.current += (target - smooth.current) * 0.07;
      const prog = smooth.current;
      const now = performance.now() / 1000;

      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.04;
      m.y += (m.ty - m.y) * 0.04;
      const parX = -m.x * 16;
      const parY = -m.y * 12;

      ctx.clearRect(0, 0, W, H);
      drawGuide(parX, parY);

      const grains = grainsRef.current;
      const flow = prog * 0.5;
      const idle = reduceMotion ? 0 : now * 0.01;

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];
        let s = (g.u + flow + idle) % 1;
        if (s < 0) s += 1;

        const p = pathAt(s);
        const wob = reduceMotion
          ? 0
          : Math.sin(now * g.wobbleSpeed + g.wobble) * 0.01;
        const nx = Math.cos(p.angle + Math.PI / 2);
        const ny = Math.sin(p.angle + Math.PI / 2);
        const off = (g.lane + wob) * H;

        const x = p.x * W + nx * off + parX;
        const y = p.y * H + ny * off + parY;

        const colorS = Math.min(1, s * 0.85 + prog * 0.18);
        const color = grainColor(colorS);
        const alpha = Math.min(1, s < 0.05 ? s / 0.05 : 1) * 0.9;
        const angle = p.angle + g.spin + (reduceMotion ? 0 : wob * 5);

        drawGrain(ctx, x, y, angle, g.len * g.size, color, alpha);
      }

      // small polished-rice pile at the output, grows with scroll
      const pileH = H * 0.13 * Math.min(1, Math.max(0, (prog - 0.5) / 0.5));
      if (pileH > 1) {
        const baseX = W * 0.9 + parX;
        const baseY = H * 0.78 + parY;
        ctx.save();
        ctx.fillStyle = '#E8DEC8';
        ctx.beginPath();
        ctx.moveTo(baseX - pileH, baseY);
        ctx.quadraticCurveTo(baseX, baseY - pileH * 1.5, baseX + pileH, baseY);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(26,23,18,0.4)';
        ctx.stroke();
        ctx.restore();
      }

      if (!reduceMotion) rafRef.current = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      smooth.current = 0.5;
      render();
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [scrollRef, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

function NarrativeFrame({ frame, index, total, progress }) {
  const inStart = index / total;
  const inEnd = index === 0 ? 0.03 : index / total + 0.06;
  const outStart = (index + 1) / total - 0.06;
  const outEnd = (index + 1) / total;

  const opacity = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [30, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-end lg:items-center pb-20 lg:pb-0 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="max-w-md pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-gold font-black text-sm">
              {frame.num}
            </span>
            <span className="text-brand-muted text-xs tracking-[0.25em] uppercase">
              {frame.kicker}
            </span>
          </div>
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-tight text-brand-ink mb-5 whitespace-pre-line">
            {frame.title}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-6">
            {frame.body}
          </p>
          <div className="flex items-baseline gap-4 mb-7">
            <span className="font-black text-5xl sm:text-6xl text-brand-gold tracking-tight leading-none">
              {frame.stat}
            </span>
            <span className="text-brand-muted text-sm max-w-[14rem]">
              {frame.statLabel}
            </span>
          </div>
          <Link
            to={frame.cta.to}
            className="group inline-flex items-center gap-2 text-brand-ink font-semibold text-sm border-b border-brand-gold/50 pb-1 hover:border-brand-gold transition-colors"
          >
            {frame.cta.label}
            <ArrowRight
              size={15}
              className="text-brand-gold transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function GrainJourney() {
  const ref = useRef(null);
  const scrollRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      scrollRef.current = v;
      const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
      setActive(idx < 0 ? 0 : idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section
      ref={ref}
      className="relative bg-brand-paper"
      style={{ height: `${STAGES.length * 100}vh` }}
      aria-label="The rice grain journey through MDT processing"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <GrainCanvas scrollRef={scrollRef} reduceMotion={reduceMotion} />

        {/* soft paper wash at the base keeps the copy legible over grains */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-paper via-brand-paper/40 to-transparent pointer-events-none" />

        {STAGES.map((frame, i) => (
          <NarrativeFrame
            key={frame.num}
            frame={frame}
            index={i}
            total={STAGES.length}
            progress={scrollYProgress}
          />
        ))}

        {/* stage rail */}
        <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active === i ? 'bg-brand-gold scale-125' : 'bg-brand-ink/15'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
