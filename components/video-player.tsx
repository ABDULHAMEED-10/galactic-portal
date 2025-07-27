"use client"



interface VideoPlayerProps {
  videoId: string
  title: string
  className?: string
}

export default function VideoPlayer({ videoId, title, className = "" }: VideoPlayerProps) {

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
}
