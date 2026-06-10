import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/data/animations';

const INDUSTRIES = [
  'Rice Mills & Paddy Processors',
  'Agricultural Cooperatives',
  'State Procurement Agencies (FCI, Markfed)',
  'Sunflower & Groundnut Oil Mills',
  'Grain Storage & Warehousing',
  'Agri-Export Businesses',
  'Government Food Corporations',
  'Private Grain Traders',
];

const REGIONS = [
  'Karnataka · Andhra Pradesh · Telangana',
  'Tamil Nadu · Kerala · West Bengal',
  'Odisha · Chhattisgarh · Punjab',
  'Bangladesh · Sri Lanka · Nepal',
  'Indonesia · Myanmar',
];

export default function ServingBand() {
  return (
    <section className="bg-brand-paper py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-brand-gold text-xs tracking-[0.25em] uppercase">
            Who we serve
          </span>
          <h2 className="font-black text-4xl sm:text-5xl text-brand-ink tracking-tight mt-3">
            Built for the people who feed nations
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h3 className="text-brand-muted text-xs uppercase tracking-[0.25em] mb-7">
              Industries
            </h3>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-4"
            >
              {INDUSTRIES.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="flex items-center gap-3 text-brand-ink text-base sm:text-lg border-b border-brand-line pb-4"
                >
                  <span className="text-brand-gold">✦</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <h3 className="text-brand-muted text-xs uppercase tracking-[0.25em] mb-7">
              Geographies
            </h3>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-4"
            >
              {REGIONS.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-brand-ink text-base sm:text-lg border-b border-brand-line pb-4"
                >
                  <MapPin size={18} className="text-brand-gold mt-1 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-8 inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-gold/[0.06] px-4 py-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span className="text-brand-muted text-sm">
                Plants running across 8 countries
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
