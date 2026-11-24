// Converts the source photos in photos/ into web-ready WebP files in public/images.
// Crops only remove background props (e.g. framed plaques that could read as awards).
// Faces are never retouched.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const src = 'photos/';
const out = 'public/images/';
mkdirSync(out, { recursive: true });

const jobs = [
  // name, file, crop (left, top, width, height) or null, widths
  ['hero', 'Warm Studio Portrait Without Nose Jewelry.png', { left: 180, top: 0, width: 942, height: 1402 }, [600, 942]],
  ['piano', 'Thoughtful Pianist in Warm Studio Glow.png', null, [600, 1122]],
  ['process', 'Keyboard Notes Fixed Keys.png', null, [600, 1048]],
  ['headshot', 'file_00000000d39c81f5b1c2327a240d44d5.png', null, [768, 1536]],
  ['portrait', '04_main_portrait (1).png', null, [700]],
  ['notes', 'Boredom and Notes in Warm Light.png', null, [600, 1122]],
];

for (const [name, file, crop, widths] of jobs) {
  for (const w of widths) {
    let img = sharp(src + file);
    if (crop) img = img.extract(crop);
    await img.resize({ width: w, kernel: "lanczos3", withoutEnlargement: true }).webp({ quality: 90, smartSubsample: true, effort: 6 }).toFile(`${out}${name}-${w}.webp`);
  }
  console.log('ok', name);
}

// Social share image (1200x630)
await sharp(src + 'file_00000000d39c81f5b1c2327a240d44d5.png')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(`${out}og.jpg`);
console.log('ok og');
