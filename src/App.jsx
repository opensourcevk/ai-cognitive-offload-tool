import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  Fade,
  Slide,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import questions, { OPTION_SCALE_MAX } from "./Questions";
import { methodology, researchSources } from "./researchBasis";
import "./App.css";

const SCALE_MAX = OPTION_SCALE_MAX;
const MAX_RAW_SCORE = questions.length * SCALE_MAX;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getBand(score) {
  if (score <= 40) {
    return {
      title: "Severe Cognitive Atrophy",
      description:
        "Your pattern suggests extreme over-reliance on AI, risking loss of fundamental software engineering skills and independent reasoning.",
      color: "error",
    };
  }

  if (score <= 65) {
    return {
      title: "Developing Automation Bias",
      description:
        "You are leaning heavily on AI for tasks you used to do independently, which may degrade your core problem-solving muscles over time.",
      color: "warning",
    };
  }

  if (score <= 85) {
    return {
      title: "Balanced AI Synergy",
      description:
        "You effectively use AI to accelerate your workflow while actively maintaining key analytical and cognitive skills.",
      color: "info",
    };
  }

  return {
    title: "High Cognitive Sovereignty",
    description:
      "You maintain strict control over your cognitive processes and architecture, using AI only as a secondary tool to complement your deep expertise.",
    color: "success",
  };
}

function getImpactProfile(sustainabilityScore) {
  if (sustainabilityScore <= 40) {
    return {
      impactLabel: "High Impact",
      chipColor: "error",
      barColor: "error",
    };
  }

  if (sustainabilityScore <= 65) {
    return {
      impactLabel: "Moderate Impact",
      chipColor: "warning",
      barColor: "warning",
    };
  }

  return {
    impactLabel: "Low Impact",
    chipColor: "success",
    barColor: "success",
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
  const score = clamp(Math.round((rawScore / MAX_RAW_SCORE) * 100), 0, 100);
  const band = getBand(score);
  const areaInsights = questions
    .map((question, index) => {
      const value = answers[index] ?? 0;
      const sustainabilityScore = clamp(
        Math.round((value / SCALE_MAX) * 100),
        0,
        100
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
    (area) => area.sustainabilityScore <= 65
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Box mb={4} textAlign="center">
            <Typography variant="h4" component="h1" color="primary.main" fontWeight={700} gutterBottom>
              The Cognitive Decay Diagnostic
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Cognitive Sustainability Assessment
            </Typography>
          </Box>

          {phase === "landing" && (
            <Fade in={phase === "landing"} timeout={500}>
              <Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  AI Decay is the hidden loss of reasoning, memory, and
                  problem-solving depth caused by passive dependence on AI tools.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  This 7-question diagnostic estimates your Cognitive
                  Sustainability Score and pinpoints which thinking muscles are
                  being affected most.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Choose the option that matches your typical behavior, not your
                  ideal behavior.
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 3 }}>
                  <Chip label="7 Questions" color="primary" variant="outlined" />
                  <Chip label="~3 Minutes" color="primary" variant="outlined" />
                  <Chip label="Area-Level Insights" color="primary" variant="outlined" />
                </Box>

                <Card variant="outlined" sx={{ mb: 4, bgcolor: 'grey.50' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="text.primary">
                      Methodology
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0, mb: 2 }}>
                      {methodology.map((item) => (
                        <Typography component="li" variant="body2" key={item.title} sx={{ mb: 1 }}>
                          <strong>{item.title}:</strong> {item.detail}
                        </Typography>
                      ))}
                    </Box>
                    <Accordion elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                        <Typography fontWeight={600} color="primary.dark">Research basis</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 0, pt: 0 }}>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {researchSources.map((source) => (
                            <Typography component="li" variant="body2" key={source.url} sx={{ mb: 1 }}>
                              <a href={source.url} target="_blank" rel="noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                {source.label}
                              </a>
                            </Typography>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>

                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setPhase("quiz")}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                  >
                    Start Test
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}

          {phase === "quiz" && (
            <Slide in={phase === "quiz"} direction="left" mountOnEnter unmountOnExit>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body2" fontWeight="bold" color="text.primary">
                    Question {currentIndex + 1} of {questions.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {remaining} questions remaining
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{ height: 8, borderRadius: 4, mb: 4 }}
                />

                <Card
                  key={`question-${currentQuestion.id}`}
                  variant="outlined"
                  sx={{ mb: 4, bgcolor: 'primary.50', borderColor: 'primary.100' }}
                >
                  <CardContent>
                    <Typography variant="overline" color="primary.main" fontWeight={700}>
                      {currentQuestion.construct}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 1, mb: 2, fontWeight: 500 }}>
                      {currentQuestion.prompt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pick the scenario closest to your default behavior.
                    </Typography>
                  </CardContent>
                </Card>

                <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
                  <RadioGroup
                    key={`options-${currentQuestion.id}`}
                    name={`question-${currentQuestion.id}`}
                    value={selectedValue ?? ''}
                    onChange={(e) => onAnswerSelect(Number(e.target.value))}
                  >
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedValue === option.value;
                      return (
                        <Card
                          key={`${currentQuestion.id}-${option.value}`}
                          variant="outlined"
                          sx={{
                            mb: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease-in-out',
                            bgcolor: isSelected ? 'primary.50' : 'background.paper',
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            '&:hover': {
                              borderColor: 'primary.light',
                              bgcolor: isSelected ? 'primary.50' : 'grey.50',
                              transform: 'translateY(-2px)',
                              boxShadow: 1
                            }
                          }}
                          onClick={() => onAnswerSelect(option.value)}
                        >
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <FormControlLabel
                              value={option.value}
                              control={
                                <Radio
                                  inputProps={{ 'data-testid': `option-${option.value}` }}
                                  color="primary"
                                />
                              }
                              label={
                                <Box>
                                  <Typography variant="subtitle1" fontWeight={500} color={isSelected ? 'primary.dark' : 'text.primary'}>
                                    {option.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {option.scenario}
                                  </Typography>
                                </Box>
                              }
                              sx={{ m: 0, width: '100%', alignItems: 'flex-start' }}
                            />
                          </CardContent>
                        </Card>
                      );
                    })}
                  </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Answered: {answeredCount}/{questions.length}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={selectedValue === undefined}
                    onClick={onNext}
                    sx={{ px: 4 }}
                  >
                    {currentIndex === questions.length - 1 ? "View Results" : "Next"}
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}

          {phase === "results" && (
            <Fade in={phase === "results"} timeout={800}>
              <Box>
                <Box textAlign="center" mb={4}>
                  <Typography variant="overline" color="text.secondary" fontWeight={600}>
                    Cognitive Sustainability Index
                  </Typography>
                  <Typography variant="h2" color="primary.dark" fontWeight={700} sx={{ my: 1 }}>
                    {score}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={score}
                    color={band.color}
                    sx={{ height: 12, borderRadius: 6, mb: 3, maxWidth: 400, mx: 'auto' }}
                  />

                  <Typography variant="h5" color={`${band.color}.main`} fontWeight={600} gutterBottom>
                    {band.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto">
                    {band.description}
                  </Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" color="text.primary" fontWeight={700} gutterBottom>
                  Most Impacted Areas
                </Typography>

                {impactedAreas.length === 0 && (
                  <Card variant="outlined" sx={{ bgcolor: 'success.50', borderColor: 'success.200', mb: 4 }}>
                    <CardContent>
                      <Typography color="success.dark" fontWeight={500}>
                        No high-impact areas detected. Keep your current learning
                        discipline.
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  {impactedAreas.map((area, index) => (
                    <Slide direction="up" in={true} timeout={400 + index * 200} key={area.id}>
                      <Card variant="outlined" sx={{ borderColor: `${area.barColor}.200` }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {area.area}
                            </Typography>
                            <Chip
                              label={area.impactLabel}
                              color={area.chipColor}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={area.sustainabilityScore}
                            color={area.barColor}
                            sx={{ height: 8, borderRadius: 4, mb: 2 }}
                          />
                          <Typography variant="body2" color="text.primary" fontWeight={600} gutterBottom>
                            Sustainability: {area.sustainabilityScore}/100
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1, mt: 1 }}>
                            <strong>Recovery drill:</strong> {area.recommendation}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Slide>
                  ))}
                </Box>

                <Typography variant="h6" color="text.primary" fontWeight={700} gutterBottom>
                  Full Area Breakdown
                </Typography>
                <Card variant="outlined" sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {areaInsights.map((area, index) => (
                      <Box key={`breakdown-${area.id}`}>
                        <Box sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {area.area}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              {area.sustainabilityScore}/100
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={area.sustainabilityScore}
                            color={area.barColor}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                        {index < areaInsights.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </Box>
                </Card>

                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onRestart}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                  >
                    Retake Test
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Card>
    </Container>
  );
}
