import React from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative h-[78vh] md:h-[86vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 w-full grid md:grid-cols-2 gap-10">
          <div className="text-white">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {['Future','ready','accessories'].map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 14, delay: i * 0.04 }}
                >
                  {w}
                </motion.span>
              ))}
              <motion.span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-sky-400 to-cyan-300">
                that glow
              </motion.span>
            </motion.h1>
            <p className="mt-5 text-white/80 max-w-lg">
              NeonCraft builds playful, premium gear for creators. Ultra-smooth interactions. Bold personality. Built to shine.
            </p>

            <motion.button
              onClick={onCTAClick}
              className="relative mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-black bg-gradient-to-r from-fuchsia-400 to-cyan-300 shadow-[0_10px_40px_rgba(56,189,248,0.35)]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop the Wave
              <Sheen />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sheen() {
  return (
    <span className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_10%_-20%,rgba(255,255,255,0.65),transparent_40%),radial-gradient(circle_at_90%_120%,rgba(255,255,255,0.35),transparent_40%)]" />
      <span className="absolute -inset-1 animate-[sheen_5s_linear_infinite] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.65),transparent)]" />
      <style>{`@keyframes sheen { 0%{ transform: translateX(-120%)} 100%{ transform: translateX(120%)} }`}</style>
    </span>
  )
}
