// Site-wide settings. Edit these values; every page reads from here.
export const site = {
  name: 'Makeba Shangwe',
  roles: ['Songwriter', 'Creative Producer', 'Artist Development'],
  // Your live domain, used for SEO tags. Update after you connect a domain in Cloudflare.
  url: 'https://music.makebashangwe.com',
  // Shangwe Studios: set to true to show its page, menu link and mentions across the site.
  showStudios: false,
  // Optional public contact email. Leave empty to show only the contact form.
  email: '',
  // Streaming links for the album of published demos
  spotify: 'https://open.spotify.com/album/0cJA5c0N4KXG4W7eAcryGh',
  appleMusic: 'https://music.apple.com/us/album/zero-gravity/1878610642',
  // Add links as you want them shown, e.g. { label: 'Instagram', href: 'https://instagram.com/...' }
  socials: [
    { label: 'Spotify', href: 'https://open.spotify.com/album/0cJA5c0N4KXG4W7eAcryGh' },
    { label: 'Apple Music', href: 'https://music.apple.com/us/album/zero-gravity/1878610642' },
  ] as { label: string; href: string }[],
  // Formspree form ID (the part after https://formspree.io/f/). It's public by design.
  formspreeId: (import.meta.env.VITE_FORMSPREE_ID as string | undefined) || 'mnpdorjq',
};
