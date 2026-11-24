# Makeba Shangwe — Portfolio Website

React + Vite + TypeScript + Tailwind CSS. Hosted on Cloudflare Pages.

## Run it on your computer

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Where to edit things

| What | File |
| --- | --- |
| Song titles, genres, credits, notes, streaming links, which songs are featured | `src/data/songs.ts` |
| Shangwe Studios pillars and projects (each marked Concept / In development / Released) | `src/data/studios.ts` |
| Domain, public email, social links | `src/data/site.ts` |
| Page text | `src/pages/*.tsx` |
| Colors and fonts | `src/index.css` |

## Song previews (protecting your full songs)

Your full songs in `music_demos_pub/` are **never published**. They are excluded from Git by `.gitignore`.
The site only plays 45-second excerpts (with a short fade in and out) from `public/audio/previews/`.

To choose which part of a song plays:

1. Open `scripts/previews.config.json`.
2. Change `start` (seconds into the song) and optionally add `"duration": 30` to a track.
3. Run `npm run previews` (macOS only; uses the Mac's built-in audio tools). This also redraws each song's waveform from the real audio. Or rebuild one song: `npm run previews -- circles`.

To add a new song: put the file in `music_demos_pub/`, add a line to `scripts/previews.config.json`,
run `npm run previews`, then add the song to `src/data/songs.ts` with the same `slug`.

## Photos

Original photos stay in `photos/` (not uploaded to GitHub). `npm run images` makes web-ready WebP
versions in `public/images/`. Crops only remove background props; faces are never edited.
For the sharpest results on high-resolution screens, use originals at least 2400px wide.

## Contact form (Formspree)

1. Create a free account at https://formspree.io and make a new form. Set it to send to the email address you want.
2. Copy the form ID (the part after `https://formspree.io/f/`).
3. In Cloudflare Pages: **Settings → Variables and Secrets → Add**: name `VITE_FORMSPREE_ID`, value = your ID. Add it for Production (and Preview if you like).
4. Redeploy. For local testing, copy `.env.example` to `.env` and paste the ID there.

Until the ID is set, the form shows a "not connected yet" note and the button stays disabled.

## Deploy: GitHub → Cloudflare Pages

1. **Create a GitHub repository** (private is fine) at https://github.com/new, e.g. `makeba-portfolio`. Do not add a README.
2. **Push this folder** from Terminal, inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/makeba-portfolio.git
   git push -u origin main
   ```
   Check that `music_demos_pub/` and `photos/` were **not** pushed. They should be ignored.
3. **Connect Cloudflare Pages:** Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repository.
4. **Build settings:**
   - Framework preset: `Vite` (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `VITE_FORMSPREE_ID` (see above). Optionally `NODE_VERSION` = `22`.
5. **Save and Deploy.** Your site goes live at `https://<project>.pages.dev`. Every push to `main` redeploys automatically.
6. **Custom domain (optional):** In the Pages project, open **Custom domains** and add your domain. Then update `url` in `src/data/site.ts` so search and social previews use it.

Page routing works automatically: Cloudflare Pages serves `index.html` for routes like `/about`
because the project has no `404.html`.
