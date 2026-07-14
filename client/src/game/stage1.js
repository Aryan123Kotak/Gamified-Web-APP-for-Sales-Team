// STAGE 1 — AI READY (Levels 0–6)
// Built from "Malpani Group — AI Complete Teaching Guide" v1.0
// Block types: p, list, table, callout, prompt
// Missions are submission-graded: each has a rubric with keyword-matched criteria.

export const stage1 = [
  {
    id: 0,
    stage: 'AI Ready',
    slug: 'getting-comfortable',
    title: 'Getting Comfortable with AI',
    emoji: '🌱',
    tagline: 'AI is a tool you learn to use — not a test you have to pass.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'AI is an assistant, not a robot takeover',
        body: [
          { type: 'p', text: 'Many people hear "artificial intelligence" and imagine complicated software, robots or job loss. Start simpler: **AI is a tool that can work with words, images and information**. Like a calculator or spreadsheet, it makes some tasks easier — but it does not know the organisation the way an experienced employee does.' },
          { type: 'p', text: 'Learning AI is closer to learning how to use a **helpful assistant** than learning computer programming. You describe a task, review the result, and decide whether a human must be involved. Confidence grows through small, safe steps — not technical vocabulary.' },
          { type: 'callout', title: 'REMEMBER', text: 'No employee is expected to understand everything immediately. Curiosity, safe practice and asking for help are signs of progress.' },
        ],
      },
      {
        id: 'l2',
        title: 'AI is not always the answer',
        body: [
          { type: 'p', text: 'This programme should **never** suggest that every task must use AI. A good learner may decide that a normal template, a Google search, a phone call, or advice from a senior is the better option. The goal is **good judgement and better work** — not AI for its own sake.' },
          { type: 'p', text: 'The central rule for every learner:' },
          { type: 'callout', title: 'THE CENTRAL RULE', text: 'AI can help you think, draft, organise and analyse. You remain responsible for what you use, send, approve or decide.' },
          { type: 'p', text: 'A helpful lesson rhythm to keep in mind: **Learn** the idea → **See** examples → **Try** it with safe sample data → **Decide** between AI, Google, a colleague or a senior → **Check** for mistakes, bias and privacy risks → **Reflect** on where human judgement is still needed.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Moderna trained everyone, not just tech teams',
        body: [
          { type: 'p', text: 'Moderna introduced generative AI across business functions with a goal of broad adoption. Its programme combined in-person and online training, AI learning companions, office hours and an internal forum. It even ran a **prompt contest** to find power users who became internal AI Champions.' },
          { type: 'p', text: 'The lesson: adoption is a **learning and change programme, not simply a software installation**.' },
          { type: 'list', items: [
            'Beginners need training, practice and local support.',
            'Internal champions can help colleagues without making them feel judged.',
            'Leadership participation signals that learning matters for everyone.',
          ] },
          { type: 'p', text: 'Fictional Malpani scenario: Ramesh has worked in administration for twenty years and worries AI training will expose what he does not know. The trainer explains that **his experience is the part AI lacks** — his job is to judge whether a draft fits the real situation.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which comparison best describes AI in this guide?',
        options: ['A robot that replaces employees', 'A tool that works with words, images and information — like a calculator or spreadsheet', 'A search engine that is always correct', 'A senior manager who makes decisions'],
        correct: 1,
        explain: 'AI is a tool that makes some tasks easier, but it does not know the organisation the way an experienced employee does.',
      },
      {
        q: 'According to the central rule, who is responsible for what you send, approve or decide?',
        options: ['The AI tool', 'The software vendor', 'You remain responsible', 'Nobody — it is automatic'],
        correct: 2,
        explain: 'AI can help you think, draft and organise, but you remain responsible for what you use, send, approve or decide.',
      },
      {
        q: 'Is it a good outcome to decide NOT to use AI for a task?',
        options: ['No — every task should use AI', 'Yes — a template, a Google search or asking a senior can be the better choice', 'Only if your manager forces you', 'Only for very large tasks'],
        correct: 1,
        explain: 'The goal is good judgement and better work. Choosing a non-AI option is a sign of good judgement, not failure.',
      },
      {
        q: 'What was the main lesson from Moderna\'s programme?',
        options: ['Buy the most expensive AI tool', 'Adoption is a learning and change programme, not just installing software', 'Only technical teams should learn AI', 'AI removes the need for training'],
        correct: 1,
        explain: 'Moderna combined training, champions, office hours and a forum — treating adoption as a people and change programme.',
      },
      {
        q: 'In the Ramesh scenario, why is his 20 years of experience valuable with AI?',
        options: ['It lets him code the AI', 'Experience is the part AI lacks — he judges whether a draft fits the real situation', 'It means he does not need to learn anything', 'It makes AI unnecessary'],
        correct: 1,
        explain: 'His experience is exactly what AI does not have; his judgement makes the AI output more useful, not less.',
      },
    ],
    prompts: [],
    missions: [
      {
        id: 'm0-first-try',
        title: 'Your first safe AI task',
        brief: 'Pick one small, low-risk task from your real work (e.g. tidying a rough note, drafting a checklist, or explaining a term). Try it with AI using only fictional or public information — never confidential data.',
        submitLabel: 'Describe the task you tried, what you asked AI to do, and one thing you would change or check in the result.',
        minWords: 40,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Names a specific, low-risk task', keywords: ['task', 'note', 'draft', 'checklist', 'email', 'summary', 'explain', 'rewrite', 'list', 'plan'], weight: 1 },
          { id: 'r2', label: 'Used only safe / fictional / public information', keywords: ['fictional', 'public', 'sample', 'safe', 'no confidential', 'not confidential', 'anonym', 'made up', 'dummy'], weight: 1 },
          { id: 'r3', label: 'Reflects on checking or changing the result', keywords: ['check', 'change', 'edit', 'verify', 'review', 'correct', 'improve', 'fix', 'wrong'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 1,
    stage: 'AI Ready',
    slug: 'what-ai-is',
    title: 'What AI Is and Is Not',
    emoji: '🧠',
    tagline: 'AI generates plausible output. Plausible is not the same as proven.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'Generating an answer is not knowing a fact',
        body: [
          { type: 'p', text: 'Generative AI creates a response by finding **patterns** in large amounts of information. It predicts useful words, images or structures based on your request and the context it receives. This can look like understanding — but the system can still invent details or miss the real meaning of a situation.' },
          { type: 'callout', title: 'REMEMBER', text: 'AI generates plausible output. "Plausible" means it sounds possible; it does not mean it is proven correct.' },
        ],
      },
      {
        id: 'l2',
        title: 'Where AI is strong — and where it is weak',
        body: [
          { type: 'p', text: 'AI is **strong** at producing a first draft, changing a format, summarising material and generating alternatives.' },
          { type: 'p', text: 'It is **weaker** when the answer depends on current facts, hidden company context, personal values, authority, or consequences it cannot see.' },
          { type: 'p', text: 'Think of AI as a **fast junior assistant**. A junior can produce useful work quickly, but a responsible employee gives clear instructions, checks the result and owns the decision. Speed without review just creates faster mistakes.' },
          {
            type: 'table',
            headers: ['Good use', 'What AI does'],
            rows: [
              ['Draft', 'Produces a first version of an email from approved facts'],
              ['Transform', 'Converts long meeting notes into decisions, owners and due dates'],
              ['Explain', 'Explains a technical term for a non-technical audience'],
              ['Brainstorm', 'Offers several ideas that you evaluate and improve'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Morgan Stanley kept the experts involved',
        body: [
          { type: 'p', text: 'Morgan Stanley built an internal assistant to help financial advisers find information and summarise research. They tested responses against expert expectations and used adviser feedback to improve prompts and retrieval.' },
          { type: 'p', text: 'Advisers **did not hand accountability to the model**. They used AI to reduce search and summarisation work while keeping responsibility for client conversations and final outputs.' },
          { type: 'p', text: 'Fictional Malpani scenario: A manager asks AI to write a monthly performance summary. The result is polished but says a target was achieved when the real report shows it was missed. AI produced a *likely* sentence from incomplete context — the manager must correct it and supply the right data.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'How does generative AI produce a response?',
        options: ['By looking up verified facts in a database', 'By finding patterns and predicting useful words or structures', 'By asking a human expert each time', 'By copying the correct answer'],
        correct: 1,
        explain: 'It predicts based on patterns and the context given — which can look like understanding but can still be wrong.',
      },
      {
        q: 'What does "plausible" output mean?',
        options: ['It is proven correct', 'It sounds possible but is not necessarily true', 'It came from an official source', 'It has been checked by an expert'],
        correct: 1,
        explain: 'Plausible means it sounds possible; it does not mean it is proven correct.',
      },
      {
        q: 'Which task is AI WEAKEST at?',
        options: ['Writing a first draft', 'Summarising long notes', 'Answering when the result depends on current facts and hidden company context', 'Suggesting alternative ideas'],
        correct: 2,
        explain: 'AI is weaker when the answer depends on current facts, hidden context, values, authority or unseen consequences.',
      },
      {
        q: 'The guide compares AI to a…',
        options: ['Senior manager', 'Fast junior assistant whose work you must check', 'Certified accountant', 'Search engine'],
        correct: 1,
        explain: 'Like a fast junior, AI can produce useful work quickly, but you give clear instructions, check the result and own the decision.',
      },
      {
        q: 'In the performance-summary scenario, what went wrong?',
        options: ['The AI refused to answer', 'AI wrote a polished but false claim from incomplete context', 'The manager used confidential data', 'The tool was offline'],
        correct: 1,
        explain: 'AI produced a plausible sentence that was actually false; the manager must correct it and provide the right data.',
      },
    ],
    prompts: [],
    missions: [
      {
        id: 'm1-strong-weak',
        title: 'Spot strong vs weak AI tasks',
        brief: 'From your own work, choose one task where AI is a strong fit and one where it is a weak or risky fit. Explain your reasoning using the ideas of drafting vs. current facts, hidden context, authority or consequences.',
        submitLabel: 'Describe both tasks and explain why one is a strong AI fit and the other is weak or risky.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Gives a strong-fit task (draft/summarise/transform/brainstorm)', keywords: ['draft', 'summar', 'transform', 'brainstorm', 'rewrite', 'organise', 'organize', 'explain', 'idea'], weight: 1 },
          { id: 'r2', label: 'Gives a weak/risky task and names why', keywords: ['current fact', 'context', 'authority', 'consequence', 'confidential', 'decision', 'approve', 'accurate', 'verify', 'risk'], weight: 1 },
          { id: 'r3', label: 'Shows the human keeps responsibility', keywords: ['check', 'review', 'responsib', 'own', 'confirm', 'approve', 'correct', 'edit'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 2,
    stage: 'AI Ready',
    slug: 'ai-vs-google-vs-human',
    title: 'AI vs Google vs Human',
    emoji: '🔀',
    tagline: 'The best tool depends on the question.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Choosing the right source of help',
        body: [
          { type: 'p', text: 'The best tool depends on the question:' },
          { type: 'list', items: [
            '**AI** — useful when you want help **producing or transforming** something (draft, rewrite, summarise, brainstorm).',
            '**Google / official websites** — useful when you need **current information and evidence** (a price, a rule, a notification).',
            '**Colleagues and seniors** — necessary when **experience, authority, empathy or accountability** matters (approving an exception, learning how a local process really works).',
          ] },
          { type: 'callout', title: 'REMEMBER', text: 'When the answer can change with time, money, policy or authority, verify it outside the AI conversation.' },
        ],
      },
      {
        id: 'l2',
        title: 'Many tasks use more than one source — in the right order',
        body: [
          { type: 'p', text: 'You may check an official rule, ask a senior how it applies inside the company, then use AI to draft a clear communication. **The order matters:** get reliable facts *before* asking AI to write from them.' },
          {
            type: 'table',
            headers: ['Situation', 'Best source'],
            rows: [
              ['Turn approved notes into a polite email', 'AI'],
              ["Check today's government notification or a product price", 'Google / official site'],
              ['Learn how a local process normally works', 'Colleague'],
              ['Approve an exception, discount or customer commitment', 'Senior'],
            ],
          },
          { type: 'p', text: 'Fictional Malpani scenario: A customer asks Neha for a special commercial commitment. AI can help her list clarification questions, but her **manager must approve** the commitment. After approval, AI may help draft the final message using the confirmed terms.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Air Canada was held responsible for its chatbot',
        body: [
          { type: 'p', text: 'A customer relied on an Air Canada chatbot that gave inaccurate information about claiming a bereavement fare. A Canadian tribunal held the airline **responsible** for information provided through its website and ordered compensation.' },
          { type: 'p', text: 'A confident chatbot answer is **not a substitute for an accountable source**. Current rules and financial conditions should be checked against official policy and, when necessary, confirmed by an authorised person.' },
          { type: 'list', items: [
            'The organisation remains responsible for automated information it gives customers.',
            'Customers should not be expected to guess which part of a website is trustworthy.',
            'High-impact answers need ownership, maintenance and escalation paths.',
          ] },
        ],
      },
    ],
    quiz: [
      {
        q: 'You need today\'s official government notification. Which source?',
        options: ['AI chat', 'Google / the official website', 'A brainstorming prompt', 'A colleague\'s memory'],
        correct: 1,
        explain: 'Current, source-based facts come from search or an official website — not from AI, which may be out of date.',
      },
      {
        q: 'Approving a customer discount is a job for…',
        options: ['AI', 'Google', 'A senior with authority', 'Whichever is fastest'],
        correct: 2,
        explain: 'Authority, accountability and exceptions require a human with the power to approve.',
      },
      {
        q: 'When a task needs both facts and drafting, what order is best?',
        options: ['Draft with AI first, then check facts', 'Get reliable facts first, then use AI to write from them', 'Do both at the same time', 'Skip the facts if the draft looks good'],
        correct: 1,
        explain: 'Get reliable facts before asking AI to write, so AI has less room to guess.',
      },
      {
        q: 'What is the key lesson from the Air Canada case?',
        options: ['Chatbots are illegal', 'The organisation is responsible for automated information it gives customers', 'Customers should never use websites', 'AI should never be used in service'],
        correct: 1,
        explain: 'The airline was held responsible; a confident chatbot answer is not a substitute for an accountable source.',
      },
      {
        q: 'When should you verify an answer OUTSIDE the AI conversation?',
        options: ['Never — AI is reliable', 'When the answer can change with time, money, policy or authority', 'Only on weekends', 'Only for image tasks'],
        correct: 1,
        explain: 'Time-, money-, policy- or authority-sensitive answers must be verified against a reliable, accountable source.',
      },
    ],
    prompts: [],
    missions: [
      {
        id: 'm2-source-choice',
        title: 'Route a real task to the right source',
        brief: 'Take a real workplace request you handle. Break it into parts and decide which part needs AI, which needs Google/an official site, and which needs a colleague or senior. Put them in a sensible order.',
        submitLabel: 'Describe the request and map each part to AI, Google/official source, or a human — and explain the order.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Assigns a drafting/transforming part to AI', keywords: ['ai', 'draft', 'rewrite', 'summar', 'brainstorm', 'organise', 'organize'], weight: 1 },
          { id: 'r2', label: 'Uses Google/official source for current facts', keywords: ['google', 'official', 'website', 'search', 'verify', 'notification', 'policy', 'price', 'rule'], weight: 1 },
          { id: 'r3', label: 'Routes authority/judgement to a human', keywords: ['senior', 'manager', 'colleague', 'approve', 'authority', 'human', 'expert'], weight: 1 },
          { id: 'r4', label: 'Explains a sensible order (facts before drafting)', keywords: ['order', 'first', 'before', 'then', 'after', 'next', 'sequence'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 3,
    stage: 'AI Ready',
    slug: 'safe-responsible-use',
    title: 'Safe, Responsible & Balanced Use',
    emoji: '🛡️',
    tagline: 'Green, Yellow, Red — and keep the human decisions human.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'The Green / Yellow / Red information rule',
        body: [
          { type: 'list', items: [
            '🟢 **Green** — public or fictional information. Safe to use freely.',
            '🟡 **Yellow** — internal or personal enough to need care, anonymisation or permission first.',
            '🔴 **Red** — passwords, bank details, personal employee data, confidential contracts, sensitive customer information, business secrets. **Red must never enter an unapproved tool.**',
          ] },
          { type: 'callout', title: 'REMEMBER', text: 'Use AI to support your thinking, not to replace your relationships, values, experience or personal judgement.' },
        ],
      },
      {
        id: 'l2',
        title: 'Bias and over-agreeableness',
        body: [
          { type: 'p', text: 'AI can **repeat biases** present in its data or in the way a question is written. It can also **agree too readily** with the user. If a person gives only one side of a personal conflict, the model may strengthen that one-sided view instead of revealing the missing context.' },
          { type: 'p', text: 'A simple habit: ask for **another perspective** and identify the assumptions before accepting advice.' },
          { type: 'p', text: 'Use AI **less** in personal life when the issue involves trust, relationships, identity, mental health, legal rights, medical care or major money. AI may help organise thoughts or prepare questions, but trusted people and qualified professionals should guide consequential decisions.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — iTutorGroup and automated age discrimination',
        body: [
          { type: 'p', text: 'The U.S. EEOC alleged that iTutorGroup\'s application software **automatically rejected older applicants** based on age. The company agreed to pay $365,000 to settle and provide other relief.' },
          { type: 'p', text: 'Automating a biased rule does not make the decision fair. High-impact decisions need **approved criteria, testing, documentation and meaningful human oversight**.' },
          { type: 'p', text: 'Fictional Malpani scenario: An HR employee wants help comparing candidates. Names, ages and personal details are **removed**, and AI is limited to organising evidence against approved criteria. Human interviewers review the evidence and make the decision — the tool does not rank people automatically.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'A password or bank detail is which colour of information?',
        options: ['Green', 'Yellow', 'Red', 'It depends on the day'],
        correct: 2,
        explain: 'Red information (passwords, bank details, confidential data) must never enter an unapproved tool.',
      },
      {
        q: 'Internal notes with identifying details are Yellow. What should you do before using them?',
        options: ['Nothing — paste them freely', 'Anonymise or get permission first', 'Only use them at night', 'Convert them to an image'],
        correct: 1,
        explain: 'Yellow information needs care, anonymisation or permission before use.',
      },
      {
        q: 'What does "over-agreeableness" mean for AI?',
        options: ['It refuses every request', 'It may agree too readily and strengthen a one-sided view', 'It always disagrees', 'It only answers in one language'],
        correct: 1,
        explain: 'AI can agree too readily; if it hears one side only, it may reinforce that view instead of revealing missing context.',
      },
      {
        q: 'What is the lesson of the iTutorGroup case?',
        options: ['Automation is always fair', 'Automating a biased rule does not make it fair — high-impact decisions need human oversight', 'Older applicants should not apply online', 'Hiring should be fully automatic'],
        correct: 1,
        explain: 'A biased rule made automatic is still biased; approved criteria, testing and human oversight are required.',
      },
      {
        q: 'For a personal decision about mental health, AI should…',
        options: ['Make the final decision', 'Only help organise thoughts or prepare questions, while professionals guide the decision', 'Replace the doctor', 'Be avoided entirely for all tasks'],
        correct: 1,
        explain: 'For trust, health, legal or major-money issues, AI may help organise thinking, but qualified people should guide the decision.',
      },
    ],
    prompts: [
      {
        id: 'p-gyr',
        title: 'Green / Yellow / Red Check',
        rarity: 'rare',
        text: 'Before I paste anything into an AI tool, classify it:\n🟢 GREEN — public or fictional → safe to use.\n🟡 YELLOW — internal or personal → anonymise or get permission first.\n🔴 RED — passwords, bank details, employee data, confidential contracts, sensitive customer/business secrets → do NOT paste into an unapproved tool.\nThen ask: "What is the least information the task actually needs?"',
      },
    ],
    missions: [
      {
        id: 'm3-classify',
        title: 'Classify your information',
        brief: 'List three pieces of information you handle in a normal week. Classify each as Green, Yellow or Red, and say what you would do to make a Yellow item safe to use with AI.',
        submitLabel: 'List three information items, classify each as Green/Yellow/Red, and describe how you would protect the Yellow (or Red) one.',
        minWords: 45,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Uses the Green / Yellow / Red classification', keywords: ['green', 'yellow', 'red'], weight: 1 },
          { id: 'r2', label: 'Correctly treats sensitive data as Red / protected', keywords: ['password', 'bank', 'confidential', 'employee', 'contract', 'customer', 'secret', 'personal', 'never', 'not paste'], weight: 1 },
          { id: 'r3', label: 'Describes protecting a Yellow item', keywords: ['anonym', 'remove', 'permission', 'approve', 'mask', 'protect', 'sample', 'fictional'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 4,
    stage: 'AI Ready',
    slug: 'communicating-with-ai',
    title: 'Communicating Effectively with AI',
    emoji: '💬',
    tagline: 'RTF, CTRO, CO-STAR — clear context beats clever words.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'A prompt is a checklist for clear thinking',
        body: [
          { type: 'p', text: 'A prompt is simply an instruction or question given to AI. Good prompts reduce guessing — they explain the situation, the task, the important requirements and the form of the answer. A framework is a **checklist for clear thinking**, not a magic formula.' },
          { type: 'callout', title: 'REMEMBER', text: 'Clear context and clear constraints usually matter more than clever words.' },
        ],
      },
      {
        id: 'l2',
        title: 'The three frameworks',
        body: [
          { type: 'p', text: '**RTF — Role, Task, Format.** Fast and useful for ordinary work.' },
          { type: 'prompt', promptId: 'p-rtf' },
          { type: 'p', text: '**CTRO — Context, Task, Requirements, Output.** The best default when rules and background matter.' },
          { type: 'prompt', promptId: 'p-ctro' },
          { type: 'p', text: '**CO-STAR — Context, Objective, Style, Tone, Audience, Response.** Useful when communication must feel right for a particular group.' },
          { type: 'prompt', promptId: 'p-costar' },
        ],
      },
      {
        id: 'l3',
        title: 'The conversation is part of prompting',
        body: [
          { type: 'p', text: 'The first answer is often only a draft. Ask AI to make it **shorter, simpler or more respectful**. Provide an example. Ask it to **list its assumptions**, identify missing information, or ask clarifying questions before continuing.' },
          { type: 'p', text: 'Fictional Malpani scenario: Asha asks, "Write a vendor email," and gets a generic answer. She adds the payment context, confirmed facts, tone, word limit and a rule not to promise a date. The second answer is usable because AI had **less room to guess**.' },
          { type: 'p', text: 'Case study — Moderna ran **prompt contests** and built an AI Champions cohort. Prompting improves through examples, practice and peer feedback; a shared library of approved prompts helps beginners learn faster than inventing prompts alone.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What does RTF stand for?',
        options: ['Read, Think, Finish', 'Role, Task, Format', 'Review, Test, Fix', 'Rule, Tone, Fact'],
        correct: 1,
        explain: 'RTF = Role, Task, Format — the fast framework for ordinary work.',
      },
      {
        q: 'Which framework is the best DEFAULT when rules and background matter?',
        options: ['RTF', 'CTRO (Context, Task, Requirements, Output)', 'CO-STAR', 'None — keep it short'],
        correct: 1,
        explain: 'CTRO is the recommended default when rules and background matter.',
      },
      {
        q: 'CO-STAR is most useful when…',
        options: ['You need a quick one-line task', 'Communication must feel right for a particular audience', 'You are doing maths', 'You want to skip context'],
        correct: 1,
        explain: 'CO-STAR (Context, Objective, Style, Tone, Audience, Response) suits audience-sensitive communication.',
      },
      {
        q: 'What usually matters MORE than clever wording?',
        options: ['Clear context and constraints', 'Using rare vocabulary', 'Making the prompt very long', 'Writing in capital letters'],
        correct: 0,
        explain: 'Clear context and clear constraints usually matter more than clever words.',
      },
      {
        q: 'Why was Asha\'s second vendor-email prompt better?',
        options: ['It was longer', 'She added context, facts, tone, a word limit and a rule — so AI had less room to guess', 'She used a different tool', 'She asked twice'],
        correct: 1,
        explain: 'Adding context and constraints reduced guessing and produced a usable answer.',
      },
    ],
    prompts: [
      { id: 'p-rtf', title: 'RTF — Role, Task, Format', rarity: 'common', text: 'ROLE: Act as a communication assistant.\nTASK: Rewrite this rough note politely and clearly.\nFORMAT: Return a WhatsApp message under 80 words.' },
      { id: 'p-ctro', title: 'CTRO — Context, Task, Requirements, Output', rarity: 'rare', text: 'CONTEXT: Explain a vendor delay to an internal team. These facts are confirmed: [facts].\nTASK: Write a short update.\nREQUIREMENTS: Use only the confirmed facts; do not promise a delivery date; keep a calm, professional tone.\nOUTPUT: A subject line + a 120-word email.' },
      { id: 'p-costar', title: 'CO-STAR — audience-sensitive message', rarity: 'epic', text: 'CONTEXT: We are announcing AI training to beginner employees who may feel nervous.\nOBJECTIVE: Reassure them and invite them to join.\nSTYLE: Simple and friendly.\nTONE: Warm and encouraging.\nAUDIENCE: Employees with little technical background.\nRESPONSE: A short announcement of about 120 words with one clear next step.' },
    ],
    missions: [
      {
        id: 'm4-write-prompt',
        title: 'Write a CTRO prompt for real work',
        brief: 'Choose a real communication task (an email, notice or summary). Write a full CTRO prompt for it — Context, Task, Requirements, Output — including at least one rule about what AI must NOT do (e.g. not invent facts or dates).',
        submitLabel: 'Paste your CTRO prompt with all four parts clearly labelled, including a "must not" rule.',
        minWords: 45,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Includes Context', keywords: ['context'], weight: 1 },
          { id: 'r2', label: 'Includes Task', keywords: ['task'], weight: 1 },
          { id: 'r3', label: 'Includes Requirements with a constraint/rule', keywords: ['requirement', 'must not', 'do not', "don't", 'no ', 'only', 'limit', 'rule'], weight: 1 },
          { id: 'r4', label: 'Includes Output format', keywords: ['output', 'format', 'word', 'email', 'subject', 'table', 'length', 'bullet'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 5,
    stage: 'AI Ready',
    slug: 'verification-critical-thinking',
    title: 'Verification & Critical Thinking',
    emoji: '🔍',
    tagline: 'PAUSE before you rely on any answer.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Confident tone is not evidence',
        body: [
          { type: 'p', text: 'AI can write in a confident tone even when it lacks evidence. **Verification** means comparing important claims with reliable material: the original document, an approved system, an official website, a fresh calculation, or a responsible expert.' },
          { type: 'callout', title: 'REMEMBER', text: 'If an error could affect money, safety, rights, customers or employees, verification is part of the task — not an optional final step.' },
        ],
      },
      {
        id: 'l2',
        title: 'The PAUSE method',
        body: [
          { type: 'p', text: 'Use **PAUSE** before relying on an answer:' },
          { type: 'list', items: [
            '**P — Privacy:** Is personal or confidential information involved?',
            '**A — Accuracy:** Are facts, names, dates and calculations correct?',
            '**U — Understanding:** Do I understand the answer myself?',
            '**S — Senior / specialist review:** Is approval or expert judgement required?',
            '**E — Edit:** Have I reviewed and improved the final output?',
          ] },
          { type: 'p', text: 'Verification should match the risk. A brainstorming list needs light review; a customer price, financial calculation, safety instruction, policy statement or legal claim needs stronger evidence and approval.' },
          { type: 'prompt', promptId: 'p-pause' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — lawyers sanctioned for AI-invented cases',
        body: [
          { type: 'p', text: 'In **Mata v. Avianca**, lawyers submitted non-existent court opinions and fake quotations created by ChatGPT. The court imposed a $5,000 penalty and stressed the lawyer\'s duty to ensure accuracy.' },
          { type: 'p', text: 'The problem was not simply using AI — it was submitting information **without verifying** the cited cases, then continuing to rely on them after concerns were raised.' },
          { type: 'p', text: 'Fictional Malpani scenario: AI drafts a report saying sales rose 18%. Priya checks the source spreadsheet and finds AI compared the wrong months. The writing was good, but the conclusion was false. She corrects the comparison and records the source cells.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What does the "S" in PAUSE stand for?',
        options: ['Speed', 'Senior or specialist review', 'Summary', 'Source code'],
        correct: 1,
        explain: 'PAUSE = Privacy, Accuracy, Understanding, Senior/specialist review, Edit.',
      },
      {
        q: 'How much verification does an answer need?',
        options: ['The same for everything', 'It should match the risk — light for brainstorming, strong for prices, safety and policy', 'None if it sounds confident', 'Only for images'],
        correct: 1,
        explain: 'Verification should match the risk; high-impact claims need stronger evidence and approval.',
      },
      {
        q: 'An AI citation is only useful when…',
        options: ['It looks official', 'The source actually exists and supports the claim', 'It is long', 'The AI sounds sure'],
        correct: 1,
        explain: 'A citation is useful only when the source exists and supports the claim — as the Avianca case showed.',
      },
      {
        q: 'What was the serious failure in Mata v. Avianca?',
        options: ['Using AI at all', 'Submitting cited cases without verifying them and relying on them after concerns arose', 'Writing too briefly', 'Refusing to use AI'],
        correct: 1,
        explain: 'The failure was skipping verification and defending the answer instead of investigating.',
      },
      {
        q: 'If you do not understand or cannot verify an AI answer, you should…',
        options: ['Forward it as your own confirmed work', 'Not forward it as if it were confirmed — check or escalate first', 'Add more confident wording', 'Delete all evidence'],
        correct: 1,
        explain: 'If you cannot understand or verify the output, do not present it as confirmed work.',
      },
    ],
    prompts: [
      {
        id: 'p-pause',
        title: 'PAUSE Review Card',
        rarity: 'epic',
        text: 'Before I rely on this AI answer, run PAUSE:\nP — Privacy: Is personal or confidential information involved?\nA — Accuracy: Are facts, names, dates and calculations correct? (Open the source and confirm.)\nU — Understanding: Do I understand the answer myself?\nS — Senior/specialist: Is approval or expert judgement required?\nE — Edit: Have I reviewed and improved the final output?',
      },
    ],
    missions: [
      {
        id: 'm5-verify',
        title: 'Verify an AI answer with PAUSE',
        brief: 'Ask AI something that includes a fact, date or calculation. Then run the PAUSE method on the answer: check the fact against a reliable source, redo any calculation, and note what you found.',
        submitLabel: 'Describe the answer you got, how you applied each part of PAUSE, and whether the answer held up.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Checked accuracy against a real source', keywords: ['source', 'check', 'official', 'website', 'document', 'spreadsheet', 'confirm', 'verify', 'recalcul', 'calculation'], weight: 1 },
          { id: 'r2', label: 'Considered privacy', keywords: ['privacy', 'confidential', 'personal', 'anonym', 'safe'], weight: 1 },
          { id: 'r3', label: 'Judged whether senior/expert review was needed', keywords: ['senior', 'specialist', 'expert', 'approve', 'escalate', 'review'], weight: 1 },
          { id: 'r4', label: 'Reported the outcome honestly (held up or not)', keywords: ['correct', 'wrong', 'error', 'mistake', 'held up', 'accurate', 'false', 'true', 'fixed', 'edit'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 6,
    stage: 'AI Ready',
    slug: 'image-models',
    title: 'Basics of Image Models',
    emoji: '🎨',
    tagline: 'An attractive image can still be inaccurate or off-brand.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'A generated image is a draft, not a photograph',
        body: [
          { type: 'p', text: 'An image model **creates or changes** visual content from instructions. It does not take a photograph of a real event. Generated details may be wrong — including text, labels, hands, equipment and safety conditions. Treat the result as a **draft visual** unless it has been carefully reviewed.' },
          { type: 'callout', title: 'REMEMBER', text: 'An attractive image can still be inaccurate, misleading or off-brand. Visual review needs the same seriousness as text review.' },
        ],
      },
      {
        id: 'l2',
        title: 'How to prompt for an image',
        body: [
          { type: 'p', text: 'A useful image prompt describes the **subject, setting, style, composition, required text and dimensions**. For editing, describe the current image, the exact change, what must stay unchanged, and the desired final format.' },
          { type: 'prompt', promptId: 'p-image' },
          { type: 'p', text: 'Never create a realistic image that misleads people about an event, product result or a person\'s actions. Obtain **permission** before using a real person\'s identity. Follow approved brand assets, copyright rules and communication review.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Coca-Cola\'s controlled brand sandbox',
        body: [
          { type: 'p', text: 'Coca-Cola launched **Create Real Magic**, a platform combining text and image generation with selected assets from its brand archives. Artists could experiment and submit original work, with selected creations considered for digital billboards.' },
          { type: 'p', text: 'The company framed it as **human creators using AI inside a controlled brand environment** — showing the value of approved assets, clear boundaries and human creative direction.' },
          { type: 'p', text: 'Fictional Malpani scenario: A marketing employee generates a product poster, but the model changes the spelling on the label and adds a feature the product does not have. The employee rejects the image, restores the approved product photo, and uses AI only for the background concept.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'A generated product image should be treated as…',
        options: ['A real photograph', 'A draft visual until carefully reviewed', 'Automatically brand-approved', 'Always accurate'],
        correct: 1,
        explain: 'Generated details can be wrong; treat the result as a draft until reviewed.',
      },
      {
        q: 'A good image prompt describes…',
        options: ['Only the colour', 'Subject, setting, style, composition, required text and dimensions', 'Just the file name', 'The price'],
        correct: 1,
        explain: 'Describe subject, setting, style, composition, required text and dimensions for a useful result.',
      },
      {
        q: 'Before using a real person\'s identity in a generated image you must…',
        options: ['Do nothing', 'Obtain permission', 'Only ask afterwards', 'Make it look funny'],
        correct: 1,
        explain: 'Obtain permission before using a real person\'s identity, and follow brand and copyright rules.',
      },
      {
        q: 'What did the Coca-Cola case demonstrate?',
        options: ['Brands should ban AI images', 'Human creators using AI inside a controlled, approved brand environment', 'AI should replace all designers', 'Copyright does not matter'],
        correct: 1,
        explain: 'A brand sandbox protects consistency while humans select, refine and take responsibility.',
      },
      {
        q: 'The marketing employee rejected the poster because…',
        options: ['It was too colourful', 'The model changed the label spelling and invented a feature', 'It was the wrong size', 'AI is banned'],
        correct: 1,
        explain: 'The image was inaccurate and misleading; they restored the approved photo and used AI only for the background.',
      },
    ],
    prompts: [
      {
        id: 'p-image',
        title: 'Image Prompt Structure',
        rarity: 'rare',
        text: 'Create an image.\nSUBJECT: [what it shows]\nSETTING / ACTION: [scene]\nSTYLE: [photorealistic / flat vector / illustration]\nCOMPOSITION: [layout, space for logo/text]\nTEXT ON IMAGE: [exact wording, or "no text"]\nDIMENSIONS: [aspect ratio].\nFor an EDIT, also state: what to change, and what must stay exactly the same (label, product shape, colours, proportions).',
      },
    ],
    missions: [
      {
        id: 'm6-image-brief',
        title: 'Write a safe image brief',
        brief: 'Write an image prompt for a work visual (a concept poster or background). Include the subject, style, composition and any on-image text — and state at least one thing that must NOT be changed or must NOT be misleading (brand, product detail, or no fake claim).',
        submitLabel: 'Paste your image brief, including a safeguard about brand accuracy, consent, or not misleading viewers.',
        minWords: 45,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Describes subject + style + composition', keywords: ['subject', 'style', 'composition', 'setting', 'layout', 'photoreal', 'vector', 'background', 'poster'], weight: 1 },
          { id: 'r2', label: 'Specifies text/dimensions', keywords: ['text', 'wording', 'aspect', 'ratio', 'dimension', 'size', 'logo', 'space'], weight: 1 },
          { id: 'r3', label: 'Adds a safeguard (brand/consent/not misleading)', keywords: ['brand', 'approve', 'consent', 'permission', 'not mislead', 'accurate', 'no fake', 'do not change', 'must stay', 'copyright', 'review'], weight: 1 },
        ],
      },
    ],
  },
];
