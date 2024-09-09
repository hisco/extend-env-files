#!/usr/bin/env node

log("Prepending key-values to files...")
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const dotenv = require('dotenv')


const inlineConfigText = `${process.env.ENV_FILES_CONFIG || ''}`.replace(/\\n/g , '\n')
if (inlineConfigText === '') {
  log('ENV_FILES_CONFIG is not set. Skipping...')
  process.exit(0)
}
log(`ENV_FILES_CONFIG: ${inlineConfigText}`)


// Parse the YAML input
const config = yaml.load(inlineConfigText);
log(`Parsed json: ${JSON.stringify(config)}`)

for (const [filePath, keyValues] of Object.entries(config)) {
    log(`filePath: ${filePath}`)
    log(`keyValues: ${JSON.stringify(keyValues)}`)
     // Ensure the target directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  // Read the original content of the target file
  let originalContent = '';
  if (fs.existsSync(filePath)) {
    log(`file exists ${filePath}`)
    originalContent = fs.readFileSync(filePath, 'utf8');
  }

  const originalConfig = dotenv.parse(Buffer.from(originalContent))

  const mergedConfig = {...originalConfig, ...keyValues}
  let newContent = '';
  for (const [key, value] of Object.entries(mergedConfig)) {
    newContent += `${key}=${value}\n`;
  }
  log(`writing file: ${filePath}`)
  log(`originalContent:>${originalContent}<`)
  log(`newContent:>${newContent}<`)
  // Write the new content back to the file
  fs.writeFileSync(filePath, newContent, 'utf8');
}

function log(...args){
  if (process.env.DEBUG) {
    console.log(...args)
  }
}