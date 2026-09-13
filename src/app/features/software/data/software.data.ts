import { SoftwareItem } from '../../../core/models/software.model';

export const SOFTWARE_ITEMS: SoftwareItem[] = [
  {
    slug: 'visual-studio-code',
    name: 'Visual Studio Code',
    logoInitials: 'VS',
    category: 'Developer',
    operatingSystems: ['Windows', 'macOS', 'Linux'],
    pricing: 'Free',
    rating: 4.8,
    reviewCount: 24500,
    websiteUrl: 'https://code.visualstudio.com',
    featured: true,
    shortDescription: 'A free, extensible source code editor with a huge extension ecosystem.',
    description:
      'Visual Studio Code is a lightweight but powerful source code editor from Microsoft, supporting virtually every programming language through extensions. It includes built-in Git support, an integrated terminal, debugging tools, and IntelliSense code completion.',
    features: ['IntelliSense code completion', 'Built-in Git integration', 'Integrated debugger', 'Massive extension marketplace', 'Remote development (SSH, containers, WSL)'],
    pros: ['Free and open source', 'Extremely large extension ecosystem', 'Fast and lightweight compared to full IDEs'],
    cons: ['Not a full IDE out of the box — relies on extensions for many language-specific features', 'Extension quality varies'],
    faq: [
      { question: 'Is VS Code free?', answer: 'Yes, Visual Studio Code is free and open source under the MIT license.' },
      { question: 'Does VS Code support Python/Java/etc.?', answer: 'Yes, through official and community extensions that add language support, debugging and linting.' }
    ]
  },
  {
    slug: 'figma',
    name: 'Figma',
    logoInitials: 'FG',
    category: 'Design',
    operatingSystems: ['Windows', 'macOS', 'Web'],
    pricing: 'Freemium',
    rating: 4.7,
    reviewCount: 18200,
    websiteUrl: 'https://www.figma.com',
    featured: true,
    shortDescription: 'A collaborative interface design tool that runs in the browser.',
    description:
      'Figma is a browser-based design tool for UI/UX design, prototyping and collaborative whiteboarding. Multiple people can edit the same file simultaneously, making it popular for design teams working remotely.',
    features: ['Real-time multiplayer editing', 'Component libraries and design systems', 'Interactive prototyping', 'Developer handoff with inspect mode', 'Plugin ecosystem'],
    pros: ['Excellent real-time collaboration', 'Works on any OS via the browser', 'Strong free tier for individuals and small teams'],
    cons: ['Requires an internet connection for most features', 'Advanced team features require a paid plan'],
    faq: [
      { question: 'Can I use Figma offline?', answer: 'A desktop app exists, but Figma is primarily designed as a browser-based, cloud-connected tool.' },
      { question: 'Is Figma good for beginners?', answer: 'Yes, its free tier and large community of tutorials make it approachable for design beginners.' }
    ]
  },
  {
    slug: 'notion',
    name: 'Notion',
    logoInitials: 'NT',
    category: 'Productivity',
    operatingSystems: ['Windows', 'macOS', 'Web', 'iOS', 'Android'],
    pricing: 'Freemium',
    rating: 4.6,
    reviewCount: 21300,
    websiteUrl: 'https://www.notion.so',
    featured: true,
    shortDescription: 'An all-in-one workspace for notes, docs, wikis and project tracking.',
    description:
      'Notion combines notes, documents, databases and project boards into a single flexible workspace. Teams use it for internal wikis, task tracking and documentation, while individuals use it for personal notes and planning.',
    features: ['Flexible page and database system', 'Kanban boards, calendars and tables', 'Templates for common use cases', 'Team wikis and shared workspaces', 'Notion AI add-on'],
    pros: ['Extremely flexible — adapts to many workflows', 'Generous free tier for individuals', 'Good cross-platform sync'],
    cons: ['Can become disorganized without discipline in structuring pages', 'Performance can lag with very large workspaces'],
    faq: [
      { question: 'Is Notion good for teams?', answer: 'Yes, team plans add permissions, shared workspaces and collaboration features suited to small and mid-size teams.' }
    ]
  },
  {
    slug: 'slack',
    name: 'Slack',
    logoInitials: 'SL',
    category: 'Business',
    operatingSystems: ['Windows', 'macOS', 'Linux', 'Web', 'iOS', 'Android'],
    pricing: 'Freemium',
    rating: 4.5,
    reviewCount: 32100,
    websiteUrl: 'https://slack.com',
    featured: false,
    shortDescription: 'A team messaging and collaboration platform organized around channels.',
    description:
      'Slack is a business messaging platform built around topic-based channels, direct messages and integrations with other work tools. It is widely used as a central communication hub for remote and hybrid teams.',
    features: ['Channel-based organization', 'Huge app/integration directory', 'Voice and video huddles', 'Searchable message history', 'Workflow automation builder'],
    pros: ['Very widely adopted, easy for new hires to learn', 'Strong third-party integrations', 'Reliable notifications and search'],
    cons: ['Free tier limits message history', 'Can contribute to notification overload without discipline'],
    faq: [{ question: 'Is Slack free?', answer: 'A free tier exists with limited message history and app integrations; paid tiers unlock full history and more features.' }]
  },
  {
    slug: '1password',
    name: '1Password',
    logoInitials: '1P',
    category: 'Security',
    operatingSystems: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    pricing: 'Paid',
    rating: 4.7,
    reviewCount: 9800,
    websiteUrl: 'https://1password.com',
    featured: false,
    shortDescription: 'A password manager for storing and autofilling passwords and secure notes.',
    description:
      '1Password securely stores passwords, secure notes, and other sensitive information behind a single master password, with browser extensions and apps that autofill credentials across devices.',
    features: ['Cross-device sync', 'Browser extension autofill', 'Secure document and note storage', 'Travel Mode to hide sensitive vaults', 'Family and team sharing plans'],
    pros: ['Strong reputation for security practices', 'Smooth autofill experience across browsers and apps', 'Supports secure sharing within families/teams'],
    cons: ['No free tier for ongoing individual use (trial only)', 'Requires trusting a third party with credential storage'],
    faq: [
      { question: 'What happens if I forget my master password?', answer: '1Password cannot recover a fully forgotten master password by design (for security) — use their account recovery options and keep an emergency kit as recommended by the provider.' }
    ]
  },
  {
    slug: 'davinci-resolve',
    name: 'DaVinci Resolve',
    logoInitials: 'DR',
    category: 'Video',
    operatingSystems: ['Windows', 'macOS', 'Linux'],
    pricing: 'Freemium',
    rating: 4.6,
    reviewCount: 7400,
    websiteUrl: 'https://www.blackmagicdesign.com/products/davinciresolve',
    featured: true,
    shortDescription: 'Professional-grade video editing, color grading and audio post-production software.',
    description:
      'DaVinci Resolve combines editing, color correction, visual effects and audio post-production in one application. Its free version is remarkably capable, while the paid Studio version adds advanced collaboration and effects features.',
    features: ['Professional color grading tools', 'Fairlight audio post-production', 'Fusion visual effects and motion graphics', 'Multi-user collaborative editing (Studio)', 'Free version with few artificial limits'],
    pros: ['Extremely capable free tier', 'Professional color grading rivaling paid-only competitors', 'All-in-one: editing, color, audio and VFX'],
    cons: ['Steeper learning curve than simpler editors', 'Some advanced features require higher-end hardware'],
    faq: [{ question: 'Is the free version watermarked or limited?', answer: 'The free version is not watermarked and is usable for real projects, though it lacks some advanced features reserved for the paid Studio version.' }]
  },
  {
    slug: 'audacity',
    name: 'Audacity',
    logoInitials: 'AU',
    category: 'Audio',
    operatingSystems: ['Windows', 'macOS', 'Linux'],
    pricing: 'Free',
    rating: 4.4,
    reviewCount: 15600,
    websiteUrl: 'https://www.audacityteam.org',
    featured: false,
    shortDescription: 'A free, open-source audio editor and recorder.',
    description:
      'Audacity is a long-standing open-source audio editing application supporting multi-track recording, effects, noise reduction and format conversion, popular for podcasting and basic audio production.',
    features: ['Multi-track recording and editing', 'Built-in effects and noise reduction', 'Wide format support via plugins', 'Cross-platform and free', 'Active open-source community'],
    pros: ['Completely free and open source', 'Runs on modest hardware', 'Good for basic podcast/voice editing'],
    cons: ['Interface feels dated compared to modern paid tools', 'Lacks some advanced mixing features of professional DAWs'],
    faq: [{ question: 'Is Audacity good enough for podcasting?', answer: 'Yes, it covers the core needs of most podcasters — recording, trimming, noise reduction and export.' }]
  },
  {
    slug: 'obs-studio',
    name: 'OBS Studio',
    logoInitials: 'OBS',
    category: 'Video',
    operatingSystems: ['Windows', 'macOS', 'Linux'],
    pricing: 'Free',
    rating: 4.7,
    reviewCount: 11200,
    websiteUrl: 'https://obsproject.com',
    featured: false,
    shortDescription: 'Free, open-source software for live streaming and screen recording.',
    description:
      'OBS Studio is widely used for live streaming to platforms like Twitch and YouTube, as well as local screen recording, with support for scenes, sources, transitions and plugins.',
    features: ['Scene and source composition', 'Live streaming to multiple platforms', 'High-quality screen and window recording', 'Plugin ecosystem for advanced features', 'Cross-platform and free'],
    pros: ['Completely free and open source', 'Very flexible scene/source system', 'Large community and plugin support'],
    cons: ['Initial setup can be intimidating for beginners', 'Performance depends heavily on system hardware'],
    faq: [{ question: 'Can OBS Studio record just my screen without streaming?', answer: 'Yes, OBS works equally well for local recording only, without ever going live.' }]
  },
  {
    slug: 'trello',
    name: 'Trello',
    logoInitials: 'TR',
    category: 'Productivity',
    operatingSystems: ['Web', 'iOS', 'Android'],
    pricing: 'Freemium',
    rating: 4.5,
    reviewCount: 19700,
    websiteUrl: 'https://trello.com',
    featured: false,
    shortDescription: 'A simple, visual Kanban-style project and task management tool.',
    description:
      'Trello organizes work into boards, lists and cards using the Kanban method, making it an approachable choice for individuals and small teams that want lightweight project tracking without a steep learning curve.',
    features: ['Kanban boards, lists and cards', 'Automation rules (Butler)', 'Power-Ups for extended functionality', 'Templates for common workflows', 'Mobile apps'],
    pros: ['Very easy to learn', 'Generous free tier for small teams', 'Flexible enough for many types of projects'],
    cons: ['Can become unwieldy for very large or complex projects', 'Reporting features are limited compared to dedicated PM tools'],
    faq: [{ question: 'Is Trello suitable for software development teams?', answer: 'Small teams often use it for lightweight tracking, though dedicated tools may suit teams needing sprints, backlogs or detailed reporting.' }]
  },
  {
    slug: 'malwarebytes',
    name: 'Malwarebytes',
    logoInitials: 'MB',
    category: 'Security',
    operatingSystems: ['Windows', 'macOS', 'iOS', 'Android'],
    pricing: 'Freemium',
    rating: 4.4,
    reviewCount: 8600,
    websiteUrl: 'https://www.malwarebytes.com',
    featured: false,
    shortDescription: 'Anti-malware software for scanning and removing malicious software.',
    description:
      'Malwarebytes scans for and removes malware, adware and potentially unwanted programs, and is commonly used alongside traditional antivirus software for an extra layer of protection.',
    features: ['On-demand and scheduled malware scans', 'Real-time protection (paid)', 'Browser guard against malicious sites', 'Ransomware protection (paid)', 'Lightweight scanning engine'],
    pros: ['Effective at catching threats traditional antivirus may miss', 'Free version useful for on-demand scans', 'Simple, clear interface'],
    cons: ['Free version lacks real-time protection', 'Best used alongside, not necessarily instead of, a full antivirus suite'],
    faq: [{ question: 'Do I still need antivirus software if I use Malwarebytes?', answer: 'Many users run Malwarebytes alongside a traditional antivirus for layered protection, since the free version focuses on on-demand scanning rather than full real-time defense.' }]
  },
  {
    slug: 'anki',
    name: 'Anki',
    logoInitials: 'AK',
    category: 'Education',
    operatingSystems: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    pricing: 'Freemium',
    rating: 4.6,
    reviewCount: 6300,
    websiteUrl: 'https://apps.ankiweb.net',
    featured: false,
    shortDescription: 'A spaced-repetition flashcard app for long-term memorization.',
    description:
      'Anki uses spaced repetition — showing cards more often when you struggle with them and less often as you master them — to help with efficient long-term memorization, popular among language learners and students.',
    features: ['Spaced-repetition scheduling algorithm', 'Custom card templates', 'Shared community decks', 'Sync across desktop and mobile', 'Add-on ecosystem on desktop'],
    pros: ['Free and open source on desktop', 'Scientifically grounded spaced-repetition approach', 'Highly customizable card types'],
    cons: ['Interface feels utilitarian rather than polished', 'iOS app is a paid one-time purchase, unlike free desktop/Android versions'],
    faq: [{ question: 'Is Anki free on all platforms?', answer: 'The desktop app and Android app are free; the official iOS app has historically been a one-time paid purchase to help fund development.' }]
  },
  {
    slug: 'mailchimp',
    name: 'Mailchimp',
    logoInitials: 'MC',
    category: 'Marketing',
    operatingSystems: ['Web'],
    pricing: 'Freemium',
    rating: 4.3,
    reviewCount: 14200,
    websiteUrl: 'https://mailchimp.com',
    featured: false,
    shortDescription: 'An email marketing platform for building and sending campaigns and newsletters.',
    description:
      'Mailchimp lets businesses build email lists, design campaigns, automate sequences, and track open/click performance, and has expanded over time into broader marketing and light CRM features.',
    features: ['Drag-and-drop email designer', 'Audience segmentation', 'Marketing automation workflows', 'Campaign analytics', 'Landing page builder'],
    pros: ['Approachable for non-technical marketers', 'Solid free tier for small lists', 'Good template library'],
    cons: ['Pricing scales quickly as your subscriber list grows', 'Advanced automation can require a higher-tier plan'],
    faq: [{ question: 'Is Mailchimp good for a small business just starting out?', answer: 'Yes, its free tier and templates make it a reasonable starting point before a business needs more advanced marketing automation.' }]
  }
];
