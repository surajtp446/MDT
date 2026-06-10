// Shared framer-motion animation variants for MDT — Mysore Drier Tech

export const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stacked-section style — sections appear to slide over each other
export const stackedSection = {
  borderRadius: '20px 20px 0 0',
  marginTop: -20,
  boxShadow: '0 -12px 40px rgba(0,0,0,0.8)',
};

// Text scramble characters for the hero
export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%';
