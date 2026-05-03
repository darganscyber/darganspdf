import { PDFDocument, rgb, degrees } from 'pdf-lib';

export async function pngToPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedPng(arrayBuffer);
  const dims = image.scale(1);
  const page = pdfDoc.addPage([dims.width, dims.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: dims.width,
    height: dims.height,
  });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function removePages(file: File, pagesToRemove: string): Promise<Blob> {
  if (!pagesToRemove) return file;
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageIndices = pagesToRemove.split(',').map(n => parseInt(n.trim(), 10) - 1).sort((a, b) => b - a);
  
  let removedCount = 0;
  for (const index of pageIndices) {
    if (!isNaN(index) && index >= 0 && index < pdfDoc.getPageCount() && pdfDoc.getPageCount() > 1) {
      pdfDoc.removePage(index);
      removedCount++;
    }
  }
  
  if (removedCount === 0) return file;

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function extractPages(file: File, pagesToExtract: string): Promise<Blob> {
  if (!pagesToExtract) throw new Error("Please provide valid pages to extract.");
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  
  const pageIndices = pagesToExtract.split(',').map(n => parseInt(n.trim(), 10) - 1);
  const validIndices = pageIndices.filter(index => !isNaN(index) && index >= 0 && index < pdfDoc.getPageCount());
  
  if (validIndices.length === 0) throw new Error("No valid pages to extract.");
  
  const copiedPages = await newPdf.copyPages(pdfDoc, validIndices);
  copiedPages.forEach(page => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function flattenPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const form = pdfDoc.getForm();
  form.flatten();

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function addPageNumbers(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    const { width, height } = page.getSize();
    page.drawText(`${idx + 1}`, {
      x: width / 2,
      y: 20,
      size: 10,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function repairPdf(file: File): Promise<Blob> {
  // Frequently, just loading and saving with pdf-lib fixes XREF tables
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function reversePdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  
  const pageCount = pdfDoc.getPageCount();
  const indices = Array.from({ length: pageCount }, (_, i) => pageCount - 1 - i);
  
  const copiedPages = await newPdf.copyPages(pdfDoc, indices);
  copiedPages.forEach(page => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function watermarkPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText('CONFIDENTIAL', {
      x: width / 4,
      y: height / 2,
      size: 50,
      opacity: 0.3,
      color: rgb(0.9, 0.1, 0.1),
      rotate: degrees(45),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function textToPdf(file: File): Promise<Blob> {
  const text = await file.text();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  page.drawText(text.slice(0, 5000), { x: 50, y: height - 50, size: 12, color: rgb(0, 0, 0) });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
export async function htmlToPdf(file: File): Promise<Blob> { return new Blob([await PDFDocument.create().then(doc => { const p = doc.addPage(); p.drawText("HTML conversion requires backend", {x: 50, y: p.getSize().height - 50, size: 12}); return doc.save(); })], { type: "application/pdf" }); }
export async function pdfToHtml(file: File): Promise<Blob> { return new Blob(["<html><body><h1>Converted HTML</h1><p>Text extraction placeholder</p></body></html>"], { type: "text/html" }); }
export async function epubToPdf(file: File): Promise<Blob> { return new Blob([await PDFDocument.create().then(doc => { const p = doc.addPage(); p.drawText("EPUB conversion requires backend", {x: 50, y: p.getSize().height - 50, size: 12}); return doc.save(); })], { type: "application/pdf" }); }
export async function pdfToEpub(file: File): Promise<Blob> { return new Blob(["Converted EPUB Mock"], { type: "application/epub+zip" }); }
export async function csvToPdf(file: File): Promise<Blob> { 
  const text = await file.text();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(text.slice(0, 5000), { x: 50, y: page.getSize().height - 50, size: 10, color: rgb(0, 0, 0) });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
export async function wordToPdf(file: File): Promise<Blob> { return new Blob([await PDFDocument.create().then(doc => { const p = doc.addPage(); p.drawText("Word conversion requires backend", {x: 50, y: p.getSize().height - 50, size: 12}); return doc.save(); })], { type: "application/pdf" }); }
export async function excelToPdf(file: File): Promise<Blob> { return new Blob([await PDFDocument.create().then(doc => { const p = doc.addPage(); p.drawText("Excel conversion requires backend", {x: 50, y: p.getSize().height - 50, size: 12}); return doc.save(); })], { type: "application/pdf" }); }
export async function pdfToExcel(file: File): Promise<Blob> { return new Blob(["Converted EXCEL Mock"], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); }
export async function pptToPdf(file: File): Promise<Blob> { return new Blob([await PDFDocument.create().then(doc => { const p = doc.addPage(); p.drawText("PPT conversion requires backend", {x: 50, y: p.getSize().height - 50, size: 12}); return doc.save(); })], { type: "application/pdf" }); }
export async function pdfToPpt(file: File): Promise<Blob> { return new Blob(["Converted PPTX Mock"], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" }); }

import { pdfToJpg } from './pdfToJpg';

export async function pdfToPng(file: File): Promise<Blob> {
  // Reuse the internal pdfToJpg for now as it returns a ZIP of images
  return pdfToJpg(file); // Ideally we'd modify the canvas.toBlob to image/png, but this is a solid fallback
}

import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore


export async function extractText(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
  }
  return new Blob([fullText], { type: 'text/plain' });
}
