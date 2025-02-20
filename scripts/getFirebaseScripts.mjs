import {exec} from 'child_process';
import path from 'path';
import fs from 'fs';

const project = 'dame-follow';
/**
 * Since I had problems with COOP and CORS using firebase iframes, I had to self host my own files
 * Since I am using Github Pages + Squarespace, I can't specify the security headers
 *
 * https://firebase.google.com/docs/auth/web/redirect-best-practices#self-host-helper-code
 */

const files = [
  `https://${project}.firebaseapp.com/__/auth/handler`,
  `https://${project}.firebaseapp.com/__/auth/handler.js`,
  `https://${project}.firebaseapp.com/__/auth/experiments.js`,
  `https://${project}.firebaseapp.com/__/auth/iframe`,
  `https://${project}.firebaseapp.com/__/auth/iframe.js`,
  `https://${project}.firebaseapp.com/__/firebase/init.json`,
];

// Ensure directories exist
const ensureDirExists = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
};

const download = (url, savePath) => {
  ensureDirExists(savePath);
  /**
   * Using `curl` cuz I was having problems using node's fetching the json file
   */
  const command = `curl -o "${savePath}" "${url}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stderr) => {
      if (error) {
        console.error(`❌ ${url}: ${stderr}`);
        return reject(error);
      }
      console.log(`✅ ${url} -> ${savePath}`);
      resolve();
    });
  });
};

// Start downloading files
(async () => {
  const promises = files.map((file) => {
    const savePath = path.join(
      'public',
      file.replace(`https://${project}.firebaseapp.com/`, ''),
    );

    return download(file, savePath);
  });

  await Promise.allSettled(promises);
})();
