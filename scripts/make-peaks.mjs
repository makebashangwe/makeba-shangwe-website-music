// Draws each preview's real waveform: reads public/audio/previews/*.m4a and writes
// src/data/peaks.json (macOS only; uses the built-in afconvert). Run after `npm run previews`.
import { readdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BINS = 120;
const dir = 'public/audio/previews';
const tmp = mkdtempSync(join(tmpdir(), 'peaks-'));
const out = {};

for (const f of readdirSync(dir).filter((f) => f.endsWith('.m4a'))) {
  const wav = join(tmp, 'a.wav');
  execFileSync('afconvert', ['-f', 'WAVE', '-d', 'LEI16@8000', '-c', '1', join(dir, f), wav]);
  const buf = readFileSync(wav);
  let i = 12;
  while (buf.toString('ascii', i, i + 4) !== 'data') i += 8 + buf.readUInt32LE(i + 4);
  const start = i + 8, n = Math.floor((buf.length - start) / 2), per = Math.floor(n / BINS);
  const peaks = [];
  for (let b = 0; b < BINS; b++) {
    let sum = 0;
    for (let k = 0; k < per; k++) { const v = buf.readInt16LE(start + (b * per + k) * 2) / 32768; sum += v * v; }
    peaks.push(Math.sqrt(sum / per));
  }
  const max = Math.max(...peaks) || 1;
  out[f.replace('.m4a', '')] = peaks.map((p) => Math.round((p / max) * 100) / 100);
}
rmSync(tmp, { recursive: true });
writeFileSync('src/data/peaks.json', JSON.stringify(out));
console.log('peaks for', Object.keys(out).length, 'previews');
