import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { TournamentPassData } from './passApi';

/**
 * Generates and downloads a clean, vector-based PDF match pass using jsPDF library.
 * Does NOT use html2canvas or screen capture.
 */
export async function downloadPassPdf(
  passOrElementId: TournamentPassData | string,
  passCodeOrQr?: string
): Promise<boolean> {
  try {
    let pass: TournamentPassData;
    let qrDataUrl = passCodeOrQr;

    if (typeof passOrElementId === 'string') {
      console.warn('downloadPassPdf called with string elementId; fallback to basic vector PDF.');
      return false;
    } else {
      pass = passOrElementId;
    }

    // Ensure we have a high-res QR code data URL
    if (!qrDataUrl || !qrDataUrl.startsWith('data:image')) {
      qrDataUrl = await QRCode.toDataURL(pass.pass_code, {
        width: 320,
        margin: 1,
        color: {
          dark: '#0b162c',
          light: '#ffffff',
        },
      });
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const cardX = 15;
    const cardY = 20;
    const cardWidth = 180;
    const cardHeight = 232;

    // 1. Ticket Outer Card Container (Deep Navy #0b162c)
    doc.setFillColor(11, 22, 44);
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 4, 4, 'F');

    // 2. Crimson Accent Strip (#d8392f)
    doc.setFillColor(216, 57, 47);
    doc.roundedRect(cardX, cardY, cardWidth, 4, 2, 2, 'F');

    // 3. Header Section
    doc.setTextColor(216, 57, 47);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SARV SEWA SASHKTIKARN SANGTHAN (REGD) PRESENTS', cardX + 10, cardY + 14);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('OPERATION SINDOOR', cardX + 10, cardY + 22);

    doc.setTextColor(245, 158, 11); // Amber
    doc.setFontSize(10);
    doc.text('CRICKET CUP 2026 • SEASON 2', cardX + 10, cardY + 28);

    // Free Pass Badge (Top Right)
    doc.setFillColor(245, 158, 11);
    doc.roundedRect(cardX + cardWidth - 56, cardY + 12, 46, 8, 2, 2, 'F');
    doc.setTextColor(11, 22, 44);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('FREE SPECTATOR PASS', cardX + cardWidth - 53, cardY + 17.5);

    // 4. Venue & Stand Bar
    doc.setFillColor(26, 39, 62);
    doc.rect(cardX, cardY + 34, cardWidth, 11, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text('VENUE: Sector 16 Cricket Stadium, Chandigarh', cardX + 10, cardY + 41);
    doc.setTextColor(245, 158, 11);
    doc.text('FREE ENTRY PASS', cardX + cardWidth - 42, cardY + 41);

    // 5. Pass Details Grid
    const detailsY = cardY + 54;

    // Row 1: Name & Quantity
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.setFontSize(7.5);
    doc.text('PASS HOLDER NAME', cardX + 10, detailsY);
    doc.text('ADMIT PERSONS', cardX + 100, detailsY);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text(pass.name, cardX + 10, detailsY + 6);
    doc.text(
      `${pass.quantity} ${pass.quantity === 2 ? 'Persons' : 'Person'}${pass.guest_name ? ` (+ ${pass.guest_name})` : ''}`,
      cardX + 100,
      detailsY + 6
    );

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text(`Mobile: ${pass.phone}`, cardX + 10, detailsY + 11);
    doc.text('Valid for all 5 tournament days', cardX + 100, detailsY + 11);

    // Row 2: Match Access & Reference Code
    const row2Y = detailsY + 20;
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7.5);
    doc.text('TOURNAMENT ACCESS', cardX + 10, row2Y);
    doc.text('PASS REFERENCE CODE', cardX + 100, row2Y);

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(11);
    doc.text(pass.match_access || 'All Tournament Matches', cardX + 10, row2Y + 6);

    // Pass Reference Code pill
    doc.setFillColor(26, 39, 62);
    doc.roundedRect(cardX + 100, row2Y + 1.5, 42, 7, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('courier', 'bold');
    doc.setFontSize(12);
    doc.text(pass.pass_code, cardX + 103, row2Y + 6.5);
    doc.setFont('helvetica', 'normal');

    // 6. Sponsors Notice Strip
    const sponsorY = row2Y + 16;
    doc.setFillColor(26, 39, 62);
    doc.roundedRect(cardX + 10, sponsorY, cardWidth - 20, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("OFFICIAL SPONSOR: Nik Baker's", cardX + 15, sponsorY + 5.5);
    doc.setTextColor(245, 158, 11);
    doc.text('FREE SPECTATOR PASS', cardX + cardWidth - 55, sponsorY + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7);
    doc.text('* Notice: Free match pass provides stadium entry only. Complimentary refreshments are not included.', cardX + 15, sponsorY + 10.5);

    // 7. QR Code & Barcode Verification White Card
    const qrCardY = sponsorY + 20;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(cardX + 10, qrCardY, cardWidth - 20, 52, 3, 3, 'F');

    // QR Image
    if (qrDataUrl) {
      doc.addImage(qrDataUrl, 'PNG', cardX + 16, qrCardY + 4, 44, 44);
    }

    doc.setTextColor(11, 22, 44);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('OFFICIAL GATE SCAN TICKET', cardX + 66, qrCardY + 12);

    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Present this scannable QR code to stadium gate staff', cardX + 66, qrCardY + 18);
    doc.text('for rapid contactless admission at Sector 16 Stadium.', cardX + 66, qrCardY + 23);

    doc.setTextColor(5, 150, 105); // Emerald
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('✓ Single-Entry Gate Validated Pass', cardX + 66, qrCardY + 31);

    doc.setTextColor(100, 116, 139);
    doc.setFont('courier', 'bold');
    doc.setFontSize(10);
    doc.text(`[ ${pass.pass_code} ]`, cardX + 66, qrCardY + 40);

    // 8. Guidelines Box
    const rulesY = qrCardY + 58;
    doc.setFillColor(254, 242, 242); // Light red
    doc.roundedRect(cardX + 10, rulesY, cardWidth - 20, 24, 2, 2, 'F');
    doc.setFillColor(216, 57, 47);
    doc.rect(cardX + 10, rulesY, 2, 24, 'F'); // Left border

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(153, 27, 27);
    doc.setFontSize(7.5);
    doc.text('IMPORTANT ENTRY RULES:', cardX + 15, rulesY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(185, 28, 28);
    doc.setFontSize(7);
    doc.text('• Carry any Government Photo ID (Aadhaar, Student ID, Driving License).', cardX + 15, rulesY + 9.5);
    doc.text('• One pass per person; duplicate barcode scans will be rejected at the gate.', cardX + 15, rulesY + 13.5);
    doc.text('• Glass bottles, sharp items, and fireworks are strictly prohibited.', cardX + 15, rulesY + 17.5);
    doc.text('• Children above 5 years require an individual pass.', cardX + 15, rulesY + 21.5);

    // 9. Card Footer
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(
      'Sarv Sewa Sashktikarn Sangthan (Regd) • Web: sarvsewabharat.org',
      cardX + 10,
      cardY + cardHeight - 6
    );
    doc.text(
      `Issued: ${new Date().toLocaleDateString('en-IN')}`,
      cardX + cardWidth - 36,
      cardY + cardHeight - 6
    );

    // Save PDF
    doc.save(`Operation_Sindoor_Match_Pass_${pass.pass_code}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating vector pass PDF:', error);
    window.print();
    return false;
  }
}
