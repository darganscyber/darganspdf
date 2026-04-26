import { PDFDocument } from 'pdf-lib';

export interface MetadataOptions {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
}

export async function updateMetadata(file: File, meta: MetadataOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  if (meta.title) pdfDoc.setTitle(meta.title);
  if (meta.author) pdfDoc.setAuthor(meta.author);
  if (meta.subject) pdfDoc.setSubject(meta.subject);
  if (meta.keywords) pdfDoc.setKeywords(meta.keywords.split(',').map(s => s.trim()));
  if (meta.creator) pdfDoc.setCreator(meta.creator);
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
