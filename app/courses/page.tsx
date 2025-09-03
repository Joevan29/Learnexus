"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  Brain,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  ArrowLeft,
  BookOpen,
  Trophy,
  Zap,
} from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  students: number
  rating: number
  price: number
  thumbnail: string
  tags: string[]
  description: string
  curriculum: string[]
  projects: number
  icon: any
}

const courses: Course[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals & Neural Networks",
    instructor: "Dr. Sarah Chen",
    category: "AI & ML",
    level: "Beginner",
    duration: "12 weeks",
    students: 15420,
    rating: 4.9,
    price: 299,
    thumbnail: "/ai-neural-network.png",
    tags: ["Python", "TensorFlow", "Deep Learning"],
    description: "Master the fundamentals of artificial intelligence and build your first neural networks",
    curriculum: ["Introduction to AI", "Neural Network Basics", "Training Models", "Real-world Applications"],
    projects: 8,
    icon: Brain,
  },
  {
    id: "react-mastery",
    title: "Advanced React & Next.js Mastery",
    instructor: "Alex Rodriguez",
    category: "Development",
    level: "Advanced",
    duration: "10 weeks",
    students: 12350,
    rating: 4.8,
    price: 399,
    thumbnail: "/placeholder-4fr80.png",
    tags: ["React", "Next.js", "TypeScript"],
    description: "Build production-ready applications with advanced React patterns and Next.js features",
    curriculum: ["Advanced Hooks", "Server Components", "Performance Optimization", "Deployment"],
    projects: 6,
    icon: Code,
  },
  {
    id: "ui-ux-future",
    title: "Future UI/UX Design with 3D Elements",
    instructor: "Maya Patel",
    category: "Design",
    level: "Intermediate",
    duration: "8 weeks",
    students: 9870,
    rating: 4.9,
    price: 349,
    thumbnail: "/placeholder-dc9kq.png",
    tags: ["Figma", "Three.js", "Blender"],
    description: "Create stunning interfaces with 3D elements and immersive user experiences",
    curriculum: ["3D Design Principles", "Interactive Prototypes", "Animation Techniques", "User Testing"],
    projects: 10,
    icon: Palette,
  },
  {
    id: "blockchain-dev",
    title: "Blockchain Development Bootcamp",
    instructor: "David Kim",
    category: "Blockchain",
    level: "Intermediate",
    duration: "14 weeks",
    students: 7650,
    rating: 4.7,
    price: 499,
    thumbnail: "/placeholder-bmh66.png",
    tags: ["Solidity", "Web3", "Smart Contracts"],
    description: "Build decentralized applications and smart contracts on the blockchain",
    curriculum: ["Blockchain Basics", "Smart Contract Development", "DApp Creation", "Security Practices"],
    projects: 5,
    icon: Database,
  },
  {
    id: "mobile-flutter",
    title: "Cross-Platform Mobile with Flutter",
    instructor: "Lisa Wang",
    category: "Mobile",
    level: "Beginner",
    duration: "9 weeks",
    students: 11200,
    rating: 4.8,
    price: 279,
    thumbnail: "/flutter-app-development.png",
    tags: ["Flutter", "Dart", "Firebase"],
    description: "Create beautiful mobile apps for iOS and Android with Flutter",
    curriculum: ["Flutter Basics", "State Management", "API Integration", "App Store Deployment"],
    projects: 7,
    icon: Smartphone,
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Architecture",
    instructor: "Michael Brown",
    category: "DevOps",
    level: "Advanced",
    duration: "11 weeks",
    students: 8930,
    rating: 4.6,
    price: 449,
    thumbnail: "/cloud-computing-devops-infrastructure.jpg",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Master cloud infrastructure and DevOps practices for scalable applications",
    curriculum: ["Cloud Fundamentals", "Container Orchestration", "CI/CD Pipelines", "Monitoring"],
    projects: 4,
    icon: Globe,
  },
]

const categories = ["All", "AI & ML", "Development", "Design", "Blockchain", "Mobile", "DevOps"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, selectedLevel])

  if (!mounted) return null

  if (selectedCourse) {
    return <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Course Catalog
              </h1>
              <p className="text-muted-foreground mt-2">Discover your next learning adventure</p>
            </div>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border-border/50 hover:bg-card/50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className={
                    selectedLevel === level
                      ? "bg-secondary text-secondary-foreground"
                      : "border-border/50 hover:bg-card/50"
                  }
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} onClick={() => setSelectedCourse(course)} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CourseCard({ course, index, onClick }: { course: Course; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = course.icon

  return (
    <Card
      className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Play button overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center glow-pulse">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 text-primary-foreground">{course.category}</Badge>
        </div>

        {/* Level badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className={`${
              course.level === "Beginner"
                ? "bg-secondary/90 text-secondary-foreground"
                : course.level === "Intermediate"
                  ? "bg-accent/90 text-accent-foreground"
                  : "bg-destructive/90 text-destructive-foreground"
            }`}
          >
            {course.level}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-border/50">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.students.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">${course.price}</div>
          <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  )
}

function CourseDetailView({ course, onBack }: { course: Course; onBack: () => void }) {
  const IconComponent = course.icon

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-primary/10 text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-pulse">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Badge className="bg-primary/90 text-primary-foreground mb-2">{course.category}</Badge>
                  <Badge
                    variant="secondary"
                    className={`ml-2 ${
                      course.level === "Beginner"
                        ? "bg-secondary/90 text-secondary-foreground"
                        : course.level === "Intermediate"
                          ? "bg-accent/90 text-accent-foreground"
                          : "bg-destructive/90 text-destructive-foreground"
                    }`}
                  >
                    {course.level}
                  </Badge>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {course.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">Lead Instructor</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-pulse"
                >
                  Enroll Now - ${course.price}
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                  <Play className="w-4 h-4 mr-2" />
                  Preview Course
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center glow-pulse cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.curriculum.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-accent" />
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-3">
                {course.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-base py-2 px-4 border-primary/30 hover:bg-primary/10"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-secondary" />
                Hands-on Projects
              </h2>
              <div className="bg-card/50 rounded-lg border border-border/50 p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">{course.projects}</div>
                  <div className="text-muted-foreground">Real-world projects to build your portfolio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="font-bold text-lg mb-4">Course Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-semibold">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-semibold">{course.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Instructor */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="font-bold text-lg mb-4">Your Instructor</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{course.instructor}</div>
                  <div className="text-sm text-muted-foreground">Senior Developer</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Industry expert with 10+ years of experience in {course.category.toLowerCase()}.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
