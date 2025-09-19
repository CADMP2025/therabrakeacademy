# TheraBrake Academy LMS 🧠

> **Pause. Process. Progress.**

A sophisticated Learning Management System for mental health professionals seeking CE credits in Texas, featuring an innovative "Cut & Paste" course creation system.

![TheraBrake Academy](public/images/og-image.png)

## 🚀 Features

### Core Innovations
- **Cut & Paste Course Builder™**: Create courses by pasting content from Word/Google Docs
- **Texas LPC Compliance**: Built-in certificate generation and CE credit tracking
- **Interactive Quizzes**: Multiple question types with automatic grading
- **PDF Workbook Management**: Secure upload and distribution of course materials
- **Stripe Integration**: Secure payment processing and subscription management
- **Mobile App**: React Native app with offline capabilities
- **Role-Based Access**: Student, Instructor, and Admin dashboards

### Key Capabilities
- 📚 15+ Professional CE courses approved by Texas LPC Board
- 🎓 Automatic certificate generation with verification QR codes
- 📱 Mobile-responsive design with offline learning
- 💳 Flexible pricing with bundles and subscriptions
- 📊 Comprehensive analytics and progress tracking
- �� Secure authentication with Supabase
- 📧 Automated email notifications
- 🌐 SEO optimized for course discovery

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (database and authentication)
- Stripe account (payment processing)
- Vercel account (hosting)

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/therabrakeacademy.git
cd therabrakeacademy
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your actual credentials.

4. **Set up the database:**
```bash
npm run db:migrate
npm run db:seed
```

5. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
therabrakeacademy/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── (public)/          # Public pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── course/           # Course-related components
│   └── quiz/             # Quiz components
├── lib/                   # Utility libraries
│   ├── supabase/         # Supabase client
│   └── stripe/           # Stripe configuration
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── config/              # Configuration files
└── public/              # Static assets
```

## 💰 Pricing Structure

### Individual Courses
| Type | Price | CE Hours |
|------|-------|----------|
| Premium CE Courses | $197 | 6 hours |
| Standard CE Courses | $127 | 3 hours |
| Compact CE Courses | $97 | 2 hours |
| Personal Development | $147-$497 | Varies |

### Bundles & Subscriptions
- **Professional Excellence Bundle**: $797 (save $244)
- **All-Access Pass**: $1,997/year (save $973)
- **Founding Member Special**: 50% off for first 100 students

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #3B82F6 | Headers, CTAs, Focus |
| Secondary Green | #10B981 | Success, Progress |
| Accent Yellow | #FACC15 | Highlights, Attention |
| Action Orange | #F97316 | Buttons, CTAs |
| Alert Red | #EF4444 | Errors, Warnings |

## 📊 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and configuration
- [x] Database schema design
- [x] Authentication system

### Phase 2: Core Features (In Progress)
- [ ] Cut & Paste Course Builder
- [ ] Interactive Quiz System
- [ ] Payment Integration
- [ ] Certificate Generation

### Phase 3: Enhancement
- [ ] Mobile App Development
- [ ] Advanced Analytics
- [ ] AI-Powered Features
- [ ] Community Features

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run type checking
npm run type-check
```

## 📦 Deployment

### Deploy to Vercel
```bash
vercel --prod
```

### Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

## 📧 Contact & Support

- **General Inquiries**: info@therabrake.academy
- **Technical Support**: support@therabrake.academy
- **Phone**: (346) 298-2988
- **Address**: 6120 College St. Suite D185, Beaumont, TX 77707

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

© 2024 TheraBrake Academy™. All rights reserved. This is proprietary software.

## 🙏 Acknowledgments

- Texas State Board of Examiners of Professional Counselors
- Our amazing community of mental health professionals
- All course instructors and content creators

---

**Built with ❤️ by TheraBrake Academy Team**
