import { jsPDF } from 'jspdf';
import { LeadInquiry } from '../types';
import {
  OFFICIAL_PHONE,
  OFFICIAL_EMAIL,
  OFFICIAL_LOCATION,
  OFFICIAL_MAPS_URL,
  CORPORATE_EMAILS,
} from '../services/database';

/**
 * Generates an official, executive-grade PDF confirmation document
 * for Aspire Global Management customer inquiries.
 */
export const generateInquiryPdf = (lead: LeadInquiry): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const darkGreen = [6, 36, 30] as const; // #06241E
  const deepEmerald = [10, 53, 45] as const; // #0A352D
  const gold = [223, 193, 123] as const; // #DFC17B
  const darkGold = [180, 145, 80] as const;
  const lightBg = [248, 250, 249] as const;
  const textDark = [30, 41, 59] as const;
  const textMuted = [100, 116, 139] as const;

  // ----------------------------------------------------
  // 1. TOP HEADER BANNER (Deep Forest Green with Gold Accent)
  // ----------------------------------------------------
  doc.setFillColor(...darkGreen);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold accent strip below header
  doc.setFillColor(...gold);
  doc.rect(0, 42, pageWidth, 2, 'F');

  // ----------------------------------------------------
  // 2. VECTOR LOGO EMBLEM ON HEADER
  // ----------------------------------------------------
  const logoCenterX = margin + 12;
  const logoCenterY = 21;
  const logoRadius = 13;

  // Outer logo circle
  doc.setFillColor(...deepEmerald);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.circle(logoCenterX, logoCenterY, logoRadius, 'FD');

  // Inner concentric gold ring
  doc.setLineWidth(0.3);
  doc.setDrawColor(...gold);
  doc.circle(logoCenterX, logoCenterY, logoRadius - 1.2, 'S');

  // Interlocking "AG" stylized monogram lines
  doc.setLineWidth(1.2);
  doc.setDrawColor(...gold);
  // Left leg of A
  doc.line(logoCenterX - 6, logoCenterY + 4, logoCenterX - 2, logoCenterY - 4);
  // Apex of A curving to base of G
  doc.line(logoCenterX - 2, logoCenterY - 4, logoCenterX + 1, logoCenterY + 4);
  // Upper curve of G
  doc.line(logoCenterX + 1, logoCenterY + 4, logoCenterX + 6, logoCenterY + 1);
  doc.line(logoCenterX + 6, logoCenterY + 1, logoCenterX + 6, logoCenterY - 3);
  doc.line(logoCenterX + 6, logoCenterY - 3, logoCenterX + 2, logoCenterY - 6);
  // Crossbar
  doc.setLineWidth(0.8);
  doc.line(logoCenterX + 2, logoCenterY - 0.5, logoCenterX + 6, logoCenterY - 0.5);

  // Logo horizontal divider line
  doc.setLineWidth(0.3);
  doc.line(logoCenterX - 8, logoCenterY + 6.5, logoCenterX + 8, logoCenterY + 6.5);

  // Tiny brand wordmark inside emblem
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(3.8);
  doc.setTextColor(...gold);
  doc.text('ASPIRE GLOBAL', logoCenterX, logoCenterY + 8.8, { align: 'center' });
  doc.setFontSize(3);
  doc.setFont('helvetica', 'normal');
  doc.text('MANAGEMENT', logoCenterX, logoCenterY + 10.8, { align: 'center' });

  // ----------------------------------------------------
  // 3. COMPACT RIGHT-CORNER VERIFICATION BADGE (Zero Overlap)
  // ----------------------------------------------------
  const badgeWidth = 42;
  const badgeHeight = 21;
  const badgeX = pageWidth - margin - badgeWidth; // 154mm
  const badgeY = 10.5;

  doc.setFillColor(...deepEmerald);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(...gold);
  doc.text('INQUIRY CONFIRMATION', badgeX + badgeWidth / 2, badgeY + 5.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(lead.id, badgeX + badgeWidth / 2, badgeY + 12, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('VERIFIED & LOGGED', badgeX + badgeWidth / 2, badgeY + 17, { align: 'center' });

  // ----------------------------------------------------
  // 4. BRAND TITLES ON HEADER (Left side with guaranteed safe maxWidth)
  // ----------------------------------------------------
  const textStartX = logoCenterX + logoRadius + 6;
  const maxHeaderTitleWidth = badgeX - textStartX - 5; // ~104mm safe boundary

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('ASPIRE GLOBAL MANAGEMENT', textStartX, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...gold);
  doc.text(
    'Premier Corporate Solutions: HR · Marketing · Cleaning · Turnkey UAE',
    textStartX,
    21,
    { maxWidth: maxHeaderTitleWidth }
  );

  doc.setFontSize(7.2);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(
    'Ajman Free Zone, UAE   |   WhatsApp Desk: +971 54 137 4580',
    textStartX,
    27,
    { maxWidth: maxHeaderTitleWidth }
  );

  doc.setFontSize(6.8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Official Enterprise Portal: support@aspireglobalmanagement.com',
    textStartX,
    33,
    { maxWidth: maxHeaderTitleWidth }
  );

  // ----------------------------------------------------
  // 5. DOCUMENT TITLE & SUMMARY CALLOUT
  // ----------------------------------------------------
  let currentY = 52;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...darkGreen);
  doc.text('Official Consultation & Service Inquiry Record', margin, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  doc.text(
    'Thank you for contacting Aspire Global Management. Your inquiry has been securely registered in our system and forwarded for executive WhatsApp consultation.',
    margin,
    currentY,
    { maxWidth: contentWidth }
  );

  currentY += 10;

  // ----------------------------------------------------
  // 5. TABLE-BASED INQUIRY DATA
  // ----------------------------------------------------
  // Table Header Bar
  doc.setFillColor(...deepEmerald);
  doc.rect(margin, currentY, contentWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...gold);
  doc.text('INQUIRY PARAMETER', margin + 4, currentY + 5.5);
  doc.text('CLIENT DETAILS & SUBMITTED SPECIFICATIONS', margin + 62, currentY + 5.5);

  currentY += 8;

  // Define Table Rows
  const tableRows: { label: string; value: string; isHighlight?: boolean }[] = [
    { label: 'Reference Number', value: lead.id, isHighlight: true },
    { label: 'Submission Timestamp', value: new Date(lead.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Dubai' }) + ' (GST)' },
    { label: 'Client Full Name', value: lead.fullName, isHighlight: true },
    { label: 'Service of Interest', value: lead.service, isHighlight: true },
    { label: 'WhatsApp / Contact Number', value: lead.phone, isHighlight: true },
    { label: 'Client Corporate Email', value: lead.email },
    { label: 'Company / Organization', value: lead.company || 'Not Specified (Individual Enterprise)' },
    { label: 'Preferred Timeline', value: lead.preferredTimeline || 'Immediate (Within 48 Hours)' },
    { label: 'Inquiry Content & Scope', value: lead.message || 'Standard Consultation & Rate Inquiry' },
    { label: 'Official Routing Channel', value: 'WhatsApp Direct Priority Dispatch (+971 54 137 4580)' },
    { label: 'Processing Status', value: 'Logged · Active Priority Follow-up (Under 2-Hour Response SLA)' },
  ];

  doc.setFontSize(8.5);
  const col1Width = 56;
  const col2Width = contentWidth - col1Width;

  tableRows.forEach((row, idx) => {
    // Calculate required height based on multiline text in column 2
    const lines = doc.splitTextToSize(row.value, col2Width - 6);
    const rowHeight = Math.max(8.5, lines.length * 4.2 + 4);

    // Alternate background shading
    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(...lightBg);
    }
    doc.rect(margin, currentY, contentWidth, rowHeight, 'F');

    // Subtle table border lines
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setLineWidth(0.2);
    doc.rect(margin, currentY, contentWidth, rowHeight, 'S');
    doc.line(margin + col1Width, currentY, margin + col1Width, currentY + rowHeight);

    // Column 1: Label
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGreen);
    doc.text(row.label, margin + 4, currentY + 5.5);

    // Column 2: Value
    if (row.isHighlight) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...textDark);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
    }

    doc.text(lines, margin + col1Width + 4, currentY + 5.5);

    currentY += rowHeight;
  });

  currentY += 8;

  // ----------------------------------------------------
  // 6. WHATSAPP & DIRECT CONNECT ACTION BOX
  // ----------------------------------------------------
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

  // Green accent bar on left
  doc.setFillColor(...deepEmerald);
  doc.roundedRect(margin, currentY, 4, 24, 1, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkGreen);
  doc.text('DIRECT WHATSAPP CONSULTATION & FAST-TRACK PROCESSING', margin + 8, currentY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...textDark);
  doc.text(
    `Your inquiry reference ${lead.id} has been pre-configured for WhatsApp direct messaging. You can contact our dedicated corporate desk at +971 54 137 4580 with your reference ID for immediate quote preparation, SLA formulation, or site visit scheduling.`,
    margin + 8,
    currentY + 11.5,
    { maxWidth: contentWidth - 12 }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(...darkGold);
  doc.text(`Official WhatsApp: ${OFFICIAL_PHONE}   |   Location: ${OFFICIAL_LOCATION}`, margin + 8, currentY + 20.5);

  currentY += 30;

  // ----------------------------------------------------
  // 7. CORPORATE EMAIL DIRECTORY (Required by User)
  // ----------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkGreen);
  doc.text('Corporate Departmental Email Directory', margin, currentY);

  currentY += 5;

  const emailBoxWidth = (contentWidth - 6) / 2;
  const emailBoxHeight = 13;

  const deptEmails = [
    { title: 'Client Support & Helpdesk', email: 'support@aspireglobalmanagement.com' },
    { title: 'HR Consultancy & Talent', email: 'hr@aspireglobalmanagement.com' },
    { title: 'General Inquiries & Information', email: 'info@aspireglobalmanagement.com' },
    { title: 'Enterprise Sales & Partnerships', email: 'sales@aspireglobalmanagement.com' },
  ];

  deptEmails.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const boxX = margin + col * (emailBoxWidth + 6);
    const boxY = currentY + row * (emailBoxHeight + 3);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(boxX, boxY, emailBoxWidth, emailBoxHeight, 1.5, 1.5, 'FD');

    // Small Gold Pip
    doc.setFillColor(...gold);
    doc.circle(boxX + 4, boxY + 6.5, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...deepEmerald);
    doc.text(item.title, boxX + 8, boxY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(item.email, boxX + 8, boxY + 9.5);
  });

  currentY += (emailBoxHeight + 3) * 2 + 6;

  // ----------------------------------------------------
  // 8. FOOTER WITH LEGAL & ASPIRE CONTACT DETAILS
  // ----------------------------------------------------
  const footerY = pageHeight - 26;

  // Gold separator line
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.6);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...darkGreen);
  doc.text('ASPIRE GLOBAL MANAGEMENT · AJMAN FREE ZONE, UAE', margin, footerY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...textMuted);
  doc.text(
    `Official Contact: ${OFFICIAL_PHONE}  ·  Emails: support@ | hr@ | info@ | sales@aspireglobalmanagement.com`,
    margin,
    footerY + 9.5
  );

  doc.text(
    `Google Maps: ${OFFICIAL_MAPS_URL}`,
    margin,
    footerY + 13.5
  );

  doc.text(
    '© 2026 Aspire Global Management. All rights reserved. Confidential corporate inquiry record under UAE commercial regulations.',
    margin,
    footerY + 17.5
  );

  // Decorative Bottom Forest Green Strip
  doc.setFillColor(...darkGreen);
  doc.rect(0, pageHeight - 3.5, pageWidth, 3.5, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, pageHeight - 3.5, pageWidth, 0.7, 'F');

  // Save the PDF file directly to client browser
  const filename = `AspireGlobal_Inquiry_${lead.id}.pdf`;
  doc.save(filename);
};
