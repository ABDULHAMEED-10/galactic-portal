"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { motion } from "framer-motion"

interface VideoPlayerProps {
  videoId: string
  title: string
  className?: string
}

export default function VideoPlayer({ videoId, title, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (showControls && isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showControls, isPlaying])

  const handlePlayPause = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isPlaying) {
        // Pause video by reloading iframe (YouTube API limitation)
        iframe.src = iframe.src
        setIsPlaying(false)
      } else {
        // Play video with autoplay
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (iframeRef.current && isPlaying) {
      const iframe = iframeRef.current
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${!isMuted ? 1 : 0}&rel=0&modestbranding=1`
    }
  }

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen()
    }
  }

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      {/* Video iframe */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Custom controls overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
      >
        {/* Play button overlay for non-playing state */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.button>
          </div>
        )}

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={handlePlayPause} className="text-white hover:text-blue-400 transition-colors">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-white text-sm font-medium truncate max-w-[200px]">{title}</span>
            </div>
            <button onClick={handleFullscreen} className="text-white hover:text-blue-400 transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
