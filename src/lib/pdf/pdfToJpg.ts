import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

export async function pdfToJpg(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  // @ts-ignore
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;

  const zip = new JSZip();

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // Good quality
    
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (ctx) {
      // @ts-ignore
      await page.render({ canvasContext: ctx, viewport }).promise;
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      // Remove "data:image/jpeg;base64,"
      const base64Data = dataUrl.split(',')[1];
      zip.file(`page-${i}.jpg`, base64Data, { base64: true });
    }
  }

  return await zip.generateAsync({ type: 'blob' });
}
