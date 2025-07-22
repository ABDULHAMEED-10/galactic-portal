# Galactic Portal - AI Coding Instructions

## Project Overview
A Next.js 14 React application with Framer Motion animations showcasing an interactive "galactic portal" experience with constellation-based navigation. The app transitions between scenes: intro video → portal transition → constellation map with clickable partner nodes.

## Architecture & Data Flow
- **Scene Management**: `app/page.tsx` orchestrates three main scenes via state: `intro` → `transition` → `constellation`
- **Video Integration**: External video sources from Vercel blob storage power background experiences
- **Node System**: 19 constellation nodes (mix of public/locked partner content) defined in `constellation-scene.tsx`
- **Modal Authentication**: Password-protected partner content using format `{PartnerName}26` (e.g., "Phillips26")

## Key Components & Patterns

### Scene Components
- `IntroScene`: Auto-playing video with click-to-enter functionality
- `ConstellationScene`: Interactive star map with SVG connection lines and partner nodes
- `NodeModal`: Content modal with conditional authentication for partner tiers

### Partner Content System
```tsx
// Partner logos support both emojis and image paths
partnerLogos: { [key: string]: string } = {
  Phillips: "/philips.jpeg",  // Image path
  Honda: "🚗",               // Emoji
}

// Conditional rendering for images vs emojis
{partnerLogos[node.partner]?.startsWith('/') ? (
  <img src={partnerLogos[node.partner]} alt={node.partner} className="w-16 h-16 object-contain rounded-lg" />
) : (
  partnerLogos[node.partner] || "🏢"
)}
```

### Animation Patterns
- Use `framer-motion` for all scene transitions with `AnimatePresence` wrapper
- Staggered node animations: `delay: index * 0.1 + 1`
- Portal transition uses scaling effects: `scale: [0, 1, 1.2]` with rotation

## Development Workflows

### Adding New Partners
1. Add node data to `constellationNodes` array in `constellation-scene.tsx`
2. Update `partnerLogos` object in `node-modal.tsx` (use `/path.ext` for images, emoji for icons)
3. Add tier benefits to `tierBenefits` object
4. Add specific perks to `partnerPerks` object
5. Update connection lines array if needed

### Video Management
- External videos hosted on Vercel blob storage
- Local fallbacks in `public/videos/` for development
- Preloading logic in `page.tsx` useEffect ensures smooth transitions

### Styling Conventions
- Tailwind CSS with custom gradients (`bg-gradient-radial`)
- Consistent spacing: `p-8`, `space-x-4`, `space-y-3`
- Glass morphism effects: `backdrop-blur-sm`, `bg-black/60`
- Color scheme: `blue-400`, `yellow-400`, `cyan-400` for different node types

## File Organization
```
app/
  ├── page.tsx          # Main scene orchestrator
  ├── layout.tsx        # App shell
  └── globals.css       # Global styles
components/
  ├── constellation-scene.tsx  # Interactive star map
  ├── constellation-node.tsx   # Individual clickable nodes
  ├── intro-scene.tsx          # Video intro with portal entry
  └── node-modal.tsx           # Partner content & authentication
public/
  └── videos/          # Local video assets (if needed)
```

## Critical Dependencies
- `framer-motion`: All animations and scene transitions
- `lucide-react`: Consistent icon system throughout
- `next`: App Router with client components (`"use client"`)

## Authentication Flow
Partner access uses simple password format: `{FirstWordOfPartner}26`
- Phillips → "Phillips26"
- Gibson Guitars → "Gibson26"
