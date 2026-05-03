import fs from 'fs';

let simple = fs.readFileSync('src/pages/tools/SimplePdfTools.tsx', 'utf-8');
simple = simple.replace(/export function ProtectPdf\(\) \{[\s\S]*?\}\n\n?/g, '');
simple = simple.replace(/export function UnlockPdf\(\) \{[\s\S]*?\}\n\n?/g, '');
fs.writeFileSync('src/pages/tools/SimplePdfTools.tsx', simple);

let toolPage = fs.readFileSync('src/pages/ToolPage.tsx', 'utf-8');
toolPage = toolPage.replace(/ProtectPdf, /g, '');
toolPage = toolPage.replace(/UnlockPdf, /g, '');
fs.writeFileSync('src/pages/ToolPage.tsx', toolPage);

