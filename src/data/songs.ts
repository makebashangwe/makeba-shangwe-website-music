// The songwriting catalogue. Only the short previews in public/audio/previews are public.
// To change which part of a song plays, edit scripts/previews.config.json and run `npm run previews`.
//
// PLEASE CONFIRM before launch: titles, genres, credits (co-writers, vocalists, producers),
// and whether each song should be public at all. Fields left empty are simply hidden.

export type SongStatus = 'Complete demo' | 'Work in progress';

export interface Song {
  slug: string;
  title: string;
  genre?: string;
  status: SongStatus;
  credits: { role: string; name: string }[];
  /** Short note for listeners: mood, story, what the song is for. */
  note?: string;
  featured?: boolean;
  /** Preview length in seconds (default 45). Match scripts/previews.config.json. */
  previewSeconds?: number;
  /** Only add links you have released publicly. */
  links?: { label: string; href: string }[];
}

const writer = { role: 'Written, composed & produced by', name: 'Makeba Shangwe' };
// For songs where the underlying production/instrumental is someone else's work.
const writerArranger = { role: 'Written & arranged by', name: 'Makeba Shangwe' };
const outsideProduction = 'Instrumental production is not my work. My credit is for the writing and arrangement.';

export const songs: Song[] = [
  { slug: 'levitatin', title: 'Levitatin\'', status: 'Complete demo', credits: [writerArranger], note: outsideProduction, featured: true },
  { slug: 'see-u-again', title: 'See U Again', status: 'Complete demo', credits: [writer], featured: true, previewSeconds: 60 },
  { slug: 'wonder-to-me', title: 'Wonder to Me', status: 'Complete demo', credits: [writer], featured: true },
  { slug: 'issue', title: 'Issue', status: 'Complete demo', credits: [writer] },
  { slug: 'circles', title: 'Circles', status: 'Complete demo', credits: [writer] },
  { slug: 'over', title: 'Over', genre: 'A cappella', status: 'Complete demo', credits: [writer] },
  { slug: 'arrythmia', title: 'Arrythmia', status: 'Complete demo', credits: [writer] },
  { slug: 'shawty-took-my-heart', title: 'Shawty Took My Heart', status: 'Complete demo', credits: [writer] },
  { slug: 'crush-my-vibe', title: 'Crush My Vibe', status: 'Complete demo', credits: [writer] },
  { slug: 'surface', title: 'Surface', status: 'Complete demo', credits: [writer] },
  { slug: 'narnia', title: 'Narnia', status: 'Complete demo', credits: [writerArranger], note: outsideProduction },
  { slug: 'user-mast', title: 'User', status: 'Complete demo', credits: [writer] },
];

export const previewSrc = (slug: string) => `/audio/previews/${slug}.m4a`;
