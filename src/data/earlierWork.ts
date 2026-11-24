// Older published work. Shown quietly at the bottom of the Songwriting page.

export interface EarlierWork {
  youtubeId: string;
  title: string;
  context: string;
  credits: string;
  description: string;
  /** Optional small-print note shown under the credits. */
  note?: string;
}

export const earlierWork: EarlierWork[] = [
  {
    youtubeId: 'HXYcQp5Mau0',
    title: 'Theatre-style Christmas song',
    context: 'Tri-Cities High School',
    credits: 'Composed, written, arranged & directed by Makeba Shangwe',
    description: 'A theatre-style Christmas number I wrote, composed and arranged, and directed for a school production.',
    note: 'Performed by the Tri-Cities High School musical theatre students. I wrote and directed the song but am not one of the singers.',
  },
  {
    youtubeId: 'ZEbUFa-hijo',
    title: 'Open-mic performance',
    context: 'Live, small audience',
    credits: 'Performed by Makeba Shangwe',
    description: 'A live performance for a small open-mic audience, sharing some of my music.',
  },
];
