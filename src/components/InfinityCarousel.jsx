import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const products = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `Neon Pad ${i + 1}`,
  price: (49 + i * 3).toFixed(2),
  color: i % 2 === 0 ? 'from-fuchsia-500 to-rose-400' : 'from-cyan-400 to-sky-500',
}))

export default function InfinityCarousel({ onAdd }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })

  useEffect(() => {
    if (inView) controls.start('animate')
  }, [inView, controls])

  const row = [...products, ...products]

  return (
    <section ref={ref} className="relative py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Trending Now</h2>
        </div>
        <div className="overflow-hidden group">
          <motion.div
            className="flex gap-6"
            variants={{
              animate: {
                x: [0, -((row.length / 2) * 260)],
                transition: {
                  x: { duration: 20, ease: 'linear', repeat: Infinity },
                },
              },
            }}
            animate={controls}
            whileHover={{ transition: { x: { duration: 12 } } }}
          >
            {row.map((p, idx) => (
              <Card key={idx} p={p} onAdd={onAdd} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Card({ p, onAdd }) {
  return (
    <motion.div
      className="w-[240px] h-[300px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 cursor-pointer"
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(56,189,248,0.18)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className={`h-36 rounded-2xl bg-gradient-to-br ${p.color} relative overflow-hidden`}> 
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}>
          <div className="h-full w-full" />
        </div>
      </div>
      <div className="mt-4 text-white">
        <div className="font-semibold">{p.name}</div>
        <div className="text-white/60 text-sm">${p.price}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <FlipSpecs />
        <BubbleButton onClick={() => onAdd?.(p)}>Add</BubbleButton>
      </div>
    </motion.div>
  )
}

function FlipSpecs() {
  return (
    <motion.div
      className="w-24 h-10 rounded-xl bg-white/8 border border-white/10 text-white/80 text-xs grid place-items-center [transform-style:preserve-3d]"
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
    >
      <div className="[backface-visibility:hidden]">Specs</div>
      <div className="absolute [backface-visibility:hidden] rotate-y-180">RGB • USB-C • 1ms</div>
    </motion.div>
  )
}

function BubbleButton({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="px-3 py-2 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-black font-semibold"
      whileTap={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}
