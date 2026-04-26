import { PDFDocument } from 'pdf-lib';

export async function protectPdf(file: File, password: string): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const options: any = {
    userPassword: password,
    ownerPassword: password,
    permissions: {
      printing: 'highResolution',
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: false,
      contentAccessibility: false,
      documentAssembly: false,
    },
  };
  
  const pdfBytes = await pdfDoc.save(options);

  return new Blob([pdfBytes], { type: 'application/pdf' });
}
