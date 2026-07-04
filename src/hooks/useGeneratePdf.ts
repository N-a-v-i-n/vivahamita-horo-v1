import { useState } from 'react';
// We use html2pdf.js which handles auto page-breaks perfectly
import html2pdf from 'html2pdf.js';

export const useGeneratePdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async (elementId: string, filename: string = 'Vivahamitra-Report.pdf') => {
    try {
      setIsGenerating(true);
      const element = document.getElementById(elementId);
      
      if (!element) {
        throw new Error(`Element with id ${elementId} not found`);
      }

      // We capture the entire report container so that html2pdf can compute page breaks automatically.
      const reportContainer = element.querySelector('.report-container') as HTMLElement || element;

      const opt = {
        margin:       0,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 1.5, useCORS: true, logging: false },
        jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' },
        pagebreak:    { mode: 'css', avoid: '.pdf-page-avoid-break' }
      };

      await html2pdf().set(opt).from(reportContainer).save();

    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePdf, isGenerating };
};
