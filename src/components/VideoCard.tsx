import { useState } from 'react';
import type { EarlierWork } from '../data/earlierWork';

/** YouTube embed that only loads the player after a click (faster pages, no tracking until play). */
export default function VideoCard({ work }: { work: EarlierWork }) {
  const [play, setPlay] = useState(false);
  return (
    <article className="flex flex-col overflow-hidden rounded-sm border border-cream/10 bg-cream/[0.02]">
      <div className="relative aspect-video bg-charcoal">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}?autoplay=1&rel=0`}
            title={work.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play video: ${work.title}`}>
            <img
              src={`https://i.ytimg.com/vi/${work.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-14 place-items-center rounded-full border border-gold/80 bg-charcoal/60 text-gold backdrop-blur-sm transition-colors group-hover:bg-gold group-hover:text-charcoal">
                <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-cream/45">{work.context}</p>
        <h3 className="font-serif text-xl text-cream">{work.title}</h3>
        <p className="text-sm leading-relaxed text-cream/60">{work.description}</p>
        <p className="mt-auto pt-3 text-xs text-cream/45">{work.credits}</p>
        {work.note && <p className="text-xs italic text-cream/45">{work.note}</p>}
        <a href={`https://youtu.be/${work.youtubeId}`} target="_blank" rel="noreferrer" className="text-xs text-gold/80 underline-offset-4 hover:underline">
          Watch on YouTube ↗
        </a>
      </div>
    </article>
  );
}
