const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      walk(filePath);
    } else {
      // Process both already renamed .jsx/.js and remaining .tsx/.ts
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        const isTs = filePath.endsWith('.tsx') || filePath.endsWith('.ts');
        const newPath = isTs ? filePath.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js') : filePath;
        
        console.log(`Cleaning: ${filePath}`);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Remove 'type' keyword from named imports: { type X } -> { X }
        content = content.replace(/,\s*type\s+([a-zA-Z0-9_]+)/g, ', $1');
        content = content.replace(/{\s*type\s+([a-zA-Z0-9_]+)/g, '{ $1');
        
        // 2. Remove 'import type ...' lines
        content = content.replace(/^import\s+type\s+.*?;?\r?\n/gm, '');
        
        // 3. Remove explicit .tsx or .ts extensions in import strings
        content = content.replace(/\.tsx(['"])/g, '$1');
        content = content.replace(/\.ts(['"])/g, '$1');

        // 4. Remove type annotations in function signatures: (x: number) -> (x)
        // Also handles (x: string | number) and standard primitives
        content = content.replace(/:\s*(number|string|boolean|void|any|unknown|never|ClassValue|VariantProps<[^>]+>)/g, '');
        
        // 5. Remove 'as Type' assertions
        content = content.replace(/\s+as\s+[A-Z][a-zA-Z0-9_<>|[\]]+/g, '');

        // 6. Remove generic type parameters from function calls/definitions: <T>
        // Use caution, but standard ones in shadcn like <HTMLDivElement> should go
        content = content.replace(/<[A-Z][a-zA-Z0-9_|[\]]+>/g, '');

        fs.writeFileSync(filePath, content);
        if (filePath !== newPath) {
          fs.renameSync(filePath, newPath);
          console.log(`Renamed to: ${newPath}`);
        }
      }
    }
  });
}

walk('./src');
