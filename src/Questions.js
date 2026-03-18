export const OPTION_SCALE_MAX = 3;

const questions = [
  {
    id: 1,
    construct: "Analytical Thinking",
    area: "Analytical Autonomy",
    prompt:
      "Scenario: A production bug appears and users are blocked. What is your first response pattern?",
    recommendation:
      "For the next 2 weeks, run a 10-minute manual root-cause pass before opening any AI assistant.",
    options: [
      {
        value: 0,
        title: "AI-first immediate fix",
        scenario:
          "I paste traces into AI immediately and apply the first plausible fix.",
      },
      {
        value: 1,
        title: "Minimal local check",
        scenario:
          "I do a quick local scan, then depend on AI for diagnosis and patch strategy.",
      },
      {
        value: 2,
        title: "Hybrid diagnosis",
        scenario: "I run my own trace first, then use AI to validate alternative causes.",
      },
      {
        value: 3,
        title: "Manual root-cause first",
        scenario: "I isolate the cause myself and only use AI for secondary review.",
      },
    ],
  },
  {
    id: 2,
    construct: "Cognitive Offloading",
    area: "Memory Retention",
    prompt:
      "Scenario: Your IDE assistance is temporarily unavailable. How do you continue coding?",
    recommendation:
      "Keep a short daily recall log: rewrite 3 key APIs from memory before coding.",
    options: [
      {
        value: 0,
        title: "Memory replaced by tools",
        scenario:
          "Without AI/autocomplete, I frequently stall and wait for hints.",
      },
      {
        value: 1,
        title: "Partial recall only",
        scenario: "I remember fragments but depend on AI to complete most syntax/API usage.",
      },
      {
        value: 2,
        title: "Mostly independent recall",
        scenario: "I usually recall what I need; AI is mostly a speed-up.",
      },
      {
        value: 3,
        title: "Strong internal recall",
        scenario: "I can rebuild key syntax and APIs from memory before checking tools.",
      },
    ],
  },
  {
    id: 3,
    construct: "Problem Solving",
    area: "Metacognitive Depth",
    prompt:
      "Scenario: You receive an ambiguous feature request with unclear constraints. What do you do first?",
    recommendation:
      "Use a 3-step scratch ritual: define constraints, list 2 approaches, then consult AI.",
    options: [
      {
        value: 0,
        title: "Full delegation",
        scenario: "I ask AI for full architecture and steps before I frame the problem.",
      },
      {
        value: 1,
        title: "Shallow decomposition",
        scenario: "I define the problem loosely, then depend on AI for actual structure.",
      },
      {
        value: 2,
        title: "Structured collaboration",
        scenario: "I break the problem down first, then use AI to compare approaches.",
      },
      {
        value: 3,
        title: "Self-led decomposition",
        scenario: "I generate and evaluate my own plan before using AI at all.",
      },
    ],
  },
  {
    id: 4,
    construct: "Autonomous Execution",
    area: "From-Scratch Confidence",
    prompt:
      "Scenario: You must build a small feature in an unfamiliar area. How do you begin?",
    recommendation:
      "Block one weekly no-AI coding session focused on small end-to-end implementation.",
    options: [
      {
        value: 0,
        title: "Cannot start without AI",
        scenario: "I feel blocked on blank screens unless AI gives me the initial structure.",
      },
      {
        value: 1,
        title: "AI-dependent kickoff",
        scenario: "I can outline lightly, but still need AI to start implementation confidently.",
      },
      {
        value: 2,
        title: "Independent kickoff",
        scenario: "I can start and make progress solo; AI helps refine and accelerate later.",
      },
      {
        value: 3,
        title: "Strong from-scratch confidence",
        scenario: "I can solve and ship small-medium tasks independently before AI input.",
      },
    ],
  },
  {
    id: 5,
    construct: "Creativity & Synthesis",
    area: "Idea Generation",
    prompt:
      "Scenario: Product asks for three novel feature ideas by end of day. What is your ideation approach?",
    recommendation:
      "Draft 5 raw ideas yourself before asking AI to expand or critique them.",
    options: [
      {
        value: 0,
        title: "AI generates idea zero",
        scenario: "My first viable ideas usually come directly from AI prompts.",
      },
      {
        value: 1,
        title: "AI shapes initial direction",
        scenario: "I start with broad context, but AI still creates most of the concept set.",
      },
      {
        value: 2,
        title: "Human-first ideation",
        scenario: "I draft core ideas myself, then use AI to challenge and expand them.",
      },
      {
        value: 3,
        title: "Strong synthesis muscle",
        scenario: "I can produce diverse ideas from user/system signals before asking AI.",
      },
    ],
  },
  {
    id: 6,
    construct: "Systems Thinking",
    area: "Architecture Comprehension",
    prompt:
      "Scenario: AI gives a large refactor that appears to pass tests. How do you decide whether to merge?",
    recommendation:
      "Adopt a merge gate: explain integration path and 2 failure cases before accepting AI output.",
    options: [
      {
        value: 0,
        title: "Blind integration risk",
        scenario: "I often accept AI code while not fully understanding architecture impact.",
      },
      {
        value: 1,
        title: "Partial understanding",
        scenario: "I check basics, but edge cases and failure paths are frequently unclear.",
      },
      {
        value: 2,
        title: "Reasoned integration",
        scenario: "I validate flow and key failure modes before integrating AI output.",
      },
      {
        value: 3,
        title: "Architecture ownership",
        scenario: "I can explain full system fit and risks before any AI-generated merge.",
      },
    ],
  },
  {
    id: 7,
    construct: "Brain Debug Muscle",
    area: "Debugging Muscle",
    prompt:
      "Scenario: A recurring bug returns for the third time this sprint. What debugging workflow do you follow?",
    recommendation:
      "For recurring bugs, force a debugger-first workflow before using auto-fix suggestions.",
    options: [
      {
        value: 0,
        title: "Auto-fix default",
        scenario: "I rely on quick-fix tools first, even for repeated bug patterns.",
      },
      {
        value: 1,
        title: "Debugger as backup",
        scenario: "I try quick-fix first and only debug manually when the patch fails.",
      },
      {
        value: 2,
        title: "Balanced debugging",
        scenario: "I inspect runtime behavior first, then use tool fixes to speed cleanup.",
      },
      {
        value: 3,
        title: "Debugger-first discipline",
        scenario: "I reproduce and trace with breakpoints/logs before any auto-fix.",
      },
    ],
  },
];

export default questions;
