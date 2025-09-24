"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

// Refactor the Technical Skills section for better visual hierarchy and modern look
// Goals:
// 1. Simplify color palette: only 2-3 brand gradients, rest use neutrals + accent borders.
// 2. Add hierarchy: Core skills = full-color, Mid-tier = outlined pills, Supporting = neutral with hover glow.
// 3. Improve readability: More padding, consistent spacing, subtle shadows.
// 4. Modern layout: 2-column responsive grid with clear category headers and minimal icons.

const skillCategories = {
  "Programming Languages": {
    skills: ["Python", "JavaScript"],
    style: "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md",
    hover: "hover:shadow-sky-400/40"
  },
  "AI/LLM Systems": {
    skills: ["RAG & GraphRAG", "Multi-Agent Architectures", "Prompt Engineering", "LangChain", "LlamaIndex", "Hugging Face Transformers", "Open-Source Model Deployment"],
    style: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md",
    hover: "hover:shadow-indigo-400/40"
  },
  "Web Development": {
    skills: ["FastAPI", "Flask", "Django", "Node.js", "ReactJS", "HTML5", "CSS3", "Tailwind CSS"],
    style: "border border-blue-400 text-blue-300 bg-gray-900/50",
    hover: "hover:bg-blue-500 hover:text-white transition"
  },
  "Databases & Storage": {
    skills: ["PostgreSQL", "MongoDB", "Redis", "PG-Vector", "AWS S3"],
    style: "border border-teal-400 text-teal-300 bg-gray-900/50",
    hover: "hover:bg-teal-500 hover:text-white transition"
  },
  "DevOps & MLOps": {
    skills: ["AWS", "GCP", "Docker", "CI/CD", "Prometheus", "Grafana"],
    style: "bg-gray-800 text-gray-300",
    hover: "hover:shadow-violet-400/20 hover:text-white"
  },
  "Other Tools": {
    skills: ["RESTful APIs", "Streamlit", "Tesseract OCR", "GitHub", "Figma"],
    style: "bg-gray-800 text-gray-300",
    hover: "hover:shadow-purple-400/20 hover:text-white"
  }
};

// Impact highlights data
const impactHighlights = [
  "60% reduction in manual HR screening",
  "95%+ accuracy in document intelligence", 
  "13% cut in fraudulent claims",
  "66% boost in API performance"
]

// Statistics data
const statistics = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "AI Projects Delivered" },
  { value: "95%+", label: "Solution Accuracy" },
  { value: "65%", label: "Process Automation" }
]

// Simplified animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

export default function AboutSection() {
  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* 3D Background Wave Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/4 w-96 h-96 aurora-bg-2 rounded-full blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 aurora-bg-1 rounded-full blur-3xl opacity-15 animate-float" />
        
        {/* Subtle wave pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path
              d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
              fill="url(#waveGradient)"
              className="animate-pulse-slow"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" />
                <stop offset="50%" stopColor="#7D5BA6" />
                <stop offset="100%" stopColor="#F15BB5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl lg:text-6xl font-bold gradient-text">
              About Me
            </h2>
            {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Passionate about bridging backend engineering with advanced AI, I specialize in creating robust, AI based,
              scalable solutions that solve real-world problems.
            </p> */}
          </motion.div>

          {/* Main Portrait and Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 items-start">
            {/* Left Side - Portrait */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="glass-card p-4 space-y-4 max-w-sm mx-auto">
                <div className="flex justify-center">
                  <div className="relative w-5/7 aspect-square rounded-2xl overflow-hidden glow">
                    <Image
                      src="/sujit_0.jpg"
                      alt="Sujit Barnwal"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-primary">
                    Building the Future with AI
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Senior AI Engineer
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Right Side - About Text and Impact */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8 lg:ml-12">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a Senior AI Engineer, I specialize in creating production-grade AI solutions 
                  that bridge the gap between cutting-edge research and practical business applications. 
                  My journey spans from building scalable backend systems to architecting sophisticated 
                  multi-agent AI frameworks that solve complex real-world challenges.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With expertise in RAG systems, document intelligence, and automated decision-making, 
                  I&apos;ve helped organizations reduce manual work by up to 65% while maintaining 95%+ accuracy. 
                  I believe in the power of AI to augment human capabilities, not replace them.
                </p>
              </div>

              {/* Impact Highlights */}
              <div className="space-y-4">
                <h4 className="text-4xl font-bold gradient-text-2">Impact Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {impactHighlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3"
                      >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Skills Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-6xl font-bold text-center gradient-text-2">
              Technical Skills
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {Object.entries(skillCategories).map(([category, data]) => (
                <div
                  key={category}
                  className="space-y-4"
                >
                  <h4 className="text-xl font-semibold text-primary">
                    {category}
                  </h4>
                    <div className="flex flex-wrap gap-3">
                      {data.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className={`px-4 py-2 text-sm font-medium cursor-default
                                   ${data.style} ${data.hover}
                                   transition-all duration-200 hover:scale-105`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Statistics Section - Spread Wide */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-2 p-6"
              >
                <div className="text-4xl lg:text-5xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
