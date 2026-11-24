import type { Song } from '../data/songs';
import peaks from '../data/peaks.json';
import { useAudio } from './AudioProvider';

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const allPeaks = peaks as Record<string, number[]>;

/** One row of the tracklist: number, play, title + credits, real waveform, time. */
export default function Track({ song, number, showCredits = true }: { song: Song; number: number; showCredits?: boolean }) {
  const { current, playing, time, duration, toggle, seek } = useAudio();
  const active = current === song.slug;
  const isPlaying = active && playing;
  const total = active && duration ? duration : song.previewSeconds ?? 45;
  const pos = active ? time : 0;
  const progress = total ? pos / total : 0;
  const raw = allPeaks[song.slug] ?? [];
  // Two source points per bar keeps the shape but stays readable
  const bars = raw.reduce<number[]>((acc, v, i) => (i % 2 ? (acc[acc.length - 1] = Math.max(acc[acc.length - 1], v), acc) : [...acc, v]), []);

  return (
    <li className={`grid grid-cols-[2rem_2.75rem_1fr] items-start gap-x-4 gap-y-3 border-t border-cream/12 py-6 sm:grid-cols-[2.5rem_2.75rem_minmax(0,19rem)_1fr_3.5rem] sm:items-center sm:gap-x-6 ${active ? 'bg-cream/[0.035]' : ''}`}>
      <span className="pt-2.5 text-right font-serif text-lg tabular-nums text-cream/40 sm:pt-0">{number}</span>

      <button
        type="button"
        onClick={() => toggle(song.slug)}
        aria-label={`${isPlaying ? 'Pause' : 'Play'} ${song.title} preview`}
        className={`grid size-11 place-items-center rounded-full transition-colors ${isPlaying ? 'bg-gold text-charcoal' : 'bg-cream/10 text-cream hover:bg-gold hover:text-charcoal'}`}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 size-4" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
        )}
      </button>

      <div className="min-w-0">
        <h3 className="text-2xl leading-tight text-cream">
          {song.title}
          {song.genre && <span className="ml-3 font-sans text-sm text-cream/50">{song.genre}</span>}
        </h3>
        {showCredits && (
          <div className="mt-1 space-y-0.5 text-sm text-cream/55">
            {song.credits.map((c) => <p key={c.role}>{c.role} {c.name}</p>)}
            {song.note && <p className="text-cream/45">{song.note}</p>}
          </div>
        )}
      </div>

      <div className="relative col-span-3 col-start-1 h-11 sm:col-span-1 sm:col-start-auto">
        <div className="flex h-full items-center gap-[3px]" aria-hidden="true">
          {bars.map((b, i) => (
            <span
              key={i}
              className={`flex-1 rounded-[1px] ${i / bars.length < progress ? 'bg-gold' : active ? 'bg-cream/35' : 'bg-cream/20'}`}
              style={{ height: `${Math.max(6, b * 100)}%` }}
            />
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={total}
          step={0.1}
          value={pos}
          onChange={(e) => seek(song.slug, Number(e.target.value))}
          aria-label={`Seek in ${song.title}`}
          className="absolute inset-0 size-full cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:[accent-color:#BA9062]"
        />
      </div>

      <span className="hidden text-right text-sm tabular-nums text-cream/50 sm:block">{active && pos > 0 ? fmt(pos) : fmt(total)}</span>
    </li>
  );
}
