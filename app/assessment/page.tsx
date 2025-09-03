"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  Brain,
  Code,
  Palette,
  Zap,
  Trophy,
  Star,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Users,
  Briefcase,
} from "lucide-react"

interface Question {
  id: string
  type: "multiple-choice" | "code" | "design" | "personality"
  category: "technical" | "design" | "personality" | "problem-solving"
  question: string
  options?: string[]
  correctAnswer?: string | number
  code?: string
  language?: string
  points: number
  timeLimit?: number
}

interface AssessmentResult {
  overallScore: number
  categoryScores: {
    technical: number
    design: number
    problemSolving: number
    creativity: number
  }
  recommendedPath: string
  careerFits: string[]
  personalityType: string
  nextSteps: string[]
}

const questions: Question[] = [
  {
    id: "q1",
    type: "multiple-choice",
    category: "technical",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    points: 10,
    timeLimit: 30,
  },
  {
    id: "q2",
    type: "code",
    category: "technical",
    question: "Complete this function to reverse a string:",
    code: `function reverseString(str) {
  // Your code here
  return "";
}`,
    language: "javascript",
    points: 20,
    timeLimit: 120,
  },
  {
    id: "q3",
    type: "multiple-choice",
    category: "design",
    question: "Which color combination provides the best accessibility contrast?",
    options: ["Light gray on white", "Dark blue on light blue", "Black on white", "Red on green"],
    correctAnswer: 2,
    points: 10,
    timeLimit: 30,
  },
  {
    id: "q4",
    type: "personality",
    category: "personality",
    question: "When learning something new, you prefer to:",
    options: [
      "Jump right in and experiment",
      "Read documentation thoroughly first",
      "Watch tutorials and follow along",
      "Discuss with others and collaborate",
    ],
    points: 5,
  },
  {
    id: "q5",
    type: "multiple-choice",
    category: "problem-solving",
    question: "You're debugging a complex issue. What's your first step?",
    options: [
      "Start changing code randomly",
      "Reproduce the issue consistently",
      "Ask for help immediately",
      "Rewrite the entire module",
    ],
    correctAnswer: 1,
    points: 15,
    timeLimit: 45,
  },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "assessment" | "results">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const startAssessment = () => {
    setCurrentStep("assessment")
    const firstQuestion = questions[0]
    if (firstQuestion.timeLimit) {
      setTimeLeft(firstQuestion.timeLimit)
    }
  }

  const handleAnswer = (answer: any) => {
    const question = questions[currentQuestion]
    const newAnswers = { ...answers, [question.id]: answer }
    setAnswers(newAnswers)

    // Calculate points for correct answers
    let points = 0
    if (question.type === "multiple-choice" && answer === question.correctAnswer) {
      points = question.points
    } else if (question.type === "personality") {
      points = question.points
    }

    setScore((prev) => prev + points)
    setXp((prev) => prev + points * 10)

    // Level up logic
    const newLevel = Math.floor(xp / 100) + 1
    if (newLevel > level) {
      setLevel(newLevel)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQ = currentQuestion + 1
      setCurrentQuestion(nextQ)
      const nextQuestion = questions[nextQ]
      if (nextQuestion.timeLimit) {
        setTimeLeft(nextQuestion.timeLimit)
      } else {
        setTimeLeft(null)
      }
    } else {
      finishAssessment()
    }
  }

  const finishAssessment = () => {
    // Calculate results
    const totalPossibleScore = questions.reduce((sum, q) => sum + q.points, 0)
    const overallScore = Math.round((score / totalPossibleScore) * 100)

    const mockResults: AssessmentResult = {
      overallScore,
      categoryScores: {
        technical: Math.min(95, overallScore + Math.random() * 10),
        design: Math.min(90, overallScore - 5 + Math.random() * 15),
        problemSolving: Math.min(88, overallScore + Math.random() * 8),
        creativity: Math.min(92, overallScore + Math.random() * 12),
      },
      recommendedPath:
        overallScore >= 80 ? "Advanced Development" : overallScore >= 60 ? "Intermediate Track" : "Foundation Course",
      careerFits: ["Full Stack Developer", "Frontend Specialist", "UI/UX Designer"],
      personalityType: "Analytical Explorer",
      nextSteps: ["Enroll in React Mastery", "Join Study Group", "Build Portfolio Project"],
    }

    setResults(mockResults)
    setCurrentStep("results")
  }

  if (!mounted) return null

  if (currentStep === "intro") {
    return <AssessmentIntro onStart={startAssessment} />
  }

  if (currentStep === "results" && results) {
    return <AssessmentResults results={results} onRestart={() => window.location.reload()} />
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Gaming UI Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full animate-spin" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-accent rounded-lg rotate-45 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary rounded-full animate-bounce" />
      </div>

      {/* Gaming HUD */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Skill Assessment</div>
                  <div className="font-bold">Level {level}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-yellow-400">{xp} XP</span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">{score} pts</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className={`font-mono font-bold ${timeLeft <= 10 ? "text-destructive" : "text-accent"}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-2 bg-muted/20" />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <QuestionCard
            question={question}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            currentAnswer={answers[question.id]}
          />
        </div>
      </div>
    </div>
  )
}

function AssessmentIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl rounded-full" />
          <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto glow-pulse">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Skill Assessment
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover your learning path with our gamified assessment. Test your skills across multiple domains and unlock
          personalized recommendations.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Technical Skills</h3>
            <p className="text-sm text-muted-foreground">Programming, algorithms, and problem-solving</p>
          </Card>

          <Card className="p-6 bg-card/50 border-accent/20 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold mb-2">Design Thinking</h3>
            <p className="text-sm text-muted-foreground">UI/UX principles and creative problem-solving</p>
          </Card>

          <Card className="p-6 bg-card/50 border-secondary/20 hover:border-secondary/50 transition-colors">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-bold mb-2">Learning Style</h3>
            <p className="text-sm text-muted-foreground">Personality and learning preferences</p>
          </Card>
        </div>

        <div className="bg-card/30 rounded-2xl p-8 border border-border/50 mb-8">
          <h3 className="text-xl font-bold mb-4">What to Expect</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">15-20 minutes</div>
                <div className="text-sm text-muted-foreground">Quick and engaging assessment</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Interactive challenges</div>
                <div className="text-sm text-muted-foreground">Code, design, and logic puzzles</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Personalized results</div>
                <div className="text-sm text-muted-foreground">Custom learning path recommendations</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Career insights</div>
                <div className="text-sm text-muted-foreground">Job role matches and next steps</div>
              </div>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-lg px-12 py-6 glow-pulse group"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Assessment
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  currentAnswer,
}: {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (answer: any) => void
  onNext: () => void
  currentAnswer: any
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(currentAnswer)
  const [codeAnswer, setCodeAnswer] = useState(currentAnswer || question.code || "")

  const handleSubmit = () => {
    const answer = question.type === "code" ? codeAnswer : selectedAnswer
    onAnswer(answer)
    onNext()
  }

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {questionNumber} / {totalQuestions}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 leading-tight">{question.question}</h2>

        {question.type === "multiple-choice" && (
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
          >
            <div className="space-y-4">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 p-4 rounded-lg border border-border/50 hover:border-primary/50 cursor-pointer transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {question.type === "code" && (
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{question.language}</span>
              </div>
              <Textarea
                value={codeAnswer}
                onChange={(e) => setCodeAnswer(e.target.value)}
                className="font-mono text-sm min-h-[200px] bg-background/50 border-border/50 focus:border-primary/50"
                placeholder="Write your code here..."
              />
            </div>
            <div className="text-sm text-muted-foreground">💡 Tip: Focus on correctness and clean code structure</div>
          </div>
        )}

        {question.type === "personality" && (
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
          >
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={index.toString()} id={`personality-${index}`} />
                  <Label
                    htmlFor={`personality-${index}`}
                    className="flex-1 p-4 rounded-lg border border-border/50 hover:border-accent/50 cursor-pointer transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-400" />
            {question.points} points
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer && !codeAnswer}
            className="bg-primary hover:bg-primary/80 px-8"
          >
            {questionNumber === totalQuestions ? "Finish Assessment" : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

function AssessmentResults({ results, onRestart }: { results: AssessmentResult; onRestart: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto glow-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Assessment Complete!
          </h1>
          <p className="text-xl text-muted-foreground">Here's your personalized learning profile</p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-primary/20">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              {results.overallScore}%
            </div>
            <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
            <p className="text-muted-foreground">
              {results.overallScore >= 80
                ? "Excellent! You're ready for advanced challenges."
                : results.overallScore >= 60
                  ? "Great job! You have a solid foundation."
                  : "Good start! Focus on building fundamentals."}
            </p>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Skill Breakdown */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Skill Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize font-medium">
                      {category === "problemSolving" ? "Problem Solving" : category}
                    </span>
                    <span className="font-bold text-primary">{Math.round(score)}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Path */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Recommended Path
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">{results.recommendedPath}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your assessment, this path will maximize your learning potential.
              </p>
              <Button className="bg-accent hover:bg-accent/80">Explore Path</Button>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Career Fits */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-secondary" />
              Career Matches
            </h3>
            <div className="space-y-3">
              {results.careerFits.map((career, index) => (
                <div
                  key={career}
                  className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-secondary/20"
                >
                  <span className="font-medium">{career}</span>
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30">{95 - index * 5}% match</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Style */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Learning Profile
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">AE</span>
              </div>
              <h4 className="text-lg font-bold mb-2">{results.personalityType}</h4>
              <p className="text-sm text-muted-foreground">
                You learn best through hands-on experimentation and systematic analysis.
              </p>
            </div>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="p-6 bg-card/50 border-border/50 mb-8">
          <h3 className="text-xl font-bold mb-6">Your Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {results.nextSteps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 px-8"
          >
            Start Learning Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onRestart}
            className="border-primary/50 hover:bg-primary/10 bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
