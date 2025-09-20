'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button, Input, Textarea } from '@/components/ui'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BadgeCheck, 
  Camera,
  Save,
  AlertCircle 
} from 'lucide-react'

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    license_number: '',
    license_state: 'TX',
    address: '',
    city: '',
    state: 'TX',
    zip_code: '',
    company: '',
    position: '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        license_number: profile.license_number || '',
        license_state: profile.license_state || 'TX',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || 'TX',
        zip_code: profile.zip_code || '',
        company: profile.company || '',
        position: profile.position || '',
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await updateProfile(formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <div className="bg-white rounded-lg shadow-md">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-t-lg">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
                  <p>{profile?.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                    {profile?.role === 'instructor' ? 'Instructor' : 'Student'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  leftIcon={<User className="w-5 h-5" />}
                  required
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  leftIcon={<Phone className="w-5 h-5" />}
                />

                <Input
                  label="Company/Organization"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />

                <Input
                  label="Position/Title"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />

                {profile?.role === 'student' && (
                  <>
                    <Input
                      label="License Number"
                      name="license_number"
                      value={formData.license_number}
                      onChange={handleChange}
                      leftIcon={<BadgeCheck className="w-5 h-5" />}
                      helperText="For CE credit tracking"
                    />

                    <Input
                      label="License State"
                      name="license_state"
                      value={formData.license_state}
                      onChange={handleChange}
                      maxLength={2}
                    />
                  </>
                )}
              </div>

              <Textarea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about yourself..."
              />

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    leftIcon={<MapPin className="w-5 h-5" />}
                  />

                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    maxLength={2}
                  />

                  <Input
                    label="ZIP Code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <span className="text-sm text-green-700">Profile updated successfully!</span>
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" isLoading={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
