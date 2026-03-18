import { useState } from "react";
import questions, { LIKERT_OPTIONS } from "./Questions";
import "./App.css";

const MAX_RAW_SCORE = questions.length * (LIKERT_OPTIONS.length - 1);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getBand(score) {
  if (score <= 3) {
    return {
      title: "Atrophy Risk",
      description:
        "Your pattern suggests high cognitive offloading. Rebuild your analytical muscle by doing first-pass reasoning before using AI.",
      colorClass: "red-text text-darken-2",
    };
  }

  if (score <= 7) {
    return {
      title: "Balanced User",
      description:
        "You use AI and independent thinking in a mixed way. Keep sharpening fundamentals by alternating AI-assisted and AI-free practice.",
      colorClass: "amber-text text-darken-3",
    };
  }

  return {
    title: "Synergistic Thinker",
    description:
      "You appear to use AI as a partner, not a crutch. You retain strong autonomy in memory, debugging, and synthesis.",
    colorClass: "green-text text-darken-2",
  };
}

export default function App() {
  const [phase, setPhase] = useState("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];
  const selectedValue = answers[currentIndex];
  const answeredCount = answers.filter((value) => value !== undefined).length;
  const remaining = questions.length - currentIndex;
  const progressPercent = (answeredCount / questions.length) * 100;

  const onAnswerSelect = (value) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);
  };

  const onNext = () => {
    if (selectedValue === undefined) {
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    setPhase("results");
  };

  const onRestart = () => {
    setPhase("landing");
    setCurrentIndex(0);
    setAnswers([]);
  };

  const rawScore = answers.reduce((sum, value) => sum + value, 0);
  const score = clamp(Math.round((rawScore / MAX_RAW_SCORE) * 10), 0, 10);
  const band = getBand(score);

  return (
    <main className="app-shell blue-grey lighten-5">
      <section className="container">
        <div className="card-panel z-depth-2">
          <header className="section-header">
            <h4 className="blue-text text-darken-3 app-title">
              The Cognitive Decay Diagnostic
            </h4>
            <p className="grey-text text-darken-1 app-subtitle">
              Cognitive Sustainability Assessment
            </p>
          </header>

          {phase === "landing" && (
            <div className="section">
              <p className="grey-text text-darken-1">
                This diagnostic evaluates AI Decay: the risk of
                critical-thinking, memory, and problem-solving atrophy caused by
                over-reliance on AI tools.
              </p>
              <p className="grey-text text-darken-1">
                A higher Cognitive Sustainability Score reflects stronger
                independent reasoning and healthier human-AI synergy.
              </p>
              <button
                className="btn waves-effect waves-light blue darken-2"
                type="button"
                onClick={() => setPhase("quiz")}
              >
                Start Test
              </button>
            </div>
          )}

          {phase === "quiz" && (
            <div className="section">
              <div className="row app-row-meta">
                <div className="col s12 m6">
                  <strong>
                    Question {currentIndex + 1} of {questions.length}
                  </strong>
                </div>
                <div className="col s12 m6 m-right">
                  {remaining} questions remaining
                </div>
              </div>

              <div className="progress">
                <div
                  className="determinate blue darken-2"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <article className="card-panel blue lighten-5">
                <p className="blue-text text-darken-2 app-construct">
                  {currentQuestion.construct}
                </p>
                <h5 className="app-question">{currentQuestion.prompt}</h5>
              </article>

              <fieldset className="app-fieldset">
                <legend className="sr-only">Select one answer</legend>
                {LIKERT_OPTIONS.map((option) => {
                  const inputId = `question-${currentQuestion.id}-${option.value}`;
                  return (
                    <p key={option.label} className="app-option">
                      <label htmlFor={inputId}>
                        <input
                          id={inputId}
                          className="with-gap"
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.value}
                          checked={selectedValue === option.value}
                          onChange={() => onAnswerSelect(option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    </p>
                  );
                })}
              </fieldset>

              <footer className="row app-actions">
                <div className="col s12 m6 grey-text text-darken-1">
                  Answered: {answeredCount}/{questions.length}
                </div>
                <div className="col s12 m6 m-right">
                  <button
                    className="btn waves-effect waves-light blue darken-2"
                    type="button"
                    disabled={selectedValue === undefined}
                    onClick={onNext}
                  >
                    {currentIndex === questions.length - 1
                      ? "View Results"
                      : "Next"}
                  </button>
                </div>
              </footer>
            </div>
          )}

          {phase === "results" && (
            <div className="section">
              <p className="grey-text text-darken-1">
                Cognitive Sustainability Score
              </p>
              <p className="app-score blue-text text-darken-3">{score} / 10</p>

              <div className="progress" aria-hidden="true">
                <div
                  className="determinate teal"
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>

              <h5 className={band.colorClass}>{band.title}</h5>
              <p className="grey-text text-darken-1">{band.description}</p>
              <button
                className="btn waves-effect waves-light blue darken-2"
                type="button"
                onClick={onRestart}
              >
                Retake Test
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
