import { PDFDocument } from 'pdf-lib';

export async function unlockPdf(file: File, password: string): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  // Load using the password to decrypt it
  // @ts-ignore
  const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
  
  // Save without any encryption options to remove the password
  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: 'application/pdf' });
}
