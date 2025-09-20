'use client'

import React from 'react'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

export function CourseValidator({ course }) {
  const validations = [
    {
      label: 'Course Title',
      valid: course.title && course.title.length >= 5,
      required: true,
      message: 'Title must be at least 5 characters'
    },
    {
      label: 'Course Description',
      valid: course.description && course.description.length >= 50,
      required: true,
      message: 'Description must be at least 50 characters'
    },
    {
      label: 'CE Hours',
      valid: course.ce_hours > 0,
      required: true,
      message: 'CE hours must be specified'
    },
    {
      label: 'Price',
      valid: course.price > 0,
      required: true,
      message: 'Price must be set'
    },
    {
      label: 'At least 3 modules',
      valid: course.modules?.length >= 3,
      required: true,
      message: 'Course must have at least 3 modules'
    },
    {
      label: 'Module content',
      valid: course.modules?.every(m => m.content && m.content.length > 100),
      required: true,
      message: 'Each module must have substantial content'
    },
    {
      label: 'Texas LPC Compliance',
      valid: course.ce_hours >= 1 && course.ce_hours <= 12,
      required: false,
      message: 'CE hours should be between 1-12 for Texas LPC'
    }
  ]

  const requiredValidations = validations.filter(v => v.required)
  const optionalValidations = validations.filter(v => !v.required)
  
  const isReadyToPublish = requiredValidations.every(v => v.valid)
  const completionPercentage = Math.round(
    (validations.filter(v => v.valid).length / validations.length) * 100
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">
        Course Readiness: {completionPercentage}%
      </h3>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              completionPercentage === 100 ? 'bg-green-500' :
              completionPercentage >= 70 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Required Items
          </h4>
          <div className="space-y-2">
            {requiredValidations.map((validation, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {validation.valid ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${
                    validation.valid ? 'text-gray-700' : 'text-gray-900 font-medium'
                  }`}>
                    {validation.label}
                  </p>
                  {!validation.valid && (
                    <p className="text-xs text-red-600 mt-0.5">
                      {validation.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Recommended
          </h4>
          <div className="space-y-2">
            {optionalValidations.map((validation, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {validation.valid ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {validation.label}
                  </p>
                  {!validation.valid && (
                    <p className="text-xs text-yellow-600 mt-0.5">
                      {validation.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        {isReadyToPublish ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Ready to publish!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Complete required items to publish</span>
          </div>
        )}
      </div>
    </div>
  )
}
