// src/app/api/courses/route.js
// API Route for Course Management

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for server-side operations
);

// GET - Fetch courses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructor_id');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    
    let query = supabase
      .from('courses')
      .select(`
        *,
        instructor:profiles!instructor_id(
          id,
          full_name,
          email,
          avatar_url
        ),
        modules(
          id,
          title,
          order_index,
          duration_minutes
        )
      `)
      .order('created_at', { ascending: false });
    
    // Apply filters
    if (instructorId) {
      query = query.eq('instructor_id', instructorId);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (type) {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: data || []
    });
    
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      type,
      price,
      ceHours,
      instructor_id,
      modules,
      ...courseData
    } = body;
    
    // Start a transaction for course and modules
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title,
        description,
        type,
        price: price || 0,
        ce_hours: type === 'CE' ? ceHours : null,
        instructor_id,
        status: 'draft',
        ...courseData
      })
      .select()
      .single();
    
    if (courseError) throw courseError;
    
    // Insert modules if provided
    if (modules && modules.length > 0) {
      const modulesWithCourseId = modules.map((module, index) => ({
        course_id: course.id,
        title: module.title,
        description: module.description,
        content: module.content,
        order_index: index,
        duration_minutes: module.duration || 30
      }));
      
      const { error: modulesError } = await supabase
        .from('modules')
        .insert(modulesWithCourseId);
      
      if (modulesError) {
        // Rollback course creation on module error
        await supabase.from('courses').delete().eq('id', course.id);
        throw modulesError;
      }
      
      // Handle module resources if any
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        if (module.resources && module.resources.length > 0) {
          // Get the created module ID
          const { data: createdModule } = await supabase
            .from('modules')
            .select('id')
            .eq('course_id', course.id)
            .eq('order_index', i)
            .single();
          
          if (createdModule) {
            const resourcesWithModuleId = module.resources.map((resource, idx) => ({
              module_id: createdModule.id,
              title: resource.name,
              type: resource.type || 'document',
              file_url: resource.url,
              file_size: resource.size,
              mime_type: resource.type,
              order_index: idx
            }));
            
            await supabase
              .from('module_resources')
              .insert(resourcesWithModuleId);
          }
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
    
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// PUT - Update course
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, modules, ...courseData } = body;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Course ID is required' 
        },
        { status: 400 }
      );
    }
    
    // Update course data
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .update({
        ...courseData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (courseError) throw courseError;
    
    // Handle modules update if provided
    if (modules) {
      // Delete existing modules and recreate (simpler than complex diff)
      await supabase
        .from('modules')
        .delete()
        .eq('course_id', id);
      
      // Insert updated modules
      if (modules.length > 0) {
        const modulesWithCourseId = modules.map((module, index) => ({
          course_id: id,
          title: module.title,
          description: module.description,
          content: module.content,
          order_index: index,
          duration_minutes: module.duration || 30
        }));
        
        const { data: createdModules, error: modulesError } = await supabase
          .from('modules')
          .insert(modulesWithCourseId)
          .select();
        
        if (modulesError) throw modulesError;
        
        // Handle resources
        for (let i = 0; i < modules.length; i++) {
          const module = modules[i];
          const createdModule = createdModules[i];
          
          if (module.resources && module.resources.length > 0 && createdModule) {
            const resourcesWithModuleId = module.resources.map((resource, idx) => ({
              module_id: createdModule.id,
              title: resource.name,
              type: resource.type || 'document',
              file_url: resource.url,
              file_size: resource.size,
              mime_type: resource.type,
              order_index: idx
            }));
            
            await supabase
              .from('module_resources')
              .insert(resourcesWithModuleId);
          }
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete course
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Course ID is required' 
        },
        { status: 400 }
      );
    }
    
    // Delete course (cascades to modules and resources)
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// =====================================================
// src/app/api/courses/[courseId]/route.js
// Individual course operations
// =====================================================

export async function GET_SINGLE(request, { params }) {
  try {
    const { courseId } = params;
    
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:profiles!instructor_id(
          id,
          full_name,
          email,
          avatar_url,
          bio
        ),
        modules(
          id,
          title,
          description,
          content,
          order_index,
          duration_minutes,
          require_quiz_pass,
          module_resources(
            id,
            title,
            type,
            file_url,
            file_size
          ),
          quizzes(
            id,
            title,
            passing_score,
            attempts_allowed,
            time_limit_minutes
          )
        )
      `)
      .eq('id', courseId)
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: course
    });
    
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// =====================================================
// src/app/api/courses/[courseId]/publish/route.js
// Publish course
// =====================================================

export async function POST_PUBLISH(request, { params }) {
  try {
    const { courseId } = params;
    
    // Validate course has required fields
    const { data: course, error: fetchError } = await supabase
      .from('courses')
      .select('*, modules(*)')
      .eq('id', courseId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Validation
    const errors = [];
    if (!course.title) errors.push('Course title is required');
    if (!course.description) errors.push('Course description is required');
    if (!course.modules || course.modules.length === 0) {
      errors.push('At least one module is required');
    }
    if (course.type === 'CE' && !course.ce_hours) {
      errors.push('CE hours required for CE courses');
    }
    
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          errors 
        },
        { status: 400 }
      );
    }
    
    // Update course status
    const { data, error } = await supabase
      .from('courses')
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', courseId)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data,
      message: 'Course published successfully!'
    });
    
  } catch (error) {
    console.error('Error publishing course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}