"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bot, ExternalLink, Github, Sparkles, Zap, Code, Layers } from "lucide-react"

const projects = [
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "AI-powered HR screening platform that automates candidate ranking and matching to job descriptions.",
    technologies: ["Python", "FastAPI", "RAG/GraphRAG", "PG-Vector"],
    domain: "AI / ML",
    indicator: "Servify",
    aiExplanation: `**What it is:** An intelligent HR screening tool designed to streamline the hiring process. It uses advanced RAG (Retrieval-Augmented Generation) and GraphRAG techniques to analyze resumes, enabling recruiters to perform interactive Q&A, rank candidates automatically, and match them precisely against job descriptions.

**Impact:** This platform significantly accelerated the recruitment cycle by reducing manual screening time by 60%, allowing the HR team to focus on qualified candidates.

**Tech Stack:** Python, FastAPI, Streamlit for the UI, LangChain, RAG/GraphRAG, Hugging Face Transformers, and PostgreSQL with the PG-Vector extension for efficient similarity search.`,
    category: "ai-ml"
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence Assistants", 
    description: "Chat-based AI assistant providing highly accurate answers from large legal and HR documents.",
    technologies: ["LangChain", "Vector DBs", "Mem0", "Python"],
    domain: "AI / ML",
    indicator: "Servify",
    aiExplanation: `**What it is:** A sophisticated Q&A system that allows users to "chat" with their documents. It leverages optimized context memory (Mem0) and vector retrieval to parse and understand vast amounts of information from legal or HR files.

**Impact:** Delivered 95%+ response accuracy, providing reliable and instant answers that previously required hours of manual document review.

**Tech Stack:** Python, LangChain for orchestration, optimised context memory (Mem0), PG-Vector/Redis for vector storage, Tesseract and PyPDF2 for document parsing, and AWS S3 for storage.`,
    category: "ai-ml"
  },
  {
    id: "ai-device-diagnostics",
    title: "AI Device Diagnostics Assistant",
    description: "A multi-agent, multimodal system to detect device issues and identify fraudulent claims.",
    technologies: ["FastAPI", "Multi-Agent Orchestration", "Prompt Engineering"],
    domain: "AI / ML", 
    indicator: "Servify",
    aiExplanation: `**What it is:** A custom diagnostic system that uses multiple specialized AI agents working together to analyze both functional and physical device issues. It can process different data types (multimodal) to make highly accurate assessments.

**Impact:** A key project for the business that reduced fraudulent claims by 13% and significantly boosted Customer Satisfaction (CSAT) scores from 3.8 to 4.2.

**Tech Stack:** Python, FastAPI, a custom multi-agent orchestration framework, advanced prompt-tuning techniques, vLLM, and OpenAI APIs.`,
    category: "ai-ml"
  },
  {
    id: "ai-claims-assistant", 
    title: "AI Claims Assistant",
    description: "Automated claim filing system using a multi-agent framework to reduce manual work.",
    technologies: ["LLM Fine-Tuning", "OpenLit", "Prometheus", "Grafana"],
    domain: "AI / ML",
    indicator: "Servify",
    aiExplanation: `**What it is:** An end-to-end automated system for processing claims. It uses a custom framework to coordinate multiple AI agents, each fine-tuned on open-source LLMs for specific tasks in the adjudication workflow.

**Impact:** Revolutionized the claims process by reducing manual adjudication by 65%, leading to much faster customer turnaround times.

**Tech Stack:** Python, LLM Factory for fine-tuning, custom agent framework, and a full observability stack with OpenLit, Prometheus, and Grafana for monitoring and reliability.`,
    category: "ai-ml"
  },
  {
    id: "multi-tenant-saas",
    title: "Multi-Tenant SaaS Platform",
    description: "Scalable SaaS platform with deep integrations into Salesforce, Zendesk, and JIRA.",
    technologies: ["Node.js", "Express", "MySQL", "React.js", "AWS"],
    domain: "FullStack Development",
    indicator: "Backend Development",
    aiExplanation: `**What it is:** A robust, scalable Software-as-a-Service platform built for multiple clients (multi-tenancy). It features secure authentication, Role-Based Access Control (RBAC), and daily data synchronization with external services.

**Impact:** Streamlined client workflows by centralizing data and providing a single source of truth, integrating seamlessly with essential business tools like Salesforce, Zendesk, and JIRA.

**Tech Stack:** Node.js, Express.js, React.js, MySQL, PostgreSQL, Redis, Docker, and various AWS services (EC2, SQS, S3, Lambda).`,
    category: "fullstack"
  },
  {
    id: "b2b-ecommerce",
    title: "B2B E-Commerce Platform",
    description: "Full-featured B2B e-commerce solution with advanced order workflows and admin management.",
    technologies: ["Node.js", "MongoDB", "Stripe"],
    domain: "Backend Development",
    indicator: "Unico Connect",
    aiExplanation: `**What it is:** A comprehensive B2B platform managing the entire e-commerce lifecycle, from user onboarding and complex order/return workflows to a dedicated Admin Web App for client and product management.

**Impact:** Provided a powerful, custom e-commerce solution for a B2B client, enabling them to manage their operations efficiently online.

**Tech Stack:** MERN Stack (MongoDB, Express.js, React.js, Node.js), Stripe for payments, and custom API architecture.`,
    category: "backend"
  },
  {
    id: "fse-saas-platform",
    title: "FSE SaaS Platform", 
    description: "Low-code/no-code platform for Field Service Engineers built with the MERN stack.",
    technologies: ["MERN Stack", "RESTful APIs", "JSON Scripting"],
    domain: "FullStack Development",
    indicator: "Sankey Solutions",
    aiExplanation: `**What it is:** A flexible low-code/no-code platform that allows for the rapid development of applications for field service operations. I spearheaded its development, designing the core REST APIs and data validation logic.

**Impact:** Empowered the client to build and modify their own operational tools without extensive coding, improving agility and reducing development costs.

**Tech Stack:** MERN Stack (MongoDB, Express.js, React.js, Node.js), RESTful APIs, and JSON scripting for dynamic configurations.`,
    category: "fullstack"
  },
  {
    id: "hrms-platform",
    title: "HRMS Platform",
    description: "Built a comprehensive HRMS with CRUD operations, HR dashboards, RBAC, and document management.",
    technologies: ["Node.js", "React", "PostgreSQL", "Azure", "MongoDB", "Sharepoint"],
    domain: "FullStack Development", 
    indicator: "Sankey Solutions",
    aiExplanation: `**What it is:** A complete Human Resource Management System featuring employee lifecycle management, role-based access control, interactive dashboards, and secure document handling. Developed as a full-stack solution with modern architecture patterns.

**Impact:** Centralized all HR operations into a single platform, improving HR efficiency by 80% and providing real-time insights through comprehensive dashboards and analytics.

**Tech Stack:** Node.js and Express.js for backend, React.js for frontend, MongoDB for data storage, AWS services for cloud infrastructure, JWT for authentication, and integrated document management system.`,
    category: "fullstack"
  }
]

const categories = [
  { id: "all", label: "All", icon: Layers },
  { id: "ai-ml", label: "AI / ML", icon: Bot },
  { id: "backend", label: "Backend Development", icon: Code },
  { id: "fullstack", label: "FullStack Development", icon: Zap }
]

// Optimized animation variants for better performance
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

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2 // Much faster
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2 // Faster exit
    }
  }
}

interface ProjectCardProps {
  project: typeof projects[0]
  onAskAI: (project: typeof projects[0]) => void
}

function ProjectCard({ project, onAskAI }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="glass-card p-6 h-full flex flex-col glow-hover transition-all duration-300">
        {/* Header */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold gradient-text line-clamp-2">
              {project.title}
            </h3>
            <Badge variant="secondary" className="glass text-xs">
              {project.indicator}
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="text-xs border-primary/30 hover:border-primary"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>

        {/* Domain */}
        <div className="mb-4">
          <Badge className="aurora-bg-1 text-white font-medium">
            {project.domain}
          </Badge>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => onAskAI(project)}
            className="w-full group glass-card border-primary/30 hover:border-primary bg-primary/10 hover:bg-primary/20 text-primary"
            variant="outline"
          >
            <Bot className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Ask AI for Details
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredProjects = projects.filter(project => 
    activeCategory === "all" || project.category === activeCategory
  ).slice(0, 6) // Show only top 6 projects

  const handleAskAI = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setShowModal(true)
  }


  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/3 w-96 h-96 aurora-bg-1 rounded-full blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 aurora-bg-3 rounded-full blur-3xl opacity-15 animate-float" />
        <div className="absolute top-2/3 left-1/4 w-64 h-64 aurora-bg-2 rounded-full blur-3xl opacity-12 animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl lg:text-6xl font-bold gradient-text">
              Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of innovative AI solutions and scalable systems that solve real-world challenges
              across diverse industries and technology stacks.
            </p>
          </motion.div>

          {/* Filter Categories */}
            <motion.div variants={itemVariants} className="flex justify-center">
            <div className="glass-card p-2 rounded-2xl">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isActive = activeCategory === category.id
                  
                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => setActiveCategory(category.id)}
                      className={`
                        px-6 py-3 rounded-xl transition-all duration-300
                        ${isActive 
                          ? "aurora-bg-1 text-white glow" 
                          : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onAskAI={handleAskAI}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show more indicator */}
            <motion.div variants={itemVariants} className="text-center">
            <p className="text-muted-foreground">
              Showing top 6 projects • Total {projects.length} projects available
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* AI Details Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="glass-panel max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              {/* Project Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary" className="glass">
                  {selectedProject.domain}
                </Badge>
                <span>•</span>
                <span>{selectedProject.indicator}</span>
              </div>

              {/* AI Explanation */}
              <div className="prose prose-sm max-w-none">
                <div 
                  className="text-muted-foreground leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedProject.aiExplanation.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                  }}
                />
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="border-primary/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-primary/20">
                <Button variant="outline" className="flex-1">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
                <Button className="flex-1 aurora-bg-1 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
