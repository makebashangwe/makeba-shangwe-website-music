import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-10 ${className}`}>{children}</div>;
}

/** Heading block. `eyebrow` is optional and rendered quietly in sentence case. */
export function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow?: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={`mb-3 text-sm ${light ? 'text-espresso/70' : 'text-gold'}`}>{eyebrow}</p>}
      <h2 className={`text-4xl leading-[1.1] sm:text-5xl ${light ? 'text-charcoal' : 'text-cream'}`}>{title}</h2>
      {children && <div className={`mt-5 leading-relaxed ${light ? 'text-charcoal/75' : 'text-cream/70'}`}>{children}</div>}
    </div>
  );
}

type BtnProps = { to: string; children: ReactNode; variant?: 'solid' | 'outline' | 'dark' };

export function ButtonLink({ to, children, variant = 'solid' }: BtnProps) {
  const styles = {
    solid: 'bg-gold text-charcoal hover:bg-cream',
    outline: 'text-cream underline decoration-gold/60 underline-offset-[6px] hover:decoration-gold px-0',
    dark: 'bg-charcoal text-cream hover:bg-forest',
  }[variant];
  const pad = variant === 'outline' ? 'py-3' : 'px-6 py-3';
  return (
    <Link to={to} className={`inline-flex items-center rounded-[2px] ${pad} text-[0.95rem] font-medium transition-colors duration-200 ${styles}`}>
      {children}
    </Link>
  );
}

/** Plain text links to the streaming album. */
export function StreamLinks({ className = '' }: { className?: string }) {
  const links = [
    { label: 'Spotify', href: site.spotify },
    { label: 'Apple Music', href: site.appleMusic },
  ];
  return (
    <p className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-cream underline decoration-gold/60 underline-offset-[6px] hover:decoration-gold">
          {l.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </p>
  );
}

/** Top of an inner page: title and intro, with an optional photo beside it. */
export function PageHero({ title, intro, image, imageAlt, position = 'center' }: { eyebrow?: string; title: ReactNode; intro: ReactNode; image?: string; imageAlt?: string; position?: string }) {
  return (
    <section className="bg-charcoal pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container className={`grid items-end gap-10 ${image ? 'lg:grid-cols-[1fr_22rem]' : ''}`}>
        <div className="settle max-w-2xl">
          <h1 className="text-5xl leading-[1.02] text-cream sm:text-7xl">{title}</h1>
          <div className="mt-6 text-lg leading-relaxed text-cream/70">{intro}</div>
        </div>
        {image && (
          <img src={image} alt={imageAlt ?? ''} className="hidden aspect-[4/5] w-full object-cover lg:block" style={{ objectPosition: position }} />
        )}
      </Container>
    </section>
  );
}
