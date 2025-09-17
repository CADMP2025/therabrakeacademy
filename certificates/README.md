# TheraBrake Academy Certificate System

## Setup Complete!

Your certificate system is now installed at:
`therabrakeacademy/apps/web/src/app/api/certificates/`

## Files Created:
- `/generate/route.js` - API for generating certificates
- `/verify/route.js` - API for verifying certificates
- `/list/route.js` - API for listing certificates
- `/utils/certificate-generator.js` - PDF generation logic
- `/utils/certificate-database.js` - Supabase database operations

## Next Steps:

1. Install required packages:
```bash
npm install pdf-lib qrcode @supabase/supabase-js
```

2. Your database tables are already set up in Supabase.

3. Test the certificate generation:
```javascript
// Test endpoint
const response = await fetch('/api/certificates/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: "test-123",
    courseId: "course-456",
    courseName: "Ethics for Professional Counselors",
    courseType: "CE",
    userName: "Test User",
    ceHours: 6
  })
});
```

## Certificate Types:
- **CE**: Continuing Education (includes Texas LPC & NBCC info)
- **Personal**: Personal Development courses
- **Professional**: Professional non-CE courses

## Contact:
- Email: admin@therabrake.academy
- Phone: (346) 298-2988

© 2024 TheraBrake Academy™
