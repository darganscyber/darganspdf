import { PDFDocument } from 'pdf-lib';

/**
 * Extracts specific pages from a PDF.
 * @param file The PDF file
 * @param pageRanges Array of 0-indexed page numbers to extract
 * @returns Blob representing the new PDF
 */
export async function splitPdf(file: File, pagesToExtract: number[]): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const originalPdf = await PDFDocument.load(arrayBuffer);
  
  const newPdf = await PDFDocument.create();
  
  // ensure unique and valid indices
  const validIndices = pagesToExtract.filter(idx => idx >= 0 && idx < originalPdf.getPageCount());
  
  const copiedPages = await newPdf.copyPages(originalPdf, validIndices);
  
  copiedPages.forEach((page) => {
    newPdf.addPage(page);
  });

  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
