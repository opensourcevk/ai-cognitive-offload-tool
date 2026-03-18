import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

async function answerAllQuestions(user, optionValue) {
  for (let index = 0; index < 7; index += 1) {
    await user.click(screen.getByTestId(`option-${optionValue}`));

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

    await user.click(screen.getByTestId("option-1"));
    expect(nextButton).toBeEnabled();
  });

  test("calculates a 100 score and high cognitive sovereignty band", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /start test/i }));
    await answerAllQuestions(user, 3);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /high cognitive sovereignty/i })
    ).toBeInTheDocument();
  });

  test("calculates a 0 score and severe cognitive atrophy band", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /start test/i }));
    await answerAllQuestions(user, 0);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /severe cognitive atrophy/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /most impacted areas/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/syntactic recall/i).length).toBeGreaterThan(0);
  });
});
