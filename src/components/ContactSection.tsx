"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Mail, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle,
  Star,
  Zap,
  Target,
  Users,
  TrendingUp
} from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/sujitbarnwal23/",
    icon: Linkedin,
    description: "Professional Network"
  },
  {
    name: "GitHub", 
    url: "https://github.com/sujitbarnwal",
    icon: Github,
    description: "Code Repository"
  },
  {
    name: "Email",
    url: "mailto:sujitbarnwal23@gmail.com",
    icon: Mail,
    description: "Direct Contact"
  }
]

const whyWorkWithMe = [
  {
    icon: Zap,
    title: "Proven Impact",
    description: "65% reduction in manual processes, 95%+ accuracy in AI solutions"
  },
  {
    icon: Target,
    title: "Business-Focused",
    description: "Bridge the gap between technical excellence and business outcomes"
  },
  {
    icon: Users,
    title: "Collaborative Leadership",
    description: "Led teams, mentored developers, 100% on-time project delivery"
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description: "Always exploring cutting-edge AI technologies and best practices"
  }
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

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Floating 3D Elements Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-32 h-32 aurora-bg-1 rounded-full blur-2xl opacity-20 animate-float" />
        <div className="absolute top-40 right-1/3 w-24 h-24 aurora-bg-2 rounded-full blur-xl opacity-15 animate-pulse-slow" />
        <div className="absolute bottom-32 left-1/2 w-40 h-40 aurora-bg-3 rounded-full blur-3xl opacity-10 animate-spin-slow" />
        <div className="absolute bottom-20 right-1/4 w-28 h-28 aurora-bg-1 rounded-full blur-2xl opacity-25 animate-float" />
        
        {/* Geometric shapes */}
        <div className="absolute top-1/3 left-20 w-16 h-16 border border-primary/20 rounded-lg animate-spin-slow" />
        <div className="absolute bottom-1/3 right-20 w-12 h-12 border border-secondary/20 rounded-full animate-pulse-slow" />
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
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to build something amazing together? Let&apos;s discuss how we can leverage
              AI and cutting-edge technology to solve your challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
              <motion.div variants={itemVariants}>
              <Card className="glass-card p-8 glow-hover">
                <h3 className="text-2xl font-bold mb-6 gradient-text-2">
                  Send a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="glass bg-background/50 border-primary/20 focus:border-primary"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="glass bg-background/50 border-primary/20 focus:border-primary"
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="glass bg-background/50 border-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                      isSubmitted 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "aurora-bg-1 hover:shadow-lg glow-hover"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Direct Contact */}
                <div className="mt-8 pt-6 border-t border-primary/20">
                  <p className="text-sm text-muted-foreground mb-4">Or reach out directly:</p>
                  <a 
                    href="mailto:sujitbarnwal23@gmail.com"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    sujitbarnwal23@gmail.com
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* Right Side - Why Work With Me & Social Links */}
              <motion.div variants={itemVariants} className="space-y-8">
              {/* Why Work With Me */}
              <Card className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Why Work With Me
                </h3>
                
                <div className="space-y-6">
                  {whyWorkWithMe.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-4 p-4 glass rounded-lg hover:glow-hover transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg aurora-bg-1 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Social Links */}
              <Card className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 gradient-text-2">
                  Let&apos;s Connect
                </h3>
                
                <div className="space-y-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-hover hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-lg aurora-bg-2 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{link.name}</h4>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </Card>

              {/* Call to Action */}
              <Card className="glass-card p-6 text-center aurora-bg-1">
                <h4 className="text-lg font-bold text-white mb-2">
                  Ready to Build Something Amazing?
                </h4>
                <p className="text-white/90 text-sm">
                  Let&apos;s discuss your next AI project or collaboration opportunity.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
