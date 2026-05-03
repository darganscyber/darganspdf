import fs from 'fs';

let content = fs.readFileSync('src/data/tools.ts', 'utf-8');

// Regex replace protect and unlock
content = content.replace(/\s*{\s*id: 'protect-pdf'[^\}]*?\},/g, '');
content = content.replace(/\s*{\s*id: 'unlock-pdf'[^\}]*?\},/g, '');

fs.writeFileSync('src/data/tools.ts', content);
