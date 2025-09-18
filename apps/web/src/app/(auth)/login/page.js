'use client';
import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Login logic here
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <span className="text-4xl">🧠</span>
          <h2 className="mt-4 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-gray-600">TheraBrake Academy</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="text-center space-y-2">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <div>
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
