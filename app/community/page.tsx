"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Users,
  Calendar,
  Clock,
  Play,
  VolumeX,
  Monitor,
  Coffee,
  Music,
  Zap,
  Code,
  Palette,
  Timer,
  Target,
  Flame,
  Plus,
  Send,
  Eye,
  Headphones,
  Mic,
  Video,
  MoreHorizontal,
} from "lucide-react"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    level: number
    badge?: string
  }
  content: string
  image?: string
  project?: {
    title: string
    tech: string[]
    liveUrl?: string
    githubUrl?: string
  }
  timestamp: Date
  likes: number
  comments: number
  isLiked: boolean
  type: "achievement" | "project" | "milestone" | "challenge"
}

interface Challenge {
  id: string
  title: string
  description: string
  type: "coding" | "design" | "algorithm"
  difficulty: "Easy" | "Medium" | "Hard"
  timeLimit: number
  participants: number
  submissions: number
  prize: string
  deadline: Date
  isActive: boolean
}

interface StudyRoom {
  id: string
  name: string
  description: string
  currentUsers: number
  maxUsers: number
  type: "focus" | "collaboration" | "social"
  ambientSound: string
  isActive: boolean
  features: string[]
}

interface Hackathon {
  id: string
  title: string
  description: string
  theme: string
  startDate: Date
  endDate: Date
  participants: number
  maxTeamSize: number
  prizes: string[]
  status: "upcoming" | "active" | "ended"
  registrationOpen: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      level: 15,
      badge: "AI Expert",
    },
    content:
      "Just deployed my first AI-powered chatbot! 🤖 It can help students with coding questions and provides personalized learning suggestions. The journey from idea to deployment was incredible!",
    project: {
      title: "StudyBot AI Assistant",
      tech: ["Python", "OpenAI API", "FastAPI", "React"],
      liveUrl: "https://studybot.demo.com",
      githubUrl: "https://github.com/sarah/studybot",
    },
    timestamp: new Date("2024-01-20T14:30:00"),
    likes: 47,
    comments: 12,
    isLiked: false,
    type: "project",
  },
  {
    id: "2",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg",
      level: 12,
      badge: "Design Guru",
    },
    content:
      "Completed the 30-day UI/UX challenge! 🎨 Each day brought new insights into user psychology and design principles. Here's my final portfolio piece - a futuristic learning platform concept.",
    image: "/design-portfolio-showcase.png",
    timestamp: new Date("2024-01-20T11:15:00"),
    likes: 89,
    comments: 23,
    isLiked: true,
    type: "achievement",
  },
  {
    id: "3",
    author: {
      name: "Maya Patel",
      avatar: "/placeholder.svg",
      level: 18,
      badge: "Code Ninja",
    },
    content:
      "Hit Level 18 today! 🚀 The advanced algorithms course really pushed my problem-solving skills to the next level. Ready for the next challenge!",
    timestamp: new Date("2024-01-20T09:45:00"),
    likes: 34,
    comments: 8,
    isLiked: false,
    type: "milestone",
  },
]

const mockChallenges: Challenge[] = [
  {
    id: "weekly-algo",
    title: "Weekly Algorithm Challenge",
    description:
      "Solve the 'Maximum Subarray Problem' using dynamic programming. Optimize for both time and space complexity.",
    type: "coding",
    difficulty: "Medium",
    timeLimit: 120,
    participants: 234,
    submissions: 89,
    prize: "500 XP + Exclusive Badge",
    deadline: new Date("2024-01-25T23:59:59"),
    isActive: true,
  },
  {
    id: "ui-redesign",
    title: "Mobile App Redesign",
    description: "Redesign a popular mobile app's onboarding flow. Focus on accessibility and user engagement.",
    type: "design",
    difficulty: "Hard",
    timeLimit: 180,
    participants: 156,
    submissions: 42,
    prize: "1000 XP + Design Tools License",
    deadline: new Date("2024-01-27T23:59:59"),
    isActive: true,
  },
]

const mockStudyRooms: StudyRoom[] = [
  {
    id: "focus-zone",
    name: "Deep Focus Zone",
    description: "Quiet environment for intensive coding sessions",
    currentUsers: 12,
    maxUsers: 20,
    type: "focus",
    ambientSound: "Library Ambience",
    isActive: true,
    features: ["Pomodoro Timer", "Ambient Sounds", "Screen Sharing"],
  },
  {
    id: "collab-space",
    name: "Collaboration Hub",
    description: "Work together on projects and help each other debug",
    currentUsers: 8,
    maxUsers: 15,
    type: "collaboration",
    ambientSound: "Café Sounds",
    isActive: true,
    features: ["Voice Chat", "Screen Sharing", "Whiteboard", "Code Editor"],
  },
  {
    id: "social-lounge",
    name: "Social Lounge",
    description: "Casual space to meet fellow learners and discuss tech",
    currentUsers: 25,
    maxUsers: 50,
    type: "social",
    ambientSound: "Lofi Hip Hop",
    isActive: true,
    features: ["Voice Chat", "Music Sharing", "Games", "Networking"],
  },
]

const mockHackathon: Hackathon = {
  id: "ai-future",
  title: "AI for Future Education",
  description: "Build innovative AI-powered tools that revolutionize how we learn and teach",
  theme: "Educational Technology",
  startDate: new Date("2024-02-01T00:00:00"),
  endDate: new Date("2024-02-03T23:59:59"),
  participants: 1247,
  maxTeamSize: 4,
  prizes: ["$5000 Grand Prize", "$2000 Runner-up", "$1000 People's Choice"],
  status: "upcoming",
  registrationOpen: true,
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [mounted, setMounted] = useState(false)
  const [newPost, setNewPost] = useState("")
  const [isPosting, setIsPosting] = useState(false)

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
                Community
              </h1>
              <p className="text-muted-foreground">Connect, learn, and grow together</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                1,247 online
              </Badge>
              <Button className="bg-secondary hover:bg-secondary/80">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
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
              value="feed"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Feed
            </TabsTrigger>
            <TabsTrigger
              value="challenges"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Challenges
            </TabsTrigger>
            <TabsTrigger
              value="study-rooms"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Study Rooms
            </TabsTrigger>
            <TabsTrigger
              value="hackathons"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-8">
            <FeedTab newPost={newPost} setNewPost={setNewPost} isPosting={isPosting} setIsPosting={setIsPosting} />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-8">
            <ChallengesTab />
          </TabsContent>

          <TabsContent value="study-rooms" className="space-y-8">
            <StudyRoomsTab />
          </TabsContent>

          <TabsContent value="hackathons" className="space-y-8">
            <HackathonsTab />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-8">
            <LeaderboardTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FeedTab({
  newPost,
  setNewPost,
  isPosting,
  setIsPosting,
}: {
  newPost: string
  setNewPost: (value: string) => void
  isPosting: boolean
  setIsPosting: (value: boolean) => void
}) {
  const handlePost = async () => {
    if (!newPost.trim()) return
    setIsPosting(true)
    // Simulate posting
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNewPost("")
    setIsPosting(false)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border-2 border-primary/50">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                AC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="Share your learning journey, projects, or achievements..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-border/50 hover:bg-card/50 bg-transparent">
                    <Code className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                  <Button variant="outline" size="sm" className="border-border/50 hover:bg-card/50 bg-transparent">
                    <Palette className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                <Button
                  onClick={handlePost}
                  disabled={!newPost.trim() || isPosting}
                  className="bg-primary hover:bg-primary/80"
                >
                  {isPosting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isPosting ? "Posting..." : "Share"}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Trending Topics */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Trending Topics
          </h3>
          <div className="space-y-3">
            {["#ReactHooks", "#AIChallenge", "#WebGL", "#TypeScript", "#DesignSystems"].map((topic, index) => (
              <div key={topic} className="flex items-center justify-between">
                <span className="text-primary font-medium cursor-pointer hover:underline">{topic}</span>
                <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 500) + 100} posts</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Study Sessions */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            Active Study Sessions
          </h3>
          <div className="space-y-3">
            {mockStudyRooms.slice(0, 3).map((room) => (
              <div key={room.id} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{room.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {room.currentUsers}/{room.maxUsers} users
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-secondary/50 hover:bg-secondary/10 bg-transparent"
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="font-medium text-sm">Weekly Demo Day</p>
              <p className="text-xs text-muted-foreground">Tomorrow at 7:00 PM</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="font-medium text-sm">AI Hackathon Kickoff</p>
              <p className="text-xs text-muted-foreground">Feb 1st at 12:00 PM</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <Card className="p-6 bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary/50">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.author.name}</span>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Level {post.author.level}</Badge>
              {post.author.badge && (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs">
                  {post.author.badge}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {post.timestamp.toLocaleDateString()} at {post.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="hover:bg-card/50">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-sm leading-relaxed mb-4">{post.content}</p>

        {/* Project Card */}
        {post.project && (
          <Card className="p-4 bg-background/50 border-border/50 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold mb-2">{post.project.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {post.project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-accent/50 text-accent">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {post.project.liveUrl && (
                <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                  <Eye className="w-3 h-3 mr-1" />
                  Live Demo
                </Button>
              )}
              {post.project.githubUrl && (
                <Button size="sm" variant="outline" className="border-border/50 hover:bg-card/50 bg-transparent">
                  <Code className="w-3 h-3 mr-1" />
                  Code
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Image */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-64 object-cover" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm transition-colors ${
              isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            {likes}
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
        <Badge
          className={`${
            post.type === "achievement"
              ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
              : post.type === "project"
                ? "bg-primary/20 text-primary border-primary/30"
                : post.type === "milestone"
                  ? "bg-secondary/20 text-secondary border-secondary/30"
                  : "bg-accent/20 text-accent border-accent/30"
          }`}
        >
          {post.type}
        </Badge>
      </div>
    </Card>
  )
}

function ChallengesTab() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Weekly Challenges</h2>
        <Button className="bg-accent hover:bg-accent/80">
          <Trophy className="w-4 h-4 mr-2" />
          Submit Solution
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockChallenges.map((challenge) => (
          <Card key={challenge.id} className="p-6 bg-card/50 border-border/50 hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className={`${
                      challenge.type === "coding"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : challenge.type === "design"
                          ? "bg-accent/20 text-accent border-accent/30"
                          : "bg-secondary/20 text-secondary border-secondary/30"
                    }`}
                  >
                    {challenge.type}
                  </Badge>
                  <Badge
                    className={`${
                      challenge.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-500 border-green-500/30"
                        : challenge.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                          : "bg-red-500/20 text-red-500 border-red-500/30"
                    }`}
                  >
                    {challenge.difficulty}
                  </Badge>
                </div>
              </div>
              {challenge.isActive && (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Active
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{challenge.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-background/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{challenge.participants}</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
              <div className="text-center p-3 bg-background/30 rounded-lg">
                <div className="text-2xl font-bold text-accent">{challenge.submissions}</div>
                <div className="text-sm text-muted-foreground">Submissions</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span>Time Limit</span>
                <span className="font-bold">{challenge.timeLimit} minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Prize</span>
                <span className="font-bold text-yellow-500">{challenge.prize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Deadline</span>
                <span className="font-bold text-destructive">
                  {challenge.deadline.toLocaleDateString()} at {challenge.deadline.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-accent hover:bg-accent/80">
                <Play className="w-4 h-4 mr-2" />
                Start Challenge
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

function StudyRoomsTab() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Virtual Study Rooms</h2>
        <Button className="bg-secondary hover:bg-secondary/80">
          <Plus className="w-4 h-4 mr-2" />
          Create Room
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStudyRooms.map((room) => (
          <Card
            key={room.id}
            className={`p-6 bg-card/50 border-border/50 hover:border-secondary/50 transition-colors cursor-pointer ${
              selectedRoom === room.id ? "border-secondary ring-2 ring-secondary/20" : ""
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-2">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
                <Badge
                  className={`${
                    room.type === "focus"
                      ? "bg-primary/20 text-primary border-primary/30"
                      : room.type === "collaboration"
                        ? "bg-accent/20 text-accent border-accent/30"
                        : "bg-secondary/20 text-secondary border-secondary/30"
                  }`}
                >
                  {room.type}
                </Badge>
              </div>
              {room.isActive && <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span>Occupancy</span>
                <span className="font-bold">
                  {room.currentUsers}/{room.maxUsers}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Ambient Sound</span>
                <span className="font-bold text-accent">{room.ambientSound}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium">Features:</p>
              <div className="flex flex-wrap gap-1">
                {room.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs border-border/50">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30">
              <Users className="w-4 h-4 mr-2" />
              Join Room
            </Button>
          </Card>
        ))}
      </div>

      {/* Room Controls */}
      {selectedRoom && (
        <Card className="p-6 bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/10 border-secondary/20">
          <h3 className="text-xl font-bold mb-6">Room Controls</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Audio Controls */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                Audio
              </h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Café Ambience
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Music className="w-4 h-4 mr-2" />
                  Lofi Hip Hop
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <VolumeX className="w-4 h-4 mr-2" />
                  Silence
                </Button>
              </div>
            </div>

            {/* Communication */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Communication
              </h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Chat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Video Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Screen Share
                </Button>
              </div>
            </div>

            {/* Focus Tools */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Focus Tools
              </h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Pomodoro Timer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Goal Tracker
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border/50 hover:bg-card/50 bg-transparent"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Code Editor
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

function HackathonsTab() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Hackathons</h2>
        <Button className="bg-primary hover:bg-primary/80">
          <Trophy className="w-4 h-4 mr-2" />
          Register Now
        </Button>
      </div>

      {/* Featured Hackathon */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-3">Featured Event</Badge>
            <h3 className="text-3xl font-bold mb-4">{mockHackathon.title}</h3>
            <p className="text-lg text-muted-foreground mb-4">{mockHackathon.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {mockHackathon.startDate.toLocaleDateString()} - {mockHackathon.endDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span>{mockHackathon.participants} registered</span>
              </div>
            </div>
          </div>
          <Badge
            className={`${
              mockHackathon.status === "upcoming"
                ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                : mockHackathon.status === "active"
                  ? "bg-green-500/20 text-green-500 border-green-500/30"
                  : "bg-gray-500/20 text-gray-500 border-gray-500/30"
            }`}
          >
            {mockHackathon.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-background/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">{mockHackathon.participants}</div>
            <div className="text-sm text-muted-foreground">Participants</div>
          </div>
          <div className="text-center p-4 bg-background/30 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-2">{mockHackathon.maxTeamSize}</div>
            <div className="text-sm text-muted-foreground">Max Team Size</div>
          </div>
          <div className="text-center p-4 bg-background/30 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-2">72</div>
            <div className="text-sm text-muted-foreground">Hours</div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="font-semibold">Prizes:</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {mockHackathon.prizes.map((prize, index) => (
              <div
                key={prize}
                className={`p-4 rounded-lg border text-center ${
                  index === 0
                    ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
                    : index === 1
                      ? "bg-gray-400/10 border-gray-400/30 text-gray-400"
                      : "bg-orange-600/10 border-orange-600/30 text-orange-600"
                }`}
              >
                <Trophy className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold">{prize}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
            disabled={!mockHackathon.registrationOpen}
          >
            {mockHackathon.registrationOpen ? "Register Now" : "Registration Closed"}
          </Button>
          <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
            Learn More
          </Button>
        </div>
      </Card>
    </div>
  )
}

function LeaderboardTab() {
  const leaderboardData = [
    { name: "Sarah Chen", xp: 15420, level: 28, streak: 45, badge: "AI Master" },
    { name: "Alex Rodriguez", xp: 14850, level: 27, streak: 32, badge: "Code Ninja" },
    { name: "Maya Patel", xp: 13200, level: 25, streak: 28, badge: "Design Guru" },
    { name: "David Kim", xp: 12750, level: 24, streak: 21, badge: "Full Stack" },
    { name: "Emma Wilson", xp: 11900, level: 23, streak: 19, badge: "UI Expert" },
    { name: "James Liu", xp: 11200, level: 22, streak: 15, badge: "Backend Pro" },
    { name: "Lisa Zhang", xp: 10800, level: 21, streak: 12, badge: "Data Scientist" },
    { name: "Mike Johnson", xp: 10400, level: 20, streak: 8, badge: "DevOps Hero" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Community Leaderboard</h2>
        <p className="text-muted-foreground">Top performers this month</p>
      </div>

      {/* Top 3 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <Card
            key={user.name}
            className={`p-6 text-center ${
              index === 0
                ? "bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border-yellow-500/30"
                : index === 1
                  ? "bg-gradient-to-br from-gray-400/10 via-gray-400/5 to-transparent border-gray-400/30"
                  : "bg-gradient-to-br from-orange-600/10 via-orange-600/5 to-transparent border-orange-600/30"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold ${
                index === 0
                  ? "bg-yellow-500 text-white"
                  : index === 1
                    ? "bg-gray-400 text-white"
                    : "bg-orange-600 text-white"
              }`}
            >
              {index + 1}
            </div>
            <h3 className="font-bold text-lg mb-2">{user.name}</h3>
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">{user.badge}</Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Level</span>
                <span className="font-bold">{user.level}</span>
              </div>
              <div className="flex justify-between">
                <span>XP</span>
                <span className="font-bold text-yellow-400">{user.xp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Streak</span>
                <span className="font-bold text-orange-500">{user.streak} days</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card className="p-6 bg-card/50 border-border/50">
        <h3 className="text-xl font-bold mb-6">Full Rankings</h3>
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div
              key={user.name}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                index < 3 ? "bg-primary/5 border border-primary/20" : "bg-background/30 hover:bg-background/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0
                      ? "bg-yellow-500 text-white"
                      : index === 1
                        ? "bg-gray-400 text-white"
                        : index === 2
                          ? "bg-orange-600 text-white"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <Avatar className="w-10 h-10 border-2 border-primary/50">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{user.name}</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Level {user.level}</Badge>
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">{user.badge}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      {user.xp.toLocaleString()} XP
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      {user.streak} day streak
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-border/50 hover:bg-card/50 bg-transparent">
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
