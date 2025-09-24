"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MessageCircle, ArrowRight, Download, CheckCircle, FileText, Shield } from "lucide-react"
import { AISphere } from "@/components/AISphere"
import { ChatInterface } from "@/components/ChatInterface"

const impactMetrics = [
  { icon: CheckCircle, text: "65% less manual work", color: "text-green-500" },
  { icon: FileText, text: "95%+ doc Q&A accuracy", color: "text-blue-500" },
  { icon: Shield, text: "13% fraud reduction", color: "text-purple-500" },
]

export default function HeroSection() {
  const [chatOpen, setChatOpen] = useState(false)

  const handleOrbClick = () => {
    setChatOpen(!chatOpen)
  }

  const handleExploreProjects = () => {
    // Smooth scroll to projects section
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* Muted Brand Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/4 w-96 h-96 brand-bg-glow rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-32 right-1/3 w-80 h-80 brand-bg-muted rounded-full blur-3xl opacity-25 animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 brand-bg-glow rounded-full blur-3xl opacity-20 animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Grid - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Name and Title Hierarchy */}
            <div className="space-y-6">
              {/* Name - Large Gradient */}
              <motion.h1
                className="text-6xl lg:text-8xl font-bold relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* Enhanced background glow */}
                <div className="absolute inset-0 hero-name-glow rounded-xl blur-lg" />
                <span className="relative gradient-text-enhanced">Sujit Barnwal</span>
              </motion.h1>
              
              {/* Title - Clean Solid */}
              <motion.h2
                className="text-2xl lg:text-3xl font-semibold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Senior Full-Stack & AI Engineer
              </motion.h2>
            </div>

            {/* Subtitle - Structured Paragraph */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-[60ch]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Building scalable systems and intelligent assistants. Results-driven engineer with 4+ years of experience 
              creating production-grade AI solutions that bridge cutting-edge research with practical business applications.
            </motion.p>

            {/* Achievement Metrics */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {impactMetrics.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <motion.div
                    key={metric.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    className="metric-card"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-5 h-5 ${metric.color} flex-shrink-0`} />
                      <span className="text-sm font-medium text-foreground">{metric.text}</span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* Primary CTA */}
              <Button
                onClick={handleExploreProjects}
                className="group btn-primary px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <span className="flex items-center">
                  Explore Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              {/* Secondary CTAs */}
              <Button
                onClick={handleOrbClick}
                variant="outline"
                className="group btn-secondary px-8 py-6 text-lg font-medium rounded-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Chat with AI Assistant
              </Button>

              <Button
                variant="ghost"
                className="group btn-secondary px-8 py-6 text-lg font-medium rounded-xl"
                asChild
              >
                <a href="/resume.json" download="Sujit_Barnwal_Resume.json">
                  <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Grid - AI Assistant Hub */}
          <motion.div
            className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Background accent glow for AI area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 brand-bg-primary rounded-full blur-3xl opacity-10" />
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* AI Sphere - Positioned as visual anchor */}
              <AnimatePresence>
                {!chatOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="z-20"
                  >
                    <AISphere onClick={handleOrbClick} isActive={chatOpen} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Interface - Unfolds from sphere */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ChatInterface 
                  isOpen={chatOpen} 
                  onClose={() => setChatOpen(false)}
                  position="hero" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
