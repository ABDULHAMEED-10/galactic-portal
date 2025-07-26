"use client"

import { useRef, useLayoutEffect, useState } from "react"
import { motion } from "framer-motion"

interface IntroSceneProps {
  onEnterPortal: () => void
}

export default function IntroScene({ onEnterPortal }: IntroSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  // Use useLayoutEffect to fix Safari video loading issues
  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return

    // iOS Safari specific setup
    const setupVideo = async () => {
      try {
        video.muted = true
        video.playsInline = true
        video.setAttribute("webkit-playsinline", "true")
        video.setAttribute("playsinline", "true")

        // Try to play the video
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          setVideoReady(true)
        }
      } catch (error) {
        console.warn("Video autoplay failed:", error)
        setVideoError(true)
      }
    }

    // Video event listeners
    const handleLoadedData = () => {
      setupVideo()
    }

    const handleCanPlay = () => {
      setupVideo()
    }

    const handleError = (e: Event) => {
      console.warn("Video error:", e)
      setVideoError(true)
    }

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    // Immediate setup attempt
    setupVideo()

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleError)
      }
    }
  }, []) // No dependencies as we only want this to run once

  const handleClick = () => {
    onEnterPortal()
  }

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {!videoError ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
      ) : (
        // Fallback content when video fails
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🌌</div>
            <h1 className="text-4xl font-light text-white mb-2">The MTM Spot</h1>
            <p className="text-white/60">Embrace The Noise</p>
          </div>
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Portal glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-radial from-blue-400/10 via-transparent to-transparent"
      />

      {/* Enhanced click indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white/70 text-xs sm:text-sm tracking-wider font-medium"
        >
          TAP TO ENTER
        </motion.div>

        {/* Enhanced ripple effect */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          className="absolute inset-0 rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}
