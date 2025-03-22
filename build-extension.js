
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const esbuild = require('esbuild');
const svgToPng = require('svg-to-png');

// Ensure output directory exists
const outputDir = path.resolve(__dirname, 'extension-dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure icons directory exists
const iconsDir = path.resolve(outputDir, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Copy static files
function copyStaticFiles() {
  const staticFiles = [
    { src: 'public/manifest.json', dest: 'manifest.json' },
    { src: 'public/popup.html', dest: 'popup.html' },
    { src: 'public/blocked.html', dest: 'blocked.html' }
  ];

  staticFiles.forEach(({ src, dest }) => {
    fs.copyFileSync(
      path.resolve(__dirname, src),
      path.resolve(outputDir, dest)
    );
    console.log(`Copied ${src} to ${dest}`);
  });
}

// Generate icons
async function generateIcons() {
  // Create SVG icon
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  `;

  // Create SVG file
  const svgPath = path.resolve(__dirname, 'temp-icon.svg');
  fs.writeFileSync(svgPath, svgIcon);

  // Convert to PNG at various sizes
  const sizes = [16, 48, 128];
  
  for (const size of sizes) {
    try {
      // Use svg-to-png to convert
      await svgToPng.convert(svgPath, iconsDir, {
        defaultWidth: size,
        defaultHeight: size
      });
      
      // Rename file to match expected format
      fs.renameSync(
        path.resolve(iconsDir, 'temp-icon.png'),
        path.resolve(iconsDir, `icon${size}.png`)
      );
      
      console.log(`Generated icon${size}.png`);
    } catch (error) {
      console.error(`Failed to generate icon${size}.png:`, error);
    }
  }

  // Clean up SVG file
  fs.unlinkSync(svgPath);
}

// Build the extension scripts with esbuild
async function buildScripts() {
  try {
    // Build background script
    await esbuild.build({
      entryPoints: ['src/extension/background.ts'],
      bundle: true,
      outfile: path.resolve(outputDir, 'background.js'),
      platform: 'browser',
      target: 'es2020',
      format: 'esm',
      minify: true,
      sourcemap: 'external',
      external: ['chrome']
    });
    console.log('Built background.js');

    // Build content script
    await esbuild.build({
      entryPoints: ['src/extension/content.ts'],
      bundle: true,
      outfile: path.resolve(outputDir, 'content.js'),
      platform: 'browser',
      target: 'es2020',
      format: 'iife',
      minify: true,
      sourcemap: 'external',
      external: ['chrome']
    });
    console.log('Built content.js');

    // Build popup script
    await esbuild.build({
      entryPoints: ['src/extension/popup.tsx'],
      bundle: true,
      outfile: path.resolve(outputDir, 'popup.js'),
      platform: 'browser',
      target: 'es2020',
      format: 'iife',
      minify: true,
      sourcemap: 'external',
      external: ['chrome'],
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment'
    });
    console.log('Built popup.js');

    // Extract CSS from Tailwind
    await esbuild.build({
      entryPoints: ['src/index.css'],
      bundle: true,
      outfile: path.resolve(outputDir, 'popup.css'),
      minify: true,
      loader: {
        '.css': 'css'
      }
    });
    console.log('Built popup.css');

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Main build function
async function buildExtension() {
  console.log('Building extension...');
  
  copyStaticFiles();
  await generateIcons();
  await buildScripts();
  
  console.log('Extension built successfully!');
  console.log(`Output directory: ${outputDir}`);
  console.log('\nTo use the extension:');
  console.log('1. Open Chrome and navigate to chrome://extensions');
  console.log('2. Enable "Developer mode"');
  console.log('3. Click "Load unpacked" and select the extension-dist folder');
}

buildExtension();
