// src/pages/Home/index.tsx — Operator selection boot screen
// Navigates to /ide with { theme, avatar } state when launched
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'

const MANGA_RAW = [
  'Guts.jpeg','Guts And Zodd, DON.jpeg','Killua.jpeg','Inumaki.jpeg',
  'Monster.jpeg','Whitebeard.jpeg','Roronoa Zoro.jpeg','Reze.jpeg',
  'Soul King Brook.jpeg','Fire Punch.jpeg','PANTHEON.jpeg','CHAOS SMILE.jpeg',
  'Corridor.jpeg','Thorfinn _ Vinland saga.jpeg','Choujin X.jpeg',
  'Denj - Chainsaw Man_.jpeg','#chainsawman.jpeg',
  'THE CONTROL DEVIL _ GRAPHIC DESIGN.jpeg','The Weeknd x Chainsaw Man.jpeg',
  'Kagurabachi X Bleach.jpeg','Kisuke Urahara [Bleach] Poster.jpeg',
  'Nelliel Brutalism.jpeg','One Piece Magazines.jpeg',
]

const OPERATORS = [
  { name: 'GHOST',   code: '0xAV001', num: '01', role: 'Signal mapping', accent: '#ff2a38' },
  { name: 'BLADE',   code: '0xAV002', num: '02', role: 'Patch runner',   accent: '#f2c12e' },
  { name: 'CIPHER',  code: '0xAV003', num: '03', role: 'Flow analyst',   accent: '#10b981' },
  { name: 'WRAITH',  code: '0xAV004', num: '04', role: 'Terminal ops',   accent: '#5ccfe6' },
  { name: 'SPECTRE', code: '0xAV005', num: '05', role: 'Vault scout',    accent: '#bb9af7' },
  { name: 'NEXUS',   code: '0xAV006', num: '06', role: 'Graph sync',     accent: '#ff8b39' },
]

const ENGINES = [
  { id: 'cyber',  num: '01', title: 'Cyber Graph',   label: 'Void workspace',   detail: 'Dark canvas · red signal · focused node work.',         accent: '#ff2a38', imageOffset: 0,  route: '/ide'       },
  { id: 'manga',  num: '02', title: 'Manga Studio',  label: 'Panel workspace',  detail: 'Panel-driven graph IDE · chapter timeline · ink nodes.', accent: '#f5c518', imageOffset: 4,  route: '/manga-ide' },
]

const enc = (f: string) => encodeURIComponent(f)

export default function Home() {
  const nav = useNavigate()
  const [avatar, setAvatar]   = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [bgIdx, setBgIdx]     = useState(0)
  const [, setTick]           = useState(0)

  // Clock tick
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // Cycle background manga art
  useEffect(() => {
    const t = setInterval(() => setBgIdx(i => (i + 1) % MANGA_RAW.length), 6500)
    return () => clearInterval(t)
  }, [])

  function launch(route: string, theme: string) {
    const chosenAvatar = avatar ?? 0
    nav(route, { state: { theme, avatar: chosenAvatar } })
  }

  const selectedIndex   = avatar ?? 0
  const selectedOp      = OPERATORS[selectedIndex]
  const locked          = avatar !== null
  const timeStr         = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const heroImage       = MANGA_RAW[(bgIdx + selectedIndex) % MANGA_RAW.length]
  const previewImages   = MANGA_RAW.slice(12, 30)

  return (
    <div className="boot-home" style={{ '--boot-accent': selectedOp.accent } as React.CSSProperties}>
      {/* ── Animated BG ── */}
      <div className="boot-bg" aria-hidden="true">
        <img key={heroImage} src={`/manga/${enc(heroImage)}`} alt="" className="boot-bg-img" />
        <div className="boot-bg-wash" />
        <div className="boot-bg-grid" />
        <div className="boot-bg-scan" />
      </div>

      {/* ── Top bar ── */}
      <header className="boot-top">
        <div className="boot-brand">
          <span>FOR</span><b>BID</b><span>EN</span>
        </div>
        <div className="boot-top-meta">
          <span>Graph IDE</span>
          <span>Operator home</span>
        </div>
        <div className="boot-top-status">
          <span className="boot-live-dot" />
          <span>{timeStr}</span>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="boot-main">
        {/* Left: copy + actions */}
        <section className="boot-copy">
          <div className="boot-kicker">
            <span>Chapter 01</span>
            <span>{locked ? 'Operator locked' : 'Default operator ready'}</span>
          </div>
          <h1 className="boot-title">
            Shape code as a living graph.
            <span>Keep every idea in motion.</span>
          </h1>
          <p className="boot-subtitle">
            A cinematic workspace for nodes, notes, terminal work, timelines,
            and the messy middle where projects actually become real.
          </p>

          <div className="boot-actions">
            <button className="boot-action-primary" onClick={() => launch('/ide', 'cyber')}>
              Launch workspace
            </button>
            <button className="boot-action-secondary" onClick={() => setAvatar((selectedIndex + 1) % OPERATORS.length)}>
              Rotate operator
            </button>
          </div>

          <div className="boot-signal-row" aria-label="Workspace status">
            <div><strong>{String(MANGA_RAW.length).padStart(2, '0')}</strong><span>Panels</span></div>
            <div><strong>02</strong><span>Engines</span></div>
            <div><strong>06</strong><span>Operators</span></div>
          </div>
        </section>

        {/* Right: Operator selection */}
        <aside className="boot-operator" aria-label="Operator selection">
          <div className="boot-portrait">
            <img
              src={`/avatars/0xAV00${selectedIndex + 1}s.jpeg`}
              alt={selectedOp.name}
            />
            <div className="boot-portrait-shade" />
            <div className="boot-portrait-caption">
              <span>{selectedOp.code}</span>
              <strong>{selectedOp.name}</strong>
              <small>{selectedOp.role}</small>
            </div>
          </div>

          <div className="boot-roster">
            {OPERATORS.map((op, i) => (
              <button
                key={op.code}
                className={`boot-operator-btn${selectedIndex === i ? ' is-active' : ''}${hovered === i ? ' is-hovered' : ''}`}
                onClick={() => setAvatar(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ '--op-accent': op.accent } as React.CSSProperties}
                aria-pressed={selectedIndex === i}
              >
                <img src={`/avatars/0xAV00${i + 1}s.jpeg`} alt="" />
                <span>{op.num}</span>
                <strong>{op.name}</strong>
              </button>
            ))}
          </div>
        </aside>
      </main>

      {/* ── Engine dock ── */}
      <section className="boot-engine-dock" aria-label="Engine selection">
        {ENGINES.map(engine => {
          const img = MANGA_RAW[(bgIdx + engine.imageOffset) % MANGA_RAW.length]
          return (
            <button
              key={engine.id}
              className={`boot-engine boot-engine-${engine.id}`}
              onClick={() => launch(engine.route, engine.id)}
              style={{ '--engine-accent': engine.accent } as React.CSSProperties}
            >
              <img src={`/manga/${enc(img)}`} alt="" />
              <span>{engine.num}</span>
              <strong>{engine.title}</strong>
              <small>{engine.label}</small>
              <em>{engine.detail}</em>
            </button>
          )
        })}
        <div className="boot-console">
          <span>Session</span>
          <strong>{selectedOp.code}</strong>
          <small>{locked ? selectedOp.name : 'Auto locks on launch'}</small>
        </div>
      </section>

      {/* ── Bottom manga strip ── */}
      <div className="boot-strip" aria-hidden="true">
        <div className="boot-strip-track">
          {[...previewImages, ...previewImages].map((img, i) => (
            <img key={`${img}-${i}`} src={`/manga/${enc(img)}`} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  )
}
