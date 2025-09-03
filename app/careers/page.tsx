"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Briefcase,
  TrendingUp,
  Users,
  MessageCircle,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Star,
  Heart,
  X,
  Eye,
  Send,
  Download,
  Share2,
  Plus,
  Target,
  Building,
  Globe,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Mic,
  Video,
  BarChart3,
  Handshake,
  Zap,
  Network,
} from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary: {
    min: number
    max: number
    currency: string
  }
  skills: string[]
  description: string
  requirements: string[]
  benefits: string[]
  posted: Date
  applicants: number
  match: number
}

interface Application {
  id: string
  job: Job
  status: "applied" | "screening" | "interview" | "offer" | "rejected"
  appliedDate: Date
  lastUpdate: Date
  notes: string
}

interface Interview {
  id: string
  type: "technical" | "behavioral" | "system-design"
  difficulty: "Easy" | "Medium" | "Hard"
  duration: number
  questions: string[]
  tips: string[]
}

interface Portfolio {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  expertise: string[]
  experience: number
  rating: number
  sessions: number
  available: boolean
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: { min: 120000, max: 160000, currency: "USD" },
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    description: "Join our innovative team building the future of web applications...",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership skills"],
    benefits: ["Health insurance", "401k matching", "Flexible PTO", "Remote work"],
    posted: new Date("2024-01-18"),
    applicants: 47,
    match: 92,
  },
  {
    id: "2",
    title: "AI/ML Engineer",
    company: "DataFlow",
    logo: "/placeholder.svg",
    location: "Remote",
    type: "Remote",
    salary: { min: 140000, max: 180000, currency: "USD" },
    skills: ["Python", "TensorFlow", "PyTorch", "AWS"],
    description: "Build cutting-edge AI solutions that impact millions of users...",
    requirements: ["PhD in CS/ML or equivalent", "3+ years ML experience", "Research publications"],
    benefits: ["Equity package", "Learning budget", "Conference attendance", "Top-tier equipment"],
    posted: new Date("2024-01-19"),
    applicants: 23,
    match: 88,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    logo: "/placeholder.svg",
    location: "New York, NY",
    type: "Full-time",
    salary: { min: 90000, max: 120000, currency: "USD" },
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    description: "Create beautiful, user-centered designs for our growing product suite...",
    requirements: ["3+ years UX design", "Portfolio required", "User research experience"],
    benefits: ["Creative freedom", "Design tools budget", "Mentorship program", "Hybrid work"],
    posted: new Date("2024-01-20"),
    applicants: 31,
    match: 85,
  },
]

const mockApplications: Application[] = [
  {
    id: "1",
    job: mockJobs[0],
    status: "interview",
    appliedDate: new Date("2024-01-15"),
    lastUpdate: new Date("2024-01-18"),
    notes: "Technical interview scheduled for next week",
  },
  {
    id: "2",
    job: mockJobs[1],
    status: "screening",
    appliedDate: new Date("2024-01-17"),
    lastUpdate: new Date("2024-01-19"),
    notes: "HR screening completed, waiting for technical round",
  },
]

const mockInterviews: Interview[] = [
  {
    id: "react-technical",
    type: "technical",
    difficulty: "Medium",
    duration: 45,
    questions: [
      "Explain React hooks and their lifecycle",
      "How would you optimize a slow React component?",
      "Implement a custom hook for API calls",
    ],
    tips: ["Practice coding on a whiteboard", "Explain your thought process", "Ask clarifying questions"],
  },
  {
    id: "behavioral-leadership",
    type: "behavioral",
    difficulty: "Medium",
    duration: 30,
    questions: [
      "Tell me about a time you led a difficult project",
      "How do you handle conflicts in a team?",
      "Describe your biggest professional failure",
    ],
    tips: ["Use the STAR method", "Be specific with examples", "Show growth mindset"],
  },
]

const mockPortfolio: Portfolio[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
    image: "/ecommerce-platform-showcase.png",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://mystore.demo.com",
    githubUrl: "https://github.com/user/ecommerce",
    featured: true,
  },
  {
    id: "2",
    title: "AI Chat Assistant",
    description: "Intelligent chatbot using OpenAI API with context awareness and memory",
    image: "/ai-chat-assistant-demo.png",
    tech: ["Python", "OpenAI API", "FastAPI", "React"],
    liveUrl: "https://chatbot.demo.com",
    githubUrl: "https://github.com/user/ai-chat",
    featured: true,
  },
  {
    id: "3",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for business analytics with real-time updates",
    image: "/data-dashboard-analytics.png",
    tech: ["D3.js", "React", "WebSocket", "PostgreSQL"],
    liveUrl: "https://dashboard.demo.com",
    githubUrl: "https://github.com/user/dashboard",
    featured: false,
  },
]

const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Engineering Manager",
    company: "Google",
    avatar: "/placeholder.svg",
    expertise: ["Leadership", "System Design", "Career Growth"],
    experience: 12,
    rating: 4.9,
    sessions: 156,
    available: true,
  },
  {
    id: "2",
    name: "David Chen",
    title: "Principal Designer",
    company: "Apple",
    avatar: "/placeholder.svg",
    expertise: ["Product Design", "Design Systems", "User Research"],
    experience: 8,
    rating: 4.8,
    sessions: 89,
    available: true,
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    title: "AI Research Scientist",
    company: "OpenAI",
    avatar: "/placeholder.svg",
    expertise: ["Machine Learning", "Research", "Technical Writing"],
    experience: 6,
    rating: 4.9,
    sessions: 67,
    available: false,
  },
]

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [currentJobIndex, setCurrentJobIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-background/90 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Career Center
              </h1>
              <p className="text-muted-foreground">Your pathway to dream opportunities</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                92% Job Match Rate
              </Badge>
              <Button className="bg-primary hover:bg-primary/80">
                <Plus className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-card/50 border border-border/50">
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Job Match
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Applications
            </TabsTrigger>
            <TabsTrigger
              value="interviews"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Interview Prep
            </TabsTrigger>
            <TabsTrigger
              value="salary"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Salary Tools
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="network"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Network
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-8">
            <JobMatchTab
              jobs={mockJobs}
              currentJobIndex={currentJobIndex}
              setCurrentJobIndex={setCurrentJobIndex}
              swipeDirection={swipeDirection}
              setSwipeDirection={setSwipeDirection}
            />
          </TabsContent>

          <TabsContent value="applications" className="space-y-8">
            <ApplicationsTab applications={mockApplications} />
          </TabsContent>

          <TabsContent value="interviews" className="space-y-8">
            <InterviewsTab interviews={mockInterviews} />
          </TabsContent>

          <TabsContent value="salary" className="space-y-8">
            <SalaryTab />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-8">
            <PortfolioTab portfolio={mockPortfolio} />
          </TabsContent>

          <TabsContent value="network" className="space-y-8">
            <NetworkTab mentors={mockMentors} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function JobMatchTab({
  jobs,
  currentJobIndex,
  setCurrentJobIndex,
  swipeDirection,
  setSwipeDirection,
}: {
  jobs: Job[]
  currentJobIndex: number
  setCurrentJobIndex: (index: number) => void
  swipeDirection: "left" | "right" | null
  setSwipeDirection: (direction: "left" | "right" | null) => void
}) {
  const currentJob = jobs[currentJobIndex]

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      setCurrentJobIndex((currentJobIndex + 1) % jobs.length)
      setSwipeDirection(null)
    }, 300)
  }

  if (!currentJob) return null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Find Your Perfect Match</h2>
        <p className="text-muted-foreground">Swipe right to save, left to pass</p>
      </div>

      {/* Job Card */}
      <div className="relative">
        <Card
          className={`p-8 bg-card/50 border-border/50 transition-all duration-300 ${
            swipeDirection === "right"
              ? "transform translate-x-full rotate-12 opacity-0"
              : swipeDirection === "left"
                ? "transform -translate-x-full -rotate-12 opacity-0"
                : ""
          }`}
        >
          {/* Match Score */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-lg px-3 py-1">
              {currentJob.match}% Match
            </Badge>
          </div>

          {/* Company Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{currentJob.title}</h3>
              <p className="text-lg text-muted-foreground">{currentJob.company}</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{currentJob.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                <span>{currentJob.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-secondary" />
                <span>
                  ${currentJob.salary.min.toLocaleString()} - ${currentJob.salary.max.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{currentJob.applicants} applicants</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {currentJob.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-primary/50 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{currentJob.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {currentJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {currentJob.benefits.map((benefit) => (
                  <Badge key={benefit} variant="outline" className="border-secondary/50 text-secondary">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleSwipe("left")}
              className="w-16 h-16 rounded-full border-destructive/50 hover:bg-destructive/10 bg-transparent"
            >
              <X className="w-6 h-6 text-destructive" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-accent/50 hover:bg-accent/10 bg-transparent"
            >
              <Eye className="w-6 h-6 text-accent" />
            </Button>
            <Button
              size="lg"
              onClick={() => handleSwipe("right")}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
            >
              <Heart className="w-6 h-6 text-white" />
            </Button>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentJobIndex(Math.max(0, currentJobIndex - 1))}
            disabled={currentJobIndex === 0}
            className="border-border/50 hover:bg-card/50 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentJobIndex + 1} of {jobs.length}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentJobIndex(Math.min(jobs.length - 1, currentJobIndex + 1))}
            disabled={currentJobIndex === jobs.length - 1}
            className="border-border/50 hover:bg-card/50 bg-transparent"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ApplicationsTab({ applications }: { applications: Application[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Application Tracker</h2>
        <Button className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Pipeline Overview */}
      <Card className="p-6 bg-card/50 border-border/50">
        <h3 className="text-xl font-bold mb-6">Application Pipeline</h3>
        <div className="grid grid-cols-5 gap-4">
          {["Applied", "Screening", "Interview", "Offer", "Rejected"].map((stage, index) => {
            const count = applications.filter((app) => {
              const statusMap = {
                Applied: "applied",
                Screening: "screening",
                Interview: "interview",
                Offer: "offer",
                Rejected: "rejected",
              }
              return app.status === statusMap[stage as keyof typeof statusMap]
            }).length

            return (
              <div key={stage} className="text-center p-4 bg-background/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">{count}</div>
                <div className="text-sm text-muted-foreground">{stage}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="p-6 bg-card/50 border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{application.job.title}</h3>
                  <p className="text-muted-foreground">{application.job.company}</p>
                </div>
              </div>
              <Badge
                className={`${
                  application.status === "offer"
                    ? "bg-green-500/20 text-green-500 border-green-500/30"
                    : application.status === "interview"
                      ? "bg-primary/20 text-primary border-primary/30"
                      : application.status === "screening"
                        ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                        : application.status === "rejected"
                          ? "bg-red-500/20 text-red-500 border-red-500/30"
                          : "bg-muted/20 text-muted-foreground border-muted/30"
                }`}
              >
                {application.status}
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Applied: {application.appliedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Updated: {application.lastUpdate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{application.job.location}</span>
              </div>
            </div>

            {application.notes && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">{application.notes}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View Job
              </Button>
              <Button size="sm" variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Add Note
              </Button>
              <Button size="sm" variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Follow Up
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function InterviewsTab({ interviews }: { interviews: Interview[] }) {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Interview Preparation</h2>
        <Button className="bg-accent hover:bg-accent/80">
          <Play className="w-4 h-4 mr-2" />
          Start Mock Interview
        </Button>
      </div>

      {selectedInterview ? (
        <InterviewSimulator interview={selectedInterview} onBack={() => setSelectedInterview(null)} />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {interviews.map((interview) => (
            <Card
              key={interview.id}
              className="p-6 bg-card/50 border-border/50 hover:border-accent/50 transition-colors cursor-pointer"
              onClick={() => setSelectedInterview(interview)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 capitalize">{interview.type} Interview</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`${
                        interview.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-500 border-green-500/30"
                          : interview.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                            : "bg-red-500/20 text-red-500 border-red-500/30"
                      }`}
                    >
                      {interview.difficulty}
                    </Badge>
                    <Badge className="bg-accent/20 text-accent border-accent/30">{interview.duration} min</Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                  {interview.type === "technical" ? (
                    <Target className="w-6 h-6 text-white" />
                  ) : interview.type === "behavioral" ? (
                    <Users className="w-6 h-6 text-white" />
                  ) : (
                    <Network className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Sample Questions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {interview.questions.slice(0, 2).map((question, index) => (
                      <li key={index}>• {question}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {interview.tips.slice(0, 2).map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30">
                <Play className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function InterviewSimulator({ interview, onBack }: { interview: Interview; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [answer, setAnswer] = useState("")

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="border-border/50 hover:bg-card/50 bg-transparent">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h3 className="text-2xl font-bold capitalize">{interview.type} Interview Simulation</h3>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {interview.questions.length}
          </p>
        </div>
      </div>

      <Card className="p-8 bg-card/50 border-border/50">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h4 className="text-lg font-semibold mb-2">AI Interviewer</h4>
          <p className="text-muted-foreground">Take your time and think through your answer</p>
        </div>

        <div className="bg-background/50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-3">Question:</h4>
          <p className="text-lg">{interview.questions[currentQuestion]}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Your Answer:</h4>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isRecording ? "destructive" : "outline"}
                onClick={() => setIsRecording(!isRecording)}
                className={isRecording ? "" : "border-accent/50 hover:bg-accent/10 bg-transparent"}
              >
                {isRecording ? (
                  <>
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Record Audio
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                <Video className="w-4 h-4 mr-2" />
                Video Practice
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Type your answer here or use voice recording..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[150px] bg-background/50 border-border/50 focus:border-accent/50"
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="border-border/50 hover:bg-card/50 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentQuestion < interview.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setAnswer("")
              } else {
                // Finish interview
                alert("Interview completed! AI feedback will be provided.")
              }
            }}
            className="bg-accent hover:bg-accent/80"
          >
            {currentQuestion === interview.questions.length - 1 ? "Finish Interview" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/10 via-secondary/5 to-primary/10 border-accent/20">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          Interview Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {interview.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function SalaryTab() {
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")
  const [experience, setExperience] = useState("")

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Salary Intelligence</h2>
        <p className="text-muted-foreground">Get data-driven insights for salary negotiations</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Salary Calculator */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Salary Calculator
          </h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                placeholder="e.g. San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <Input
                placeholder="e.g. 5"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/80">
            <BarChart3 className="w-4 h-4 mr-2" />
            Calculate Salary Range
          </Button>
        </Card>

        {/* Negotiation Simulator */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Handshake className="w-5 h-5 text-accent" />
            Negotiation Simulator
          </h3>
          <div className="space-y-4 mb-6">
            <div className="bg-background/50 rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold mb-2">Practice Scenarios</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Salary increase request</li>
                <li>• Counter-offer negotiation</li>
                <li>• Benefits discussion</li>
                <li>• Equity compensation</li>
              </ul>
            </div>
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">AI-Powered Feedback</h4>
              <p className="text-sm text-muted-foreground">
                Get real-time feedback on your negotiation style and suggestions for improvement.
              </p>
            </div>
          </div>
          <Button className="w-full bg-accent hover:bg-accent/80">
            <Play className="w-4 h-4 mr-2" />
            Start Negotiation Practice
          </Button>
        </Card>
      </div>

      {/* Market Data */}
      <Card className="p-6 bg-card/50 border-border/50">
        <h3 className="text-xl font-bold mb-6">Market Insights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">$142K</div>
            <div className="text-sm text-muted-foreground">Average Frontend Dev Salary</div>
          </div>
          <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <div className="text-3xl font-bold text-secondary mb-2">15%</div>
            <div className="text-sm text-muted-foreground">YoY Salary Growth</div>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-3xl font-bold text-accent mb-2">89%</div>
            <div className="text-sm text-muted-foreground">Successful Negotiations</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function PortfolioTab({ portfolio }: { portfolio: Portfolio[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Portfolio Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-secondary hover:bg-secondary/80">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{portfolio.length}</div>
          <div className="text-sm text-muted-foreground">Total Projects</div>
        </Card>
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-secondary mb-2">{portfolio.filter((p) => p.featured).length}</div>
          <div className="text-sm text-muted-foreground">Featured</div>
        </Card>
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-accent mb-2">{portfolio.filter((p) => p.liveUrl).length}</div>
          <div className="text-sm text-muted-foreground">Live Demos</div>
        </Card>
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-yellow-500 mb-2">1.2K</div>
          <div className="text-sm text-muted-foreground">Total Views</div>
        </Card>
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden bg-card/50 border-border/50 hover:border-secondary/50 transition-colors group"
          >
            <div className="relative">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <Button size="sm" className="bg-primary/90 hover:bg-primary text-white">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Live
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/50 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
              {project.featured && (
                <Badge className="absolute top-4 right-4 bg-yellow-500/90 text-white border-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs border-secondary/50 text-secondary">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-xs border-border/50">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 500) + 100} views</span>
                </div>
                <Button size="sm" variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Portfolio Actions */}
      <Card className="p-6 bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/10 border-secondary/20">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Share Your Portfolio</h3>
          <p className="text-muted-foreground mb-6">
            Your portfolio is ready to impress employers. Share it with a custom domain or download as PDF.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-secondary hover:bg-secondary/80">
              <Globe className="w-4 h-4 mr-2" />
              Get Custom Domain
            </Button>
            <Button variant="outline" className="border-secondary/50 hover:bg-secondary/10 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="border-secondary/50 hover:bg-secondary/10 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function NetworkTab({ mentors }: { mentors: Mentor[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Professional Network</h2>
        <Button className="bg-primary hover:bg-primary/80">
          <Users className="w-4 h-4 mr-2" />
          Find Mentors
        </Button>
      </div>

      {/* Network Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">47</div>
          <div className="text-sm text-muted-foreground">Connections</div>
        </Card>
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-secondary mb-2">12</div>
          <div className="text-sm text-muted-foreground">Mentors</div>
        </Card>
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-accent mb-2">8</div>
          <div className="text-sm text-muted-foreground">Sessions This Month</div>
        </Card>
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <div className="text-2xl font-bold text-yellow-500 mb-2">4.9</div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </Card>
      </div>

      {/* Available Mentors */}
      <div>
        <h3 className="text-xl font-bold mb-6">Available Mentors</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-primary/50">
                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold">{mentor.name}</h4>
                  <p className="text-sm text-muted-foreground">{mentor.title}</p>
                  <p className="text-sm text-muted-foreground">{mentor.company}</p>
                </div>
                {mentor.available && <div className="w-3 h-3 bg-green-500 rounded-full" />}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Experience</span>
                  <span className="font-semibold">{mentor.experience} years</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{mentor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Sessions</span>
                  <span className="font-semibold">{mentor.sessions}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs border-primary/50 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                  disabled={!mentor.available}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {mentor.available ? "Connect" : "Unavailable"}
                </Button>
                <Button size="sm" variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Networking Events */}
      <Card className="p-6 bg-card/50 border-border/50">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Upcoming Networking Events
        </h3>
        <div className="space-y-4">
          {[
            {
              title: "Tech Career Fair 2024",
              date: "Feb 15, 2024",
              time: "2:00 PM PST",
              attendees: 500,
              type: "Virtual",
            },
            {
              title: "AI Professionals Meetup",
              date: "Feb 20, 2024",
              time: "6:00 PM PST",
              attendees: 150,
              type: "Hybrid",
            },
            {
              title: "Women in Tech Panel",
              date: "Feb 25, 2024",
              time: "1:00 PM PST",
              attendees: 200,
              type: "Virtual",
            },
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {event.date} at {event.time}
                  </span>
                  <span>{event.attendees} attendees</span>
                  <Badge variant="outline" className="border-accent/50 text-accent">
                    {event.type}
                  </Badge>
                </div>
              </div>
              <Button size="sm" className="bg-accent hover:bg-accent/80">
                Register
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
