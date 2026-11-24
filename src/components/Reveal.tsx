import type { ReactNode } from 'react';

/** Plain wrapper (scroll animations were removed). Kept so existing pages still compile. */
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}
