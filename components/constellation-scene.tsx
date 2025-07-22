"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Star, Lock } from "lucide-react"
import ConstellationNode from "./constellation-node"
import NodeModal from "./node-modal"

// Updated constellation nodes based on the provided mapping and PDF content
const constellationNodes = [
  // Node 1 - NFOH (Public)
  {
    id: 1,
    x: 45,
    y: 45,
    type: "unlocked",
    title: "NFOH",
    content:
      "Being heard amid the roar of your competitor's voices is a daunting task in today's crowded marketplace. We find this to be shockingly true each time we read a magazine, watch the television, surf the web, and listen to music. The MTM SPOT is at the cornerstone of our brands mantra to establish 'Platforms of Becoming' to unveil the true power of industry and create sensory engagement musical encounters that ultimately culminates into empowerment experiences. We are Story Commanders who understand the Art of curating Brand Encounters based upon the beliefs, values, perspectives of the individuals present who then falls in love with where we hope irrespective of nationality, race, age and or gender. HearYE, HearYE, Be YE Transformed! 'People don't buy what you do; they buy why you do it.' - Andrew Esse",
    color: "cyan",
  },

  // Node 2 - Verizon (Locked)
  {
    id: 2,
    x: 50,
    y: 85,
    type: "locked",
    partner: "Verizon",
    tier: "Technology Partner",
    color: "emerald",
  },

  // Node 3 - MTMSPOT (Public)
  {
    id: 3,
    x: 85,
    y: 35,
    type: "unlocked",
    title: "MTMSPOT",
    content:
      "The MTM Spot is an Exclusive Music Encounter captured in 3 epic locations starting on the pristine shores of Jamaica to the ancient land of Morocco to the final stop on the expansive plains of Shelbyville, TN. Each stop goes 'Beyond The Board' to create a premiere Music Docu-Series that takes enthusiasts into the minds of the industries most sought-after Songwriters, Producers, Musicians, and Stars in the production of a unique duo-inspired soundtrack starring the most prolific musical talents who have been paired to deliver a profound message on 'Everyman's' pursuit to seek a new point of departure regarding the 'brotherhood of mankind.'",
    color: "purple",
  },

  // Node 4 - Gibson Guitars (Locked)
  {
    id: 4,
    x: 55,
    y: 55,
    type: "locked",
    partner: "Gibson Guitars",
    tier: "Instrument Partner",
    color: "amber",
  },

  // Node 5 - Glory Foods (Locked)
  {
    id: 5,
    x: 40,
    y: 50,
    type: "locked",
    partner: "Glory Foods",
    tier: "Lifestyle Partner",
    color: "orange",
  },

  // Node 6 - AIX (Public)
  {
    id: 6,
    x: 50,
    y: 40,
    type: "unlocked",
    title: "AIX",
    content:
      "At AIXchange, we believe that every business has unique needs, and we strive to provide customized, AI-powered solutions that align with our clients' investment objectives. Our team of experienced consultants works closely with clients to develop and implement strategies that drive growth and success. We are committed to excellence, innovation, and customer satisfaction, and we go the extra mile to deliver the best possible results for our clients.",
    color: "red",
  },

  // Node 7 - Honda (Locked)
  {
    id: 7,
    x: 70,
    y: 50,
    type: "locked",
    partner: "Honda",
    tier: "Mobility Partner",
    color: "pink",
  },

  // Node 8 - Pandora (Locked)
  {
    id: 8,
    x: 65,
    y: 65,
    type: "locked",
    partner: "Pandora",
    tier: "Streaming Partner",
    color: "slate",
  },

  // Node 9 - MMV (Public)
  {
    id: 9,
    x: 75,
    y: 60,
    type: "unlocked",
    title: "MMV",
    content:
      "Our 'Iconic Advantage' lies in our ability to identify concrete unearthed possibilities illuminating the abstract concepts and ideations through the lens that breaks the constraints imposed by the major societal and cultural trends before us. MTM commissions Ivorian Born, and Morocco based artist Mederic Turay to curate 19 AI Digital Artwork Movie Posters of the Artists, Producers, & Songwriters at MMV Unreal Engine Studio. The MTM Art Collection demonstrates man's constant quest for balance and duality in life through music. The Artwork, steeped in rich West African roots, will be featured at the Soundtrack Release at Humble Baron at Uncle Nearest Venue in Shelbyville, TN.",
    color: "lime",
  },

  // Node 10 - Rixon Agency (Public)
  {
    id: 10,
    x: 85,
    y: 65,
    type: "unlocked",
    title: "Rixon Agency",
    content:
      "At Rixon Agency, we know that every business has its own story—and we're here to help you tell it better. Whether you're launching a new product, building your online presence, or pitching to investors, we create digital experiences that actually move the needle. From websites and mobile apps to pitch decks and brand design, our team blends creativity with strategy to build things that work—and look good doing it. We care about your goals, and we treat your success like our own. That means honest communication, smart execution, and showing up with solutions that help you grow.",
    color: "yellow",
  },

  // Node 11 - Ebony (Locked)
  {
    id: 11,
    x: 80,
    y: 75,
    type: "locked",
    partner: "Ebony",
    tier: "Platinum Partner",
    color: "stone",
  },

  // Node 12 - TOTE & CARRY (Locked)
  {
    id: 12,
    x: 45,
    y: 75,
    type: "locked",
    partner: "TOTE & CARRY",
    tier: "Merchandise Partner",
    color: "rose",
  },

  // Node 13 - Marrakesh (Public)
  {
    id: 13,
    x: 65,
    y: 30,
    type: "unlocked",
    title: "Marrakesh",
    content:
      "MARRAKECH MEDIA VILLAGE - Our second stop takes us to the ancient land of Morocco where artists engage in intensive writing, recording, and video sessions from March 5-24, 2026. The Marrakech experience features hot air balloon transport, AI digital artwork creation with Mederic Turay, and immersive cultural encounters that blend West African roots with contemporary music production. Artists work in 3 daily sessions (7AM-10AM, 10AM-2PM, 7PM-12AM) creating the soundtrack that demonstrates man's constant quest for balance and duality in life through music.",
    color: "amber",
  },

  // Node 14 - Host Hotel (Public)
  {
    id: 14,
    x: 55,
    y: 25,
    type: "unlocked",
    title: "Host Hotel",
    content:
      "Every successful enterprise IS propelled by the vertical connections forged from the right invitations being sent to the right 'Creativists' who are equipped and coveted by their alignment to use their talents to evoke change within those who believe in where we hope. Our hosting philosophy centers on creating transformative encounters at premier venues including Geejam Hotel & Studios in Port Antonio, Jamaica (1.22.26-2.8.26), Marrakech Media Village in Morocco (3.5.26-3.24.26), and Humble Baron in Shelbyville, TN (6.3.26-6.4.26).",
    color: "red",
  },

  // Node 15 - Phillips (Locked)
  {
    id: 15,
    x: 45,
    y: 20,
    type: "locked",
    partner: "Phillips",
    tier: "Audio Technology Partner",
    color: "cyan",
  },

  // Node 16 - Lune Lite (Public)
  {
    id: 16,
    x: 25,
    y: 50,
    type: "unlocked",
    title: "Lune Lite",
    content:
      "In an 'Act of Formlessness' we believe, as Robin D.G. Kelly notes that, 'our utopia is not in things but rather in what we see in our imagination' and it is the universal language of music that IS the conduit to transport us from our present state. For those who believe in where we hope our exodus is not escape but rather a new beginning. This philosophy guides our approach to creating transformative musical experiences that transcend traditional boundaries.",
    color: "emerald",
  },

  // Node 17 - Travel Noir (Locked)
  {
    id: 17,
    x: 25,
    y: 70,
    type: "locked",
    partner: "Travel Noir",
    tier: "Experience Partner",
    color: "yellow",
  },

  // Node 18 - Humble Barn (Public)
  {
    id: 18,
    x: 15,
    y: 45,
    type: "unlocked",
    title: "Humble Barn",
    content:
      "HUMBLE BARON - The final destination in Shelbyville, TN represents the culmination of our musical journey (6.3.26-6.4.26). This is where the soundtrack release takes place, featuring network streaming dates from May 24-31, 2026. The venue accommodates a Presidential Suite, 16 One Bedroom Suites, 16 Executive Suites, 27 Superior Rooms, and 5 Upper Rooms, providing the perfect setting for the grand finale of our three-stop musical odyssey. Load-in begins Day 1 (6.3.26) with the main event on Day 2 (6.4.26).",
    color: "blue",
  },

  // Node 19 - UBIGI (Locked)
  {
    id: 19,
    x: 30,
    y: 30,
    type: "locked",
    partner: "UBIGI",
    tier: "Connectivity Partner",
    color: "blue",
  },
]

export default function ConstellationScene() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)

  return (
    <div className="relative w-full h-full">
      {/* Background video */}
      <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="/videos/Video 2.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Constellation nodes */}
      <div className="absolute inset-0">
        {constellationNodes.map((node, index) => (
          <ConstellationNode key={node.id} node={node} index={index} onClick={() => setSelectedNode(node)} />
        ))}
      </div>

      {/* Connection lines between nodes based on the image */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </linearGradient>
        </defs>

        {/* Draw constellation lines based on the image connections */}
        {[
          [1, 5],
          [1, 6],
          [1, 4],
          [1, 8],
          [1, 9],
          [5, 16],
          [16, 18],
          [18, 17],
          [17, 12],
          [12, 2],
          [2, 11],
          [11, 10],
          [10, 9],
          [9, 7],
          [7, 3],
          [6, 13],
          [13, 14],
          [14, 15],
          [15, 19],
          [4, 7],
        ].map(([startId, endId], index) => {
          const startNode = constellationNodes.find((n) => n.id === startId)
          const endNode = constellationNodes.find((n) => n.id === endId)
          if (!startNode || !endNode) return null

          return (
            <motion.line
              key={`line-${startId}-${endId}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
              x1={`${startNode.x}%`}
              y1={`${startNode.y}%`}
              x2={`${endNode.x}%`}
              y2={`${endNode.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
          )
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-blue-400/30"
      >
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-white">Public Content</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-yellow-400" />
            <span className="text-white">Partner Access</span>
          </div>
        </div>
      </motion.div>

      {/* Node Modal */}
      {selectedNode && <NodeModal node={selectedNode} onClose={() => setSelectedNode(null)} />}
    </div>
  )
}
