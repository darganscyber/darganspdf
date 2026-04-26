import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export interface WatermarkOptions {
  text: string;
}

export async function addWatermark(file: File, options: WatermarkOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = helveticaFont.widthOfTextAtSize(options.text, 50);
    
    page.drawText(options.text, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: 50,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2), // Dark grey
      opacity: 0.3,
      rotate: degrees(45),
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
