"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Brain, Menu } from "lucide-react"

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const navItems = [
    { href: "/courses", label: "Courses" },
    { href: "/assessment", label: "Assessment" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/community", label: "Community" },
    { href: "/careers", label: "Careers" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="relative z-50 flex items-center justify-between p-6 backdrop-blur-sm bg-background/80 border-b border-border/50">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-pulse group-hover:scale-110 transition-transform">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LEARNEXUS
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative text-sm font-medium transition-colors hover:text-primary ${
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {item.label}
            {isActive(item.href) && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
            )}
          </Link>
        ))}

        <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
          Sign In
        </Button>
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-pulse">
          Get Started
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-sm border-l border-border/50">
            <div className="flex flex-col space-y-6 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-pulse">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LEARNEXUS
                </span>
              </div>

              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-3 pt-6 border-t border-border/50">
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-pulse">
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
