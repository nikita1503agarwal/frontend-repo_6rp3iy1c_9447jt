import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ShoppingCart, Menu, Search } from 'lucide-react'

export default function Header({ cartCount = 0 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 12 })
  const sy = useSpring(y, { stiffness: 120, damping: 12 })
  const ref = useRef(null)

  useEffect(() => {
    const handle = (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      x.set(mx * 10)
      y.set(my * 10)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [x, y])

  return (
    <div className="sticky top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      <header ref={ref} className="backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <motion.div style={{ rotateX: sy, rotateY: sx }} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-[0_0_40px_rgba(99,102,241,0.4)]" />
            <span className="text-white font-semibold tracking-wide">NeonCraft</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {['Shop','New','Accessories','Support'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="relative text-sm text-white/80 hover:text-white"
                whileHover={{ scaleX: 1.06 }}
                style={{ display: 'inline-block', originX: 0.5 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                <span className="inline-block">{item}</span>
                <motion.span
                  layoutId="liquid"
                  className="absolute -bottom-2 left-1/2 h-[2px] w-0 bg-gradient-to-r from-fuchsia-400 to-cyan-400 rounded-full"
                  whileHover={{ left: 0, right: 0, width: '100%' }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white">
              <Search size={18} />
            </button>
            <motion.button
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
              animate={cartCount > 0 ? { boxShadow: ['0 0 0 0 rgba(99,102,241,0.0)','0 0 24px 6px rgba(168,85,247,0.45)'] } : {}}
              transition={{ duration: 1.2, repeat: cartCount > 0 ? Infinity : 0, repeatType: 'reverse' }}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-[10px] font-bold text-white shadow-lg">
                  {cartCount}
                </span>
              )}
            </motion.button>
            <button className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}
