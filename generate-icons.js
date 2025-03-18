const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  // Read the SVG file
  const svgBuffer = await fs.readFile(path.join(__dirname, 'public', 'logo.svg'));

  // Generate favicon.ico (multiple sizes in one file)
  await sharp(svgBuffer)
    .resize(48, 48)
    .toFile(path.join(__dirname, 'public', 'favicon-48.png'));
  
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(__dirname, 'public', 'favicon-32.png'));
    
  await sharp(svgBuffer)
    .resize(16, 16)
    .toFile(path.join(__dirname, 'public', 'favicon-16.png'));

  // Generate PNG files
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, 'public', 'logo192.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, 'public', 'logo512.png'));
}

generateIcons().catch(console.error); 