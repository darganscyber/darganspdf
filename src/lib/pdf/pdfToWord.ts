import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function pdfToWord(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  // @ts-ignore
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;

  const paragraphs: Paragraph[] = [];
  
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const strings = textContent.items.map((item: any) => item.str).join(' ');
    
    if (strings.trim().length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: strings, font: 'Arial', size: 24 }),
          ],
        })
      );
    }
  }

  if (paragraphs.length === 0) {
     paragraphs.push(new Paragraph("No text found in this document."));
  }

  const doc = new Document({
    sections: [{
      children: paragraphs,
    }],
  });

  return await Packer.toBlob(doc);
}
