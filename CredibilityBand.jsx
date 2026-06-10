import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Plants', to: '/plants' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Logo() {
  return (
    <Link to="/" className="flex items-baseline select-none" aria-label="MDT — Mysore Drier Tech home">
      <span className="font-black text-2xl tracking-tighter text-brand-ink">
        MDT
        <span className="text-brand-gold font-medium text-[11px] sm:text-sm ml-2 tracking-[0.2em] uppercase">
          Mysore Drier Tech
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9995] transition-all duration-300 ${
          scrolled
            ? 'bg-brand-paper/85 backdrop-blur-md border-b border-brand-line py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide transition-colors duration-200 pb-1 ${
                    isActive
                      ? 'text-brand-ink border-b-2 border-brand-gold'
                      : 'text-brand-muted hover:text-brand-ink border-b-2 border-transparent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="ml-2 text-sm font-semibold text-brand-paper bg-brand-ink hover:opacity-90 px-5 py-2 transition-opacity"
            >
              Get a quote
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-brand-ink p-1"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9994] bg-brand-paper lg:hidden flex flex-col"
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.4 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block text-3xl font-bold py-3 tracking-tight ${
                        isActive ? 'text-brand-gold' : 'text-brand-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  className="text-base font-semibold text-brand-paper bg-brand-ink px-8 py-3"
                >
                  Get a quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
