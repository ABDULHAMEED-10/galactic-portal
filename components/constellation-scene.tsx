"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Lock } from "lucide-react"
import ConstellationNode from "./constellation-node"
import NodeModal from "./node-modal"

// Updated constellation nodes optimized for both desktop and mobile
const constellationNodes = [
  // Node 1 - MEDERIC TURAY (Public) - center of parallelogram
  {
    id: 1,
    x: 48,
    y: 60,
    type: "unlocked",
    title: "MEDERIC TURAY",
    content:
      "MEDERIC TURAY - Our 'Iconic Advantage' lies in our ability to identify concrete unearthed possibilities illuminating the abstract concepts and ideations through the lens that breaks the constraints imposed by the major societal and cultural trends before us. MTM commissions Ivorian Born, and Morocco based artist Mederic Turay to curate 17 AI Digital Artwork Movie Posters of the Artists, Producers, & Songwriters at MMV Unreal Engine Studio. The MTM Art Collection demonstrates man's constant quest for balance and duality in life through music. The Artwork, steeped in rich West African roots and shot in Morocco at Marrakesh Media Village, will be featured at the Soundtrack Release at Humble Baron at Uncle Nearest Green's Humble Baron Venue in Shelbyville, TN.",
    color: "cyan",
  },

  // Node 2 - Verizon (Locked) - bottom right
  {
    id: 2,
    x: 38,
    y: 88,
    type: "locked",
    partner: "Verizon",
    tier: "Technology Partner",
    color: "emerald",
  },

  // Node 3 - THE NFOH ENCOUNTER (Public) - upper right
  {
    id: 3,
    x: 80,
    y: 30,
    type: "unlocked",
    title: "THE NFOH ENCOUNTER",
    content:
      "THE NFOH ENCOUNTER - Being heard amid the roar of your competitor's voices is a daunting task in today's crowded marketplace. We find this to be shockingly true each time we read a magazine, watch the television, surf the web, and listen to music. The MTM SPOT is at the cornerstone of our brands mantra to establish 'Platforms of Becoming' to unveil the true power of industry and create sensory engagement musical encounters that ultimately culminates into empowerment experiences. We are Story Commanders who understand the Art of curating Brand Encounters based upon the beliefs, values, perspectives of the individuals present who then falls in love with where we hope irrespective of nationality, race, age and or gender. HearYE, HearYE, Be YE Transformed! 'People don't buy what you do; they buy why you do it.' - Andrew Esse",
    color: "purple",
  },

  // Node 4 - Gibson Guitars (Locked) - top of parallelogram
  {
    id: 4,
    x: 58,
    y: 48,
    type: "locked",
    partner: "Gibson Guitars",
    tier: "Instrument Partner",
    color: "amber",
  },

  // Node 5 - Glory Foods (Locked) - left of parallelogram
  {
    id: 5,
    x: 38,
    y: 52,
    type: "locked",
    partner: "Glory Foods",
    tier: "Lifestyle Partner",
    color: "orange",
  },

  // Node 6 - AIX (Public) - right of parallelogram
  {
    id: 6,
    x: 48,
    y: 40,
    type: "unlocked",
    title: "AIX",
    content:
      "At AIXchange, we believe that every business has unique needs, and we strive to provide customized, AI-powered solutions that align with our clients' investment objectives. Our team of experienced consultants works closely with clients to develop and implement strategies that drive growth and success. We are committed to excellence, innovation, and customer satisfaction, and we go the extra mile to deliver the best possible results for our clients.",
    color: "red",
  },

  // Node 7 - Honda (Locked) - right of center
  {
    id: 7,
    x: 68,
    y: 45,
    type: "locked",
    partner: "Honda",
    tier: "Mobility Partner",
    color: "pink",
  },

  // Node 8 - Pandora (Locked) - right side, below 7
  {
    id: 8,
    x: 72,
    y: 55,
    type: "locked",
    partner: "Pandora",
    tier: "Streaming Partner",
    color: "slate",
  },

  // Node 9 - MMV (Public) - right side, below 8
  {
    id: 9,
    x: 70,
    y: 65,
    type: "unlocked",
    title: "MMV",
    content:
      "Our 'Iconic Advantage' lies in our ability to identify concrete unearthed possibilities illuminating the abstract concepts and ideations through the lens that breaks the constraints imposed by the major societal and cultural trends before us. MTM commissions Ivorian Born, and Morocco based artist Mederic Turay to curate 19 AI Digital Artwork Movie Posters of the Artists, Producers, & Songwriters at MMV Unreal Engine Studio. The MTM Art Collection demonstrates man's constant quest for balance and duality in life through music. The Artwork, steeped in rich West African roots, will be featured at the Soundtrack Release at Humble Baron at Uncle Nearest Venue in Shelbyville, TN.",
    color: "lime",
  },

  // Node 10 - Rixon Agency (Public) - far right
  {
    id: 10,
    x: 78,
    y: 60,
    type: "unlocked",
    title: "Rixon Agency",
    content:
      "At Rixon Agency, we know that every business has its own story—and we're here to help you tell it better. Whether you're launching a new product, building your online presence, or pitching to investors, we create digital experiences that actually move the needle. From websites and mobile apps to pitch decks and brand design, our team blends creativity with strategy to build things that work—and look good doing it. We care about your goals, and we treat your success like our own. That means honest communication, smart execution, and showing up with solutions that help you grow.",
    color: "yellow",
  },

  // Node 11 - Ebony (Locked) - right side, bottom
  {
    id: 11,
    x: 75,
    y: 70,
    type: "locked",
    partner: "Ebony",
    tier: "Platinum Partner",
    color: "stone",
  },

  // Node 12 - TOTE & CARRY (Locked) - lower left
  {
    id: 12,
    x: 38,
    y: 75,
    type: "locked",
    partner: "TOTE & CARRY",
    tier: "Merchandise Partner",
    color: "rose",
  },

  // Node 13 - Marrakesh (Public) - top center
  {
    id: 13,
    x: 41,
    y: 30,
    type: "unlocked",
    title: "Marrakesh",
    content:
      "MARRAKECH MEDIA VILLAGE - Our second stop takes us to the ancient land of Morocco where artists engage in intensive writing, recording, and video sessions from March 5-24, 2026. The Marrakech experience features hot air balloon transport, AI digital artwork creation with Mederic Turay, and immersive cultural encounters that blend West African roots with contemporary music production. Artists work in 3 daily sessions (7AM-10AM, 10AM-2PM, 7PM-12AM) creating the soundtrack that demonstrates man's constant quest for balance and duality in life through music.",
    color: "amber",
  },

  // Node 14 - PRIVATE HIDEAWAY VILLAS (Public) - upper left
  {
    id: 14,
    x: 38,
    y: 23,
    type: "unlocked",
    title: "PRIVATE HIDEAWAY VILLAS",
    content:
      "PRIVATE HIDEAWAY VILLAS - Every successful enterprise IS propelled by the vertical connections forged from the right invitations being sent to the right 'Creativists' who are equipped and coveted by their alignment to use their talents to evoke change within those who believe in where we hope.",
    color: "red",
  },

  // Node 15 - Phillips (Locked) - moved up and right
  {
    id: 15,
    x: 42, // Changed from 37 to 42 (moved right)
    y: 12, // Changed from 16 to 12 (moved up)
    type: "locked",
    partner: "Phillips",
    tier: "Audio Technology Partner",
    color: "cyan",
  },

  // Node 16 - Domaine Zeina (Public) - bottom of vertical line
  {
    id: 16,
    x: 25,
    y: 80,
    type: "unlocked",
    title: "Domaine Zeina",
    content:
      "DOMAINE ZEINA - Creating the soundtrack is rooted in our ability to establish a foundation where the constant quest for balance and duality in life is fulfilled. Artists will reside at the ultra-exclusive 15-hectare private pavillion enclave amidst olive groves with breaktaking views of the majestic Atlas Mountains",
    color: "emerald",
  },

  // Node 17 - Travel Noir (Locked) - middle of vertical line
  {
    id: 17,
    x: 19,
    y: 65,
    type: "locked",
    partner: "Travel Noir",
    tier: "Experience Partner",
    color: "yellow",
  },

  // Node 18 - Humble Barn (Public) - top of vertical line
  {
    id: 18,
    x: 11,
    y: 45,
    type: "unlocked",
    title: "Humble Barn",
    content:
      "HUMBLE BARON - The final destination in Shelbyville, TN represents the culmination of our musical journey (6.3.26-6.4.26). This is where the soundtrack release takes place, featuring network streaming dates from May 24-31, 2026. The venue accommodates a Presidential Suite, 16 One Bedroom Suites, 16 Executive Suites, 27 Superior Rooms, and 5 Upper Rooms, providing the perfect setting for the grand finale of our three-stop musical odyssey. Load-in begins Day 1 (6.3.26) with the main event on Day 2 (6.4.26).",
    color: "blue",
  },

  // Node 19 - UBIGI (Locked) - upper left
  {
    id: 19,
    x: 25,
    y: 38,
    type: "locked",
    partner: "UBIGI",
    tier: "Connectivity Partner",
    color: "blue",
  },
]

export default function ConstellationScene() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)
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

  // Safari video fallback: auto-show constellation after 5 seconds if video doesn't load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoReady(true)
    }, 5000)
    const video = videoRef.current
    const clear = () => {
      clearTimeout(timeout)
      setVideoReady(true)
    }
    if (video) {
      video.addEventListener("loadeddata", clear)
      video.addEventListener("canplay", clear)
    }
    return () => {
      clearTimeout(timeout)
      if (video) {
        video.removeEventListener("loadeddata", clear)
        video.removeEventListener("canplay", clear)
      }
    }
  }, [])

  // Handle modal close
  const handleModalClose = () => {
    setSelectedNode(null)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      
      {/* Background video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <source src="https://2qajpnkiaommrazx.public.blob.vercel-storage.com/video2.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better contrast - stronger on mobile */}
      <div className={`absolute inset-0 ${isMobile ? "bg-black/50" : "bg-black/40"}`} />

      {/* Constellation nodes */}
      <div className="absolute inset-0">
        {constellationNodes.map((node, index) => (
          <ConstellationNode key={node.id} node={node} index={index} onClick={() => setSelectedNode(node)} />
        ))}
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.7)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
          </linearGradient>
        </defs>

        {/* Connection lines with mobile-optimized visibility */}
        {[
          // Top diagonal line 15-14-13
          [15, 14], // 15 to 14
          [14, 13], // 14 to 13

          // Center parallelogram connections
          [1, 4], // center parallelogram
          [1, 5], // center parallelogram
          [4, 6], // center parallelogram
          [5, 6], // center parallelogram

          // Connections from center parallelogram
          [13, 5], // 13 connects to 5
          [19, 5], // 19 connects to 5
          [4, 7], // 4 connects to 7

          // Right side connections
          [7, 3], // 7 connects to 3
          [7, 8], // 7 to 8
          [8, 9], // 8 to 9
          [9, 11], // 9 to 11
          [10, 8], // 10 connects to 8

          // Left side connections - vertical line 18-17-16
          [19, 18], // 19 to 18
          [18, 17], // 18 to 17
          [17, 16], // 17 to 16 (vertical line)
          [16, 12], // 16 to 12
          [16, 2], // 16 to 2
        ].map(([startId, endId], index) => {
          const startNode = constellationNodes.find((n) => n.id === startId)
          const endNode = constellationNodes.find((n) => n.id === endId)
          if (!startNode || !endNode) return null

          return (
            <motion.line
              key={`line-${startId}-${endId}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isMobile ? 0.5 : 0.6 }}
              transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
              x1={isMobile ? 
                startNode.id === 3 ? `${(startNode.x * 1.2) - 5}%` :
                startNode.id === 10 || startNode.id === 11 ? `${(startNode.x * 1.2) - 5}%` :
                startNode.id === 15 ? `${(startNode.x * 1.2) - 5}%` :
                `${(startNode.x * 1.2) - 10}%` :
                `${startNode.x + 2}%`}
              y1={isMobile ? 
                startNode.id === 3 ? `${(startNode.y * 0.8) + 10}%` :
                `${(startNode.y * 0.8) + 8}%` :
                `${startNode.y + 2}%`}
              x2={isMobile ? 
                endNode.id === 3 ? `${(endNode.x * 1.2) - 5}%` :
                endNode.id === 10 || endNode.id === 11 ? `${(endNode.x * 1.2) - 5}%` :
                endNode.id === 15 ? `${(endNode.x * 1.2) - 5}%` :
                `${(endNode.x * 1.2) - 10}%` :
                `${endNode.x + 2}%`}
              y2={isMobile ? 
                endNode.id === 3 ? `${(endNode.y * 0.8) + 10}%` :
                `${(endNode.y * 0.8) + 8}%` :
                `${endNode.y + 2}%`}
              stroke="url(#lineGradient)"
              strokeWidth={isMobile ? "1.5" : "2"}
            />
          )
        })}
      </svg>

      {/* Mobile-optimized Legend */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className={`absolute ${
          isMobile ? "bottom-4 left-4 right-4" : "bottom-8 left-8"
        } bg-black/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-blue-400/30`}
      >
        <div className={`flex items-center ${isMobile ? "justify-center space-x-6" : "space-x-4"} text-xs sm:text-sm`}>
          <div className="flex items-center space-x-2">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-white">Public</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <span className="text-white">Partner</span>
          </div>
        </div>
      </motion.div>



      {/* Mobile touch hint */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-white/60 text-xs tracking-wider"
          >
            TAP NODES TO EXPLORE
          </motion.div>
        </motion.div>
      )}

      {/* Node Modal */}
      {selectedNode && (
        <NodeModal 
          node={selectedNode} 
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}
