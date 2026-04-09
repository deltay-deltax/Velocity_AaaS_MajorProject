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
      console.log(`Deep cleaning: ${filePath}`);
      let content = fs.readFileSync(filePath, 'utf8');

      // 1. Remove interfaces and types (including multi-line)
      // Standard: export interface X { ... } or type X = ...
      content = content.replace(/export\s+(interface|type)\s+[A-Z][a-zA-Z0-9_]*(\s+extends\s+[^{]+)?\s*{[^}]*}/gs, '');
      content = content.replace(/type\s+[A-Z][a-zA-Z0-9_]*\s*=\s*[^;]+;?/gs, '');
      
      // 2. Remove generic type parameters from React.forwardRef, useState, etc.
      // Example: React.forwardRef<HTMLButtonElement, ButtonProps> -> React.forwardRef
      content = content.replace(/<[A-Z][a-zA-Z0-9_<>|[\]\s,]+>/g, '');

      // 3. Remove type annotations in function arguments including destructive ones
      // Example: ({ props }: Props) -> ({ props })
      // Example: (e: any) -> (e)
      content = content.replace(/:\s*[A-Z][a-zA-Z0-9_<>|[\]\s,]+/g, '');
      content = content.replace(/:\s*(number|string|boolean|void|any|unknown|never)/g, '');

      // 4. Remove 'as Type' assertions
      content = content.replace(/\s+as\s+[A-Z][a-zA-Z0-9_<>|[\]]+/g, '');

      // 5. Remove 'type' from imports
      content = content.replace(/,\s*type\s+[a-zA-Z0-9_]+/g, '');
      content = content.replace(/{\s*type\s+[a-zA-Z0-9_]+/g, '{');

      // 6. Clean up any double commas or empty imports resulting from type removal
      content = content.replace(/,\s*,/g, ',');
      content = content.replace(/{\s*,/g, '{');
      content = content.replace(/,\s*}/g, ' }');

      fs.writeFileSync(filePath, content);
    }
  });
}

walk('./src');
console.log('Deep clean complete.');
