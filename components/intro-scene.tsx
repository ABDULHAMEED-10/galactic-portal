"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface IntroSceneProps {
  onEnterPortal: () => void
}

export default function IntroScene({ onEnterPortal }: IntroSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer"
      onClick={onEnterPortal}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onEnterPortal}
      >
        <source src="/videos/Video 1.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Portal glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-radial from-blue-400/10 via-transparent to-transparent"
      />

      {/* Small click indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white/50 text-sm tracking-wider"
        >
          CLICK TO ENTER
        </motion.div>

        {/* Ripple effect around text */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 border border-white/20 rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}
