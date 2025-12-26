import sharp from 'sharp';
import { readdir, stat, copyFile, unlink, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const imagesDir = './public/images';
const MAX_WIDTH = 1200;
const QUALITY = 80;

// Files to compress with their target dimensions
const targets = [
  { file: 'refleksi-2025.webp', maxWidth: 800 },
  { file: 'cikguaime-avatar.webp', maxWidth: 400 },
  { file: 'jurulatih-olahraga.webp', maxWidth: 800 },
  { file: 'cikguaime-tiktok.webp', maxWidth: 600 },
  { file: 'blog-inovasi.webp', maxWidth: 800 },
];

async function compressImages() {
  for (const target of targets) {
    const filePath = join(imagesDir, target.file);
    const compressedPath = join(imagesDir, `compressed-${target.file}`);

    if (!existsSync(filePath)) {
      console.log(`Skipping ${target.file} - file not found`);
      continue;
    }

    const fileStats = await stat(filePath);
    const sizeKB = Math.round(fileStats.size / 1024);

    console.log(`Compressing ${target.file} (${sizeKB}KB)...`);

    try {
      await sharp(filePath)
        .resize(target.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(compressedPath);

      const newStats = await stat(compressedPath);
      const newSizeKB = Math.round(newStats.size / 1024);

      console.log(`  ✓ Created compressed-${target.file}: ${sizeKB}KB → ${newSizeKB}KB (saved ${sizeKB - newSizeKB}KB)`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  console.log('\nCompressed files created with "compressed-" prefix.');
  console.log('To apply, close VS Code/dev server and run:');
  console.log('  node scripts/apply-compressed.mjs');
}

compressImages();
