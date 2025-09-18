// /apps/web/app/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Loader2,
  BookOpen,
  Award,
  Users,
  GraduationCap,
  Brain
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    licenseNumber: '',
    accountType: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });
      
      if (error) throw error;
      
      setSuccess('Login successful! Redirecting...');
      
      // Check user role and redirect accordingly
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
      setTimeout(() => {
        if (profile?.role === 'instructor') {
          router.push('/instructor-dashboard');
        } else if (profile?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
      
    } catch (error) {
      setError(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: {
            full_name: formData.fullName,
            account_type: formData.accountType,
            license_number: formData.licenseNumber || null,
          }
        }
      });
      
      if (error) throw error;
      
      // Create profile entry
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: formData.fullName,
            email: formData.email.trim(),
            role: formData.accountType,
            license_number: formData.licenseNumber || null,
            created_at: new Date().toISOString(),
          });
          
        if (profileError) console.error('Profile creation error:', profileError);
      }
      
      setSuccess('Account created successfully! Please check your email to verify your account.');
      
      // Clear form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        licenseNumber: '',
        accountType: 'student',
      });
      
    } catch (error) {
      setError(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/forgot-password`,
      });
      
      if (error) throw error;
      
      setSuccess('Password reset instructions have been sent to your email.');
      setForgotPasswordMode(false);
      
    } catch (error) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/assets/images/therabrake-logo.png"
                  alt="TheraBrake Academy"
                  width={48}
                  height={48}
                  className="transform transition-transform group-hover:scale-110"
                  priority
                />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  TheraBrake Academy
                </span>
                <span className="text-xs align-super ml-0.5">™</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/courses" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>
              {!isLogin && (
                <Link 
                  href="/register" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Register
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="flex items-center mb-6">
              <Brain className="h-10 w-10 text-orange-400 mr-3" />
              <h2 className="text-4xl font-bold text-white">
                Welcome to Your Learning Journey
              </h2>
            </div>
            <p className="text-xl text-white/90 mb-8">
              Access professional development courses, earn CE credits, and transform your practice.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pause. Process. Progress.
              </h3>
              <p className="text-white/90">
                Our philosophy guides every course, helping you take meaningful breaks to process and integrate new knowledge for lasting professional growth.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <Award className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Texas LPC Approved</h3>
                  <p className="text-white/80 text-sm">NBCC Provider #87569</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">14+ Professional Courses</h3>
                  <p className="text-white/80 text-sm">CE, Personal & Professional Development</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Expert Instructors</h3>
                  <p className="text-white/80 text-sm">Learn from licensed professionals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <GraduationCap className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Instant Certificates</h3>
                  <p className="text-white/80 text-sm">Download certificates upon completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white/10 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Logo for mobile */}
              <div className="lg:hidden text-center mb-6">
                <Image
                  src="/assets/images/therabrake-logo.png"
                  alt="TheraBrake Academy"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                  priority
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  TheraBrake Academy™
                </h1>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Forgot Password Form */}
              {forgotPasswordMode ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                  <p className="text-gray-600 mb-6">Enter your email to receive reset instructions</p>
                  
                  <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>Send Reset Email</>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setForgotPasswordMode(false)}
                      className="w-full mt-3 text-gray-600 hover:text-gray-900 text-sm"
                    >
                      Back to Login
                    </button>
                  </form>
                </>
              ) : (
                <>
                  {/* Tab Switcher */}
                  <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                        isLogin 
                          ? 'bg-white text-gray-900 shadow' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                        !isLogin 
                          ? 'bg-white text-gray-900 shadow' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Login Form */}
                  {isLogin ? (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                      <p className="text-gray-600 mb-6">Sign in to continue your learning journey</p>
                      
                      <form onSubmit={handleLogin}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="••••••••"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                          </label>
                          
                          <button
                            type="button"
                            onClick={() => setForgotPasswordMode(true)}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Forgot password?
                          </button>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              Sign In
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  ) : (
                    /* Sign Up Form */
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                      <p className="text-gray-600 mb-6">Join TheraBrake Academy today</p>
                      
                      <form onSubmit={handleSignUp}>
                        {/* Account Type Selection */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            I am a...
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, accountType: 'student' }))}
                              className={`py-3 px-4 rounded-lg border-2 transition ${
                                formData.accountType === 'student'
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <Users className="h-5 w-5 mx-auto mb-1" />
                              <span className="text-sm font-medium">Student</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, accountType: 'instructor' }))}
                              className={`py-3 px-4 rounded-lg border-2 transition ${
                                formData.accountType === 'instructor'
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <GraduationCap className="h-5 w-5 mx-auto mb-1" />
                              <span className="text-sm font-medium">Instructor</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Jane Doe"
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>
                        
                        {/* License Number (optional) */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            License Number (Optional)
                            <span className="text-xs text-gray-500 ml-1">For CE credit tracking</span>
                          </label>
                          <input
                            type="text"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="LPC-12345"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="••••••••"
                              required
                              minLength={8}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="••••••••"
                              required
                              minLength={8}
                            />
                          </div>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              Create Account
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </button>
                        
                        <p className="text-xs text-gray-500 mt-4 text-center">
                          By creating an account, you agree to our{' '}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </Link>
                        </p>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 text-center text-white/80 text-sm">
              <p>Need help? Contact us:</p>
              <p className="mt-1">
                <a href="tel:3462982988" className="hover:text-white">(346) 298-2988</a>
                {' • '}
                <a href="mailto:admin@therabrake.academy" className="hover:text-white">admin@therabrake.academy</a>
              </p>
              <p className="mt-2 text-xs">
                6120 College St. Suite D185, Beaumont, TX. 77707
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}