"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Send, 
  Bot, 
  Loader2,
  Sparkles
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  position: "hero" | "sidebar"
}

const suggestedQuestions = [
  "What projects has Sujit built in AI/ML?",
  "Tell me about his experience with RAG systems",
  "What is his technical background?",
  "Show me his recent achievements"
]

export function ChatInterface({ isOpen, onClose, position }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Sujit's AI assistant. Ask me anything about his experience, projects, or skills!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      // Import and use the AI service
      const { chatWithAI, getQuickResponse } = await import("@/services/aiService")
      
      // Check for quick responses first
      const quickResponse = getQuickResponse(currentInput)
      if (quickResponse) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: quickResponse,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsLoading(false)
        return
      }

      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // Call AI service with enhanced RAG
      const aiResponse = await chatWithAI(currentInput, conversationHistory)
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, responseMessage])
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.error("Chat error:", error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant", 
        content: "I'm experiencing some technical difficulties. Please try asking about Sujit's experience, projects, or skills, and I'll do my best to help!",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.1,
      x: position === "hero" ? 0 : 400,
      y: position === "hero" ? 0 : 0,
      borderRadius: position === "hero" ? "50%" : "16px",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      borderRadius: "16px",
    },
    exit: {
      opacity: 0,
      scale: 0.1,
      x: position === "hero" ? 0 : 400,
      y: position === "hero" ? 0 : 0,
      borderRadius: position === "hero" ? "50%" : "16px",
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile - only for sidebar position */}
          {position === "sidebar" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
          )}
          
          {/* Chat Panel */}
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              duration: 0.8,
              ease: "easeInOut"
            }}
            className={`
              z-50 
              ${position === "hero" 
                ? "w-full max-w-md mx-auto px-4 sm:px-0" 
                : "fixed top-4 right-4 w-96 h-[600px]"
              }
            `}
          >
            <Card className={`glass-panel flex flex-col shadow-2xl border-primary/20 ${
              position === "hero" 
                ? "w-full h-[500px]" 
                : "h-full"
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-primary/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full aurora-bg-1 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Ask about Sujit</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-8 w-8 glow-hover"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] rounded-2xl px-4 py-2 
                        ${message.role === "user" 
                          ? "bg-primary text-primary-foreground ml-4" 
                          : "glass-card mr-4"
                        }
                      `}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" && (
                          <Sparkles className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass-card rounded-2xl px-4 py-2 mr-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 2).map((question) => (
                      <Badge
                        key={question}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary/20 text-xs"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-primary/20">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Sujit's experience..."
                    className="flex-1 glass bg-background/50"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading}
                    className="glow-hover"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
