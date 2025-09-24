"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Sparkles } from "lucide-react"

interface AISphereProps {
  onClick: () => void
  isActive: boolean
}

export function AISphere({ onClick, isActive }: AISphereProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex items-center justify-center">
      {/* Animated Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring, index) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-indigo-500/20"
            style={{
              width: `${120 + index * 40}px`,
              height: `${120 + index * 40}px`,
            }}
            animate={{
              rotate: 360,
              scale: isActive ? 0.8 : 1,
              opacity: isActive ? 0.3 : 0.6,
            }}
            transition={{
              rotate: {
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "linear",
              },
              scale: { duration: 0.6 },
              opacity: { duration: 0.6 },
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-indigo-500/40 rounded-full"
            style={{
              left: `${50 + Math.cos((index * Math.PI * 2) / 8) * 80}%`,
              top: `${50 + Math.sin((index * Math.PI * 2) / 8) * 80}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Sphere */}
      <motion.div
        className={`
          relative w-32 h-32 rounded-full cursor-pointer
          bg-gradient-to-br from-indigo-500/20 to-purple-500/20
          border-2 border-indigo-500/30
          backdrop-blur-sm
          flex items-center justify-center
          transition-all duration-300
          ${isHovered ? 'shadow-lg shadow-indigo-500/25' : 'shadow-md shadow-indigo-500/10'}
        `}
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          scale: isActive ? 0.9 : isHovered ? 1.1 : 1,
          rotate: isActive ? 0 : [45, 135, 45],
        }}
        transition={{
          scale: { duration: 0.3 },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Inner Glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-sm" />
        
        {/* AI Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{
            rotate: isActive ? 0 : [-45, -135, -45],
          }}
          transition={{
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Bot 
            className={`w-12 h-12 transition-colors duration-300 ${
              isActive ? 'text-pink-500' : 'text-indigo-500'
            }`} 
          />
        </motion.div>

        {/* Sparkle Effects */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${20 + Math.cos((index * Math.PI * 2) / 4) * 60}%`,
                    top: `${20 + Math.sin((index * Math.PI * 2) / 4) * 60}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    opacity: [0, 1, 0],
                    rotate: 360,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pulsing Effect when Active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-pink-500/50"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.8, 0, 0.8] 
            }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Status Text */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="text-xs text-muted-foreground text-center font-medium">
          {isActive ? "AI Assistant Active" : "Click to Chat"}
        </div>
      </motion.div>
    </div>
  )
}
