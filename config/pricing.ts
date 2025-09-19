export const PRICING = {
  // Individual Course Pricing
  courses: {
    professional: {
      sixHours: {
        price: 197,
        label: 'Premium CE Courses (6 CE Hours)',
        courses: [
          'Building a Trauma-Informed Practice & Telehealth',
          'Ethics for Professional Counselors',
          'Regulating the Storm: Trauma, Anger, and the Brain',
        ],
      },
      threeHours: {
        price: 127,
        label: 'Standard CE Courses (3 CE Hours)',
        courses: [
          'Cultural Diversity in Texas Counseling Practice',
          'Telehealth in Counseling',
        ],
      },
      twoHours: {
        price: 97,
        label: 'Compact CE Courses (2 CE Hours)',
        courses: [
          'Risk Management in Counseling',
          'Business Ethics for Mental Health Professionals',
        ],
      },
    },
    practice: {
      leapAndLaunch: {
        price: 497,
        label: 'Leap & Launch! Business Development Program',
        description: 'Comprehensive program with templates, spreadsheets, and marketing materials',
      },
    },
    personal: {
      relationship: {
        price: 197,
        label: 'Relationship & Recovery Programs',
        courses: ['Healing Forward', 'Finding the Perfect Match'],
      },
      rebuilding: {
        price: 247,
        label: 'Rebuilding After Betrayal',
        description: '4-Phase Framework',
      },
      transformation: {
        price: 247,
        label: 'The So What Mindset™',
        description: 'Resilience Training',
      },
      financial: {
        basic: {
          price: 147,
          label: 'Credit Building & Debt Management',
        },
        advanced: {
          price: 197,
          label: 'Financial Literacy & Independence',
        },
      },
      health: {
        price: 197,
        label: 'Cancer Diagnosis: New Beginning Journey',
      },
    },
  },

  // Bundle Packages
  bundles: {
    professionalExcellence: {
      name: 'Professional Excellence Bundle',
      description: 'All CE Courses (28 Hours Total)',
      regularPrice: 1041,
      bundlePrice: 797,
      savings: 244,
      savingsPercent: 23,
    },
    practiceBuilder: {
      name: 'Practice Builder Bundle',
      description: 'CE Essentials + Business Development',
      regularPrice: 1015,
      bundlePrice: 747,
      savings: 268,
      savingsPercent: 26,
    },
    relationshipRecovery: {
      name: 'Relationship Recovery Bundle',
      description: 'Complete Relationship Healing Journey',
      regularPrice: 641,
      bundlePrice: 497,
      savings: 144,
      savingsPercent: 22,
    },
    personalTransformation: {
      name: 'Personal Transformation Bundle',
      description: 'All 7 personal development courses',
      regularPrice: 1432,
      bundlePrice: 997,
      savings: 435,
      savingsPercent: 30,
    },
    financialFreedom: {
      name: 'Financial Freedom Bundle',
      description: 'Complete Financial Mastery',
      regularPrice: 344,
      bundlePrice: 277,
      savings: 67,
      savingsPercent: 19,
    },
  },

  // Subscription Plans
  subscriptions: {
    allAccess: {
      name: 'Academy All-Access Pass',
      description: 'Every Course + Future Releases for 1 Year',
      monthlyPrice: 167,
      yearlyPrice: 1997,
      regularPrice: 2970,
      savings: 973,
      savingsPercent: 33,
      features: [
        'All 15+ current courses',
        'All new courses released within 12 months',
        'Priority support',
        'Exclusive monthly Q&A sessions',
        'CE credit tracking',
        'Downloadable certificates',
      ],
    },
  },

  // Special Offers
  offers: {
    earlyBird: {
      code: 'WELCOME15',
      discount: 15,
      description: '15% off any individual course for first-time students',
    },
    multiCourse: [
      { count: 2, discount: 10 },
      { count: 3, discount: 20 },
    ],
    founder: {
      code: 'FOUNDER50',
      discount: 50,
      limit: 100,
      description: 'First 100 students only - 50% off Academy All-Access Pass',
    },
  },

  // Group Pricing
  group: [
    { range: '5-10', discount: 25 },
    { range: '11-20', discount: 35 },
    { range: '21+', discount: 'custom' },
  ],

  // Payment Plans
  paymentPlans: {
    threeMonth: {
      minimumAmount: 297,
      installments: 3,
      interestFree: true,
    },
    sixMonth: {
      minimumAmount: 497,
      installments: 6,
      interestFree: true,
    },
  },
} as const

export type PricingConfig = typeof PRICING
