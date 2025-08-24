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
      "Our 'Iconic Advantage' lies in our ability to identify concrete unearthed possibilities illuminating the abstract concepts and ideations through the lens that breaks the constraints imposed by the major societal and cultural trends before us.\n\nMTM commissions Ivorian Born, and Morocco based artist Mederic Turay to curate a Digital Artwork Collection of the Artists, Producers, & Songwriters at MMV Unreal Engine Studio.\n\nThe MTM Art Collection demonstrates man's constant quest for balance and duality in life through music. The Artwork, steeped in rich West African roots and shot in Morocco at Marrakesh Media Village, will be featured at the Soundtrack Release at Humble Baron at Uncle Nearest Green's Humble Baron Venue in Shelbyville, TN.",
    color: "cyan",
  },

  // Node 2 - Verizon (Locked) - bottom right
  {
    id: 2,
    x: 38,
    y: 88,
    type: "locked",
    partner: "Verizon",
    tier: "Title Partner",
    investment: "$97,705.49",
    content: "Verizon insignia under the Title Partner inside Souvenir Video Books",
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
      "Being heard amid the roar of your competitor's voices is a daunting task in today's crowded marketplace. We find this to be shockingly true each time we read a magazine, watch the television, surf the web, and listen to music.\n\nThe mantra of our brand is to establish 'Platforms of Becoming' to unveil the true power of industry and create sensory engagement musical encounters that ultimately culminates into empowerment experiences.\n\nWe are Story Commanders who understand the Art of curating Brand Encounters based upon the beliefs, values, perspectives of the individuals present who then falls in love with where we hope irrespective of nationality, race, age and or gender.\n\nHearYE, HearYE, Be YE Transformed!\n\n'People don't buy what you do; they buy why you do it.' - Andrew Esse\n\nMTM is an Exclusive Music Encounter captured in 2 epic locations departing from the ancient sands of Morocco and landing on the expansive plains of Shelbyville, TN.\n\nEach stop goes \"Beyond The Board\" to create a premiere Music Docu-Series that takes enthusiasts into the minds of the industries most sought-after Songwriters, Producers, Musicians, and Stars in the production of a unique duo-inspired soundtrack starring the most prolific musical talents who have been paired to deliver a profound message on \"Everyman's\" pursuit to seek a new point of departure regarding the \"Brotherhood Of Mankind.\"",
    color: "purple",
  },

  // Node 4 - Gibson Guitars (Locked) - top of parallelogram
  {
    id: 4,
    x: 58,
    y: 48,
    type: "locked",
    partner: "Gibson Guitars",
    tier: "Producing Partner",
    investment: "$43,745.49",
    content: "Gibson Guitars insignia under Producing Partner in Souvenir Video Books",
    color: "amber",
  },

  // Node 5 - Glory Foods (Locked) - left of parallelogram
  {
    id: 5,
    x: 38,
    y: 52,
    type: "locked",
    partner: "Glory Foods",
    tier: "Producing Partner",
    investment: "$53,960.00",
    content: "Glory Foods insignia under Producing Partner in Souvenir Video Books",
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
      "At AIXchange, we believe that every business has unique needs, and we strive to provide customized, AI-powered solutions that align with our clients' investment objectives.\n\nOur team of experienced consultants is charged to work with NFOH World to develop and implement a financial strategy that drives growth and success.\n\nWe are committed to excellence, innovation, and customer satisfaction, and we look forward to going the extra mile to deliver the best possible results.",
    color: "red",
  },

  // Node 7 - Range Rover (Locked) - right of center
  {
    id: 7,
    x: 68,
    y: 45,
    type: "locked",
    partner: "Range Rover",
    tier: "Presenting Partner",
    investment: "$72,482.22",
    content: "Range Rover insignia under Presenting Partner in inside Souvenir Video Books",
    color: "pink",
  },

  // Node 8 - Pandora (Locked) - right side, below 7
  {
    id: 8,
    x: 72,
    y: 55,
    type: "locked",
    partner: "Pandora",
    tier: "Presenting Partner",
    investment: "$72,482.22",
    content: "Pandora insignia under the Presenting Partner inside Souvenir Video Books",
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
      "MMV is a film creator's dream!\n\nMMV features numerous indoor/outdoor green screens, large indoor studios, amazing surroundings, and its natural spectacular scenery. We offer all of the essential equipment for top level motion picture and music video productions at your disposal.\n\nWhile the Imagineers & Creativist work on campus they will be comforted in luxury and enjoy one of our 14 fully equipped and spacious suites, arranged around gorgeous swimming pools and complemented by sunbathing spaces, Moroccan Kabyle-style tents for tea and discussions, fully staffed bars and dining areas, and a full gym.\n\nMMV is proud to align with NFOH in the recording of the Soundtrack for Samson: Blood Oath and promises 17 days of leisure and relaxation, Moroccan cuisine, mint tea, and sunsets to unwind under the beautiful Moroccan skies.",
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
      "At Rixon Agency, we know that every business has its own story—and we're here to help you tell it better. We are proud to expand our reach in the US market with NFOH World.\n\nOur charge, whether you're launching a new product, building your online presence, or pitching to investors, is to create immersive digital experiences that actually move the needle.\n\nFrom websites and mobile apps to engagement decks and brand design, our team blends creativity with strategy to build things that work—and look good doing it.\n\nWe care about your goals, and we treat your success like our own. That means honest communication, smart execution, and showing up with solutions that help you grow.",
    color: "yellow",
  },

      // Node 11 - Ebony (Locked) - right side, bottom
    {
      id: 11,
      x: 75,
      y: 70,
      type: "locked",
      partner: "Ebony",
      tier: "Presenting Partner",
      investment: "$72,482.22",
      content: "Ebony Magazine insignia under the Presenting Partner inside Souvenir Video Books",
      color: "stone",
    },

      // Node 12 - TOTE & CARRY (Locked) - lower left
    {
      id: 12,
      x: 38,
      y: 75,
      type: "locked",
      partner: "TOTE & CARRY",
      tier: "Presenting Partner",
      investment: "$72,482.22",
      content: "Tote & Carry insignia under the Presenting Partner inside Souvenir Video Books",
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
      "From the contemporary design of our three audio recording studios equipped with cutting-edge technology, equipment, and services, including soundproof \"room within a room\" systems, to the incorporation of researched sound isolation techniques with calibrated Dynaudio, Genelec, Focus sound systems, near to far field ranges, a large selection of professional microphones and instruments, and even a 7.1 audio system set-up makes us the perfect choice for any and all forms of audio recording and mixing, whether for music, film sound post-production.\n\nSongwriters, Producers, Musicians, Singers, and Talent convene in Marrakesh, Morocco at the sprawling complex where they will engage in intensive writing, recording, and video sessions March 8-27, 2026.\n\nThe Marrakech Music Experience features cutting-edge State-Of-The-Art Recording Studio, Green Screen Studio, and luxurious 5-Star Accommodations.",
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
      "Every successful enterprise IS propelled by the vertical connections forged from the right invitations being sent to the right 'Creativists' who are equipped and coveted by their alignment to use their talents to evoke change within those who believe in where we hope.\n\nThe foundations of Private Hideaway Villas is built on a wealth of solid travel experience and passion.\n\nThe company, led by Directors with a heart felt love of luxury travel and 45 years of experience in the industry, is at the cornerstone of the MTM Music Encounter in Morocco.\n\nFrom Making the Music to Lounging Under the Moroccan Sun Private Hideaway Villas offers a range of 5-Star services customized to Meet The Impossible!",
    color: "red",
  },

      // Node 15 - Phillips (Locked) - moved up and right
    {
      id: 15,
      x: 42, // Changed from 37 to 42 (moved right)
      y: 12, // Changed from 16 to 12 (moved up)
      type: "locked",
      partner: "Phillips",
      tier: "Supporting Rights Partner",
      investment: "$53,960.00",
      content: "Phillips insignia under the Supporting Rights Partner inside Souvenir Video Books",
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
      "Creating the soundtrack is rooted in our ability to establish a foundation where the constant quest for balance and duality in life is fulfilled. Artists will reside at the ultra-exclusive 15-hectare private pavillion enclave amidst olive groves with breaktaking views of the majestic Atlas Mountains",
    color: "emerald",
  },

  // Node 17 - Travel Noir (Locked) - middle of vertical line
  {
    id: 17,
    x: 19,
    y: 65,
    type: "locked",
    partner: "Travel Noir",
    tier: "Naming Rights Partner",
    investment: "$150,000.00",
    content: "Travel Noir insignia under the Naming Rights Partner inside Souvenir Video Books",
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
      "The final destination for MTM is at the expansive Uncle Nearest Green Distillery located in Shelbyville, TN.\n\nThe Humble Baron, heralded as the largest bar in the world, is the perfect setting for the grand finale of the LIVE Listening Party Soundtrack Release featuring 16 of the world's most prolific artists across every musical genre.",
    color: "blue",
  },

  // Node 19 - UBIGI (Locked) - upper left
  {
    id: 19,
    x: 25,
    y: 38,
    type: "locked",
    partner: "UBIGI",
    tier: "Producing Partner",
    investment: "$43,745.49",
    content: "Enter your Partner Access Code and \"Embrace The Noise\"",
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
