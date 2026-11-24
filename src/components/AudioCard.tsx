import { useMemo } from 'react';
import type { Song } from '../data/songs';
import { useAudio } from './AudioProvider';

const PREVIEW_SECONDS = 45;
const BARS = 56;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/** Decorative waveform, stable per song. */
function useBars(seed: string) {
  return useMemo(() => {
    let h = 0;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return Array.from({ length: BARS }, (_, i) => {
      h = (h * 1103515245 + 12345) >>> 0;
      const env = Math.sin((i / BARS) * Math.PI) * 0.55 + 0.35;
      return Math.max(0.12, Math.min(1, env * (0.45 + (h % 1000) / 1000 * 0.75)));
    });
  }, [seed]);
}

export default function AudioCard({ song, index, compact = false }: { song: Song; index?: number; compact?: boolean }) {
  const { current, playing, time, duration, toggle, seek } = useAudio();
  const active = current === song.slug;
  const isPlaying = active && playing;
  const total = active && duration ? duration : song.previewSeconds ?? PREVIEW_SECONDS;
  const pos = active ? time : 0;
  const progress = total ? pos / total : 0;
  const bars = useBars(song.slug);

  return (
    <article
      className={`group relative flex flex-col gap-5 rounded-sm border p-6 transition-colors duration-500 sm:p-7 ${
        active ? 'border-gold/60 bg-espresso/70' : 'border-cream/10 bg-cream/[0.03] hover:border-cream/25'
      }`}
    >
      <header className="flex items-start gap-5">
        <button
          type="button"
          onClick={() => toggle(song.slug)}
          aria-label={`${isPlaying ? 'Pause' : 'Play'} ${song.title} preview`}
          className={`grid size-14 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            isPlaying ? 'border-gold bg-gold text-charcoal' : 'border-gold/70 text-gold hover:bg-gold hover:text-charcoal'
          }`}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
            {index !== undefined && <span className="text-gold/80">{String(index + 1).padStart(2, '0')}</span>}
            <span>{song.status}</span>
            {song.genre && <><span aria-hidden="true">·</span><span>{song.genre}</span></>}
          </div>
          <h3 className="mt-1.5 font-serif text-2xl leading-tight text-balance text-cream sm:text-[1.7rem]">{song.title}</h3>
        </div>
      </header>

      <div>
        <div className="relative h-12" aria-hidden="true">
          <div className="flex h-full items-center gap-[3px]">
            {bars.map((b, i) => (
              <span
                key={i}
                className={`flex-1 rounded-full transition-colors duration-200 ${i / BARS < progress ? 'bg-gold' : 'bg-cream/20'}`}
                style={{ height: `${b * 100}%` }}
              />
            ))}
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={total}
          step={0.1}
          value={pos}
          onChange={(e) => seek(song.slug, Number(e.target.value))}
          aria-label={`Seek in ${song.title}`}
          className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-cream/15 accent-[#BA9062]"
        />
        <div className="mt-2 flex justify-between text-xs tabular-nums text-cream/50">
          <span>{fmt(pos)}</span>
          <span>Preview · {fmt(total)}</span>
        </div>
      </div>

      {!compact && (
        <footer className="mt-auto space-y-3 border-t border-cream/10 pt-4 text-sm">
          {song.credits.map((c) => (
            <p key={c.role + c.name} className="text-cream/60">
              <span className="text-cream/40">{c.role}</span> <span className="text-cream">{c.name}</span>
            </p>
          ))}
          {song.note && <p className="text-xs italic text-cream/50">{song.note}</p>}
          <p className="text-xs text-cream/40">© Makeba Shangwe{song.note ? ' (lyrics, composition & vocals)' : ''}. All rights reserved.</p>
          {song.links && song.links.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-1">
              {song.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-gold underline-offset-4 hover:underline">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </footer>
      )}
    </article>
  );
}
