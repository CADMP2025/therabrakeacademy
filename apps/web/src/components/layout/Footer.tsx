'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">🧠</span>
              <div>
                <h3 className="text-xl font-bold">TheraBrake Academy™</h3>
                <p className="text-sm text-orange-400">Pause, Process, Progress</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Professional development and training platform for mental health professionals.
              Texas LPC Approved • NBCC Provider #87569
            </p>
            <div className="text-sm text-gray-400">
              <p>📧 admin@therabrake.academy</p>
              <p>📞 (346) 298-2988</p>
              <p>📍 6120 College St. Suite D185, Beaumont, TX 77707</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/courses" className="hover:text-white">All Courses</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 TheraBrake Academy™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
