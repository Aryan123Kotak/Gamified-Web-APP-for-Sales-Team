// STAGE 2 — ADVANCED AI TOOLKIT (Levels 7–14)
// Built from "Malpani Group — AI Complete Teaching Guide" v1.0

export const stage2 = [
  {
    id: 7,
    stage: 'Advanced Toolkit',
    slug: 'projects-workspaces',
    title: 'Projects & Persistent Workspaces',
    emoji: '🗂️',
    tagline: 'A Project remembers context — it does not guarantee the context is correct.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Chat vs Project',
        body: [
          { type: 'p', text: 'A **normal chat** is useful for a short, independent task. A **Project** is a continuing workspace for related chats, files and instructions. It helps AI stay focused on the same purpose and reuse approved context across repeated work.' },
          { type: 'p', text: 'A good Project has a clear name, **one business purpose**, approved source material, reusable instructions, an output format and an owner. It should not become a dumping ground for every file. Old information must be removed or labelled so it is not treated as current.' },
          { type: 'callout', title: 'REMEMBER', text: 'A Project remembers context; it does not guarantee that the context is correct, current or permitted.' },
        ],
      },
      {
        id: 'l2',
        title: 'Convenience can hide risk',
        body: [
          { type: 'p', text: 'People with access may see the shared files and chats in a Project. The owner should know **who can view or edit** the workspace, what information is permitted, and when the Project should be reviewed or closed.' },
          {
            type: 'table',
            headers: ['Use', 'What goes in the workspace'],
            rows: [
              ['Monthly reporting', 'Approved format, metric definitions, previous public examples'],
              ['Training', 'Course objectives, tone guidance, approved reference material'],
              ['Campaign planning', 'Separate each campaign so instructions and assets do not mix'],
              ['Process improvement', 'Meeting notes, decisions and open questions for one project'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Morgan Stanley\'s maintained knowledge base',
        body: [
          { type: 'p', text: 'Morgan Stanley\'s internal assistant grew to work across about **100,000 documents**, supported by testing and expert review. The principle scales down to your own Project: useful AI depends on **organised, relevant and maintained context**, not merely a powerful model.' },
          { type: 'p', text: 'Fictional Malpani scenario: A team creates a Monthly Review Project. The owner adds the approved template, metric definitions and a rule to mark missing data. Each month they remove the old draft dataset and add the approved current file. AI drafts the narrative; the manager confirms figures and conclusions.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is a Project best for?',
        options: ['A single one-off question', 'Continuing, related work that reuses approved context', 'Storing every file you own', 'Replacing your manager'],
        correct: 1,
        explain: 'A Project is a continuing workspace for related chats, files and instructions with one business purpose.',
      },
      {
        q: 'What must happen to old information in a Project?',
        options: ['Leave it — more is better', 'Remove or label it so it is not treated as current', 'Hide it from the owner', 'Convert it to an image'],
        correct: 1,
        explain: 'Outdated material must be removed or labelled so it is not mistaken for current context.',
      },
      {
        q: 'A Project remembers context. Does that make the context correct?',
        options: ['Yes, automatically', 'No — it does not guarantee the context is correct, current or permitted', 'Only for images', 'Only on paid plans'],
        correct: 1,
        explain: 'Memory of context is not a guarantee of accuracy, currency or permission.',
      },
      {
        q: 'Why does Project access matter?',
        options: ['It does not', 'People with access may see shared files and chats, so the owner must control permissions', 'It makes AI faster', 'It changes the colour scheme'],
        correct: 1,
        explain: 'The owner should know who can view or edit, what is permitted, and when to review or close the workspace.',
      },
      {
        q: 'What is the transferable lesson from Morgan Stanley\'s system?',
        options: ['Buy a bigger model', 'Useful AI depends on organised, relevant, maintained context', 'Store everything forever', 'Avoid expert review'],
        correct: 1,
        explain: 'Organised and maintained context — not just a powerful model — makes AI useful.',
      },
    ],
    prompts: [
      {
        id: 'p-project',
        title: 'Project Setup Checklist',
        rarity: 'rare',
        text: 'Define this Project before adding files:\nNAME: [specific, one purpose]\nPURPOSE: [the single business goal]\nSOURCE MATERIAL: [approved files only]\nINSTRUCTIONS: [tone, format, rules, "mark missing data"]\nOUTPUT FORMAT: [what every result should look like]\nOWNER: [who maintains and reviews it]\nREVIEW: [when old material is removed / the project is closed]',
      },
    ],
    missions: [
      {
        id: 'm7-project-plan',
        title: 'Plan a Project workspace',
        brief: 'Design a Project for a repeated task you do. Define its single purpose, what approved material goes in, the instructions, the output format, the owner, and how old information will be kept current.',
        submitLabel: 'Describe your Project: name, one purpose, source material, instructions, output, owner, and how you keep it current.',
        minWords: 55,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Defines ONE clear purpose', keywords: ['purpose', 'goal', 'one', 'single', 'report', 'campaign', 'review', 'task'], weight: 1 },
          { id: 'r2', label: 'Uses only approved source material', keywords: ['approved', 'source', 'file', 'template', 'material', 'document', 'definition'], weight: 1 },
          { id: 'r3', label: 'Names an owner', keywords: ['owner', 'responsible', 'maintain', 'i will', 'manager', 'team lead'], weight: 1 },
          { id: 'r4', label: 'Plans to keep context current', keywords: ['remove', 'update', 'current', 'old', 'review', 'label', 'close', 'outdated'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 8,
    stage: 'Advanced Toolkit',
    slug: 'documents-vision',
    title: 'Documents & Vision Models',
    emoji: '👁️',
    tagline: 'When the input is unclear, the right answer may be "I cannot tell reliably."',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'Vision reads what you give it — nothing more',
        body: [
          { type: 'p', text: '**Vision models** examine images, screenshots, charts or scanned pages — describing items, reading text, comparing images or organising information. Document tools do similar work across PDFs, word files and spreadsheets. This is different from image *generation* (Level 6): here AI **reads**, it does not create.' },
          { type: 'p', text: 'The model sees only what is provided. A blurred image, missing page, cropped label or unusual handwriting can produce a **confident mistake**. Ask the model to mark uncertain text instead of guessing, and compare extracted information with the original.' },
          { type: 'callout', title: 'REMEMBER', text: 'When the input is unclear, the correct AI response may be: "I cannot determine this reliably from the image."' },
        ],
      },
      {
        id: 'l2',
        title: 'Assist observation, do not replace inspection',
        body: [
          { type: 'p', text: 'Use Vision to **assist** observation, not to replace a qualified inspection. A photograph cannot reveal every safety condition, material defect or business context. Important findings should be confirmed by the responsible person at the site or in the source document.' },
          {
            type: 'table',
            headers: ['Task', 'How to stay safe'],
            rows: [
              ['Extraction', 'Turn a photo into a draft table, then compare every row with the photo'],
              ['Comparison', 'Identify visible differences between two approved document versions'],
              ['Chart explanation', 'Explain the direction of a chart without inventing causes'],
              ['Screenshot support', 'Describe an error screen — avoid passwords, tokens or customer details'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Be My Eyes and accessible Vision',
        body: [
          { type: 'p', text: 'Be My Eyes built a Virtual Volunteer using GPT-4 Vision to interpret images conversationally for people who are blind or have low vision — identifying refrigerator contents, discussing what could be made, and helping with cluttered webpages.' },
          { type: 'p', text: 'The case shows Vision becomes more useful when a user can **ask follow-up questions** — and that higher-consequence guidance (a tripping hazard, navigation) needs caution and a fallback to human help.' },
          { type: 'p', text: 'Fictional Malpani scenario: An operations employee photographs a handwritten count sheet. AI creates a table but reads "17" as "71". The employee compares line by line, corrects the value and asks the original recorder to confirm the unclear entry.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'How is Vision different from image generation?',
        options: ['They are the same', 'Vision reads/examines images; generation creates new images', 'Vision only works on video', 'Generation reads documents'],
        correct: 1,
        explain: 'Vision examines and reads what you provide; generation (Level 6) creates new visuals.',
      },
      {
        q: 'What can cause a confident Vision mistake?',
        options: ['A clear, high-quality image', 'A blurred image, missing page, cropped label or unusual handwriting', 'A short prompt', 'Using a PDF'],
        correct: 1,
        explain: 'Poor-quality or ambiguous input can lead to a confident but wrong reading.',
      },
      {
        q: 'When input is unclear, a good AI response is…',
        options: ['A confident guess', '"I cannot determine this reliably from the image"', 'To invent a plausible value', 'To ignore the task'],
        correct: 1,
        explain: 'Marking uncertainty is safer than guessing.',
      },
      {
        q: 'After extracting a table from a photo you should…',
        options: ['Trust it fully', 'Compare every row with the original photo', 'Delete the photo', 'Send it immediately'],
        correct: 1,
        explain: 'Always compare the extracted data against the source to catch misreads like 17 vs 71.',
      },
      {
        q: 'What made Be My Eyes\' Vision more useful?',
        options: ['It never made mistakes', 'Users could ask follow-up questions in conversation', 'It replaced human help entirely', 'It only described colours'],
        correct: 1,
        explain: 'Conversation turned basic recognition into useful understanding; high-consequence guidance still needs human fallback.',
      },
    ],
    prompts: [
      {
        id: 'p-vision',
        title: 'Vision Extraction Prompt',
        rarity: 'rare',
        text: 'Read the attached image/scan and extract the information into a table with columns: [columns].\nRULES:\n- If any value is unclear or unreadable, write "unclear" — do NOT guess.\n- Do not include any passwords, tokens or customer identifiers.\n- After the table, list any rows you were unsure about so a human can confirm them against the original.',
      },
    ],
    missions: [
      {
        id: 'm8-extract-check',
        title: 'Extract and verify from an image',
        brief: 'Use a photo or screenshot of a simple list, table or chart (fictional or approved). Ask AI to extract or explain it, then compare the output line-by-line with the original and note any mistakes or unclear items.',
        submitLabel: 'Describe what you extracted, how you compared it to the original, and any errors or "unclear" items you found.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Extracted or explained a visual input', keywords: ['extract', 'table', 'chart', 'photo', 'screenshot', 'scan', 'read', 'explain', 'image'], weight: 1 },
          { id: 'r2', label: 'Compared output to the original', keywords: ['compare', 'line', 'row', 'original', 'check', 'match', 'against'], weight: 1 },
          { id: 'r3', label: 'Handled uncertainty / errors safely', keywords: ['unclear', 'error', 'wrong', 'mistake', 'confirm', 'guess', 'uncertain', 'correct'], weight: 1 },
          { id: 'r4', label: 'Avoided sensitive detail', keywords: ['fictional', 'approved', 'sample', 'no password', 'no customer', 'safe', 'anonym'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 9,
    stage: 'Advanced Toolkit',
    slug: 'research-knowledge',
    title: 'Research & Knowledge Tools',
    emoji: '📚',
    tagline: 'A good research answer shows its scope, sources, dates, uncertainty and gaps.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'Research starts with a question and a standard',
        body: [
          { type: 'p', text: 'Research is more than asking for an answer. It begins with a **question, a scope and an evidence standard**. Tell the tool what time period matters, which sources to prefer, and which claims need citations. A research answer should let another person **trace important statements back to their sources**.' },
          { type: 'callout', title: 'REMEMBER', text: 'A researched answer is valuable when its scope, sources, dates, uncertainty and gaps are visible.' },
        ],
      },
      {
        id: 'l2',
        title: 'Facts vs inference — and disagreement',
        body: [
          { type: 'p', text: '"Official" does not always mean complete, and "popular" does not always mean reliable. Compare more than one source when the issue matters. **Separate** confirmed facts, source opinions and the AI\'s own inference. If sources disagree, **report the disagreement** instead of hiding it.' },
          { type: 'p', text: 'Knowledge tools (document-grounded notebooks) can answer across a collection of approved material. Their value depends on the **quality, completeness and currency** of that collection. Missing documents can create incomplete answers even when every citation is correct.' },
          { type: 'prompt', promptId: 'p-research' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Morgan Stanley tested retrieval quality',
        body: [
          { type: 'p', text: 'Morgan Stanley\'s assistant expanded to answer across ~100,000 documents. The team used **evaluation sets and expert grading** to check whether the right document was found, whether summaries preserved meaning, and whether answers met expert standards.' },
          { type: 'p', text: 'A knowledge tool is **not trustworthy merely because it cites internal documents** — a cited answer can still omit relevant material.' },
          { type: 'p', text: 'Fictional Malpani scenario: A purchase team asks AI for "the best vendor." The answer ranks vendors using unknown internet information. The team changes the task: use only the approved quotation set, compare documented criteria, mark missing evidence, and leave the final decision to the authorised committee.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What should a research request include at the start?',
        options: ['Only the question', 'A question, scope and evidence standard (dates, preferred sources, what needs citations)', 'The answer you want', 'A single keyword'],
        correct: 1,
        explain: 'Define the question, scope and evidence standard so important statements can be traced to sources.',
      },
      {
        q: 'If sources disagree, the answer should…',
        options: ['Pick one and hide the rest', 'Report the disagreement', 'Ignore the issue', 'Stop entirely'],
        correct: 1,
        explain: 'Report disagreement rather than hiding it; separate facts, opinions and inference.',
      },
      {
        q: 'A document-grounded knowledge tool is only as good as…',
        options: ['Its colour scheme', 'The quality, completeness and currency of its source collection', 'The length of its answers', 'The number of users'],
        correct: 1,
        explain: 'Missing or outdated documents create incomplete answers even when citations are correct.',
      },
      {
        q: 'Does citing internal documents make an answer trustworthy?',
        options: ['Yes, always', 'No — it can still omit relevant material and needs testing', 'Only for finance', 'Only if it is long'],
        correct: 1,
        explain: 'Retrieval quality must be tested; a cited answer can still miss relevant documents.',
      },
      {
        q: 'How did the purchase team fix the "best vendor" request?',
        options: ['Trusted the internet ranking', 'Used only the approved quotations, compared documented criteria, marked gaps, left the decision to the committee', 'Asked AI to decide', 'Cancelled the purchase'],
        correct: 1,
        explain: 'They grounded the task in approved evidence and kept the decision with the authorised committee.',
      },
    ],
    prompts: [
      {
        id: 'p-research',
        title: 'Source-Backed Research Prompt',
        rarity: 'epic',
        text: 'Research question: [question].\nSCOPE: time period [dates]; prefer official/primary sources.\nRULES:\n- Cite a source for every important claim so I can trace it.\n- Separate confirmed FACTS, source OPINIONS and your own INFERENCE.\n- If sources disagree, report the disagreement.\n- List what is UNCERTAIN and what evidence is MISSING.\nOUTPUT: a short brief with sources, dates and a "gaps" section.',
      },
    ],
    missions: [
      {
        id: 'm9-research-brief',
        title: 'Run a source-backed mini research',
        brief: 'Pick a small, public research question relevant to your work. Use AI to research it, but require sources and dates. Then verify at least one claim against an official source and note any gap or disagreement.',
        submitLabel: 'Share your question, the sources you required, the claim you verified, and any gap or disagreement you found.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Defined scope with dates / preferred sources', keywords: ['scope', 'date', 'period', 'official', 'primary', 'source', 'recent'], weight: 1 },
          { id: 'r2', label: 'Required citations to trace claims', keywords: ['cite', 'citation', 'source', 'link', 'reference', 'trace'], weight: 1 },
          { id: 'r3', label: 'Verified a claim independently', keywords: ['verify', 'check', 'confirm', 'official', 'website', 'compared'], weight: 1 },
          { id: 'r4', label: 'Noted a gap, uncertainty or disagreement', keywords: ['gap', 'missing', 'uncertain', 'disagree', 'unclear', 'unknown', 'limitation'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 10,
    stage: 'Advanced Toolkit',
    slug: 'context-tokens',
    title: 'Context Engineering & Tokens',
    emoji: '🧩',
    tagline: 'Treat the context window like a clean worktable — place only what this step needs.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Tokens, context and the context window',
        body: [
          { type: 'p', text: 'A **token** is a small piece of text a model processes — a whole word, part of a word, a number, a punctuation mark or a space pattern. Token counts do not exactly match word counts, and different languages or models divide text differently.' },
          { type: 'p', text: '**Context** is everything the model can use for the current answer: instructions, your question, earlier conversation, examples, uploaded or retrieved material and tool results. The **context window** is the model\'s limited "working desk" — the input and the answer must fit within it. Exact limits vary by tool, so check current product guidance instead of memorising a number.' },
          { type: 'callout', title: 'REMEMBER', text: 'Treat the context window like a clean worktable: place the right material on it for the current step — not every document you own.' },
        ],
      },
      {
        id: 'l2',
        title: 'Prompt engineering vs context engineering',
        body: [
          { type: 'p', text: '**Prompt engineering** improves the instruction. **Context engineering** manages the whole information environment around it: What does the model need *now*? Which source is authoritative? What is current? What can be removed? What should be retrieved later? Who must verify the result?' },
          { type: 'p', text: '**More context is not always better.** Repeated messages, entire file archives, old policies and unrelated examples can hide the important signal. Aim for the **smallest high-signal set** that still contains the task, current facts, necessary constraints, useful examples, source labels and review rules.' },
          { type: 'list', items: [
            'State the goal first.',
            'Share only relevant sections; label sources and dates.',
            'Remove duplicates; limit the requested output.',
            'Divide large work into stages; keep a checked summary of decisions, open questions and sources.',
          ] },
        ],
      },
      {
        id: 'l3',
        title: 'Efficiency never removes safety — case study',
        body: [
          { type: 'callout', title: 'IMPORTANT', text: 'Never remove a safety instruction, critical exception, contractual requirement or approval step merely to save tokens. A smaller confidential extract is still confidential unless its use is approved.' },
          { type: 'p', text: 'Case study — **Anthropic\'s Claude Code** uses a hybrid approach: a small set of instructions up front, plus file-search tools to retrieve relevant material *just in time* instead of loading an entire codebase. For long tasks it uses **compaction** — summarising important decisions and recent work while removing redundant output.' },
          { type: 'p', text: 'Fictional Malpani scenario: A manager uploads a whole folder of old reports, photos and outdated definitions to write a monthly review. The answer mixes last year\'s targets with current figures. They start again with only the approved current sheet, metric definitions, three confirmed exceptions and the required format — and check every figure.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is a token?',
        options: ['Always one full word', 'A small piece of text — a word, part of a word, number, punctuation or space', 'A password', 'A type of file'],
        correct: 1,
        explain: 'A token is a small text piece; counts do not exactly match words and vary by language and model.',
      },
      {
        q: 'What is the context window?',
        options: ['A settings menu', 'The model\'s limited working space that input and answer must fit within', 'The internet', 'A saved chat folder'],
        correct: 1,
        explain: 'The context window is the limited "working desk"; exact limits vary by tool and model.',
      },
      {
        q: 'Is more context always better?',
        options: ['Yes', 'No — noise, duplicates and old material can hide the important signal', 'Only for images', 'Only on free plans'],
        correct: 1,
        explain: 'Aim for the smallest high-signal set that still contains the task, facts, constraints and rules.',
      },
      {
        q: 'You should NEVER remove which item just to save tokens?',
        options: ['A greeting', 'A duplicate paragraph', 'A safety instruction, critical exception or approval step', 'An unrelated example'],
        correct: 2,
        explain: 'Efficiency must not delete safety rules, exceptions, contractual requirements or approval steps.',
      },
      {
        q: 'What is "compaction" in Anthropic\'s approach?',
        options: ['Deleting the whole chat', 'Summarising important decisions and recent work while removing redundant output', 'Making fonts smaller', 'Compressing images'],
        correct: 1,
        explain: 'Compaction keeps the state needed to continue and retrieves detailed evidence when the next step needs it.',
      },
    ],
    prompts: [
      {
        id: 'p-context',
        title: 'Context Trim Checklist',
        rarity: 'rare',
        text: 'Before sending a long prompt, trim to the smallest high-signal set:\n1. Goal first, in one sentence.\n2. Only the relevant sections — not whole archives.\n3. Label each source and its date.\n4. Remove duplicates and outdated material.\n5. Keep every safety rule, exception and approval step.\n6. Limit the requested output (e.g. "a 5-row table" or "150 words").\n7. For long work, keep a checked summary of decisions, open questions and sources.',
      },
    ],
    missions: [
      {
        id: 'm10-trim-context',
        title: 'Trim a bloated prompt',
        brief: 'Take a task where you would normally paste a lot of material. Build the smallest high-signal context instead: state the goal, include only relevant sections with source labels, and keep any safety/approval rule. Explain what you removed and why.',
        submitLabel: 'Show your trimmed context (goal, relevant material, rules kept) and explain what you removed and what you deliberately kept.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'States the goal first', keywords: ['goal', 'first', 'objective', 'purpose', 'aim'], weight: 1 },
          { id: 'r2', label: 'Removed noise / duplicates / old material', keywords: ['remove', 'removed', 'cut', 'delete', 'duplicate', 'old', 'outdated', 'trim', 'irrelevant'], weight: 1 },
          { id: 'r3', label: 'Labelled sources / kept only relevant parts', keywords: ['source', 'label', 'date', 'relevant', 'section', 'only'], weight: 1 },
          { id: 'r4', label: 'Kept safety / approval / exception rules', keywords: ['safety', 'approval', 'exception', 'rule', 'kept', 'keep', 'constraint', 'privacy', 'confidential'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 11,
    stage: 'Advanced Toolkit',
    slug: 'reverse-engineering',
    title: 'Reverse Engineering',
    emoji: '🔧',
    tagline: 'Copying the surface is easy. Understanding the purpose creates reusable learning.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'Learn from an output — don\'t copy it',
        body: [
          { type: 'p', text: 'Reverse engineering here means **learning from an existing output**. Instead of "copy this proposal," ask what makes it effective: the order of sections, the evidence used, the decision it asks for, the tone and the visual hierarchy. Then create a **new template** that serves the same purpose without copying protected wording or confidential details.' },
          { type: 'callout', title: 'REMEMBER', text: 'Copying the surface is easy. Understanding the purpose, evidence and process creates reusable learning.' },
        ],
      },
      {
        id: 'l2',
        title: 'A final output hides the work behind it',
        body: [
          { type: 'p', text: 'AI can identify patterns quickly, but may **misunderstand why** a part exists. Ask the original owner or a subject expert to confirm the reasoning. A finished document also hides the work that came before it — interviews, approvals, calculations and revisions.' },
          { type: 'callout', title: 'ETHICAL BOUNDARIES', text: 'Do not upload a competitor\'s confidential document, bypass security, imitate a living artist without permission, or present copied work as original. Reverse engineering should create understanding and better process — not theft.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Coca-Cola\'s permission-based co-creation',
        body: [
          { type: 'p', text: '**Create Real Magic** let artists work with *selected* Coca-Cola archive elements in an approved platform, producing new work with credit. This contrasts sharply with uncontrolled copying: the rights holder **selected the assets, defined the environment, and invited original interpretation**. Clear permission changes what is ethical and useful.' },
          { type: 'p', text: 'Fictional Malpani scenario: A team gives AI a successful internal proposal *after removing confidential data*. AI identifies a strong problem statement, an evidence section, an options comparison and a decision request. The team builds a **blank template** and asks the proposal owner to validate the structure.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Reverse engineering in this course means…',
        options: ['Copying a document word for word', 'Learning why an output works, then building an original template for the same purpose', 'Stealing a competitor file', 'Decompiling software'],
        correct: 1,
        explain: 'Study structure, evidence, tone and purpose — then create original, non-copied reusable structure.',
      },
      {
        q: 'What might AI get wrong when analysing an output?',
        options: ['The colour', 'Why a part exists — so confirm with the owner or an expert', 'The file size', 'The date'],
        correct: 1,
        explain: 'AI can spot patterns but misjudge purpose; the owner or subject expert should confirm the reasoning.',
      },
      {
        q: 'Which of these is an ethical boundary you must respect?',
        options: ['Uploading a competitor\'s confidential document', 'Imitating a living artist without permission', 'Presenting copied work as original', 'All of these are things you must NOT do'],
        correct: 3,
        explain: 'None of these are acceptable — reverse engineering must create understanding, not theft.',
      },
      {
        q: 'A finished document hides…',
        options: ['Nothing', 'The interviews, approvals, calculations and revisions behind it', 'Its own title', 'The author'],
        correct: 1,
        explain: 'The process behind a final output is invisible; understanding it is part of the learning.',
      },
      {
        q: 'Why is Create Real Magic different from uncontrolled copying?',
        options: ['It used no AI', 'The rights holder selected assets, set boundaries and invited original work with permission', 'It was free', 'It banned artists'],
        correct: 1,
        explain: 'Clear permission and defined boundaries change what is ethical and useful.',
      },
    ],
    prompts: [
      {
        id: 'p-reverse',
        title: 'Reverse-Engineer to a Template',
        rarity: 'epic',
        text: 'Here is an output I admire (confidential details removed): [paste].\n1) Break down WHY it works: audience, purpose, section order, evidence, tone, the decision it asks for.\n2) Reconstruct the likely process behind it (inputs, approvals, revisions).\n3) Turn the pattern into a BLANK reusable template with placeholders — no copied wording or confidential detail.\nThen I will ask the original owner to validate the structure.',
      },
    ],
    missions: [
      {
        id: 'm11-template',
        title: 'Turn a good output into a template',
        brief: 'Take a successful document you are allowed to use (confidential details removed). Break down why it works, then create a blank reusable template with placeholders — no copied wording. Note who should validate it.',
        submitLabel: 'Explain what made the output effective, share your blank template structure, and confirm you removed confidential/copied content.',
        minWords: 55,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Analyses why the output works', keywords: ['structure', 'section', 'evidence', 'tone', 'audience', 'purpose', 'order', 'why', 'decision'], weight: 1 },
          { id: 'r2', label: 'Produces a blank template with placeholders', keywords: ['template', 'placeholder', 'blank', 'bracket', 'reusable', '[ ]', 'fill'], weight: 1 },
          { id: 'r3', label: 'Respects ethics (no copied/confidential content)', keywords: ['removed', 'no copy', 'not copy', 'original', 'confidential', 'permission', 'ethical', 'own words'], weight: 1 },
          { id: 'r4', label: 'Names who validates the structure', keywords: ['owner', 'validate', 'confirm', 'expert', 'review', 'check'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 12,
    stage: 'Advanced Toolkit',
    slug: 'skills-gpts-gems',
    title: 'Skills, Custom GPTs & Gems',
    emoji: '🤖',
    tagline: 'A focused assistant that does one task well beats one that promises everything.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'Reusable assistants — same idea, different names',
        body: [
          { type: 'p', text: 'Different platforms use names like **Skills, Custom GPTs and Gems**. The shared idea is a **reusable assistant configured for a repeated task** — carrying instructions, examples, reference files and sometimes tools. The name matters less than the workflow design.' },
          { type: 'callout', title: 'REMEMBER', text: 'A focused assistant that does one task well is safer and more useful than an assistant that promises to do everything.' },
        ],
      },
      {
        id: 'l2',
        title: 'Design one clear assistant',
        body: [
          { type: 'p', text: 'A good assistant solves **one clear problem for a known user**. Define what input it needs, what steps it follows, what output it creates, what it must **refuse**, and when it should **ask for human help**. Include examples of good output and difficult cases.' },
          { type: 'p', text: '**Reusable does not mean permanent.** Policies, products and formats change. A named owner should test the assistant, update its knowledge and retire it if the task changes. Do not assume hidden instructions or uploaded knowledge can safely hold unrestricted secrets.' },
          { type: 'prompt', promptId: 'p-assistant' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Moderna\'s 750 GPTs',
        body: [
          { type: 'p', text: 'After adopting ChatGPT Enterprise, Moderna reported **750 GPTs across the company within two months** — including a Contract Companion, a Policy Bot, and assistants for investor communications. Its clinical **Dose ID** pilot was designed as an assistant to the study team, with references, charts and human-led review.' },
          { type: 'p', text: 'The case shows both the **speed of employee innovation** and the need for **careful scope** in high-consequence work.' },
          { type: 'p', text: 'Fictional Malpani scenario: An employee builds a Meeting Notes Assistant. Its instructions say: use only supplied notes, separate decisions from suggestions, mark missing owners as "unassigned," and never send messages. The owner tests it on clear, incomplete and contradictory notes.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Skills, Custom GPTs and Gems all share what idea?',
        options: ['They generate images', 'A reusable assistant configured for a repeated task', 'They are the same product', 'They replace human review'],
        correct: 1,
        explain: 'The shared idea is a reusable assistant for a repeated task; the platform name matters less than the design.',
      },
      {
        q: 'A good assistant should be defined with…',
        options: ['As many tasks as possible', 'One clear problem, a known user, and rules for what it refuses and when to ask for help', 'No instructions', 'Unlimited secret data'],
        correct: 1,
        explain: 'Focus on one problem for a known user, with refusal rules and escalation to human help.',
      },
      {
        q: '"Reusable does not mean permanent" means…',
        options: ['Assistants never change', 'A named owner must test, update and retire the assistant as things change', 'You should build it once and forget it', 'It works without maintenance'],
        correct: 1,
        explain: 'Policies and formats change; an owner maintains, updates and retires the assistant.',
      },
      {
        q: 'What does Moderna\'s 750 GPTs show?',
        options: ['Employees cannot innovate', 'Fast employee innovation plus the need for careful scope in high-consequence work', 'GPTs are unsafe', 'One assistant should do everything'],
        correct: 1,
        explain: 'Speed of innovation is real, but high-impact assistants must augment human judgement, not replace it.',
      },
      {
        q: 'The Meeting Notes Assistant was told to…',
        options: ['Invent owners and dates', 'Use only supplied notes, mark missing owners "unassigned", and never send messages', 'Send messages automatically', 'Store secrets'],
        correct: 1,
        explain: 'Clear boundaries and a "never send" rule keep it safe; the owner tests difficult cases.',
      },
    ],
    prompts: [
      {
        id: 'p-assistant',
        title: 'Reusable Assistant Blueprint',
        rarity: 'epic',
        text: 'Design a reusable assistant:\nPURPOSE: one clear task.\nUSER: who uses it.\nINPUT: what it needs each time.\nSTEPS: what it does, in order.\nOUTPUT: exact format.\nMUST REFUSE: [e.g. never send messages, never invent owners/dates].\nASK A HUMAN WHEN: [missing data, conflict, sensitive content].\nEXAMPLES: one good case + one difficult case.\nOWNER: who tests, updates and retires it.',
      },
    ],
    missions: [
      {
        id: 'm12-assistant',
        title: 'Blueprint a reusable assistant',
        brief: 'Design a reusable assistant (Skill / Custom GPT / Gem) for one repeated task. Define its purpose, input, steps, output, what it must refuse, when it asks for human help, and who owns it.',
        submitLabel: 'Write your assistant blueprint: purpose, user, input, output, refusal rules, escalation, and owner.',
        minWords: 55,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'One clear purpose and user', keywords: ['purpose', 'one', 'task', 'user', 'problem'], weight: 1 },
          { id: 'r2', label: 'Defines input, steps and output', keywords: ['input', 'step', 'output', 'format', 'process'], weight: 1 },
          { id: 'r3', label: 'Includes refusal / escalation rules', keywords: ['refuse', 'must not', 'never', 'ask', 'human', 'escalate', 'stop'], weight: 1 },
          { id: 'r4', label: 'Names an owner who maintains it', keywords: ['owner', 'test', 'update', 'maintain', 'retire', 'responsible'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 13,
    stage: 'Advanced Toolkit',
    slug: 'connectors',
    title: 'Connectors',
    emoji: '🔌',
    tagline: 'The safest useful connector has the smallest access and asks before acting.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Reading vs acting',
        body: [
          { type: 'p', text: 'A **connector** lets an AI tool work with another approved service — cloud storage, email, calendar, messaging or CRM. It can bring relevant information into the conversation and, in some configurations, **take actions** in that service.' },
          { type: 'p', text: '**Reading and acting are different risk levels.** Finding a permitted file is lower risk than changing sharing permissions, sending an email, issuing a refund or deleting content. Use the **least access needed** and require **confirmation before meaningful external actions**.' },
          { type: 'callout', title: 'REMEMBER', text: 'The safest useful connector has the smallest necessary access and asks before meaningful external action.' },
        ],
      },
      {
        id: 'l2',
        title: 'A connector does not create new permission',
        body: [
          { type: 'p', text: 'A connector operates through **granted access** — it does not invent new permission by itself. But people forget how wide that access is. Review the account, folders, actions, approval settings and logs. **Disconnect access that is no longer needed.**' },
          {
            type: 'table',
            headers: ['Connector', 'Safer pattern'],
            rows: [
              ['Drive search', 'Find permitted notes in one specific approved folder'],
              ['Calendar', 'Draft a meeting proposal, but ask before creating or inviting'],
              ['Email', 'Summarise selected messages without auto-sending a reply'],
              ['CRM', 'Prepare a draft note for review before updating the record'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Morgan Stanley\'s Debrief with review',
        body: [
          { type: 'p', text: 'Morgan Stanley\'s **Debrief** tool turns consented meeting recordings into draft notes, action items and follow-ups. Client notes can be integrated into CRM systems, but advisers **review and adjust** the generated output before finalising.' },
          { type: 'p', text: 'The pattern: source information enters **with consent**, AI prepares structured output, a responsible employee **reviews it**, and only then is the business record finalised.' },
          { type: 'p', text: 'Fictional Malpani scenario: A sales assistant can read approved meeting notes and prepare a CRM update, but cannot send a customer message or change a commercial field without confirmation. The connector is limited to the necessary workspace, and every write is logged.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which is higher risk?',
        options: ['Reading a permitted file', 'Sending an email, issuing a refund or deleting content', 'Searching one folder', 'Summarising a message'],
        correct: 1,
        explain: 'Actions that change or send things are higher risk than reading; they need confirmation.',
      },
      {
        q: 'What access should a connector have?',
        options: ['As much as possible', 'The least access needed', 'Full drive write access always', 'Whatever is default'],
        correct: 1,
        explain: 'Least access, plus confirmation before meaningful external actions.',
      },
      {
        q: 'Does a connector create new permission?',
        options: ['Yes, it grants itself access', 'No — it operates through access already granted', 'Only for email', 'Only on paid plans'],
        correct: 1,
        explain: 'A connector works through granted access; review and disconnect access no longer needed.',
      },
      {
        q: 'The safe CRM pattern is to…',
        options: ['Update the record automatically', 'Prepare a draft note for review before updating', 'Delete old records', 'Send the customer a message first'],
        correct: 1,
        explain: 'Separate drafting from updating by a human review step.',
      },
      {
        q: 'What comes first in Morgan Stanley\'s Debrief workflow?',
        options: ['Automatic CRM update', 'Consent for the source information', 'Sending the client an email', 'Deleting the recording'],
        correct: 1,
        explain: 'Consent and source permission come first; AI drafts, a human reviews, then the record is finalised.',
      },
    ],
    prompts: [
      {
        id: 'p-connector',
        title: 'Connector Least-Access Check',
        rarity: 'rare',
        text: 'Before enabling a connector, ask:\n1. What does it need to READ (which account/folder only)?\n2. What ACTIONS could it take (send, share, edit, delete)?\n3. Grant the SMALLEST access that does the job.\n4. Require confirmation before any send / share / edit / delete.\n5. Is every write logged?\n6. Review access regularly and DISCONNECT what is no longer needed.',
      },
    ],
    missions: [
      {
        id: 'm13-connector-plan',
        title: 'Plan a least-access connector',
        brief: 'Imagine connecting AI to one tool you use (Drive, email, calendar or CRM). Describe the minimum read access it needs, which actions must require your confirmation, and how you would review and disconnect access later.',
        submitLabel: 'Describe the connector, the least access it needs, which actions require confirmation, and your review/disconnect plan.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'Specifies minimum / least read access', keywords: ['least', 'minimum', 'read', 'folder', 'only', 'specific', 'limited'], weight: 1 },
          { id: 'r2', label: 'Requires confirmation before actions', keywords: ['confirm', 'approve', 'before', 'ask', 'send', 'edit', 'delete', 'action'], weight: 1 },
          { id: 'r3', label: 'Mentions logging or review', keywords: ['log', 'review', 'audit', 'record', 'monitor'], weight: 1 },
          { id: 'r4', label: 'Plans to disconnect unused access', keywords: ['disconnect', 'remove', 'revoke', 'no longer', 'unused', 'close'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 14,
    stage: 'Advanced Toolkit',
    slug: 'mcp',
    title: 'MCP (Model Context Protocol)',
    emoji: '🔗',
    tagline: 'A standard doorway to tools — security depends on which doors are opened.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'MCP in plain language',
        body: [
          { type: 'p', text: '**MCP** stands for **Model Context Protocol**. Think of it as a **common connection standard** that helps AI applications talk to approved tools and information sources. Instead of building a different connection for every source, developers can use one shared protocol.' },
          { type: 'callout', title: 'REMEMBER', text: 'MCP gives AI a standard doorway to tools. Security depends on which doors are opened, what is behind them and who controls the key.' },
        ],
      },
      {
        id: 'l2',
        title: 'The questions that matter for non-technical staff',
        body: [
          { type: 'p', text: 'For non-technical employees, the important question is **not how to code MCP**. The important questions are:' },
          { type: 'list', items: [
            'What **data** can the AI see?',
            'What **tools** can it call?',
            'What **actions** can it take?',
            'What **approval** is required?',
            'What **activity is recorded**?',
          ] },
          { type: 'p', text: 'MCP can make an assistant much more capable because it may move **between systems** — which also increases the possible impact of a mistake or a malicious instruction. Only **authorised technical teams** should configure production MCP access, with limited permissions, testing and monitoring.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — MCP as an open standard',
        body: [
          { type: 'p', text: 'Anthropic introduced MCP as an **open standard** for connecting AI assistants with content repositories, business tools and development environments, with early adoption by companies including **Block and Apollo**. Block described open protocols as "bridges between AI and real-world applications."' },
          { type: 'p', text: 'The goal: reduce fragmented custom integrations while enabling more context-aware systems. But **standardisation does not automatically make access safe** — organisations still need ownership, approval, logging and limited tools.' },
          { type: 'p', text: 'Fictional Malpani scenario: An internal policy assistant uses an MCP server to **search** an approved policy library. It can read documents and return sources but cannot **edit** policy files. When a question concerns an exception, it stops and directs the employee to the policy owner.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is MCP?',
        options: ['A programming language', 'Model Context Protocol — a shared standard connecting AI to approved tools and sources', 'A type of file', 'An AI model'],
        correct: 1,
        explain: 'MCP is a common connection standard, reducing the need for a different integration per source.',
      },
      {
        q: 'For non-technical staff, the key questions about MCP are about…',
        options: ['How to write the code', 'What data AI can see, what actions it can take, what approval is required, what is logged', 'The server\'s brand', 'The colour of the interface'],
        correct: 1,
        explain: 'Focus on data, tools, actions, approval and logging — not the coding.',
      },
      {
        q: 'Why does MCP increase possible impact?',
        options: ['It slows AI down', 'An assistant may move between systems, so a mistake or malicious instruction can spread', 'It only reads text', 'It removes all permissions'],
        correct: 1,
        explain: 'More capability across systems means more potential impact; production access needs technical control.',
      },
      {
        q: 'Who should configure production MCP access?',
        options: ['Any employee', 'Authorised technical teams with limited permissions, testing and monitoring', 'The AI itself', 'Customers'],
        correct: 1,
        explain: 'Only authorised technical teams should set up production MCP with least privilege and monitoring.',
      },
      {
        q: 'Does an open standard automatically make access safe?',
        options: ['Yes', 'No — you still need ownership, approval, logging and limited tools', 'Only for Block and Apollo', 'Only for reading'],
        correct: 1,
        explain: 'Standardisation simplifies connections but does not remove the need for permissions and security design.',
      },
    ],
    prompts: [],
    missions: [
      {
        id: 'm14-mcp-boundaries',
        title: 'Map the boundaries of an MCP workflow',
        brief: 'Describe an approved AI assistant that could use MCP in your area (e.g. searching a policy or knowledge library). List what data it may see, what it may only read vs. act on, what needs approval, and what should be logged.',
        submitLabel: 'Describe the workflow and its boundaries: data visible, read-only vs. action, approvals required, and logging.',
        minWords: 50,
        maxXp: 50,
        rubric: [
          { id: 'r1', label: 'States what data the AI can see', keywords: ['data', 'see', 'read', 'access', 'library', 'document', 'record'], weight: 1 },
          { id: 'r2', label: 'Separates read from action', keywords: ['read', 'action', 'edit', 'write', 'only', 'cannot', 'not change', 'act'], weight: 1 },
          { id: 'r3', label: 'Identifies approval / escalation', keywords: ['approval', 'approve', 'exception', 'owner', 'escalate', 'stop', 'authorise'], weight: 1 },
          { id: 'r4', label: 'Mentions logging / monitoring', keywords: ['log', 'record', 'monitor', 'audit', 'track'], weight: 1 },
        ],
      },
    ],
  },
];
