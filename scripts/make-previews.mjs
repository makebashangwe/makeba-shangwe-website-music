// Builds short public previews from the private full-length demos.
import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const cfg = JSON.parse(readFileSync('scripts/previews.config.json', 'utf8'));
const only = process.argv[2];
mkdirSync(cfg.outDir, { recursive: true });
for (const t of cfg.tracks) {
  if (only && t.slug !== only) continue;
  execFileSync('swift', [
    'scripts/trim-preview.swift',
    join(cfg.sourceDir, t.file),
    join(cfg.outDir, `${t.slug}.m4a`),
    String(t.start ?? 0),
    String(t.duration ?? cfg.defaultDuration),
  ], { stdio: 'inherit' });
}
