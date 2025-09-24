"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, TrendingUp, ChevronDown, ChevronUp } from "lucide-react"

const experiences = [
  {
    id: "servify",
    title: "Product Engineer II",
    company: "Servify",
    location: "Mumbai, Maharashtra, India",
    dates: "July 2024 – Present",
    duration: "6+ months",
    type: "Current Role",
    description: "Leading AI innovation in product engineering, building production-grade solutions that transform business operations.",
    achievements: [
      {
        metric: "60%",
        description: "Reduced manual HR screening time with AI-powered tools",
        detail: "Built RAG/GraphRAG system with Embeddings and Sentence Transformers"
      },
      {
        metric: "95%+",
        description: "Document Q&A accuracy across large legal/HR docs", 
        detail: "Developed document intelligence assistants with optimized context memory (Mem0)"
      },
      {
        metric: "13%",
        description: "Reduction in fraudulent claims through AI diagnostics",
        detail: "Designed multi-agent, multimodal diagnostic assistant with FastAPI"
      },
      {
        metric: "65%",
        description: "Decrease in manual claim adjudication processes",
        detail: "Automated claim filing with custom multi-agent orchestration framework"
      }
    ],
    technologies: ["Python", "FastAPI", "RAG/GraphRAG", "LangChain", "PG-Vector", "MongoDB", "Prometheus", "Grafana", "OpenLit", "Multi-Agent Systems"],
    highlights: ["AI HR Screening Platform", "Document Intelligence Assistants", "Multi-Agent Diagnostic System", "Automated Claims Processing"]
  },
  {
    id: "unico",
    title: "Software Engineer", 
    company: "Unico Connect",
    location: "Mumbai, Maharashtra, India",
    dates: "Aug 2023 - July 2024",
    duration: "11 months",
    type: "Full-time",
    description: "Drove backend development excellence and architectural optimization for scalable SaaS solutions.",
    achievements: [
      {
        metric: "37%",
        description: "Improvement in delivery speed through backend optimization",
        detail: "Led backend development & deployment processes"
      },
      {
        metric: "66%", 
        description: "Boost in API performance through database optimization",
        detail: "Optimized databases & architecture with caching strategies"
      },
      {
        metric: "100%",
        description: "Project delivery success rate with client collaboration",
        detail: "Partnered with clients to scope, design, and deliver solutions"
      }
    ],
    technologies: ["Node.js", "Express.js", "MySQL", "MongoDB", "Redis", "React.js", "Docker", "AWS", "Salesforce", "Zendesk", "JIRA"],
    highlights: ["Multi-Tenant SaaS Platform", "B2B E-Commerce Platform", "Third-party Integrations", "Performance Optimization"]
  },
  {
    id: "sankey",
    title: "Solution Analyst",
    company: "Sankey Solutions", 
    location: "Thane, Maharashtra, India",
    dates: "July 2021 - July 2023",
    duration: "2 years",
    type: "Full-time",
    description: "Spearheaded full-stack development initiatives and mentored teams in SDLC best practices.",
    achievements: [
      {
        metric: "50%",
        description: "Improvement in system performance metrics",
        detail: "Through architectural optimization and best practices implementation"
      },
      {
        metric: "100%",
        description: "On-time project delivery rate across multiple tech stacks",
        detail: "Delivered projects using Node.js, Django, and ASP.NET"
      },
      {
        metric: "3",
        description: "Major projects spearheaded with different technology stacks",
        detail: "Led development teams and coached best practices"
      }
    ],
    technologies: ["Node.js", "React.js", "Django", "MongoDB", "PostgreSQL", "SharePoint", "Azure", "MERN Stack"],
    highlights: ["HRMS Platform", "Reimbursement System", "FSE SaaS Platform", "Team Leadership"]
  }
]

// Optimized animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

interface ExperienceCardProps {
  experience: typeof experiences[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function ExperienceCard({ experience, index, isExpanded, onToggle }: ExperienceCardProps) {
  const isLeft = index % 2 === 0

  return (
      <motion.div
        variants={itemVariants}
        className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-8 gap-4`}
      >
      {/* Timeline connector */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 to-transparent" />
      
      {/* Timeline dot */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />

      {/* Content */}
      <div className={`w-full lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
        <Card className="glass-card p-6 glow-hover cursor-pointer transition-all duration-300 hover:scale-[1.02]" onClick={onToggle}>
          {/* Header */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold gradient-text">{experience.title}</h3>
                <p className="text-lg font-semibold text-primary">{experience.company}</p>
              </div>
              <Badge variant="secondary" className="glass">
                {experience.type}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {experience.dates}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Quick metrics preview */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {experience.achievements.slice(0, 2).map((achievement, i) => (
              <div key={i} className="text-center p-3 glass rounded-lg">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {achievement.metric}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.description.split(' ').slice(0, 4).join(' ')}...
                </div>
              </div>
            ))}
          </div>

          {/* Expand/Collapse indicator */}
          <div className="flex items-center justify-center pt-2 border-t border-primary/20">
            <Button variant="ghost" size="sm" className="text-primary">
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show Details
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-4 overflow-hidden"
            >
              <Card className="glass-panel p-6 space-y-6">
                {/* Detailed Achievements */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Key Achievements & Impact
                  </h4>
                  <div className="grid gap-4">
                    {experience.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 glass rounded-lg">
                        <div className="text-3xl font-bold gradient-text min-w-[4rem]">
                          {achievement.metric}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{achievement.description}</p>
                          <p className="text-sm text-muted-foreground">{achievement.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="glass border-primary/30 hover:border-primary glow-hover"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Highlights */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Project Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {experience.highlights.map((highlight) => (
                      <div key={highlight} className="glass p-3 rounded-lg text-sm font-medium text-center">
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-96 h-96 aurora-bg-3 rounded-full blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 aurora-bg-1 rounded-full blur-3xl opacity-15 animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 aurora-bg-2 rounded-full blur-3xl opacity-12 animate-spin-slow" />
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
              Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              4+ years of building scalable AI systems and leading engineering excellence 
              across diverse technology stacks and challenging problem domains.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative space-y-12 lg:space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isExpanded={expandedCard === experience.id}
                onToggle={() => toggleCard(experience.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
