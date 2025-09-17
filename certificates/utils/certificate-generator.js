import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

export async function generateCertificate(data) {
  const {
    certificateId,
    userName,
    courseName,
    courseType,
    completionDate,
    ceHours,
    licenseNumber,
    instructorName,
    issueDate
  } = data;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([792, 612]);

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const primaryBlue = rgb(0.231, 0.51, 0.965);
  const goldAccent = rgb(0.98, 0.8, 0.145);
  const darkGray = rgb(0.122, 0.161, 0.216);

  drawCertificateBorder(page, primaryBlue, goldAccent);

  const centerX = 396;

  page.drawText('TheraBrake Academy™', {
    x: centerX,
    y: 520,
    size: 32,
    font: timesRomanBold,
    color: primaryBlue,
  });

  page.drawText('Pause. Process. Progress.', {
    x: centerX,
    y: 495,
    size: 14,
    font: timesRoman,
    color: darkGray,
  });

  const certTitle = courseType === 'CE' 
    ? 'Certificate of Continuing Education' 
    : 'Certificate of Completion';
  
  page.drawText(certTitle, {
    x: centerX,
    y: 440,
    size: 24,
    font: timesRomanBold,
    color: darkGray,
  });

  page.drawText('This certifies that', {
    x: centerX,
    y: 380,
    size: 16,
    font: timesRoman,
    color: darkGray,
  });

  page.drawText(userName, {
    x: centerX,
    y: 340,
    size: 36,
    font: timesRomanBold,
    color: darkGray,
  });

  const completionText = courseType === 'CE' 
    ? 'has successfully completed the continuing education course'
    : 'has successfully completed';
    
  page.drawText(completionText, {
    x: centerX,
    y: 300,
    size: 16,
    font: timesRoman,
    color: darkGray,
  });

  page.drawText(courseName, {
    x: centerX,
    y: 260,
    size: 22,
    font: timesRomanBold,
    color: primaryBlue,
  });

  if (courseType === 'CE' && ceHours) {
    page.drawText(`${ceHours} Continuing Education Hours`, {
      x: centerX,
      y: 220,
      size: 16,
      font: timesRoman,
      color: darkGray,
    });

    if (licenseNumber) {
      page.drawText(`License Number: ${licenseNumber}`, {
        x: centerX,
        y: 195,
        size: 12,
        font: timesRoman,
        color: darkGray,
      });
    }
  }

  const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  page.drawText(`Date of Completion: ${formattedDate}`, {
    x: centerX,
    y: 160,
    size: 14,
    font: timesRoman,
    color: darkGray,
  });

  page.drawLine({
    start: { x: 200, y: 90 },
    end: { x: 350, y: 90 },
    thickness: 1,
    color: darkGray,
  });

  page.drawText(instructorName, {
    x: 275,
    y: 95,
    size: 12,
    font: timesRoman,
    color: darkGray,
  });

  page.drawText('Instructor', {
    x: 275,
    y: 70,
    size: 10,
    font: helvetica,
    color: darkGray,
  });

  page.drawLine({
    start: { x: 442, y: 90 },
    end: { x: 592, y: 90 },
    thickness: 1,
    color: darkGray,
  });

  page.drawText('Program Director', {
    x: 517,
    y: 70,
    size: 10,
    font: helvetica,
    color: darkGray,
  });

  if (courseType === 'CE') {
    page.drawText('Texas LPC Approved • NBCC Provider #87569', {
      x: centerX,
      y: 40,
      size: 10,
      font: helvetica,
      color: darkGray,
    });
  }

  page.drawText(`Certificate ID: ${certificateId}`, {
    x: 120,
    y: 50,
    size: 8,
    font: helvetica,
    color: darkGray,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function drawCertificateBorder(page, primaryColor, secondaryColor) {
  const { width, height } = page.getSize();
  
  page.drawRectangle({
    x: 30,
    y: 30,
    width: width - 60,
    height: height - 60,
    borderColor: primaryColor,
    borderWidth: 3,
  });

  page.drawRectangle({
    x: 40,
    y: 40,
    width: width - 80,
    height: height - 80,
    borderColor: secondaryColor,
    borderWidth: 1,
    opacity: 0.5,
  });
}
