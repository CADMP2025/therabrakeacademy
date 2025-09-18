'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';

function ForgotPasswordForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        <form className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
        <Link href="/login" className="block text-center text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
