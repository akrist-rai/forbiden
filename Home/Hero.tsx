import React, { useMemo, useState, useEffect, useCallback } from 'react';
import type { Arc, Episode } from '../../types';
import { getArcCover } from '../../lib/imageMapping';
import { playSound } from '../../lib/sound';
import { GlitchText } from '../Effects/GlitchText';
import { SpeedLines } from '../Effects/SpeedLines';
import { ModeSwitch, type AppMode } from '../Common/ModeSwitch';

interface HeroProps {
  onPlay: () => void;
  onMoreInfo: () => void;
  featuredEpisode: Episode | null;
  featuredArc: Arc | null;
  totalEpisodes: number;
  totalDomains: number;
  arcCoverUrl?: string;
  onChangeCover?: (arcId: number) => void;
  arcs?: Arc[];
  onArcSelect?: (arcId: number) => void;
  arcEpisodes?: Record<number, Episode[]>;
  arcCovers?: Record<number, string>;
  navigate: (path: string) => void;
}

const TYPE_COLOR: Record<string, string> = { ctf: '#00c85a', research: '#e8000d', quiz: '#9b5fff' };

export const Hero: React.FC<HeroProps> = ({
  onPlay, onMoreInfo, featuredEpisode, featuredArc,
  totalEpisodes, totalDomains, arcCoverUrl, onChangeCover,
  arcs = [], onArcSelect, arcEpisodes = {}, arcCovers = {}, navigate,
}) => {
  const [activeArcId, setActiveArcId] = useState<number | null>(null);
  const [bgLoaded, setBgLoaded]       = useState(false);
  const [playBurst, setPlayBurst]     = useState(false);
  const [mode, setMode]               = useState<AppMode>(() => (localStorage.getItem('ephemeral_mode') as AppMode | null) ?? 'SOLO');

  const handleModeChange = (next: AppMode) => {
    setMode(next);
    localStorage.setItem('ephemeral_mode', next);
  };

  useEffect(() => { if (featuredArc) setActiveArcId(featuredArc.id); }, [featuredArc]);

  const currentArc = useMemo(() => arcs.find(a => a.id === activeArcId) || featuredArc, [arcs, activeArcId, featuredArc]);
  const episodes   = useMemo(() => currentArc ? (arcEpisodes[currentArc.id] || []) : [], [arcEpisodes, currentArc]);
  const currentEp  = useMemo(() => episodes.find(e => e.active) || episodes[0] || featuredEpisode, [episodes, featuredEpisode]);

  const acc     = currentArc?.accColor || '#e8000d';
  const bgColor = currentArc?.bgColor  || '#06060e';
  const bgUrl   = useMemo(() => currentArc ? (arcCovers[currentArc.id] || getArcCover(currentArc.id) || arcCoverUrl || '') : (arcCoverUrl || ''), [currentArc, arcCovers, arcCoverUrl]);
  const doneCount = episodes.filter(e => e.done).length;
  const pct       = episodes.length > 0 ? Math.round((doneCount / episodes.length) * 100) : 0;

  const handlePlay = useCallback(() => {
    playSound.click();
    setPlayBurst(true);
    setTimeout(() => setPlayBurst(false), 400);
    if (currentEp && currentArc) navigate(`/episode/${currentArc.id}/${currentEp.id}`);
    else onPlay();
  }, [currentEp, currentArc, navigate, onPlay]);

  const handleArcSelect = (arcId: number) => {
    playSound.click();
    setActiveArcId(arcId);
    onArcSelect?.(arcId);
  };

  const domainLabel = currentArc?.domain || 'LOADING';

  return (
    /*
     * MANGA LAYOUT:
     * The hero is a 2-column manga panel grid.
     * Left = splash panel (large, bleeds image).
     * Right = stacked smaller panels (domain SFX + episodes + arcs).
     * Gutter = 3px rgba(255,255,255,.12) — visible between panels.
     */
    <div className="xhero-root" style={{ '--mg-acc': acc } as any}>

      {/* ── BACKGROUND ── */}
      <div className="xhero-cinema">
        {bgUrl && (
          <img
            key={bgUrl}
            src={bgUrl}
            alt=""
            className={`xhero-cin-img${bgLoaded ? ' xhero-cin-img--in' : ''}`}
            onLoad={() => setBgLoaded(true)}
            onError={() => setBgLoaded(true)}
          />
        )}
        <div className="xhero-cin-grad-l" style={{ background: `linear-gradient(90deg, ${bgColor} 0%, ${bgColor}e0 35%, ${bgColor}88 65%, transparent 100%)` }} />
        <div className="xhero-cin-grad-b" style={{ background: `linear-gradient(0deg, ${bgColor} 0%, ${bgColor}cc 22%, transparent 60%)` }} />
        <div className="xhero-cin-grad-t" style={{ background: `linear-gradient(180deg, ${bgColor}bb 0%, transparent 28%)` }} />
        <div className="xhero-cin-scan" />
        {/* Screentone dot layer over bg */}
        <div className="mg-tone" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
        {/* Accent haze */}
        <div className="xhero-cin-haze" style={{ background: `radial-gradient(ellipse 55% 60% at 12% 70%, ${acc}18 0%, transparent 65%)` }} />
      </div>

      {/* ── HUD BAR ── */}
      <div className="xhero-hud-bar">
        <div className="xhero-hud-left">
          <span className="xhero-hud-brand"><em>E</em>PHEMERAL</span>
          <span className="xhero-hud-sep" />
          <span className="xhero-hud-signal">
            <span className="xhero-hud-dot" style={{ background: '#00ff41' }} />
            NETWORK ACTIVE
          </span>
        </div>
        <div className="xhero-hud-right">
          <span className="xhero-hud-stat"><span className="xhero-hud-k">EPS</span><span className="xhero-hud-v">{totalEpisodes}</span></span>
          <span className="xhero-hud-stat"><span className="xhero-hud-k">ARCS</span><span className="xhero-hud-v" style={{ color: acc }}>{totalDomains}</span></span>
          <ModeSwitch mode={mode} onChange={handleModeChange} />
          {onChangeCover && currentArc && (
            <button className="xhero-hud-btn" onClick={() => { playSound.click(); onChangeCover(currentArc.id); }}>⬡</button>
          )}
        </div>
      </div>

      {/* ── MANGA PANEL GRID ── */}
      <div className="xhero-body">

        {/* ═══ LEFT: MAIN SPLASH PANEL ═══ */}
        <div className="xhero-cmd mg-panel mg-tone-fine mg-speed mg-speed--acc" style={{ '--mg-acc': acc } as any}>
          {/* Speed lines always present on splash */}
          <SpeedLines color={acc} density={56} opacity={0.045} origin="bottom-center" />

          {/* Manga narrative caption box */}
          <div className="mg-caption mg-caption--tl" style={{ '--mg-acc': acc, borderLeftColor: acc } as any}>
            {currentArc?.arcName || 'EPHEMERAL'}<br />
            <span style={{ color: `${acc}cc` }}>EP {currentEp?.n || '—'}</span>
          </div>

          {/* Domain SFX text — the big manga impact word */}
          <div className="xhero-sfx-domain" style={{ color: `${acc}22`, WebkitTextStrokeColor: `${acc}44` } as any}>
            {domainLabel}
          </div>

          {/* Main content — bottom-anchored */}
          <div className="xhero-cmd-content">

            {/* Live badge */}
            {currentEp?.active && (
              <span className="xhero-badge-new" style={{ background: acc, color: ['#f9a825','#b9ff00','#ffbd4a'].includes(acc) ? '#000' : '#fff' }}>
                ◉ NEW
              </span>
            )}

            {/* Giant SFX title */}
            <h1 className="xhero-title mg-sfx mg-sfx-tilt" style={{ '--mg-acc': acc, color: 'var(--paper)', WebkitTextStrokeColor: 'rgba(255,255,255,.25)' } as any}>
              <GlitchText text={currentArc?.title || 'EPHEMERAL'} triggerOnHover color={acc} />
            </h1>

            {/* Episode title */}
            <div className="xhero-ep-row">
              <div className="xhero-ep-badge" style={{ background: acc, color: ['#f9a825','#b9ff00','#ffbd4a'].includes(acc) ? '#000' : '#fff' }}>
                EP {currentEp?.n || '01'}
              </div>
              <div className="xhero-ep-title" style={{ color: `${acc}cc` }}>// {currentEp?.title || '—'}</div>
            </div>

            {/* Description */}
            <p className="xhero-desc">
              {currentEp?.description ? currentEp.description.slice(0, 160) + (currentEp.description.length > 160 ? '…' : '') : 'Awaiting transmission…'}
            </p>

            {/* Progress — with episode tick marks */}
            {episodes.length > 0 && (
              <div className="xhero-prog">
                <div className="xhero-prog-info">
                  <span className="xhero-prog-lbl">SERIES PROGRESS</span>
                  <span className="xhero-prog-pct" style={{ color: acc }}>{pct}%</span>
                </div>
                <div className="xhero-prog-track">
                  <div className="xhero-prog-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${acc}, ${acc}99)`, boxShadow: `0 0 12px ${acc}55` }} />
                  <div className="xhero-prog-ticks">
                    {episodes.map((_, i) => (
                      <div key={i} className="xhero-prog-tick" style={{ left: `${((i + 1) / episodes.length) * 100}%`, background: i < doneCount ? acc : 'rgba(255,255,255,.12)' }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="xhero-ctas">
              <button
                className={`xhero-cta-play${playBurst ? ' mg-burst mg-speed' : ' mg-speed'}`}
                style={{
                  background: `linear-gradient(135deg, ${acc} 0%, ${acc}bb 100%)`,
                  color: ['#f9a825','#b9ff00','#ffbd4a'].includes(acc) ? '#000' : '#fff',
                  boxShadow: `0 6px 40px ${acc}44, 0 0 0 1px ${acc}33 inset`,
                  '--mg-acc': acc,
                } as any}
                onClick={handlePlay}
                onMouseEnter={() => playSound.hover()}
              >
                <span className="xhero-cta-play-arrow">▶</span>
                PLAY EPISODE {currentEp?.n || '01'}
              </button>
              <button
                className="xhero-cta-browse mg-speed-h"
                onClick={() => { playSound.click(); onMoreInfo(); }}
                onMouseEnter={() => playSound.hover()}
              >
                ALL SERIES
              </button>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: ARC SELECTOR PANEL ═══ */}
        <div className="xhero-arcs mg-panel" style={{ background: 'rgba(4,4,10,.82)' }}>
          <div className="xhero-arcs-label">// SERIES INDEX</div>
          <div className="xhero-arcs-list">
            {arcs.map(arc => {
              const img      = arcCovers[arc.id] || getArcCover(arc.id);
              const isActive = arc.id === activeArcId;
              const eps      = arcEpisodes[arc.id] || [];
              const done     = eps.filter(e => e.done).length;
              const arcPct   = eps.length > 0 ? Math.round((done / eps.length) * 100) : 0;
              return (
                <div
                  key={arc.id}
                  className={`xhero-arc-item mg-speed${isActive ? ' xhero-arc-item--on mg-tone-acc' : ''}`}
                  style={{ '--mg-acc': arc.accColor, ...(isActive ? { borderColor: `${arc.accColor}55`, background: `${arc.accColor}08` } : {}) } as any}
                  onClick={() => handleArcSelect(arc.id)}
                  onMouseEnter={() => { playSound.hover(); setActiveArcId(arc.id); }}
                >
                  <div className="xhero-arc-thumb mg-tone">
                    <img src={img} alt={arc.title} className="xhero-arc-thumb-img" onError={e => { e.currentTarget.style.display = 'none'; }} />
                    <div className="xhero-arc-thumb-ov" />
                    {/* Speed lines behind each thumbnail on hover */}
                    <SpeedLines color={arc.accColor} density={24} opacity={0.12} origin="center" />
                  </div>
                  <div className="xhero-arc-info">
                    <div className="xhero-arc-vol" style={{ color: arc.accColor }}>v{arc.sequence ?? arc.id}</div>
                    <div className="xhero-arc-name">{arc.title}</div>
                    <div className="xhero-arc-dom">{arc.domain}</div>
                    <div className="xhero-arc-mini-prog">
                      <div className="xhero-arc-mini-fill" style={{ width: `${arcPct}%`, background: arc.accColor }} />
                    </div>
                  </div>
                  {isActive && <div className="xhero-arc-bar" style={{ background: arc.accColor }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM EPISODE STRIP — manga panel row ── */}
      {episodes.length > 0 && (
        <div className="xhero-ep-strip mg-panel" style={{ border: 'none', borderTop: '3px solid rgba(255,255,255,.1)' }}>
          <div className="xhero-ep-strip-label">// EPISODES</div>
          <div className="xhero-ep-strip-row">
            {episodes.slice(0, 8).map(ep => {
              const isCur = ep.id === currentEp?.id;
              return (
                <div
                  key={ep.id}
                  className={`xhero-ep-chip mg-speed-h${isCur ? ' xhero-ep-chip--active' : ''}${ep.done ? ' xhero-ep-chip--done' : ''}`}
                  style={isCur ? { borderColor: acc, color: acc, '--mg-acc': acc } as any : {}}
                  onClick={() => { playSound.click(); if (currentArc) navigate(`/episode/${currentArc.id}/${ep.id}`); }}
                  onMouseEnter={() => playSound.hover()}
                >
                  <span className="xhero-ep-chip-n">{String(ep.n).padStart(2, '0')}</span>
                  <span className="xhero-ep-chip-t">{ep.title}</span>
                  {ep.done && <span className="xhero-ep-chip-done">✓</span>}
                  {ep.active && !ep.done && <span className="xhero-ep-chip-live" style={{ color: acc }}>●</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
