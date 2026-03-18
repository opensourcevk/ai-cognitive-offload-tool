export const LIKERT_OPTIONS = [
  { label: "Strongly Agree", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Strongly Disagree", value: 3 },
];

const questions = [
  {
    id: 1,
    construct: "Analytical Thinking",
    prompt:
      "When debugging code, I usually prefer to paste the error directly into an AI tool rather than tracing the logic myself first.",
  },
  {
    id: 2,
    construct: "Cognitive Offloading",
    prompt:
      "I find it difficult to recall specific syntax or functions I used last week because my IDE/AI autocompletes them for me.",
  },
  {
    id: 3,
    construct: "Problem Solving",
    prompt:
      "Faced with a complex problem, I am more likely to ask AI for a solution structure than to brainstorm multiple solutions on my own.",
  },
  {
    id: 4,
    construct: "Skill Confidence",
    prompt:
      "I feel a noticeable decline in my ability to solve problems from scratch without AI assistance.",
  },
  {
    id: 5,
    construct: "Creativity",
    prompt:
      "When generating new feature ideas, I rely on AI suggestions to overcome creative blocks.",
  },
  {
    id: 6,
    construct: "Systems Thinking",
    prompt:
      "I sometimes accept AI-generated code/answers without fully understanding how they integrate with the wider system architecture.",
  },
  {
    id: 7,
    construct: "Brain Muscle (Debug)",
    prompt:
      "I prefer using auto-fix or quick-fix suggestions from my tools rather than manually stepping through a debugger.",
  },
];

export default questions;
