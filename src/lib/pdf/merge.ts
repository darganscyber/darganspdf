import { PDFDocument } from 'pdf-lib';

/**
 * Merges multiple PDF files into one.
 * @param files Array of PDF files
 * @returns Blob representing the merged PDF
 */
export async function mergePdfs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfToMake = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdfToMake, pdfToMake.getPageIndices());
    
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
