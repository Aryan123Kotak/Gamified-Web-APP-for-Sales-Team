// Modules 8–15 — built from "The AI Sales Productivity Playbook" (Malpani Group, v1.0)

export const modulesB = [
  {
    id: 8,
    slug: 'image-video-basics',
    title: 'Image & Video: The Basics',
    emoji: '🎨',
    tagline: "You don't need a designer for everyday sales visuals.",
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'Who makes what',
        body: [
          {
            type: 'table',
            headers: ['Model', 'Images', 'Video', 'Notes'],
            rows: [
              ['ChatGPT', 'Yes (gpt-image)', 'No (Sora discontinued)', 'Strong text-in-image, precise edits that change only what you ask'],
              ['Gemini', 'Yes (Nano Banana)', 'Yes (Veo)', 'Great for realistic infographics; Veo makes short clips with sound'],
              ['Claude', 'No', 'No', 'Best for the words: captions, ad copy, image briefs, storyboards'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'How to prompt for images',
        body: [
          { type: 'p', text: 'Describe subject, style, composition, mood, colours and text — **be specific**. Structure: [subject] + [setting/action] + [style] + [lighting/mood] + [aspect ratio] + [any on-image text].' },
          { type: 'prompt', promptId: 'p-ad-image' },
          { type: 'prompt', promptId: 'p-infographic' },
        ],
      },
      {
        id: 'l3',
        title: 'Sales use cases + prompting for video',
        body: [
          { type: 'list', items: [
            'Social posts and festival/offer creatives without waiting on design.',
            'Product mock-ups and concept visuals to include in a proposal.',
            'Simple diagrams and process infographics for pitches.',
            'Short Veo videos: a 5–8 second product teaser or animated offer for WhatsApp/Instagram.',
          ] },
          { type: 'prompt', promptId: 'p-veo-teaser' },
        ],
      },
      {
        id: 'l4',
        title: 'Guardrails',
        body: [
          { type: 'callout', title: '🛡️ GUARDRAILS', text: "Don't fabricate product photos that misrepresent what you sell. Avoid using real people's faces without consent. Check any AI-generated figures or claims before they go on a customer-facing asset — treat visuals like any other marketing material that needs sign-off." },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which model generates short videos (via Veo)?',
        options: ['ChatGPT', 'Claude', 'Gemini', 'All three'],
        correct: 2,
        explain: 'Only Gemini generates video, via Veo — short clips with sound.',
      },
      {
        q: "What is Claude's role in visual content, since it can't generate images?",
        options: [
          'It has no role in visuals',
          'The words: captions, ad copy, image briefs, storyboards',
          'It converts images to video',
          'It only resizes images',
        ],
        correct: 1,
        explain: 'Claude is the strongest at the words around visuals — briefs, captions, copy, storyboards.',
      },
      {
        q: "What is Gemini's image model nicknamed in the playbook?",
        options: ['Veo', 'Nano Banana', 'gpt-image', 'Imagen Max'],
        correct: 1,
        explain: 'Gemini generates images with Nano Banana and video with Veo.',
      },
      {
        q: 'A good image prompt includes…',
        options: [
          'Just the subject, keep it short',
          'Subject + setting/action + style + lighting/mood + aspect ratio + any on-image text',
          'Only the brand colours',
          'A link to a competitor image',
        ],
        correct: 1,
        explain: 'Be specific across all six elements — that structure is what separates usable output from generic art.',
      },
      {
        q: 'Which of these is a stated guardrail for AI visuals?',
        options: [
          'Never use aspect ratios other than 1:1',
          "Don't fabricate product photos that misrepresent what you sell",
          'Only generate images on Fridays',
          'Always add a watermark',
        ],
        correct: 1,
        explain: 'No fabricated or misrepresenting product photos, no real faces without consent, and sign-off before anything customer-facing.',
      },
    ],
    prompts: [
      {
        id: 'p-ad-image',
        title: 'Social / Ad Image',
        rarity: 'rare',
        text: 'Create a clean, modern promotional image for a real-estate offer. Subject: a bright new apartment living room, warm afternoon light. Style: photorealistic, premium, aspirational. Aspect ratio 1:1. Add bold text "Homes from ₹45L" top-left. Leave space bottom-right for a logo. Colours: warm neutrals with a deep-blue accent.',
      },
      {
        id: 'p-infographic',
        title: 'Simple Explainer / Infographic',
        rarity: 'rare',
        text: 'Make a simple 3-step infographic explaining how our onboarding works. Steps: 1) Sign up 2) Personalise 3) Go live. Flat vector style, brand colours navy and terracotta, minimal text, mobile-friendly 4:5.',
      },
      {
        id: 'p-veo-teaser',
        title: 'Veo Video Teaser',
        rarity: 'epic',
        text: "An 8-second cinematic clip: a smartphone showing our app dashboard, camera slowly pushing in, soft studio lighting, upbeat background music, text overlay 'Close deals faster.' 9:16 vertical.",
      },
    ],
    missions: [],
  },

  {
    id: 9,
    slug: 'vision',
    title: 'Vision: AI That Can See',
    emoji: '👁️',
    tagline: 'Quietly one of the most useful features for sales admin.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'What vision unlocks',
        body: [
          { type: 'p', text: "Separate from generating images, all three models can **read images you upload**. This 'vision' capability is quietly one of the most useful features for sales admin." },
          { type: 'list', items: [
            'Snap a photo of a **business card or trade-show badge** → get a clean contact entry.',
            'Photograph a **printed price list, brochure or handwritten notes** → extract the text/table into a spreadsheet.',
            "Upload a **competitor's flyer or screenshot** → pull out their offer and pricing for a battlecard.",
            'Share a **screenshot of a chart or dashboard** → get it explained or summarised.',
            'Upload a **filled paper form** → convert it into structured data.',
          ] },
        ],
      },
      {
        id: 'l2',
        title: 'How to use it',
        body: [
          { type: 'list', ordered: true, items: [
            'Click the attach/image button (or use your phone camera in the app).',
            'Upload the photo or screenshot.',
            'Ask precisely: "Extract every product and price from this brochure into a table," or "Read this business card and format it as name, title, company, phone, email."',
          ] },
          { type: 'prompt', promptId: 'p-business-card' },
        ],
      },
      {
        id: 'l3',
        title: 'The field-sales superpower',
        body: [
          { type: 'callout', title: '🃏 FIELD-SALES SUPERPOWER', text: 'At an exhibition, photograph every card you collect and have the model turn the batch into a ready-to-import CSV before you leave the venue. No more typing 40 cards on Monday morning.' },
        ],
      },
    ],
    quiz: [
      {
        q: "What does 'vision' mean in this context?",
        options: [
          'Generating images from text',
          'The model reading and understanding images you upload',
          'Predicting future sales',
          'Video calling with the AI',
        ],
        correct: 1,
        explain: 'Vision = the model reads your uploads: cards, brochures, screenshots, forms. Generation is the opposite direction.',
      },
      {
        q: 'In the business-card prompt, what should the model do with an unclear field?',
        options: [
          'Guess the most likely value',
          'Leave it blank silently',
          'Write "unclear" rather than guessing',
          'Make up a placeholder email',
        ],
        correct: 2,
        explain: 'If any field is unclear, write "unclear" rather than guessing — accuracy beats completeness for contact data.',
      },
      {
        q: 'What is the trade-show superpower?',
        options: [
          'Live-translating conversations',
          'Photographing every collected card and getting a ready-to-import CSV before leaving the venue',
          'Scanning competitor badges',
          'Auto-booking follow-up meetings',
        ],
        correct: 1,
        explain: 'Batch-photograph the cards, get a clean CSV before you leave. No more typing 40 cards on Monday.',
      },
      {
        q: 'Which of these is a vision use case from the playbook?',
        options: [
          'Generating a product mock-up',
          'Uploading a competitor flyer to pull their offer and pricing into a battlecard',
          'Creating a Veo video',
          'Designing a logo',
        ],
        correct: 1,
        explain: 'Vision reads what exists: flyers, price lists, forms, dashboards. Generation (Module 8) creates new visuals.',
      },
      {
        q: 'How many of the three models can read uploaded images?',
        options: ['Only ChatGPT', 'Only Gemini', 'ChatGPT and Gemini', 'All three'],
        correct: 3,
        explain: 'All three models have vision — even Claude, which cannot generate images, can read them.',
      },
    ],
    prompts: [
      {
        id: 'p-business-card',
        title: 'Business-Card / Badge Capture',
        rarity: 'rare',
        text: 'Read the attached business card photo. Return exactly:\nName | Title | Company | Phone | Email | City\nIf any field is unclear, write "unclear" rather than guessing.',
      },
    ],
    missions: [],
  },

  {
    id: 10,
    slug: 'reverse-engineering',
    title: 'Reverse Engineering With AI',
    emoji: '🔍',
    tagline: 'Take what already works. Extract the pattern. Reproduce it.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'The core move',
        body: [
          { type: 'p', text: "'Reverse engineering' here means: take something that already works — a great email, a winning proposal, a competitor's pitch, a top-performing ad — and have AI break down **why** it works so you can reproduce the pattern." },
          { type: 'p', text: '**The core move:** give the model a strong example and ask it to extract the underlying structure, then apply that structure to your situation.' },
          { type: 'prompt', promptId: 'p-reverse-email' },
        ],
      },
      {
        id: 'l2',
        title: 'Five sales applications',
        body: [
          { type: 'list', items: [
            '**Winning content** — feed in your best-performing emails/proposals; extract the pattern; standardise it across the team.',
            "**Competitor teardown** — paste a competitor's landing page or pitch; ask for their positioning, target buyer, value props and gaps you can attack.",
            '**Top ads** — share a screenshot of an ad you admire; extract the formula (hook, promise, proof, CTA) and rebuild it for your offer.',
            '**Objection patterns** — paste 10 real objections; ask the model to cluster them into root causes and design responses for each.',
            '**Successful call transcripts** — have it identify the exact moments that moved the deal forward, and script them for repeatability.',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'Turn every pattern into an asset',
        body: [
          { type: 'callout', title: '💎 TURN IT INTO AN ASSET', text: 'Every reverse-engineered pattern is a template. Save the best ones as Skills / Custom GPTs so the whole team writes from proven structures instead of a blank page.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is the core move of reverse engineering with AI?',
        options: [
          'Copy a competitor email word for word',
          'Give the model a strong example, extract the underlying structure, then apply it to your situation',
          'Ask the AI to write 100 variants',
          'Decompile the competitor\'s website code',
        ],
        correct: 1,
        explain: 'Example in → structure out → structure applied to your product and buyer.',
      },
      {
        q: 'What should you do with 10 real objections you keep hearing?',
        options: [
          'Ignore the repeated ones',
          'Have the model cluster them into root causes and design responses for each',
          'Forward them to marketing',
          'Answer each with a discount',
        ],
        correct: 1,
        explain: 'Clustering into root causes turns scattered objections into a systematic response playbook.',
      },
      {
        q: 'What do you ask AI to find in a successful call transcript?',
        options: [
          'Grammar mistakes',
          'The total talk time',
          'The exact moments that moved the deal forward — scripted for repeatability',
          'The customer\'s accent',
        ],
        correct: 2,
        explain: 'Identify the moments that moved the deal, then script them so any rep can repeat them.',
      },
      {
        q: 'What is the ad-analysis formula mentioned in the playbook?',
        options: [
          'Hook, promise, proof, CTA',
          'Price, product, place, promotion',
          'Attention, interest, desire',
          'Before, after, bridge',
        ],
        correct: 0,
        explain: 'Extract the hook, promise, proof and CTA from an ad you admire — then rebuild it for your offer.',
      },
      {
        q: 'What should happen to your best reverse-engineered patterns?',
        options: [
          'Keep them secret from teammates',
          'Save them as Skills / Custom GPTs so the whole team writes from proven structures',
          'Print and laminate them',
          'Use each one only once',
        ],
        correct: 1,
        explain: 'Every extracted pattern is a template — package it so the team never starts from a blank page.',
      },
    ],
    prompts: [
      {
        id: 'p-reverse-email',
        title: 'Reverse-Engineer a Winning Email',
        rarity: 'epic',
        text: 'Here is an email that got a great response (pasted below).\n1) Break down WHY it works: structure, hooks, tone, psychology, CTA.\n2) Turn it into a reusable template with placeholders.\n3) Write a new version for MY product [PRODUCT] and buyer [PERSONA].',
      },
    ],
    missions: [],
  },

  {
    id: 11,
    slug: 'lead-engine',
    title: 'The AI Lead Engine (End to End)',
    emoji: '🎯',
    tagline: 'From defining who to target to a booked meeting — AI at every step.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'The 6-stage AI lead engine',
        body: [
          { type: 'p', text: 'Module 5 covered the scraping mechanics. This is the **full lead-gen engine** — from defining who to target to landing a booked meeting.' },
          {
            type: 'table',
            headers: ['Stage', 'What AI does', 'Tool / feature'],
            rows: [
              ['1. Define ICP', 'Sharpen your ideal-customer profile from past wins', 'Any chat + your deal history'],
              ['2. Source', 'Scrape lists from Maps, search, directories', 'Claude/ChatGPT + Apify'],
              ['3. Enrich', 'Find emails, titles, company info', 'Apify + web search'],
              ['4. Qualify & score', 'Rank each lead against ICP with reasons', 'C-A-R-E prompt (Module 3)'],
              ['5. Personalise', 'Draft tailored first-touch per lead', 'Sales Cockpit Project'],
              ['6. Sequence & track', 'Build multi-touch follow-ups; log to CRM', 'Connectors + scheduled Tasks'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'Define your ICP with AI',
        body: [
          { type: 'p', text: 'Your ideal-customer profile should come from evidence, not opinion. Feed the model your wins:' },
          { type: 'prompt', promptId: 'p-icp-sharpener' },
        ],
      },
      {
        id: 'l3',
        title: 'Personalisation at scale — the part that converts',
        body: [
          { type: 'p', text: '**Scraped lists are cheap; relevance is what books meetings.** Have the model write a genuinely personalised opener for each lead using a specific detail — their location, recent news, a review they got, their service line.' },
          { type: 'prompt', promptId: 'p-personal-opener' },
        ],
      },
      {
        id: 'l4',
        title: 'Quality control & autopilot',
        body: [
          { type: 'callout', title: '✅ QUALITY CONTROL', text: "AI-personalised does not mean send-and-forget. Skim every draft before it goes out, remove anything that reads as generic or 'obviously AI', and make sure your outreach follows consent and opt-out rules. One human glance keeps your sender reputation and brand safe." },
          { type: 'p', text: '**Putting it on autopilot:** once the engine works, schedule it — a weekly scrape of a fresh segment, auto-enrichment and scoring, a draft folder of personalised outreach waiting for your review every Monday. You approve and send; the machine did the sourcing.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is stage 1 of the AI lead engine?',
        options: ['Scrape a list', 'Define your ICP', 'Send cold emails', 'Connect the CRM'],
        correct: 1,
        explain: 'Everything downstream depends on a sharp ideal-customer profile — sharpened from your past wins.',
      },
      {
        q: 'What input does the ICP-sharpening prompt use?',
        options: [
          'Industry reports',
          'Your last 10 closed-won deals',
          'Your competitor\'s customer list',
          'A gut-feel brainstorm',
        ],
        correct: 1,
        explain: 'Feed it your last 10 closed-won deals and let it find the common patterns: industry, size, buyer title, trigger, deal size.',
      },
      {
        q: 'According to the playbook, what actually books meetings?',
        options: [
          'Bigger scraped lists',
          'Sending at 9 a.m. sharp',
          'Relevance — a genuinely personalised opener per lead',
          'Longer emails',
        ],
        correct: 2,
        explain: 'Scraped lists are cheap; relevance converts. One specific detail per lead is the difference.',
      },
      {
        q: 'What must happen before AI-drafted outreach goes out?',
        options: [
          'Nothing — send immediately',
          "A human skims every draft, removes anything generic or 'obviously AI', and checks consent/opt-out rules",
          'Legal reviews each email individually',
          'The prospect approves it',
        ],
        correct: 1,
        explain: 'One human glance keeps your sender reputation and brand safe. AI-personalised ≠ send-and-forget.',
      },
      {
        q: 'What does the autopilot version of the engine deliver every Monday?',
        options: [
          'Auto-sent emails to every lead',
          'A draft folder of personalised outreach waiting for your review',
          'A printed report',
          'New pricing recommendations',
        ],
        correct: 1,
        explain: 'The machine sources, enriches, scores and drafts; you approve and send.',
      },
    ],
    prompts: [
      {
        id: 'p-icp-sharpener',
        title: 'Sharpen the ICP',
        rarity: 'epic',
        text: 'Here are my last 10 closed-won deals (pasted). Find the common patterns — industry, size, title of buyer, trigger to buy, deal size. Write a tight 4-line Ideal Customer Profile I can target against.',
      },
      {
        id: 'p-personal-opener',
        title: 'Personalised Opener Per Lead',
        rarity: 'epic',
        text: 'For each lead in this list, write a one-line personalised opener that references something specific about THEM (their city, a service they offer, a recent review). Then attach our standard 80-word pitch. Output: a table with Name | Opener | Full email.',
      },
    ],
    missions: [],
  },

  {
    id: 12,
    slug: 'model-picker',
    title: 'Which Model, When — & Saving Cost',
    emoji: '🧠',
    tagline: 'The page to pin above your desk.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'The use-case → model quick picker',
        body: [
          { type: 'p', text: 'Using the right model for each job is most of the optimisation. The wrong model wastes money on premium reasoning for a simple task — or gives a weak answer because you used a light model for something hard.' },
          {
            type: 'table',
            headers: ["When you're doing this…", 'Reach for', 'Why'],
            rows: [
              ['Drafting emails, quick rewrites, brainstorming', 'Any (fastest/cheapest tier)', "Simple tasks don't need a premium model"],
              ['Long proposals, contracts, careful writing', 'Claude', 'Best long-form coherence, tone and reasoning'],
              ['Anything inside Gmail / Docs / Sheets / Slides', 'Gemini', 'Native Workspace integration, sees your files live'],
              ['Image generation for posts & creatives', 'ChatGPT or Gemini', 'Only these two generate images'],
              ['Short marketing video', 'Gemini (Veo)', 'Only Gemini generates video'],
              ['Deep account / market research', 'Gemini Deep Research or ChatGPT', 'Strong multi-source synthesis; Gemini adds NotebookLM'],
              ['Grounded research on YOUR documents', 'Gemini + NotebookLM', 'Answers only from your sources, with citations'],
              ['Connectors, skills, scraping automation', 'Claude', 'Deepest connector/skill ecosystem; careful with data'],
              ["'Do the whole task for me' agent work", 'ChatGPT (Agent/Codex) or Claude Cowork', 'Both run multi-step tasks autonomously'],
              ['Huge document / whole codebase analysis', 'Gemini or Claude', 'Up to ~1M-token context windows'],
              ['Voice call prep / dictation on the go', 'ChatGPT or Gemini Live', 'Best real-time voice modes'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'How to save cost without losing quality',
        body: [
          { type: 'list', items: [
            "**Match the model tier to the task** — use the fast/cheap tier (or free) for drafting, rewrites and quick questions; save the premium 'thinking' model for analysis, strategy and important documents.",
            '**Lean on what you already pay for** — if the group uses Google Workspace, Gemini is largely included — use it as the default for Workspace-based work before buying extra seats.',
            '**One premium seat per specialism** — one strong Claude seat for writing/automation, one ChatGPT seat for image/agent work, Gemini via Workspace — rather than every rep on every top tier.',
            "**Batch heavy jobs** — run scraping, enrichment and deep research in scheduled batches rather than ad-hoc all day.",
            '**Use scheduled Tasks** — let briefings and research run automatically overnight/off-peak.',
            "**Don't over-scrape** — expose only the 1–2 Apify Actors you need.",
          ] },
          { type: 'callout', title: '📌 RULE OF THUMB', text: 'Cheap model for volume, premium model for value. If the output goes to a customer or drives a decision, use the best model. If it\'s a throwaway draft you\'ll edit anyway, use the fast one.' },
        ],
      },
      {
        id: 'l3',
        title: 'The three models — final summary',
        body: [
          { type: 'list', items: [
            '**ChatGPT — the versatile all-rounder:** everyday drafting and rewrites, image generation, Custom GPTs to package team workflows, Tasks to schedule them, Agent/Codex for autonomous multi-step jobs.',
            '**Claude — the writer, reasoner and automator:** long high-quality proposals and contracts, careful analysis of long documents (RFPs, reports, transcripts), Connectors + Skills + Cowork for hands-off workflows. The model to trust when accuracy of reasoning and tone matter most.',
            '**Gemini — the Google-native powerhouse:** anything in Gmail/Docs/Sheets/Slides/Drive/Meet, Deep Research + NotebookLM for grounded cited research, image (Nano Banana) and video (Veo), Gems and Scheduled Actions across your Google tools.',
          ] },
        ],
      },
    ],
    quiz: [
      {
        q: 'Long proposals, contracts and careful writing — which model?',
        options: ['ChatGPT', 'Claude', 'Gemini', 'Whichever is cheapest'],
        correct: 1,
        explain: 'Claude has the best long-form coherence, tone and reasoning.',
      },
      {
        q: 'Work living inside Gmail, Docs, Sheets or Slides — which model?',
        options: ['ChatGPT', 'Claude', 'Gemini', 'None can access Workspace'],
        correct: 2,
        explain: 'Gemini is natively integrated into Google Workspace and sees your files live.',
      },
      {
        q: 'What is the cost rule of thumb?',
        options: [
          'Always use the premium model',
          'Always use the free tier',
          'Cheap model for volume, premium model for value',
          'Rotate models weekly',
        ],
        correct: 2,
        explain: 'Customer-facing or decision-driving output → best model. Throwaway drafts you\'ll edit anyway → fast/cheap one.',
      },
      {
        q: 'What is the recommended team seat setup for saving cost?',
        options: [
          'Every rep on every top tier',
          'One premium seat per specialism — Claude for writing/automation, ChatGPT for image/agent work, Gemini via Workspace',
          'Share one login across the desk',
          'Free tiers only, forever',
        ],
        correct: 1,
        explain: 'One premium seat per specialism beats paying for every model on every plan for every rep.',
      },
      {
        q: "For 'do the whole task for me' agent work, reach for…",
        options: [
          'ChatGPT (Agent/Codex) or Claude Cowork',
          'NotebookLM',
          'Gemini Live',
          'Any free tier',
        ],
        correct: 0,
        explain: 'Both ChatGPT\'s Agent/Codex and Claude\'s Cowork run multi-step tasks autonomously.',
      },
    ],
    prompts: [],
    missions: [],
  },

  {
    id: 13,
    slug: 'sales-deck',
    title: 'Building a Sales Deck With AI',
    emoji: '📊',
    tagline: 'From blank slides to client-ready pitch — often in one prompt.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'Three ways to get a deck',
        body: [
          { type: 'list', items: [
            '**Claude (with the slides/pptx skill or a Slides connector)** — describe the deck and Claude builds a real .pptx you can download and export to PowerPoint. Best for structured, well-written decks.',
            '**ChatGPT / Codex** — generate the deck content and structure, or use Codex to build the file programmatically for repeatable branded decks.',
            '**Gemini in Slides** — if you work in Google Slides, generate a deck inline in Workspace, then polish.',
          ] },
        ],
      },
      {
        id: 'l2',
        title: 'The workflow',
        body: [
          { type: 'list', ordered: true, items: [
            '**Feed context first:** do this inside your Sales Cockpit Project so the deck uses your real pitch, price list and voice.',
            '**Give the master prompt** (in your Vault) with the specific deal/audience filled in.',
            '**Review the outline** the model proposes before it builds — adjust the story flow.',
            '**Generate the .pptx**, download it, and refine visuals/branding.',
            '**Save the winning structure** as a Skill / Custom GPT so the next deck takes 5 minutes.',
          ] },
          { type: 'callout', title: '💡 PRO TIP — ALWAYS APPROVE THE OUTLINE FIRST', text: 'Making the model show the outline before building saves rework. Fix the story arc in 30 seconds of text, then let it build the full file. A deck with the wrong narrative is useless no matter how pretty.' },
        ],
      },
      {
        id: 'l3',
        title: 'The master prompt & helpful connectors',
        body: [
          { type: 'prompt', promptId: 'p-deck-master' },
          { type: 'list', items: [
            'A **Slides/PowerPoint connector or skill** exports directly to an editable deck.',
            'A **Drive/SharePoint connector** lets the model reuse your best past decks as a starting template.',
            'A **CRM connector** pulls live deal data straight into the pricing and next-step slides.',
          ] },
        ],
      },
    ],
    quiz: [
      {
        q: 'Why should you approve the outline before the model builds the deck?',
        options: [
          'It makes the file smaller',
          'Fixing the story arc in 30 seconds of text saves rework — a deck with the wrong narrative is useless no matter how pretty',
          'The model requires it',
          'It reduces token cost only',
        ],
        correct: 1,
        explain: 'Story first, pixels second. Fix the arc while it is still text.',
      },
      {
        q: 'What is the per-slide text rule in the master prompt?',
        options: [
          'As much detail as possible',
          'One idea per slide, max ~25 words, with speaker notes underneath',
          'No text — images only',
          'Exactly 100 words per slide',
        ],
        correct: 1,
        explain: 'One idea per slide, ~25 words max, and what to say goes in the speaker notes.',
      },
      {
        q: 'What should slides lead with?',
        options: [
          'Our company history',
          'THEIR outcome, not our features',
          'The full price list',
          'Team photos',
        ],
        correct: 1,
        explain: 'Lead with the client\'s outcome. Features support the story; they are not the story.',
      },
      {
        q: 'Which option builds a real downloadable .pptx file?',
        options: [
          'Claude with the slides/pptx skill',
          'NotebookLM',
          'Gemini Live',
          'The vision feature',
        ],
        correct: 0,
        explain: 'Claude\'s slides/pptx skill produces an actual .pptx you download and refine. Codex can also build files programmatically.',
      },
      {
        q: 'After a winning deck, what should you do with its structure?',
        options: [
          'Delete it and start fresh next time',
          'Save it as a Skill / Custom GPT so the next deck takes 5 minutes',
          'Email it to the client',
          'Print it for the archive',
        ],
        correct: 1,
        explain: 'Winning structures become reusable tools — that is the build-once, use-forever pattern.',
      },
    ],
    prompts: [
      {
        id: 'p-deck-master',
        title: 'Sales Deck — Master Prompt',
        rarity: 'legendary',
        text: 'Act as a senior sales presentation designer. Build a client-ready PowerPoint (.pptx) to pitch [PRODUCT/SOLUTION] to [CLIENT / AUDIENCE].\nDEAL CONTEXT:\n- Client: [name, industry, size]\n- Their key problem: [pain point]\n- What they care about: [priorities]\n- Our offer & differentiators: [use the price list + one-pager in this project]\n- Deal size / ask: [₹ amount and the specific next step]\nDECK STRUCTURE (10–12 slides):\n1. Title slide — client name + a benefit-led headline\n2. The challenge they face (their words, their world)\n3. The cost of doing nothing / status quo\n4. Our solution — one clear idea\n5. How it works (3 simple steps)\n6. Proof — results, case study, numbers\n7. Why us vs alternatives (factual, no bashing)\n8. Pricing / packages (from our price list)\n9. Implementation & timeline\n10. The ask + clear next step\n11. Appendix (optional): FAQs / detail\nRULES:\n- One idea per slide, max ~25 words of text per slide, speaker notes underneath with what to say.\n- Lead with THEIR outcome, not our features.\n- Use our brand tone; ₹ for pricing; Indian English.\n- Give the deck a clean, professional, modern look.\nFirst show me the slide-by-slide outline and headline for each slide. After I approve, generate the .pptx file for download.',
      },
    ],
    missions: [],
  },

  {
    id: 14,
    slug: 'ai-for-hr',
    title: 'Bonus Level: AI for Daily HR',
    emoji: '🤝',
    tagline: 'The same tools, pointed at hiring, onboarding and people work.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Everyday HR jobs AI handles well',
        body: [
          { type: 'p', text: 'Sales teams touch HR work constantly — hiring reps, onboarding, reviews, leave, policy questions. This module doubles as a template you can hand to the HR team.' },
          {
            type: 'table',
            headers: ['HR task', 'How AI helps', 'Best tool'],
            rows: [
              ['Job descriptions', 'Draft a role-specific JD from a few bullet points', 'Any chat / Gem'],
              ['Screening CVs', 'Summarise & rank candidates against the JD (vision reads PDFs)', 'Claude / ChatGPT'],
              ['Interview questions', 'Generate role-based questions + a scoring rubric', 'Gemini Gem'],
              ['Onboarding docs', 'Turn policies into a friendly new-hire guide', 'Claude + docx skill'],
              ['Policy Q&A', 'A NotebookLM notebook of HR policies answers staff questions with citations', 'NotebookLM + Gemini'],
              ['Feedback & reviews', "Rephrase blunt feedback into constructive, specific notes", "Any (a 'Feedback Coach' Gem)"],
              ['Meeting notes', 'Auto-summarise 1:1s and interviews into action items', 'Gemini in Meet / call recorder'],
              ['Offer & policy emails', 'Draft clear, warm HR comms fast', 'Any chat'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'Worked example: hiring a sales rep end to end',
        body: [
          { type: 'list', ordered: true, items: [
            '**Draft the JD:** "Write a JD for a field sales executive at Malpani Group — 2–4 yrs experience, [territory], [product]. Include responsibilities, requirements and a warm \'why join us\' section."',
            '**Screen applicants:** upload the CVs (PDF) and ask, "Rank these 15 candidates against the JD; give each a fit score and one-line reason; flag any gaps to probe in interview."',
            '**Prep interviews:** "Generate 10 interview questions for the shortlisted candidate based on their CV and this JD, plus what a strong answer looks like."',
            '**Compare candidates:** "Here are my notes on 3 candidates — compare them on fit, and recommend one with reasoning."',
            '**Onboard the hire:** "Turn our onboarding policy doc into a friendly 1-week onboarding plan for a new sales rep, day by day."',
            '**Answer their questions:** point new hires at an HR-policy NotebookLM so they self-serve on leave, expenses and process — with citations.',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'Wellbeing & fairness guardrail',
        body: [
          { type: 'callout', title: '⚖️ WELLBEING & FAIRNESS', text: "Keep a human in the loop for every hiring and people decision. Use AI to draft and organise, never to make the final call on a person. Don't paste sensitive personal data into tools that aren't approved for it, and remember AI can carry bias — review its ranking, don't rubber-stamp it." },
          { type: 'p', text: '**The productivity picture:** JD to onboarding for one hire used to span days of scattered effort. With this flow, the writing and organising collapse to under an hour of focused review — the human judgement stays exactly where it belongs.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is the best tool for answering staff policy questions with citations?',
        options: [
          'A spreadsheet',
          'A NotebookLM notebook loaded with HR policies',
          'Veo',
          'A cold-email prompt',
        ],
        correct: 1,
        explain: 'NotebookLM answers only from the policy docs you load — with citations — so staff can self-serve accurately.',
      },
      {
        q: 'Who makes the final call on hiring and people decisions?',
        options: [
          'The AI, after enough data',
          'A human — always; AI drafts and organises, never decides on a person',
          'The candidate',
          'Whoever is available',
        ],
        correct: 1,
        explain: 'Human in the loop for every people decision. AI drafts and organises; it never makes the final call.',
      },
      {
        q: 'Which capability lets AI screen a stack of CV PDFs?',
        options: ['Voice', 'Vision (reading PDFs) + ranking against the JD', 'Veo', 'Scheduled Actions'],
        correct: 1,
        explain: 'Vision reads the PDFs; the model then ranks candidates against the JD with fit scores and reasons.',
      },
      {
        q: 'Why must you review an AI ranking of candidates instead of rubber-stamping it?',
        options: [
          'It is usually slow',
          'AI can carry bias',
          'Rankings are random',
          'HR law forbids reading them',
        ],
        correct: 1,
        explain: 'AI can carry bias — review its ranking, don\'t rubber-stamp it.',
      },
      {
        q: 'How long does JD-to-onboarding take with the AI flow, versus days of scattered effort?',
        options: [
          'Under an hour of focused review',
          'Exactly one day',
          'A full week',
          'Ten minutes with no review',
        ],
        correct: 0,
        explain: 'The writing and organising collapse to under an hour of focused review — human judgement stays where it belongs.',
      },
    ],
    prompts: [],
    missions: [],
  },

  {
    id: 15,
    slug: 'first-week',
    title: 'FINAL BOSS: Your First Week',
    emoji: '👑',
    tagline: "Don't do everything at once. Do this, in this order.",
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'The rollout plan',
        body: [
          { type: 'p', text: "Thirty-five features you'll never touch is worse than one workflow that runs every day. Here's the order that builds momentum:" },
          {
            type: 'table',
            headers: ['Day', 'Do this', 'Payoff'],
            rows: [
              ['Day 1', 'Set custom instructions on all three models (Module 1)', 'Every future chat starts smarter'],
              ['Day 2', "Build your 'Sales Cockpit' Project with deck + price list + best emails (Module 2)", 'Consistent, context-aware output'],
              ['Day 3', 'Save the 10 weekly sales prompts into that Project (Module 3)', 'One-click daily selling tasks'],
              ['Day 4', 'Connect your CRM, email and calendar (Module 4)', 'Morning briefings & inbox triage'],
              ['Day 5', 'Run one Deep Research account brief (Module 7)', '2 hours of research in 15 mins'],
              ['Week 2', 'Set up Apify and run one lead-scrape workflow (Modules 5 & 11)', 'A repeatable top-of-funnel engine'],
              ['Week 3', 'Turn your most-repeated prompt into a Skill / Custom GPT (Module 6)', 'Team-wide leverage'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'The mindset that gets you to 10×',
        body: [
          { type: 'list', items: [
            '**Context is everything.** The more the model knows about your world (via Projects, memory, connectors), the less you type and the better it gets.',
            "**Never accept the first draft.** Iterate. 'Tighter, more direct, add urgency' beats a fresh prompt every time.",
            '**Automate the boring, sell the human.** Let AI scrape, research, draft and format. Spend the hours it frees on relationships and closing.',
            '**Always keep a human check.** Verify numbers, respect data rules, and read anything before it reaches a customer.',
            '**Right model, right job.** Cheap for volume, premium for value (Module 12).',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'One thing to do right now',
        body: [
          { type: 'callout', title: '🏁 ONE THING TO DO RIGHT NOW', text: 'Close this app and build your Sales Cockpit Project (Module 2). Everything else in this playbook gets easier once you have it. The best time to start compounding is your next chat.' },
          { type: 'p', text: 'Beat this final boss and claim your crown. Then go sell. 👑' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is the Day 1 action in the rollout plan?',
        options: [
          'Set up Apify',
          'Set custom instructions on all three models',
          'Build a Custom GPT',
          'Buy every premium plan',
        ],
        correct: 1,
        explain: 'Day 1: custom instructions on all three models — every future chat starts smarter.',
      },
      {
        q: 'What is scheduled for Week 2?',
        options: [
          'Turn a prompt into a Skill',
          'Set up Apify and run one lead-scrape workflow',
          'Connect the CRM',
          'Run a Deep Research brief',
        ],
        correct: 1,
        explain: 'Week 2: Apify + one lead-scrape workflow — a repeatable top-of-funnel engine.',
      },
      {
        q: "Complete the mindset rule: 'Automate the boring, ____.'",
        options: [
          'automate the rest',
          'sell the human',
          'skip the meetings',
          'buy more credits',
        ],
        correct: 1,
        explain: 'Automate the boring, sell the human. AI does the grunt work; you do relationships and closing.',
      },
      {
        q: 'Why does more context (Projects, memory, connectors) matter?',
        options: [
          'It makes chats look longer',
          'The less you type and the better the output gets',
          'It is required by the terms of service',
          'It only matters for images',
        ],
        correct: 1,
        explain: 'Context is everything: the more the model knows about your world, the less you type and the better it gets.',
      },
      {
        q: 'What is THE one thing the playbook says to do right now?',
        options: [
          'Build your Sales Cockpit Project',
          'Buy an Apify subscription',
          'Generate a product video',
          'Write 100 cold emails',
        ],
        correct: 0,
        explain: 'Build the Sales Cockpit. Everything else gets easier once you have it. Start compounding in your next chat.',
      },
    ],
    prompts: [],
    missions: [],
  },
];
