// /apps/web/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    flowType: 'pkce',
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'therabrake-academy',
    },
  },
});

// Auth helper functions
export const auth = {
  // Sign up new user
  signUp: async ({ email, password, metadata = {} }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: metadata,
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (data?.user) {
        // Update last login in profile
        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);
      }
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        // Redirect to login page after sign out
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get current user
  getUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Get user profile
  getProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Send password reset email
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/forgot-password`,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update password
  updatePassword: async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  },

  // Get user role
  getUserRole: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      return data?.role || 'student';
    } catch (error) {
      return 'student';
    }
  },

  // Check if user is admin
  isAdmin: async (userId) => {
    const role = await auth.getUserRole(userId);
    return role === 'admin';
  },

  // Check if user is instructor
  isInstructor: async (userId) => {
    const role = await auth.getUserRole(userId);
    return role === 'instructor' || role === 'admin';
  },

  // OAuth sign in (for future implementation)
  signInWithProvider: async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/verify-email`,
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// Session management
export const session = {
  // Get current session
  get: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Listen to auth changes
  onChange: (callback) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },

  // Refresh session
  refresh: async () => {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    return { session, error };
  },

  // Log session activity
  logActivity: async (userId, activity) => {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userId,
          ...activity,
        });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// Database queries
export const db = {
  // Profiles
  profiles: {
    getById: (id) => 
      supabase.from('profiles').select('*').eq('id', id).single(),
    getByEmail: (email) => 
      supabase.from('profiles').select('*').eq('email', email).single(),
    update: (id, data) => 
      supabase.from('profiles').update(data).eq('id', id),
    getInstructors: () => 
      supabase.from('profiles').select('*').eq('role', 'instructor'),
  },

  // Courses
  courses: {
    getAll: () => 
      supabase.from('courses').select('*').eq('status', 'published'),
    getById: (id) => 
      supabase.from('courses').select('*').eq('id', id).single(),
    getByInstructor: (instructorId) => 
      supabase.from('courses').select('*').eq('instructor_id', instructorId),
    create: (data) => 
      supabase.from('courses').insert(data).select().single(),
    update: (id, data) => 
      supabase.from('courses').update(data).eq('id', id),
    delete: (id) => 
      supabase.from('courses').delete().eq('id', id),
  },

  // Enrollments
  enrollments: {
    getByUser: (userId) => 
      supabase.from('enrollments').select('*, courses(*)').eq('user_id', userId),
    getByCourse: (courseId) => 
      supabase.from('enrollments').select('*, profiles(*)').eq('course_id', courseId),
    create: (data) => 
      supabase.from('enrollments').insert(data).select().single(),
    update: (id, data) => 
      supabase.from('enrollments').update(data).eq('id', id),
    checkEnrollment: (userId, courseId) => 
      supabase.from('enrollments').select('*').eq('user_id', userId).eq('course_id', courseId).single(),
  },

  // Progress tracking
  progress: {
    get: (userId, courseId) => 
      supabase.from('progress').select('*').eq('user_id', userId).eq('course_id', courseId),
    update: (userId, courseId, moduleId, data) => 
      supabase.from('progress').upsert({
        user_id: userId,
        course_id: courseId,
        module_id: moduleId,
        ...data,
      }),
  },
};

// Storage helpers (for file uploads)
export const storage = {
  // Upload file
  upload: async (bucket, path, file) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get public URL
  getUrl: (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data?.publicUrl;
  },

  // Delete file
  delete: async (bucket, paths) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove(paths);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // List files
  list: async (bucket, path) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(path);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
};

export default supabase;