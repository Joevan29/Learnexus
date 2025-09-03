"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Target,
  Code,
  Users,
  MessageCircle,
  Play,
  BookOpen,
  Zap,
  Clock,
  TrendingUp,
  Award,
  Flame,
  Globe,
  GitBranch,
  Eye,
  Settings,
  Bell,
  Plus,
  MapPin,
  CheckCircle,
  Circle,
  Lock,
} from "lucide-react"

interface StudentData {
  name: string
  level: number
  xp: number
  xpToNext: number
  streak: number
  coursesCompleted: number
  currentCourses: Course[]
  achievements: Achievement[]
  learningPath: LearningPathNode[]
  recentActivity: Activity[]
  studyGroups: StudyGroup[]
  projects: Project[]
}

interface Course {
  id: string
  title: string
  progress: number
  nextLesson: string
  timeSpent: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface LearningPathNode {
  id: string
  title: string
  status: "completed" | "current" | "locked" | "available"
  type: "course" | "project" | "assessment" | "milestone"
  position: { x: number; y: number }
  connections: string[]
}

interface Activity {
  id: string
  type: "course_progress" | "achievement" | "project" | "social"
  title: string
  timestamp: Date
  details: string
}

interface StudyGroup {
  id: string
  name: string
  members: number
  topic: string
  nextSession: Date
  isActive: boolean
}

interface Project {
  id: string
  title: string
  description: string
  progress: number
  lastModified: Date
  tech: string[]
  isDeployed: boolean
}

const mockStudentData: StudentData = {
  name: "Joevan Pramana Achmad",
  level: 12,
  xp: 2450,
  xpToNext: 550,
  streak: 7,
  coursesCompleted: 3,
  currentCourses: [
    {
      id: "react-advanced",
      title: "Advanced React Patterns",
      progress: 68,
      nextLesson: "Custom Hooks Deep Dive",
      timeSpent: 24,
      difficulty: "Advanced",
      category: "Frontend",
    },
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      progress: 34,
      nextLesson: "Neural Network Basics",
      timeSpent: 12,
      difficulty: "Intermediate",
      category: "AI/ML",
    },
  ],
  achievements: [
    {
      id: "first-course",
      title: "First Steps",
      description: "Completed your first course",
      icon: "🎯",
      unlockedAt: new Date("2024-01-15"),
      rarity: "common",
    },
    {
      id: "streak-master",
      title: "Streak Master",
      description: "7-day learning streak",
      icon: "🔥",
      unlockedAt: new Date("2024-01-20"),
      rarity: "rare",
    },
    {
      id: "code-ninja",
      title: "Code Ninja",
      description: "Solved 50 coding challenges",
      icon: "⚡",
      unlockedAt: new Date("2024-01-18"),
      rarity: "epic",
    },
  ],
  learningPath: [
    {
      id: "foundations",
      title: "Programming Foundations",
      status: "completed",
      type: "course",
      position: { x: 10, y: 50 },
      connections: ["web-basics"],
    },
    {
      id: "web-basics",
      title: "Web Development Basics",
      status: "completed",
      type: "course",
      position: { x: 25, y: 30 },
      connections: ["react-intro", "backend-intro"],
    },
    {
      id: "react-intro",
      title: "React Introduction",
      status: "completed",
      type: "course",
      position: { x: 40, y: 20 },
      connections: ["react-advanced"],
    },
    {
      id: "react-advanced",
      title: "Advanced React",
      status: "current",
      type: "course",
      position: { x: 60, y: 25 },
      connections: ["fullstack-project"],
    },
    {
      id: "backend-intro",
      title: "Backend Development",
      status: "available",
      type: "course",
      position: { x: 40, y: 60 },
      connections: ["database-design"],
    },
    {
      id: "fullstack-project",
      title: "Full-Stack Project",
      status: "locked",
      type: "project",
      position: { x: 80, y: 40 },
      connections: [],
    },
  ],
  recentActivity: [
    {
      id: "1",
      type: "course_progress",
      title: "Completed: Custom Hooks Lesson",
      timestamp: new Date("2024-01-20T14:30:00"),
      details: "Advanced React Patterns",
    },
    {
      id: "2",
      type: "achievement",
      title: "Unlocked: Streak Master",
      timestamp: new Date("2024-01-20T09:00:00"),
      details: "7-day learning streak achieved",
    },
  ],
  studyGroups: [
    {
      id: "react-masters",
      name: "React Masters",
      members: 12,
      topic: "Advanced React Patterns",
      nextSession: new Date("2024-01-21T19:00:00"),
      isActive: true,
    },
    {
      id: "ai-explorers",
      name: "AI Explorers",
      members: 8,
      topic: "Machine Learning Basics",
      nextSession: new Date("2024-01-22T18:00:00"),
      isActive: false,
    },
  ],
  projects: [
    {
      id: "portfolio-site",
      title: "Personal Portfolio",
      description: "Modern portfolio with React and Three.js",
      progress: 85,
      lastModified: new Date("2024-01-20T16:45:00"),
      tech: ["React", "Three.js", "Tailwind"],
      isDeployed: true,
    },
    {
      id: "task-manager",
      title: "Task Management App",
      description: "Full-stack task manager with real-time updates",
      progress: 42,
      lastModified: new Date("2024-01-19T11:20:00"),
      tech: ["Next.js", "Supabase", "TypeScript"],
      isDeployed: false,
    },
  ],
}

export default function DashboardPage() {
  const [studentData, setStudentData] = useState<StudentData>(mockStudentData)
  const [activeTab, setActiveTab] = useState("overview")
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
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary/50">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">Welcome back, {studentData.name}!</h1>
                <p className="text-sm text-muted-foreground">Ready to continue your learning journey?</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-500">{studentData.streak} day streak</span>
              </div>
              <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 border border-border/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="path"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Learning Path
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Community
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <OverviewTab studentData={studentData} />
          </TabsContent>

          <TabsContent value="courses" className="space-y-8">
            <CoursesTab studentData={studentData} />
          </TabsContent>

          <TabsContent value="path" className="space-y-8">
            <LearningPathTab studentData={studentData} />
          </TabsContent>

          <TabsContent value="social" className="space-y-8">
            <SocialTab studentData={studentData} />
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
            <ProjectsTab studentData={studentData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OverviewTab({ studentData }: { studentData: StudentData }) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Level Progress */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Level {studentData.level}</h2>
              <p className="text-muted-foreground">Keep learning to reach the next level!</p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow-pulse">
              <span className="text-white font-bold text-xl">{studentData.level}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{studentData.xp} XP</span>
              <span>{studentData.xp + studentData.xpToNext} XP</span>
            </div>
            <Progress value={(studentData.xp / (studentData.xp + studentData.xpToNext)) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">{studentData.xpToNext} XP to next level</p>
          </div>
        </Card>

        {/* Current Courses */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Continue Learning
          </h3>
          <div className="space-y-4">
            {studentData.currentCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{course.title}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        course.difficulty === "Beginner"
                          ? "border-secondary/50 text-secondary"
                          : course.difficulty === "Intermediate"
                            ? "border-accent/50 text-accent"
                            : "border-destructive/50 text-destructive"
                      }`}
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Next: {course.nextLesson}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.timeSpent}h spent
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {course.progress}% complete
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-2 mt-2" />
                </div>
                <Button
                  size="sm"
                  className="ml-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Continue
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {studentData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {activity.type === "achievement" ? (
                    <Trophy className="w-4 h-4 text-primary" />
                  ) : activity.type === "course_progress" ? (
                    <BookOpen className="w-4 h-4 text-primary" />
                  ) : (
                    <Code className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Quick Stats */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-lg font-bold mb-4">Your Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Courses Completed</span>
              </div>
              <span className="font-bold text-yellow-500">{studentData.coursesCompleted}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Current Streak</span>
              </div>
              <span className="font-bold text-orange-500">{studentData.streak} days</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">Total XP</span>
              </div>
              <span className="font-bold text-primary">{studentData.xp}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-accent" />
                <span className="text-sm">Projects</span>
              </div>
              <span className="font-bold text-accent">{studentData.projects.length}</span>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {studentData.achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                <Badge
                  className={`text-xs ${
                    achievement.rarity === "legendary"
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                      : achievement.rarity === "epic"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : achievement.rarity === "rare"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          : "bg-gray-500 text-white"
                  }`}
                >
                  {achievement.rarity}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 border-yellow-500/50 hover:bg-yellow-500/10 bg-transparent">
            View All Achievements
          </Button>
        </Card>

        {/* Study Groups */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            Study Groups
          </h3>
          <div className="space-y-3">
            {studentData.studyGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{group.name}</p>
                    {group.isActive && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {group.members} members • {group.topic}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-secondary/50 hover:bg-secondary/10 text-secondary bg-transparent"
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function CoursesTab({ studentData }: { studentData: StudentData }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Courses</h2>
        <Button className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" />
          Browse Courses
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {studentData.currentCourses.map((course) => (
          <Card key={course.id} className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <Badge
                  variant="outline"
                  className={`${
                    course.difficulty === "Beginner"
                      ? "border-secondary/50 text-secondary"
                      : course.difficulty === "Intermediate"
                        ? "border-accent/50 text-accent"
                        : "border-destructive/50 text-destructive"
                  }`}
                >
                  {course.difficulty}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{course.progress}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">Next lesson: {course.nextLesson}</p>

            <div className="space-y-3 mb-6">
              <Progress value={course.progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{course.timeSpent} hours spent</span>
                <span>{course.category}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/80">
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function LearningPathTab({ studentData }: { studentData: StudentData }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
        <p className="text-muted-foreground">Navigate through your personalized learning path</p>
      </div>

      <Card className="p-8 bg-card/50 border-border/50 overflow-hidden">
        <div className="relative h-96 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-lg">
          {/* Learning Path Visualization */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Connections */}
            {studentData.learningPath.map((node) =>
              node.connections.map((connectionId) => {
                const targetNode = studentData.learningPath.find((n) => n.id === connectionId)
                if (!targetNode) return null
                return (
                  <line
                    key={`${node.id}-${connectionId}`}
                    x1={`${node.position.x}%`}
                    y1={`${node.position.y}%`}
                    x2={`${targetNode.position.x}%`}
                    y2={`${targetNode.position.y}%`}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-border opacity-50"
                    strokeDasharray={node.status === "completed" ? "0" : "5,5"}
                  />
                )
              }),
            )}
          </svg>

          {/* Nodes */}
          {studentData.learningPath.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 ${
                  node.status === "completed"
                    ? "bg-secondary border-secondary text-white"
                    : node.status === "current"
                      ? "bg-primary border-primary text-white glow-pulse"
                      : node.status === "available"
                        ? "bg-accent/20 border-accent text-accent"
                        : "bg-muted/20 border-muted text-muted-foreground"
                }`}
              >
                {node.status === "completed" ? (
                  <CheckCircle className="w-6 h-6" />
                ) : node.status === "current" ? (
                  <MapPin className="w-6 h-6" />
                ) : node.status === "locked" ? (
                  <Lock className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background border border-border/50 rounded-lg p-3 shadow-lg min-w-max">
                  <p className="font-semibold text-sm">{node.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                  <Badge
                    size="sm"
                    className={`mt-1 ${
                      node.status === "completed"
                        ? "bg-secondary text-secondary-foreground"
                        : node.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : node.status === "available"
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {node.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary rounded-full" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full glow-pulse" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent/50 rounded-full" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted/50 rounded-full" />
            <span>Locked</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

function SocialTab({ studentData }: { studentData: StudentData }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Community</h2>
        <Button className="bg-secondary hover:bg-secondary/80">
          <Plus className="w-4 h-4 mr-2" />
          Join Study Group
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Study Groups */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            My Study Groups
          </h3>
          <div className="space-y-4">
            {studentData.studyGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">{group.members} members</p>
                    </div>
                  </div>
                  {group.isActive && <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{group.topic}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Next session: {group.nextSession.toLocaleDateString()}
                  </span>
                  <Button
                    size="sm"
                    className="bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Weekly Leaderboard
          </h3>
          <div className="space-y-3">
            {[
              { name: "Sarah Kim", xp: 2850, rank: 1 },
              { name: "Joevan Pramana Achmad", xp: 2450, rank: 2 },
              { name: "Mike Johnson", xp: 2200, rank: 3 },
              { name: "Emma Davis", xp: 1980, rank: 4 },
              { name: "David Lee", xp: 1750, rank: 5 },
            ].map((user) => (
              <div
                key={user.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === studentData.name ? "bg-primary/10 border border-primary/30" : "bg-background/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.rank === 1
                        ? "bg-yellow-500 text-white"
                        : user.rank === 2
                          ? "bg-gray-400 text-white"
                          : user.rank === 3
                            ? "bg-orange-600 text-white"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-yellow-400">{user.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function ProjectsTab({ studentData }: { studentData: StudentData }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Projects</h2>
        <Button className="bg-accent hover:bg-accent/80">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {studentData.projects.map((project) => (
          <Card key={project.id} className="p-6 bg-card/50 border-border/50 hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-accent/50 text-accent">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              {project.isDeployed && (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                  <Globe className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-bold text-accent">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Last modified: {project.lastModified.toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30">
                <Code className="w-4 h-4 mr-2" />
                Open Editor
              </Button>
              <Button variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                <GitBranch className="w-4 h-4" />
              </Button>
              {project.isDeployed && (
                <Button variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                  <Globe className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
