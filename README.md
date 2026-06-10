import { motion } from 'framer-motion';
import { Wrench, Leaf, HeartHandshake } from 'lucide-react';
import { pageVariants, staggerContainer, staggerItem } from '@/data/animations';
import useSEO from '@/hooks/useSEO';
import CredibilityBand from '@/components/CredibilityBand';

const VALUES = [
  {
    title: 'Quality Engineering',
    desc: 'Every machine is built at our Tumkur factory to specification and stress-tested before it ships. Precision is not optional.',
    Icon: Wrench,
  },
  {
    title: 'Eco-Friendly Design',
    desc: 'Low fuel and power consumption, cleaner exhaust, and efficient heat exchange — engineering that respects margins and the environment.',
    Icon: Leaf,
  },
  {
    title: 'Client-Centric Service',
    desc: 'From the first drawing to commissioning and after-sales support, we design around your crop, your site, and your throughput.',
    Icon: HeartHandshake,
  },
];

const EXPERTISE = [
  'Engineers',
  'CAD Designers',
  'Field Technicians',
  'Quality Controllers',
];

export default function AboutPage() {
  useSEO({
    title: 'About | MDT — Mysore Drier Tech, Est. 2001, Tumkur',
    description:
      'Since 2001, Mysore Drier Tech has been one of India\'s most reputed manufacturers of paddy driers, parboiling units, conveyors, elevators and silos — built to client specification.',
    canonical: 'https://www.mdtindia.net/about',
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28"
    >
      {/* hero banner */}
      <section className="relative bg-brand-paper py-20 sm:py-28 overflow-hidden">
        <span className="absolute inset-x-0 top-10 text-center font-black text-[20vw] sm:text-[14rem] text-brand-ink/[0.03] leading-none select-none pointer-events-none">
          Since 2001
        </span>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
          <span className="text-brand-gold text-xs tracking-[0.25em] uppercase">
            Our company
          </span>
          <h1 className="font-black text-5xl sm:text-7xl text-brand-ink tracking-tight mt-4">
            About MDT
          </h1>
        </div>
      </section>

      {/* story */}
      <section className="bg-brand-card py-20 sm:py-24 border-y border-brand-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-brand-ink/80 text-lg leading-relaxed"
          >
            <p>
              Inspired by a vision to lead the grain processing machinery
              market, Mysore Drier Tech was established in 2001 in Tumkur,
              Karnataka. Our machines are in demand across Asia for uniform
              drying, low fuel and power consumption, minimal broken rice
              output, eco-friendly operation, and low maintenance.
            </p>
            <p>
              Today MDT is one of India&apos;s most reputed manufacturers and
              suppliers of paddy driers, parboiling units, belt and chain
              conveyors, elevators, and rice and paddy silos — all designed to
              client specification and built to last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* stats */}
      <CredibilityBand />

      {/* values */}
      <section className="bg-brand-paper py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-black text-3xl sm:text-4xl text-brand-ink tracking-tight mb-12"
          >
            What we build on
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {VALUES.map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="bg-brand-card border border-brand-line p-8"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-brand-gold/30 bg-brand-gold/[0.06] mb-6">
                  <Icon size={22} className="text-brand-gold" />
                </div>
                <h3 className="font-bold text-xl text-brand-ink mb-3">{title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* expertise */}
      <section className="bg-brand-mist py-20 border-t border-brand-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <span className="text-brand-gold text-xs tracking-[0.25em] uppercase">
            The team
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-brand-ink mt-3 mb-10">
            Engineered by specialists
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-line">
            {EXPERTISE.map((role) => (
              <div key={role} className="bg-brand-card p-8 text-center">
                <span className="text-brand-ink font-medium text-lg">
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
