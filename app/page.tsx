"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import IntroScene from "@/components/intro-scene"
import ConstellationScene from "@/components/constellation-scene"

export default function GalacticPortal() {
  const [currentScene, setCurrentScene] = useState<"intro" | "transition" | "constellation">("intro")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preload videos
    const preloadVideos = async () => {
      const video1 = document.createElement("video")
      const video2 = document.createElement("video")

      video1.src = "https://2qajpnkiaommrazx.public.blob.vercel-storage.com/video1.mp4"
      video2.src = "https://2qajpnkiaommrazx.public.blob.vercel-storage.com/video2.mp4"

      await Promise.all([
        new Promise((resolve) => {
          video1.onloadeddata = resolve
        }),
        new Promise((resolve) => {
          video2.onloadeddata = resolve
        }),
      ])

      setIsLoading(false)
    }

    preloadVideos()
  }, [])

  const enterPortal = () => {
    setCurrentScene("transition")
    // After zoom transition, show constellation
    setTimeout(() => {
      setCurrentScene("constellation")
    }, 2000) // 2 seconds for zoom transition
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        {/* Astronomical Loader */}
        <div className="flex flex-col items-center">
          <svg className="animate-spin-slow mb-4" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="28" stroke="#38bdf8" strokeWidth="4" opacity="0.3" />
            <circle cx="32" cy="32" r="18" stroke="#facc15" strokeWidth="2" opacity="0.5" />
            <circle cx="32" cy="32" r="6" fill="#fff" />
            {/* Centered star at (32,32) */}
            <path d="M32 20 L35.09 28.26 L44 29.27 L37 35.18 L38.18 44 L32 39.77 L25.82 44 L27 35.18 L20 29.27 L28.91 28.26 Z" fill="#fbbf24" opacity="0.8" />
          </svg>
        </div>
        <style jsx>{`
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScene === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 20 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 2, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <IntroScene onEnterPortal={enterPortal} />
          </motion.div>
        )}

        {currentScene === "transition" && (
          <motion.div
            key="transition"
            initial={{ scale: 0.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-black"
          >
            {/* Portal tunnel effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1, 1.2], rotate: 360 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-96 h-96 rounded-full border-4 border-blue-400/30 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent"
              />
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 0.8, 1], rotate: -360 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                className="absolute w-64 h-64 rounded-full border-2 border-cyan-400/40 bg-gradient-radial from-cyan-400/20 via-blue-400/10 to-transparent"
              />
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 0.6, 0.8], rotate: 360 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
                className="absolute w-32 h-32 rounded-full border border-white/60 bg-gradient-radial from-white/30 via-blue-400/20 to-transparent"
              />
            </div>
          </motion.div>
        )}

        {currentScene === "constellation" && (
          <motion.div
            key="constellation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ConstellationScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
