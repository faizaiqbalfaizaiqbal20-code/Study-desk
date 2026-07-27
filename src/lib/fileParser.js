import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up worker for PDF parsing
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parseFileText(file) {
  const extension = file.name.split('.').pop().toLowerCase();

  if (extension === 'pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  } 
  
  if (extension === 'docx' || extension === 'doc') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } 

  if (extension === 'pptx' || extension === 'ppt') {
    // Basic text extraction for plain files/txt
    const text = await file.text();
    return text;
  }

  if (extension === 'txt') {
    return await file.text();
  }

  throw new Error('Unsupported file format. Please upload PDF, DOCX, or TXT file.');
}