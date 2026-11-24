import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-4 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl ${light ? 'text-charcoal' : 'text-cream'}`}>{title}</h2>
      {children && <div className={`mt-6 text-lg leading-relaxed ${light ? 'text-charcoal/75' : 'text-cream/70'}`}>{children}</div>}
    </div>
  );
}

type BtnProps = { to: string; children: ReactNode; variant?: 'solid' | 'outline' | 'dark' };

export function ButtonLink({ to, children, variant = 'solid' }: BtnProps) {
  const styles = {
    solid: 'bg-gold text-charcoal hover:bg-cream',
    outline: 'border border-cream/40 text-cream hover:border-gold hover:text-gold',
    dark: 'bg-charcoal text-cream hover:bg-forest',
  }[variant];
  return (
    <Link to={to} className={`inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ${styles}`}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function PageHero({ eyebrow, title, intro, image, imageAlt, position = 'center' }: { eyebrow: string; title: ReactNode; intro: ReactNode; image?: string; imageAlt?: string; position?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest pb-20 pt-36 sm:pb-28 sm:pt-44">
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
          <img src={image} alt={imageAlt ?? ''} className="hero-zoom size-full object-cover" style={{ objectPosition: position }} />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/30 to-transparent" />
        </div>
      )}
      <Container className="relative">
        <div className="fade-up max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-tight text-cream sm:text-7xl">{title}</h1>
          <div className="mt-7 text-lg leading-relaxed text-cream/75">{intro}</div>
        </div>
      </Container>
    </section>
  );
}

export function SpotifyButton({ href, label = 'Listen on Spotify' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex shrink-0 items-center gap-3 rounded-full border border-gold/70 px-7 py-3.5 text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-charcoal"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86Zm1.22-2.73a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 0 1-.45-1.5c3.63-1.1 8.15-.57 11.24 1.33.37.22.48.71.25 1.08Zm.1-2.84C14.7 8.92 9.38 8.74 6.3 9.68a.94.94 0 1 1-.54-1.8c3.53-1.07 9.42-.86 13.13 1.34a.94.94 0 0 1-.96 1.61Z" />
      </svg>
      {label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function AppleMusicButton({ href, label = 'Listen on Apple Music' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex shrink-0 items-center gap-3 rounded-full border border-gold/70 px-7 py-3.5 text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-charcoal"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M17.5 3.2 9.3 4.9a.9.9 0 0 0-.7.88v9.3a2.9 2.9 0 0 0-1.4-.35c-1.6 0-2.9 1.1-2.9 2.45S5.6 19.6 7.2 19.6s2.9-1.1 2.9-2.45V9.4l6.9-1.45v5.6a2.9 2.9 0 0 0-1.4-.35c-1.6 0-2.9 1.1-2.9 2.45s1.3 2.45 2.9 2.45 2.9-1.1 2.9-2.45V4.08a.9.9 0 0 0-1-.88Z" />
      </svg>
      {label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
