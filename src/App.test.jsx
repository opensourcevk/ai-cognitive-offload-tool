import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

async function answerAllQuestions(user, optionLabel) {
  for (let index = 0; index < 7; index += 1) {
    await user.click(screen.getByLabelText(optionLabel));

    const isLastQuestion = index === 6;
    await user.click(
      screen.getByRole("button", {
        name: isLastQuestion ? /view results/i : /next/i,
      })
    );
  }
}

describe("Cognitive Decay Diagnostic", () => {
  test("shows landing page and requires an answer before moving on", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /the cognitive decay diagnostic/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start test/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start test/i }));

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();

    await user.click(screen.getByLabelText(/^Agree$/i));
    expect(nextButton).toBeEnabled();
  });

  test("calculates a 10/10 score and synergistic thinker band", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /start test/i }));
    await answerAllQuestions(user, "Strongly Disagree");

    expect(screen.getByText("10 / 10")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /synergistic thinker/i })
    ).toBeInTheDocument();
  });

  test("calculates a 0/10 score and atrophy risk band", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /start test/i }));
    await answerAllQuestions(user, "Strongly Agree");

    expect(screen.getByText("0 / 10")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /atrophy risk/i })
    ).toBeInTheDocument();
  });
});
