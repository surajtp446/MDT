import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'Plants Gallery', to: '/plants' },
  { label: 'Services', to: '/services' },
  { label: 'About MDT', to: '/about' },
  { label: 'Get a Quote', to: '/contact' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-mist border-t border-brand-line pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-baseline mb-4">
              <span className="font-black text-2xl tracking-tighter text-brand-ink">
                MDT
              </span>
              <span className="text-brand-gold font-medium text-sm ml-2 tracking-[0.2em] uppercase">
                Mysore Drier Tech
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-4">
              Manufacturers of paddy driers, parboiling units, grain silos,
              conveyors &amp; complete grain processing plants.
            </p>
            <p className="text-brand-muted/70 text-xs tracking-wide">
              Established 2001 · Tumkur, Karnataka
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-brand-muted text-xs uppercase tracking-[0.25em] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-brand-ink/80 hover:text-brand-gold text-sm transition-colors"
                  >
                    <span className="text-brand-gold/60 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-muted text-xs uppercase tracking-[0.25em] mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-brand-ink/80">
                <MapPin size={16} className="text-brand-gold mt-0.5 shrink-0" />
                <span>
                  Plot #39, 2nd Phase, KIADB Industrial Area, Antharasanahalli,
                  Tumkur - 572106, Karnataka, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-brand-ink/80">
                <Phone size={16} className="text-brand-gold shrink-0" />
                <a href="tel:+919886893467" className="hover:text-brand-gold transition-colors">
                  +91 98868 93467
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-ink/80">
                <Mail size={16} className="text-brand-gold shrink-0" />
                <a href="mailto:mdt@mdtech.in" className="hover:text-brand-gold transition-colors">
                  mdt@mdtech.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-ink/80">
                <MessageCircle size={16} className="text-brand-gold shrink-0" />
                <a
                  href="https://wa.me/918494907777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors"
                >
                  WhatsApp: +91 84949 07777
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-muted/70 text-xs">
            © 2024 Mysore Drier Tech. All rights reserved. · Tumkur, Karnataka,
            India
          </p>
          <p className="text-brand-muted/60 text-xs tracking-wide">
            Grain Processing Technology · Est. 2001
          </p>
        </div>
      </div>
    </footer>
  );
}
