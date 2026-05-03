import fs from 'fs';

const path = 'src/pages/ToolPage.tsx';
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
  content = content.replace(new RegExp(`${tool},? ?`), '');
}

fs.writeFileSync(path, content);
