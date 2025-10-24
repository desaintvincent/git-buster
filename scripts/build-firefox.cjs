#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const releasesDir = path.join(rootDir, 'releases');
const firefoxDir = path.join(releasesDir, 'firefox');
const zipName = 'git-buster-firefox.zip';
const zipPath = path.join(releasesDir, zipName);

// Ensure directories exist
if (!fs.existsSync(releasesDir)) {
  fs.mkdirSync(releasesDir);
}
if (!fs.existsSync(firefoxDir)) {
  fs.mkdirSync(firefoxDir);
}

// Clean Firefox build directory and zip
if (fs.existsSync(firefoxDir)) {
  execSync(`rm -rf ${firefoxDir}/*`);
}
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Copy core files
const filesToCopy = [
  'build/',
  'logo/',
  'popup/',
  'settings/',
  'manifest-firefox.json'
];

filesToCopy.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(firefoxDir, file.replace('manifest-firefox.json', 'manifest.json'));
  
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      execSync(`cp -r "${src}" "${dest}"`);
    } else {
      execSync(`cp "${src}" "${dest}"`);
    }
  }
});

// Create ZIP file
// Create new zip
process.chdir(firefoxDir);
execSync(`zip -r "../${zipName}" .`);

console.log(`✅ Firefox extension built: releases/${zipName}`);