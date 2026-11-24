import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '../data/site';
import { Container } from './ui';

const allNav = [
  { to: '/songwriting', label: 'Songwriting' },
  { to: '/about', label: 'About' },
  { to: '/studios', label: 'Shangwe Studios' },
  { to: '/contact', label: 'Collaborate' },
];
const nav = allNav.filter((n) => site.showStudios || n.to !== '/studios');

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-charcoal/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="font-serif text-2xl text-cream" aria-label={`${site.name}, home`}>
          Makeba Shangwe
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-[0.95rem] transition-colors ${isActive ? 'text-gold' : 'text-cream/80 hover:text-cream'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center text-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </Container>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-cream/10 md:hidden">
          <Container className="flex flex-col py-4">
            {[{ to: '/', label: 'Home' }, ...nav].map((n) => (
              <NavLink key={n.to} to={n.to} end className={({ isActive }) => `py-3 font-serif text-3xl ${isActive ? 'text-gold' : 'text-cream'}`}>
                {n.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-espresso py-14">
      <Container className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-3xl text-cream">Makeba Shangwe</p>
          <p className="mt-3 text-sm text-cream/50">Songwriter, producer and A&R in training{site.showStudios && '. Founder of Shangwe Studios'}</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/60">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-gold">{n.label}</Link>
          ))}
          {site.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold">{s.label}</a>
          ))}
        </div>
      </Container>
      <Container>
        <p className="mt-10 text-xs text-cream/35">
          Original songs by Makeba Shangwe; full credits are listed on each song. © {new Date().getFullYear()} Makeba Shangwe. All rights reserved. Previews are excerpts only.
        </p>
      </Container>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col bg-charcoal">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-charcoal">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
