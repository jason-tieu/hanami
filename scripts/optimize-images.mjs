import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const THRESHOLD_KB = 200;
const MAX_WIDTH = 1920;

// Supported image formats
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

async function getImageDimensions(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    console.warn(`⚠️  Could not read dimensions for ${filePath}:`, error.message);
    return { width: null, height: null };
  }
}

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  const sizeKB = Math.round(stats.size / 1024);

  if (sizeKB <= THRESHOLD_KB) {
    console.log(`✅ ${path.basename(filePath)} (${sizeKB}KB) - already optimized`);
    return;
  }

  console.log(`🔄 Optimizing ${path.basename(filePath)} (${sizeKB}KB)...`);

  const { width, height } = await getImageDimensions(filePath);
  const basePath = filePath.replace(/\.[^/.]+$/, '');
  const _ext = path.extname(filePath);

  try {
    const image = sharp(filePath);

    // Generate AVIF (quality 55)
    const avifPath = `${basePath}.avif`;
    if (!fs.existsSync(avifPath) || fs.statSync(avifPath).mtime < stats.mtime) {
      let avifImage = image.clone().avif({ quality: 55, effort: 9 });

      // Downscale if too large
      if (width && width > MAX_WIDTH) {
        const ratio = MAX_WIDTH / width;
        const newHeight = Math.round(height * ratio);
        avifImage = avifImage.resize(MAX_WIDTH, newHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });
        console.log(`  📐 Downscaled from ${width}×${height} to ${MAX_WIDTH}×${newHeight}`);
      }

      await avifImage.toFile(avifPath);
      const avifSize = Math.round(fs.statSync(avifPath).size / 1024);
      console.log(
        `  ✅ AVIF: ${avifSize}KB (${Math.round((1 - avifSize / sizeKB) * 100)}% reduction)`,
      );
    } else {
      console.log(`  ⏭️  AVIF already exists and is newer`);
    }

    // Generate WebP (quality 72)
    const webpPath = `${basePath}.webp`;
    if (!fs.existsSync(webpPath) || fs.statSync(webpPath).mtime < stats.mtime) {
      let webpImage = image.clone().webp({ quality: 72, effort: 6 });

      // Downscale if too large
      if (width && width > MAX_WIDTH) {
        const ratio = MAX_WIDTH / width;
        const newHeight = Math.round(height * ratio);
        webpImage = webpImage.resize(MAX_WIDTH, newHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      await webpImage.toFile(webpPath);
      const webpSize = Math.round(fs.statSync(webpPath).size / 1024);
      console.log(
        `  ✅ WebP: ${webpSize}KB (${Math.round((1 - webpSize / sizeKB) * 100)}% reduction)`,
      );
    } else {
      console.log(`  ⏭️  WebP already exists and is newer`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(filePath)}:`, error.message);
  }
}

async function findImages(dir) {
  const images = [];

  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  }

  scanDir(dir);
  return images;
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  const images = await findImages(PUBLIC_DIR);
  const largeImages = images.filter(img => {
    const stats = fs.statSync(img);
    return Math.round(stats.size / 1024) > THRESHOLD_KB;
  });

  console.log(`Found ${images.length} images, ${largeImages.length} need optimization\n`);

  for (const imagePath of largeImages) {
    await optimizeImage(imagePath);
    console.log('');
  }

  console.log('✨ Image optimization complete!');
}

main().catch(console.error);
