import fs from 'fs';

const path = 'src/pages/tools/SimplePdfTools.tsx';
let content = fs.readFileSync(path, 'utf-8');

const toolsToRemove = [
  'WordToPdf',
  'PdfToExcel',
  'ExcelToPdf',
  'PdfToPpt',
  'PptToPdf',
  'HtmlToPdf',
  'PdfToHtml',
  'EpubToPdf',
  'PdfToEpub'
];

for (const tool of toolsToRemove) {
  content = content.replace(new RegExp(`export function ${tool}\\(\\) {.*?};?\\n?`), '');
}

fs.writeFileSync(path, content);
