import { PDFDocument } from 'pdf-lib';

export async function compressPdf(file: File, level: string): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // pdf-lib doesn't have true compression, but saving with useObjectStreams
  // and stripping unreferenced objects can reduce size slightly
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
