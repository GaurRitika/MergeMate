import { PDFDocument } from "pdf-lib";

export const mergePDFs = async (files: File[]): Promise<Blob> => {
  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();

  // Process each PDF file
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save the merged PDF
  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
};

export const downloadPDF = (blob: Blob, filename: string = "merged.pdf") => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
