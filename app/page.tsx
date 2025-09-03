"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Code, Palette, Zap, Users, Trophy, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }))
    setParticles(newParticles)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full particle-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Neural Network Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary">
                <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Logo Assembly */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full animate-pulse" />
            <h1 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent hologram-flicker">
              EVOLVE
              <br />
              BEYOND LIMITS
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Step into the future of education. Experience cinema-quality learning with
            <span className="text-primary font-semibold"> AI-powered courses</span>,
            <span className="text-accent font-semibold"> interactive 3D environments</span>, and
            <span className="text-secondary font-semibold"> gamified progression</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/assessment">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-lg px-8 py-6 glow-pulse group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">200+</div>
              <div className="text-sm text-muted-foreground">AI-Powered Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Course Preview */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Your Path
            </h2>
            <p className="text-xl text-muted-foreground">Immersive learning tracks designed for the future</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Track */}
            <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center mb-6 glow-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">AI & Machine Learning</h3>
                <p className="text-muted-foreground mb-6">
                  Master neural networks, deep learning, and AI applications with hands-on projects and real-world
                  scenarios.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Python
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    TensorFlow
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    PyTorch
                  </Badge>
                </div>
                <Link href="/courses?category=ai" className="block">
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
                    Explore AI Track
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Design Track */}
            <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-xl flex items-center justify-center mb-6 glow-pulse">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Future Design</h3>
                <p className="text-muted-foreground mb-6">
                  Create stunning interfaces with 3D elements, advanced animations, and immersive user experiences.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Figma
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Three.js
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Blender
                  </Badge>
                </div>
                <Link href="/courses?category=design" className="block">
                  <Button className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30">
                    Explore Design Track
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Coding Track */}
            <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-lg" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl flex items-center justify-center mb-6 glow-pulse">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">Advanced Development</h3>
                <p className="text-muted-foreground mb-6">
                  Build next-generation applications with cutting-edge frameworks and quantum computing principles.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    Next.js
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    Rust
                  </Badge>
                </div>
                <Link href="/courses?category=development" className="block">
                  <Button className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30">
                    Explore Dev Track
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience the Future</h2>
            <p className="text-xl text-muted-foreground">Revolutionary features that transform how you learn</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 glow-pulse group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Learning</h3>
              <p className="text-muted-foreground">Personalized curriculum that adapts to your pace and style</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 glow-pulse group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Community</h3>
              <p className="text-muted-foreground">Connect with learners and mentors worldwide</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 glow-pulse group-hover:scale-110 transition-transform">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified Progress</h3>
              <p className="text-muted-foreground">Level up with achievements and skill trees</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 glow-pulse group-hover:scale-110 transition-transform">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Career Acceleration</h3>
              <p className="text-muted-foreground">Direct pathways to top tech companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl rounded-full" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Ready to Evolve?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of learners who are already building the future. Your transformation starts now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assessment">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-lg px-12 py-6 glow-pulse"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 text-lg px-12 py-6 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
