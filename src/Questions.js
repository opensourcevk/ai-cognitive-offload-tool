export const OPTION_SCALE_MAX = 3;

const questions = [
  {
    id: 1,
    construct: "Working Memory",
    area: "Syntactic Recall",
    prompt:
      "Scenario: You need to write a complex data transformation (e.g., mapping, filtering, and reducing a nested JSON array). How do you approach this?",
    recommendation:
      "Turn off autocomplete for 30 minutes daily. Force yourself to recall standard library methods and syntax from memory.",
    options: [
      {
        value: 0,
        title: "Total Prompting",
        scenario: "I describe the data structure to an AI and copy-paste the generated one-liner without writing it myself.",
      },
      {
        value: 1,
        title: "Autocomplete Dependence",
        scenario: "I start typing, but rely heavily on AI inline suggestions (e.g., Copilot) to complete the logic and method chains.",
      },
      {
        value: 2,
        title: "Guided Recall",
        scenario: "I write the logic manually, only consulting AI or docs to verify a specific method signature (like reduce arguments).",
      },
      {
        value: 3,
        title: "Independent Recall",
        scenario: "I write the entire transformation pipeline from memory, completely independent of AI or autocomplete.",
      },
    ],
  },
  {
    id: 2,
    construct: "Problem Solving",
    area: "Diagnostic Resilience",
    prompt:
      "Scenario: Your CI/CD pipeline fails intermittently with a cryptic 'Race Condition / Timeout' error during integration tests. How do you troubleshoot?",
    recommendation:
      "Before pasting logs into an AI, spend 15 minutes manually tracing the execution path and forming your own hypothesis.",
    options: [
      {
        value: 0,
        title: "Blind Delegation",
        scenario: "I immediately paste the raw error log into an AI and ask for the fix, trying whatever it suggests first.",
      },
      {
        value: 1,
        title: "AI-Led Hypothesis",
        scenario: "I skim the logs, but ask AI to generate possible causes and follow its debugging plan step-by-step.",
      },
      {
        value: 2,
        title: "Human-Led, AI-Assisted",
        scenario: "I trace the failure to a specific test, then use AI only to explain a specific obscure framework error.",
      },
      {
        value: 3,
        title: "Manual Root-Cause Analysis",
        scenario: "I read the logs, attach a debugger, and manually isolate the race condition to understand the true root cause.",
      },
    ],
  },
  {
    id: 3,
    construct: "Systems Thinking",
    area: "Code Comprehension",
    prompt:
      "Scenario: You are assigned to review a large Pull Request containing a significant architectural change in an unfamiliar domain.",
    recommendation:
      "Review the PR manually by drawing a simple block diagram of the data flow before looking at any AI-generated summaries.",
    options: [
      {
        value: 0,
        title: "AI Summary Approval",
        scenario: "I ask an AI to summarize the PR. If the summary sounds good and tests pass, I approve it.",
      },
      {
        value: 1,
        title: "Fragmented Reading",
        scenario: "I read the code, but whenever I see a complex file, I ask an AI to explain it rather than tracing the imports and logic.",
      },
      {
        value: 2,
        title: "Targeted Clarification",
        scenario: "I manually trace the execution flow, using AI only to clarify specific, localized algorithms or unfamiliar patterns.",
      },
      {
        value: 3,
        title: "Deep Mental Modeling",
        scenario: "I manually map out the data flow, check for edge cases, and fully internalize the architecture before approving.",
      },
    ],
  },
  {
    id: 4,
    construct: "Creative Problem Solving",
    area: "Architectural Synthesis",
    prompt:
      "Scenario: You are tasked with designing the database schema and API structure for a brand-new, real-time notification service.",
    recommendation:
      "Whiteboard your architecture and define trade-offs manually. Only use AI later to critique your existing design.",
    options: [
      {
        value: 0,
        title: "Generative Architecture",
        scenario: "I prompt an AI with the requirements and adopt its suggested schema and API design as my baseline.",
      },
      {
        value: 1,
        title: "AI Scaffolding",
        scenario: "I use AI to generate the initial entities and relationships, then manually tweak them to fit our specific domain.",
      },
      {
        value: 2,
        title: "Independent Drafting",
        scenario: "I draft the core architecture myself, using AI mostly to brainstorm edge cases or evaluate database technology choices.",
      },
      {
        value: 3,
        title: "Sovereign Design",
        scenario: "I whiteboard the entire architecture, define trade-offs, and construct the schema completely independently.",
      },
    ],
  },
  {
    id: 5,
    construct: "Knowledge Acquisition",
    area: "Learning Autonomy",
    prompt:
      "Scenario: Your team is adopting a new complex state management library (or framework) that you have never used before.",
    recommendation:
      "Read the official 'Getting Started' docs and build a small sandbox app from scratch without AI assistance.",
    options: [
      {
        value: 0,
        title: "Just-In-Time Prompting",
        scenario: "I skip the docs and just ask an AI 'how do I do X in this library' whenever I need to write a feature.",
      },
      {
        value: 1,
        title: "AI Tutorialization",
        scenario: "I ask AI to teach me the library via a summary and rely on its generated examples to understand the core concepts.",
      },
      {
        value: 2,
        title: "Documentation First",
        scenario: "I read the official docs to learn the basics, using AI only to clarify concepts I find confusing after reading.",
      },
      {
        value: 3,
        title: "Deep Internalization",
        scenario: "I read the docs deeply, build a mental model, and write a throwaway prototype from scratch to fully internalize it.",
      },
    ],
  },
  {
    id: 6,
    construct: "Analytical Thinking",
    area: "Contextual Refactoring",
    prompt:
      "Scenario: You need to add a feature to a 10-year-old legacy module with no tests, hidden side-effects, and spaghetti logic.",
    recommendation:
      "Write manual characterization tests to prove you understand the legacy behavior before modifying it.",
    options: [
      {
        value: 0,
        title: "Black-Box Rewrite",
        scenario: "I highlight the file, ask AI to 'refactor this and add my feature', and trust the output if it compiles.",
      },
      {
        value: 1,
        title: "AI-Guided Surgery",
        scenario: "I ask AI to explain the file and generate the refactored functions, while I just stitch the pieces together.",
      },
      {
        value: 2,
        title: "Manual Tracing",
        scenario: "I trace the critical paths manually, but use AI to help extract specific pure functions or generate initial unit tests.",
      },
      {
        value: 3,
        title: "Surgical Precision",
        scenario: "I write characterization tests myself, understand the side-effects, and carefully apply safe refactoring patterns step-by-step.",
      },
    ],
  },
  {
    id: 7,
    construct: "Metacognitive Depth",
    area: "Handling Ambiguity",
    prompt:
      "Scenario: A product manager gives you a high-level, vague user story: 'Make the dashboard load much faster for power users.'",
    recommendation:
      "Force yourself to translate vague requirements into concrete engineering tasks and metrics on paper before opening your IDE.",
    options: [
      {
        value: 0,
        title: "AI Task Decomposition",
        scenario: "I feed the user story to an AI and ask it to generate the technical sub-tasks and my implementation plan.",
      },
      {
        value: 1,
        title: "Collaborative Breakdown",
        scenario: "I brainstorm a little, but rely heavily on AI to break the vague problem down into actionable engineering steps.",
      },
      {
        value: 2,
        title: "Independent Scoping",
        scenario: "I define the metrics and bottlenecks myself, using AI only to suggest specific optimization techniques for our stack.",
      },
      {
        value: 3,
        title: "Strategic Ownership",
        scenario: "I independently profile the app, identify the exact slow queries, and create a targeted, data-backed execution plan.",
      },
    ],
  },
];

export default questions;
