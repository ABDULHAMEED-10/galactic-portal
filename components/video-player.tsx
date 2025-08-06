"use client"

interface VideoPlayerProps {
  videoId: string
  title: string
  className?: string
}

export default function VideoPlayer({ videoId, title, className = "" }: VideoPlayerProps) {
  // Check if it's a YouTube video (YouTube IDs are typically 11 characters long and contain letters/numbers)
  // Local videos like "medric" should not be treated as YouTube videos
  const isYouTubeVideo = videoId.length === 11 && /^[a-zA-Z0-9_-]+$/.test(videoId)

  if (isYouTubeVideo) {
    // YouTube video
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        {/* Video iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  } else {
    // Local video file - optimized for mobile/vertical videos
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        {/* Local video with mobile-optimized styling */}
        <video
          src={`/videos/${videoId}.mp4`}
          title={title}
          className="w-full h-full object-contain mx-auto"
          controls
          preload="metadata"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '9/16', // Mobile/vertical aspect ratio
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
