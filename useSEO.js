import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 2001, label: 'Year Established', suffix: '', plain: true },
  { value: 1000, label: 'Plants Built Worldwide', suffix: '+' },
  { value: 650, label: 'Satisfied Clients', suffix: '+' },
  { value: 8, label: 'Countries Served', suffix: '' },
];

function useCountUp(target, active, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    let start;
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const tick = (now) => {
      if (start === undefined) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function Stat({ stat, active }) {
  const value = useCountUp(stat.value, active, 1500);
  return (
    <div className="relative pl-5 border-l border-brand-gold/40">
      <div className="font-black text-4xl sm:text-5xl text-brand-ink tracking-tight leading-none">
        {value}
        {stat.suffix}
      </div>
      <div className="text-brand-muted text-xs sm:text-sm uppercase tracking-[0.2em] mt-3">
        {stat.label}
      </div>
    </div>
  );
}

export default function CredibilityBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-brand-mist py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-brand-gold text-xs tracking-[0.25em] uppercase">
            Two decades of engineering
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-brand-ink mt-3">
            Trusted across the rice belt
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {STATS.map((stat) => (
            <Stat key={stat.label} stat={stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
