import React, { useState, useMemo } from 'react';
import { SpeedLines } from '../Effects/SpeedLines';

export interface CrewMember {
  name: string;
  alias: string;
  role: string;
  bounty: number;
  image: string;
  category: 'straw_hat' | 'worst_generation' | 'emperor' | 'warlord';
  specialty: string;
  stats: {
    haki: number;
    combat: number;
    intellect: number;
    navigation: number;
    engineering: number;
  };
}

export const WANTED_CREW: CrewMember[] = [
  { name: 'Monkey D. Luffy', alias: 'Straw Hat Luffy', role: 'Captain', bounty: 3000000000, image: '/one_piece/1.jpeg', category: 'straw_hat', specialty: 'Adaptable fighter with infinite runtime scaling, peak Conqueror-class will, and zero edge-case failures.', stats: { haki: 98, combat: 99, intellect: 40, navigation: 30, engineering: 20 } },
  { name: 'Roronoa Zoro', alias: 'Pirate Hunter', role: 'Swordsman / Vice Captain', bounty: 1111000000, image: '/one_piece/2.jpeg', category: 'straw_hat', specialty: 'Triple-threaded parallel execution, extreme fault tolerance, sub-zero latency under maximum load.', stats: { haki: 92, combat: 96, intellect: 50, navigation: 5, engineering: 20 } },
  { name: 'Nami', alias: 'Cat Burglar', role: 'Navigator', bounty: 366000000, image: '/one_piece/3.jpeg', category: 'straw_hat', specialty: 'Perfect route optimization, dynamic weather-data parsing, zero-error telemetry at sea.', stats: { haki: 30, combat: 60, intellect: 95, navigation: 99, engineering: 65 } },
  { name: 'Usopp', alias: 'God Usopp', role: 'Sniper', bounty: 500000000, image: '/one_piece/4.jpeg', category: 'straw_hat', specialty: 'Long-range observation, creative problem-solving toolkit, legendary deception & social engineering.', stats: { haki: 75, combat: 68, intellect: 88, navigation: 45, engineering: 85 } },
  { name: 'Vinsmoke Sanji', alias: 'Black Leg', role: 'Chef / Combatant', bounty: 1032000000, image: '/one_piece/5.jpeg', category: 'straw_hat', specialty: 'High-speed computation, genetically-enhanced parallel processing, multi-domain mastery.', stats: { haki: 85, combat: 94, intellect: 85, navigation: 50, engineering: 40 } },
  { name: 'Tony Tony Chopper', alias: 'Cotton Candy Lover', role: 'Doctor', bounty: 1000, image: '/one_piece/6.jpeg', category: 'straw_hat', specialty: 'Multi-modal transformation, biochemical systems hacking, comprehensive diagnostic intelligence.', stats: { haki: 15, combat: 78, intellect: 98, navigation: 40, engineering: 50 } },
  { name: 'Nico Robin', alias: 'Devil Child', role: 'Archaeologist', bounty: 930000000, image: '/one_piece/7.jpeg', category: 'straw_hat', specialty: 'Distributed cloning architecture, deep historical data retrieval, high-precision intelligence ops.', stats: { haki: 60, combat: 85, intellect: 99, navigation: 55, engineering: 30 } },
  { name: 'Franky', alias: 'Iron Man Franky', role: 'Shipwright / Cyborg', bounty: 394000000, image: '/one_piece/8.jpeg', category: 'straw_hat', specialty: 'Full-body hardware engineering, energy weapon deployment, large-scale systems architecture.', stats: { haki: 20, combat: 82, intellect: 80, navigation: 35, engineering: 98 } },
  { name: 'Brook', alias: 'Soul King', role: 'Musician / Swordsman', bounty: 383000000, image: '/one_piece/9.jpeg', category: 'straw_hat', specialty: 'Zero-overhead soul-thread execution, team morale optimization, sub-zero-latency blade operations.', stats: { haki: 50, combat: 80, intellect: 75, navigation: 40, engineering: 30 } },
  { name: 'Jinbe', alias: 'First Knight of the Sea', role: 'Helmsman', bounty: 1100000000, image: '/one_piece/10.jpeg', category: 'straw_hat', specialty: 'Fluid dynamics mastery, elite steering algorithms, armored defense-layer under high throughput.', stats: { haki: 88, combat: 92, intellect: 90, navigation: 85, engineering: 45 } },
  { name: 'Trafalgar Law', alias: 'Surgeon of Death', role: 'Alliance Captain', bounty: 3000000000, image: '/one_piece/11.jpeg', category: 'worst_generation', specialty: 'Spatial decomposition algorithms, precision surgical data manipulation, high-value strategic ops.', stats: { haki: 90, combat: 95, intellect: 96, navigation: 75, engineering: 60 } },
  { name: 'Eustass Kid', alias: 'Captain Kid', role: 'Alliance Captain', bounty: 3000000000, image: '/one_piece/12.jpeg', category: 'worst_generation', specialty: 'Electromagnetic force aggregation, railgun throughput, brute-force Conqueror-class compute power.', stats: { haki: 85, combat: 93, intellect: 78, navigation: 60, engineering: 88 } },
  { name: 'Red-Haired Shanks', alias: 'The Chief', role: 'Four Emperors', bounty: 4048900000, image: '/one_piece/13.jpeg', category: 'emperor', specialty: 'Presence-based threat neutralization, future-state observation, unmatched field-level authority.', stats: { haki: 100, combat: 100, intellect: 95, navigation: 85, engineering: 30 } },
  { name: 'Dracule Mihawk', alias: 'Hawkeye', role: 'World-Class Swordsman', bounty: 3590000000, image: '/one_piece/14.jpeg', category: 'warlord', specialty: 'Absolute precision at maximum range, perfect visual analysis, impenetrable defensive algorithms.', stats: { haki: 95, combat: 99, intellect: 88, navigation: 50, engineering: 20 } },
];

const CAT_ACC: Record<string, string> = { straw_hat: '#ffbd4a', worst_generation: '#e8000d', emperor: '#9b5fff', warlord: '#00c85a' };
const CAT_LABEL: Record<string, string> = { all: 'ALL', straw_hat: 'STRAW HATS', worst_generation: 'WORST GEN', emperor: 'EMPERORS', warlord: 'WARLORDS' };

interface BountyDeckProps {
  onRecruit?: (member: CrewMember) => void;
  recruitedIds?: string[];
  showToast: (msg: string) => void;
}

export const BountyDeck: React.FC<BountyDeckProps> = ({ onRecruit, recruitedIds = [], showToast }) => {
  const [search, setSearch]           = useState('');
  const [activeCategory, setCategory] = useState<string>('all');
  const [selected, setSelected]       = useState<CrewMember>(WANTED_CREW[0]);

  const filtered = useMemo(() =>
    WANTED_CREW.filter(m =>
      (activeCategory === 'all' || m.category === activeCategory) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
       m.alias.toLowerCase().includes(search.toLowerCase()) ||
       m.role.toLowerCase().includes(search.toLowerCase()))
    ), [search, activeCategory]
  );

  const handleRecruit = (m: CrewMember, e: React.MouseEvent) => {
    e.stopPropagation();
    if (recruitedIds.includes(m.name)) { showToast(`${m.name.toUpperCase()} IS ALREADY IN YOUR ALLIANCE`); return; }
    onRecruit?.(m);
  };

  const acc = CAT_ACC[selected.category] || '#ffbd4a';

  return (
    <div className="bd2-root" style={{ '--mg-acc': acc } as any}>
      {/* Section header */}
      <div className="sect-hdr" style={{ marginBottom: '0.5rem' }}>
        <div className="sect-ttl">GRAND LINE BOUNTY DECK</div>
        <div className="sect-id">// WANTED_POSTERS</div>
        <div className="sect-count">{filtered.length} TARGETS FOUND</div>
      </div>
      <div className="mg-diagonal-rule" style={{ '--mg-acc': acc } as any} />

      {/* Filters */}
      <div className="bd2-filters">
        <input className="bd2-search" type="text" placeholder="SEARCH CODENAME, ALIAS, ROLE…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="bd2-cats">
          {Object.keys(CAT_LABEL).map(cat => (
            <button
              key={cat}
              className={`bd2-cat-btn${activeCategory === cat ? ' bd2-cat-btn--on' : ''}`}
              style={activeCategory === cat ? { borderColor: CAT_ACC[cat] || 'rgba(255,255,255,.4)', color: CAT_ACC[cat] || 'var(--paper)', background: `${CAT_ACC[cat] || '#fff'}12` } : {}}
              onClick={() => setCategory(cat)}
            >
              {CAT_LABEL[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="bd2-layout">
        {/* ── WANTED POSTER GRID ── */}
        <div className="bd2-grid">
          {filtered.map(m => {
            const mAcc        = CAT_ACC[m.category] || '#ffbd4a';
            const isRecruited = recruitedIds.includes(m.name);
            const isSel       = selected.name === m.name;
            return (
              <div
                key={m.name}
                className={`mg-wanted mg-speed${isSel ? ' bd2-poster--sel' : ''}`}
                style={{ '--mg-acc': mAcc, ...(isSel ? { borderColor: mAcc, boxShadow: `0 0 0 2px ${mAcc}, 0 8px 32px ${mAcc}44` } : {}) } as any}
                onClick={() => setSelected(m)}
              >
                <div className="mg-wanted-hdr" style={{ background: mAcc, color: ['#ffbd4a','#b9ff00','#f9a825'].includes(mAcc) ? '#000' : '#fff' }}>
                  WANTED
                </div>
                <div className="mg-wanted-img-wrap">
                  <SpeedLines color={mAcc} density={32} opacity={isSel ? 0.09 : 0.04} origin="center" animated={isSel} />
                  <img src={m.image} alt={m.name} className="mg-wanted-img" onError={e => { e.currentTarget.src = '/one_piece/Straw Hat Pirates.jpeg'; }} />
                  {isRecruited && <div className="bd2-allied-stamp"><span>ALLIED</span></div>}
                </div>
                <div className="bd2-poster-info">
                  <div className="bd2-poster-alias" style={{ color: mAcc }}>{m.alias.toUpperCase()}</div>
                  <div className="bd2-poster-name">{m.name.split(' ').pop()}</div>
                  <div className="bd2-poster-role">{m.role}</div>
                </div>
                <div className="mg-wanted-footer">
                  <div className="mg-wanted-bounty" style={{ color: mAcc } as any}>฿{(m.bounty / 1_000_000).toFixed(0)}M—</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MANGA SPLASH SIDEBAR ── */}
        <div className="bd2-side mg-panel mg-tone" style={{ '--mg-acc': acc } as any}>
          <div className="bd2-side-portrait">
            <SpeedLines color={acc} density={48} opacity={0.09} origin="bottom-center" animated />
            <img src={selected.image} alt={selected.name} className="bd2-side-img" onError={e => { e.currentTarget.src = '/one_piece/Straw Hat Pirates.jpeg'; }} />
            <div className="bd2-side-ink" />
            <div className="bd2-side-sfx mg-sfx mg-sfx-md mg-sfx-tilt2" style={{ color: 'transparent', WebkitTextStroke: `2px ${acc}` } as any}>
              {selected.name.split(' ').pop()}
            </div>
          </div>

          <div className="mg-caption" style={{ '--mg-acc': acc, borderLeftColor: acc, width: '100%', maxWidth: '100%', boxSizing: 'border-box' } as any}>
            {selected.role.toUpperCase()}
          </div>

          <div className="mg-stat-box" style={{ '--mg-acc': acc } as any}>
            {([
              { key: 'haki',        label: 'HAKI',   color: '#e8000d' },
              { key: 'combat',      label: 'COMBAT', color: '#ff4d5e' },
              { key: 'intellect',   label: 'INTEL',  color: '#4d9fff' },
              { key: 'navigation',  label: 'NAVIG',  color: '#00c85a' },
              { key: 'engineering', label: 'ENG',    color: '#ffbd4a' },
            ] as const).map(s => (
              <div key={s.key} className="mg-stat-row">
                <span className="mg-stat-lbl">{s.label}</span>
                <div className="mg-stat-bar">
                  <div className="mg-stat-fill" style={{ width: `${selected.stats[s.key]}%`, background: s.color, boxShadow: `0 0 6px ${s.color}88` }} />
                </div>
                <span className="mg-stat-val" style={{ color: s.color }}>{selected.stats[s.key]}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '.5rem 0' }}>
            <div className="mg-xp-impact" style={{ color: acc, WebkitTextStroke: `1.5px ${acc}` } as any}>
              ฿{(selected.bounty / 1_000_000_000).toFixed(2)}B
            </div>
          </div>

          <div className="bd2-specialty">{selected.specialty}</div>

          <button
            className="bd2-recruit-btn mg-speed-h"
            style={{
              background: recruitedIds.includes(selected.name) ? 'rgba(255,255,255,.08)' : acc,
              color: recruitedIds.includes(selected.name) ? 'rgba(255,255,255,.4)' : (['#ffbd4a','#b9ff00','#f9a825'].includes(acc) ? '#000' : '#fff'),
              boxShadow: recruitedIds.includes(selected.name) ? 'none' : `0 4px 24px ${acc}44`,
            }}
            onClick={e => handleRecruit(selected, e)}
          >
            {recruitedIds.includes(selected.name) ? '◉ ACTIVE ALLIANCE MEMBER' : '+ RECRUIT TO ALLIANCE'}
          </button>
        </div>
      </div>
    </div>
  );
};
