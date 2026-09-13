import { AiTool } from '../../../core/models/ai-tool.model';

export const AI_TOOLS: AiTool[] = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    logoInitials: 'GPT',
    category: 'Writing',
    pricing: 'Freemium',
    rating: 4.7,
    reviewCount: 18420,
    tags: ['Chatbot', 'Writing Assistant', 'General Purpose'],
    websiteUrl: 'https://chat.openai.com',
    featured: true,
    shortDescription: 'A general-purpose AI chatbot for writing, brainstorming, research and coding help.',
    description:
      'ChatGPT is a conversational AI assistant built on OpenAI\'s language models. It can draft and edit text, explain concepts, summarize documents, write and debug code, and hold multi-turn conversations that retain context. A free tier is available, with paid plans unlocking faster responses, more advanced models, and additional tools like file uploads and data analysis.',
    features: [
      'Natural language conversation with multi-turn memory within a session',
      'Code generation, explanation and debugging across many languages',
      'Document and file analysis on paid plans',
      'Custom instructions to tailor tone and behavior',
      'Voice input/output on mobile apps',
      'Browsing and plugin/tool integrations on higher tiers'
    ],
    pros: [
      'Extremely versatile across writing, coding and research tasks',
      'Large ecosystem of guides, integrations and community knowledge',
      'Free tier is genuinely usable for everyday tasks'
    ],
    cons: [
      'Can produce confident-sounding but incorrect answers (hallucinations)',
      'Free tier may be rate-limited or use an older model during peak demand',
      'Long conversations can lose earlier context'
    ],
    bestFor: ['Everyday writing and brainstorming', 'Quick coding help and explanations', 'Summarizing and rephrasing text'],
    alternatives: ['Claude', 'Google Gemini', 'Perplexity'],
    relatedTutorialSlugs: ['how-to-use-chatgpt-effectively', 'best-free-ai-tools-2026', 'how-ai-coding-assistants-work'],
    faq: [
      {
        question: 'Is ChatGPT free to use?',
        answer:
          'Yes, ChatGPT offers a free tier with access to a capable model. Paid plans add faster responses, higher usage limits and more advanced models and tools.'
      },
      {
        question: 'Can ChatGPT write code?',
        answer:
          'Yes. It can generate, explain and help debug code in most popular programming languages, though you should always review and test generated code yourself.'
      },
      {
        question: 'Does ChatGPT remember previous conversations?',
        answer:
          'Within a single chat session it retains context from earlier messages. Some plans also offer optional persistent memory across sessions, which can be turned off in settings.'
      }
    ]
  },
  {
    slug: 'claude',
    name: 'Claude',
    logoInitials: 'CL',
    category: 'Writing',
    pricing: 'Freemium',
    rating: 4.8,
    reviewCount: 9310,
    tags: ['Chatbot', 'Long Context', 'Coding'],
    websiteUrl: 'https://claude.ai',
    featured: true,
    shortDescription: 'An AI assistant from Anthropic known for careful reasoning, long context and strong coding help.',
    description:
      'Claude is Anthropic\'s family of AI assistants, designed with an emphasis on helpfulness and safety. It supports very long conversations and documents thanks to a large context window, and is widely used for writing, analysis, coding and reviewing long files such as contracts or reports. Claude is available for free with usage limits, and through paid subscription and API plans.',
    features: [
      'Very large context window for long documents and codebases',
      'Strong performance on coding, refactoring and code review tasks',
      'Artifacts feature for viewing generated code, documents and diagrams side-by-side',
      'Careful, structured explanations for complex topics',
      'Desktop, web and mobile apps plus a developer API'
    ],
    pros: [
      'Handles long documents and multi-file code context very well',
      'Tends to give well-structured, carefully reasoned answers',
      'Free tier is available for casual use'
    ],
    cons: [
      'Free tier usage limits can be reached quickly with heavy use',
      'Fewer third-party plugin integrations than some competitors',
      'No native image generation'
    ],
    bestFor: ['Reviewing and summarizing long documents', 'Software development and refactoring', 'Structured technical writing'],
    alternatives: ['ChatGPT', 'Google Gemini', 'GitHub Copilot'],
    relatedTutorialSlugs: ['how-ai-coding-assistants-work', 'best-ai-tools-for-developers'],
    faq: [
      {
        question: 'What makes Claude different from other chatbots?',
        answer:
          'Claude is particularly strong at working with long documents and codebases due to its large context window, and is known for structured, careful responses.'
      },
      {
        question: 'Can I use Claude for free?',
        answer: 'Yes, a free tier is available with daily/usage limits. Paid plans increase those limits and add more capable models.'
      }
    ]
  },
  {
    slug: 'gemini',
    name: 'Google Gemini',
    logoInitials: 'GM',
    category: 'Writing',
    pricing: 'Freemium',
    rating: 4.5,
    reviewCount: 11250,
    tags: ['Chatbot', 'Google Integration', 'Multimodal'],
    websiteUrl: 'https://gemini.google.com',
    featured: true,
    shortDescription: 'Google\'s multimodal AI assistant, integrated with Search, Workspace and Android.',
    description:
      'Gemini is Google\'s AI assistant, capable of understanding and generating text, images and code, with deep integration into Google Search, Gmail, Docs and Android devices. It is a strong choice for users already inside the Google ecosystem who want AI help woven directly into their everyday apps.',
    features: [
      'Multimodal understanding of text, images and, on some tiers, video/audio',
      'Direct integration with Gmail, Docs, Sheets and Android',
      'Real-time information via Google Search grounding',
      'Extensions to trigger actions in connected Google apps',
      'Mobile app with voice conversation mode'
    ],
    pros: [
      'Seamless integration with Gmail, Docs and Android',
      'Good at grounding answers in up-to-date search results',
      'Generous free tier for everyday use'
    ],
    cons: [
      'Best integrations are limited to the Google ecosystem',
      'Response style can be less detailed than some competitors for technical tasks',
      'Advanced features gated behind a paid subscription'
    ],
    bestFor: ['Users already using Gmail, Docs or Android', 'Quick answers grounded in current information', 'Everyday productivity tasks'],
    alternatives: ['ChatGPT', 'Claude', 'Perplexity'],
    relatedTutorialSlugs: ['best-free-ai-tools-2026'],
    faq: [
      {
        question: 'Is Gemini free?',
        answer: 'Yes, a free tier is available. A paid subscription unlocks more advanced models and higher usage limits.'
      },
      {
        question: 'Does Gemini work with Google Docs and Gmail?',
        answer: 'Yes, Gemini integrates directly with Gmail, Docs, Sheets and other Google Workspace apps for many users.'
      }
    ]
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    logoInitials: 'PX',
    category: 'Research',
    pricing: 'Freemium',
    rating: 4.6,
    reviewCount: 6210,
    tags: ['Research', 'Search', 'Citations'],
    websiteUrl: 'https://www.perplexity.ai',
    featured: true,
    shortDescription: 'An AI-powered answer engine that cites its sources for research and fact-finding.',
    description:
      'Perplexity combines web search with AI summarization to answer questions directly, citing the sources it used. It is designed as an alternative to traditional search for research-heavy tasks, letting you ask follow-up questions and dig into a topic with linked citations you can verify.',
    features: [
      'Cited answers linking back to source pages',
      'Follow-up questions within a research thread',
      'Focus modes for academic, writing or coding-oriented searches',
      'Collections to organize related research threads',
      'Browser extension for quick lookups'
    ],
    pros: [
      'Citations make it easy to verify claims',
      'Good for fast, structured research summaries',
      'Free tier covers most casual research needs'
    ],
    cons: [
      'Less suited to open-ended creative writing',
      'Answer quality depends on the quality of indexed sources',
      'Some advanced models limited to paid tier'
    ],
    bestFor: ['Fact-checked research summaries', 'Comparing products or technologies quickly', 'Students and analysts'],
    alternatives: ['Google Gemini', 'ChatGPT', 'Claude'],
    relatedTutorialSlugs: ['best-ai-tools-for-developers'],
    faq: [
      {
        question: 'How is Perplexity different from a normal search engine?',
        answer:
          'Instead of returning a list of links, Perplexity reads relevant sources and gives you a direct, cited summary answer, with the option to click through to verify each source.'
      }
    ]
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    logoInitials: 'GC',
    category: 'Coding',
    pricing: 'Paid',
    rating: 4.6,
    reviewCount: 15870,
    tags: ['Code Completion', 'IDE Integration', 'Pair Programming'],
    websiteUrl: 'https://github.com/features/copilot',
    featured: true,
    shortDescription: 'An AI pair programmer that suggests code and entire functions directly in your editor.',
    description:
      'GitHub Copilot integrates with popular editors like VS Code, JetBrains IDEs and Neovim to suggest inline code completions, entire functions, and tests based on your existing code and comments. It also offers a chat interface for asking questions about your codebase and generating changes across files.',
    features: [
      'Inline code suggestions as you type',
      'Chat interface for codebase-aware questions',
      'Automatic test and documentation generation',
      'Support for dozens of languages and frameworks',
      'Editor integrations for VS Code, JetBrains, Neovim and more'
    ],
    pros: [
      'Deep integration into the coding workflow, not a separate app',
      'Learns from the surrounding code and comments for relevant suggestions',
      'Backed by GitHub/Microsoft with frequent updates'
    ],
    cons: [
      'Paid product with no permanent free tier for individuals (free trial only)',
      'Suggestions still need human review for correctness and security',
      'Can occasionally suggest outdated API usage'
    ],
    bestFor: ['Professional software developers', 'Speeding up boilerplate and repetitive code', 'Writing tests and documentation'],
    alternatives: ['Cursor', 'ChatGPT', 'Claude'],
    relatedTutorialSlugs: ['how-to-use-github-copilot', 'how-ai-coding-assistants-work', 'best-ai-tools-for-developers'],
    faq: [
      {
        question: 'Which editors support GitHub Copilot?',
        answer: 'Copilot officially supports VS Code, Visual Studio, JetBrains IDEs (IntelliJ, WebStorm, PyCharm, etc.) and Neovim.'
      },
      {
        question: 'Is GitHub Copilot free?',
        answer: 'Individual plans are paid after a free trial period; it is free for verified students and maintainers of popular open source projects.'
      }
    ]
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    logoInitials: 'CR',
    category: 'Coding',
    pricing: 'Freemium',
    rating: 4.7,
    reviewCount: 4380,
    tags: ['AI Code Editor', 'Codebase Chat', 'Refactoring'],
    websiteUrl: 'https://www.cursor.com',
    featured: false,
    shortDescription: 'An AI-first code editor built on VS Code with deep codebase-aware chat and edits.',
    description:
      'Cursor is a standalone code editor, forked from VS Code, built around AI features from the ground up. It offers multi-file, codebase-aware chat and edit commands that can plan and apply changes across a project, alongside fast inline autocomplete.',
    features: [
      'Codebase-wide chat that can reference multiple files',
      'Multi-file "agent" edits that plan and apply changes',
      'Fast inline autocomplete tuned for larger edits',
      'Compatible with most VS Code extensions and keybindings',
      'Model picker to choose between different underlying AI models'
    ],
    pros: [
      'Feels like a natural evolution of VS Code rather than a bolted-on plugin',
      'Strong at multi-file refactors and larger changes',
      'Generous free tier for individual developers'
    ],
    cons: [
      'Requires switching editors rather than adding to an existing one',
      'Heavier AI usage can hit plan limits',
      'Newer product with a smaller extension marketplace track record'
    ],
    bestFor: ['Developers open to switching their primary editor', 'Large refactors spanning many files', 'Rapid prototyping'],
    alternatives: ['GitHub Copilot', 'ChatGPT', 'Claude'],
    relatedTutorialSlugs: ['best-ai-tools-for-developers', 'how-ai-coding-assistants-work'],
    faq: [
      {
        question: 'Is Cursor based on VS Code?',
        answer: 'Yes, Cursor is a fork of VS Code, so most keybindings, themes and many extensions carry over.'
      }
    ]
  },
  {
    slug: 'canva-ai',
    name: 'Canva AI (Magic Studio)',
    logoInitials: 'CV',
    category: 'Image Generation',
    pricing: 'Freemium',
    rating: 4.5,
    reviewCount: 8930,
    tags: ['Design', 'Image Generation', 'Templates'],
    websiteUrl: 'https://www.canva.com/magic-studio',
    featured: true,
    shortDescription: 'AI-powered design tools inside Canva for generating images, text and layout suggestions.',
    description:
      'Canva\'s Magic Studio adds AI features on top of its drag-and-drop design editor: generating images from text prompts, removing backgrounds, resizing designs for multiple platforms, and suggesting layouts and copy. It is aimed at non-designers who need quick, professional-looking visuals.',
    features: [
      'Text-to-image generation inside the design canvas',
      'One-click background removal and photo editing',
      'Magic Write for on-brand marketing copy',
      'Automatic resizing across social formats',
      'Large library of templates, fonts and stock assets'
    ],
    pros: [
      'Very approachable for people with no design background',
      'AI features are integrated directly into a full design workflow',
      'Free tier is usable for basic projects'
    ],
    cons: [
      'Advanced AI features and premium assets require a paid plan',
      'Less control over fine detail compared to dedicated image generators',
      'Can produce generic-looking results without careful prompting'
    ],
    bestFor: ['Social media graphics and marketing visuals', 'Quick presentations and documents', 'Small teams without a designer'],
    alternatives: ['Midjourney', 'Jasper AI'],
    relatedTutorialSlugs: ['best-free-ai-tools-2026'],
    faq: [
      {
        question: 'Do I need design experience to use Canva AI?',
        answer: 'No. Canva is built for non-designers, with templates and AI generation designed to fill in gaps in design skill.'
      }
    ]
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    logoInitials: 'MJ',
    category: 'Image Generation',
    pricing: 'Paid',
    rating: 4.7,
    reviewCount: 12040,
    tags: ['Image Generation', 'Art', 'Discord'],
    websiteUrl: 'https://www.midjourney.com',
    featured: true,
    shortDescription: 'A leading text-to-image generator known for highly stylized, artistic image quality.',
    description:
      'Midjourney generates images from text prompts and is widely regarded for the artistic quality and stylistic range of its output. It is accessed through Discord or a web interface, and is popular among illustrators, concept artists and marketers creating unique visual content.',
    features: [
      'High-quality, stylistically distinctive text-to-image generation',
      'Parameters for aspect ratio, stylization strength and consistency',
      'Image upscaling and variation tools',
      'Community gallery for prompt inspiration',
      'Web app in addition to the original Discord bot interface'
    ],
    pros: [
      'Consistently strong artistic image quality',
      'Active community sharing prompts and techniques',
      'Frequent model updates improving realism and detail'
    ],
    cons: [
      'No free tier — a paid plan is required to generate images',
      'Learning prompt syntax has a moderate curve',
      'Commercial usage rights depend on your subscription tier'
    ],
    bestFor: ['Concept art and illustration', 'Unique marketing and social visuals', 'Creative exploration and moodboarding'],
    alternatives: ['Canva AI', 'Runway'],
    relatedTutorialSlugs: ['best-free-ai-tools-2026'],
    faq: [
      {
        question: 'Is Midjourney free?',
        answer: 'No, Midjourney requires a paid subscription to generate images; there is no ongoing free tier.'
      },
      {
        question: 'Can I use Midjourney images commercially?',
        answer: 'Commercial usage terms depend on your subscription plan — check Midjourney\'s current terms of service for details.'
      }
    ]
  },
  {
    slug: 'runway',
    name: 'Runway',
    logoInitials: 'RW',
    category: 'Video',
    pricing: 'Freemium',
    rating: 4.5,
    reviewCount: 3720,
    tags: ['Video Generation', 'Editing', 'Creative Tools'],
    websiteUrl: 'https://runwayml.com',
    featured: true,
    shortDescription: 'AI-powered video generation and editing tools for creators and production teams.',
    description:
      'Runway offers a suite of AI video tools including text-to-video and image-to-video generation, background removal, motion tracking and inpainting for video. It is used by filmmakers, marketers and social content creators to speed up production and experiment with new visual styles.',
    features: [
      'Text-to-video and image-to-video generation',
      'Green-screen-free background removal for video',
      'Motion brush and camera control for generated clips',
      'Video inpainting to remove or replace objects',
      'Collaborative workspace for creative teams'
    ],
    pros: [
      'Wide range of AI video tools in one workspace',
      'Frequent model updates improving clip quality and length',
      'Useful for rapid previsualization and experimentation'
    ],
    cons: [
      'Generated video length and consistency still evolving',
      'Heavier usage requires a paid plan',
      'Rendering can take noticeably longer than image generation'
    ],
    bestFor: ['Short-form marketing and social video', 'Concept previsualization', 'Video editing with AI-assisted tools'],
    alternatives: ['Synthesia', 'Midjourney'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Can Runway generate video from a text prompt?',
        answer: 'Yes, Runway supports text-to-video generation as well as animating a starting image (image-to-video).'
      }
    ]
  },
  {
    slug: 'synthesia',
    name: 'Synthesia',
    logoInitials: 'SY',
    category: 'Video',
    pricing: 'Paid',
    rating: 4.4,
    reviewCount: 2910,
    tags: ['AI Avatars', 'Video', 'E-learning'],
    websiteUrl: 'https://www.synthesia.io',
    featured: false,
    shortDescription: 'Create videos with AI avatars and text-to-speech narration, without filming.',
    description:
      'Synthesia turns a script into a video featuring an AI avatar speaking with synthesized voice-over, supporting dozens of languages. It is popular for training videos, product explainers and internal communications where filming a real presenter is impractical.',
    features: [
      'Library of AI avatars in multiple styles',
      'Text-to-speech in a wide range of languages and accents',
      'Custom avatar creation from real footage on higher plans',
      'Templates for training, marketing and onboarding videos',
      'Screen recording and slide import'
    ],
    pros: [
      'No camera, studio or presenter required',
      'Fast to produce multilingual training content',
      'Professional-looking output for corporate use cases'
    ],
    cons: [
      'No free tier for ongoing use',
      'Avatars can still look noticeably synthetic in close-up',
      'Best suited to scripted, presenter-style content rather than dynamic footage'
    ],
    bestFor: ['Corporate training and onboarding videos', 'Multilingual product explainers', 'Internal communications'],
    alternatives: ['Runway'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Do I need to film anything to use Synthesia?',
        answer: 'No. You provide a script, and Synthesia generates a video of an AI avatar narrating it — no camera or studio needed.'
      }
    ]
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    logoInitials: 'EL',
    category: 'Audio',
    pricing: 'Freemium',
    rating: 4.7,
    reviewCount: 5230,
    tags: ['Text-to-Speech', 'Voice Cloning', 'Audio'],
    websiteUrl: 'https://elevenlabs.io',
    featured: true,
    shortDescription: 'High-quality AI text-to-speech and voice cloning for narration, dubbing and apps.',
    description:
      'ElevenLabs generates natural-sounding speech from text in many languages and voices, and offers voice cloning tools for creating a custom synthetic voice. It is used for audiobook narration, video dubbing, podcast production and adding voice to apps.',
    features: [
      'Wide library of realistic AI voices',
      'Custom voice cloning from sample audio (with consent-based verification)',
      'Multilingual speech generation and dubbing',
      'API for embedding speech generation into apps',
      'Fine-grained controls for tone, pacing and emotion'
    ],
    pros: [
      'Among the most natural-sounding AI voices available',
      'Useful free tier for testing before committing to a paid plan',
      'Strong developer API for integrating into products'
    ],
    cons: [
      'Voice cloning raises consent and misuse considerations that require careful use',
      'Higher-quality/longer generation requires a paid plan',
      'Fine emotional control still requires experimentation'
    ],
    bestFor: ['Audiobook and podcast narration', 'Video dubbing and localization', 'Adding voice features to apps'],
    alternatives: ['Synthesia'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Can ElevenLabs clone a specific voice?',
        answer:
          'Yes, with sufficient sample audio and consent verification, ElevenLabs can create a custom voice model. Always ensure you have rights to any voice you clone.'
      }
    ]
  },
  {
    slug: 'otter-ai',
    name: 'Otter.ai',
    logoInitials: 'OT',
    category: 'Audio',
    pricing: 'Freemium',
    rating: 4.4,
    reviewCount: 6720,
    tags: ['Transcription', 'Meetings', 'Notes'],
    websiteUrl: 'https://otter.ai',
    featured: false,
    shortDescription: 'AI meeting assistant that transcribes calls and generates searchable summaries.',
    description:
      'Otter.ai joins or records meetings and produces real-time transcripts, speaker labels, and AI-generated summaries with action items. It integrates with popular video conferencing tools and calendars to automatically capture and organize meeting notes.',
    features: [
      'Real-time transcription with speaker identification',
      'Automated meeting summaries and action items',
      'Integrations with Zoom, Google Meet and Microsoft Teams',
      'Searchable archive of past meeting transcripts',
      'Shared team workspace for notes'
    ],
    pros: [
      'Saves significant time on manual note-taking',
      'Good accuracy for clear audio in common languages',
      'Useful free tier for light meeting volume'
    ],
    cons: [
      'Accuracy drops with heavy accents, crosstalk or poor audio',
      'Higher meeting volume needs a paid plan',
      'Privacy considerations when recording meetings with others'
    ],
    bestFor: ['Teams with frequent recurring meetings', 'Students recording lectures', 'Journalists and researchers doing interviews'],
    alternatives: ['ElevenLabs'],
    relatedTutorialSlugs: ['productivity-tips-for-developers'],
    faq: [
      {
        question: 'Does Otter.ai work with Zoom and Google Meet?',
        answer: 'Yes, Otter integrates with major video conferencing platforms to join and transcribe meetings automatically.'
      }
    ]
  },
  {
    slug: 'jasper-ai',
    name: 'Jasper AI',
    logoInitials: 'JA',
    category: 'Marketing',
    pricing: 'Paid',
    rating: 4.4,
    reviewCount: 4110,
    tags: ['Marketing Copy', 'Brand Voice', 'Content'],
    websiteUrl: 'https://www.jasper.ai',
    featured: false,
    shortDescription: 'An AI writing platform focused on on-brand marketing copy at scale.',
    description:
      'Jasper is built for marketing teams that need consistent, on-brand content across many channels — blog posts, ad copy, emails and social captions. It supports brand voice profiles so generated content matches a company\'s established tone.',
    features: [
      'Brand voice profiles trained on existing content',
      'Templates for ads, emails, blogs and social posts',
      'Team workspaces with shared brand assets',
      'Browser extension for writing anywhere on the web',
      'Integrations with common marketing and CMS tools'
    ],
    pros: [
      'Strong focus on brand consistency across a team',
      'Wide range of ready-made marketing templates',
      'Useful for scaling content production'
    ],
    cons: [
      'No free tier; pricing is aimed at teams rather than individuals',
      'Best value requires setting up brand voice properly first',
      'Overlaps significantly with general chatbots for simple tasks'
    ],
    bestFor: ['Marketing teams producing content at scale', 'Agencies managing multiple brand voices', 'Ad and email copywriting'],
    alternatives: ['Canva AI'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Is Jasper AI free?',
        answer: 'Jasper does not offer an ongoing free tier; it typically offers a trial period before requiring a paid subscription.'
      }
    ]
  },
  {
    slug: 'grammarly',
    name: 'Grammarly',
    logoInitials: 'GR',
    category: 'Writing',
    pricing: 'Freemium',
    rating: 4.6,
    reviewCount: 21430,
    tags: ['Grammar', 'Writing Assistant', 'Browser Extension'],
    websiteUrl: 'https://www.grammarly.com',
    featured: false,
    shortDescription: 'An AI writing assistant that checks grammar, clarity, tone and style as you type.',
    description:
      'Grammarly reviews text in real time for grammar, spelling, clarity and tone issues, and increasingly offers generative rewriting suggestions. It works as a browser extension, desktop app, and integration inside tools like Gmail, Google Docs and Microsoft Word.',
    features: [
      'Real-time grammar, spelling and punctuation checks',
      'Tone detection and clarity suggestions',
      'Full-sentence AI rewrite suggestions',
      'Plagiarism checking on higher tiers',
      'Works across browser, desktop and major writing apps'
    ],
    pros: [
      'Works nearly everywhere you write on the web',
      'Free tier catches most common writing mistakes',
      'Tone detection is useful for professional communication'
    ],
    cons: [
      'Advanced rewriting and plagiarism checks require a paid plan',
      'Occasionally over-corrects stylistic choices',
      'Less suited to long-form creative drafting than dedicated writing AIs'
    ],
    bestFor: ['Proofreading emails and documents', 'Non-native speakers refining written English', 'Teams enforcing consistent writing style'],
    alternatives: ['ChatGPT', 'Jasper AI'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Does Grammarly work in Google Docs and Gmail?',
        answer: 'Yes, Grammarly offers browser extensions and integrations that work inside Gmail, Google Docs, Word and many other apps.'
      }
    ]
  },
  {
    slug: 'notion-ai',
    name: 'Notion AI',
    logoInitials: 'NA',
    category: 'Productivity',
    pricing: 'Freemium',
    rating: 4.4,
    reviewCount: 5490,
    tags: ['Notes', 'Productivity', 'Workspace'],
    websiteUrl: 'https://www.notion.so/product/ai',
    featured: false,
    shortDescription: 'AI features built into the Notion workspace for writing, summarizing and Q&A.',
    description:
      'Notion AI adds writing assistance, summarization, translation and question-answering directly inside Notion pages and databases. It can summarize long pages, draft content in-line, and answer questions using the content already stored in your workspace.',
    features: [
      'In-line writing and rewriting suggestions',
      'Page and thread summarization',
      'Workspace-wide Q&A over your own Notion content',
      'Auto-generated action items from meeting notes',
      'Translation into multiple languages'
    ],
    pros: [
      'Works directly where teams already keep notes and docs',
      'Useful for summarizing long internal documentation',
      'No separate app to learn if you already use Notion'
    ],
    cons: [
      'Requires an existing Notion workspace to be useful',
      'AI features are a paid add-on beyond a limited trial',
      'Less powerful as a general-purpose chatbot compared to dedicated AI apps'
    ],
    bestFor: ['Teams already using Notion for docs and wikis', 'Summarizing meeting notes and long pages', 'Lightweight in-workspace writing help'],
    alternatives: ['Grammarly'],
    relatedTutorialSlugs: ['productivity-tips-for-developers'],
    faq: [
      {
        question: 'Do I need a Notion account to use Notion AI?',
        answer: 'Yes, Notion AI is an add-on feature within the Notion workspace product, not a standalone app.'
      }
    ]
  },
  {
    slug: 'surfer-seo',
    name: 'Surfer SEO',
    logoInitials: 'SF',
    category: 'SEO',
    pricing: 'Paid',
    rating: 4.5,
    reviewCount: 2650,
    tags: ['SEO', 'Content Optimization', 'Keyword Research'],
    websiteUrl: 'https://surferseo.com',
    featured: false,
    shortDescription: 'Data-driven content optimization and keyword research for SEO-focused writing.',
    description:
      'Surfer SEO analyzes top-ranking pages for a target keyword and gives content writers concrete guidance — word count ranges, related terms, and structure suggestions — to help pages compete for search visibility. It also includes an AI writing assistant and site audit tools.',
    features: [
      'Content editor with real-time SEO scoring while writing',
      'Keyword research and clustering tools',
      'SERP analysis showing top-ranking competitor structure',
      'AI-assisted outline and draft generation',
      'Site audit for on-page SEO issues'
    ],
    pros: [
      'Concrete, data-backed guidance rather than vague SEO tips',
      'Speeds up content briefs for writing teams',
      'Useful audit tools beyond just content writing'
    ],
    cons: [
      'No free tier; positioned for professional/agency use',
      'Optimizing purely for the score can hurt natural readability if overused',
      'Best results require pairing with genuine subject-matter expertise'
    ],
    bestFor: ['Content teams writing for organic search', 'SEO agencies managing multiple clients', 'Bloggers targeting competitive keywords'],
    alternatives: ['Jasper AI'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Does Surfer SEO write content for you?',
        answer:
          'It includes AI-assisted drafting tools, but it is primarily designed to guide human writers with data-backed structure and keyword recommendations.'
      }
    ]
  },
  {
    slug: 'khanmigo',
    name: 'Khanmigo',
    logoInitials: 'KM',
    category: 'Education',
    pricing: 'Freemium',
    rating: 4.3,
    reviewCount: 1580,
    tags: ['Tutoring', 'Education', 'Students'],
    websiteUrl: 'https://www.khanacademy.org/khan-labs',
    featured: false,
    shortDescription: 'An AI tutor from Khan Academy that guides students through problems step by step.',
    description:
      'Khanmigo is an AI tutoring assistant built by Khan Academy that aims to guide students toward answers through questions and hints, rather than simply providing solutions. It is designed for use alongside Khan Academy\'s existing courses, with tools for teachers as well as students.',
    features: [
      'Socratic-style guided tutoring rather than direct answers',
      'Integration with Khan Academy course content',
      'Teacher-facing tools for lesson planning and feedback',
      'Writing feedback coach for essays',
      'Practice support across math, science and humanities'
    ],
    pros: [
      'Designed specifically around pedagogy, not just answers',
      'Ties directly into a large existing library of course content',
      'Useful for both students and teachers'
    ],
    cons: [
      'Full feature set may require a paid or institutional plan',
      'Less general-purpose than a standard chatbot',
      'Best suited to subjects covered by Khan Academy\'s curriculum'
    ],
    bestFor: ['Students wanting guided practice, not just answers', 'Teachers planning lessons and giving feedback', 'Supplementing classroom instruction'],
    alternatives: ['ChatGPT'],
    relatedTutorialSlugs: [],
    faq: [
      {
        question: 'Does Khanmigo just give students the answers?',
        answer:
          'No, it is designed to guide students with hints and questions toward understanding, rather than simply providing final answers.'
      }
    ]
  },
  {
    slug: 'zapier-ai',
    name: 'Zapier AI',
    logoInitials: 'ZP',
    category: 'Business',
    pricing: 'Freemium',
    rating: 4.4,
    reviewCount: 3340,
    tags: ['Automation', 'Workflows', 'Integrations'],
    websiteUrl: 'https://zapier.com/ai',
    featured: false,
    shortDescription: 'AI-assisted workflow automation connecting thousands of business apps.',
    description:
      'Zapier\'s AI features help business users describe an automation in plain language and get a working workflow ("Zap") connecting apps like email, spreadsheets, CRMs and chat tools — without writing code. It builds on Zapier\'s existing library of thousands of app integrations.',
    features: [
      'Natural-language creation of multi-step automations',
      'AI-powered data formatting and extraction steps within workflows',
      'Thousands of pre-built app integrations',
      'Conditional logic and multi-path workflows',
      'Chatbot builder for simple AI-assisted customer interactions'
    ],
    pros: [
      'Removes most of the technical barrier to business process automation',
      'Enormous library of supported apps and triggers',
      'Free tier is enough to try simple automations'
    ],
    cons: [
      'Complex workflows can still require careful manual configuration',
      'Costs scale with the number of automated tasks run per month',
      'Debugging failed automations can be non-trivial for non-technical users'
    ],
    bestFor: ['Small businesses automating repetitive tasks', 'Connecting apps that don\'t natively integrate', 'Non-technical teams building simple workflows'],
    alternatives: ['Notion AI'],
    relatedTutorialSlugs: ['productivity-tips-for-developers'],
    faq: [
      {
        question: 'Do I need to know how to code to use Zapier AI?',
        answer: 'No, Zapier is designed for non-developers, and its AI features let you describe an automation in plain language to get started.'
      }
    ]
  }
];
