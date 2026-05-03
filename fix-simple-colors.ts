import fs from 'fs';

let simple = fs.readFileSync('src/pages/tools/SimplePdfTools.tsx', 'utf-8');
simple = simple.replace(/blue-500/g, 'amber-500').replace(/blue-400/g, 'amber-400');
simple = simple.replace(/cyan-500/g, 'amber-500');
simple = simple.replace(/emerald-500/g, 'amber-500');
fs.writeFileSync('src/pages/tools/SimplePdfTools.tsx', simple);
