import { readdir, unlink, rename, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const imagesDir = './public/images';

async function applyCompressed() {
  const files = await readdir(imagesDir);
  const compressedFiles = files.filter(f => f.startsWith('compressed-'));

  if (compressedFiles.length === 0) {
    console.log('No compressed files found. Run compress-images.mjs first.');
    return;
  }

  console.log(`Found ${compressedFiles.length} compressed files to apply:\n`);

  for (const compressed of compressedFiles) {
    const original = compressed.replace('compressed-', '');
    const compressedPath = join(imagesDir, compressed);
    const originalPath = join(imagesDir, original);

    try {
      // Get sizes for logging
      const compressedStats = await stat(compressedPath);
      const compressedKB = Math.round(compressedStats.size / 1024);

      let originalKB = 0;
      if (existsSync(originalPath)) {
        const originalStats = await stat(originalPath);
        originalKB = Math.round(originalStats.size / 1024);
        await unlink(originalPath);
      }

      await rename(compressedPath, originalPath);
      console.log(`✓ ${original}: ${originalKB}KB → ${compressedKB}KB`);
    } catch (err) {
      console.error(`✗ ${original}: ${err.message}`);
    }
  }

  // Clean up temp files
  const tempFiles = files.filter(f => f.startsWith('temp-'));
  for (const temp of tempFiles) {
    try {
      await unlink(join(imagesDir, temp));
      console.log(`✓ Cleaned up: ${temp}`);
    } catch (err) {
      // Ignore errors
    }
  }

  console.log('\nDone! All compressed images applied.');
}

applyCompressed();
