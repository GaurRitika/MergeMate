import { PDFDocument } from 'pdf-lib';
import { Document, Paragraph, TextRun, Packer } from 'docx';

export const extractTextFromPdf = async (file: File): Promise<string[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    const pages: string[] = [];

    // Note: pdf-lib doesn't have built-in text extraction
    // This is a simplified version - in production, you'd use pdf.js or similar
    for (let i = 0; i < pageCount; i++) {
      // Placeholder text - in real implementation, would extract actual text
      pages.push(`[Content from page ${i + 1}]`);
    }

    return pages;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

export const convertPdfToWord = async (file: File): Promise<Blob> => {
  try {
    // Extract text from PDF
    const pages = await extractTextFromPdf(file);
    
    // Create Word document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Converted from: ${file.name}`,
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Note: This is a basic text extraction. For best results with complex layouts, consider using specialized PDF to Word services.',
                  italics: true,
                  size: 20,
                }),
              ],
              spacing: {
                after: 400,
              },
            }),
            ...pages.map((pageText, index) => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Page ${index + 1}`,
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: {
                  before: 300,
                  after: 200,
                },
              })
            ),
          ],
        },
      ],
    });

    // Generate Word document blob
    const blob = await Packer.toBlob(doc);
    return blob;
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    throw new Error('Failed to convert PDF to Word');
  }
};

export const downloadWordFile = (blob: Blob, originalFilename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = originalFilename.replace('.pdf', '.docx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
