// STAGE 3 — AUTOMATION BUILDER (Builder Levels 1–8)
// Built from "Malpani Group — AI Complete Teaching Guide" v1.0
// Module ids 15–22. Each workshop's "builder output" is a graded submission mission.

export const stage3 = [
  {
    id: 15,
    stage: 'Automation Builder',
    slug: 'select-the-problem',
    title: 'Builder 1 — Select the Right Problem',
    emoji: '🎯',
    tagline: 'Automating confusion just makes confusion run faster.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'Start from the work problem, not the tool',
        body: [
          { type: 'p', text: 'Start with the **work problem**, not the sentence "we should use AI." A suitable first problem occurs **often**, follows **reasonably clear rules**, and produces an **output a person can review**. It has a named owner and measurable pain — delay, rework or inconsistent formatting.' },
          { type: 'callout', title: 'BUILDER RULE — START SMALL', text: 'Begin with a low-risk task that produces a draft or recommendation. Keep a human approval step until performance and risk controls are proven.' },
        ],
      },
      {
        id: 'l2',
        title: 'What to avoid',
        body: [
          { type: 'p', text: 'Avoid beginning with **hiring, termination, safety, legal conclusions, financial approval, sensitive customer decisions or personal judgement**. Also avoid processes nobody can explain — **automating confusion makes confusion run faster**.' },
          {
            type: 'table',
            headers: ['Verdict', 'Example'],
            rows: [
              ['✅ Good start', 'Convert approved meeting notes into a draft action list for owner review'],
              ['⚠️ Needs redesign', 'Automatically send customer promises based on incomplete notes'],
              ['❌ Poor start', 'Decide which employee should be promoted'],
              ['💡 Simpler option', 'Use a reusable prompt before building a multi-system workflow'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Klarna and careful scope',
        body: [
          { type: 'p', text: 'Klarna reported its AI assistant handled **2.3 million conversations** in its first month — about two-thirds of customer-service chats — and reduced average resolution time. High-volume, repeated questions can be attractive automation candidates.' },
          { type: 'p', text: 'But not every conversation carries the same emotional or financial consequence. A responsible design **separates routine requests from cases needing human care, authority or exception handling**.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: What should come first — tool or problem? A: The problem. Q: Should a confusing process be automated immediately? A: No. Takeaway: Select a small, real and measurable problem before selecting an AI capability.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What should come first?',
        options: ['The tool', 'The problem', 'The budget', 'The vendor demo'],
        correct: 1,
        explain: 'Start with a real, measurable problem before choosing an AI capability.',
      },
      {
        q: 'Which is a good first automation problem?',
        options: ['Deciding promotions', 'Sending customer promises automatically', 'Converting approved notes into a draft action list for review', 'A process nobody can explain'],
        correct: 2,
        explain: 'A good first problem is frequent, rule-based, low-risk and produces a reviewable output.',
      },
      {
        q: 'Should you automate a process nobody can clearly explain?',
        options: ['Yes, to save time', 'No — automating confusion makes it run faster', 'Only on weekends', 'Only if it is popular'],
        correct: 1,
        explain: 'Understand and map a process before automating it.',
      },
      {
        q: 'What is the "start small" builder rule?',
        options: ['Automate everything at once', 'Begin low-risk with a draft/recommendation and keep human approval until proven', 'Remove humans immediately', 'Only build large systems'],
        correct: 1,
        explain: 'Start with a low-risk draft output and keep a human approval step.',
      },
      {
        q: 'What does the Klarna case remind us about scope?',
        options: ['Automate every conversation the same way', 'Separate routine requests from cases needing human care, authority or exceptions', 'Never automate service', 'Volume does not matter'],
        correct: 1,
        explain: 'High volume is attractive, but consequence varies — separate routine from sensitive cases.',
      },
    ],
    prompts: [
      {
        id: 'p-scorecard',
        title: 'Problem Selection Scorecard',
        rarity: 'rare',
        text: 'Score a candidate problem before building:\n1. Write the problem WITHOUT mentioning AI or a tool.\n2. Record frequency, time, errors, users and current owner.\n3. Rate rule clarity, data sensitivity, consequence and reviewability.\n4. Identify the smallest low-risk part that could be assisted.\n5. Compare with a non-AI fix (template or process change).\n6. Decide: proceed, redesign or reject — with one reason.',
      },
    ],
    missions: [
      {
        id: 'm15-problem-statement',
        title: 'Workshop output — one-page problem statement',
        brief: 'Select a real process and write a one-page problem statement WITHOUT mentioning AI. Record how often it happens, who owns it, the current pain, and whether the output can be reviewed. End with a proceed / redesign / reject decision and one reason.',
        submitLabel: 'Write your problem statement (frequency, owner, pain, reviewability) and your proceed/redesign/reject decision with a reason.',
        minWords: 60,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'States the problem without leading with AI', keywords: ['problem', 'pain', 'delay', 'rework', 'inconsistent', 'time', 'error', 'often', 'frequent'], weight: 1 },
          { id: 'r2', label: 'Names a current owner', keywords: ['owner', 'responsible', 'team', 'manager', 'handled by'], weight: 1 },
          { id: 'r3', label: 'Confirms the output is reviewable / low-risk', keywords: ['review', 'draft', 'low risk', 'low-risk', 'check', 'reviewable', 'recommendation'], weight: 1 },
          { id: 'r4', label: 'Makes a proceed / redesign / reject decision', keywords: ['proceed', 'redesign', 'reject', 'decision', 'because', 'reason'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 16,
    stage: 'Automation Builder',
    slug: 'map-the-process',
    title: 'Builder 2 — Map the Process',
    emoji: '🗺️',
    tagline: 'You cannot automate responsibly what you have not understood and mapped.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Map how work really happens',
        body: [
          { type: 'p', text: 'A process map tells the story of work from **trigger to result**. Record the input, each step, decision points, systems, people, output and exception path. Speak with the people who **actually perform the work** — written procedures may not show the real shortcuts and corrections.' },
          { type: 'p', text: 'Mark which steps require **judgement** and which are **mechanical**. AI may assist a mechanical transformation, but a decision based on trust, policy exception or emotional context usually stays human.' },
        ],
      },
      {
        id: 'l2',
        title: 'Measure the baseline',
        body: [
          { type: 'p', text: 'Measure the baseline **before** redesigning: time, volume, waiting, rework and error rate. Without a baseline, a team cannot know whether the new workflow is genuinely better.' },
          {
            type: 'table',
            headers: ['Stage', 'Example'],
            rows: [
              ['Trigger', 'A meeting ends and approved notes become available'],
              ['Transformation', 'Notes are organised into decisions and actions'],
              ['Decision', 'The meeting owner confirms owners and deadlines'],
              ['Exception', 'If notes conflict, the workflow stops and asks the organiser'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Morgan Stanley\'s Debrief mapping',
        body: [
          { type: 'p', text: 'Morgan Stanley\'s Debrief workflow begins with a meeting recording and **client consent**. AI produces draft notes, action items and follow-ups; information can enter CRM systems **after adviser review**. Each stage has a different owner and a different risk.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: What is an exception? A: A situation that does not follow the normal path. Q: Why record a baseline? A: To measure improvement. Q: Who validates the map? A: The people who perform and own the process.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Whom should you speak with to map a process accurately?',
        options: ['Only managers', 'The people who actually perform the work', 'The AI vendor', 'Nobody — read the SOP only'],
        correct: 1,
        explain: 'Written procedures miss real shortcuts and corrections; talk to the performers.',
      },
      {
        q: 'Why record a baseline before redesigning?',
        options: ['It is optional decoration', 'To measure whether the new workflow is genuinely better', 'To slow the project down', 'To impress the vendor'],
        correct: 1,
        explain: 'Without a baseline (time, volume, rework, errors) you cannot prove improvement.',
      },
      {
        q: 'Which step usually stays human?',
        options: ['A mechanical format conversion', 'A decision based on trust, policy exception or emotional context', 'Copying text', 'Sorting a list'],
        correct: 1,
        explain: 'Judgement-based decisions stay human; AI may assist mechanical transformations.',
      },
      {
        q: 'What is an exception in a process?',
        options: ['The normal path', 'A situation that does not follow the normal path', 'The final output', 'The trigger'],
        correct: 1,
        explain: 'An exception is a case outside the normal path — the workflow should stop or escalate.',
      },
      {
        q: 'A common mistake when mapping is…',
        options: ['Talking to performers', 'Mapping the official SOP while ignoring how work actually happens', 'Recording a baseline', 'Marking exceptions'],
        correct: 1,
        explain: 'Map the real process, not just the idealised written procedure.',
      },
    ],
    prompts: [
      {
        id: 'p-processmap',
        title: 'Process Map Checklist',
        rarity: 'rare',
        text: 'Map the current process (not the ideal one):\n1. Name the trigger and the final output.\n2. List every step in order — including waiting and rework.\n3. Mark decisions, approvals and exceptions.\n4. Label the data source and owner for each important input.\n5. Record current time, volume and common error points.\n6. Ask the person who performs the work to correct the map.',
      },
    ],
    missions: [
      {
        id: 'm16-process-map',
        title: 'Workshop output — current-state process map',
        brief: 'Map one real process from trigger to output. List the steps in order (including waiting/rework), mark decisions and exceptions, name the data sources and owners, and record a rough baseline (time or volume).',
        submitLabel: 'Describe your process map: trigger, ordered steps, decisions/exceptions, owners, and a baseline measure.',
        minWords: 60,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'Names trigger and final output', keywords: ['trigger', 'output', 'result', 'start', 'end', 'input'], weight: 1 },
          { id: 'r2', label: 'Lists ordered steps including waiting/rework', keywords: ['step', 'order', 'wait', 'rework', 'then', 'next', 'sequence'], weight: 1 },
          { id: 'r3', label: 'Marks decisions / exceptions', keywords: ['decision', 'exception', 'approval', 'if', 'stops', 'escalate'], weight: 1 },
          { id: 'r4', label: 'Records a baseline measure', keywords: ['baseline', 'time', 'volume', 'error', 'minutes', 'hours', 'rate', 'per day', 'per week'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 17,
    stage: 'Automation Builder',
    slug: 'select-capability',
    title: 'Builder 3 — Select the AI Capability',
    emoji: '🧰',
    tagline: 'Complexity is a cost. Add it only when it creates necessary value.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'Match the problem to the lightest useful capability',
        body: [
          { type: 'p', text: 'Choose a **reusable prompt** when the task is simple and the employee supplies context each time. Choose a **Project** when work continues over time. Choose **Vision** when the input is visual. Choose a **reusable assistant** when instructions and output repeat for many users.' },
          { type: 'p', text: 'A **connector** is needed only when the workflow must work with an external approved system. **MCP** may be relevant when authorised technical teams need a standard connection across tools. Every added capability increases maintenance and possible failure paths.' },
        ],
      },
      {
        id: 'l2',
        title: 'Compare more than features',
        body: [
          { type: 'p', text: 'Compare accuracy, **access, cost, speed, user skill and fallback**. A simpler solution is often easier to test, explain and control.' },
          {
            type: 'table',
            headers: ['Capability', 'When it fits'],
            rows: [
              ['Prompt', 'Draft one email from facts the employee supplies'],
              ['Project', 'Prepare recurring reports with maintained context'],
              ['Assistant', 'Apply the same approved structure for many users'],
              ['Connector', 'Retrieve authorised records or prepare an external action'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Moderna tested tools with users',
        body: [
          { type: 'p', text: 'Moderna tested its internal mChat, Microsoft Copilot and ChatGPT Enterprise **with users**, selected the option employees preferred, then let people create reusable GPTs. The lesson: **test tools against actual users and workflows** — the most familiar brand or most complex option is not automatically the best fit.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: When is a connector necessary? A: When approved external data or action is required. Q: Is the most advanced option always best? A: No. Q: What else should be compared besides features? A: Risk, access, maintenance, cost and user fit.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'When is a connector necessary?',
        options: ['Always', 'Only when the workflow needs approved external data or action', 'Never', 'Only for images'],
        correct: 1,
        explain: 'A connector is needed only when you must work with an external approved system.',
      },
      {
        q: 'Is the most advanced capability always best?',
        options: ['Yes', 'No — complexity is a cost; use the lightest option that works', 'Only MCP is best', 'Only Projects are best'],
        correct: 1,
        explain: 'Use the simplest capability that reliably solves the approved problem.',
      },
      {
        q: 'For a simple task where the employee supplies context each time, choose…',
        options: ['MCP', 'A reusable prompt', 'A connector to every system', 'A new database'],
        correct: 1,
        explain: 'A reusable prompt is the lightest fit for a simple, employee-supplied-context task.',
      },
      {
        q: 'Besides features, what should you compare?',
        options: ['Only price', 'Risk, access, maintenance, cost and user fit', 'Only speed', 'Only the brand name'],
        correct: 1,
        explain: 'Compare risk, access, maintenance, cost and user fit — not just features.',
      },
      {
        q: 'What did Moderna\'s tool selection show?',
        options: ['Pick the most famous brand', 'Test tools against real users and workflows', 'Always choose the most complex option', 'Skip user testing'],
        correct: 1,
        explain: 'Test with actual users; the familiar or complex option is not automatically best.',
      },
    ],
    prompts: [
      {
        id: 'p-capability',
        title: 'Capability Decision Matrix',
        rarity: 'rare',
        text: 'Compare at least three options for the mapped process:\n1. Write the MINIMUM capability the task requires.\n2. Compare one non-AI option and two AI options.\n3. Score: context, access, action, risk, maintenance, user effort.\n4. Identify the information and permissions each option needs.\n5. Choose the LIGHTEST option that meets the outcome.\n6. Record what evidence could change the decision later.',
      },
    ],
    missions: [
      {
        id: 'm17-capability',
        title: 'Workshop output — capability decision',
        brief: 'For your mapped process, compare a non-AI option and at least two AI options (prompt, Project, assistant, connector, MCP). Score them on risk, access, maintenance and user fit, then choose the lightest option that meets the outcome — and name who maintains it.',
        submitLabel: 'Compare your options, justify the lightest capability you chose, and name who will maintain it.',
        minWords: 55,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'Compares a non-AI option and AI options', keywords: ['non-ai', 'template', 'prompt', 'project', 'assistant', 'connector', 'mcp', 'option', 'compare'], weight: 1 },
          { id: 'r2', label: 'Considers risk / access / maintenance / cost', keywords: ['risk', 'access', 'maintenance', 'cost', 'user', 'fit', 'permission'], weight: 1 },
          { id: 'r3', label: 'Chooses the lightest option that fits', keywords: ['lightest', 'simplest', 'chose', 'choose', 'select', 'minimum', 'because'], weight: 1 },
          { id: 'r4', label: 'Names a maintainer', keywords: ['owner', 'maintain', 'responsible', 'who will', 'support'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 18,
    stage: 'Automation Builder',
    slug: 'design-human-control',
    title: 'Builder 4 — Design Human Control',
    emoji: '🕹️',
    tagline: 'A person who automatically clicks approve is not meaningful oversight.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'Four levels of AI involvement',
        body: [
          { type: 'p', text: 'AI can **assist**, **recommend**, **prepare an action for approval**, or **act automatically**. Most first workflows should stay in the first three levels. Full automatic action is appropriate only when risk is low, rules are stable, monitoring is strong and organisational approval is explicit.' },
          {
            type: 'table',
            headers: ['Level', 'Example'],
            rows: [
              ['Assist', 'AI drafts; employee rewrites and sends'],
              ['Recommend', 'AI compares evidence; an authorised committee decides'],
              ['Act with approval', 'AI prepares a CRM change; the owner confirms'],
              ['Automatic', 'Approved low-risk internal formatting, after testing and monitoring'],
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'Meaningful review needs more than an approve button',
        body: [
          { type: 'p', text: 'Human-in-the-loop means more than an "approve" button at the end. The reviewer needs the **source, the AI output, the uncertainty, the changed fields, and enough time** to make a real decision. A person who automatically clicks approve is **not** meaningful oversight.' },
          { type: 'p', text: 'Define **escalation**: missing data, conflicting instructions, sensitive content, low confidence, unusual values and customer complaints should stop the workflow or route it to the right owner.' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Moderna\'s Dose ID kept judgement human',
        body: [
          { type: 'p', text: 'Moderna\'s **Dose ID** GPT analysed and visualised clinical data with supporting rationale — designed as an **assistant to the clinical study team**, with detailed human-led review before further decisions. Human oversight was part of the design, not a correction added later.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: What is meaningful human review? A: A person has evidence, time, understanding and authority. Q: Where should review occur? A: Before a consequential action. Q: What should happen on an unusual case? A: Stop or escalate.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Most first workflows should stay in which levels?',
        options: ['Automatic only', 'Assist, recommend, or act-with-approval', 'None — full automation immediately', 'Recommend only'],
        correct: 1,
        explain: 'Keep humans in control; full automatic action needs low risk, stable rules, monitoring and explicit approval.',
      },
      {
        q: 'What makes human review meaningful?',
        options: ['An approve button at the end', 'The reviewer has source, output, uncertainty, changed fields and enough time', 'Clicking approve quickly', 'Reviewing after the action'],
        correct: 1,
        explain: 'Meaningful review means the reviewer can genuinely detect an error and change the outcome.',
      },
      {
        q: 'Where should review occur?',
        options: ['After the consequence', 'Before each meaningful consequence', 'Only monthly', 'Never'],
        correct: 1,
        explain: 'Place human review before consequential actions.',
      },
      {
        q: 'What should happen on an unusual or low-confidence case?',
        options: ['Proceed anyway', 'Stop or escalate to the right owner', 'Delete the record', 'Ignore it'],
        correct: 1,
        explain: 'Escalation conditions (missing data, conflict, low confidence, complaints) should stop or route the workflow.',
      },
      {
        q: 'What was notable about Moderna\'s Dose ID?',
        options: ['It removed human judgement', 'Human oversight was designed in, not added after deployment', 'It made final clinical decisions', 'It had no review'],
        correct: 1,
        explain: 'It assisted the team while preserving professional judgement by design.',
      },
    ],
    prompts: [
      {
        id: 'p-control',
        title: 'Human-Control Design',
        rarity: 'epic',
        text: 'Add human control to a workflow:\n1. Classify it: assist / recommend / act-with-approval / automatic.\n2. List every possible consequence (customers, employees, money, systems).\n3. Place review BEFORE each meaningful consequence.\n4. Define exactly what evidence the reviewer sees.\n5. Write five STOP or escalation conditions.\n6. Name who can approve and who can DISABLE the workflow.',
      },
    ],
    missions: [
      {
        id: 'm18-control-plan',
        title: 'Workshop output — human-control plan',
        brief: 'For your workflow, classify its level (assist / recommend / act-with-approval / automatic), place a review step before each consequence, list what the reviewer sees, write at least three stop/escalation conditions, and name who can approve and who can disable it.',
        submitLabel: 'Describe your control plan: involvement level, review points, escalation conditions, and named approver + disabler.',
        minWords: 60,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'Classifies the involvement level', keywords: ['assist', 'recommend', 'approval', 'automatic', 'level'], weight: 1 },
          { id: 'r2', label: 'Places review before consequences', keywords: ['review', 'before', 'approve', 'check', 'consequence', 'human'], weight: 1 },
          { id: 'r3', label: 'Writes stop / escalation conditions', keywords: ['stop', 'escalate', 'missing', 'conflict', 'low confidence', 'unusual', 'sensitive', 'complaint'], weight: 1 },
          { id: 'r4', label: 'Names approver and who can disable it', keywords: ['approve', 'approver', 'disable', 'stop', 'owner', 'authority', 'who can'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 19,
    stage: 'Automation Builder',
    slug: 'build-and-test',
    title: 'Builder 5 — Build and Test',
    emoji: '🧪',
    tagline: 'A prototype is not ready because it worked once.',
    accent: 'green',
    lessons: [
      {
        id: 'l1',
        title: 'Build with safe data and clear rules',
        body: [
          { type: 'p', text: 'Build first with **fictional or approved sample data**. Define required fields, output format, prohibited actions and escalation rules. Add deterministic checks where possible — required columns, allowed values, totals and date formats.' },
          { type: 'callout', title: 'SAFE FAILURE', text: 'A workflow must fail safely. If it cannot complete the task, it should stop, preserve the original information and tell the user what is missing. It should not invent information to keep the process moving.' },
        ],
      },
      {
        id: 'l2',
        title: 'Test the hard cases, not just the happy path',
        body: [
          { type: 'p', text: 'Testing must include **normal cases and edge cases**: missing information, conflicting records, unusual values, unclear images, long inputs, and attempts to make the AI ignore its rules. Record the expected result, actual result, reviewer correction and severity.' },
          {
            type: 'table',
            headers: ['Case type', 'Expected behaviour'],
            rows: [
              ['Normal', 'Complete approved notes produce a correctly formatted draft'],
              ['Missing', 'No owner supplied → output marks "unassigned" instead of guessing'],
              ['Conflict', 'Two dates disagree → workflow stops for confirmation'],
              ['Unsafe', 'Input requests confidential disclosure → workflow refuses and escalates'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Morgan Stanley\'s daily regression testing',
        body: [
          { type: 'p', text: 'Morgan Stanley tested AI summaries and retrieval against expert expectations. For Debrief, it built **evaluation data** for different meeting types and checked whether important action items were captured **without adding errors** — plus **daily regression testing** to catch new weaknesses.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: What is an edge case? A: An unusual or difficult situation outside the normal path. Q: What is safe failure? A: Stop and explain rather than invent or act unsafely. Q: Should tests be rerun after a change? A: Yes.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What data should you build and test with first?',
        options: ['Live confidential data', 'Fictional or approved sample data', 'Random internet data', 'Customer bank details'],
        correct: 1,
        explain: 'Build first with fictional or approved sample data, never live confidential data.',
      },
      {
        q: 'What is "safe failure"?',
        options: ['Inventing a value to keep going', 'Stopping, preserving the original and explaining what is missing', 'Deleting the input', 'Sending anyway'],
        correct: 1,
        explain: 'A safe workflow stops and explains rather than inventing information.',
      },
      {
        q: 'Which is an edge case you should test?',
        options: ['Perfect, complete input', 'Missing, conflicting, unusual or unsafe-instruction input', 'Only the happy path', 'Nothing'],
        correct: 1,
        explain: 'Test missing data, conflicts, unusual values, unclear images and rule-breaking attempts.',
      },
      {
        q: 'After changing the workflow, you should…',
        options: ['Ship it immediately', 'Rerun all tests — a fix can break a previously passing case', 'Only test the new part', 'Stop testing'],
        correct: 1,
        explain: 'Retest everything after changes; regression testing catches new weaknesses.',
      },
      {
        q: 'Is a prototype ready because it worked once?',
        options: ['Yes', 'No — repeated, documented testing creates the evidence', 'Only for images', 'Only if the demo looked good'],
        correct: 1,
        explain: 'Repeated, documented testing — including edge cases — is what makes a prototype trustworthy.',
      },
    ],
    prompts: [
      {
        id: 'p-testlab',
        title: 'Ten-Case Test Lab',
        rarity: 'epic',
        text: 'Test a prototype against a planned scenario set:\n1. Write the expected output for three NORMAL cases.\n2. Add two MISSING-data and two CONFLICTING-data cases.\n3. Add one SENSITIVE-data and one UNSAFE-instruction case.\n4. Add one EXTREME/unusual case.\n5. Record actual output, correction and severity.\n6. Update the instructions or control, then RERUN all cases.',
      },
    ],
    missions: [
      {
        id: 'm19-test-log',
        title: 'Workshop output — scenario test log',
        brief: 'Take a prototype or written simulation of your workflow. Write at least three normal cases and several edge cases (missing data, conflict, unsafe instruction). For each, record the expected result, the actual result, and a fix. Confirm the workflow fails safely.',
        submitLabel: 'Share your test log: normal + edge cases, expected vs actual, fixes, and how the workflow fails safely.',
        minWords: 60,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'Includes normal cases', keywords: ['normal', 'expected', 'complete', 'happy', 'standard'], weight: 1 },
          { id: 'r2', label: 'Includes edge cases (missing/conflict/unsafe)', keywords: ['missing', 'conflict', 'unsafe', 'edge', 'unusual', 'sensitive', 'extreme'], weight: 1 },
          { id: 'r3', label: 'Records expected vs actual and a fix', keywords: ['expected', 'actual', 'result', 'correction', 'fix', 'severity', 'rerun'], weight: 1 },
          { id: 'r4', label: 'Confirms safe failure', keywords: ['safe', 'stop', 'fail safely', 'not invent', 'preserve', 'escalate', 'missing'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 20,
    stage: 'Automation Builder',
    slug: 'security-approval',
    title: 'Builder 6 — Security & Approval',
    emoji: '🔐',
    tagline: 'A working demo is not permission to use live data.',
    accent: 'yellow',
    lessons: [
      {
        id: 'l1',
        title: 'Security begins with data and actions',
        body: [
          { type: 'p', text: 'List every input, storage location, connected account, output recipient and action a workflow can reach. **Remove unnecessary access.** Use approved organisational accounts and follow retention, logging and vendor requirements.' },
          { type: 'callout', title: 'NO APPROVAL, NO DEPLOYMENT', text: 'A working demonstration is not permission to use live company data or take external actions.' },
        ],
      },
      {
        id: 'l2',
        title: 'Different owners answer different questions',
        body: [
          { type: 'p', text: 'The **business owner** confirms value and process. The **system owner** controls access. **IT / security** assesses technical risk. **HR, legal, finance or privacy** specialists review relevant consequences. Approval should be **documented, not assumed**.' },
          {
            type: 'table',
            headers: ['Area', 'Safer choice'],
            rows: [
              ['Data', 'Use anonymised test data before approved production data'],
              ['Permission', 'Grant read-only folder access instead of whole-drive write access'],
              ['Action', 'Require confirmation before send, share, delete or financial change'],
              ['Ownership', 'Name both a business and a technical owner'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — BBVA scaled through governance',
        body: [
          { type: 'p', text: 'BBVA described **trust, governance and structured learning** as central to scaling enterprise AI, aligning security, legal, compliance and technology teams while giving employees secure enterprise access and formal enablement.' },
          { type: 'p', text: 'Giving employees an **approved path** reduces pressure to experiment with unapproved tools and makes ownership clearer.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: What is least privilege? A: Only the minimum access required. Q: Does a prototype authorise production use? A: No. Q: Who can stop the workflow? A: A named authorised owner.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'What is "least privilege"?',
        options: ['Maximum access for convenience', 'Only the minimum access required', 'No access at all', 'Whole-drive write access'],
        correct: 1,
        explain: 'Grant only the minimum access the workflow needs — e.g. read-only over one folder.',
      },
      {
        q: 'Does a working prototype authorise production use?',
        options: ['Yes', 'No — required owners must explicitly approve live use', 'Only for internal tasks', 'Only if the demo was good'],
        correct: 1,
        explain: 'No approval, no deployment: a demo is not permission to use live data.',
      },
      {
        q: 'Who reviews technical risk?',
        options: ['The business owner alone', 'IT / security', 'The AI itself', 'Nobody'],
        correct: 1,
        explain: 'Different owners answer different questions; IT/security assesses technical risk.',
      },
      {
        q: 'A common mistake in approval is…',
        options: ['Documenting approvals', 'Treating the tool vendor\'s security claims as company approval', 'Limiting permissions', 'Naming owners'],
        correct: 1,
        explain: 'Vendor security claims are not the same as your organisation\'s documented approval.',
      },
      {
        q: 'What did BBVA\'s approach show?',
        options: ['Governance slows everything down', 'Adoption and governance support each other; an approved path reduces risky shadow use', 'Skip legal and compliance', 'Employees should use any tool'],
        correct: 1,
        explain: 'An approved, governed path makes ownership clear and reduces unapproved experimentation.',
      },
    ],
    prompts: [
      {
        id: 'p-approval',
        title: 'Pre-Deployment Approval Canvas',
        rarity: 'legendary',
        text: 'Complete BEFORE using live data:\nPROBLEM / OWNER: what and who is accountable.\nINPUTS: what information enters.\nSENSITIVE DATA: what must be removed, protected or prohibited.\nAI TASK: what it drafts, classifies, extracts or recommends.\nHUMAN APPROVAL: who checks before action.\nEXCEPTIONS: when it must stop or escalate.\nPERMISSIONS: reduced to the minimum necessary.\nAPPROVALS: which business, IT, security, legal, HR or finance owners must sign off.\nLOGGING + SHUTDOWN: how activity is recorded and who can stop it.',
      },
    ],
    missions: [
      {
        id: 'm20-approval',
        title: 'Workshop output — security & approval checklist',
        brief: 'Complete an approval canvas for your workflow: inventory the data, accounts, outputs and actions; classify sensitive data; reduce permissions to the minimum; list which owners (business, IT, security, legal, HR, finance) must approve; and define logging plus who can shut it down.',
        submitLabel: 'Share your security & approval checklist: data inventory, minimum permissions, required approvers, and shutdown/logging plan.',
        minWords: 60,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'Inventories data / accounts / actions', keywords: ['data', 'account', 'input', 'output', 'action', 'inventory', 'storage'], weight: 1 },
          { id: 'r2', label: 'Applies least privilege', keywords: ['least', 'minimum', 'read-only', 'read only', 'reduce', 'limit', 'privilege'], weight: 1 },
          { id: 'r3', label: 'Lists required approvers', keywords: ['approve', 'approver', 'business', 'it', 'security', 'legal', 'hr', 'finance', 'sign off', 'owner'], weight: 1 },
          { id: 'r4', label: 'Defines logging + emergency shutdown', keywords: ['log', 'monitor', 'shutdown', 'stop', 'disable', 'incident', 'record'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 21,
    stage: 'Automation Builder',
    slug: 'measure-result',
    title: 'Builder 7 — Measure the Result',
    emoji: '📊',
    tagline: 'Faster work that needs more correction may not be an improvement.',
    accent: 'cyan',
    lessons: [
      {
        id: 'l1',
        title: 'Time saved is only one measure',
        body: [
          { type: 'p', text: 'Faster work that needs more correction or creates customer frustration may not be an improvement. Measure **completion time, output quality, error severity, human corrections, user satisfaction, and any privacy or security incidents**.' },
          { type: 'callout', title: 'REMEMBER', text: 'Measure the outcome users experience, not merely the number of AI interactions.' },
        ],
      },
      {
        id: 'l2',
        title: 'Fair comparison and honest trade-offs',
        body: [
          { type: 'p', text: 'Use a **fair comparison** — the same task, sample and quality standard for the old and new process. Record enough cases to avoid drawing a conclusion from one unusually easy example.' },
          { type: 'p', text: 'Report uncertainty and trade-offs. A workflow may save time for routine cases while performing poorly on exceptions. The right decision may be to **narrow the scope** rather than scale or abandon everything.' },
          {
            type: 'table',
            headers: ['Measure', 'Example'],
            rows: [
              ['Speed', 'Median minutes per completed task'],
              ['Quality', 'Percentage meeting an agreed review standard'],
              ['Correction', 'Average number and seriousness of human edits'],
              ['Experience', 'Employee and customer feedback, including escalation quality'],
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — a controlled Copilot study',
        body: [
          { type: 'p', text: 'In a controlled experiment, developers using **GitHub Copilot completed a defined task 55.8% faster** on average than a control group. It is useful because it compared defined groups and a defined task — but it does **not** prove every employee, task or organisation will see the same result.' },
          { type: 'p', text: 'Local pilots must measure their **own** context and quality.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: Should speed be measured alone? A: No. Q: Why set thresholds before the pilot? A: To reduce biased judgement after seeing results. Q: Does an external study prove local value? A: No.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'Should speed be measured alone?',
        options: ['Yes', 'No — also measure quality, corrections, experience and incidents', 'Only speed matters', 'Only cost matters'],
        correct: 1,
        explain: 'Faster but lower-quality or more-corrected work may not be an improvement.',
      },
      {
        q: 'Why set acceptable thresholds BEFORE the pilot?',
        options: ['To slow it down', 'To reduce biased judgement after seeing the results', 'It is not needed', 'To impress the vendor'],
        correct: 1,
        explain: 'Deciding thresholds in advance reduces bias when interpreting results.',
      },
      {
        q: 'Does an external study prove local value?',
        options: ['Yes, always', 'No — local pilots must measure their own context and quality', 'Only for developers', 'Only if it is recent'],
        correct: 1,
        explain: 'A controlled study (like the 55.8% Copilot result) does not guarantee the same locally.',
      },
      {
        q: 'If a workflow helps routine cases but fails on exceptions, a good decision may be to…',
        options: ['Scale it everywhere', 'Narrow the scope', 'Abandon everything', 'Ignore the exceptions'],
        correct: 1,
        explain: 'Narrowing scope can be the right call rather than scaling or abandoning wholesale.',
      },
      {
        q: 'A fair comparison uses…',
        options: ['Different tasks for old and new', 'The same task, sample and quality standard, with enough cases', 'One easy example', 'Only the new process'],
        correct: 1,
        explain: 'Compare like-for-like with enough cases to avoid a misleading single example.',
      },
    ],
    prompts: [
      {
        id: 'p-measure',
        title: 'Measurement Plan & Decision Gate',
        rarity: 'epic',
        text: 'Define how you will know the workflow truly improves work:\n1. Record the baseline task, sample, time, quality and error method.\n2. Choose at least one SPEED, QUALITY, CORRECTION and EXPERIENCE measure.\n3. Define the pilot duration and minimum number of cases.\n4. Set acceptable and unacceptable thresholds BEFORE the pilot.\n5. Record exceptions and incidents separately.\n6. Define continue / narrow / revise / stop criteria.',
      },
    ],
    missions: [
      {
        id: 'm21-measure',
        title: 'Workshop output — measurement plan',
        brief: 'Write a before-and-after measurement plan for your workflow. Include a speed measure, a quality measure, a correction measure and an experience measure; set thresholds before the pilot; and define continue/narrow/revise/stop criteria.',
        submitLabel: 'Share your measurement plan: baseline, the four measures, pre-set thresholds, and your decision criteria.',
        minWords: 55,
        maxXp: 55,
        rubric: [
          { id: 'r1', label: 'Records a baseline', keywords: ['baseline', 'before', 'current', 'sample', 'existing'], weight: 1 },
          { id: 'r2', label: 'Measures beyond speed (quality/correction/experience)', keywords: ['quality', 'correction', 'experience', 'error', 'satisfaction', 'feedback', 'incident'], weight: 1 },
          { id: 'r3', label: 'Sets thresholds before the pilot', keywords: ['threshold', 'before', 'acceptable', 'target', 'in advance', 'pre'], weight: 1 },
          { id: 'r4', label: 'Defines continue / narrow / revise / stop', keywords: ['continue', 'narrow', 'revise', 'stop', 'decision', 'criteria', 'scale'], weight: 1 },
        ],
      },
    ],
  },

  {
    id: 22,
    stage: 'Automation Builder',
    slug: 'automation-capstone',
    title: 'Builder 8 — Automation Capstone',
    emoji: '👑',
    tagline: 'Responsible automation is owned, testable, measurable, reviewable and approved — not merely impressive.',
    accent: 'pink',
    lessons: [
      {
        id: 'l1',
        title: 'Evidence of responsible problem-solving',
        body: [
          { type: 'p', text: 'The capstone is **evidence of responsible problem-solving**, not a competition for the most complex automation. A strong project solves a real low-risk problem, uses the smallest suitable capability, shows test evidence, and makes **human responsibility visible**.' },
          { type: 'callout', title: 'REMEMBER', text: 'A responsible automation is owned, testable, measurable, reviewable and approved — not merely impressive.' },
        ],
      },
      {
        id: 'l2',
        title: 'What the presentation must show',
        body: [
          { type: 'p', text: 'The presentation should explain the **old process, the problem, the proposed workflow, information used, controls, results, limitations, owner and requested decision**. Demonstrate both a **normal case** and a case where the workflow **stops or escalates**.' },
          { type: 'p', text: 'Possible decisions: approve a limited pilot, request changes, restrict the scope, keep it as a manual assistant, or reject deployment. **Every decision can be a valid learning outcome.**' },
        ],
      },
      {
        id: 'l3',
        title: 'Case study — Moderna\'s complete operating model',
        body: [
          { type: 'p', text: 'Moderna\'s broader programme combined **learning, internal champions, enterprise access and hundreds of employee-created GPTs** — from policy explanation and contract summaries to a clinical analysis assistant supporting human judgement.' },
          { type: 'p', text: 'Sustainable AI adoption is a **system of people, tools, governance and learning**. A capstone should include the human operating model, not only a technical demonstration.' },
          { type: 'callout', title: 'KNOWLEDGE CHECK', text: 'Q: What makes a capstone successful? A: Useful value, evidence, safety, ownership and honest limits. Q: Must every capstone be deployed? A: No. Q: What should the presentation demonstrate besides success? A: Safe failure or escalation.' },
        ],
      },
    ],
    quiz: [
      {
        q: 'A successful capstone is judged on…',
        options: ['Maximum complexity', 'Useful value, evidence, safety, ownership and honest limits', 'The number of systems connected', 'How impressive the demo looks'],
        correct: 1,
        explain: 'Careful scope, evidence, safety and honest limitations matter more than complexity.',
      },
      {
        q: 'Must every capstone be deployed?',
        options: ['Yes', 'No — reject, restrict or manual-only can be valid outcomes', 'Only if it is complex', 'Only if the panel likes it'],
        correct: 1,
        explain: 'Every decision, including rejection, can be a valid learning outcome.',
      },
      {
        q: 'Besides a success case, the demo must show…',
        options: ['Only the happy path', 'A case where the workflow stops or escalates (safe failure)', 'A marketing video', 'The source code'],
        correct: 1,
        explain: 'Demonstrate safe failure or escalation, not only the successful case.',
      },
      {
        q: 'A common mistake in the capstone is…',
        options: ['Showing edge-case failures', 'Presenting only the successful demo and hiding edge-case failures', 'Naming an owner', 'Requesting a decision'],
        correct: 1,
        explain: 'Hiding edge-case failures undermines trust; honesty about limits is part of success.',
      },
      {
        q: 'What does Moderna\'s programme show about sustainable adoption?',
        options: ['It is only about technology', 'It is a system of people, tools, governance and learning', 'Champions are unnecessary', 'Governance can be skipped'],
        correct: 1,
        explain: 'Sustainable adoption combines people, tools, governance and learning — include the human operating model.',
      },
    ],
    prompts: [
      {
        id: 'p-capstone',
        title: 'Capstone Presentation Pack',
        rarity: 'legendary',
        text: 'Present one workflow to a panel:\n1. Problem, owner, baseline and current process.\n2. Selected capability — and why simpler/more complex options were rejected.\n3. Demonstrate a NORMAL case and a STOP/escalation case.\n4. Permissions, human controls, test results and known limitations.\n5. Measurement and monitoring plans.\n6. Request a clear decision: pilot / revise / restrict / manual-only / reject.\n7. Record conditions and the next review date.',
      },
    ],
    missions: [
      {
        id: 'm22-capstone',
        title: 'Capstone — present your responsible automation',
        brief: 'Bring together your problem, process map, capability choice, human controls, testing, security/approval and measurement into one capstone. Explain the value AND the limitations, describe a normal case and a stop/escalation case, name the owner, and state the decision you are requesting.',
        submitLabel: 'Present your full capstone: problem, workflow, controls, test evidence, honest limits, owner, and the decision you request.',
        minWords: 80,
        maxXp: 70,
        rubric: [
          { id: 'r1', label: 'Covers problem, workflow and capability choice', keywords: ['problem', 'workflow', 'process', 'capability', 'solution', 'baseline'], weight: 1 },
          { id: 'r2', label: 'Shows human controls and safe failure', keywords: ['review', 'approve', 'control', 'stop', 'escalate', 'safe', 'human', 'normal case'], weight: 1 },
          { id: 'r3', label: 'Includes test evidence and honest limitations', keywords: ['test', 'evidence', 'limitation', 'limit', 'known', 'weakness', 'measure'], weight: 1 },
          { id: 'r4', label: 'Names owner and requests a decision', keywords: ['owner', 'decision', 'pilot', 'revise', 'restrict', 'manual', 'reject', 'request', 'approval'], weight: 1 },
        ],
      },
    ],
  },
];
