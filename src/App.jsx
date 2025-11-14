import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import InfinityCarousel from './components/InfinityCarousel'
import Filters from './components/Filters'
import Checkout from './components/Checkout'
import ChatAssistant from './components/ChatAssistant'
import MobileNav from './components/MobileNav'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (item) => setCart((c) => [...c, item])

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <BackgroundDecor />
      <Header cartCount={cart.length} />
      <Hero onCTAClick={() => {
        const el = document.getElementById('carousel')
        el?.scrollIntoView({ behavior: 'smooth' })
      }} />

      <div className="py-10 space-y-10">
        <Filters onChange={() => {}} />
        <div id="carousel">
          <InfinityCarousel onAdd={addToCart} />
        </div>
        <Checkout />
      </div>

      <ChatAssistant />
      <MobileNav />
    </div>
  )
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent)]" />
      <motion.div
        className="pointer-events-none fixed inset-0"
        animate={{ boxShadow: ['0 0 120px 30px rgba(168,85,247,0.05) inset','0 0 120px 30px rgba(56,189,248,0.05) inset'] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="fixed inset-0 opacity-[0.08]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
    </>
  )
}

export default App
