#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const releasesDir = path.join(rootDir, 'releases');
const chromeDir = path.join(releasesDir, 'chrome');
const zipName = 'git-buster-chrome.zip';
const zipPath = path.join(releasesDir, zipName);

// Ensure directories exist
if (!fs.existsSync(releasesDir)) {
  fs.mkdirSync(releasesDir);
}
if (!fs.existsSync(chromeDir)) {
  fs.mkdirSync(chromeDir);
}

// Clean Chrome build directory and zip
if (fs.existsSync(chromeDir)) {
  execSync(`rm -rf ${chromeDir}/*`);
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
  'manifest-chrome.json'
];

filesToCopy.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(chromeDir, file.replace('manifest-chrome.json', 'manifest.json'));
  
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      execSync(`cp -r "${src}" "${dest}"`);
    } else {
      execSync(`cp "${src}" "${dest}"`);
    }
  }
});

process.chdir(chromeDir);
execSync(`zip -r "../${zipName}" .`);

console.log(`✅ Chrome extension built: releases/${zipName}`);
