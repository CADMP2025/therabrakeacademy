import { NextResponse } from 'next/server';
import { verifyCertificate } from '../utils/certificate-database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get('id');

    if (!certificateId) {
      return NextResponse.json(
        { error: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    const certificate = await verifyCertificate(certificateId);

    if (!certificate) {
      return NextResponse.json(
        { 
          valid: false,
          error: 'Certificate not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      certificate: {
        id: certificate.certificateId,
        recipientName: certificate.userName,
        courseName: certificate.courseName,
        courseType: certificate.courseType,
        completionDate: certificate.completionDate,
        ceHours: certificate.ceHours,
        issueDate: certificate.issueDate,
        licenseNumber: certificate.licenseNumber ? `****${certificate.licenseNumber.slice(-4)}` : null,
        accreditation: certificate.courseType === 'CE' ? {
          texasLPC: true,
          nbccProvider: '87569'
        } : null
      },
      message: 'This certificate is valid and was issued by TheraBrake Academy™'
    });

  } catch (error) {
    console.error('Certificate verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify certificate' },
      { status: 500 }
    );
  }
}
