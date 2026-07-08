// Modules 0–7 — built from "The AI Sales Productivity Playbook" (Malpani Group, v1.0)
// Block types used in lesson bodies: p, list, table, callout, prompt

export const modulesA = [
  {
    id: 0,
    slug: 'why-this-playbook',
    title: 'Why This Playbook Exists',
    emoji: '🚀',
    tagline: 'Stop using AI as a search box. Start using it as a teammate.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'The 10× idea in one line',
        body: [
          { type: 'p', text: 'AI has stopped being a novelty and become a productivity multiplier. A salesperson who uses ChatGPT, Claude and Gemini well does the same work in a fraction of the time — and spends the time saved on the only thing that actually closes deals: **talking to people**.' },
          { type: 'callout', title: 'THE 10× IDEA', text: 'Stop using AI as a search box. Start using it as a teammate that already knows your accounts, your pitch and your CRM — and can run repetitive work while you sell.' },
          { type: 'p', text: 'The problem: most people use one model for everything, type one-line prompts, and never touch the features that create real leverage — **projects, connectors, skills and automation**. This game fixes that.' },
        ],
      },
      {
        id: 'l2',
        title: 'Meet your three party members',
        body: [
          { type: 'p', text: 'You will use all three models. They are **not interchangeable** — each has a sweet spot, and using the right one saves both time and money.' },
          {
            type: 'table',
            headers: ['Model', 'Made by', 'Best at', 'Where it lives'],
            rows: [
              ['ChatGPT', 'OpenAI', "All-round work, image generation, voice, agentic 'do-it-for-me' tasks, custom GPTs", 'chatgpt.com, apps, MS integrations'],
              ['Claude', 'Anthropic', 'Long documents, careful reasoning, writing quality, connectors & skills, automation', 'claude.ai, desktop app, Cowork'],
              ['Gemini', 'Google', 'Google Workspace (Gmail/Docs/Sheets), huge-context analysis, NotebookLM research, video (Veo)', 'gemini.google.com, inside Workspace'],
            ],
          },
          { type: 'p', text: 'A full model-selection matrix — including which one to use to save cost — is waiting in **Module 12**. It will become your most-used page.' },
        ],
      },
      {
        id: 'l3',
        title: 'How to play this game',
        body: [
          { type: 'p', text: 'Clear modules in order — each one is a section of the playbook. Read the lesson cards, then beat the **Boss Quiz** to unlock the next module.' },
          { type: 'list', items: [
            '**Earn XP** for every lesson, quiz answer and real-world mission you complete.',
            '**Collect Prompt Cards** — every copy-paste prompt in the playbook is a collectible in your Vault, with one-click copy.',
            '**Complete Missions** — real actions at your actual desk (set up your Project, connect your CRM). That is where the 10× actually happens.',
            '**Climb the leaderboard** — your XP is ranked against the whole team.',
          ] },
          { type: 'callout', title: 'PRO TIP', text: "Modules 1–3 teach the tools. Modules 4–13 are build-once, use-forever workflows. Pick the one that matches your biggest time sink and set it up this week." },
        ],
      },
    ],
    quiz: [
      {
        q: 'According to the playbook, what is the 10× idea in one line?',
        options: [
          'Use AI as a faster search engine',
          'Use AI as a teammate that knows your accounts, pitch and CRM, and runs repetitive work while you sell',
          'Replace the sales team with AI agents',
          'Always use the most expensive AI model available',
        ],
        correct: 1,
        explain: 'AI as a search box is the trap. The leverage comes from treating it as a teammate loaded with your context that works while you sell.',
      },
      {
        q: 'What do most people get wrong with AI, according to the playbook?',
        options: [
          'They use too many models at once',
          'They spend too much money on subscriptions',
          'They use one model for everything, type one-line prompts, and never touch projects, connectors, skills or automation',
          'They only use AI for images',
        ],
        correct: 2,
        explain: 'The real leverage lives in the features most people never open: projects, connectors, skills and automation.',
      },
      {
        q: 'Which model is described as best for long documents, careful reasoning and writing quality?',
        options: ['ChatGPT', 'Gemini', 'Claude', 'All three equally'],
        correct: 2,
        explain: 'Claude is the writer and reasoner of the trio — long documents, careful reasoning, writing quality, connectors and skills.',
      },
      {
        q: 'Which model lives inside Google Workspace and can generate video via Veo?',
        options: ['ChatGPT', 'Gemini', 'Claude', 'None of them'],
        correct: 1,
        explain: 'Gemini is the Google-native model — Gmail, Docs, Sheets, NotebookLM, and video generation with Veo.',
      },
      {
        q: 'What should you spend the time that AI saves you on?',
        options: [
          'Writing more prompts',
          'Talking to people — the only thing that actually closes deals',
          'Testing every new AI feature',
          'Building more dashboards',
        ],
        correct: 1,
        explain: 'The whole point of the 10×: automate the boring work, spend the recovered hours on relationships and closing.',
      },
    ],
    prompts: [],
    missions: [],
  },

  {
    id: 1,
    slug: 'the-basics',
    title: 'The Basics: Six Core Features',
    emoji: '🎮',
    tagline: 'Six features cover 80% of daily sales work. Learn these first.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'Chat is a conversation, not a slot machine',
        body: [
          { type: 'p', text: 'The core surface: you type, it responds, you refine. The skill is **not the first prompt — it is the follow-up**.' },
          { type: 'p', text: 'Treat it like briefing a junior rep: give context, react to the draft, ask for a tighter version.' },
          { type: 'callout', title: 'GOLDEN RULE', text: 'Never accept the first output as final. Iterate: "tighter", "more direct", "add urgency".' },
        ],
      },
      {
        id: 'l2',
        title: 'Memory & custom instructions — set up once, win forever',
        body: [
          { type: 'p', text: 'All three models can remember who you are, so you stop re-introducing yourself every session.' },
          { type: 'list', items: [
            '**Custom instructions** — a permanent note about your role, product, tone and audience that applies to every chat. Set it in Settings → Personalization (ChatGPT), Settings → Profile (Claude), or Saved info (Gemini).',
            '**Memory** — the model automatically remembers facts from past chats (your territory, key accounts, preferences). You can view, edit and delete these at any time.',
          ] },
          { type: 'prompt', promptId: 'p-custom-instructions' },
        ],
      },
      {
        id: 'l3',
        title: 'Files, web search & deep research',
        body: [
          { type: 'p', text: '**File upload:** drag in a PDF, spreadsheet, deck or image and ask questions. Summarise an RFP, extract a competitor pricing table, pull action items from a call transcript, or turn a messy contact list into a clean CSV.' },
          { type: 'p', text: '**Gemini and Claude** handle very long documents especially well — up to ~1 million tokens, roughly a few thousand pages.' },
          { type: 'p', text: '**Web search** answers a fact in seconds. **Deep research** spends several minutes reading dozens of sources and returns a structured, cited report — ideal for account research, market maps and competitive analysis.' },
        ],
      },
      {
        id: 'l4',
        title: 'Voice, images & the feature reality check',
        body: [
          { type: 'p', text: '**Voice:** talk instead of type — hands-free call prep in the car, practising a pitch out loud, or dictating notes after a meeting.' },
          { type: 'p', text: '**Image & video:** ChatGPT and Gemini generate images from text. Gemini (via Veo) also generates short videos. Claude generates neither — but is the strongest at the words around them.' },
          { type: 'list', items: [
            '**ChatGPT:** chat, memory, files, search, deep research, voice, image generation, Tasks (scheduling), custom GPTs, Projects, connectors, Agent/Codex.',
            '**Claude:** chat, memory, files, search, research, Projects, Artifacts, Connectors (MCP), Skills, Cowork. No image/video generation.',
            '**Gemini:** chat, memory, files, search, Deep Research, voice (Live), image + video (Veo), Gems, Scheduled Actions, deep Google Workspace + NotebookLM integration.',
          ] },
          { type: 'callout', title: 'REALITY CHECK', text: 'Exact limits depend on your plan (Free vs Plus/Pro vs Team/Enterprise). Check the in-app pricing page — these change often.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Where do you set custom instructions in Gemini?',
        options: ['Settings → Personalization', 'Saved info', 'Settings → Profile', 'The @ menu'],
        correct: 1,
        explain: 'Gemini calls it "Saved info". ChatGPT: Settings → Personalization. Claude: Settings → Profile.',
      },
      {
        q: 'What is the difference between custom instructions and memory?',
        options: [
          'They are the same thing with different names',
          'Custom instructions are a permanent note you write once; memory is facts the model automatically remembers from past chats',
          'Memory only works with files; custom instructions only work with voice',
          'Custom instructions cost extra; memory is free',
        ],
        correct: 1,
        explain: 'You write custom instructions once yourself; memory builds up automatically from your conversations — and you can view, edit or delete it.',
      },
      {
        q: 'Which two models handle very long documents (~1 million tokens) especially well?',
        options: ['ChatGPT and Claude', 'ChatGPT and Gemini', 'Gemini and Claude', 'None can go past 100 pages'],
        correct: 2,
        explain: 'Gemini and Claude both offer ~1M-token context — roughly a few thousand pages.',
      },
      {
        q: 'What is the real skill in using chat, according to the playbook?',
        options: [
          'Writing a perfect first prompt',
          'Using as few words as possible',
          'The follow-up — reacting to the draft and refining, like briefing a junior rep',
          'Always starting a brand-new chat for each request',
        ],
        correct: 2,
        explain: 'The skill is not the first prompt — it is the follow-up. Never accept the first output as final.',
      },
      {
        q: 'Which model does NOT generate images or video?',
        options: ['ChatGPT', 'Gemini', 'Claude', 'They all generate both'],
        correct: 2,
        explain: 'Claude generates neither images nor video — but it is the strongest at the words around them: briefs, captions, ad copy.',
      },
    ],
    prompts: [
      {
        id: 'p-custom-instructions',
        title: 'Custom Instructions Template',
        rarity: 'rare',
        text: 'I am a sales executive at Malpani Group, a diversified Indian business group. I sell [YOUR PRODUCT/SERVICE] to [YOUR BUYER — e.g. real-estate buyers / distributors / B2B procurement heads]. Keep answers concise and practical. Use Indian English, ₹ for currency, and a warm-but-professional tone. When you draft outreach, lead with value in the first line and keep it under 120 words unless I say otherwise. Always end drafts with one clear call to action.',
      },
    ],
    missions: [
      {
        id: 'm-custom-instructions',
        title: 'Set your custom instructions',
        desc: 'Copy the Custom Instructions template from your Vault, edit the brackets, and paste it into all three models: ChatGPT (Settings → Personalization), Claude (Settings → Profile) and Gemini (Saved info). Every future chat starts smarter.',
        xp: 40,
      },
    ],
  },

  {
    id: 2,
    slug: 'projects-sales-cockpit',
    title: 'Projects: Your Sales Cockpit',
    emoji: '🛩️',
    tagline: 'The single biggest upgrade most reps miss.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Why normal chats slow you down',
        body: [
          { type: 'p', text: 'A normal chat **forgets your context** the moment you start a new one — so you re-paste your pitch, your account list and your rules every single time. A Project fixes that.' },
          { type: 'p', text: 'A Project is a **permanent workspace** that bundles three things so they load automatically into every chat inside it:' },
          { type: 'list', items: [
            '**Files (knowledge)** — reference documents you upload once: your pitch deck, price list, product FAQ, ICP definition, objection-handling notes, case studies.',
            '**Instructions** — rules that apply only inside this Project: tone, format, do\'s and don\'ts, who the buyer is.',
            '**Grouped chats** — every conversation for that account, campaign or deal lives in one place.',
          ] },
          { type: 'p', text: 'Both ChatGPT and Claude have Projects — the concept is identical, the menus differ slightly. In Gemini the equivalent is a **Gem** (Module 6).' },
        ],
      },
      {
        id: 'l2',
        title: 'Normal chat vs Project — when to use which',
        body: [
          { type: 'list', items: [
            "**Normal chat:** one-off questions — 'reword this line', 'what's a synonym for synergy', 'summarise this email'.",
            "**Project:** anything ongoing — a specific key account, a live campaign, a product line, or your personal 'sales cockpit' that knows your pitch and writes in your voice every time.",
          ] },
          { type: 'callout', title: 'NAME IT LIKE YOU MEAN IT', text: "Name Projects specifically — 'Key Account – Sharma Developers' or 'Campaign – Q3 Distributor Outreach', not 'Sales stuff'." },
        ],
      },
      {
        id: 'l3',
        title: 'Set one up in 5 minutes',
        body: [
          { type: 'list', ordered: true, items: [
            'In the left sidebar click **New Project** and give it a specific name.',
            'Upload your reference files: price list, one-pager, deck, ICP, past winning emails, objection notes.',
            'Write Project instructions — the template below is ready-made.',
            'Start chatting. Every chat inside now knows your context. Move existing chats in by right-clicking → **Move to project**.',
          ] },
          { type: 'prompt', promptId: 'p-project-instructions' },
        ],
      },
      {
        id: 'l4',
        title: 'Why it makes you faster',
        body: [
          { type: 'list', items: [
            '**No re-briefing** — context loads automatically, so every prompt starts 3 steps ahead.',
            '**Consistency** — every email, proposal and summary sounds like you (or like Malpani Group), not like generic AI.',
            '**Fewer errors** — the model quotes your real price list instead of guessing.',
            '**Team leverage** — on Business/Team/Enterprise plans, Projects can be shared so the whole desk uses the same battle-tested setup.',
          ] },
          { type: 'callout', title: 'DO THIS FIRST', text: "Build ONE Project called 'My Sales Cockpit'. Load your deck, price list and three best past emails. Add the instructions template. From now on, do all your selling work inside it. This alone will change how fast you move." },
        ],
      },
    ],
    quiz: [
      {
        q: 'What three things does a Project bundle together?',
        options: [
          'Emails, calls and meetings',
          'Files (knowledge), instructions, and grouped chats',
          'Prompts, images and videos',
          'Leads, deals and invoices',
        ],
        correct: 1,
        explain: 'Files + instructions + grouped chats — all loading automatically into every chat inside the Project.',
      },
      {
        q: "Which of these belongs in a normal chat rather than a Project?",
        options: [
          'Managing a specific key account',
          'A live outreach campaign',
          "A one-off question like 'reword this line'",
          'Your personal sales cockpit',
        ],
        correct: 2,
        explain: 'One-off questions go in normal chat. Anything ongoing — accounts, campaigns, your cockpit — belongs in a Project.',
      },
      {
        q: 'Per the Project instructions template, what should the model do if a number is not in your uploaded files?',
        options: [
          'Estimate it from industry averages',
          'Say so — never invent pricing',
          'Search the web for a similar price',
          'Use last year\'s price list',
        ],
        correct: 1,
        explain: '"If a number isn\'t in those files, say so — never invent pricing." Fewer errors is one of the big Project wins.',
      },
      {
        q: 'What is the Gemini equivalent of a Project?',
        options: ['A Notebook', 'A Gem', 'A Task', 'A Space'],
        correct: 1,
        explain: 'In Gemini the equivalent concept is a Gem — covered fully in Module 6.',
      },
      {
        q: 'Which is the better Project name, according to the playbook?',
        options: [
          "'Sales stuff'",
          "'My chats'",
          "'Key Account – Sharma Developers'",
          "'Project 1'",
        ],
        correct: 2,
        explain: 'Name it specifically — a named account or campaign — never something vague like "Sales stuff".',
      },
    ],
    prompts: [
      {
        id: 'p-project-instructions',
        title: 'Project Instructions Template',
        rarity: 'epic',
        text: "ROLE: You are my sales co-pilot at Malpani Group.\nCONTEXT: I sell [PRODUCT] to [BUYER PERSONA]. Our edge is [1–2 DIFFERENTIATORS]. Typical deal size ₹[X]; sales cycle [Y] weeks.\nKNOWLEDGE: Use the uploaded price list, deck and objection notes as the source of truth. If a number isn't in those files, say so — never invent pricing.\nVOICE: Warm, concise, Indian English, ₹ for money. Value first, one clear CTA, under 120 words for outreach.\nOUTPUT RULES: When I ask for outreach give me 2 variants (direct + consultative). When I ask for analysis, give me a short table + a 3-line \"so what\". Flag anything that needs my judgement.",
      },
    ],
    missions: [
      {
        id: 'm-sales-cockpit',
        title: "Build your 'My Sales Cockpit' Project",
        desc: 'Create a Project called "My Sales Cockpit" in ChatGPT or Claude. Upload your deck, price list and three best past emails. Paste in the Project Instructions template from your Vault. Do all your selling work inside it from now on.',
        xp: 40,
      },
    ],
  },

  {
    id: 3,
    slug: 'prompt-frameworks',
    title: 'Prompt Frameworks',
    emoji: '🥋',
    tagline: 'Master R-T-F and C-R-E-A-T-E and you will outperform 90% of users.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'R-T-F — the everyday workhorse',
        body: [
          { type: 'p', text: 'A prompt is just an instruction — but the **structure** of that instruction decides the quality of what comes back.' },
          { type: 'p', text: '**R-T-F = Role, Task, Format.** Tell the model who to be, what to do, and how to lay it out.' },
          { type: 'prompt', promptId: 'p-rtf-outreach' },
        ],
      },
      {
        id: 'l2',
        title: 'C-R-E-A-T-E — for high-stakes output',
        body: [
          { type: 'p', text: '**Context, Role, Example, Action, Tone, Expectations.** Use it when quality matters — a proposal intro, a big-account email, a pitch narrative.' },
          { type: 'prompt', promptId: 'p-create-email' },
        ],
      },
      {
        id: 'l3',
        title: 'B-A-B and C-A-R-E',
        body: [
          { type: 'p', text: '**B-A-B = Before, After, Bridge.** Perfect for value propositions and pitch messaging: describe the buyer\'s current pain (Before), the better world (After), and how you get them there (Bridge).' },
          { type: 'prompt', promptId: 'p-bab-value-prop' },
          { type: 'p', text: '**C-A-R-E = Context, Ask, Rules, Examples.** Great for structured, repeatable tasks like scoring or qualifying, where you want strict logic.' },
          { type: 'prompt', promptId: 'p-care-qualification' },
        ],
      },
      {
        id: 'l4',
        title: 'Chain-of-thought & the universal quality rules',
        body: [
          { type: 'p', text: 'For analysis and planning, simply add: **"Think step by step and show your reasoning before the final answer."** This forces the model to work through logic rather than jumping to a guess — noticeably better for deal strategy, pricing scenarios and territory planning.' },
          {
            type: 'table',
            headers: ['✅ Do this', '❌ Instead of this'],
            rows: [
              ['Give role + context + audience', '"Write a sales email"'],
              ['Specify length, format, tone', 'Leaving format open and re-editing 5 times'],
              ['Ask for 2–3 variants to choose from', 'Accepting the first draft'],
              ['Paste a real example you like', 'Hoping it guesses your style'],
              ['Say what NOT to do (no jargon, no fluff)', 'Only saying what to do'],
              ["Iterate: 'tighten', 'more direct', 'add urgency'", 'Starting a brand-new prompt each time'],
            ],
          },
        ],
      },
      {
        id: 'l5',
        title: 'The 10 weekly sales prompts',
        body: [
          { type: 'p', text: 'These ten cover most of a selling week. Drop them into your **Sales Cockpit Project** so they inherit your context automatically. Each one is a collectible card in your Vault — clear this module\'s boss to unlock them all.' },
          { type: 'list', ordered: true, items: [
            '**Cold email** — 3 variants, hooked on a pain point',
            '**Follow-up sequence** — 4 touches over 12 days',
            '**Objection handling** — reframe on value, not price',
            '**Call prep** — 8 smart questions + 3 likely objections',
            '**Discovery notes → next step**',
            '**Proposal draft** — one page, from your price list',
            '**LinkedIn message** — under 300 characters',
            '**Pricing scenarios** — 3 options with margin impact',
            '**Competitor rebuttal** — a factual battlecard',
            '**Weekly recap** — wins, risks, asks for your manager',
          ] },
        ],
      },
    ],
    quiz: [
      {
        q: 'What does R-T-F stand for?',
        options: ['Read, Think, Finish', 'Role, Task, Format', 'Research, Target, Follow-up', 'Role, Tone, Facts'],
        correct: 1,
        explain: 'Role (who to be), Task (what to do), Format (how to lay it out) — the everyday workhorse.',
      },
      {
        q: 'Which framework should you reach for on a high-stakes, big-account email?',
        options: ['R-T-F', 'B-A-B', 'C-R-E-A-T-E', 'A one-line prompt'],
        correct: 2,
        explain: 'C-R-E-A-T-E (Context, Role, Example, Action, Tone, Expectations) is built for output where quality matters most.',
      },
      {
        q: 'B-A-B is perfect for…',
        options: [
          'Lead scoring',
          'Value propositions and pitch messaging',
          'Meeting scheduling',
          'CRM data cleanup',
        ],
        correct: 1,
        explain: 'Before (pain), After (better world), Bridge (how you get them there) — the natural shape of a value proposition.',
      },
      {
        q: 'When qualifying a list of 20 leads with strict scoring logic, which framework fits best?',
        options: ['C-A-R-E', 'B-A-B', 'R-T-F', 'Chain-of-thought only'],
        correct: 0,
        explain: 'C-A-R-E (Context, Ask, Rules, Examples) shines for structured, repeatable tasks like scoring and qualifying.',
      },
      {
        q: 'What simple phrase upgrades analysis and planning prompts?',
        options: [
          '"Be creative"',
          '"Answer as fast as possible"',
          '"Think step by step and show your reasoning before the final answer"',
          '"Use bullet points"',
        ],
        correct: 2,
        explain: 'Chain-of-thought forces the model to work through the logic instead of jumping to a guess.',
      },
    ],
    prompts: [
      {
        id: 'p-rtf-outreach',
        title: 'R-T-F: Quick Outreach',
        rarity: 'common',
        text: 'ROLE: Act as an experienced B2B sales rep.\nTASK: Write a first-touch email to a procurement head at a mid-size manufacturer who downloaded our product brochure.\nFORMAT: Subject line + 90-word email + one-line CTA. Two versions.',
      },
      {
        id: 'p-create-email',
        title: 'C-R-E-A-T-E: High-Value Account Email',
        rarity: 'epic',
        text: 'CONTEXT: We\'re chasing a ₹40L annual contract with a regional retail chain. They\'ve gone quiet after a good first call.\nROLE: You are a senior key-account manager.\nEXAMPLE: Match the tone of this line I like — "Quick one, [Name] — didn\'t want this to slip through the cracks."\nACTION: Write a re-engagement email that adds a new reason to talk (not just "following up").\nTONE: Warm, confident, zero desperation.\nEXPECTATIONS: Under 110 words, one CTA offering two specific time slots.',
      },
      {
        id: 'p-bab-value-prop',
        title: 'B-A-B: Value Proposition',
        rarity: 'rare',
        text: 'Using the Before–After–Bridge structure, write a 3-sentence pitch for [PRODUCT].\nBEFORE: the buyer\'s current frustration is [PAIN].\nAFTER: the outcome they want is [RESULT].\nBRIDGE: our product delivers it via [MECHANISM].',
      },
      {
        id: 'p-care-qualification',
        title: 'C-A-R-E: Lead Qualification',
        rarity: 'rare',
        text: 'CONTEXT: Here is a list of 20 inbound leads (pasted below).\nASK: Score each lead 1–5 on fit with our ICP and give a one-line reason.\nRULES: ICP = Indian SMEs, 50–500 staff, in manufacturing or retail, decision-maker title. Score 5 only if all four match.\nEXAMPLES: A 500-person auto-parts maker with a "Head of Procurement" contact = 5. A 10-person consultancy = 1.',
      },
      { id: 'p-w1-cold-email', title: 'Weekly #1: Cold Email', rarity: 'common', text: 'Write 3 cold-email variants to [persona] at [company type]. Hook on [pain]. Under 90 words, one CTA.' },
      { id: 'p-w2-follow-up', title: 'Weekly #2: Follow-Up Sequence', rarity: 'common', text: 'Create a 4-touch follow-up sequence (email, email, LinkedIn, call script) spaced over 12 days for a lead who went cold after a demo.' },
      { id: 'p-w3-objection', title: 'Weekly #3: Objection Handling', rarity: 'common', text: "The prospect said 'it's too expensive.' Give me 3 ways to respond that reframe on value, not price." },
      { id: 'p-w4-call-prep', title: 'Weekly #4: Call Prep', rarity: 'common', text: 'I have a discovery call with [company]. Give me 8 smart questions and 3 likely objections with responses.' },
      { id: 'p-w5-discovery', title: 'Weekly #5: Discovery Notes → Next Step', rarity: 'common', text: 'Here are my raw call notes. Summarise pain points, budget signals, and recommend the next best action.' },
      { id: 'p-w6-proposal', title: 'Weekly #6: Proposal Draft', rarity: 'common', text: 'Draft a one-page proposal for [deal] using our price list. Sections: problem, solution, scope, pricing, next step.' },
      { id: 'p-w7-linkedin', title: 'Weekly #7: LinkedIn Message', rarity: 'common', text: 'Write a LinkedIn connection note + first message for [persona]. Personalised, non-salesy, under 300 characters.' },
      { id: 'p-w8-pricing', title: 'Weekly #8: Pricing Scenarios', rarity: 'common', text: 'Model 3 pricing/discount options for this deal and the margin impact of each. Show as a table.' },
      { id: 'p-w9-battlecard', title: 'Weekly #9: Competitor Rebuttal', rarity: 'common', text: 'Prospect is comparing us to [competitor]. Give me a factual, non-disparaging battlecard: our strengths, their gaps.' },
      { id: 'p-w10-recap', title: 'Weekly #10: Weekly Recap', rarity: 'common', text: 'Turn these pipeline notes into a crisp weekly update for my manager: wins, risks, asks. Bullet points.' },
    ],
    missions: [
      {
        id: 'm-save-prompts',
        title: 'Load the 10 weekly prompts into your Cockpit',
        desc: 'Copy the 10 weekly sales prompts from your Vault into your Sales Cockpit Project (as a pinned note or first chat). One-click daily selling tasks from here on.',
        xp: 40,
      },
    ],
  },

  {
    id: 4,
    slug: 'connectors',
    title: 'Connectors: Plug Into Your Real Tools',
    emoji: '🔌',
    tagline: 'Without connectors you live in copy-paste. With them, you just ask.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'What a connector is',
        body: [
          { type: 'p', text: 'A connector links the AI to a tool where your work already lives — your **CRM, email, calendar, Drive, call recorder** — so it can read and act on real data instead of whatever you paste in.' },
          { type: 'p', text: 'Under the hood most run on an open standard called **MCP (Model Context Protocol)** — but you don\'t need to know that to use them.' },
          { type: 'callout', title: 'THE ONE-SENTENCE VERSION', text: 'Without connectors you live in copy-paste. With connectors you just ask — "pull the last three emails with this account and draft a follow-up" — and it happens.' },
        ],
      },
      {
        id: 'l2',
        title: 'How to connect (under 60 seconds)',
        body: [
          { type: 'list', items: [
            '**Claude:** Settings → Connectors (or the + button in any chat). Find your app, click Connect, sign in with your existing login. Done.',
            '**ChatGPT:** Settings → Connectors / Apps; authorise Google Drive, SharePoint, etc. Some actions run through Agent mode.',
            '**Gemini:** connectors are largely built-in for Google — type **@** in the chat to pull from Gmail, Drive, Calendar, Docs directly.',
          ] },
          { type: 'p', text: 'Once connected, the model auto-detects when a tool is relevant. You usually don\'t even have to name it — "check my calendar" just works.' },
        ],
      },
      {
        id: 'l3',
        title: 'Connectors worth setting up for sales',
        body: [
          {
            type: 'table',
            headers: ['Connector', 'What it unlocks for you'],
            rows: [
              ['CRM (HubSpot, Salesforce, Zoho)', 'Pull deal stages, contact history and pipeline; log notes; brief yourself before a call without opening the CRM'],
              ['Email (Gmail / Outlook)', 'Find threads, draft replies in context, summarise long chains, catch un-replied leads'],
              ['Calendar', "Prep for today's meetings, find slots, schedule follow-ups"],
              ['Google Drive / SharePoint', 'Search proposals, decks and price lists; reuse winning content'],
              ['Call recorder (Fathom, Fireflies, Fellow)', 'Turn call transcripts into summaries, action items and CRM updates automatically'],
              ['Apify / Firecrawl', 'Live web scraping — Google Maps leads, competitor pricing, LinkedIn data (Module 5)'],
            ],
          },
        ],
      },
      {
        id: 'l4',
        title: 'Five connector plays + the security rule',
        body: [
          { type: 'p', text: 'Five plays for the sales desk — each is a collectible card in your Vault:' },
          { type: 'list', ordered: true, items: [
            '**Morning briefing** — who am I meeting, deal status, one talking point each',
            '**Inbox triage** — un-replied leads 3+ days old, drafted follow-ups',
            '**Deal nudge** — open deals with no activity in 10 days',
            '**Post-call update** — transcript → summary → CRM note',
            '**Proposal reuse** — find the best similar proposal in Drive and adapt it',
          ] },
          { type: 'callout', title: '🔒 SECURITY NOTE — READ BEFORE CONNECTING', text: 'Only connect tools you\'re authorised to use. Connectors give the model access to real data, so be careful with sensitive files. When handling confidential data, use a locked-down mode that restricts web access if available. Never paste passwords, OTPs or card numbers into any chat.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What open standard do most connectors run on under the hood?',
        options: ['API-X', 'MCP (Model Context Protocol)', 'HTTP-S', 'GPT-Connect'],
        correct: 1,
        explain: 'MCP — the Model Context Protocol. You don\'t need to know it to use connectors, but that\'s what powers them.',
      },
      {
        q: 'How do you pull from Gmail, Drive or Calendar directly in Gemini?',
        options: [
          'Install a browser extension',
          'Type @ in the chat',
          'Export everything to PDF first',
          'Only via the paid API',
        ],
        correct: 1,
        explain: 'Gemini\'s Google connectors are built in — just type @ in the chat to reference Gmail, Drive, Calendar or Docs.',
      },
      {
        q: 'Which connector play catches leads you forgot to reply to?',
        options: ['Morning briefing', 'Deal nudge', 'Inbox triage', 'Proposal reuse'],
        correct: 2,
        explain: 'Inbox triage: "Scan my inbox for leads I haven\'t replied to in 3+ days and draft a follow-up for each."',
      },
      {
        q: 'What must you NEVER paste into any chat?',
        options: [
          'Meeting notes',
          'Passwords, OTPs or card numbers',
          'Call transcripts',
          'Product brochures',
        ],
        correct: 1,
        explain: 'The hard security rule: never paste passwords, OTPs or card numbers into any AI chat.',
      },
      {
        q: 'What does a call-recorder connector (Fathom, Fireflies, Fellow) unlock?',
        options: [
          'Automatic discount approvals',
          'Call transcripts turned into summaries, action items and CRM updates automatically',
          'Live translation during calls',
          'Recording customer screens',
        ],
        correct: 1,
        explain: 'Transcript in → summary, action items and a ready-to-log CRM note out. A huge post-call time saver.',
      },
    ],
    prompts: [
      { id: 'p-morning-briefing', title: 'Play #1: Morning Briefing', rarity: 'rare', text: "Using my CRM and calendar, tell me who I'm meeting today, the deal status, and one talking point for each." },
      { id: 'p-inbox-triage', title: 'Play #2: Inbox Triage', rarity: 'rare', text: "Scan my inbox for leads I haven't replied to in 3+ days and draft a follow-up for each." },
      { id: 'p-deal-nudge', title: 'Play #3: Deal Nudge', rarity: 'rare', text: 'Which open deals in my pipeline have had no activity in 10 days? Draft a re-engagement message for each.' },
      { id: 'p-post-call', title: 'Play #4: Post-Call Update', rarity: 'rare', text: 'Summarise this call transcript, extract next steps, and write the note to log in the CRM.' },
      { id: 'p-proposal-reuse', title: 'Play #5: Proposal Reuse', rarity: 'rare', text: 'Find our best proposal for a similar deal in Drive and adapt it for [new prospect].' },
    ],
    missions: [
      {
        id: 'm-connect-tools',
        title: 'Connect your CRM, email and calendar',
        desc: 'Open Settings → Connectors in Claude or ChatGPT (or use @ in Gemini) and connect the tools you actually use: CRM, email, calendar. Then run the Morning Briefing play from your Vault.',
        xp: 40,
      },
    ],
  },

  {
    id: 5,
    slug: 'lead-scraping',
    title: 'Automating Lead & Website Scraping',
    emoji: '🕷️',
    tagline: 'Where AI stops assisting and starts doing the grunt work.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'The building blocks',
        body: [
          { type: 'p', text: 'By connecting Claude (or ChatGPT/Codex) to a scraping service, you can generate lead lists, pull contact details, and monitor competitor sites **in plain English — no code, no manual copy-paste**.' },
          { type: 'list', items: [
            "**Apify** — a cloud platform with 5,000+ ready-made scrapers called 'Actors' — Google Maps, Google Search, LinkedIn, Instagram, e-commerce sites and more. It does the actual data extraction.",
            '**MCP connector** — the bridge that exposes those Actors to the AI as callable tools, so Claude can trigger a scrape and read the results back into chat.',
            '**Firecrawl** — a simpler alternative that turns any web page into clean text/Markdown — great for reading competitor pages and docs.',
          ] },
        ],
      },
      {
        id: 'l2',
        title: 'One-time setup (Claude + Apify)',
        body: [
          { type: 'list', ordered: true, items: [
            'Create a free Apify account at apify.com (free tier includes monthly credits to test).',
            'In Claude, add the Apify connector: Settings → Connectors → add the hosted server URL **mcp.apify.com** and authorise with OAuth (no token to copy).',
            'Pick 1–2 Actors that match your targets (e.g. Google Maps scraper, Google Search scraper). **Fewer Actors = cleaner, faster routing.**',
            'Test with a simple ask. Runs bill against your normal Apify credits.',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'Compliance first — non-negotiable',
        body: [
          { type: 'callout', title: '⚠️ COMPLIANCE FIRST', text: "Scraping is powerful but you are responsible for using it lawfully. Respect each site's Terms of Service and robots.txt, follow data-protection rules (including India's DPDP Act) for any personal data you collect, and only use contact data for legitimate B2B outreach with an opt-out. When in doubt, check with your manager or legal before running a campaign." },
        ],
      },
      {
        id: 'l4',
        title: 'The scraping-to-pipeline workflow',
        body: [
          { type: 'list', ordered: true, items: [
            '**Define** the target segment (industry, city, company size).',
            '**Scrape** a raw list via Apify (names, sites, phones, ratings).',
            '**Enrich** — find emails and decision-maker titles.',
            '**Score** each lead against your ICP (the C-A-R-E prompt from Module 3).',
            '**Draft** personalised first-touch outreach for the top tier.',
            '**Export** the clean CSV and push into your CRM.',
          ] },
          { type: 'callout', title: '⏱️ TIME REALITY', text: 'Building a qualified, enriched, 25-lead list with drafted outreach used to be a half-day of manual work. This workflow does it in 15–20 minutes. Run it weekly and you have a permanent top-of-funnel engine.' },
          { type: 'p', text: 'The same Apify and Firecrawl MCP connectors work with ChatGPT and OpenAI\'s Codex — the protocol is model-agnostic. Claude tends to be preferred for careful data cleaning and reasoning over results; ChatGPT/Codex for building the automation around it.' },
        ],
      },
    ],
    quiz: [
      {
        q: "What are Apify's 5,000+ ready-made scrapers called?",
        options: ['Bots', 'Actors', 'Crawlers', 'Agents'],
        correct: 1,
        explain: 'Apify calls them Actors — Google Maps, Google Search, LinkedIn, Instagram, e-commerce and more.',
      },
      {
        q: 'Why should you expose only 1–2 Apify Actors instead of many?',
        options: [
          'Apify only allows two',
          'Fewer Actors = cleaner, faster routing (and lower cost)',
          'More Actors crash Claude',
          'It makes no difference',
        ],
        correct: 1,
        explain: 'Fewer Actors means cleaner, faster tool routing — and large jobs cost more credits and add noise.',
      },
      {
        q: 'Which Indian data-protection law does the playbook say you must follow when collecting personal data?',
        options: ['GDPR', 'The IT Act only', "India's DPDP Act", 'CCPA'],
        correct: 2,
        explain: "India's Digital Personal Data Protection (DPDP) Act — plus each site's Terms of Service and robots.txt.",
      },
      {
        q: 'How long does the scraping-to-pipeline workflow take for a qualified, enriched 25-lead list with drafted outreach?',
        options: ['A half-day', '2–3 hours', '15–20 minutes', '5 days'],
        correct: 2,
        explain: 'What used to be a half-day of manual work becomes 15–20 minutes. Run it weekly for a permanent top-of-funnel engine.',
      },
      {
        q: 'What does Firecrawl do?',
        options: [
          'Generates images of websites',
          'Turns any web page into clean text/Markdown',
          'Sends cold emails automatically',
          'Blocks competitor scraping',
        ],
        correct: 1,
        explain: 'Firecrawl is the simpler alternative: any web page → clean text/Markdown, great for reading competitor pages and docs.',
      },
    ],
    prompts: [
      {
        id: 'p-maps-leads',
        title: 'Local B2B Lead List (Google Maps)',
        rarity: 'epic',
        text: 'Use the Google Maps scraper to find 25 [BUSINESS TYPE — e.g. interior designers] in [CITY — e.g. Pune]. Return a table with: name, phone, website, address, rating and review count. Then flag the 8 that look like the best fit for [OUR PRODUCT] and tell me why.',
      },
      {
        id: 'p-enrichment',
        title: 'Contact Enrichment',
        rarity: 'epic',
        text: "Here is a list of 15 company names. For each, use web search + the Google Maps email extractor to find the official website, a general contact email and the likely decision-maker's title. Return as a CSV.",
      },
      {
        id: 'p-price-monitor',
        title: 'Competitor Price Monitoring',
        rarity: 'rare',
        text: "Use the website content crawler on these 5 competitor pricing pages. Extract each plan and price into one comparison table, and write a 3-line summary of where we're cheaper or more expensive.",
      },
    ],
    missions: [
      {
        id: 'm-first-scrape',
        title: 'Set up Apify and run one lead scrape',
        desc: 'Create a free apify.com account, add the mcp.apify.com connector to Claude, and run the Google Maps lead-list prompt from your Vault on one real target segment. Review the results against the compliance rules.',
        xp: 40,
      },
    ],
  },

  {
    id: 6,
    slug: 'skills-gpts-gems',
    title: 'Skills, Custom GPTs & Gems',
    emoji: '🧰',
    tagline: 'Turn a good prompt into a reusable tool the whole desk can press.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'What a Skill is — and why teams need them',
        body: [
          { type: 'p', text: 'A **Skill** is a saved, named workflow the AI can run on demand — a recipe card the model follows every time, instead of you re-explaining the steps. Skills are strongest in Claude; similar ideas exist as **Custom GPTs** in ChatGPT and **Gems** in Gemini.' },
          { type: 'callout', title: 'WHY IT MATTERS FOR A TEAM', text: "A prompt lives in one person's chat history. A Skill lives as a shared capability the whole desk can call. Your best rep's call-prep routine, or your manager's proposal-scoring logic, becomes a button everyone presses — consistent output, no tribal knowledge lost." },
        ],
      },
      {
        id: 'l2',
        title: 'How Skills work',
        body: [
          { type: 'list', items: [
            '**A Skill is a small folder** — with an instruction file (SKILL.md) that tells Claude what to do, plus optional templates or example files.',
            '**Auto-invoked** — official Skills trigger automatically when relevant (e.g. asking for a Word doc triggers the docx Skill that formats it professionally).',
            '**Installable** — you can add community or company-built Skills, or create your own. On Claude this needs Pro/Max/Team with code execution enabled.',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'Skills that help a sales team',
        body: [
          {
            type: 'table',
            headers: ['Skill', 'What it does'],
            rows: [
              ['Document / deck builder', 'Turns notes into a polished Word proposal or PowerPoint deck, correctly formatted'],
              ['Spreadsheet builder', 'Cleans a messy lead list or builds a pipeline tracker with formulas'],
              ['Call-prep skill', 'Given an account name, produces research + questions + likely objections in one shot'],
              ['Proposal scorer', 'Scores a draft proposal against a checklist and suggests fixes'],
              ['Lead-qualifier skill', 'Applies your ICP rules to a list and returns scored, sorted leads'],
              ['Daily briefing skill', 'Pulls CRM + calendar and writes your morning sales brief'],
              ['Sales-skills packs (e.g. Arrows)', 'Free installable packs: daily briefings, call prep, deal nudges, pipeline reviews'],
            ],
          },
        ],
      },
      {
        id: 'l4',
        title: 'Custom GPTs, Gems — and when to build one',
        body: [
          { type: 'list', items: [
            "**Custom GPT** — a packaged mini-assistant in ChatGPT with its own instructions and files — build a 'Malpani Objection Handler' GPT once and share the link with the team.",
            "**Gem** — Gemini's version — a personalised assistant configured for one role. Attach your files or a NotebookLM notebook so it always answers from your material.",
          ] },
          { type: 'callout', title: 'START SIMPLE', text: "You don't need to build Skills from scratch on day one. First, master Projects (Module 2). When you notice you're pasting the same multi-step instruction more than twice a week, that's your signal to turn it into a Custom GPT / Gem / Skill." },
        ],
      },
    ],
    quiz: [
      {
        q: 'What file inside a Skill folder tells Claude what to do?',
        options: ['README.txt', 'SKILL.md', 'config.json', 'instructions.docx'],
        correct: 1,
        explain: 'A Skill is a small folder with a SKILL.md instruction file, plus optional templates or example files.',
      },
      {
        q: 'What is the ChatGPT equivalent of a Claude Skill?',
        options: ['A Plugin', 'A Custom GPT', 'A Task', 'An Agent'],
        correct: 1,
        explain: 'Custom GPTs in ChatGPT and Gems in Gemini are the same core idea: packaged, reusable mini-assistants.',
      },
      {
        q: 'What is the signal that it\'s time to turn a prompt into a Skill / Custom GPT / Gem?',
        options: [
          'When your manager asks for one',
          "When you're pasting the same multi-step instruction more than twice a week",
          'On day one, before anything else',
          'When you run out of chat history',
        ],
        correct: 1,
        explain: 'Master Projects first. Repeating the same multi-step instruction 2+ times a week is the build signal.',
      },
      {
        q: 'How do official Skills get triggered in Claude?',
        options: [
          'You must type /skill every time',
          'Automatically, when relevant — e.g. asking for a Word doc triggers the docx Skill',
          'Only through the API',
          'By your administrator',
        ],
        correct: 1,
        explain: 'Official Skills auto-invoke when relevant to the request.',
      },
      {
        q: 'Why do Skills beat prompts for a sales team?',
        options: [
          'Skills are cheaper per token',
          'Prompts stop working after a week',
          'A prompt lives in one person\'s chat history; a Skill is a shared capability with consistent output — no tribal knowledge lost',
          'Skills work offline',
        ],
        correct: 2,
        explain: 'Your best rep\'s routine becomes a button everyone presses. That is team leverage.',
      },
    ],
    prompts: [],
    missions: [
      {
        id: 'm-build-skill',
        title: 'Turn your most-repeated prompt into a tool',
        desc: "Find the multi-step instruction you paste most often. Turn it into a Custom GPT (ChatGPT), a Gem (Gemini) or a Skill (Claude) and share it with one teammate.",
        xp: 40,
      },
    ],
  },

  {
    id: 7,
    slug: 'research-automation',
    title: 'Automating Research Workflows',
    emoji: '🔬',
    tagline: 'Account research goes from 2 hours to a coffee break.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'Deep Research across the three models',
        body: [
          { type: 'p', text: 'Account research, market maps and competitive analysis eat hours. **Deep Research** turns that into a coffee break: give a question, and the model reads dozens of sources over several minutes and returns a structured, cited report.' },
          {
            type: 'table',
            headers: ['Model', 'Feature', 'Best for'],
            rows: [
              ['ChatGPT', 'Deep Research', 'Broad multi-source synthesis with citations; good all-rounder'],
              ['Gemini', 'Deep Research / Deep Research Max', 'Long autonomous runs; can add your own files as sources; pairs with NotebookLM'],
              ['Claude', 'Research', 'Careful synthesis over long documents and connected data; strong reasoning'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'NotebookLM — the account-research secret weapon',
        body: [
          { type: 'p', text: '**NotebookLM** is a free Google tool that answers **only from sources you give it — with citations**. Upload an RFP, an annual report, call transcripts and a product doc, and it becomes a grounded expert on that account that won\'t hallucinate outside your material.' },
          { type: 'p', text: "It even generates an audio 'podcast' summary you can listen to on the commute." },
          { type: 'list', items: [
            "**Sales use** — load everything you have on a target account, then ask: 'What are their stated priorities this year?', 'Who are the decision-makers mentioned?', 'What objections should I expect?'",
            '**Combine with Gemini** — attach a NotebookLM notebook to a Gem so your assistant answers with both your internal knowledge and live web research.',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'The repeatable account-research workflow',
        body: [
          { type: 'list', ordered: true, items: [
            '**Trigger Deep Research:** "Produce a research brief on [company]: business model, recent news, likely pain points, key people, and how [our product] could help. Cite sources."',
            "**Ground it:** drop the company's own docs (annual report, website, any RFP) into NotebookLM for citable answers.",
            '**Ask for a one-page account plan:** priorities, stakeholders, entry angle, first-meeting agenda.',
            '**Generate tailored outreach** off the findings (inherits your Project voice).',
            '**Schedule it** — a recurring Task/Scheduled Action re-runs the brief weekly so you\'re always current.',
          ] },
          { type: 'prompt', promptId: 'p-account-research' },
        ],
      },
      {
        id: 'l4',
        title: 'Scheduled briefings & the compounding effect',
        body: [
          { type: 'p', text: 'All three models can run prompts on a schedule — **ChatGPT Tasks**, **Gemini Scheduled Actions**, **Claude Cowork scheduled tasks**. Set a 7 a.m. daily brief, a weekly competitor watch, or a Monday pipeline summary once, and it lands in your inbox automatically.' },
          { type: 'callout', title: '📈 COMPOUNDING EFFECT', text: 'Manual account research is ~2 hours per target. This workflow is ~15 minutes of your attention. Across a 30-account territory that is roughly 50 hours a quarter back in your calendar — spend it selling.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What makes NotebookLM different from normal AI chat?',
        options: [
          'It is faster',
          'It answers only from the sources you give it — with citations',
          'It generates better images',
          'It works without the internet',
        ],
        correct: 1,
        explain: 'NotebookLM is grounded: it won\'t hallucinate outside your material, and every answer carries citations.',
      },
      {
        q: 'What bonus output can NotebookLM generate from your sources?',
        options: [
          'A video presentation',
          "An audio 'podcast' summary you can listen to on the commute",
          'A PowerPoint deck',
          'A spreadsheet dashboard',
        ],
        correct: 1,
        explain: 'It can turn your source material into an audio podcast-style summary — perfect for the drive to a meeting.',
      },
      {
        q: 'What are scheduled prompts called in ChatGPT?',
        options: ['Routines', 'Tasks', 'Crons', 'Actions'],
        correct: 1,
        explain: 'ChatGPT Tasks, Gemini Scheduled Actions, Claude Cowork scheduled tasks — same idea, three names.',
      },
      {
        q: 'How much time does the AI research workflow need per account, versus ~2 hours manually?',
        options: ['~1 hour', '~45 minutes', '~15 minutes of your attention', 'Zero — fully automatic'],
        correct: 2,
        explain: '~15 minutes of your attention per target. Across a 30-account territory, that is ~50 hours a quarter recovered.',
      },
      {
        q: 'How do you combine NotebookLM with a Gemini Gem?',
        options: [
          'You can\'t — they are separate products',
          'Attach a NotebookLM notebook to the Gem so it answers from your internal knowledge plus live web research',
          'Export the notebook to PDF daily',
          'Email the notebook to Gemini',
        ],
        correct: 1,
        explain: 'Attaching a notebook to a Gem gives your assistant both grounded internal knowledge and live research.',
      },
    ],
    prompts: [
      {
        id: 'p-account-research',
        title: 'Master Account-Research Prompt',
        rarity: 'legendary',
        text: 'Act as a senior sales researcher. Produce a 1-page account brief on [COMPANY]. Sections:\n1) Snapshot (industry, size, HQ, revenue if public)\n2) Recent signals (news, funding, hiring, expansion) — cite sources\n3) Likely pain points our product [PRODUCT] can solve\n4) Key stakeholders & likely titles to target\n5) Recommended entry angle + a first-meeting agenda\nKeep it tight and skimmable. Flag anything uncertain.',
      },
    ],
    missions: [
      {
        id: 'm-research-brief',
        title: 'Run one Deep Research account brief',
        desc: 'Pick one real target account. Run the Master Account-Research prompt from your Vault in ChatGPT Deep Research, Gemini Deep Research or Claude Research. Save the brief into that account\'s Project.',
        xp: 40,
      },
    ],
  },
];
