import fs from 'fs';

function fixFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/import pdfWorkerUrl.*?;/g, '');
  content = content.replace(/pdfjsLib\.GlobalWorkerOptions\.workerSrc = pdfWorkerUrl;/g, 'pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;');
  fs.writeFileSync(filePath, content);
}

fixFile('src/pages/tools/SplitPdf.tsx');
fixFile('src/lib/pdf/additional.ts');
fixFile('src/lib/pdf/pdfToJpg.ts');
