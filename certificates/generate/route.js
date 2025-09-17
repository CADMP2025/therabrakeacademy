import { NextResponse } from 'next/server';
import { generateCertificate } from '../utils/certificate-generator';
import { saveCertificateRecord } from '../utils/certificate-database';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId,
      courseId,
      courseName,
      courseType,
      userName,
      licenseNumber,
      completionDate,
      ceHours,
      instructorName
    } = body;

    if (!userId || !courseId || !courseName || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const certificateId = generateCertificateId(userId, courseId);

    const certificateData = {
      certificateId,
      userName,
      courseName,
      courseType,
      completionDate: completionDate || new Date().toISOString(),
      ceHours,
      licenseNumber,
      instructorName: instructorName || 'Rory Carothers, LPC',
      issueDate: new Date().toISOString()
    };

    const pdfBuffer = await generateCertificate(certificateData);

    await saveCertificateRecord({
      certificateId,
      userId,
      courseId,
      courseName,
      courseType,
      userName,
      licenseNumber,
      completionDate: certificateData.completionDate,
      ceHours,
      issueDate: certificateData.issueDate,
      verificationUrl: `https://therabrake.academy/verify/${certificateId}`
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${certificateId}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}

function generateCertificateId(userId, courseId) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `TBA-${courseId}-${userId}-${timestamp}-${random}`;
}
