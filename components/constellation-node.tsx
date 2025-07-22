"use client"

import { motion } from "framer-motion"
import { Lock, Star } from "lucide-react"

interface ConstellationNodeProps {
  node: any
  index: number
  onClick: () => void
}

const colorMap = {
  cyan: "bg-cyan-400/20 border-cyan-400 group-hover:bg-cyan-400/40",
  emerald: "bg-emerald-400/20 border-emerald-400 group-hover:bg-emerald-400/40",
  purple: "bg-purple-400/20 border-purple-400 group-hover:bg-purple-400/40",
  amber: "bg-amber-400/20 border-amber-400 group-hover:bg-amber-400/40",
  orange: "bg-orange-400/20 border-orange-400 group-hover:bg-orange-400/40",
  red: "bg-red-400/20 border-red-400 group-hover:bg-red-400/40",
  pink: "bg-pink-400/20 border-pink-400 group-hover:bg-pink-400/40",
  slate: "bg-slate-400/20 border-slate-400 group-hover:bg-slate-400/40",
  lime: "bg-lime-400/20 border-lime-400 group-hover:bg-lime-400/40",
  yellow: "bg-yellow-400/20 border-yellow-400 group-hover:bg-yellow-400/40",
  stone: "bg-stone-400/20 border-stone-400 group-hover:bg-stone-400/40",
  rose: "bg-rose-400/20 border-rose-400 group-hover:bg-rose-400/40",
  blue: "bg-blue-400/20 border-blue-400 group-hover:bg-blue-400/40",
}

const glowColorMap = {
  cyan: "bg-cyan-400/30 group-hover:bg-cyan-400/50",
  emerald: "bg-emerald-400/30 group-hover:bg-emerald-400/50",
  purple: "bg-purple-400/30 group-hover:bg-purple-400/50",
  amber: "bg-amber-400/30 group-hover:bg-amber-400/50",
  orange: "bg-orange-400/30 group-hover:bg-orange-400/50",
  red: "bg-red-400/30 group-hover:bg-red-400/50",
  pink: "bg-pink-400/30 group-hover:bg-pink-400/50",
  slate: "bg-slate-400/30 group-hover:bg-slate-400/50",
  lime: "bg-lime-400/30 group-hover:bg-lime-400/50",
  yellow: "bg-yellow-400/30 group-hover:bg-yellow-400/50",
  stone: "bg-stone-400/30 group-hover:bg-stone-400/50",
  rose: "bg-rose-400/30 group-hover:bg-rose-400/50",
  blue: "bg-blue-400/30 group-hover:bg-blue-400/50",
}

const iconColorMap = {
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
  purple: "text-purple-400",
  amber: "text-amber-400",
  orange: "text-orange-400",
  red: "text-red-400",
  pink: "text-pink-400",
  slate: "text-slate-400",
  lime: "text-lime-400",
  yellow: "text-yellow-400",
  stone: "text-stone-400",
  rose: "text-rose-400",
  blue: "text-blue-400",
}

export default function ConstellationNode({ node, index, onClick }: ConstellationNodeProps) {
  const isLocked = node.type === "locked"
  const nodeColor = node.color || "blue"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      onClick={onClick}
    >
      {/* Node number label - responsive */}
      <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-white/60 text-[10px] sm:text-xs font-medium">
        {node.id}
      </div>

      {/* Node glow effect - responsive */}
      <div
        className={`absolute inset-0 rounded-full blur-lg transition-all duration-300 group-hover:blur-xl ${
          glowColorMap[nodeColor as keyof typeof glowColorMap]
        } w-8 h-8 -m-1.5 sm:w-10 sm:h-10 sm:-m-2`}
      />

      {/* Main node - responsive sizing */}
      <div
        className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${
          colorMap[nodeColor as keyof typeof colorMap]
        } backdrop-blur-sm flex items-center justify-center`}
      >
        {isLocked ? (
          <Lock className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${iconColorMap[nodeColor as keyof typeof iconColorMap]}`} />
        ) : (
          <Star className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${iconColorMap[nodeColor as keyof typeof iconColorMap]}`} />
        )}
      </div>

      {/* Hover tooltip - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-white/20 whitespace-nowrap pointer-events-none z-10 max-w-[150px] sm:max-w-none"
      >
        <div className="text-white text-xs sm:text-sm font-medium truncate">{isLocked ? node.partner : node.title}</div>
        {isLocked && (
          <div className={`text-[10px] sm:text-xs ${iconColorMap[nodeColor as keyof typeof iconColorMap]} truncate`}>{node.tier}</div>
        )}
      </motion.div>

      {/* Pulsing animation for unlocked nodes - responsive */}
      {!isLocked && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className={`absolute inset-0 rounded-full ${glowColorMap[nodeColor as keyof typeof glowColorMap]}`}
          style={{ width: "20px", height: "20px" }}
        />
      )}
    </motion.div>
  )
}
