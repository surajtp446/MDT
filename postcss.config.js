import { motion } from 'framer-motion';
import { pageVariants } from '@/data/animations';
import useSEO from '@/hooks/useSEO';

import HeroSection from '@/components/HeroSection';
import ValueStrip from '@/components/ValueStrip';
import GrainJourney from '@/components/GrainJourney';
import CredibilityBand from '@/components/CredibilityBand';
import ProductsSection from '@/components/ProductsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ServingBand from '@/components/ServingBand';

export default function HomePage() {
  useSEO({
    title:
      'MDT | Mysore Drier Tech — Paddy Dryer Manufacturer India | Grain Processing Plants',
    description:
      'Mysore Drier Tech (MDT), Tumkur — India\'s leading manufacturer of paddy dryers, parboiling units, grain silos, and complete grain processing plants. Est. 2001. 1000+ plants in 8 countries.',
    canonical: 'https://www.mdtindia.net',
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <ValueStrip />
      <GrainJourney />
      <CredibilityBand />
      <ProductsSection />
      <HowItWorksSection />
      <ServingBand />
    </motion.div>
  );
}
