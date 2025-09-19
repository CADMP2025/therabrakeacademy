'use client'

import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CourseCard,
  Modal,
  AlertDialog,
  useToast,
  ToastProvider,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Spinner,
  LoadingOverlay,
  Skeleton,
  CourseCardSkeleton,
  ProgressBar,
  CourseProgress,
  StepProgress,
  Navigation,
  Badge,
  CEBadge,
  StatusBadge,
} from '@/components/ui'
import { Heart, Star, Download } from 'lucide-react'

function ComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const mockUser = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah@therabrake.academy',
    role: 'instructor' as const,
  }

  const steps = [
    { id: '1', title: 'Account Setup', description: 'Create your profile' },
    { id: '2', title: 'Course Selection', description: 'Choose your courses' },
    { id: '3', title: 'Payment', description: 'Complete payment' },
    { id: '4', title: 'Start Learning', description: 'Begin your journey' },
  ]

  return (
    <>
      <Navigation user={mockUser} />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pt-20 p-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8 gradient-text">
            TheraBrake Academy UI Components
          </h1>

          {/* Buttons Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="action">Take Action</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
              <Button isLoading>Loading</Button>
              <Button leftIcon={<Heart className="w-4 h-4" />}>With Icon</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* Cards Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CourseCard
                title="Ethics for Professional Counselors"
                description="Comprehensive ethics course covering Texas LPC requirements with real-world case studies."
                instructor="Dr. Emily Chen"
                price={197}
                ceHours={6}
                category="Professional Development"
              />
              <CourseCard
                title="Trauma-Informed Care"
                description="Learn evidence-based approaches to trauma treatment and build a trauma-informed practice."
                instructor="Dr. Michael Roberts"
                price={197}
                ceHours={6}
                category="Clinical Skills"
                enrolled
                progress={65}
              />
              <CourseCardSkeleton />
            </div>
          </section>

          {/* Badges Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Badges</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="solid">Solid</Badge>
              <CEBadge hours={6} />
              <StatusBadge status="active" />
              <StatusBadge status="completed" />
              <Badge removable onRemove={() => console.log('Removed')}>
                Removable
              </Badge>
            </div>
          </section>

          {/* Forms Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Form Components</h2>
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Sample Form</CardTitle>
                <CardDescription>Demonstrating form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="info@therabrake.academy"
                  required
                />
                <Input
                  label="License Number"
                  placeholder="LPC-12345"
                  helperText="Enter your Texas LPC license number"
                />
                <Select
                  label="Course Category"
                  options={[
                    { value: 'ce', label: 'CE Credits' },
                    { value: 'personal', label: 'Personal Development' },
                    { value: 'business', label: 'Business Development' },
                  ]}
                />
                <Textarea
                  label="Tell us about yourself"
                  placeholder="Share your background and goals..."
                  rows={4}
                />
                <div className="space-y-2">
                  <Checkbox label="I agree to the terms and conditions" />
                  <Checkbox label="Send me email updates" defaultChecked />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Payment Plan</p>
                  <Radio name="payment" value="full" label="Pay in full" defaultChecked />
                  <Radio name="payment" value="installments" label="3 monthly installments" />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Progress Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Progress Indicators</h2>
            <div className="space-y-6">
              <div>
                <ProgressBar value={65} label="Course Completion" />
              </div>
              <div>
                <StepProgress steps={steps} currentStep={2} variant="circular" />
              </div>
              <Card className="max-w-xl">
                <CardContent>
                  <CourseProgress
                    modules={[
                      {
                        id: '1',
                        title: 'Module 1: Introduction',
                        completed: true,
                        lessons: [
                          { id: '1-1', title: 'Welcome', completed: true },
                          { id: '1-2', title: 'Course Overview', completed: true },
                        ],
                      },
                      {
                        id: '2',
                        title: 'Module 2: Core Concepts',
                        completed: false,
                        lessons: [
                          { id: '2-1', title: 'Ethical Principles', completed: true },
                          { id: '2-2', title: 'Texas Regulations', completed: false },
                          { id: '2-3', title: 'Case Studies', completed: false },
                        ],
                      },
                    ]}
                    showDetails
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Modal & Toast Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Modals & Notifications</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Button onClick={() => setAlertOpen(true)} variant="danger">
                Open Alert
              </Button>
              <Button 
                onClick={() => showToast({
                  type: 'success',
                  title: 'Success!',
                  message: 'Your course has been enrolled successfully.'
                })}
                variant="secondary"
              >
                Show Success Toast
              </Button>
              <Button 
                onClick={() => showToast({
                  type: 'error',
                  title: 'Error',
                  message: 'Something went wrong. Please try again.'
                })}
                variant="danger"
              >
                Show Error Toast
              </Button>
              <Button onClick={() => setLoading(true)} variant="outline">
                Show Loading Overlay
              </Button>
            </div>
          </section>

          {/* Loading States Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Loading States</h2>
            <div className="flex items-center gap-8">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" color="secondary" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton width="100%" height={20} />
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" height={20} />
            </div>
          </section>
        </div>

        {/* Modals */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Welcome to TheraBrake Academy"
          description="Start your journey with professional CE credits"
        >
          <div className="space-y-4">
            <p>This is a sample modal demonstrating the modal component.</p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        </Modal>

        <AlertDialog
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          onConfirm={() => console.log('Confirmed')}
          title="Delete Course?"
          description="This action cannot be undone. All course data will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />

        <LoadingOverlay 
          isLoading={loading} 
          message="Processing your request..."
        />
        {loading && setTimeout(() => setLoading(false), 3000)}
      </div>
    </>
  )
}

export default function Page() {
  return (
    <ToastProvider>
      <ComponentsDemo />
    </ToastProvider>
  )
}
