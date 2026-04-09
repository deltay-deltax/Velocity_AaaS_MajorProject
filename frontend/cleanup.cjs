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
      const ext = path.extname(filePath);
      if (ext === '.jsx' || ext === '.js') {
        const tsxPath = filePath.replace(/\.jsx$/, '.tsx').replace(/\.js$/, '.ts');
        if (fs.existsSync(tsxPath)) {
          console.log(`Deleting duplicate: ${filePath}`);
          fs.unlinkSync(filePath);
        } else {
          // If no TS equivalent, and we want to "conver the whole frontend to typescript", we rename
          // Wait, the user said "take care of Onboarding.jsx that should still remain"
          if (file === 'Onboarding.jsx') {
            console.log(`Keeping ${filePath}`);
          } else {
            console.log(`Renaming to TS/TSX: ${filePath}`);
            fs.renameSync(filePath, tsxPath);
          }
        }
      }
    }
  });
}

walk(path.join(__dirname, 'src'));
console.log('Cleanup complete.');
