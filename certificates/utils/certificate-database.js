import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ynizozzfjkocvbycxwvo.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluaXpvenpmamtvY3ZieWN4d3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMTU3ODMsImV4cCI6MjA3MzU5MTc4M30.iZCoPeTpP2RJveyXNVgkkUX5ydO-9lCKNuxvyG8KtJw'
);

export async function saveCertificateRecord(certificateData) {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .insert([
        {
          certificate_id: certificateData.certificateId,
          user_id: certificateData.userId,
          course_id: certificateData.courseId,
          course_name: certificateData.courseName,
          course_type: certificateData.courseType,
          user_name: certificateData.userName,
          license_number: certificateData.licenseNumber,
          completion_date: certificateData.completionDate,
          ce_hours: certificateData.ceHours,
          issue_date: certificateData.issueDate,
          verification_url: certificateData.verificationUrl,
          status: 'active'
        }
      ])
      .select();

    if (error) throw new Error('Failed to save certificate record');
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function verifyCertificate(certificateId) {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificate_id', certificateId)
      .eq('status', 'active')
      .single();

    if (error || !data) return null;

    return {
      certificateId: data.certificate_id,
      userId: data.user_id,
      courseId: data.course_id,
      courseName: data.course_name,
      courseType: data.course_type,
      userName: data.user_name,
      licenseNumber: data.license_number,
      completionDate: data.completion_date,
      ceHours: data.ce_hours,
      issueDate: data.issue_date,
      verificationUrl: data.verification_url
    };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getUserCertificates(userId) {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('issue_date', { ascending: false });

    if (error) throw new Error('Failed to fetch user certificates');

    return data.map(cert => ({
      certificateId: cert.certificate_id,
      courseId: cert.course_id,
      courseName: cert.course_name,
      courseType: cert.course_type,
      completionDate: cert.completion_date,
      ceHours: cert.ce_hours,
      issueDate: cert.issue_date,
      verificationUrl: cert.verification_url
    }));
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getCourseCertificates(courseId) {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('course_id', courseId)
      .eq('status', 'active')
      .order('issue_date', { ascending: false });

    if (error) throw new Error('Failed to fetch course certificates');

    return data.map(cert => ({
      certificateId: cert.certificate_id,
      userId: cert.user_id,
      userName: cert.user_name,
      licenseNumber: cert.license_number,
      completionDate: cert.completion_date,
      ceHours: cert.ce_hours,
      issueDate: cert.issue_date
    }));
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
