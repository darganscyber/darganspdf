import fs from 'fs';

const path = 'src/data/tools.ts';
let content = fs.readFileSync(path, 'utf-8');

const toolsToRemove = [
  'word-to-pdf',
  'pdf-to-word',
  'pdf-to-excel',
  'excel-to-pdf',
  'pdf-to-ppt',
  'ppt-to-pdf',
  'html-to-pdf',
  'pdf-to-html',
  'epub-to-pdf',
  'pdf-to-epub'
];

for (const id of toolsToRemove) {
  const regex = new RegExp(`\\s*{\\s*id: '${id}'[\\s\\S]*?},\\n?`, 'g');
  content = content.replace(regex, '');
}

fs.writeFileSync(path, content);
