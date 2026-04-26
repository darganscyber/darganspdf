import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface SignOptions {
  signatureName: string;
}

export async function signPdf(file: File, options: SignOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Actually we should use a cursive font, but TimesRomanItalic is standard
  const font = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1]; // usually sign at the end
  
  const { width, height } = lastPage.getSize();
  lastPage.drawText(`Signed by: ${options.signatureName}`, {
    x: 50,
    y: 50,
    size: 24,
    font,
    color: rgb(0, 0, 0), // Black
  });
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
