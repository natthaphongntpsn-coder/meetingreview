
import jsPDF from 'jspdf';
import { thSarabunBase64 } from './thsarabun-font';
import { ReportData } from '../types';

export const generatePdf = async (data: ReportData) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // Add font
  doc.addFileToVFS('THSarabunNew.ttf', thSarabunBase64);
  doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal');
  doc.setFont('THSarabunNew');

  // Helper function to handle text wrapping and y-position incrementing
  const writeText = (text: string, x: number, startY: number, options?: any) => {
    const splitText = doc.splitTextToSize(text, pageWidth - margin - x);
    doc.text(splitText, x, startY, options);
    return startY + (splitText.length * 5); // Approximate line height
  };

  const writeSection = (number: string, title: string, content: string, startY: number): number => {
    doc.setFontSize(16);
    let currentY = writeText(`${number}. ${title}`, margin, startY);
    doc.setFontSize(14);
    const contentText = content || '..............................................................................................................................................................................';
    currentY = writeText(contentText, margin + 5, currentY + 2);
    return currentY + 3; // Add some space after the section
  };

  // Border
  doc.setDrawColor(0, 51, 153); // Blue
  doc.setLineWidth(1);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  doc.setDrawColor(220, 53, 69); // Red
  doc.setLineWidth(0.5);
  doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

  // Header
  doc.setFontSize(20);
  doc.text('รายงานการประชุม/อบรม/สัมมนา/ศึกษาดูงาน', pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(18);
  doc.text('โรงเรียนไขศรีปราโมชอนุสรณ์ สำนักงานเขตบางกะปิ กรุงเทพมหานคร', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text('ปีการศึกษา ๒๕๖๗', pageWidth / 2, y, { align: 'center' });
  y += 10;

  // Section 1
  doc.setFontSize(16);
  y = writeText('๑. การเข้าร่วมประชุม/อบรม/สัมมนา/ศึกษาดูงาน', margin, y);
  y += 2;
  doc.setFontSize(14);
  y = writeText('ข้าพเจ้าได้รับมอบหมาย/ได้รับคำสั่งให้เข้าร่วมประชุม/อบรม/สัมมนา/ศึกษาดูงาน', margin + 5, y);
  y = writeText(`ในวันที่ ${data.date ? new Date(data.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'}) : '...........................................................'}`, margin + 5, y);
  y = writeText(`เรื่อง ${data.subject || '...................................................................................................................'}`, margin + 5, y);
  y = writeText(`ณ ${data.location || '...........................................................................................................................'}`, margin + 5, y);
  y = writeText(`ชื่อประธาน/วิทยากร(ประชุม/อบรม/สัมมนา/ศึกษาดูงาน) ${data.speaker || '...................................................'}`, margin + 5, y);
  y += 5;

  // Other Sections
  y = writeSection('๒', 'กำหนดกิจกรรม หัวข้อ ประเด็นสำคัญ ประชุม/อบรม/สัมมนา/ศึกษาดูงาน', data.activities, y);
  y = writeSection('๓', 'สื่อ สิ่งพิมพ์ เอกสาร ที่ได้รับจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน', data.materials, y);
  y = writeSection('๔', 'สรุปผลที่ได้รับจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน', data.summary, y);
  y = writeSection('๕', 'การนำผลที่ได้รับจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน ไปใช้พัฒนางานในหน้าที่', data.application, y);
  y = writeSection('๖', 'ข้อเสนอแนะ ความเห็นจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน', data.suggestions, y);

  // Footer / Signatures
  const footerY = pageHeight - 40;
  doc.setFontSize(14);
  
  const reporterX = pageWidth / 4 + 10;
  doc.text('ลงชื่อ.................................................ผู้รายงาน', reporterX, footerY, { align: 'center' });
  doc.text(`( ${data.reporterName || '.................................................'} )`, reporterX, footerY + 8, { align: 'center' });

  const adminX = (pageWidth / 4) * 3 - 10;
  doc.text('ลงชื่อ.................................................', adminX, footerY, { align: 'center' });
  doc.text(`( ${data.administratorName || '.................................................'} )`, adminX, footerY + 8, { align: 'center' });
  doc.text('ผู้บริหารสถานศึกษา', adminX, footerY + 16, { align: 'center' });

  // Save the PDF
  doc.save('report.pdf');
};
