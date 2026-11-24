// Shangwe Studios content. Every item carries a status so visitors can tell
// concepts apart from finished work.

export type ProjectStatus = 'Concept' | 'In development' | 'Released';

export interface StudioPillar {
  title: string;
  body: string;
}

export interface StudioProject {
  title: string;
  kind: string; // e.g. 'Virtual artist', 'Music video', 'Animated short'
  status: ProjectStatus;
  description: string;
  image?: string; // path in /public, e.g. '/images/studios/project.webp'
  link?: { label: string; href: string };
}

export const pillars: StudioPillar[] = [
  { title: 'Original music', body: 'Songs written in-house become the starting point for every world the studio builds.' },
  { title: 'Fictional & virtual artists', body: 'Artists with their own voice, story and visual identity, each built around a body of songs.' },
  { title: 'Music videos', body: 'Visual stories that carry a song past the audio and into a scene.' },
  { title: 'Animation', body: 'Animated pieces that give characters and their music room to move.' },
  { title: 'Immersive storytelling', body: 'Narratives that unfold across songs, visuals and characters.' },
  { title: 'Connected worlds', body: 'Projects that share one universe, so every release adds to a larger story.' },
];

// Add projects here as they take shape. Leave empty to show the "coming soon" state.
export const projects: StudioProject[] = [];
