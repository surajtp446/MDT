import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import PlantsPage from '@/pages/PlantsPage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

/* Gentle smooth scroll powered by Lenis */
function LenisScroll() {
  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <LenisScroll />
      <ScrollToTop />
      <Header />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/plants" element={<PlantsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
