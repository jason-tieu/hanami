import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const MAX_IMAGE_SIZE_KB = 250;

function checkImageSizes() {
  console.log('🔍 Checking image sizes...');

  const publicDir = path.join(process.cwd(), 'public');
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
  let hasLargeImages = false;

  function checkDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        checkDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const sizeKB = Math.round(stat.size / 1024);
          if (sizeKB > MAX_IMAGE_SIZE_KB) {
            console.error(
              `❌ Large image found: ${fullPath} (${sizeKB}KB > ${MAX_IMAGE_SIZE_KB}KB)`,
            );
            hasLargeImages = true;
          } else {
            console.log(`✅ ${item}: ${sizeKB}KB`);
          }
        }
      }
    }
  }

  checkDirectory(publicDir);

  if (hasLargeImages) {
    console.error('\n❌ Commit blocked: Images larger than 250KB found.');
    console.error('Please optimize images using: npm run optimg');
    process.exit(1);
  } else {
    console.log('\n✅ All images are under 250KB');
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const imageFiles = status
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.substring(3))
      .filter(file => /\.(png|jpg|jpeg|webp|avif)$/i.test(file));

    if (imageFiles.length > 0) {
      console.log('📸 Checking staged image files...');
      checkImageSizes();
    } else {
      console.log('ℹ️  No image files in staging area');
    }
  } catch {
    console.log('ℹ️  Not in a git repository, skipping image size check');
  }
}

checkGitStatus();
