import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/data/animations';

export const PRODUCTS = [
  {
    name: 'Paddy Dryer',
    type: 'Heat-exchange drying system',
    tag: 'Core Product',
    desc: 'Uniform moisture reduction from 24% to 14% with minimum broken rice. Low fuel consumption.',
    capacity: 'Up to 100 TPD',
  },
  {
    name: 'Paddy Parboiling Unit',
    type: 'Steam parboiling system',
    tag: 'Bestseller',
    desc: 'Complete parboiling line with soaking tanks, steaming vessels, and dryer integration.',
    capacity: '5 TPH – 50 TPH',
  },
  {
    name: 'Grain / Paddy Silos',
    type: 'Steel storage silos',
    tag: 'Storage',
    desc: 'Airtight flat-bottom and hopper-bottom silos for long-term grain storage. Galvanized construction.',
    capacity: '50 MT – 5000 MT',
  },
  {
    name: 'Belt Conveyor',
    type: 'Material transport system',
    tag: 'Infrastructure',
    desc: 'Heavy-duty belt conveyors for paddy, rice, and grain handling. Custom length and incline.',
    capacity: 'Up to 200 TPH',
  },
  {
    name: 'Chain / Bucket Elevator',
    type: 'Vertical grain lift',
    tag: 'Infrastructure',
    desc: 'Tall-rise paddy and grain elevators for multi-floor mill and silo filling systems.',
    capacity: 'Up to 100 TPH',
  },
  {
    name: 'Complete Plant Design',
    type: 'Turnkey project',
    tag: 'Turnkey',
    desc: 'End-to-end paddy processing plant — design, manufacture, civil, installation and commissioning.',
    capacity: 'Any scale',
    highlight: true,
  },
];

export function ProductCard({ product, asMotion = true }) {
  const Wrapper = asMotion ? motion.div : 'div';
  const wrapperProps = asMotion ? { variants: staggerItem } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative flex flex-col bg-brand-card border-t-2 p-7 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(26,23,18,0.06)] ${
        product.highlight
          ? 'border-brand-gold'
          : 'border-transparent hover:border-brand-gold'
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <span
          className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 ${
            product.highlight
              ? 'bg-brand-goldsoft text-brand-ink'
              : 'bg-brand-mist text-brand-gold'
          }`}
        >
          {product.tag}
        </span>
      </div>

      <h3 className="font-bold text-xl text-brand-ink mb-1">{product.name}</h3>
      <p className="text-brand-muted text-xs uppercase tracking-wider mb-4">
        {product.type}
      </p>
      <p className="text-brand-muted text-sm leading-relaxed mb-6 flex-1">
        {product.desc}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="inline-block bg-brand-mist text-brand-gold text-xs font-medium px-3 py-1.5">
          {product.capacity}
        </span>
        <Link
          to="/contact"
          className="text-brand-muted group-hover:text-brand-gold transition-colors"
          aria-label={`Enquire about ${product.name}`}
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </Wrapper>
  );
}

export default function ProductsSection() {
  return (
    <section className="bg-brand-paper py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-brand-gold text-xs tracking-[0.25em] uppercase">
              From our factory
            </span>
            <h2 className="font-black text-4xl sm:text-5xl text-brand-ink tracking-tight mt-3">
              Machinery built to last
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-brand-ink font-semibold text-sm whitespace-nowrap border-b border-brand-gold/50 pb-1 hover:border-brand-gold transition-colors"
          >
            View all products
            <ArrowRight
              size={16}
              className="text-brand-gold transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-line"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
