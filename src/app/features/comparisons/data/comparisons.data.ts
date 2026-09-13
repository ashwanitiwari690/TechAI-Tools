import { Comparison } from '../../../core/models/comparison.model';

export const COMPARISONS: Comparison[] = [
  {
    slug: 'chatgpt-vs-claude',
    title: 'ChatGPT vs Claude: Which AI Assistant Should You Use?',
    description: 'A side-by-side comparison of ChatGPT and Claude covering strengths, pricing, coding ability and best use cases.',
    publishedDate: '2026-02-10',
    itemA: {
      name: 'ChatGPT',
      slug: 'chatgpt',
      toolSlug: 'chatgpt',
      logoInitials: 'GPT',
      pricing: 'Free / Freemium / Paid',
      rating: 4.7,
      pros: ['Very versatile across tasks', 'Huge ecosystem of guides and integrations', 'Strong free tier'],
      cons: ['Can hallucinate confidently', 'Free tier may rate-limit during peak demand'],
      bestFor: 'General-purpose writing, brainstorming and everyday coding help'
    },
    itemB: {
      name: 'Claude',
      slug: 'claude',
      toolSlug: 'claude',
      logoInitials: 'CL',
      pricing: 'Free / Freemium / Paid',
      rating: 4.8,
      pros: ['Very large context window for long documents/code', 'Strong, structured reasoning', 'Good free tier'],
      cons: ['Fewer third-party plugin integrations', 'No native image generation'],
      bestFor: 'Long documents, codebases and structured technical writing'
    },
    featureRows: [
      { feature: 'Context window', itemA: 'Large', itemB: 'Very large' },
      { feature: 'Coding ability', itemA: 'Strong', itemB: 'Strong, especially for larger codebases' },
      { feature: 'Image generation', itemA: 'Yes (paid tiers)', itemB: 'No' },
      { feature: 'Web browsing / real-time info', itemA: 'Yes (paid tiers)', itemB: 'Limited' },
      { feature: 'Free tier available', itemA: 'Yes', itemB: 'Yes' },
      { feature: 'Third-party plugin ecosystem', itemA: 'Large', itemB: 'Smaller' },
      { feature: 'Long document handling', itemA: 'Good', itemB: 'Excellent' },
      { feature: 'Mobile apps', itemA: 'Yes', itemB: 'Yes' }
    ],
    verdict:
      'Both are excellent general-purpose AI assistants. Choose ChatGPT if you want the broadest ecosystem of integrations and don\'t mind occasional confident mistakes. Choose Claude if you regularly work with long documents or large codebases and value structured, careful responses. Many people use both for different tasks rather than picking just one.',
    faq: [
      { question: 'Is Claude better than ChatGPT for coding?', answer: 'Both are strong for coding; Claude\'s larger context window can be an advantage for large codebases, while ChatGPT\'s ecosystem of coding-focused integrations is broader. Try both on your actual codebase to compare.' },
      { question: 'Which one has a better free tier?', answer: 'Both offer usable free tiers with usage limits that change over time — check each provider\'s current pricing page for the latest limits.' }
    ]
  },
  {
    slug: 'claude-vs-gemini',
    title: 'Claude vs Google Gemini: Key Differences Explained',
    description: 'How Claude and Google Gemini compare on integration, reasoning style, multimodal ability and pricing.',
    publishedDate: '2026-01-25',
    itemA: {
      name: 'Claude',
      slug: 'claude',
      toolSlug: 'claude',
      logoInitials: 'CL',
      pricing: 'Free / Freemium / Paid',
      rating: 4.8,
      pros: ['Excellent long-context handling', 'Structured, careful answers', 'Strong coding support'],
      cons: ['Less integrated with everyday productivity apps', 'No native image generation'],
      bestFor: 'Deep document/code work outside a specific ecosystem'
    },
    itemB: {
      name: 'Google Gemini',
      slug: 'gemini',
      toolSlug: 'gemini',
      logoInitials: 'GM',
      pricing: 'Free / Freemium / Paid',
      rating: 4.5,
      pros: ['Deep Gmail/Docs/Android integration', 'Multimodal (text, image, and more)', 'Grounded in Google Search'],
      cons: ['Best integrations limited to Google ecosystem', 'Less detailed for some technical tasks'],
      bestFor: 'Users already living inside Gmail, Docs and Android'
    },
    featureRows: [
      { feature: 'Ecosystem integration', itemA: 'Standalone', itemB: 'Deep Google Workspace/Android integration' },
      { feature: 'Multimodal input', itemA: 'Text and images', itemB: 'Text, images and more' },
      { feature: 'Real-time search grounding', itemA: 'Limited', itemB: 'Strong (Google Search)' },
      { feature: 'Long document handling', itemA: 'Excellent', itemB: 'Good' },
      { feature: 'Free tier available', itemA: 'Yes', itemB: 'Yes' },
      { feature: 'Best for coding', itemA: 'Yes, especially larger projects', itemB: 'Good for quick snippets' }
    ],
    verdict:
      'If you already rely heavily on Gmail, Docs or Android, Gemini\'s integration is hard to beat for everyday convenience. If your priority is careful reasoning over long documents or codebases independent of any particular ecosystem, Claude is the stronger choice.',
    faq: [
      { question: 'Does Gemini work without a Google account?', answer: 'You can use the standalone Gemini app/website, but its deepest integrations are tied to having a Google account and using Google\'s apps.' }
    ]
  },
  {
    slug: 'chatgpt-vs-gemini',
    title: 'ChatGPT vs Google Gemini: Which Fits Your Workflow?',
    description: 'Comparing ChatGPT and Google Gemini on ecosystem fit, everyday usefulness and pricing.',
    publishedDate: '2026-01-05',
    itemA: {
      name: 'ChatGPT',
      slug: 'chatgpt',
      toolSlug: 'chatgpt',
      logoInitials: 'GPT',
      pricing: 'Free / Freemium / Paid',
      rating: 4.7,
      pros: ['Extremely versatile', 'Huge community and integration ecosystem', 'Strong coding help'],
      cons: ['Can hallucinate confidently', 'Not tied to a specific productivity suite'],
      bestFor: 'General-purpose use across many different apps and platforms'
    },
    itemB: {
      name: 'Google Gemini',
      slug: 'gemini',
      toolSlug: 'gemini',
      logoInitials: 'GM',
      pricing: 'Free / Freemium / Paid',
      rating: 4.5,
      pros: ['Deep Gmail/Docs/Android integration', 'Grounded in Google Search', 'Generous free tier'],
      cons: ['Best integrations limited to Google ecosystem', 'Less detailed for niche technical tasks'],
      bestFor: 'Everyday tasks inside Gmail, Docs and Android'
    },
    featureRows: [
      { feature: 'Ecosystem fit', itemA: 'Platform-agnostic', itemB: 'Best inside Google apps' },
      { feature: 'Coding help', itemA: 'Strong', itemB: 'Good' },
      { feature: 'Real-time info grounding', itemA: 'Available on paid tiers', itemB: 'Strong, built-in' },
      { feature: 'Image generation', itemA: 'Yes (paid tiers)', itemB: 'Yes' },
      { feature: 'Free tier available', itemA: 'Yes', itemB: 'Yes' }
    ],
    verdict:
      'Gemini tends to feel most natural if your daily workflow already runs through Gmail, Docs and Android. ChatGPT is a stronger pick if you want one assistant that works consistently well regardless of which apps or platforms you use.',
    faq: [
      { question: 'Which is better for writing?', answer: 'Both handle general writing well; ChatGPT has a slight edge in ecosystem-agnostic flexibility, while Gemini shines when writing directly inside Google Docs.' }
    ]
  },
  {
    slug: 'cursor-vs-github-copilot',
    title: 'Cursor vs GitHub Copilot: Which AI Coding Tool Wins?',
    description: 'Comparing Cursor and GitHub Copilot on editor integration, multi-file editing, pricing and workflow fit.',
    publishedDate: '2026-02-22',
    itemA: {
      name: 'Cursor',
      slug: 'cursor',
      toolSlug: 'cursor',
      logoInitials: 'CR',
      pricing: 'Freemium',
      rating: 4.7,
      pros: ['Deep codebase-wide chat and multi-file edits', 'Feels like a natural evolution of VS Code', 'Generous free tier'],
      cons: ['Requires switching your primary editor', 'Newer product, smaller long-term track record'],
      bestFor: 'Developers open to switching editors for deeper AI-native features'
    },
    itemB: {
      name: 'GitHub Copilot',
      slug: 'github-copilot',
      toolSlug: 'github-copilot',
      logoInitials: 'GC',
      pricing: 'Paid (free trial)',
      rating: 4.6,
      pros: ['Works inside your existing editor', 'Backed by GitHub/Microsoft with frequent updates', 'Broad language/editor support'],
      cons: ['No permanent free tier for individuals', 'Chat/agent features are less deeply integrated than Cursor\'s'],
      bestFor: 'Developers who want AI assistance without leaving their current editor'
    },
    featureRows: [
      { feature: 'Editor', itemA: 'Standalone editor (VS Code fork)', itemB: 'Extension for VS Code, JetBrains, Neovim, etc.' },
      { feature: 'Multi-file edits', itemA: 'Strong (agent mode)', itemB: 'Available via Copilot Chat' },
      { feature: 'Inline autocomplete quality', itemA: 'Strong', itemB: 'Strong' },
      { feature: 'Pricing', itemA: 'Free tier + paid plans', itemB: 'Paid after trial (free for students/OSS maintainers)' },
      { feature: 'Extension compatibility', itemA: 'Most VS Code extensions work', itemB: 'N/A — it is the extension' },
      { feature: 'Backing/maturity', itemA: 'Newer, fast-growing', itemB: 'Established, backed by GitHub/Microsoft' }
    ],
    verdict:
      'If you\'re willing to switch your primary editor for deeper AI-native multi-file editing, Cursor is compelling and has a solid free tier. If you want to keep your current editor setup exactly as it is and add AI assistance on top, GitHub Copilot is the more conservative, well-established choice.',
    faq: [
      { question: 'Can I use both Cursor and Copilot?', answer: 'Not simultaneously in the same editor session in a meaningful way, since Cursor is a full editor and Copilot is an extension — but you could use Cursor for some projects and Copilot (in another editor) for others.' },
      { question: 'Is Cursor free?', answer: 'Cursor offers a free tier with usage limits, alongside paid plans for heavier use — check its current pricing page for exact limits.' }
    ]
  }
];
