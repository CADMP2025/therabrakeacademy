// therabrakeacademy/src/app/instructor/courses/create/page.js
// TheraBrake Academy - Instructor Course Creation Page

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CourseBuilder from '@/components/course/CourseBuilder';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function CreateCoursePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingCourse, setSavingCourse] = useState(false);

  // Check authentication and fetch user profile
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Get authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        router.push('/auth/login');
        return;
      }

      setUser(user);

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Check if user is instructor or admin
      if (profileData.role !== 'instructor' && profileData.role !== 'admin') {
        alert('You need instructor privileges to create courses');
        router.push('/dashboard');
        return;
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  // Save course to database
  const handleSaveCourse = async (courseData, status = 'draft') => {
    setSavingCourse(true);
    
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...courseData,
          instructor_id: user.id,
          status: status
        })
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        const message = status === 'published' 
          ? '🎉 Course published successfully!' 
          : '✅ Course saved as draft!';
        
        alert(message);

        // Redirect to course management
        router.push(`/instructor/courses/${result.data.id}/edit`);
      } else {
        throw new Error(result.error || 'Failed to save course');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course: ' + error.message);
    } finally {
      setSavingCourse(false);
    }
  };

  // Handle course publish
  const handlePublishCourse = async (courseData) => {
    // Validate before publishing
    const errors = [];
    if (!courseData.title) errors.push('Course title is required');
    if (!courseData.description) errors.push('Course description is required');
    if (!courseData.modules || courseData.modules.length === 0) {
      errors.push('At least one module is required');
    }
    if (courseData.type === 'CE' && !courseData.ceHours) {
      errors.push('CE hours required for CE courses');
    }

    if (errors.length > 0) {
      alert('Please complete the following:\n\n' + errors.join('\n'));
      return;
    }

    if (confirm('Are you ready to publish this course? Students will be able to enroll immediately.')) {
      await handleSaveCourse(courseData, 'published');
    }
  };

  // Handle file upload to Supabase Storage
  const handleFileUpload = async (file, moduleId) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${moduleId}/${Date.now()}.${fileExt}`;
      const filePath = `course-materials/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('course-materials')
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('course-materials')
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        name: file.name,
        size: file.size,
        type: file.type
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Welcome back, {profile.full_name || profile.email}
                </p>
              </div>
              <button
                onClick={() => router.push('/instructor/courses')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Builder Component */}
      <CourseBuilder
        instructorId={user.id}
        instructorName={profile.full_name || profile.email}
        onSave={handleSaveCourse}
        onPublish={handlePublishCourse}
        onFileUpload={handleFileUpload}
        isSaving={savingCourse}
      />
    </div>
  );
}

// Metadata for the page (Next.js 13+)
