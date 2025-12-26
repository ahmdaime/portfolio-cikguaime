import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const avatarSize = 320;

  // Create gradient background with noise texture
  const background = Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000000"/>
          <stop offset="50%" style="stop-color:#0a0a0a"/>
          <stop offset="100%" style="stop-color:#000000"/>
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3"/>
          <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.2"/>
          <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.3"/>
        </linearGradient>
        <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.4"/>
          <stop offset="70%" style="stop-color:#8b5cf6;stop-opacity:0.2"/>
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0"/>
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="40"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg)"/>

      <!-- Glow effects -->
      <ellipse cx="280" cy="315" rx="250" ry="250" fill="url(#avatarGlow)" filter="url(#blur)"/>
      <ellipse cx="900" cy="200" rx="200" ry="150" fill="#6366f1" opacity="0.1" filter="url(#blur)"/>
      <ellipse cx="1000" cy="500" rx="150" ry="100" fill="#8b5cf6" opacity="0.1" filter="url(#blur)"/>

      <!-- Grid pattern -->
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)"/>

      <!-- Avatar circle border/glow -->
      <circle cx="280" cy="315" r="${avatarSize/2 + 8}" fill="none" stroke="url(#glow)" stroke-width="3" opacity="0.8"/>
      <circle cx="280" cy="315" r="${avatarSize/2 + 20}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="8,8"/>
    </svg>
  `);

  // Create text overlay
  const textOverlay = Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .title { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; fill: white; }
        .subtitle { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 400; fill: #9ca3af; }
        .highlight { fill: #14b8a6; }
        .badge { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 600; fill: white; font-size: 14px; }
      </style>

      <!-- Title -->
      <text x="500" y="240" class="title" font-size="42">Cikgu Siang Hari,</text>
      <text x="500" y="300" class="title" font-size="48">
        <tspan class="highlight">Vibe Coder</tspan>
        <tspan fill="#9ca3af"> Malam Hari.</tspan>
      </text>

      <!-- Description -->
      <text x="500" y="370" class="subtitle" font-size="20">Pendidik inovatif yang membangunkan Chrome</text>
      <text x="500" y="400" class="subtitle" font-size="20">Extensions untuk 10,000+ guru Malaysia.</text>

      <!-- Badges -->
      <rect x="500" y="450" width="110" height="32" rx="16" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.4)" stroke-width="1"/>
      <text x="555" y="472" class="badge" text-anchor="middle">3+ Extensions</text>

      <rect x="625" y="450" width="100" height="32" rx="16" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.4)" stroke-width="1"/>
      <text x="675" y="472" class="badge" text-anchor="middle">10K+ Users</text>

      <rect x="740" y="450" width="110" height="32" rx="16" fill="rgba(20,184,166,0.2)" stroke="rgba(20,184,166,0.4)" stroke-width="1"/>
      <text x="795" y="472" class="badge" text-anchor="middle">TOP 150 CJD</text>

      <!-- Website URL -->
      <text x="500" y="560" class="subtitle" font-size="16">portfolio-cikguaime.vercel.app</text>
    </svg>
  `);

  // Load and resize avatar image
  const avatar = await sharp(path.join(rootDir, 'public/images/cikguaime-about.webp'))
    .resize(avatarSize, avatarSize, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Create circular mask for avatar
  const circleMask = Buffer.from(`
    <svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize/2}" cy="${avatarSize/2}" r="${avatarSize/2}" fill="white"/>
    </svg>
  `);

  // Apply circular mask to avatar
  const circularAvatar = await sharp(avatar)
    .composite([{
      input: await sharp(circleMask).toBuffer(),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // Compose final image
  const finalImage = await sharp(background)
    .composite([
      // Avatar
      {
        input: circularAvatar,
        left: 280 - avatarSize/2,
        top: 315 - avatarSize/2,
      },
      // Text overlay
      {
        input: await sharp(textOverlay).toBuffer(),
        left: 0,
        top: 0,
      }
    ])
    .png({ quality: 90 })
    .toFile(path.join(rootDir, 'public/images/og-image.png'));

  console.log('OG image generated successfully!');
  console.log('Output: public/images/og-image.png');
  console.log('Dimensions: 1200x630px');
}

generateOGImage().catch(console.error);
