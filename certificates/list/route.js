import { NextResponse } from 'next/server';
import { getUserCertificates, getCourseCertificates } from '../utils/certificate-database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const type = searchParams.get('type');

    // For now, skip auth check until auth system is set up
    // const authUser = await verifyAuth(request);

    let certificates = [];

    if (type === 'user' || userId) {
      certificates = await getUserCertificates(userId);
    } else if (type === 'course' && courseId) {
      certificates = await getCourseCertificates(courseId);
    } else {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    const grouped = {
      CE: certificates.filter(c => c.courseType === 'CE'),
      Personal: certificates.filter(c => c.courseType === 'Personal'),
      Professional: certificates.filter(c => c.courseType === 'Professional')
    };

    const totalCEHours = grouped.CE.reduce((sum, cert) => sum + (cert.ceHours || 0), 0);

    return NextResponse.json({
      success: true,
      totalCertificates: certificates.length,
      totalCEHours,
      certificates: grouped,
      summary: {
        ceCertificates: grouped.CE.length,
        personalCertificates: grouped.Personal.length,
        professionalCertificates: grouped.Professional.length
      }
    });

  } catch (error) {
    console.error('Certificate list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}
