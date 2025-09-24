"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 aurora-bg-1 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 aurora-bg-2 rounded-full blur-3xl opacity-15 animate-float" />
      </div>

      <Card className="glass-card p-12 text-center max-w-md w-full">
        <div className="space-y-6">
          <div className="text-8xl font-bold gradient-text">404</div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild className="aurora-bg-1 text-white">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" className="glass-card" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
