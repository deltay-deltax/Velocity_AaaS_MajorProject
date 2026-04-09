const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      
      // 1. Fix broken React imports
      content = content.replace(/import\s+\*\s+from\s+['"]react['"]/g, 'import * as React from "react"');
      
      // 2. Fix broken 'as' keywords if they were part of standard patterns
      // (My previous regex was broad, let's look for common broken ones)
      
      if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed: ${filePath}`);
      }
    }
  });
}

walk('./src');
