import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

export default function Filters({ onChange }) {
  const [open, setOpen] = useState(true)
  const [state, setState] = useState({ rgb: true, wireless: false, price: 'all' })

  const toggle = () => setOpen((v) => !v)

  const update = (patch) => {
    const next = { ...state, ...patch }
    setState(next)
    onChange?.(next)
  }

  return (
    <aside className="mx-auto max-w-7xl px-4">
      <button
        onClick={toggle}
        className="flex items-center gap-2 text-white/80 hover:text-white mb-3"
      >
        <SlidersHorizontal size={18} /> Filters
        <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={16} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 grid md:grid-cols-3 gap-4"
          >
            <Toggle
              label="RGB Glow"
              active={state.rgb}
              onChange={(v) => update({ rgb: v })}
            />
            <Toggle
              label="Wireless"
              active={state.wireless}
              onChange={(v) => update({ wireless: v })}
            />
            <Select
              label="Price"
              value={state.price}
              onChange={(v) => update({ price: v })}
              options={[
                { label: 'All', value: 'all' },
                { label: '< $60', value: 'lt60' },
                { label: '$60 - $100', value: '60-100' },
                { label: '$100+', value: 'gt100' },
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}

function Toggle({ label, active, onChange }) {
  return (
    <button
      onClick={() => onChange(!active)}
      className={`flex items-center justify-between rounded-xl px-4 py-3 border border-white/10 bg-white/5 text-white/80 hover:text-white ${active ? 'shadow-[0_0_0_2px_rgba(167,139,250,0.35)_inset]' : ''}`}
    >
      <span>{label}</span>
      <motion.span
        className="relative h-6 w-12 rounded-full bg-white/10"
        animate={{ backgroundColor: active ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.06)' }}
      >
        <motion.span
          layout
          className="absolute top-1 left-1 h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-300"
          animate={{ x: active ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        />
      </motion.span>
    </button>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex items-center justify-between rounded-xl px-4 py-3 border border-white/10 bg-white/5 text-white/80">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-slate-900">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
