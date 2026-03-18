import { useState } from "react";
import questions, { OPTION_SCALE_MAX } from "./Questions";
import { methodology, researchSources } from "./researchBasis";
import "./App.css";

const SCALE_MAX = OPTION_SCALE_MAX;
const MAX_RAW_SCORE = questions.length * SCALE_MAX;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getBand(score) {
  if (score <= 3) {
    return {
      title: "Atrophy Risk",
      description:
        "Your pattern suggests heavy cognitive offloading and reduced independent reasoning capacity.",
      colorClass: "red-text text-darken-2",
    };
  }

  if (score <= 7) {
    return {
      title: "Balanced User",
      description:
        "You show a mixed profile: useful AI leverage, but selected cognitive areas need active maintenance.",
      colorClass: "amber-text text-darken-3",
    };
  }

  return {
    title: "Synergistic Thinker",
    description:
      "You use AI as a force multiplier while retaining strong core cognitive and debugging autonomy.",
    colorClass: "green-text text-darken-2",
  };
}

function getImpactProfile(sustainabilityScore) {
  if (sustainabilityScore <= 3) {
    return {
      impactLabel: "High Impact",
      chipClass: "app-chip danger",
      barClass: "red darken-2",
    };
  }

  if (sustainabilityScore <= 6) {
    return {
      impactLabel: "Moderate Impact",
      chipClass: "app-chip warning",
      barClass: "amber darken-2",
    };
  }

  return {
    impactLabel: "Low Impact",
    chipClass: "app-chip good",
    barClass: "teal",
  };
}

export default function App() {
  const [phase, setPhase] = useState("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];
  const selectedValue = answers[currentIndex];
  const answeredCount = answers.filter((value) => value !== undefined).length;
  const remaining = questions.length - answeredCount;
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
  const areaInsights = questions
    .map((question, index) => {
      const value = answers[index] ?? 0;
      const sustainabilityScore = clamp(
        Math.round((value / SCALE_MAX) * 10),
        0,
        10
      );

      return {
        id: question.id,
        area: question.area,
        construct: question.construct,
        recommendation: question.recommendation,
        sustainabilityScore,
        ...getImpactProfile(sustainabilityScore),
      };
    })
    .sort((areaA, areaB) => areaA.sustainabilityScore - areaB.sustainabilityScore);

  const impactedAreas = areaInsights.filter(
    (area) => area.sustainabilityScore <= 6
  );

  return (
    <main className="app-shell blue-grey lighten-5">
      <section className="container">
        <div className="card-panel z-depth-2 app-panel">
          <header className="section-header">
            <h4 className="blue-text text-darken-3 app-title">
              The Cognitive Decay Diagnostic
            </h4>
            <p className="grey-text text-darken-1 app-subtitle">
              Cognitive Sustainability Assessment
            </p>
          </header>

          {phase === "landing" && (
            <div className="section app-in">
              <p className="grey-text text-darken-1">
                AI Decay is the hidden loss of reasoning, memory, and
                problem-solving depth caused by passive dependence on AI tools.
              </p>
              <p className="grey-text text-darken-1">
                This 7-question diagnostic estimates your Cognitive
                Sustainability Score and pinpoints which thinking muscles are
                being affected most.
              </p>
              <p className="grey-text text-darken-1">
                Choose the option that matches your typical behavior, not your
                ideal behavior.
              </p>
              <div className="app-pill-row">
                <span className="app-pill">7 Questions</span>
                <span className="app-pill">~3 Minutes</span>
                <span className="app-pill">Area-Level Insights</span>
              </div>
              <div className="app-evidence">
                <h6 className="app-section-title">Methodology</h6>
                <ul className="browser-default app-method-list">
                  {methodology.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </li>
                  ))}
                </ul>
                <details>
                  <summary>Research basis</summary>
                  <ul className="browser-default app-ref-list">
                    {researchSources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noreferrer">
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              <button
                className="btn waves-effect waves-light blue darken-2 pulse"
                type="button"
                onClick={() => setPhase("quiz")}
              >
                Start Test
              </button>
            </div>
          )}

          {phase === "quiz" && (
            <div className="section app-in">
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

              <article
                key={`question-${currentQuestion.id}`}
                className="card-panel blue lighten-5 app-question-card"
              >
                <p className="blue-text text-darken-2 app-construct">
                  {currentQuestion.construct}
                </p>
                <h5 className="app-question">{currentQuestion.prompt}</h5>
                <p className="app-question-helper grey-text text-darken-1">
                  Pick the scenario closest to your default behavior.
                </p>
              </article>

              <fieldset
                key={`options-${currentQuestion.id}`}
                className="app-fieldset"
              >
                <legend className="sr-only">Select one answer</legend>
                {currentQuestion.options.map((option) => {
                  const inputId = `question-${currentQuestion.id}-${option.value}`;
                  return (
                    <div
                      key={`${currentQuestion.id}-${option.value}`}
                      className={`app-option-card ${
                        selectedValue === option.value ? "selected" : ""
                      }`}
                    >
                      <label htmlFor={inputId} className="app-option-label">
                        <input
                          id={inputId}
                          data-testid={`option-${option.value}`}
                          className="with-gap"
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.value}
                          checked={selectedValue === option.value}
                          onChange={() => onAnswerSelect(option.value)}
                        />
                        <span>{option.title}</span>
                      </label>
                      <small className="app-option-hint" aria-hidden="true">
                        {option.scenario}
                      </small>
                    </div>
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
            <div className="section app-in">
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

              <div className="divider app-divider" />

              <h6 className="app-section-title">Most Impacted Areas</h6>
              {impactedAreas.length === 0 && (
                <p className="green-text text-darken-2">
                  No high-impact areas detected. Keep your current learning
                  discipline.
                </p>
              )}

              {impactedAreas.map((area, index) => (
                <article
                  key={area.id}
                  className="card-panel app-impact-card"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="app-impact-top">
                    <strong>{area.area}</strong>
                    <span className={area.chipClass}>{area.impactLabel}</span>
                  </div>
                  <div className="progress app-area-progress" aria-hidden="true">
                    <div
                      className={`determinate ${area.barClass}`}
                      style={{ width: `${area.sustainabilityScore * 10}%` }}
                    />
                  </div>
                  <p className="app-impact-score">
                    Sustainability: {area.sustainabilityScore}/10
                  </p>
                  <p className="grey-text text-darken-1 app-tip">
                    <strong>Recovery drill:</strong> {area.recommendation}
                  </p>
                </article>
              ))}

              <h6 className="app-section-title">Full Area Breakdown</h6>
              <div className="app-breakdown-list">
                {areaInsights.map((area) => (
                  <div key={`breakdown-${area.id}`} className="app-breakdown-row">
                    <div className="app-breakdown-head">
                      <span>{area.area}</span>
                      <span>{area.sustainabilityScore}/10</span>
                    </div>
                    <div className="progress" aria-hidden="true">
                      <div
                        className={`determinate ${area.barClass}`}
                        style={{ width: `${area.sustainabilityScore * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

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
