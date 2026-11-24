import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { previewSrc } from '../data/songs';

interface AudioState {
  current: string | null;
  playing: boolean;
  time: number;
  duration: number;
  toggle: (slug: string) => void;
  seek: (slug: string, seconds: number) => void;
}

const AudioCtx = createContext<AudioState | null>(null);

/** One shared audio element, so only one preview plays at a time. */
export function AudioProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = new Audio();
    a.preload = 'none';
    ref.current = a;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => { setPlaying(false); setTime(0); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnd);
    return () => { a.pause(); a.src = ''; };
  }, []);

  const load = useCallback((slug: string) => {
    const a = ref.current!;
    if (current !== slug) {
      a.src = previewSrc(slug);
      setCurrent(slug);
      setTime(0);
      setDuration(0);
    }
    return a;
  }, [current]);

  const toggle = useCallback((slug: string) => {
    const a = ref.current;
    if (!a) return;
    if (current === slug && !a.paused) { a.pause(); return; }
    void load(slug).play().catch(() => setPlaying(false));
  }, [current, load]);

  const seek = useCallback((slug: string, seconds: number) => {
    const a = load(slug);
    a.currentTime = seconds;
    setTime(seconds);
  }, [load]);

  return (
    <AudioCtx.Provider value={{ current, playing, time, duration, toggle, seek }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider');
  return ctx;
}
