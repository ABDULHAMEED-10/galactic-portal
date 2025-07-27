"use client"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Star, Building2, DollarSign, Users, Zap, Play } from "lucide-react"
import { useState, useEffect } from "react"
import VideoPlayer from "./video-player"

interface NodeModalProps {
  node: any
  onClose: () => void
}

export default function NodeModal({ node, onClose }: NodeModalProps) {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const isLocked = node.type === "locked"

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const expectedPassword = `${node.partner.split(" ")[0]}26`
    if (password.toLowerCase() === expectedPassword.toLowerCase()) {
      setIsAuthenticated(true)
      setPasswordError("")
    } else {
      setPasswordError("Invalid password. Please try again.")
      setPassword("")
    }
  }

  const partnerLogos: { [key: string]: string } = {
    Ebony: "/logos/ebony.jpeg",
    Verizon: "/logos/verizon.jpeg",
    UBIGI: "/logos/ubigi.jpeg",
    Pandora: "/logos/pandora.jpeg",
    "Gibson Guitars": "/logos/gibson.jpeg",
    "Travel Noir": "/logos/travel noir.jpeg",
    "Glory Foods": "/logos/glory foods.jpeg",
    "TOTE & CARRY": "/logos/tote & carry.jpeg",
    Phillips: "/logos/philips.jpeg",
    Honda: "/logos/honda.png",
    NFOH: "/logos/NFOH.jpeg",
    "Rixon Agency": "/logos/rixon.png",
    AIX: "/logos/AIX.jpeg",
    MTMSPOT: "/logos/MTM spot.jpeg",
    MMV: "/logos/MMV image.jpeg",
    "Humble Barn": "/logos/humble baron.jpeg",
    Marrakesh: "🏛️",
    "Host Hotel": "🏨",
    "Lune Lite": "/logos/Luna Lite.png",
  }

  // Video mappings for partner nodes
  const partnerVideos: { [key: string]: string } = {
    "TOTE & CARRY": "fvjByEyVjho",
    Ebony: "_sHtbgSY_pw",
    Phillips: "_l0Bpab1dIQ",
    "Travel Noir": "5d6vB4kyKa0",
    UBIGI: "LPcEY2YvdvU",
    Honda: "ZjUi6usz_y4", // Using first Honda video
    Pandora: "3zV1yMAsnbw",
    "Glory Foods": "tMaDAJiIFkI",
    "Gibson Guitars": "RKvNdc-M_30",
    Verizon: "acy8jlXUMFM",
  }

  const partnerPerks: { [key: string]: string[] } = {
    Honda: [
      "Honda Logo insignia in first shot arrivals and departures in video content",
      "Full-Color Ad in 300 Souvenir Video Books",
      "Honda Logo Insignia under Title Partner in inside Souvenir Video Books",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Honda Representative",
      "Honda Logo & Video Insignia on Kinetic Step & Repeat Wall",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Honda content on Kinetic Step & Repeat Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Honda insignia in Drone Show at Humble Baron Listening Party",
    ],
    Ebony: [
      "Ebony insignia on cover of Souvenir Video Books",
      "2-Page Full-Color Ad spread in 300 Souvenir Video Books",
      "Ebony Logo Insignia under Title Partner in inside Souvenir Video Books",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Ebony Representative",
      "Ebony Logo & Video Insignia on Kinetic Step & Repeat Wall",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Ebony content on Kinetic Step & Repeat Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Ebony insignia in Drone Show at Humble Baron Listening Party",
    ],
    "TOTE & CARRY": [
      "Tote & Carry insignia under Title Partner in Souvenir Video Books",
      "2-Page Full-Color Ad spread with Cast in 300 Souvenir Video Books",
      "Exclusive 60-Sec spots by all talent with Tote & Carry bags",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Tote & Carry Representative",
      "Tote & Carry Logo & Video Insignia on Kinetic Step & Repeat Wall",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Tote & Carry content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Tote & Carry insignia in Drone Show at Humble Baron Listening Party",
    ],
    Pandora: [
      "Pandora insignia under Title Partner in Souvenir Video Books",
      "1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Prominent Pandora logo insignia inside Studio A",
      "Prominent Pandora logo insignia outside Studio A",
      "Exclusive Content with Pandora Representative and EP touring Studio A",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Pandora Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Pandora content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Pandora insignia in Drone Show at Humble Baron Listening Party",
    ],
    "Gibson Guitars": [
      "Gibson Guitars insignia under Title Partner in Souvenir Video Books",
      "1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Prominent Gibson Guitars logo insignia inside Studio A",
      "Exclusive BTS Content to air across Gibson Guitars social platforms",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Gibson Guitar Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Gibson Guitars content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Gibson Guitars insignia in Drone Show at Humble Baron Listening Party",
    ],
    UBIGI: [
      "UBIGI insignia under Producing Partner in Souvenir Video Books",
      "UBIGI 1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Exclusive UBIGI Signage in Studio A Lounge area",
      "Prominent UBIGI logo insignia inside Studio A",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for UBIGI Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "UBIGI content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "UBIGI insignia in Drone Show at Humble Baron Listening Party",
    ],
    Verizon: [
      "Verizon insignia under Producing Partner in Souvenir Video Books",
      "Verizon 1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Exclusive BTS Songwriting content airing on all Verizon social platforms",
      "Prominent Verizon logo insignia inside Studio A",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Verizon Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Verizon content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Verizon insignia in Drone Show at Humble Baron Listening Party",
    ],
    Phillips: [
      "Phillips insignia under Supporting Partner in Souvenir Video Books",
      "Phillips 1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Exclusive BTS with Mederic Turay on all Phillips social platforms",
      "Exclusive Phillips logo insignia on 17 LED Poster Panels",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Phillips Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Phillips content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Phillips insignia in Drone Show at Humble Baron Listening Party",
    ],
    "Travel Noir": [
      "Travel Noir insignia under Supporting Partner in Souvenir Video Books",
      "Travel Noir 1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Exclusive Tour with DZ Owner to air on all Travel Noir social platforms",
      'Exclusive 17-Part Series "Meet Me in Morocco" with talent',
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Travel Noir Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Travel Noir content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Travel Noir insignia in Drone Show at Humble Baron Listening Party",
    ],
    "Glory Foods": [
      "Glory Foods insignia under Supporting Partner in Souvenir Video Books",
      "Glory Foods 1 Page Full-Color Ad in 300 Souvenir Video Books",
      "Exclusive Glory Foods insignia at Craft Services area at Studio A",
      "Exclusive Glory Foods insignia on Menu at DZ Residences",
      "Exclusive Glory Foods insignia at Humble Baron Reception",
      "1 Suite at DZ Residences in Marrakesh, Morocco",
      "Airport & Ground Transportation in Marrakesh, Morocco",
      "Photo-Ops with Music Talent in Studio",
      "All-Inclusive F&B on set and at DZ Residences",
      "2 UVIP Tickets to Humble Baron Listening Party",
      "2 Suites at W Nashville for Humble Baron Listening Party",
      "Airport & Ground Transportation for Humble Baron Listening Party",
      "90-sec Black Carpet Interview for Glory Foods Representative",
      "Mention by host on Black Carpet at Humble Baron Listening Party",
      "2 VIP Tickets to Samson:Blood Oath Premiere at The National Harbor",
      "Black Carpet Interview at Samson:Blood Oath at The National Harbor",
      "Glory Foods content on Kinetic Wall at The National Harbor",
      "Mention by host on Black Carpet at The National Harbor",
      "Glory Foods insignia in Drone Show at Humble Baron Listening Party",
    ],
    "Rixon Agency": [
      "Rixon Logo on Event Website, Socials & Brochures",
      "Promo Slide or Banner in Investor Pitch Decks",
      '"Tech Partner: Rixon" Tag on Event App / Landing Page',
      "60-Second Video Spotlight or Shoutout at the Event",
      "Free Design or Tech Consult for Select Startups",
      "2 VIP Passes to Event + Private Founder Meetup",
      "Branded Giveaway (Optional)",
      "Mention in Event Emails or Recap Post",
      "Rixon-Built Landing Page or Form for the Event",
    ],
  }

  const tierBenefits: { [key: string]: string[] } = {
    "Platinum Partner": [
      "Premium brand placement",
      "Exclusive content access",
      "VIP event invitations",
      "Co-marketing opportunities",
    ],
    "Technology Partner": ["Technical integration", "Innovation showcase", "Beta access", "Joint development"],
    "Connectivity Partner": ["Network solutions", "Global reach", "Data insights", "Infrastructure support"],
    "Streaming Partner": ["Platform integration", "Playlist features", "Analytics access", "Promotional support"],
    "Instrument Partner": ["Product placement", "Artist endorsements", "Studio access", "Equipment sponsorship"],
    "Experience Partner": ["Event collaboration", "Travel packages", "Exclusive experiences", "Lifestyle integration"],
    "Lifestyle Partner": ["Product integration", "Cultural alignment", "Community engagement", "Brand synergy"],
    "Merchandise Partner": ["Product development", "Distribution channels", "Brand licensing", "Retail partnerships"],
    "Audio Technology Partner": ["Sound innovation", "Technical expertise", "Product development", "Quality assurance"],
    "Mobility Partner": ["Transportation solutions", "Event logistics", "Brand mobility", "Innovation showcase"],
    "Media Partner": ["Content distribution", "Brand amplification", "Audience engagement", "Digital presence"],
    "Strategic Partner": ["Business development", "Market expansion", "Partnership facilitation", "Growth strategy"],
    "Culinary Partner": ["Food service integration", "Brand placement", "Event catering", "Cultural experiences"],
  }

  // Check if node has video content
  const hasVideo = isLocked ? partnerVideos[node.partner] : false
  const videoId = isLocked ? partnerVideos[node.partner] : null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl ${
            isMobile ? "w-full max-w-sm max-h-[90vh]" : "max-w-5xl w-full max-h-[85vh]"
          } overflow-hidden flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header - Mobile Optimized */}
          <div
            className={`flex items-start justify-between ${isMobile ? "p-4 pb-3" : "p-6 pb-4"} border-b border-white/10`}
          >
            <div className={`flex items-center ${isMobile ? "space-x-3" : "space-x-4"}`}>
              {isLocked ? (
                <>
                  <div className={isMobile ? "text-3xl" : "text-5xl"}>
                    {partnerLogos[node.partner]?.startsWith("/") ? (
                      <img
                        src={partnerLogos[node.partner] || "/placeholder.svg"}
                        alt={node.partner}
                        className={`${isMobile ? "w-10 h-10" : "w-14 h-14"} object-contain rounded-lg`}
                      />
                    ) : (
                      partnerLogos[node.partner] || "🏢"
                    )}
                  </div>
                  <div>
                    <h2 className={`${isMobile ? "text-lg" : "text-2xl"} font-light text-white mb-1`}>
                      {node.partner}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Building2 className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-yellow-400`} />
                      <span className={`text-yellow-400 font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
                        {node.tier}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={isMobile ? "text-3xl" : "text-5xl"}>
                    {partnerLogos[node.title]?.startsWith("/") ? (
                      <img
                        src={partnerLogos[node.title] || "/placeholder.svg"}
                        alt={node.title}
                        className={`${isMobile ? "w-10 h-10" : "w-14 h-14"} object-contain rounded-lg`}
                      />
                    ) : (
                      partnerLogos[node.title] || "⭐"
                    )}
                  </div>
                  <div>
                    <h2 className={`${isMobile ? "text-lg" : "text-2xl"} font-light text-white mb-1`}>{node.title}</h2>
                    <div className="flex items-center space-x-2">
                      <Star className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-blue-400`} />
                      <span className={`text-blue-400 font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
                        Public
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-2 flex-shrink-0">
              <X className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
            </button>
          </div>

          {/* Scrollable Content - Mobile Optimized */}
          <div className={`flex-1 overflow-y-auto modal-content-scroll ${isMobile ? "p-4 pt-3" : "p-6 pt-4"}`}>
            {isLocked ? (
              <>
                {/* Video at the top if available */}
                {hasVideo && videoId && (
                  <div className="mb-6">
                    <VideoPlayer
                      videoId={videoId}
                      title={`${node.partner} Partnership Video`}
                      className={`${isMobile ? "h-48" : "h-80"} w-full`}
                    />
                  </div>
                )}

                {/* Partner Access Required - Only show if not authenticated */}
                {!isAuthenticated && (
                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Lock className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-yellow-400`} />
                      <h3 className={`${isMobile ? "text-base" : "text-lg"} font-medium text-yellow-400`}>
                        Partner Access Required
                      </h3>
                    </div>
                    <p className={`text-white/80 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>
                      Partnership perks and benefits are exclusively available to our {node.tier.toLowerCase()}. 
                      {hasVideo && " Videos are accessible to all users."}
                    </p>
                  </div>
                )}

                {/* Partnership Benefits - Mobile Stacked */}
                <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "md:grid-cols-2 gap-4"} mb-4 sm:mb-6`}>
                  <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-green-400`} />
                      <h4 className={`text-white font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
                        Investment Tier
                      </h4>
                    </div>
                    <p className={`text-white/70 ${isMobile ? "text-xs" : "text-sm"}`}>
                      Premium partnership with exclusive benefits and ROI opportunities.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-blue-400`} />
                      <h4 className={`text-white font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
                        Audience Reach
                      </h4>
                    </div>
                    <p className={`text-white/70 ${isMobile ? "text-xs" : "text-sm"}`}>
                      Access to our growing community of music and space enthusiasts.
                    </p>
                  </div>
                </div>

                {/* Password Authentication - Mobile Optimized */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6">
                  {!isAuthenticated ? (
                    <>
                      <h4 className={`${isMobile ? "text-base" : "text-lg"} font-medium text-white mb-2`}>
                        Partner Access
                      </h4>
                      <p className={`text-white/80 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>
                        Enter your partner access code to view exclusive perks and benefits. Videos are available to all users.
                      </p>

                      {!showPasswordInput ? (
                        <button
                          onClick={() => setShowPasswordInput(true)}
                          className={`bg-yellow-400 text-black ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} rounded-lg font-medium hover:bg-yellow-300 transition-colors w-full sm:w-auto`}
                        >
                          Access Partner Content
                        </button>
                      ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-3">
                          <div>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter access code"
                              className={`w-full bg-black/50 border border-yellow-400/50 rounded-lg ${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"} text-white placeholder-white/50 focus:outline-none focus:border-yellow-400`}
                              autoFocus
                            />
                            {passwordError && (
                              <p className={`text-red-400 ${isMobile ? "text-xs" : "text-sm"} mt-1`}>
                                {passwordError}
                              </p>
                            )}
                          </div>
                          <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-3"}`}>
                            <button
                              type="submit"
                              className={`bg-yellow-400 text-black ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} rounded-lg font-medium hover:bg-yellow-300 transition-colors ${isMobile ? "w-full" : ""}`}
                            >
                              Access Content
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPasswordInput(false)
                                setPassword("")
                                setPasswordError("")
                              }}
                              className={`bg-white/10 text-white ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} rounded-lg font-medium hover:bg-white/20 transition-colors ${isMobile ? "w-full" : ""}`}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  ) : (
                    <div>
                      <h4 className={`${isMobile ? "text-base" : "text-lg"} font-medium text-green-400 mb-3`}>
                        ✓ Access Granted
                      </h4>
                      <p className={`text-white/80 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>
                        Welcome, partner! You now have access to exclusive {node.partner} partnership benefits and perks.
                      </p>

                      {/* Exclusive Partner Perks - Mobile Optimized */}
                      <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 sm:p-6">
                        <h5 className={`text-green-400 font-medium mb-3 ${isMobile ? "text-sm" : "text-base"}`}>
                          Exclusive Partnership Benefits
                        </h5>
                        <div className={`space-y-2 ${isMobile ? "max-h-48" : "max-h-64"} overflow-y-auto modal-content-scroll`}>
                          {partnerPerks[node.partner]?.map((perk, index) => (
                            <div key={index} className="flex items-start space-x-2 text-left">
                              <Zap
                                className={`${isMobile ? "w-2 h-2" : "w-3 h-3"} text-green-400 mt-0.5 flex-shrink-0`}
                              />
                              <span className={`text-white/80 ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>
                                {perk}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Public Content - Mobile Optimized */}
                <div className="prose prose-invert max-w-none">
                  {/* For Marrakesh node, display image and text with improved layout */}
                  {node.title === "Marrakesh" && (
                    <div
                      className={`mb-6 ${isMobile ? "space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"}`}
                    >
                      <div className="relative">
                        <img
                          src="/images/Marrakesh.png"
                          alt="Marrakesh"
                          className="w-full h-auto rounded-lg object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      </div>
                      <div className="space-y-4">
                        <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-4">
                          <h3 className={`text-amber-400 font-semibold mb-2 ${isMobile ? "text-sm" : "text-base"}`}>
                            🏛️ Marrakech Media Village
                          </h3>
                          <p className={`text-white/90 ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>
                            {node.content}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className={`text-amber-400 font-bold ${isMobile ? "text-lg" : "text-xl"}`}>
                              Mar 5-24
                            </div>
                            <div className={`text-white/60 ${isMobile ? "text-xs" : "text-sm"}`}>2026</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className={`text-amber-400 font-bold ${isMobile ? "text-lg" : "text-xl"}`}>
                              3 Sessions
                            </div>
                            <div className={`text-white/60 ${isMobile ? "text-xs" : "text-sm"}`}>Daily</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* For MMV node, display image and text with improved layout */}
                  {node.title === "MMV" && (
                    <div
                      className={`mb-6 ${isMobile ? "space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"}`}
                    >
                      <div className="relative">
                        <img
                          src="/images/MVM.png"
                          alt="MMV"
                          className="w-full h-auto rounded-lg object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      </div>
                      <div className="space-y-4">
                        <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4">
                          <h3 className={`text-lime-400 font-semibold mb-2 ${isMobile ? "text-sm" : "text-base"}`}>
                            🎨 MMV Unreal Engine Studio
                          </h3>
                          <p className={`text-white/90 ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>
                            {node.content}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className={`text-lime-400 font-bold ${isMobile ? "text-lg" : "text-xl"}`}>19</div>
                            <div className={`text-white/60 ${isMobile ? "text-xs" : "text-sm"}`}>AI Artworks</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className={`text-lime-400 font-bold ${isMobile ? "text-lg" : "text-xl"}`}>Mederic</div>
                            <div className={`text-white/60 ${isMobile ? "text-xs" : "text-sm"}`}>Turay</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* For all other nodes, just show text with better styling */}
                  {node.title !== "Marrakesh" && node.title !== "MMV" && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                      <p className={`text-white/90 ${isMobile ? "text-sm" : "text-base"} leading-relaxed`}>
                        {node.content}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
