"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import IntroScene from "@/components/intro-scene"
import ConstellationScene from "@/components/constellation-scene"
import MTMScene from "@/components/mtm-scene"

export default function GalacticPortal() {
  const [currentScene, setCurrentScene] = useState<"intro" | "mtm" | "transition" | "constellation">("intro")
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Enhanced video preloading with proper progress tracking
    const preloadVideos = async () => {
      try {
        const video1 = document.createElement("video")
        const video2 = document.createElement("video")

        // iOS Safari specific attributes
        video1.setAttribute("playsinline", "true")
        video1.setAttribute("webkit-playsinline", "true")
        video1.muted = true
        video1.preload = "metadata"

        video2.setAttribute("playsinline", "true")
        video2.setAttribute("webkit-playsinline", "true")
        video2.muted = true
        video2.preload = "metadata"

        video1.src = "/videos/video1.mp4"
        video2.src = "/videos/video2.mp4"

        // Add MTM video preloading
        const video3 = document.createElement("video")
        video3.setAttribute("playsinline", "true")
        video3.setAttribute("webkit-playsinline", "true")
        video3.muted = false
        video3.preload = "metadata"
        video3.src = "/videos/MTM.mp4"

        // Initial progress
        setLoadingProgress(10)

        let video1Loaded = false
        let video2Loaded = false
        let video3Loaded = false

        const updateProgress = () => {
          let progress = 10 // Base progress
          if (video1Loaded) progress += 30 // Video 1 loaded
          if (video2Loaded) progress += 30 // Video 2 loaded
          if (video3Loaded) progress += 30 // MTM video loaded

          // Ensure we don't exceed 100%
          progress = Math.min(progress, 90)
          setLoadingProgress(progress)

          // If all videos are loaded, complete the loading
          if (video1Loaded && video2Loaded && video3Loaded) {
            setLoadingProgress(100)
            setTimeout(() => {
              setIsLoading(false)
            }, 500)
          }
        }

        const promises = [
          new Promise<void>((resolve) => {
            const onLoad = () => {
              if (!video1Loaded) {
                video1Loaded = true
                updateProgress()
              }
              resolve()
            }
            const onError = () => {
              console.warn("Video 1 failed to load, continuing anyway")
              if (!video1Loaded) {
                video1Loaded = true
                updateProgress()
              }
              resolve()
            }

            video1.addEventListener("loadedmetadata", onLoad, { once: true })
            video1.addEventListener("canplaythrough", onLoad, { once: true })
            video1.addEventListener("error", onError, { once: true })

            // Fallback timeout for iOS Safari
            setTimeout(() => {
              if (!video1Loaded) {
                video1Loaded = true
                updateProgress()
              }
              resolve()
            }, 3000)
          }),
          new Promise<void>((resolve) => {
            const onLoad = () => {
              if (!video2Loaded) {
                video2Loaded = true
                updateProgress()
              }
              resolve()
            }
            const onError = () => {
              console.warn("Video 2 failed to load, continuing anyway")
              if (!video2Loaded) {
                video2Loaded = true
                updateProgress()
              }
              resolve()
            }

            video2.addEventListener("loadedmetadata", onLoad, { once: true })
            video2.addEventListener("canplaythrough", onLoad, { once: true })
            video2.addEventListener("error", onError, { once: true })

            // Fallback timeout for iOS Safari
            setTimeout(() => {
              if (!video2Loaded) {
                video2Loaded = true
                updateProgress()
              }
              resolve()
            }, 3000)
          }),
          new Promise<void>((resolve) => {
            const onLoad = () => {
              if (!video3Loaded) {
                video3Loaded = true
                updateProgress()
              }
              resolve()
            }
            const onError = () => {
              console.warn("MTM video failed to load, continuing anyway")
              if (!video3Loaded) {
                video3Loaded = true
                updateProgress()
              }
              resolve()
            }

            video3.addEventListener("loadedmetadata", onLoad, { once: true })
            video3.addEventListener("canplaythrough", onLoad, { once: true })
            video3.addEventListener("error", onError, { once: true })

            setTimeout(() => {
              if (!video3Loaded) {
                video3Loaded = true
                updateProgress()
              }
              resolve()
            }, 3000)
          }),
        ]

        await Promise.all(promises)

        // Final progress update
        setLoadingProgress(100)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.warn("Video preloading failed, proceeding anyway:", error)
        setLoadingProgress(100)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }

    // iOS Safari fallback - always proceed after maximum 8 seconds
    const maxLoadTime = setTimeout(() => {
      console.warn("Maximum load time reached, proceeding")
      setLoadingProgress(100)
      setIsLoading(false)
    }, 8000)

    preloadVideos().finally(() => {
      clearTimeout(maxLoadTime)
    })

    return () => {
      clearTimeout(maxLoadTime)
    }
  }, [])

  const enterPortal = () => {
    setCurrentScene("mtm")
  }

  const enterConstellation = () => {
    setCurrentScene("transition")
    // After zoom transition, show constellation
    setTimeout(() => {
      setCurrentScene("constellation")
    }, 2000) // 2 seconds for zoom transition
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        {/* Enhanced Astronomical Loader with progress */}
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin-slow mb-4"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="28" stroke="#38bdf8" strokeWidth="4" opacity="0.3" />
            <circle cx="32" cy="32" r="18" stroke="#facc15" strokeWidth="2" opacity="0.5" />
            <circle cx="32" cy="32" r="6" fill="#fff" />
            {/* Centered star at (32,32) */}
            <path
              d="M32 20 L35.09 28.26 L44 29.27 L37 35.18 L38.18 44 L32 39.77 L25.82 44 L27 35.18 L20 29.27 L28.91 28.26 Z"
              fill="#fbbf24"
              opacity="0.8"
            />
          </svg>

          {/* Progress indicator */}
          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            />
          </div>

          <div className="text-white/60 text-sm">
            Loading Portal... {Math.min(Math.round(loadingProgress), 100)}%
          </div>
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

        {currentScene === "mtm" && (
          <motion.div
            key="mtm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 20 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 2, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <MTMScene onComplete={enterConstellation} />
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
