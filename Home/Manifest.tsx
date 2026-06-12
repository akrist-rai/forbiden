import React, { useState } from 'react';
import type { Arc } from '../../types';
import { getArcCover } from '../../lib/imageMapping';
import { playSound } from '../../lib/sound';
import { TextScramble } from '../Effects/TextScramble';
import { SpeedLines } from '../Effects/SpeedLines';

interface ManifestProps {
  arcs: Arc[];
  onShowSeries: () => void;
}

export const Manifest: React.FC<ManifestProps> = ({ arcs, onShowSeries }) => {
  const [active, setActive] = useState<number | null>(null);
  if (arcs.length === 0) return null;

  const selectedArc = arcs.find(a => a.id === active) || null;

  const handleRowClick = (arcId: number) => { playSound.click(); setActive(active === arcId ? null : arcId); };
  const handleRowHover = (arcId: number) => { playSound.hover(); setActive(arcId); };

  return (
    <div className="mf-sect">
      {/* Section header with manga diagonal rule */}
      <div className="sect-hdr">
        <div className="sect-ttl">SERIES MANIFEST</div>
        <div className="sect-id">// DOMAIN_INDEX</div>
        <div className="sect-count">{String(arcs.length).padStart(2, '0')} ACTIVE DOMAINS</div>
        <div className="sect-more" onClick={() => { playSound.click(); onShowSeries(); }}>BROWSE ALL →</div>
      </div>
      <div className="mg-diagonal-rule" style={{ '--mg-acc': selectedArc?.accColor || '#e8000d' } as any} />

      {/*
       * MANGA GRID LAYOUT:
       * The manifest becomes a manga panel mosaic.
       * Each arc = one bordered panel with screentone + speed lines on hover.
       * Active arc = 2× wide "splash" panel.
       */}
      <div className="mf-manga-grid">
        {arcs.map(arc => {
          const img      = getArcCover(arc.id);
          const isActive = active === arc.id;
          return (
            <div
              key={arc.id}
              className={`mf-manga-cell mg-panel mg-tone mg-speed${isActive ? ' mf-manga-cell--on mg-speed--acc' : ''}`}
              style={{ '--mg-acc': arc.accColor, ...(isActive ? { borderColor: arc.accColor, gridColumn: 'span 2' } : {}) } as any}
              onClick={() => handleRowClick(arc.id)}
              onMouseEnter={() => handleRowHover(arc.id)}
            >
              {/* Cover image */}
              <img src={img} alt={arc.title} className="mf-manga-img"
                onError={e => { e.currentTarget.style.display = 'none'; }} />

              {/* Screentone gradient overlay */}
              <div className="mf-manga-grad"
                style={{ background: `linear-gradient(0deg, ${arc.bgColor || '#06060e'}f5 0%, ${arc.bgColor || '#06060e'}66 50%, transparent 100%)` }} />

              {/* Speed lines — always present, opacity driven by hover */}
              <SpeedLines color={arc.accColor} density={36} opacity={isActive ? 0.08 : 0.04} origin="center" />

              {/* Narrative caption box */}
              {isActive && (
                <div className="mg-caption mg-caption--tl" style={{ '--mg-acc': arc.accColor, borderLeftColor: arc.accColor } as any}>
                  {arc.domain}<br />
                  <span style={{ color: arc.accColor }}>v{arc.sequence ?? arc.id}</span>
                </div>
              )}

              {/* Content block */}
              <div className="mf-manga-body">
                {/* SFX volume label */}
                <div className="mf-manga-vol mg-sfx mg-sfx-xs mg-sfx-tilt" style={{ color: arc.accColor, WebkitTextStrokeColor: arc.accColor } as any}>
                  VOL.{String(arc.id).padStart(2, '0')}
                </div>

                {/* Title */}
                <div className="mf-manga-title">
                  {isActive
                    ? <TextScramble text={arc.title} triggerOnHover speed={30} />
                    : arc.title
                  }
                </div>

                {/* Domain pill */}
                <div className="mf-manga-domain" style={{ color: `${arc.accColor}bb` }}>{arc.domain}</div>

                {/* Progress bar */}
                <div className="mf-manga-prog">
                  <div className="mf-manga-prog-fill" style={{ width: arc.progressWidth || '0%', background: arc.accColor }} />
                </div>

                {/* Active: show enter button */}
                {isActive && (
                  <button
                    className="mf-manga-btn mg-speed-h"
                    style={{ borderColor: arc.accColor, color: arc.accColor }}
                    onClick={e => { e.stopPropagation(); playSound.click(); onShowSeries(); }}
                    onMouseEnter={() => playSound.hover()}
                  >
                    ENTER SERIES →
                  </button>
                )}
              </div>

              {/* HUD crop marks */}
              <div className="hc sm tl" style={{ borderColor: arc.accColor }} />
              <div className="hc sm br" style={{ borderColor: arc.accColor }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
