"use client"

import { useRef, useEffect, useLayoutEffect, useState } from "react"
import { motion } from "framer-motion"

interface MTMSceneProps {
  onComplete: () => void
}

export default function MTMScene({ onComplete }: MTMSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return

    // iOS Safari specific setup
    const setupVideo = async () => {
      try {
        video.muted = false // Enable audio
        video.playsInline = true
        video.setAttribute("webkit-playsinline", "true")
        video.setAttribute("playsinline", "true")

        // Try to play the video with audio
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          setVideoReady(true)
        }
      } catch (error) {
        console.warn("MTM Video autoplay failed:", error)
        // If autoplay with audio fails, try muted autoplay as fallback
        try {
          video.muted = true
          await video.play()
          setVideoReady(true)
        } catch (mutedError) {
          console.warn("Muted autoplay also failed:", mutedError)
          setVideoError(true)
        }
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
      console.warn("MTM Video error:", e)
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
  }, []) // No dependencies to prevent re-runs

  const handleClick = () => {
    const video = videoRef.current
    if (video && video.muted) {
      // If video is muted due to autoplay restrictions, unmute on user interaction
      video.muted = false
    }
    onComplete()
  }

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer bg-black"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {!videoError ? (
        <video
          ref={videoRef}
          className={`w-full h-full ${isMobile ? "object-contain" : "object-cover"}`}
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          <source src="/videos/MTM.mp4" type="video/mp4" />
        </video>
      ) : (
        // Fallback content when video fails
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h1 className="text-4xl font-light text-white mb-2">MTM</h1>
            <p className="text-white/60">Music Transformation Movement</p>
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
        className="absolute inset-0 bg-gradient-radial from-purple-400/10 via-transparent to-transparent"
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
          TAP TO CONTINUE
        </motion.div>

        {/* Enhanced ripple effect - remove border styling */}
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
