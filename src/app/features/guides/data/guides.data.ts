import { Guide } from '../../../core/models/guide.model';

export const GUIDES: Guide[] = [
  {
    slug: 'choosing-the-right-ai-tool',
    title: 'How to Choose the Right AI Tool for Your Needs',
    description: 'A practical framework for evaluating AI tools based on your actual task, not just feature lists or hype.',
    category: 'AI Guides',
    publishedDate: '2026-01-12',
    readingTimeMinutes: 7,
    imagePlaceholderLabel: 'Choosing an AI tool',
    relatedGuideSlugs: ['understanding-ai-pricing-models'],
    sections: [
      {
        heading: 'Start from the task, not the tool',
        level: 2,
        paragraphs: [
          'It\'s tempting to pick whichever AI tool is trending, but the more reliable approach is to clearly define the task first — writing, coding, image generation, research — and then compare tools built specifically for that task.'
        ]
      },
      {
        heading: 'A simple evaluation checklist',
        level: 2,
        bullets: [
          'Does the free tier let you genuinely test the tool on your real use case, not just a toy example?',
          'How does the tool handle mistakes — does it cite sources, or state uncertainty, or just answer confidently regardless?',
          'Does pricing scale in a way that matches how much you\'ll actually use it?',
          'Is there a real community or documentation if you get stuck?'
        ]
      },
      {
        heading: 'Try before you commit',
        level: 2,
        paragraphs: [
          'Run the same real task — not a demo example — through two or three candidate tools before subscribing to any of them. Differences in output quality for your specific use case are often larger than marketing pages suggest.'
        ]
      },
      {
        heading: 'Reassess periodically',
        level: 2,
        paragraphs: [
          'AI tools change quickly — new models, new pricing, new features. A tool that was the best fit six months ago may no longer be the best option today, so it is worth revisiting your choice periodically rather than treating it as permanent.'
        ]
      }
    ],
    faq: [
      { question: 'Should I always choose the cheapest AI tool?', answer: 'Not necessarily — factor in the time saved or quality improvement, not just subscription cost, when comparing options.' },
      { question: 'Is it bad to use multiple AI tools?', answer: 'No, many people use a small set of tools suited to different tasks (e.g. one for coding, one for research) rather than a single all-purpose tool.' }
    ]
  },
  {
    slug: 'understanding-ai-pricing-models',
    title: 'Understanding AI Tool Pricing Models',
    description: 'A breakdown of common AI pricing structures — free, freemium, subscription and usage-based — and how to avoid overpaying.',
    category: 'AI Guides',
    publishedDate: '2025-12-28',
    readingTimeMinutes: 6,
    imagePlaceholderLabel: 'AI pricing models explained',
    relatedGuideSlugs: ['choosing-the-right-ai-tool'],
    sections: [
      {
        heading: 'The main pricing patterns',
        level: 2,
        table: {
          headers: ['Model', 'How it works'],
          rows: [
            ['Free', 'No cost, usually with usage or feature limits'],
            ['Freemium', 'Free tier plus paid tiers unlocking more usage/features/models'],
            ['Flat subscription', 'Fixed monthly/annual fee regardless of usage, often with soft limits'],
            ['Usage-based (API)', 'Pay per unit of usage — e.g. per token, per image, per minute of audio']
          ]
        }
      },
      {
        heading: 'Why usage-based pricing can surprise you',
        level: 2,
        paragraphs: [
          'API-style, usage-based pricing scales with how much you actually use a tool, which is efficient for light use but can grow unexpectedly with heavy or automated usage. Setting usage alerts or budgets, where available, helps avoid surprises.'
        ]
      },
      {
        heading: 'Questions to ask before upgrading to a paid tier',
        level: 2,
        bullets: [
          'Am I regularly hitting the free tier\'s limits, or hitting them rarely?',
          'Does the paid tier unlock a meaningfully better model, or just more of the same?',
          'Is there a lower-cost tier between "free" and the most expensive plan?'
        ]
      }
    ],
    faq: [
      { question: 'Do free tiers often change?', answer: 'Yes, providers frequently adjust free tier limits as costs and competition evolve — treat any specific limit as a snapshot in time.' }
    ]
  },
  {
    slug: 'seo-basics-for-content-creators',
    title: 'SEO Basics for Content Creators',
    description: 'A practical, non-technical introduction to how search engines evaluate content, and what actually moves the needle for organic traffic.',
    category: 'SEO Guides',
    publishedDate: '2025-11-15',
    readingTimeMinutes: 8,
    imagePlaceholderLabel: 'SEO basics guide',
    relatedGuideSlugs: [],
    sections: [
      {
        heading: 'What search engines are actually trying to do',
        level: 2,
        paragraphs: [
          'Search engines aim to match a searcher\'s intent with the most useful, trustworthy page available. Understanding this framing helps explain most SEO advice: the goal is genuinely serving the reader\'s need, not "tricking" an algorithm.'
        ]
      },
      {
        heading: 'On-page fundamentals',
        level: 2,
        bullets: [
          'A clear, descriptive title tag and meta description for each page',
          'One logical heading hierarchy (a single H1, meaningful H2s/H3s)',
          'Content that actually answers the query, not just repeats the keyword',
          'Fast-loading pages and a mobile-friendly layout'
        ]
      },
      {
        heading: 'Internal linking matters more than people think',
        level: 2,
        paragraphs: [
          'Linking related pages to each other (like a tool page linking to a relevant tutorial) helps both readers and search engines understand how your content connects, and helps newer pages get discovered.'
        ]
      },
      {
        heading: 'What to avoid',
        level: 2,
        bullets: [
          'Keyword stuffing — repeating a phrase unnaturally instead of writing normally',
          'Thin content that exists mainly to attract clicks without offering real value',
          'Fake or unearned trust signals, like fabricated reviews or misleading claims'
        ]
      },
      {
        heading: 'Content-first, not ads-first',
        level: 2,
        paragraphs: [
          'For sites that plan to run advertising, treating content quality as the priority (with ad placements that never interrupt reading in confusing or misleading ways) tends to perform better long-term than an ads-first approach, both for rankings and reader trust.'
        ]
      }
    ],
    faq: [
      { question: 'How long does SEO take to show results?', answer: 'It varies widely, but meaningful organic traffic growth often takes several months of consistent, genuinely useful content and technical health.' },
      { question: 'Do I need to hire an SEO expert?', answer: 'For many small sites, the fundamentals (clear content, good structure, reasonable page speed) go a long way before specialized expertise becomes necessary.' }
    ]
  },
  {
    slug: 'setting-up-a-modern-frontend-project',
    title: 'Setting Up a Modern Frontend Project: A Checklist',
    description: 'A practical checklist for starting a new frontend project the right way — tooling, structure, and habits that pay off later.',
    category: 'Developer Guides',
    publishedDate: '2025-10-08',
    readingTimeMinutes: 8,
    imagePlaceholderLabel: 'Frontend project setup checklist',
    relatedGuideSlugs: [],
    sections: [
      {
        heading: 'Decide on structure before writing lots of code',
        level: 2,
        paragraphs: [
          'Retrofitting a clean folder structure onto a large, messy codebase is far more painful than starting with a sensible one. Decide early how you\'ll separate shared/reusable code from feature-specific code.'
        ]
      },
      {
        heading: 'A practical starting checklist',
        level: 2,
        numbered: [
          'Set up linting and formatting (e.g. ESLint/Prettier or your framework\'s equivalent) from day one.',
          'Decide on a component/feature folder structure before the codebase grows large.',
          'Set up basic routing and a placeholder page for each planned major section.',
          'Add a simple design token system (colors, spacing, type) rather than hardcoding values everywhere.',
          'Decide early how theming (e.g. light/dark mode) will work, since retrofitting it later touches many files.'
        ]
      },
      {
        heading: 'Avoid premature dependencies',
        level: 2,
        paragraphs: [
          'It\'s tempting to install a library for every small need. Before adding a dependency, check whether the platform (browser APIs, framework built-ins) already solves the problem — fewer dependencies means less maintenance and a smaller bundle.'
        ]
      },
      {
        heading: 'Plan for the features you\'ll definitely need',
        level: 2,
        bullets: [
          'Basic SEO (page titles, meta descriptions) even if full SSR comes later',
          'A 404 / error page from the start, not as an afterthought',
          'Responsive layout testing at common breakpoints throughout development, not just at the end'
        ]
      }
    ],
    faq: [
      { question: 'Should I use a component library from day one?', answer: 'It depends on the project — a small, curated set of reusable components is often more maintainable early on than a large, unfamiliar library adopted before you know your exact needs.' }
    ]
  },
  {
    slug: 'choosing-password-manager',
    title: 'How to Choose a Password Manager',
    description: 'What actually matters when evaluating a password manager — beyond marketing claims about "military-grade encryption".',
    category: 'Software Guides',
    publishedDate: '2025-09-21',
    readingTimeMinutes: 6,
    imagePlaceholderLabel: 'Choosing a password manager',
    relatedGuideSlugs: [],
    sections: [
      {
        heading: 'Why a password manager matters',
        level: 2,
        paragraphs: [
          'Reusing passwords across sites means a single breach can expose many accounts. A password manager makes it practical to use a unique, strong password for every account without needing to memorize them.'
        ]
      },
      {
        heading: 'What to actually look for',
        level: 2,
        bullets: [
          'Cross-platform support for the devices and browsers you actually use',
          'A clear, published security model (zero-knowledge architecture is a common good sign)',
          'Reliable autofill that works with the sites and apps you use daily',
          'A reasonable account-recovery process that doesn\'t undermine the security model'
        ]
      },
      {
        heading: 'Free vs. paid options',
        level: 2,
        paragraphs: [
          'Some password managers offer capable free tiers (often limited to one device type), while paid tiers typically add cross-device sync, secure sharing, and additional storage for notes or documents.'
        ]
      },
      {
        heading: 'Habits that matter as much as the tool',
        level: 2,
        numbered: [
          'Enable two-factor authentication on your password manager account itself.',
          'Use the built-in password generator rather than inventing your own patterns.',
          'Keep the account recovery information up to date and stored safely.'
        ]
      }
    ],
    faq: [
      { question: 'Is it safe to store all my passwords in one place?', answer: 'Reputable password managers use strong encryption and a "zero-knowledge" design so the provider cannot read your vault — this is generally considered safer than reusing weak passwords across many sites.' }
    ]
  },
  {
    slug: 'building-a-personal-productivity-system',
    title: 'Building a Personal Productivity System That Actually Sticks',
    description: 'Why most productivity systems fail within weeks, and a simpler approach that is easier to maintain long-term.',
    category: 'Productivity Guides',
    publishedDate: '2025-08-30',
    readingTimeMinutes: 7,
    imagePlaceholderLabel: 'Personal productivity system',
    relatedGuideSlugs: [],
    sections: [
      {
        heading: 'Why complex systems tend to fail',
        level: 2,
        paragraphs: [
          'Elaborate productivity systems often collapse under their own maintenance overhead — too many categories, too many apps, too much time spent organizing rather than doing. A system that takes more effort to maintain than the work it organizes will eventually get abandoned.'
        ]
      },
      {
        heading: 'A minimal starting system',
        level: 2,
        numbered: [
          'One place for tasks — even a single list is better than three half-used apps.',
          'One weekly review to decide what actually matters this week.',
          'One place for reference notes, separate from active tasks.'
        ]
      },
      {
        heading: 'Add complexity only when a real problem appears',
        level: 2,
        paragraphs: [
          'Rather than adopting every feature a productivity app offers, add a new habit or category only when you notice a specific, recurring problem that a simple list isn\'t solving — this keeps the system proportional to your actual needs.'
        ]
      },
      {
        heading: 'Where AI tools genuinely help',
        level: 2,
        bullets: [
          'Summarizing long meeting notes into action items',
          'Turning a rough brain-dump into a cleaner task list',
          'Drafting a weekly review template you can reuse'
        ]
      }
    ],
    faq: [
      { question: 'What\'s the single most important habit for productivity?', answer: 'A consistent, brief weekly review tends to matter more than which specific app or system you use — it is the habit of regularly reassessing priorities that makes any system work.' }
    ]
  }
];
