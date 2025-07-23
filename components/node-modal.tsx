"use client"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Star, Building2, DollarSign, Users, Zap } from "lucide-react"
import { useState } from "react"
interface NodeModalProps {
  node: any
  onClose: () => void
}

export default function NodeModal({ node, onClose }: NodeModalProps) {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const isLocked = node.type === "locked"

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const expectedPassword = `${node.partner.split(" ")[0]}26`
    if (password === expectedPassword) {
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
    Marrakesh: "🏛️", // Keeping original since we're handling image separately
    "Host Hotel": "🏨",
    "Lune Lite": "/logos/Luna Lite.png",
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header */}
          <div className="flex items-start justify-between p-8 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-4">
              {isLocked ? (
                <>
                  <div className="text-6xl">
                    {partnerLogos[node.partner]?.startsWith('/') ? (
                      <img 
                        src={partnerLogos[node.partner]} 
                        alt={node.partner} 
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    ) : (
                      partnerLogos[node.partner] || "🏢"
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-white mb-2">{node.partner}</h2>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">{node.tier}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-6xl">
                    {partnerLogos[node.title]?.startsWith('/') ? (
                      <img 
                        src={partnerLogos[node.title]} 
                        alt={node.title} 
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    ) : (
                      partnerLogos[node.title] || "⭐"
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-white mb-2">{node.title}</h2>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Public Content</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-2 flex-shrink-0">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 pt-4">
            {isLocked ? (
              <>
                {/* Partner Access Required */}
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-medium text-yellow-400">Partner Access Required</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    This content is exclusively available to our {node.tier.toLowerCase()} and contains:
                  </p>
                  <ul className="space-y-2">
                    {tierBenefits[node.tier]?.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-white/70">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partnership Benefits */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <h4 className="text-white font-medium">Investment Tier</h4>
                    </div>
                    <p className="text-white/70 text-sm">
                      Premium partnership with exclusive benefits and ROI opportunities.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="w-5 h-5 text-blue-400" />
                      <h4 className="text-white font-medium">Audience Reach</h4>
                    </div>
                    <p className="text-white/70 text-sm">
                      Access to our growing community of music and space enthusiasts.
                    </p>
                  </div>
                </div>

                {/* Password Authentication */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-lg p-6 mt-6">
                  {!isAuthenticated ? (
                    <>
                      <h4 className="text-xl font-medium text-white mb-2">Partner Access</h4>
                      <p className="text-white/80 mb-4">Enter your partner access code to view exclusive content.</p>

                      {!showPasswordInput ? (
                        <button
                          onClick={() => setShowPasswordInput(true)}
                          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                        >
                          Access Partner Content
                        </button>
                      ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                          <div>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter access code"
                              className="w-full bg-black/50 border border-yellow-400/50 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                              autoFocus
                            />
                            {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
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
                              className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  ) : (
                    <div>
                      <h4 className="text-xl font-medium text-green-400 mb-4">✓ Access Granted</h4>
                      <p className="text-white/80 mb-6">
                        Welcome, partner! You now have access to exclusive {node.partner} partnership benefits and
                        opportunities.
                      </p>

                      {/* Exclusive Partner Perks */}
                      <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-6">
                        <h5 className="text-green-400 font-medium mb-4 text-lg">Exclusive Partnership Benefits</h5>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {partnerPerks[node.partner]?.map((perk, index) => (
                            <div key={index} className="flex items-start space-x-3 text-left">
                              <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-white/80 text-sm leading-relaxed">{perk}</span>
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
                {/* Public Content */}
                <div className="prose prose-invert max-w-none">
                  {/* For Marrakesh node, display image and text side by side */}
                  {node.title === "Marrakesh" && (
                    <div className="mb-6 flex flex-col md:flex-row gap-6">
                      <img 
                        src="/images/Marrakesh.png" 
                        alt="Marrakesh" 
                        className="w-full md:w-1/2 h-auto rounded-lg object-cover"
                      />
                      <div className="w-full md:w-1/2">
                        <p className="text-white/80 text-lg leading-relaxed">{node.content}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* For MMV node, display image and text side by side */}
                  {node.title === "MMV" && (
                    <div className="mb-6 flex flex-col md:flex-row gap-6">
                      <img 
                        src="/images/MVM.png" 
                        alt="MMV" 
                        className="w-full md:w-1/2 h-auto rounded-lg object-cover"
                      />
                      <div className="w-full md:w-1/2">
                        <p className="text-white/80 text-lg leading-relaxed">{node.content}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* For all other nodes, just show text */}
                  {node.title !== "Marrakesh" && node.title !== "MMV" && (
                    <p className="text-white/80 text-lg leading-relaxed">{node.content}</p>
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
