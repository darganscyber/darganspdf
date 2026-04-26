import { PDFDocument } from 'pdf-lib';

export async function jpgToPdf(files: File[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const isJpg = file.type === 'image/jpeg' || file.type === 'image/jpg';
    const isPng = file.type === 'image/png';
    const isWebp = file.type === 'image/webp';
    if (!isJpg && !isPng && !isWebp) continue; // Skip unsupported

    const imgBytes = await file.arrayBuffer();
    
    let image;
    // pdf-lib supports JPEG and PNG embedding directly.
    if (isJpg) {
      image = await pdfDoc.embedJpg(imgBytes);
    } else if (isPng) {
      image = await pdfDoc.embedPng(imgBytes);
    } else {
      // webp usually not supported natively by pdf-lib out of the box without manual conversion, 
      // but let's try to convert via canvas natively just in case, or we fallback if failed
      try {
          const imgUrl = URL.createObjectURL(file);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const i = new Image();
          await new Promise((res, rej) => {
             i.onload = res;
             i.onerror = rej;
             i.src = imgUrl;
          });
          canvas.width = i.width;
          canvas.height = i.height;
          if (ctx) ctx.drawImage(i, 0, 0);
          const pngData = canvas.toDataURL('image/png').split(',')[1];
          const raw = window.atob(pngData);
          const rawLength = raw.length;
          const array = new Uint8Array(new ArrayBuffer(rawLength));
          for (let j = 0; j < rawLength; j++) {array[j] = raw.charCodeAt(j);}
          image = await pdfDoc.embedPng(array);
      } catch (e) {
          continue;
      }
    }

    if (image) {
      const { width, height } = image.scale(1);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
