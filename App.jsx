import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Share your requirements',
    description:
      'Tell us your crop type, throughput (tonnes/hour), site location, and budget. Whether it is a single dryer or a full plant — we begin with your numbers.',
    detail: 'Paddy · Sunflower · Groundnut · Maize — any crop',
    icon: 'doc',
  },
  {
    number: '02',
    title: 'We design the plant',
    description:
      'Our engineering team produces a custom plant layout, equipment specification, civil requirement drawing, and budgetary quote — within 5 working days.',
    detail: 'Detailed layout drawings included at no charge',
    icon: 'compass',
  },
  {
    number: '03',
    title: 'Manufactured & commissioned',
    description:
      'All equipment is manufactured at our Tumkur factory, tested, then delivered and installed by our field team. We commission, calibrate, and hand over running.',
    detail: 'Full installation and commissioning by MDT engineers',
    icon: 'factory',
  },
];

function StepIcon({ name }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#9A6A14',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (name === 'doc') {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13l-4 4-2-2" />
      </svg>
    );
  }
  if (name === 'compass') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <polygon points="16 8 10 10 8 16 14 14 16 8" />
        <circle cx="12" cy="12" r="1" fill="#9A6A14" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M2 20h20" />
      <path d="M4 20V9l5 3V9l5 3V6l5 3v11" />
      <path d="M8 20v-4M14 20v-4" />
    </svg>
  );
}

function StepCard({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-brand-card p-8 sm:p-10 overflow-hidden border border-brand-line"
    >
      <span className="absolute -top-6 -right-2 font-black text-[8rem] text-brand-ink/[0.04] leading-none select-none pointer-events-none">
        {step.number}
      </span>

      <div className="relative z-10">
        <div className="w-14 h-14 flex items-center justify-center border border-brand-gold/30 bg-brand-gold/[0.06] mb-7">
          <StepIcon name={step.icon} />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-brand-gold font-black text-sm">
            {step.number}
          </span>
          <span className="h-px w-8 bg-brand-gold/40" />
        </div>
        <h3 className="font-bold text-xl text-brand-ink mb-3">{step.title}</h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-5">
          {step.description}
        </p>
        <p className="text-brand-gold text-xs font-medium">{step.detail}</p>
      </div>

      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-gold/50 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="bg-brand-mist py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-brand-gold text-xs tracking-[0.25em] uppercase">
            How we work
          </span>
          <h2 className="font-black text-4xl sm:text-5xl text-brand-ink tracking-tight mt-3">
            From your numbers to a running plant
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
