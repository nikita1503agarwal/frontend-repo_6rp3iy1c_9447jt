import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const idle = useRef(null)

  useEffect(() => {
    idle.current = setInterval(() => {
      if (!open) {
        // wiggle by toggling state to re-trigger animation
        setOpen((v) => v)
      }
    }, 4000)
    return () => clearInterval(idle.current)
  }, [open])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-black shadow-[0_10px_40px_rgba(168,85,247,0.45)]"
        animate={!open ? { rotate: [0, -8, 8, -4, 0] } : {}}
        transition={{ duration: 0.8 }}
      >
        <MessageCircle className="m-auto" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-400" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="mt-3 w-[300px] rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 text-white"
          >
            <div className="text-sm font-semibold mb-2">Hi! I can help you shop ✨</div>
            <div className="space-y-2 max-h-56 overflow-auto pr-1">
              <Bubble side="left">Show me wireless keyboards</Bubble>
              <Bubble side="right">Here are our best picks!</Bubble>
            </div>
            <input placeholder="Type a message..." className="mt-3 w-full rounded-2xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-400/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Bubble({ children, side = 'left' }) {
  return (
    <motion.div
      initial={{ x: side === 'left' ? -10 : 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`max-w-[80%] rounded-2xl px-3 py-2 ${side === 'left' ? 'bg-white/10' : 'bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-black ml-auto'}`}
    >
      {children}
    </motion.div>
  )
}
