// @ts-nocheck
import './ide.css'
import './manga.css'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'


    

    const CYBER_AVATARS = [
      ({ size = 48, accent = '#10b981' }) => (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" fill="#010d07"/>
          <circle cx="24" cy="24" r="21" stroke={accent} strokeWidth="0.35" opacity="0.2"/>
          {[15,35,55,75,95,115,135,155,175,195,215,235,255,275,295,315,335].map(a=>(
            <line key={a} x1="24" y1="6" x2="24" y2="9" stroke={accent} strokeWidth="0.8" opacity="0.35" transform={`rotate(${a} 24 24)`}/>
          ))}
          <path d="M 21.5 7.5 A 16.5 16.5 0 1 1 26.5 7.5" stroke={accent} strokeWidth="4.8" strokeLinecap="butt"/>
          <path d="M 21.5 7.5 A 16.5 16.5 0 1 1 26.5 7.5" stroke="#010d07" strokeWidth="1.5" strokeLinecap="butt" strokeDasharray="3.5 3.5" opacity="0.55"/>
          <path d="M 21.5 7.5 L 17 4 L 20 6.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 26.5 7.5 L 31 3.5 L 35.5 6 L 33 11 L 26.5 7.5" fill={accent} stroke={accent} strokeWidth="0.5"/>
          <circle cx="31.5" cy="5.5" r="1" fill="#010d07"/><circle cx="31.5" cy="5.5" r="0.45" fill={accent} opacity="0.5"/>
          <path d="M 35.5 6.5 L 39 4.5 M 35.5 6.5 L 39 8.5" stroke={accent} strokeWidth="0.75" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="6.5" stroke={accent} strokeWidth="0.7" opacity="0.3"/>
          <circle cx="24" cy="24" r="2.2" fill={accent} opacity="0.6"/>
          <line x1="24" y1="17" x2="24" y2="31" stroke={accent} strokeWidth="0.45" opacity="0.2"/>
          <line x1="17" y1="24" x2="31" y2="24" stroke={accent} strokeWidth="0.45" opacity="0.2"/>
        </svg>
      ),
      ({ size = 48, accent = '#ff435a' }) => (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" fill="#0d0002"/>
          <circle cx="24" cy="24" r="21" stroke={accent} strokeWidth="0.5" opacity="0.2"/>
          <circle cx="24" cy="24" r="2.5" fill={accent} opacity="0.8"/>
          {[0, 120, 240].map(rot => (
            <g key={rot} transform={`rotate(${rot} 24 24)`}>
              <path d="M 24 24 C 28 22 32 18 30 13 C 28 8 22 7 18 10 C 14 13 13 18 15 22" stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            </g>
          ))}
          {[90, 210, 330].map(a => (
            <line key={a} x1={24+18.5*Math.cos(a*Math.PI/180)} y1={24+18.5*Math.sin(a*Math.PI/180)} x2={24+21*Math.cos(a*Math.PI/180)} y2={24+21*Math.sin(a*Math.PI/180)} stroke={accent} strokeWidth="1.2" opacity="0.45"/>
          ))}
        </svg>
      ),
      ({ size = 48, accent = '#ffc410' }) => (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" fill="#0b0700"/>
          <circle cx="24" cy="24" r="21" stroke={accent} strokeWidth="0.4" opacity="0.2"/>
          <circle cx="24" cy="24" r="3.5" stroke={accent} strokeWidth="1.3" opacity="0.9"/>
          <circle cx="24" cy="24" r="1.4" fill={accent} opacity="0.85"/>
          {[0,45,90,135,180,225,270,315].map(angle => (
            <g key={angle} transform={`rotate(${angle} 24 24)`}>
              <line x1="24" y1="20.5" x2="24" y2="5.5" stroke={accent} strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="20" cy="5" r="1" fill={accent} opacity="0.8"/>
              <circle cx="28" cy="5" r="1" fill={accent} opacity="0.8"/>
            </g>
          ))}
        </svg>
      ),
      ({ size = 48, accent = '#4285f4' }) => (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" fill="#00040f"/>
          <circle cx="24" cy="24" r="21.5" stroke={accent} strokeWidth="0.5" opacity="0.2"/>
          <path d="M 10 18 Q 14 18 16 16 Q 18 14 18 10" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 30 10 Q 30 14 32 16 Q 34 18 38 18" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 38 30 Q 34 30 32 32 Q 30 34 30 38" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 18 38 Q 18 34 16 32 Q 14 30 10 30" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 10 18 Q 10 24 10 30" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 38 18 Q 38 24 38 30" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 18 10 Q 24 10 30 10" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 18 38 Q 24 38 30 38" stroke={accent} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="3" stroke={accent} strokeWidth="1" opacity="0.6" fill="none"/>
          <circle cx="24" cy="24" r="1.2" fill={accent} opacity="0.8"/>
        </svg>
      ),
      ({ size = 48, accent = '#28f1c3' }) => (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" fill="#000f0c"/>
          <circle cx="24" cy="24" r="21" stroke={accent} strokeWidth="0.4" opacity="0.18"/>
          <line x1="10" y1="34.5" x2="38" y2="34.5" stroke={accent} strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
          <path d="M 17 34 A 9 9 0 0 1 31 34 A 9 9 0 0 1 24 21 A 9 9 0 0 1 17 34 Z" stroke={accent} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
          <circle cx="24" cy="24" r="1.5" fill={accent} opacity="0.85"/>
        </svg>
      ),
      ({ size = 48, accent = '#ff1650' }) => {
        const hexPts = Array.from({length:6},(_,i)=>{ const a=(i*60-30)*Math.PI/180; return[+(24+15*Math.cos(a)).toFixed(2),+(24+15*Math.sin(a)).toFixed(2)]; });
        return (
          <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" fill="#0f0003"/>
            <polygon points={hexPts.map(p=>p.join(',')).join(' ')} stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.06"/>
            {hexPts.map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="7.5" stroke={accent} strokeWidth="1" fill="none" opacity="0.55"/>))}
            <circle cx="24" cy="24" r="1.8" fill={accent} opacity="0.9"/>
          </svg>
        );
      },
    ];

    const AVATAR_ACCENTS = ['#10b981','#ff435a','#ffc410','#4285f4','#28f1c3','#ff1650','#bb9af7','#5ccfe6','#ffbd5e','#e36209','#72f1b8','#ff8080','#89ddff','#e5c07b','#4ec9b0','#c792ea'];
    const AVATAR_NAMES = ['OUROBOROS', 'TRISKELION', 'HELM OF AWE', 'CELTIC KNOT', 'TRIQUETRA', 'HEXAGON'];

    const CyberAvatar = ({ index, size = 48, selected = false, onClick }) => {
      const AvatarSVG = CYBER_AVATARS[index % CYBER_AVATARS.length];
      const accent = AVATAR_ACCENTS[index % AVATAR_ACCENTS.length];
      return (
        <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: size, height: size, border: selected ? `2px solid ${accent}` : '2px solid rgba(255,255,255,0.08)', boxShadow: selected ? `0 0 16px ${accent}44` : 'none', transition: 'all 0.2s ease', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
            <AvatarSVG size={size} accent={accent} />
          </div>
          {selected && <div style={{ fontSize: '8px', color: accent, letterSpacing: '1px', fontFamily: "'JetBrains Mono',monospace" }}>{AVATAR_NAMES[index]}</div>}
        </div>
      );
    };

    const I = {
      Files: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
      Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
      Git: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 9v12"/><path d="M18 15v-2a3 3 0 0 0-3-3H9"/></svg>,
      Terminal: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
      Timeline: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
      Message: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      Note: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
      Board: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
      FileIcon: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
      Copy: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
      Wrap: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
      Format: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>,
      Find: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
      Diff: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
      Cmd: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>,
      Plus: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
      Zap: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    };

    function highlightCode(code) {
      const PY_KW = /\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|pass|break|continue|try|except|finally|with|as|yield|lambda|self|print|raise|del|global|nonlocal|assert|async|await)\b/g;
      const JS_KW = /\b(function|const|let|var|return|if|else|for|while|in|of|class|import|export|from|default|new|this|true|false|null|undefined|try|catch|finally|async|await|typeof|instanceof|break|continue|switch|case|throw)\b/g;
      const BUILTINS = /\b(len|range|print|type|str|int|float|list|dict|set|tuple|map|filter|zip|enumerate|open|super|object|bool|abs|max|min|sum|sorted|reversed|console|Math|JSON|Array|Object|Promise|setTimeout|parseInt|parseFloat)\b/g;
      const STRINGS = /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/g;
      const COMMENTS = /(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
      const NUMBERS = /\b(\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g;
      const FUNCS = /\b([a-zA-Z_]\w*)\s*(?=\()/g;
      let html = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const stored = [];
      const PH = '\x00', PE = '\x01';
      html = html.replace(COMMENTS, m => { stored.push(`<span class="syn-comment">${m}</span>`); return PH+(stored.length-1)+PE; });
      html = html.replace(STRINGS, m => { stored.push(`<span class="syn-string">${m}</span>`); return PH+(stored.length-1)+PE; });
      html = html.replace(FUNCS, (m,fn) => { stored.push(`<span class="syn-function">${fn}</span>`); return PH+(stored.length-1)+PE+'('; });
      html = html.replace(PY_KW, '<span class="syn-keyword">$&</span>');
      html = html.replace(JS_KW, '<span class="syn-keyword">$&</span>');
      html = html.replace(BUILTINS, '<span class="syn-builtin">$&</span>');
      html = html.replace(NUMBERS, '<span class="syn-number">$&</span>');
      html = html.replace(/\x00(\d+)\x01/g, (_, i) => stored[parseInt(i)]);
      return html;
    }

    const PALETTES = [
      // ── DARK THEMES ──
      { id:'forbinden',  name:'FORBINDEN',    bg:'#0b0b0f', base:'#c0c8d8', lineNum:'#2e2e42', activeLine:'rgba(255,255,255,0.035)', kw:'#ff435a', str:'#ffc410', cmt:'#3e3e5a', num:'#4285f4', fn:'#10b981', bi:'#28f1c3', op:'#6a6a8a', swatches:['#ff435a','#ffc410','#10b981','#28f1c3'] },
      { id:'dracula',    name:'DRACULA',       bg:'#282a36', base:'#f8f8f2', lineNum:'#44475a', activeLine:'rgba(68,71,90,0.4)',     kw:'#ff79c6', str:'#f1fa8c', cmt:'#6272a4', num:'#bd93f9', fn:'#50fa7b', bi:'#8be9fd', op:'#ff79c6', swatches:['#ff79c6','#f1fa8c','#50fa7b','#8be9fd'] },
      { id:'monokai',    name:'MONOKAI',       bg:'#272822', base:'#f8f8f2', lineNum:'#3e3d32', activeLine:'rgba(73,72,62,0.4)',     kw:'#f92672', str:'#e6db74', cmt:'#75715e', num:'#ae81ff', fn:'#a6e22e', bi:'#66d9e8', op:'#f92672', swatches:['#f92672','#e6db74','#a6e22e','#ae81ff'] },
      { id:'nord',       name:'NORD',          bg:'#2e3440', base:'#d8dee9', lineNum:'#3b4252', activeLine:'rgba(67,76,94,0.4)',     kw:'#81a1c1', str:'#a3be8c', cmt:'#4c566a', num:'#b48ead', fn:'#88c0d0', bi:'#8fbcbb', op:'#81a1c1', swatches:['#81a1c1','#a3be8c','#88c0d0','#b48ead'] },
      { id:'tokyo',      name:'TOKYO NIGHT',   bg:'#1a1b2e', base:'#a9b1d6', lineNum:'#2a2b3d', activeLine:'rgba(42,43,61,0.5)',     kw:'#bb9af7', str:'#9ece6a', cmt:'#3b4261', num:'#ff9e64', fn:'#7dcfff', bi:'#2ac3de', op:'#c0caf5', swatches:['#bb9af7','#9ece6a','#7dcfff','#ff9e64'] },
      { id:'gruvbox',    name:'GRUVBOX',       bg:'#282828', base:'#ebdbb2', lineNum:'#3c3836', activeLine:'rgba(60,56,54,0.5)',     kw:'#fb4934', str:'#b8bb26', cmt:'#665c54', num:'#d3869b', fn:'#fabd2f', bi:'#8ec07c', op:'#fe8019', swatches:['#fb4934','#b8bb26','#fabd2f','#8ec07c'] },
      { id:'onedark',    name:'ONE DARK',      bg:'#282c34', base:'#abb2bf', lineNum:'#3b4048', activeLine:'rgba(40,44,52,0.6)',     kw:'#c678dd', str:'#98c379', cmt:'#5c6370', num:'#d19a66', fn:'#61afef', bi:'#56b6c2', op:'#e06c75', swatches:['#c678dd','#98c379','#61afef','#d19a66'] },
      { id:'solarized',  name:'SOLARIZED',     bg:'#002b36', base:'#839496', lineNum:'#073642', activeLine:'rgba(7,54,66,0.6)',      kw:'#859900', str:'#2aa198', cmt:'#586e75', num:'#d33682', fn:'#268bd2', bi:'#cb4b16', op:'#657b83', swatches:['#859900','#2aa198','#268bd2','#d33682'] },
      { id:'nightowl',   name:'NIGHT OWL',     bg:'#011627', base:'#d6deeb', lineNum:'#1d3b53', activeLine:'rgba(1,56,95,0.45)',     kw:'#c792ea', str:'#addb67', cmt:'#637777', num:'#f78c6c', fn:'#82aaff', bi:'#7fdbca', op:'#c792ea', swatches:['#c792ea','#addb67','#82aaff','#7fdbca'] },
      { id:'ayu',        name:'AYU MIRAGE',    bg:'#1f2430', base:'#cccac2', lineNum:'#2d3443', activeLine:'rgba(45,52,67,0.5)',     kw:'#ffa759', str:'#bae67e', cmt:'#5c6773', num:'#ffcc66', fn:'#5ccfe6', bi:'#73d0ff', op:'#f29e74', swatches:['#ffa759','#bae67e','#5ccfe6','#ffcc66'] },
      { id:'catppuccin', name:'CATPPUCCIN',    bg:'#1e1e2e', base:'#cdd6f4', lineNum:'#313244', activeLine:'rgba(49,50,68,0.5)',     kw:'#cba6f7', str:'#a6e3a1', cmt:'#585b70', num:'#fab387', fn:'#89b4fa', bi:'#94e2d5', op:'#f38ba8', swatches:['#cba6f7','#a6e3a1','#89b4fa','#fab387'] },
      { id:'rosepine',   name:'ROSÉ PINE',     bg:'#191724', base:'#e0def4', lineNum:'#26233a', activeLine:'rgba(38,35,58,0.5)',     kw:'#c4a7e7', str:'#f6c177', cmt:'#6e6a86', num:'#ebbcba', fn:'#9ccfd8', bi:'#31748f', op:'#eb6f92', swatches:['#c4a7e7','#f6c177','#9ccfd8','#eb6f92'] },
      { id:'poimandres', name:'POIMANDRES',    bg:'#1b1e28', base:'#a6accd', lineNum:'#252834', activeLine:'rgba(37,40,52,0.5)',     kw:'#5de4c7', str:'#5fb3a1', cmt:'#3d4066', num:'#d0679d', fn:'#e4f0fb', bi:'#89ddff', op:'#add7ff', swatches:['#5de4c7','#d0679d','#e4f0fb','#89ddff'] },
      { id:'kanagawa',   name:'KANAGAWA',      bg:'#1f1f28', base:'#dcd7ba', lineNum:'#2a2a37', activeLine:'rgba(42,42,55,0.5)',     kw:'#957fb8', str:'#98bb6c', cmt:'#727169', num:'#d27e99', fn:'#7e9cd8', bi:'#6a9589', op:'#c0a36e', swatches:['#957fb8','#98bb6c','#7e9cd8','#c0a36e'] },
      { id:'vesper',     name:'VESPER',        bg:'#101010', base:'#c2c2c2', lineNum:'#1e1e1e', activeLine:'rgba(30,30,30,0.6)',     kw:'#ff8080', str:'#99ffe4', cmt:'#404040', num:'#ffbd5e', fn:'#b8a4ff', bi:'#5ef1ff', op:'#ff6e6e', swatches:['#ff8080','#99ffe4','#b8a4ff','#ffbd5e'] },
      { id:'everforest', name:'EVERFOREST',    bg:'#272e33', base:'#d3c6aa', lineNum:'#333c43', activeLine:'rgba(51,60,67,0.5)',     kw:'#e67e80', str:'#a7c080', cmt:'#5b6770', num:'#dbbc7f', fn:'#7fbbb3', bi:'#83c092', op:'#d699b6', swatches:['#e67e80','#a7c080','#7fbbb3','#dbbc7f'] },
      { id:'oxocarbon',  name:'OXOCARBON',     bg:'#161616', base:'#f2f4f8', lineNum:'#262626', activeLine:'rgba(38,38,38,0.55)',    kw:'#ff7eb6', str:'#42be65', cmt:'#393939', num:'#82cfff', fn:'#ee5396', bi:'#3ddbd9', op:'#be95ff', swatches:['#ff7eb6','#42be65','#ee5396','#82cfff'] },
      { id:'palenight',  name:'PALENIGHT',     bg:'#292d3e', base:'#a6accd', lineNum:'#32374d', activeLine:'rgba(50,55,77,0.5)',     kw:'#c792ea', str:'#c3e88d', cmt:'#676e95', num:'#f07178', fn:'#82aaff', bi:'#89ddff', op:'#ffcb6b', swatches:['#c792ea','#c3e88d','#82aaff','#f07178'] },
      { id:'synthwave',  name:'SYNTHWAVE 84',  bg:'#262335', base:'#ffffff', lineNum:'#34294f', activeLine:'rgba(52,41,79,0.5)',     kw:'#ff7edb', str:'#ff8b39', cmt:'#848bbd', num:'#f97e72', fn:'#36f9f6', bi:'#72f1b8', op:'#fe4450', swatches:['#ff7edb','#36f9f6','#72f1b8','#fe4450'] },
      { id:'moonlight',  name:'MOONLIGHT',     bg:'#212337', base:'#c8d3f5', lineNum:'#2f334d', activeLine:'rgba(47,51,77,0.5)',     kw:'#ff98a4', str:'#c3e88d', cmt:'#444a73', num:'#ff995e', fn:'#82aaff', bi:'#b4f9f8', op:'#c099ff', swatches:['#ff98a4','#c3e88d','#82aaff','#c099ff'] },
      // ── LIGHT THEMES ──
      { id:'github',     name:'GITHUB LIGHT',  bg:'#ffffff', base:'#24292e', lineNum:'#e1e4e8', activeLine:'rgba(225,228,232,0.5)', kw:'#d73a49', str:'#032f62', cmt:'#6a737d', num:'#005cc5', fn:'#6f42c1', bi:'#e36209', op:'#d73a49', swatches:['#d73a49','#032f62','#6f42c1','#005cc5'] },
      { id:'gruvlight',  name:'GRUVBOX LIGHT', bg:'#fbf1c7', base:'#3c3836', lineNum:'#d5c4a1', activeLine:'rgba(213,196,161,0.5)', kw:'#9d0006', str:'#79740e', cmt:'#928374', num:'#8f3f71', fn:'#b57614', bi:'#076678', op:'#af3a03', swatches:['#9d0006','#79740e','#b57614','#076678'] },
      { id:'papercolor', name:'PAPERCOLOR',    bg:'#eeeeee', base:'#444444', lineNum:'#d0d0d0', activeLine:'rgba(208,208,208,0.5)', kw:'#005f87', str:'#718c00', cmt:'#a8a8a8', num:'#8700af', fn:'#d75f00', bi:'#0087af', op:'#d70000', swatches:['#005f87','#718c00','#d75f00','#8700af'] },
      { id:'flexoki',    name:'FLEXOKI',       bg:'#fffcf0', base:'#100f0f', lineNum:'#e6e4d9', activeLine:'rgba(230,228,217,0.5)', kw:'#af3029', str:'#66800b', cmt:'#b7b5ac', num:'#8b7ec8', fn:'#205ea6', bi:'#24837b', op:'#bc5215', swatches:['#af3029','#66800b','#205ea6','#24837b'] },
    ];

    const TERM_PALETTES = [
      { id:'matrix',    name:'MATRIX',       bg:'#020c02', text:'#00ff41', prompt:'#00cc33', dim:'#005c17', error:'#ff435a', warn:'#ffc410', info:'#00ff41', border:'#005c17', cursor:'#00ff41', selection:'rgba(0,255,65,0.2)' },
      { id:'forbinden', name:'FORBINDEN',     bg:'#080810', text:'#c0c8d8', prompt:'#10b981', dim:'#3e3e5a', error:'#ff435a', warn:'#ffc410', info:'#28f1c3', border:'#1a1a2c', cursor:'#10b981', selection:'rgba(16,185,129,0.15)' },
      { id:'dracula',   name:'DRACULA',       bg:'#282a36', text:'#f8f8f2', prompt:'#50fa7b', dim:'#6272a4', error:'#ff5555', warn:'#f1fa8c', info:'#8be9fd', border:'#44475a', cursor:'#f8f8f2', selection:'rgba(68,71,90,0.5)' },
      { id:'tokyo',     name:'TOKYO NIGHT',   bg:'#1a1b2e', text:'#a9b1d6', prompt:'#7dcfff', dim:'#3b4261', error:'#f7768e', warn:'#ff9e64', info:'#2ac3de', border:'#2a2b3d', cursor:'#7dcfff', selection:'rgba(42,43,61,0.6)' },
      { id:'nord',      name:'NORD',          bg:'#2e3440', text:'#d8dee9', prompt:'#88c0d0', dim:'#4c566a', error:'#bf616a', warn:'#ebcb8b', info:'#81a1c1', border:'#3b4252', cursor:'#88c0d0', selection:'rgba(67,76,94,0.5)' },
      { id:'synthwave', name:'SYNTHWAVE',     bg:'#1a1030', text:'#ff7edb', prompt:'#36f9f6', dim:'#5c5080', error:'#fe4450', warn:'#ff8b39', info:'#72f1b8', border:'#34294f', cursor:'#36f9f6', selection:'rgba(54,249,246,0.1)' },
      { id:'gruvbox',   name:'GRUVBOX',       bg:'#1d2021', text:'#ebdbb2', prompt:'#fabd2f', dim:'#504945', error:'#cc241d', warn:'#d79921', info:'#689d6a', border:'#3c3836', cursor:'#fabd2f', selection:'rgba(250,189,47,0.12)' },
      { id:'catppuccin',name:'CATPPUCCIN',    bg:'#1e1e2e', text:'#cdd6f4', prompt:'#a6e3a1', dim:'#585b70', error:'#f38ba8', warn:'#fab387', info:'#89dceb', border:'#313244', cursor:'#a6e3a1', selection:'rgba(166,227,161,0.1)' },
      { id:'kanagawa',  name:'KANAGAWA',      bg:'#1f1f28', text:'#dcd7ba', prompt:'#7e9cd8', dim:'#727169', error:'#e82424', warn:'#ff9e3b', info:'#6a9589', border:'#2a2a37', cursor:'#7e9cd8', selection:'rgba(126,156,216,0.12)' },
      { id:'rosepine',  name:'ROSÉ PINE',     bg:'#191724', text:'#e0def4', prompt:'#9ccfd8', dim:'#6e6a86', error:'#eb6f92', warn:'#f6c177', info:'#31748f', border:'#26233a', cursor:'#9ccfd8', selection:'rgba(156,207,216,0.1)' },
      { id:'hacker',    name:'HACKER',        bg:'#000000', text:'#39ff14', prompt:'#39ff14', dim:'#1a5c09', error:'#ff073a', warn:'#ffe600', info:'#00ffff', border:'#0d3305', cursor:'#39ff14', selection:'rgba(57,255,20,0.15)' },
      { id:'amber',     name:'AMBER',         bg:'#0d0800', text:'#ffb000', prompt:'#ffd700', dim:'#5c3d00', error:'#ff4500', warn:'#ffc400', info:'#ffb000', border:'#2a1a00', cursor:'#ffd700', selection:'rgba(255,176,0,0.15)' },
      { id:'iceberg',   name:'ICEBERG',       bg:'#161821', text:'#c6c8d1', prompt:'#84a0c6', dim:'#444b71', error:'#e27878', warn:'#e2a478', info:'#89b8c2', border:'#2c2f45', cursor:'#84a0c6', selection:'rgba(132,160,198,0.15)' },
      { id:'monokai',   name:'MONOKAI',       bg:'#272822', text:'#f8f8f2', prompt:'#a6e22e', dim:'#75715e', error:'#f92672', warn:'#e6db74', info:'#66d9e8', border:'#3e3d32', cursor:'#a6e22e', selection:'rgba(166,226,46,0.1)' },
      { id:'classic',   name:'CLASSIC',       bg:'#0c0c0c', text:'#cccccc', prompt:'#ffffff', dim:'#666666', error:'#c50f1f', warn:'#c19c00', info:'#3b78ff', border:'#333333', cursor:'#ffffff', selection:'rgba(255,255,255,0.1)' },
      { id:'solarized', name:'SOLARIZED',     bg:'#002b36', text:'#839496', prompt:'#268bd2', dim:'#586e75', error:'#dc322f', warn:'#b58900', info:'#2aa198', border:'#073642', cursor:'#268bd2', selection:'rgba(38,139,210,0.1)' },
    ];

    function CodeEditor({ node, onChange, externalPalette }) {
      const [palette, setPalette] = useState(PALETTES[0]);
      // When externalPalette changes, sync local state
      useEffect(() => { if (externalPalette) setPalette(externalPalette); }, [externalPalette?.id]);
      const [showPaletteMenu, setShowPaletteMenu] = useState(false);
      const [showFind, setShowFind] = useState(false);
      const [showDiff, setShowDiff] = useState(false);
      const [findQuery, setFindQuery] = useState('');
      const [replaceQuery, setReplaceQuery] = useState('');
      const [wordWrap, setWordWrap] = useState(false);
      const [cursor, setCursor] = useState({ line: 1, col: 1 });
      const [toastMsg, setToastMsg] = useState('');
      const [fontSize, setFontSize] = useState(13);
      const [minimap, setMinimap] = useState(true);
      const textareaRef = useRef(null);
      const lineNumRef = useRef(null);
      const overlayRef = useRef(null);
      const code = node.code || '';
      const lines = code.split('\n');
      const lineCount = lines.length;

      const showToast = (msg) => { setToastMsg(''); setTimeout(() => setToastMsg(msg), 10); setTimeout(() => setToastMsg(''), 1800); };
      const handleScroll = () => {
        if (lineNumRef.current && textareaRef.current) lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
        if (overlayRef.current && textareaRef.current) overlayRef.current.style.transform = `translateY(-${textareaRef.current.scrollTop}px)`;
      };
      const handleKeyDown = (e) => {
        if (e.key === 'Tab') { e.preventDefault(); const s = e.target.selectionStart, en = e.target.selectionEnd; const nCode = code.substring(0, s) + '  ' + code.substring(en); onChange(nCode); setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; }, 0); }
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') { e.preventDefault(); setShowFind(v => !v); }
        if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); toggleLineComment(); }
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') { e.preventDefault(); setShowDiff(v => !v); }
      };
      const handleCursorUpdate = (e) => {
        const ta = e.target, before = code.substring(0, ta.selectionStart);
        const nl = (before.match(/\n/g) || []).length + 1;
        setCursor({ line: nl, col: ta.selectionStart - before.lastIndexOf('\n') });
      };
      useEffect(() => { if (!showPaletteMenu) return; const h = () => setShowPaletteMenu(false); document.addEventListener('pointerdown', h); return () => document.removeEventListener('pointerdown', h); }, [showPaletteMenu]);
      const handleCopy = () => { navigator.clipboard.writeText(code).catch(() => {}); showToast('COPIED'); };
      const handleFormat = () => { const formatted = code.split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n{3,}/g, '\n\n'); onChange(formatted); showToast('FORMATTED'); };
      const handleFindReplace = () => { if (!findQuery) return; const count = (code.split(findQuery).length - 1); onChange(code.split(findQuery).join(replaceQuery)); showToast(`REPLACED ${count} INSTANCES`); };
      const toggleLineComment = () => {
        const ta = textareaRef.current; const before = code.substring(0, ta.selectionStart); const lineStart = before.lastIndexOf('\n') + 1;
        const lineEnd = code.indexOf('\n', lineStart) === -1 ? code.length : code.indexOf('\n', lineStart);
        const lineText = code.substring(lineStart, lineEnd);
        const newCode = lineText.trimStart().startsWith('#') ? code.substring(0, lineStart) + lineText.replace(/^\s*#\s?/, '') + code.substring(lineEnd) : code.substring(0, lineStart) + '# ' + lineText + code.substring(lineEnd);
        onChange(newCode); showToast('TOGGLED COMMENT');
      };
      const diffLines = useMemo(() => { const codeLines = code.split('\n'); return codeLines.map((line, i) => { if (i === 1 && node.modified) return { type: 'add', text: line, num: i + 1 }; if (i === 2 && node.modified) return { type: 'del', text: '# (previous version)', num: null }; return { type: 'ctx', text: line, num: i + 1 }; }); }, [code, node.modified]);
      const wordCount = code.trim() ? code.trim().split(/\s+/).length : 0;
      const charCount = code.length;
      const highlighted = highlightCode(code);
      const cssVars = { '--syn-kw': palette.kw, '--syn-str': palette.str, '--syn-cmt': palette.cmt, '--syn-num': palette.num, '--syn-fn': palette.fn, '--syn-bi': palette.bi, '--syn-op': palette.op };
      const lineH = fontSize * 1.65;
      const activeLineY = (cursor.line - 1) * lineH;
      const minimapLines = useMemo(() => { const lns = code.split('\n').slice(0, 50); return lns.map(l => ({ len: Math.min(l.length, 80), indent: l.match(/^\s*/)[0].length })); }, [code]);

      return (
        <div className="editor-palette-scope" style={{ display:'flex', flexDirection:'column', flex:1, minHeight:0, overflow:'hidden', background:palette.bg }} ref={el => el && Object.entries(cssVars).forEach(([k,v]) => el.style.setProperty(k,v))}>
          <div className="editor-toolbar">
            <button className="editor-toolbar-btn" onClick={handleCopy}><I.Copy /> COPY</button>
            <div className="editor-toolbar-sep"/>
            <button className="editor-toolbar-btn" onClick={handleFormat}><I.Format /> FORMAT</button>
            <button className="editor-toolbar-btn" onClick={toggleLineComment}># COMMENT</button>
            <div className="editor-toolbar-sep"/>
            <button className={`editor-toolbar-btn ${showFind?'active':''}`} onClick={() => setShowFind(v=>!v)}><I.Find /> FIND</button>
            <button className={`editor-toolbar-btn ${wordWrap?'active':''}`} onClick={() => setWordWrap(v=>!v)}><I.Wrap /> WRAP</button>
            <button className={`editor-toolbar-btn ${showDiff?'active':''}`} onClick={() => setShowDiff(v=>!v)}><I.Diff /> DIFF</button>
            <div className="editor-toolbar-sep"/>
            <button className="editor-toolbar-btn" onClick={() => setFontSize(s=>Math.max(10,s-1))} style={{padding:'4px 6px'}}>A−</button>
            <button className="editor-toolbar-btn" onClick={() => setFontSize(s=>Math.min(20,s+1))} style={{padding:'4px 6px'}}>A+</button>
            <button className={`editor-toolbar-btn ${minimap?'active':''}`} onClick={() => setMinimap(v=>!v)} style={{padding:'4px 7px', fontSize:'9px'}}>MAP</button>
            <div style={{marginLeft:'auto', position:'relative'}}>
              <button className={`editor-toolbar-btn ${showPaletteMenu?'active':''}`} onClick={() => setShowPaletteMenu(v=>!v)} style={{gap:'5px'}}>
                <div style={{display:'flex',gap:'3px'}}>{palette.swatches.map((c,i) => <div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:c}}/>)}</div>
                {palette.name}
              </button>
              {showPaletteMenu && (
                <div className="palette-dropdown" onClick={e=>e.stopPropagation()}>
                  <div className="palette-section-label">DARK</div>
                  {PALETTES.filter(p=>!['github','gruvlight','papercolor','flexoki'].includes(p.id)).map(p => (
                    <div key={p.id} className={`palette-option ${palette.id===p.id?'active':''}`} onClick={() => { setPalette(p); setShowPaletteMenu(false); }} style={{background:p.bg}}>
                      <div className="palette-swatches">{p.swatches.map((c,i) => <div key={i} className="palette-swatch" style={{background:c}}/>)}</div>
                      <span className="palette-name" style={{color:p.base}}>{p.name}</span>
                    </div>
                  ))}
                  <div className="palette-section-label">LIGHT</div>
                  {PALETTES.filter(p=>['github','gruvlight','papercolor','flexoki'].includes(p.id)).map(p => (
                    <div key={p.id} className={`palette-option ${palette.id===p.id?'active':''}`} onClick={() => { setPalette(p); setShowPaletteMenu(false); }} style={{background:p.bg}}>
                      <div className="palette-swatches">{p.swatches.map((c,i) => <div key={i} className="palette-swatch" style={{background:c}}/>)}</div>
                      <span className="palette-name" style={{color:p.base}}>{p.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showFind && (
            <div className="editor-find-bar">
              <span style={{fontSize:'9px',opacity:0.5,flexShrink:0}}>FIND</span>
              <input value={findQuery} onChange={e=>setFindQuery(e.target.value)} placeholder="Search..." spellCheck="false" />
              <span style={{fontSize:'9px',opacity:0.4,flexShrink:0}}>→</span>
              <input value={replaceQuery} onChange={e=>setReplaceQuery(e.target.value)} placeholder="Replace..." spellCheck="false" />
              <button className="editor-toolbar-btn" onClick={handleFindReplace} style={{flexShrink:0,fontSize:'9px'}}>REPLACE ALL</button>
              <button className="editor-toolbar-btn" onClick={() => setShowFind(false)} style={{flexShrink:0,color:'#ff435a',padding:'4px 6px'}}>✕</button>
            </div>
          )}
          <div style={{display:'flex',flex:1,overflow:'hidden',minHeight:0}}>
            {showDiff && (
              <div style={{width:'240px',flexShrink:0,borderRight:`1px solid ${palette.lineNum}44`,overflow:'auto',background:palette.bg,display:'flex',flexDirection:'column'}}>
                <div style={{padding:'7px 12px',fontSize:'9px',opacity:0.4,borderBottom:`1px solid ${palette.lineNum}44`,letterSpacing:'1px'}}>DIFF — WORKING TREE</div>
                <div style={{flex:1,overflow:'auto',padding:'8px 0'}}>
                  {diffLines.map((dl,i) => (
                    <div key={i} className={`diff-line ${dl.type==='add'?'diff-add':dl.type==='del'?'diff-del':'diff-ctx'}`} style={{fontSize:'10px'}}>
                      <span className="diff-line-num">{dl.num||''}</span>
                      <span style={{color: dl.type==='add'?'#10b981':dl.type==='del'?'#ff435a':palette.base, paddingRight:'10px'}}>{dl.type==='add'?'+':dl.type==='del'?'-':' '} {dl.text.substring(0,26)}{dl.text.length>26?'…':''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{display:'flex',flex:1,overflow:'hidden',position:'relative',minWidth:0}}>
              <div ref={lineNumRef} className="line-numbers" style={{fontSize,lineHeight:'1.65',background:palette.bg,color:palette.lineNum,borderRightColor:palette.lineNum+'44',overflowY:'hidden'}}>
                {Array.from({length:lineCount},(_,i) => (
                  <div key={i} className="line-num" style={{color:cursor.line===i+1?palette.base:palette.lineNum,opacity:cursor.line===i+1?1:0.5,fontWeight:cursor.line===i+1?'bold':undefined,fontSize:cursor.line===i+1?fontSize:fontSize-0.5}}>{i+1}</div>
                ))}
              </div>
              <div style={{flex:1,position:'relative',overflow:'hidden',background:palette.bg}}>
                <div className="active-line-highlight" style={{top:`calc(20px + ${activeLineY}px)`,height:`${lineH}px`,background:palette.activeLine,borderLeftColor:palette.fn+'60'}}/>
                <div ref={overlayRef} className="code-highlight-overlay" style={{fontSize,lineHeight:'1.65',whiteSpace:wordWrap?'pre-wrap':'pre',color:palette.base}} dangerouslySetInnerHTML={{__html:highlighted}}/>
                <textarea ref={textareaRef} className="code-area" value={code} onChange={e=>onChange(e.target.value)} onKeyDown={handleKeyDown} onScroll={handleScroll} onClick={handleCursorUpdate} onKeyUp={handleCursorUpdate} spellCheck="false" style={{fontSize,lineHeight:'1.65',whiteSpace:wordWrap?'pre-wrap':'pre',position:'absolute',inset:0,padding:'20px 14px',fontFamily:"'JetBrains Mono',monospace",color:'transparent',caretColor:palette.fn,background:'transparent',border:'none',outline:'none',resize:'none',zIndex:2}}/>
                {minimap && (
                  <div style={{position:'absolute',top:0,right:0,width:'60px',bottom:0,background:palette.bg+'cc',borderLeft:`1px solid ${palette.lineNum}33`,overflow:'hidden',pointerEvents:'none',opacity:0.6}}>
                    {minimapLines.map((l,i) => (
                      <div key={i} style={{position:'relative',height:'2.5px',margin:'0.5px 4px'}}>
                        <div style={{position:'absolute',left:`${l.indent*1.5}px`,width:`${l.len*0.65}px`,maxWidth:'50px',height:'2px',background:i===cursor.line-1?palette.fn:palette.lineNum,opacity:0.7,borderRadius:'1px'}}/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="code-panel-info">
              <div className="code-panel-info-hdr">INSPECTOR</div>
              <div className="code-panel-info-body">
                <div>
                  <div className="info-section-title">FILE</div>
                  <div style={{fontWeight:'bold',color:palette.fn,fontSize:'11px'}}>{node.label}</div>
                  <div style={{opacity:0.4,marginTop:'2px',fontSize:'9px'}}>{node.type}</div>
                </div>
                <div>
                  <div className="info-section-title">METRICS</div>
                  <div className="stat-row"><span className="stat-label">LINES</span><span className="stat-val" style={{color:'#10b981'}}>{lineCount}</span></div>
                  <div className="stat-row"><span className="stat-label">WORDS</span><span className="stat-val" style={{color:'#ffc410'}}>{wordCount}</span></div>
                  <div className="stat-row"><span className="stat-label">CHARS</span><span className="stat-val" style={{color:'#4285f4'}}>{charCount}</span></div>
                  <div className="stat-row"><span className="stat-label">SIZE</span><span className="stat-val" style={{color:'#28f1c3'}}>{(charCount/1024).toFixed(1)}kb</span></div>
                </div>
                <div>
                  <div className="info-section-title">CURSOR</div>
                  <div className="stat-row"><span className="stat-label">LINE</span><span className="stat-val">{cursor.line}</span></div>
                  <div className="stat-row"><span className="stat-label">COL</span><span className="stat-val">{cursor.col}</span></div>
                </div>
                <div>
                  <div className="info-section-title">SHORTCUTS</div>
                  <div style={{fontSize:'9px',opacity:0.35,lineHeight:'2',display:'flex',flexDirection:'column',gap:'1px'}}>
                    <span>^F — find</span><span>^/ — comment</span><span>^D — diff</span><span>Tab — indent</span>
                  </div>
                </div>
                <div>
                  <div className="info-section-title">STATUS</div>
                  <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:node.modified?'#ffc410':'#10b981',boxShadow:`0 0 6px ${node.modified?'#ffc410':'#10b981'}`}}/>
                    <span style={{fontSize:'9px',color:node.modified?'#ffc410':'#10b981',fontWeight:'bold'}}>{node.modified?'MODIFIED':'SAVED'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="editor-status-strip">
            <span>Ln {cursor.line} : Col {cursor.col}</span>
            <span style={{opacity:0.25}}>│</span><span>{lineCount} lines</span>
            <span style={{opacity:0.25}}>│</span><span>UTF-8</span>
            <span style={{opacity:0.25}}>│</span><span style={{color:wordWrap?palette.fn:undefined}}>WRAP {wordWrap?'ON':'OFF'}</span>
            <span style={{opacity:0.25}}>│</span><span style={{color:palette.fn}}>{palette.name}</span>
            <span style={{marginLeft:'auto',color:node.modified?'#ffc410':'#10b981',fontSize:'9px'}}>{node.modified?'● UNSAVED':'✓ CLEAN'}</span>
          </div>
          {toastMsg && <div className="copy-toast">{toastMsg}</div>}
        </div>
      );
    }

    const ZONES = ['default','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
    const OUTSIDE_COLORS = { default:'#ffffff', 1:'#ffffff', 2:'#ffffff', 3:'#ffffff', 4:'#ffffff', 5:'#808080', 6:'#1a0b2e', 7:'#1a0a2e', 8:'#0a1628', 9:'#1a1200', 10:'#ffffff', 11:'#0d1a0d', 12:'#1a0a0a', 13:'#0a0a1a', 14:'#1a1600', 15:'#001a14' };
    const SECTION_ACCENT_COLORS = ['#10b981','#4285f4','#ffc410','#ff435a','#28f1c3','#bb9af7','#ff1650','#5ccfe6','#ffbd5e','#e36209','#72f1b8','#ff8080','#89ddff','#e5c07b','#4ec9b0','#c792ea'];

    const INITIAL_NODES = [
      { id:'n1', type:'entry', label:'core_sys.py', isMain:true, x:0, y:0, vx:0, vy:0, themeIdx:0, code:'import torch\nimport sys\n\nprint("Central Architecture Booted")\n\ndef init_sequence():\n    # Core logic entry\n    pass\n\nif __name__ == "__main__":\n    init_sequence()', modified:false },
      { id:'n2', type:'function', label:'load_network.py', isMain:false, x:140, y:-130, vx:0, vy:0, themeIdx:5, classId:'g1', code:'def load_network(config=None):\n    """Load the neural network from disk.\n\n    Args:\n        config: Optional configuration dict\n    Returns:\n        DataLoader instance\n    """\n    loader = DataLoader(config)\n    loader.init()\n    return loader\n\n# Network params\nDEFAULT_LR = 0.001\nDEFAULT_BATCH = 32', modified:true },
      { id:'n3', type:'class', label:'DataMatrix.py', isMain:false, x:-100, y:150, vx:0, vy:0, themeIdx:6, code:'class DataMatrix:\n    """Core data matrix handler."""\n\n    def __init__(self, size=128):\n        self.active = True\n        self.buffer = []\n        self.size = size\n\n    def push(self, data):\n        if len(self.buffer) < self.size:\n            self.buffer.append(data)\n            return True\n        return False\n\n    def flush(self):\n        self.buffer = []\n        return self', modified:false, classId:'g1' },
      { id:'n4', type:'function', label:'preprocess.py', isMain:false, x:60, y:180, vx:0, vy:0, themeIdx:4, classId:null, code:'def preprocess(data):\n    return data', modified:false },
    ];
    const INITIAL_EDGES = [{id:'e1',source:'n1',target:'n2'},{id:'e2',source:'n1',target:'n3'},{id:'e3',source:'n2',target:'n4'}];
    const INITIAL_GROUPS = [{id:'g1',name:'NetworkLayer',color:'#10b981',nodeIds:['n2','n3']}];
    const INITIAL_BOARD = {
      cols:[{id:'c1',title:'BACKLOG',color:'#4a4a6a'},{id:'c2',title:'TO DO',color:'#4285f4'},{id:'c3',title:'IN PROGRESS',color:'#ffc410'},{id:'c4',title:'REVIEW',color:'#ff435a'},{id:'c5',title:'DONE',color:'#10b981'}],
      cards:[
        {id:'k1',colId:'c3',title:'Build graph force simulation',priority:'HIGH',tags:['core','physics'],progress:70,due:'Mar 12',assignee:0},
        {id:'k2',colId:'c2',title:'WebSocket sync protocol',priority:'HIGH',tags:['backend','net'],progress:0,due:'Mar 18',assignee:1},
        {id:'k3',colId:'c2',title:'Class grouping thread UI',priority:'MED',tags:['ui','graph'],progress:20,due:'Mar 15',assignee:0},
        {id:'k5',colId:'c4',title:'Syntax highlight engine',priority:'MED',tags:['editor','parser'],progress:90,due:'Mar 10',assignee:0},
        {id:'k6',colId:'c5',title:'Babel JSX setup',priority:'DONE',tags:['infra'],progress:100,due:'Feb 28',assignee:1},
        {id:'k7',colId:'c5',title:'Boot sequence modal',priority:'DONE',tags:['ui'],progress:100,due:'Feb 25',assignee:0},
        {id:'k8',colId:'c3',title:'Color palette engine',priority:'MED',tags:['editor','ui'],progress:45,due:'Mar 14',assignee:2},
      ],
    };

    const CMD_ITEMS = [
      { icon:'⌘', label:'Open Command Palette', hint:'Ctrl+P' },
      { icon:'F', label:'New file node', hint:'N' },
      { icon:'G', label:'New class group', hint:'G' },
      { icon:'J', label:'Join nodes (add edge)', hint:'J' },
      { icon:'X', label:'Cut edge', hint:'X' },
      { icon:'/', label:'Toggle comment', hint:'Ctrl+/' },
      { icon:'T', label:'Open terminal', hint:'`' },
      { icon:'B', label:'Open board', hint:'' },
      
    ];

    const FloatingPanel = ({ title, isOpen, onClose, defaultX, defaultY, defaultW, defaultH, children }) => {
      const [pos, setPos] = useState({ x: defaultX, y: defaultY });
      const [size, setSize] = useState({ w: defaultW, h: defaultH });
      const [zIndex, setZIndex] = useState(100);
      const dragRef = useRef({ isDragging:false });
      const resizeRef = useRef({ isResizing:false });
      if (!isOpen) return null;
      const bringToFront = () => setZIndex(Date.now() % 100000 + 100);
      const onDragStart = (e) => { if(e.target.closest('.no-drag'))return; dragRef.current={isDragging:true,startX:e.clientX,startY:e.clientY,ix:pos.x,iy:pos.y}; e.currentTarget.setPointerCapture(e.pointerId); bringToFront(); };
      const onDragMove = (e) => { if(!dragRef.current.isDragging)return; setPos({x:dragRef.current.ix+(e.clientX-dragRef.current.startX),y:Math.max(0,dragRef.current.iy+(e.clientY-dragRef.current.startY))}); };
      const onDragEnd = (e) => { dragRef.current.isDragging=false; e.currentTarget.releasePointerCapture(e.pointerId); };
      const onResizeStart = (e) => { e.stopPropagation(); resizeRef.current={isResizing:true,startX:e.clientX,startY:e.clientY,iw:size.w,ih:size.h}; e.currentTarget.setPointerCapture(e.pointerId); };
      const onResizeMove = (e) => { if(!resizeRef.current.isResizing)return; setSize({w:Math.max(220,resizeRef.current.iw+(e.clientX-resizeRef.current.startX)),h:Math.max(160,resizeRef.current.ih+(e.clientY-resizeRef.current.startY))}); };
      const onResizeEnd = (e) => { resizeRef.current.isResizing=false; e.currentTarget.releasePointerCapture(e.pointerId); };
      return (
        <div className="floating-panel" style={{left:pos.x,top:pos.y,width:size.w,height:size.h,zIndex}} onPointerDownCapture={bringToFront}>
          <div className="panel-hdr" style={{cursor:'grab'}} onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd} onPointerCancel={onDragEnd}>
            <span>{title}</span>
            <span className="no-drag" style={{cursor:'pointer',padding:'0 4px',opacity:0.5,fontSize:'12px'}} onClick={onClose}>✕</span>
          </div>
          <div className="panel-content-wrap">
            {children}
            <div className="panel-resizer" onPointerDown={onResizeStart} onPointerMove={onResizeMove} onPointerUp={onResizeEnd} onPointerCancel={onResizeEnd}/>
          </div>
        </div>
      );
    };

    function CommandPalette({ isOpen, onClose, onAction }) {
      const [query, setQuery] = useState('');
      const [focused, setFocused] = useState(0);
      const filtered = CMD_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));
      useEffect(() => { if(isOpen) setQuery(''); }, [isOpen]);
      if (!isOpen) return null;
      return (
        <div className="cmd-overlay" onClick={onClose}>
          <div className="cmd-box" onClick={e=>e.stopPropagation()}>
            <div className="cmd-input-wrap">
              <span className="cmd-prefix">⌘</span>
              <input className="cmd-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Type a command..." autoFocus
                onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setFocused(f=>Math.min(f+1,filtered.length-1));}if(e.key==='ArrowUp'){e.preventDefault();setFocused(f=>Math.max(f-1,0));}if(e.key==='Enter'){onAction(filtered[focused]?.label);onClose();}if(e.key==='Escape')onClose();}}
              />
            </div>
            <div className="cmd-results">
              {filtered.map((item,i) => (
                <div key={i} className={`cmd-item ${i===focused?'focused':''}`} onMouseEnter={()=>setFocused(i)} onClick={()=>{onAction(item.label);onClose();}}>
                  <div className="cmd-item-icon">{item.icon}</div>
                  <span className="cmd-item-label">{item.label}</span>
                  {item.hint && <span className="cmd-item-hint">{item.hint}</span>}
                </div>
              ))}
            </div>
            <div className="cmd-footer"><span>↑↓ navigate</span><span>↵ execute</span><span>Esc close</span></div>
          </div>
        </div>
      );
    }

    function GraphMinimap({ nodes }) {
      if (!nodes.length) return null;
      const pad = 10, W = 120, H = 75;
      const xs = nodes.map(n=>n.x), ys = nodes.map(n=>n.y);
      const minX=Math.min(...xs)-50, maxX=Math.max(...xs)+50, minY=Math.min(...ys)-50, maxY=Math.max(...ys)+50;
      const rangeX = maxX-minX || 1, rangeY = maxY-minY || 1;
      const toMm = (x,y) => [pad + (x-minX)/rangeX*(W-pad*2), pad + (y-minY)/rangeY*(H-pad*2)];
      return (
        <div className="minimap-wrap">
          <svg width={W} height={H} style={{display:'block'}}>
            {nodes.map(n => { const [mx,my] = toMm(n.x,n.y); return <circle key={n.id} cx={mx} cy={my} r={n.isMain?4:2.5} fill={AVATAR_ACCENTS[n.themeIdx % AVATAR_ACCENTS.length]} opacity="0.75"/>; })}
          </svg>
          <div className="minimap-label">GRAPH OVERVIEW</div>
        </div>
      );
    }

    // Module-level raw filenames for hero overlay (use encodeURIComponent in src)
    const MANGA_RAW = [
      'Guts.jpeg','Guts And Zodd, DON.jpeg','Killua.jpeg','Inumaki.jpeg',
      'Monster.jpeg','Whitebeard.jpeg','Roronoa Zoro.jpeg','Reze.jpeg',
      'Soul King Brook.jpeg','Fire Punch.jpeg','PANTHEON.jpeg','CHAOS SMILE.jpeg',
      'Corridor.jpeg','Thorfinn _ Vinland saga.jpeg','Choujin X.jpeg',
      'Denj - Chainsaw Man_.jpeg','#chainsawman.jpeg',
      'THE CONTROL DEVIL _ GRAPHIC DESIGN.jpeg','The Weeknd x Chainsaw Man.jpeg',
      'Kagurabachi X Bleach.jpeg','Kisuke Urahara [Bleach] Poster.jpeg',
      'Nelliel Brutalism.jpeg','One Piece Magazines.jpeg',
      'Buggy, Sir Crocodile & Mihawk - One Piece.jpeg','Marco one piece.jpeg',
      'God Valley.jpeg','ONE PIECE NOVEL LAW_ CH_ 1.jpeg','one piece.jpeg',
      'Hunter × Hunter Volume 11 Cover.jpeg','Black Clover.jpeg',
      'ANIME POSTERS - Sergey Zhikin.jpeg','MATT TAYLOR.jpeg',
      'Slam Dunk Manga New Edition Cover Art – All 20 Covers.jpeg',
      'SUBWAY DIMENSIONS.jpeg','Burning - Inspired by Van Gogh.jpeg',
      'VOGUE.jpeg','VOGUE (1).jpeg','Sight - SKJEGG.jpeg',
      'Queen Marika the Eternal.jpeg','R99 2_1 Poster.jpeg','R99 2_5 Poster.jpeg',
      'Kyora Sazanami Poster.jpeg','Shugen jikka Kiyomaru.jpeg',
      'Poster - Veil.jpeg','Rei_) (not my art).jpeg',
      'Portada del primer número de One punch man_ Es veu al seu protagonista.jpeg',
      'Choujin X Vol_ 12.jpeg','Choujin X Volume 14.jpeg','Choujin X Volume 3.jpeg',
      'Poster One Piece - Wanted Whitebeard 61x91,5cm _ bol.jpeg',
      'aki hayakawa.jpeg','choujin x tokio.jpeg','choujin x.jpeg','csm.jpeg',
      'ddd.jpeg','denji starboy album cover.jpeg','kizaru.jpeg',
      'litterally chainsaw man.jpeg','mob psycho 100.jpeg',
      'Korean Edition Manga [phantom Busters] 팜텀 버스터즈 (jmanga227).jpeg',
      'SONS OF THE DEVIL Covers 1-5 - toni infante.jpeg',
      'One piece wano x Gta.jpeg','yhwach god of the Quincy.jpeg',
      'Credit_ Twitter @avenoirn.jpeg',
      '20Th Century Boys_ The Perfect Edition, Vol_ 11.jpeg',
      'Dandadan _ @lihaolow • tw ☆.jpeg',
      'Makimq is listening 🤫_ Social Poster design #Anime #Poster.jpeg',
      'Corazon 💔.jpeg','move! move! just like mob!💥.jpeg',
      '1997_ The start of an adventure ☠️🏕.jpeg',
      'ishigori ryu _ @neggi_ on X.jpeg','zzyzzyy on X.jpeg',
      'Sukuna”.jpeg','Hoạt - Poster  _ Facebook.jpeg',
      'AdriGold 🍊 (@GoldDAdri_) on X.jpeg',
      'Ai, Feel free to use.jpeg','fashionstation 230226x778.jpeg',
      'Best _GOODNIGHT PUNPUN_ Fan Graphic Cover _ Poster💪.jpeg',
      'Makima! 🩸__#Makima #ChainsawMan_#ChainsawManFanart #AnimeArt_#DigitalPainting.jpeg',
      'Mess🌿 (@Messcult) on X.jpeg','チェンソーマン ＃１.jpeg',
      '𝓕𝓼𝓸𝓹𝓹.jpeg','🍀.jpeg',
    ];

    // ═══════════════════════════════════════════════════════════════
    //  MANGA HERO OVERLAY — ephemeral-inspired splash (no file open)
    // ═══════════════════════════════════════════════════════════════
    function MangaHeroOverlay({ nodeCount, edgeCount, themeMode, onNewNode, onOpenGallery }) {
      const [bgIdx, setBgIdx] = useState(0);
      const [fadeIn, setFadeIn] = useState(true);

      useEffect(() => {
        const t = setInterval(() => {
          setFadeIn(false);
          setTimeout(() => { setBgIdx(i => (i + 1) % MANGA_RAW.length); setFadeIn(true); }, 600);
        }, 8000);
        return () => clearInterval(t);
      }, []);

      const brutal = themeMode === 'brutal';
      const acc    = brutal ? '#c8001a' : '#ff2a38';
      const bg     = brutal ? '#f0ece0' : '#030308';
      const txt    = brutal ? '#0f0f0f' : '#f4f0e8';
      const enc    = (f) => encodeURIComponent(f);

      const rightPosters = MANGA_RAW.slice(0, 9);
      const stripImgs    = [...MANGA_RAW.slice(8, 28), ...MANGA_RAW.slice(8, 28)]; // doubled for loop

      return (
        <div className="manga-hero-root">

          {/* ── Cinema background ── */}
          <div className="manga-hero-cinema">
            <img
              key={bgIdx}
              src={`/manga/${enc(MANGA_RAW[bgIdx])}`}
              alt=""
              style={{ opacity: fadeIn ? (brutal ? 0.52 : 0.62) : 0, filter: brutal ? 'contrast(1.1) saturate(0.6) sepia(0.15)' : 'contrast(1.12) saturate(0.7)' }}
            />
            <div className="manga-hero-grad-l" style={{ background: `linear-gradient(90deg, ${bg}f0 0%, ${bg}cc 30%, ${bg}77 55%, transparent 80%)` }} />
            <div className="manga-hero-grad-b" style={{ background: `linear-gradient(180deg, ${bg}55 0%, transparent 25%, transparent 55%, ${bg}ee 90%, ${bg} 100%)` }} />
            <div className="manga-hero-scan" />
            <div className="manga-hero-tone" />
          </div>

          {/* ── Main body ── */}
          <div className="manga-hero-body">

            {/* LEFT panel */}
            <div className="manga-hero-left">

              {/* Caption box */}
              <div className="manga-hero-caption" style={{
                background: brutal ? '#0f0f0f' : 'rgba(0,0,0,0.72)',
                border: `1px solid ${brutal ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.12)'}`,
                borderLeftColor: acc,
              }}>
                <div style={{ fontSize:'.48rem', letterSpacing:'.1em', color: brutal ? 'rgba(240,236,224,0.7)' : 'rgba(255,255,255,0.6)' }}>
                  FORBIDEN // GRAPH IDE
                </div>
                <div style={{ fontSize:'.38rem', color:`${acc}cc`, marginTop:'2px' }}>
                  ONLINE · v2.1 BETA · {MANGA_RAW.length} ART PANELS
                </div>
              </div>

              {/* Giant background SFX watermark */}
              <div className="manga-hero-sfx-bg">
                <span style={{
                  color: brutal ? 'rgba(15,15,15,0.055)' : 'rgba(255,42,56,0.045)',
                  WebkitTextStroke: brutal ? '1px rgba(15,15,15,0.06)' : '1px rgba(255,42,56,0.07)',
                }}>
                  FOR<br/>BID<br/>EN
                </span>
              </div>

              {/* Content */}
              <div className="manga-hero-content">

                {/* Title */}
                <h1 className="manga-hero-title" style={{
                  color: txt,
                  textShadow: brutal ? 'none' : '0 2px 40px rgba(0,0,0,0.8)',
                }}>
                  FOR<span style={{ color: acc }}>BID</span>EN
                </h1>

                {/* Diagonal rule */}
                <div className="manga-hero-diag" style={{
                  background: `linear-gradient(90deg, ${acc}, ${acc}33, transparent)`,
                }} />

                {/* Tagline */}
                <div className="manga-hero-tag" style={{ color: brutal ? 'rgba(15,15,15,0.45)' : 'rgba(255,255,255,0.4)' }}>
                  Graph-Based Code IDE // Operator Portal
                </div>

                {/* Stats */}
                <div className="manga-hero-stats">
                  <div className="manga-hero-stat">
                    <span className="manga-hero-stat-num" style={{ color: acc }}>{nodeCount}</span>
                    <span className="manga-hero-stat-lbl" style={{ color: brutal ? 'rgba(15,15,15,0.4)' : 'rgba(255,255,255,0.35)' }}>NODES</span>
                  </div>
                  <div className="manga-hero-stat-div" />
                  <div className="manga-hero-stat">
                    <span className="manga-hero-stat-num" style={{ color:'#10b981' }}>{edgeCount}</span>
                    <span className="manga-hero-stat-lbl" style={{ color: brutal ? 'rgba(15,15,15,0.4)' : 'rgba(255,255,255,0.35)' }}>EDGES</span>
                  </div>
                  <div className="manga-hero-stat-div" />
                  <div className="manga-hero-stat">
                    <span className="manga-hero-stat-num" style={{ color:'#ffc410' }}>{MANGA_RAW.length}</span>
                    <span className="manga-hero-stat-lbl" style={{ color: brutal ? 'rgba(15,15,15,0.4)' : 'rgba(255,255,255,0.35)' }}>PANELS</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="manga-hero-ctas">
                  <button
                    className="manga-hero-cta-play"
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => { e.stopPropagation(); onNewNode(); }}
                    style={{
                      background: brutal ? '#0f0f0f' : `linear-gradient(135deg, ${acc}, #cc0020)`,
                      color: brutal ? '#f2c12e' : '#fff',
                      border: brutal ? '2px solid #0f0f0f' : 'none',
                      boxShadow: brutal ? `4px 4px 0 ${acc}` : `0 4px 24px ${acc}44`,
                    }}
                  >▶ NEW NODE</button>
                  <button
                    className="manga-hero-cta-browse"
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => { e.stopPropagation(); onOpenGallery(); }}
                    style={{
                      color: brutal ? 'rgba(15,15,15,0.65)' : 'rgba(255,255,255,0.55)',
                      border: brutal ? '2px solid rgba(15,15,15,0.25)' : '1px solid rgba(255,255,255,0.18)',
                    }}
                  >⊞ GALLERY</button>
                </div>
              </div>
            </div>

            {/* RIGHT poster grid */}
            <div className="manga-hero-right" style={{
              background: brutal ? 'rgba(240,236,224,0.55)' : 'rgba(3,3,8,0.7)',
              borderLeft: `3px solid ${brutal ? 'rgba(15,15,15,0.12)' : 'rgba(255,255,255,0.05)'}`,
            }}>
              <div className="manga-hero-right-label" style={{
                color: brutal ? 'rgba(15,15,15,0.4)' : 'rgba(255,255,255,0.3)',
                borderBottom: `1px solid ${brutal ? 'rgba(15,15,15,0.08)' : 'rgba(255,255,255,0.05)'}`,
              }}>
                // ART VAULT — {MANGA_RAW.length} PANELS
              </div>
              <div className="manga-hero-grid">
                {rightPosters.map((img, i) => (
                  <div key={i} className="manga-hero-poster" style={{
                    border: `1px solid ${brutal ? 'rgba(15,15,15,0.12)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                    <img src={`/manga/${enc(img)}`} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom strip ── */}
          <div className="manga-hero-strip" style={{
            borderTop: `2px solid ${brutal ? 'rgba(15,15,15,0.12)' : 'rgba(255,255,255,0.07)'}`,
            background: brutal ? 'rgba(240,236,224,0.9)' : 'rgba(3,3,8,0.92)',
          }}>
            <div className="manga-hero-strip-label" style={{
              color: brutal ? 'rgba(15,15,15,0.4)' : 'rgba(255,255,255,0.3)',
              borderRight: `1px solid ${brutal ? 'rgba(15,15,15,0.12)' : 'rgba(255,255,255,0.06)'}`,
            }}>// PANELS</div>
            <div className="manga-hero-strip-row">
              {stripImgs.map((img, i) => (
                <div key={i} className="manga-hero-strip-thumb" style={{
                  border: `1px solid ${brutal ? 'rgba(15,15,15,0.12)' : 'rgba(255,255,255,0.07)'}`,
                }}>
                  <img src={`/manga/${enc(img)}`} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════════════
    //  GROUP DOCK — compact top-right reference card
    // ═══════════════════════════════════════════════════════════════
    function GroupDock({ groups, nodes, onOpen, onRemove }) {
      if (!groups.length) return null;
      return (
        <div className="group-dock">
          {groups.map((group, gi) => {
            const members = nodes.filter(n => group.nodeIds.includes(n.id));
            const accent = group.color || SECTION_ACCENT_COLORS[gi % SECTION_ACCENT_COLORS.length];
            const totalLines = members.reduce((s, n) => s + (n.code || '').split('\n').length, 0);
            return (
              <div key={group.id} className="group-dock-card" onClick={() => onOpen(group.id)}
                style={{borderColor: accent + '30'}}
                onMouseEnter={e => e.currentTarget.style.borderColor = accent + '70'}
                onMouseLeave={e => e.currentTarget.style.borderColor = accent + '30'}>
                {/* Accent top line */}
                <div className="group-dock-accent-line" style={{background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)`}}/>
                {/* Header */}
                <div className="group-dock-header">
                  <div className="group-dock-title-col">
                    <div className="group-dock-left-bar" style={{background: accent + 'aa'}}/>
                    <div>
                      <div className="group-dock-classname" style={{color: accent}}>class {group.name}</div>
                      <div className="group-dock-sub-label">{members.length} methods · {totalLines} lines</div>
                    </div>
                  </div>
                  <div className="group-dock-badge" style={{color: accent, borderColor: accent + '55'}}>GROUP</div>
                </div>
                {/* Tree structure */}
                <div className="group-dock-tree">
                  <div className="group-dock-tree-class-line" style={{color: accent + 'cc'}}>
                    <span style={{opacity:0.5}}>class </span>
                    <span style={{fontWeight:'bold'}}>{group.name}</span>
                    <span style={{opacity:0.4}}>:</span>
                  </div>
                  {members.map((node, i) => (
                    <div key={node.id} className="group-dock-tree-row">
                      <span className="group-dock-tree-branch" style={{color: accent}}>
                        {i === members.length - 1 ? '└─' : '├─'}
                      </span>
                      <span className="group-dock-tree-name" style={{color: SECTION_ACCENT_COLORS[i % SECTION_ACCENT_COLORS.length]}}>
                        {node.label.replace('.py','').replace('.js','')}
                      </span>
                      <span className="group-dock-tree-tag">{node.type}</span>
                    </div>
                  ))}
                </div>
                {/* Footer */}
                <div className="group-dock-footer">
                  <span className="group-dock-hint">↵ OPEN CLASS VIEW</span>
                  <button className="group-dock-dissolve" onClick={e => { e.stopPropagation(); onRemove(group.id); }}>DISSOLVE</button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════════════
    //  GROUP EDITOR — Classic multi-function code viewer
    //  Inspired by technical reference card layout
    // ═══════════════════════════════════════════════════════════════
    function GroupEditor({ group, nodes, onClose, onOpenNode }) {
      const [activeId, setActiveId] = useState(null);
      if (!group) return null;

      const members = nodes.filter(n => group.nodeIds.includes(n.id));
      const accent = group.color || '#10b981';
      const totalLines = members.reduce((s, n) => s + (n.code || '').split('\n').length, 0);

      const scrollToFn = (id) => {
        setActiveId(id);
        const el = document.getElementById('fn-block-' + id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      // Syntax highlight styles per section
      const getSynVars = (col) => ({
        '--syn-kw': '#c792ea',
        '--syn-str': col,
        '--syn-cmt': 'rgba(180,180,220,0.28)',
        '--syn-num': '#f78c6c',
        '--syn-fn': col,
        '--syn-bi': '#89ddff',
        '--syn-op': 'rgba(200,200,230,0.45)',
      });

      return (
        <div className="grp-editor-overlay" onPointerDown={onClose}>
          <div className="grp-editor-shell" onPointerDown={e => e.stopPropagation()}>

            {/* ── Window chrome ── */}
            <div className="grp-editor-chrome">
              <div className="grp-chrome-dot" style={{background:'#ff5f57'}}/>
              <div className="grp-chrome-dot" style={{background:'#febc2e'}}/>
              <div className="grp-chrome-dot" style={{background:'#28c840'}}/>
              <div className="grp-chrome-sep"/>
              <span className="grp-chrome-title" style={{color: accent}}>class {group.name}</span>
              <span style={{opacity:0.2, margin:'0 6px', fontSize:'11px'}}>/</span>
              <span className="grp-chrome-meta">CLASS ASSEMBLY VIEW · {members.length} FUNCTIONS · {totalLines} LINES</span>
              <button className="editor-toolbar-btn" style={{marginLeft:'auto', fontSize:'9px'}} onClick={onClose}>✕ CLOSE</button>
            </div>

            <div className="grp-editor-body">

              {/* ── Left sidebar ── */}
              <div className="grp-sidebar">
                <div className="grp-sidebar-hdr">
                  <div className="grp-sidebar-sup">CLASS MEMBERS</div>
                  <div className="grp-sidebar-classname" style={{color: accent}}>{group.name}</div>
                </div>

                {/* Tree structure preview */}
                <div className="grp-sidebar-struct">
                  <div className="grp-sidebar-struct-class" style={{color: accent}}>
                    class {group.name}:
                  </div>
                  {members.map((node, i) => {
                    const col = SECTION_ACCENT_COLORS[i % SECTION_ACCENT_COLORS.length];
                    return (
                      <div key={node.id} className="grp-sidebar-struct-method" style={{cursor:'pointer'}} onClick={() => scrollToFn(node.id)}>
                        <span style={{opacity:0.25, color: accent}}>{i === members.length-1 ? '└' : '├'}</span>
                        <span style={{color: col}}>def {node.label.replace('.py','').replace('.js','')}()</span>
                      </div>
                    );
                  })}
                </div>

                {/* Member list */}
                <div className="grp-member-list">
                  {members.map((node, i) => {
                    const col = SECTION_ACCENT_COLORS[i % SECTION_ACCENT_COLORS.length];
                    const lc = (node.code || '').split('\n').length;
                    return (
                      <div key={node.id}
                        className={`grp-member-row ${activeId === node.id ? 'active' : ''}`}
                        style={{borderLeftColor: activeId === node.id ? col : 'transparent', color: col}}
                        onClick={() => scrollToFn(node.id)}>
                        <div className="grp-member-dot" style={{background: col, boxShadow: activeId===node.id ? `0 0 6px ${col}` : 'none'}}/>
                        <div className="grp-member-info">
                          <div className="grp-member-fname">{node.label}</div>
                          <div className="grp-member-ftype">{node.type.toUpperCase()} · {lc}L</div>
                        </div>
                        {node.modified && <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410',flexShrink:0}}/>}
                      </div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="grp-sidebar-stats">
                  <div style={{fontSize:'8px', opacity:0.3, letterSpacing:'1.3px', marginBottom:'3px'}}>STATS</div>
                  <div className="grp-stat-row">
                    <span className="grp-stat-label">METHODS</span>
                    <span className="grp-stat-val" style={{color: accent}}>{members.length}</span>
                  </div>
                  <div className="grp-stat-row">
                    <span className="grp-stat-label">TOTAL LINES</span>
                    <span className="grp-stat-val" style={{color:'#ffc410'}}>{totalLines}</span>
                  </div>
                  <div className="grp-stat-row">
                    <span className="grp-stat-label">MODIFIED</span>
                    <span className="grp-stat-val" style={{color:'#ff435a'}}>{members.filter(n=>n.modified).length}</span>
                  </div>
                </div>
              </div>

              {/* ── Main code panel ── */}
              <div className="grp-main">
                {/* Tab bar */}
                <div className="grp-tabs">
                  <div className="grp-tab active" style={{color: accent, borderBottomColor: accent, borderBottom:'2px solid'}}>
                    ALL MEMBERS
                  </div>
                  {members.map((node, i) => {
                    const col = SECTION_ACCENT_COLORS[i % SECTION_ACCENT_COLORS.length];
                    return (
                      <div key={node.id}
                        className={`grp-tab ${activeId===node.id?'active':''}`}
                        style={{color: col, borderBottom: activeId===node.id ? `2px solid ${col}` : '2px solid transparent'}}
                        onClick={() => scrollToFn(node.id)}>
                        {node.label}
                      </div>
                    );
                  })}
                </div>

                {/* Code sections scroll area */}
                <div className="grp-codescroll">

                  {/* Class banner */}
                  <div className="grp-class-banner">
                    <div className="grp-banner-bar" style={{background: accent, height:'40px'}}/>
                    <div>
                      <div className="grp-banner-code">
                        <span style={{color:'#c792ea', fontWeight:'bold', fontFamily:"'JetBrains Mono',monospace", fontSize:'13px'}}>class </span>
                        <span style={{color: accent, fontWeight:'bold', fontFamily:"'JetBrains Mono',monospace", fontSize:'13px'}}>{group.name}</span>
                        <span style={{color:'rgba(200,200,230,0.4)', fontFamily:"'JetBrains Mono',monospace", fontSize:'13px'}}>:</span>
                      </div>
                      <div className="grp-banner-note">
                        # assembled class view · {members.length} methods · read-only
                      </div>
                    </div>
                    <div style={{marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center'}}>
                      <div style={{padding:'3px 10px', border:`1px solid ${accent}44`, borderRadius:'3px', fontSize:'9px', color: accent, fontFamily:"'JetBrains Mono',monospace", letterSpacing:'1px'}}>CLASS</div>
                      <div style={{padding:'3px 10px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'3px', fontSize:'9px', opacity:0.4, fontFamily:"'JetBrains Mono',monospace"}}>{members.length} METHODS</div>
                    </div>
                  </div>

                  {/* One section per function */}
                  {members.map((node, i) => {
                    const col = SECTION_ACCENT_COLORS[i % SECTION_ACCENT_COLORS.length];
                    const codeLines = (node.code || '# empty').split('\n');
                    const highlighted = highlightCode(node.code || '# empty');
                    const synVars = getSynVars(col);

                    return (
                      <div key={node.id} id={'fn-block-' + node.id} className="grp-fn-section"
                        style={{borderLeftColor: activeId===node.id ? col+'44' : 'transparent', borderLeftWidth:'3px', borderLeftStyle:'solid'}}>

                        {/* ─ Section header (labeled box style like reference image) ─ */}
                        <div className="grp-fn-header" style={{background: col + '08', borderBottomColor: col + '18'}}>
                          {/* Index badge */}
                          <div className="grp-fn-num" style={{background: col + '18', color: col}}>
                            {String(i+1).padStart(2,'0')}
                          </div>
                          {/* Name + subtitle */}
                          <div className="grp-fn-name-col">
                            <div className="grp-fn-title" style={{color: col}}>{node.label}</div>
                            <div className="grp-fn-subtitle">
                              def {node.label.replace('.py','').replace('.js','')}(self)  ·  {codeLines.length} lines  ·  {node.type}
                            </div>
                          </div>
                          {/* Type badge */}
                          <div className="grp-fn-badge" style={{color: col, borderColor: col + '55'}}>
                            {node.type.toUpperCase()}
                          </div>
                          {/* Modified indicator */}
                          {node.modified && (
                            <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'8px', color:'#ffc410', flexShrink:0}}>
                              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410'}}/>
                              UNSAVED
                            </div>
                          )}
                          <span className="grp-fn-lines-meta">{codeLines.length}L</span>
                          {/* Open in editor btn */}
                          <button className="grp-fn-open-btn" style={{borderColor: col + '44', color: col}}
                            onClick={() => onOpenNode(node.id)}>
                            OPEN FILE →
                          </button>
                        </div>

                        {/* ─ Code block ─ */}
                        <div className="grp-fn-codewrap" ref={el => { if(el) Object.entries(synVars).forEach(([k,v]) => el.style.setProperty(k,v)); }}>
                          {/* Line numbers */}
                          <div className="grp-fn-linenums">
                            {codeLines.map((_, li) => (
                              <div key={li} style={{lineHeight:'1.65', color: li===0 ? col+'55' : 'rgba(255,255,255,0.1)'}}>{li+1}</div>
                            ))}
                          </div>
                          {/* Highlighted code */}
                          <pre className="grp-fn-code editor-palette-scope"
                            dangerouslySetInnerHTML={{__html: highlighted}}
                          />
                        </div>

                      </div>
                    );
                  })}

                  {/* Bottom padding */}
                  <div style={{height:'40px'}}/>
                </div>

                {/* Status bar */}
                <div className="grp-statusbar">
                  <span style={{color: accent, fontWeight:'bold'}}>{group.name}</span>
                  <span style={{opacity:0.25}}>·</span>
                  <span>{members.length} functions assembled</span>
                  <span style={{opacity:0.25}}>·</span>
                  <span>READ-ONLY CLASS VIEW</span>
                  <span style={{opacity:0.25}}>·</span>
                  <span>{totalLines} total lines</span>
                  <span style={{marginLeft:'auto', opacity:0.3}}>FORBINDEN // CLASS ASSEMBLY</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════════════
    //  MAIN IDE
    // ═══════════════════════════════════════════════════════════════
    function IDE({ initialTheme, initialAvatar }) {
      const wsHook = useWorkspace();
      const [themeMode, setThemeMode] = useState('cyber');
      const nodesRef = useRef(JSON.parse(JSON.stringify(INITIAL_NODES)));
      const edgesRef = useRef(INITIAL_EDGES);
      const [, forceRender] = useState({});
      const [transform, setTransform] = useState({ x: window.innerWidth/2, y: window.innerHeight/2, scale:1 });
      const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
      const [sidebarMode, setSidebarMode] = useState("files");
      const [bottomPanelTab, setBottomPanelTab] = useState('timeline');
      const [openTabs, setOpenTabs] = useState([]);
      const [activeTabId, setActiveTabId] = useState(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [avatarIndex, setAvatarIndex] = useState(initialAvatar);
      const [repoUrl, setRepoUrl] = useState('');
      const [playheadPos, setPlayheadPos] = useState(400);
      const [activeVersionName, setActiveVersionName] = useState('v1.4 (HEAD)');
      const [showCmd, setShowCmd] = useState(false);
      const [showCreateNode, setShowCreateNode] = useState(false);
      const [newNodeName, setNewNodeName] = useState('');
      const [newNodeType, setNewNodeType] = useState('function');
      const [newNodeColor, setNewNodeColor] = useState(1);
      const [showCreateGroup, setShowCreateGroup] = useState(false);
      const [groupName, setGroupName] = useState('');
      const [groupColor, setGroupColor] = useState('#10b981');
      const [groupSelected, setGroupSelected] = useState([]);
      const [board, setBoard] = useState(INITIAL_BOARD);
      const [focusCard, setFocusCard] = useState(null);
      const [newCardCol, setNewCardCol] = useState(null);
      const [newCardTitle, setNewCardTitle] = useState('');
      const [hoveredNodeId, setHoveredNodeId] = useState(null);
      const [openGroupId, setOpenGroupId] = useState(null);  // which group editor is open
      // Edge edit mode: 'join' = click two nodes to connect, 'cut' = click edge to delete, null = normal
      const [edgeMode, setEdgeMode] = useState(null); // null | 'join' | 'cut'
      const [joinFirstNode, setJoinFirstNode] = useState(null);
      const [hoveredEdgeId, setHoveredEdgeId] = useState(null);
      // Per-node inline color picker - store {nodeId, x, y} for portal positioning
      const [nodeColorPicker, setNodeColorPicker] = useState(null); // {nodeId, x, y} | null
      const [termLines, setTermLines] = useState([
        {c:'#28f1c3', t:'[FORBINDEN] System boot v2.1.0'},
        {c:'#9494b0', t:'[WS] Connected to local daemon — port 7291'},
        {c:'#9494b0', t:'[GIT] Tracking branch: main (4 commits ahead)'},
        {c:'#ffc410', t:'[WARN] 1 file with uncommitted changes'},
        {c:'#9494b0', t:'Ready.'},
      ]);
      const [termInput, setTermInput] = useState('');
      const [termPalette, setTermPalette] = useState(TERM_PALETTES[0]);
      const [showTermPalette, setShowTermPalette] = useState(false);
      const [chatInput, setChatInput] = useState('');
      const [chatMessages, setChatMessages] = useState([
        {id:1, from:'System', time:'now', text:'Sync established. 4 nodes active.', self:false},
        {id:2, from:'Op-2', time:'2m', text:'Pushing DataMatrix refactor.', self:false},
        {id:3, from:'You', time:'1m', text:'Architecture booted. Running tests.', self:true},
      ]);
      const [notesText, setNotesText] = useState('// OPERATOR NOTES\n// Sprint-01 planning\n\nTODO:\n- Finish graph force simulation\n- Wire WebSocket protocol\n- Add color palette persistence\n');
      const chatEndRef = useRef(null);
      // Global code editor palette — shared across all editor instances
      const [globalEditorPalette, setGlobalEditorPalette] = useState(PALETTES[0]);
      const groupsRef = useRef(JSON.parse(JSON.stringify(INITIAL_GROUPS)));
      const draggingNodeRef = useRef(null);
      const lastMousePos = useRef({ x:0, y:0 });
      const playheadDragRef = useRef({ isDragging:false });
      const termEndRef = useRef(null);
      const saveCodeTimerRef = useRef({});  // debounce timers per nodeId

      useEffect(() => { termEndRef.current?.scrollIntoView({behavior:'smooth'}); }, [termLines]);
      useEffect(() => { chatEndRef.current?.scrollIntoView({behavior:'smooth'}); }, [chatMessages]);

      // Load workspace data from API when ready
      useEffect(() => {
        if (wsHook.loading || wsHook.error) return;
        if (wsHook.nodes.length > 0) {
          nodesRef.current = wsHook.nodes.map(n => ({
            id: n.id, label: n.label, filepath: n.filepath,
            type: n.type || 'function', isMain: n.is_main,
            x: n.x || 0, y: n.y || 0, vx: 0, vy: 0,
            themeIdx: n.theme_idx || 0, classId: n.class_id,
            code: '', modified: n.modified || false,
          }));
          edgesRef.current = wsHook.edges.map(e => ({ id: e.id, source: e.source, target: e.target }));
          groupsRef.current = wsHook.groups.map(g => ({
            id: g.id, name: g.name, color: g.color, nodeIds: g.node_ids || [],
          }));
          forceRender({});
        }
        if (wsHook.columns.length > 0) {
          setBoard({
            cols: wsHook.columns.map(c => ({ id: c.id, title: c.title, color: c.color })),
            cards: wsHook.cards.map(k => ({
              id: k.id, colId: k.col_id, title: k.title, priority: k.priority,
              tags: k.tags || [], progress: k.progress || 0, due: k.due || null,
              assignee: k.assignee_idx ?? null,
            })),
          });
        }
      }, [wsHook.loading]);

      useEffect(() => {
        const handler = (e) => {
          // Don't trigger shortcuts when typing in inputs
          const tag = e.target.tagName;
          const inInput = tag==='INPUT'||tag==='TEXTAREA'||e.target.contentEditable==='true';
          if ((e.metaKey||e.ctrlKey) && e.key==='p') { e.preventDefault(); setShowCmd(v=>!v); }
          if (e.key==='Escape') { setShowCmd(false); setOpenGroupId(null); setEdgeMode(null); setJoinFirstNode(null); setNodeColorPicker(null); setShowTermPalette(false); if (!openGroupId) setActiveTabId(null); }
          if (!inInput) {
            if (e.key==='n'||e.key==='N') setShowCreateNode(true);
            if (e.key==='g'||e.key==='G') { setShowCreateGroup(true); setGroupSelected([]); }
            if (e.key==='`'||e.key==='~') setBottomPanelTab(v=>v==='terminal'?null:'terminal');
            if (e.key==='j'||e.key==='J') setEdgeMode(m=>m==='join'?null:'join');
            if (e.key==='x'||e.key==='X') setEdgeMode(m=>m==='cut'?null:'cut');
            if (e.key==='Delete'||e.key==='Backspace') { if(hoveredNodeId){ const nid=hoveredNodeId; nodesRef.current=nodesRef.current.filter(n=>n.id!==nid); edgesRef.current=edgesRef.current.filter(e=>e.source!==nid&&e.target!==nid); forceRender({}); wsHook.deleteNode(nid).catch(()=>{}); } }
          }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
      }, [openGroupId, hoveredNodeId]);

      const filteredSearch = nodesRef.current.filter(n => { const q = searchQuery.trim().toLowerCase(); if (!q) return true; return (n.label||'').toLowerCase().includes(q) || (n.code||'').toLowerCase().includes(q); });
      const modifiedNodes = nodesRef.current.filter(n => n.modified);
      const visibleNodes = nodesRef.current.filter(n => { if (n.id==='n1' && playheadPos<100) return false; if (n.id==='n3' && playheadPos<250) return false; return true; });
      const visibleEdges = edgesRef.current.filter(e => visibleNodes.find(n=>n.id===e.source) && visibleNodes.find(n=>n.id===e.target));

      // Manga images available throughout the IDE
      const MANGA_IMGS = [
        'Guts.jpeg','Guts%20And%20Zodd%2C%20DON.jpeg','Killua.jpeg','Inumaki.jpeg',
        'Mob%20psycho%20100.jpeg','Sukuna%E2%80%9D.jpeg','Monster.jpeg','Whitebeard.jpeg',
        'Roronoa%20Zoro.jpeg','Reze.jpeg','Soul%20King%20Brook.jpeg','Fire%20Punch.jpeg',
        'PANTHEON.jpeg','CHAOS%20SMILE.jpeg','Corridor.jpeg','Thorfinn%20_%20Vinland%20saga.jpeg',
        'Choujin%20X.jpeg','Dandadan%20_%20%40lihaolow%20%E2%80%A2%20tw%20%E2%98%86.jpeg',
        'Denj%20-%20Chainsaw%20Man_.jpeg','%23chainsawman.jpeg',
        'Makima%21%20%F0%9F%A9%B8__%23Makima%20%23ChainsawMan_%23ChainsawManFanart%20%23AnimeArt_%23DigitalPainting.jpeg',
        'THE%20CONTROL%20DEVIL%20_%20GRAPHIC%20DESIGN.jpeg','The%20Weeknd%20x%20Chainsaw%20Man.jpeg',
        'Kagurabachi%20X%20Bleach.jpeg','Kisuke%20Urahara%20%5BBleach%5D%20Poster.jpeg',
        'Nelliel%20Brutalism.jpeg','One%20Piece%20Magazines.jpeg',
        'Buggy%2C%20Sir%20Crocodile%20%26%20Mihawk%20-%20One%20Piece.jpeg',
        'Marco%20one%20piece.jpeg','God%20Valley.jpeg','Corazon%20%F0%9F%92%94.jpeg',
        'Goodbye%20Merry%20_%20%40IfihasR5%20%E2%80%A2%20tw%20_%27%29.jpeg',
        'ONE%20PIECE%20NOVEL%20LAW_%20CH_%201.jpeg','One%20piece%20wano%20x%20Gta.jpeg',
        'Hunter%20%C3%97%20Hunter%20Volume%2011%20Cover.jpeg','Black%20Clover.jpeg',
        'ANIME%20POSTERS%20-%20Sergey%20Zhikin.jpeg','MATT%20TAYLOR.jpeg',
        'Slam%20Dunk%20Manga%20New%20Edition%20Cover%20Art%20%E2%80%93%20All%2020%20Covers.jpeg',
        'SUBWAY%20DIMENSIONS.jpeg','Burning%20-%20Inspired%20by%20Van%20Gogh.jpeg',
        'VOGUE.jpeg','VOGUE%20%281%29.jpeg','Sight%20-%20SKJEGG.jpeg',
        'Queen%20Marika%20the%20Eternal.jpeg','R99%202_1%20Poster.jpeg','R99%202_5%20Poster.jpeg',
        'Kyora%20Sazanami%20Poster.jpeg','Shugen%20jikka%20Kiyomaru.jpeg',
        'Best%20_GOODNIGHT%20PUNPUN_%20Fan%20Graphic%20Cover%20_%20Poster%F0%9F%92%AA.jpeg',
        'Poster%20-%20Veil.jpeg','Credit_%20Twitter%20%40avenoirn.jpeg',
        'AdriGold%20%F0%9F%8D%8A%20%28%40GoldDAdri_%29%20on%20X.jpeg',
        'Mess%F0%9F%8C%BF%20%28%40Messcult%29%20on%20X.jpeg','Ai%2C%20Feel%20free%20to%20use.jpeg',
        'Rei_%29%20%28not%20my%20art%29.jpeg',
        '1997_%20The%20start%20of%20an%20adventure%20%E2%98%A0%EF%B8%8F%F0%9F%8F%9D.jpeg',
        'Portada%20del%20primer%20n%C3%BAmero%20de%20One%20punch%20man_%20Es%20veu%20al%20seu%20protagonista.jpeg',
        'Choujin%20X%20Vol_%2012.jpeg','Choujin%20X%20Volume%2014.jpeg','Choujin%20X%20Volume%203.jpeg',
        'Makimq%20is%20listening%20%F0%9F%A4%AB_%20Social%20Poster%20design%20%23Anime%20%23Poster.jpeg',
        'SONS%20OF%20THE%20DEVIL%20Covers%201-5%20-%20toni%20infante.jpeg',
        'Poster%20One%20Piece%20-%20Wanted%20Whitebeard%2061x91%2C5cm%20_%20bol.jpeg',
      ];

      const activeNode = nodesRef.current.find(n=>n.id===(activeTabId||hoveredNodeId));
      const activeZoneKey = activeNode ? ZONES[activeNode.themeIdx%ZONES.length] : 'default';
      const activeTabNode = nodesRef.current.find(n=>n.id===activeTabId);
      const wrapperClass = `app-wrapper ${themeMode==='brutal'?'theme-brutal':'theme-cyber'} zone-${activeZoneKey}`;
      const outerBg = themeMode==='brutal' ? '#f0ece0' : '#030308';

      // Force simulation
      useEffect(() => {
        let rafId;
        const tick = () => {
          let updated = false;
          const nodes = nodesRef.current, edges = edgesRef.current;
          for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
            const dx=nodes[j].x-nodes[i].x, dy=nodes[j].y-nodes[i].y;
            const distSq=dx*dx+dy*dy||1, dist=Math.sqrt(distSq), force=4200/distSq;
            nodes[i].vx-=(dx/dist)*force; nodes[i].vy-=(dy/dist)*force;
            nodes[j].vx+=(dx/dist)*force; nodes[j].vy+=(dy/dist)*force;
          }
          edges.forEach(edge => {
            const src=nodes.find(n=>n.id===edge.source), tgt=nodes.find(n=>n.id===edge.target);
            if(!src||!tgt)return;
            const dx=tgt.x-src.x, dy=tgt.y-src.y, dist=Math.sqrt(dx*dx+dy*dy)||1, force=(dist-145)*0.05;
            src.vx+=(dx/dist)*force; src.vy+=(dy/dist)*force;
            tgt.vx-=(dx/dist)*force; tgt.vy-=(dy/dist)*force;
          });
          nodes.forEach(n => {
            const p=n.isMain?0.2:0.005; n.vx+=(0-n.x)*p; n.vy+=(0-n.y)*p;
            n.vx*=0.8; n.vy*=0.8; n.x+=n.vx; n.y+=n.vy;
            if(Math.abs(n.vx)>0.05||Math.abs(n.vy)>0.05)updated=true;
          });
          if (draggingNodeRef.current) { const d=nodes.find(n=>n.id===draggingNodeRef.current.id); if(d){d.x=draggingNodeRef.current.x;d.y=draggingNodeRef.current.y;d.vx=0;d.vy=0;updated=true;} }
          if (updated) forceRender({});
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
      }, []);

      const handlePlayheadDown = (e) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); playheadDragRef.current={isDragging:true,startX:e.clientX,startPos:playheadPos}; };
      const handlePlayheadMove = (e) => {
        if(!playheadDragRef.current.isDragging)return;
        const newPos=Math.max(0,Math.min(playheadDragRef.current.startPos+(e.clientX-playheadDragRef.current.startX),1150));
        setPlayheadPos(newPos);
        const ver=newPos<100?'v1.0':newPos<220?'v1.1':newPos<250?'v1.2':newPos<380?'v1.3':'v1.4 (HEAD)';
        setActiveVersionName(ver);
      };
      const handlePlayheadUp = (e) => { playheadDragRef.current.isDragging=false; e.currentTarget.releasePointerCapture(e.pointerId); };

      const handleCanvasPointerDown = (e) => { 
        if(edgeMode) return; // don't pan canvas in edge mode
        if(e.target.closest('.obs-node-wrapper')||e.target.closest('.floating-panel'))return; 
        setNodeColorPicker(null);
        setIsDraggingCanvas(true); lastMousePos.current={x:e.clientX,y:e.clientY}; 
      };
      const handleCanvasPointerMove = (e) => {
        if(isDraggingCanvas){const dx=e.clientX-lastMousePos.current.x,dy=e.clientY-lastMousePos.current.y;setTransform(p=>({...p,x:p.x+dx,y:p.y+dy}));lastMousePos.current={x:e.clientX,y:e.clientY};}
        else if(draggingNodeRef.current && !edgeMode){
          const dx=(e.clientX-lastMousePos.current.x)/transform.scale,dy=(e.clientY-lastMousePos.current.y)/transform.scale;
          if(Math.abs(dx)>1||Math.abs(dy)>1)draggingNodeRef.current.hasDragged=true;
          draggingNodeRef.current.x+=dx;draggingNodeRef.current.y+=dy;lastMousePos.current={x:e.clientX,y:e.clientY};
        }
      };
      const handleCanvasPointerUp = () => {
        setIsDraggingCanvas(false);
        const dr = draggingNodeRef.current;
        if (dr?.hasDragged) {
          // Save position after drag ends
          wsHook.savePositions([{id:dr.id,x:dr.x,y:dr.y}]).catch(()=>{});
        }
        draggingNodeRef.current=null;
      };
      const handleWheel = (e) => {
        if(e.target.closest('.code-area')||e.target.closest('.floating-panel')||e.target.closest('.nle-wrap'))return;
        e.preventDefault();
        setTransform(p=>({...p,scale:Math.min(Math.max(0.3,p.scale*(e.deltaY>0?0.9:1.1)),2.5)}));
      };
      const openNodeInEditor = (id) => { setOpenTabs(t=>t.includes(id)?t:[...t,id]); setActiveTabId(id); };
      const openGroupEditor = (gid) => { setOpenGroupId(gid); };
      const closeGroupEditor = () => setOpenGroupId(null);

      const handleCreateNode = async () => {
        if(!newNodeName.trim())return;
        const slug=newNodeName.trim().replace(/\s+/g,'_');
        const x=(Math.random()-.5)*300, y=(Math.random()-.5)*300;
        const code='def '+slug+'():\n    pass';
        // Optimistic local update
        const tempId='n'+Date.now();
        nodesRef.current=[...nodesRef.current,{id:tempId,label:slug+'.py',filepath:slug+'.py',type:newNodeType,isMain:false,x,y,vx:0,vy:0,themeIdx:newNodeColor,classId:null,code,modified:false}];
        setShowCreateNode(false);setNewNodeName('');forceRender({});
        // Persist to API
        wsHook.createNode(slug+'.py', { filepath:slug+'.py', type:newNodeType, x, y, theme_idx:newNodeColor, code }).then(n => {
          if (n) nodesRef.current = nodesRef.current.map(nd => nd.id===tempId ? {...nd, id:n.id} : nd);
        }).catch(()=>{});
      };

      const handleCreateGroup = () => {
        if(!groupName.trim()||groupSelected.length<2)return;
        const gid='g'+Date.now();
        groupsRef.current=[...groupsRef.current,{id:gid,name:groupName.trim(),color:groupColor,nodeIds:[...groupSelected]}];
        nodesRef.current=nodesRef.current.map(n=>groupSelected.includes(n.id)?{...n,classId:gid}:n);
        setShowCreateGroup(false);setGroupName('');setGroupSelected([]);forceRender({});
        if (wsHook.workspace) wsHook.createGroup(groupName.trim(), groupColor, [...groupSelected]).catch(()=>{});
      };

      const dissolveGroup = (gid) => {
        groupsRef.current=groupsRef.current.filter(g=>g.id!==gid);
        nodesRef.current=nodesRef.current.map(n=>n.classId===gid?{...n,classId:null}:n);
        if(openGroupId===gid) setOpenGroupId(null);
        forceRender({});
        if (wsHook.workspace) wsHook.deleteGroup(gid).catch(()=>{});
      };

      const handleNodeClickInMode = (nodeId) => {
        if (edgeMode === 'join') {
          if (!joinFirstNode) { setJoinFirstNode(nodeId); return; }
          if (joinFirstNode === nodeId) { setJoinFirstNode(null); return; }
          // check edge doesn't already exist
          const exists = edgesRef.current.find(e=>(e.source===joinFirstNode&&e.target===nodeId)||(e.source===nodeId&&e.target===joinFirstNode));
          if (!exists) { const src=joinFirstNode,tgt=nodeId,tempEdge={id:'e'+Date.now(),source:src,target:tgt}; edgesRef.current=[...edgesRef.current,tempEdge]; forceRender({}); wsHook.createEdge(src,tgt).catch(()=>{}); }
          setJoinFirstNode(null);
        }
      };
      const handleEdgeClickInMode = (edgeId) => {
        if (edgeMode === 'cut') { edgesRef.current=edgesRef.current.filter(e=>e.id!==edgeId); forceRender({}); wsHook.deleteEdge(edgeId).catch(()=>{}); }
      };
      const handleChangeNodeColor = (nodeId, colorIdx) => {
        nodesRef.current = nodesRef.current.map(n => n.id===nodeId ? {...n, themeIdx:colorIdx} : n);
        setNodeColorPicker(null); forceRender({});
      };

      const addCard = (colId) => {
        if(!newCardTitle.trim()) return;
        const title = newCardTitle.trim();
        const newCard = {id:'k'+Date.now(), colId, title, priority:'MED', tags:[], progress:0, due:'', assignee:avatarIndex};
        setBoard(b=>({...b, cards:[...b.cards, newCard]}));
        setNewCardCol(null); setNewCardTitle('');
        if (wsHook.workspace) wsHook.createCard(colId, title, {priority:'MED', tags:[], progress:0, assignee_idx:avatarIndex}).catch(()=>{});
      };
      const moveCard = (cardId, colId) => {
        setBoard(b=>({...b, cards:b.cards.map(c=>c.id===cardId?{...c,colId}:c)}));
        if (wsHook.workspace) wsHook.updateCard(cardId, {col_id:colId}).catch(()=>{});
      };
      const updateCard = (cardId, patch) => {
        setBoard(b=>({...b, cards:b.cards.map(c=>c.id===cardId?{...c,...patch}:c)}));
        if (wsHook.workspace) {
          const apiPatch = {...patch};
          if ('colId' in apiPatch) { apiPatch.col_id = apiPatch.colId; delete apiPatch.colId; }
          wsHook.updateCard(cardId, apiPatch).catch(()=>{});
        }
      };
      const deleteCard = (cardId) => {
        setBoard(b=>({...b, cards:b.cards.filter(c=>c.id!==cardId)}));
        setFocusCard(null);
        if (wsHook.workspace) wsHook.deleteCard(cardId).catch(()=>{});
      };

      const handleTermInput = (e) => {
        if(e.key!=='Enter')return; const cmd=termInput.trim(); if(!cmd)return;
        let resp=[{c:'#9494b0',t:`$ ${cmd}`}];
        if(cmd==='help') resp.push({c:'#28f1c3',t:'Commands: ls, clear, git status, node list, edges, groups'});
        else if(cmd==='ls'||cmd==='node list') resp.push({c:'#c0c8d8',t:nodesRef.current.map(n=>n.label).join('  ')});
        else if(cmd==='edges') resp.push({c:'#c0c8d8',t:edgesRef.current.map(e=>`${e.source}→${e.target}`).join('  ')||'No edges.'});
        else if(cmd==='groups') resp.push({c:'#c0c8d8',t:groupsRef.current.map(g=>`${g.name}(${g.nodeIds.length})`).join('  ')||'No groups.'});
        else if(cmd==='clear'){setTermLines([]);setTermInput('');return;}
        else if(cmd==='git status') resp.push({c:modifiedNodes.length?'#ffc410':'#10b981',t:modifiedNodes.length?`${modifiedNodes.length} modified: ${modifiedNodes.map(n=>n.label).join(', ')}`:'Working tree clean.'});
        else if(cmd==='git log') { resp.push({c:'#4285f4',t:'commit a3f2c1d (HEAD -> main)'}); resp.push({c:'#9494b0',t:'  Date: '+new Date().toDateString()}); resp.push({c:'#c0c8d8',t:'  feat: FORBINDEN IDE v2'}); }
        else resp.push({c:'#ff435a',t:`command not found: ${cmd}`});
        setTermLines(l=>[...l,...resp]); setTermInput('');
      };

      const handleCmdAction = (label) => {
        if(!label) return;
        if(label.includes('New file node')) setShowCreateNode(true);
        else if(label.includes('New class group')){ setShowCreateGroup(true); setGroupSelected([]); }
        
        else if(label.includes('terminal')) setBottomPanelTab('terminal');
        else if(label.includes('board')) setSidebarMode('board');
        else if(label.includes('Join nodes')) setEdgeMode(m=>m==='join'?null:'join');
        else if(label.includes('Cut edge')) setEdgeMode(m=>m==='cut'?null:'cut');
        setShowCmd(false);
      };

      const nodeCount = nodesRef.current.length;
      const edgeCount = edgesRef.current.length;
      const PC = {HIGH:'#ff435a',MED:'#ffc410',LOW:'#4285f4',DONE:'#10b981'};

      // Which group is open in the editor
      const openGroup = groupsRef.current.find(g => g.id === openGroupId) || null;

      return (
        <div style={{width:'100vw',height:'100vh',padding:'0px',backgroundColor:outerBg,transition:'background 0.4s',boxSizing:'border-box'}}>
          <div className={wrapperClass}>

            {/* HEADER — Manga Chapter Strip */}
            <style>{`
              @keyframes fblink { 50% { opacity:0; } }
              @keyframes fpulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
              @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@700&display=swap');
            `}</style>
            {themeMode === 'brutal' ? (
              /* BRUTALIST — light manga chapter header */
              <div style={{
                height:'54px', background:'#0a0a0a', flexShrink:0,
                display:'flex', alignItems:'center', padding:'0 1rem', gap:'0.8rem',
                borderBottom:'4px solid #0a0a0a', zIndex:20, position:'relative',
                fontFamily:"'Share Tech Mono','JetBrains Mono',monospace",
              }}>
                {/* Logo */}
                <div style={{fontFamily:"'Bangers','Bebas Neue',sans-serif",fontSize:'1.7rem',letterSpacing:'0.1em',color:'#f4f0e8',lineHeight:1,flexShrink:0}}>
                  FOR<span style={{color:'#d0021b'}}>BID</span>EN
                </div>
                <div style={{width:'3px',height:'28px',background:'#d0021b',flexShrink:0}}/>
                {/* Breadcrumb caption box */}
                <div style={{display:'flex',alignItems:'center',gap:'4px',flex:1,minWidth:0,overflow:'hidden'}}>
                  {activeTabNode ? (
                    <div style={{background:'#f5c518',color:'#0a0a0a',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.48rem',letterSpacing:'0.15em',padding:'2px 8px',border:'2px solid #f5c518',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                      {activeTabNode.label} <span style={{opacity:0.6,fontWeight:400}}>// {activeTabNode.type}</span>
                    </div>
                  ) : (
                    <div style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.3)',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.46rem',letterSpacing:'0.15em',padding:'2px 8px',border:'2px solid rgba(255,255,255,0.08)'}}>NO FILE OPEN</div>
                  )}
                </div>
                {/* Stats captions */}
                <div style={{display:'flex',alignItems:'center',gap:'4px',flexShrink:0}}>
                  <div style={{background:'#d0021b',color:'#f4f0e8',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.4rem',letterSpacing:'0.12em',padding:'2px 7px'}}>
                    {nodeCount} NODES
                  </div>
                  <div style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.5)',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.4rem',letterSpacing:'0.12em',padding:'2px 7px'}}>
                    {edgesRef.current.length} EDGES
                  </div>
                  {modifiedNodes.length>0 && <div style={{background:'#f5c518',color:'#0a0a0a',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.4rem',letterSpacing:'0.12em',padding:'2px 7px'}}>{modifiedNodes.length} UNSAVED</div>}
                </div>
                {/* Right actions */}
                <div style={{display:'flex',gap:'4px',alignItems:'center',flexShrink:0}}>
                  <button onClick={()=>setShowCreateNode(true)} style={{background:'#d0021b',border:'2px solid #d0021b',color:'#f4f0e8',padding:'0.22rem 0.7rem',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.44rem',letterSpacing:'0.12em',cursor:'pointer',transition:'all 0.15s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='#a50014';}} onMouseLeave={e=>{e.currentTarget.style.background='#d0021b';}}>+ NODE</button>
                  <button onClick={()=>setShowCmd(true)} style={{background:'transparent',border:'2px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.5)',padding:'0.22rem 0.7rem',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.44rem',letterSpacing:'0.12em',cursor:'pointer',transition:'all 0.15s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='#f5c518';e.currentTarget.style.color='#f5c518';}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.color='rgba(255,255,255,0.5)';}}>⌘P</button>
                  {/* Avatar */}
                  <div onClick={()=>setSidebarMode(s=>s==='settings'?null:'settings')} style={{cursor:'pointer',width:'32px',height:'32px',border:`2px solid ${sidebarMode==='settings'?'#d0021b':'rgba(255,255,255,0.2)'}`,overflow:'hidden',transition:'border-color 0.15s',flexShrink:0}}>
                    <img src={`/avatars/0xAV0${String((avatarIndex%6)+1).padStart(2,'0')}s.jpeg`} alt="op" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                </div>
              </div>
            ) : (
              /* FORSAKEN — dark manga cyber header */
              <div style={{
                display:'flex', alignItems:'center', padding:'0 1.2rem', height:'52px', flexShrink:0,
                background:'rgba(3,3,8,0.96)', backdropFilter:'blur(16px)',
                borderBottom:'1px solid rgba(255,42,56,0.22)',
                boxShadow:'0 2px 20px rgba(0,0,0,0.7)',
                zIndex:20, fontFamily:"'Share Tech Mono','JetBrains Mono',monospace",
                position:'relative',
              }}>
                {/* Screentone strip */}
                <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'5px 5px'}}/>
                {/* Logo */}
                <div style={{fontFamily:"'Bangers','Bebas Neue',sans-serif",fontSize:'1.3rem',letterSpacing:'0.12em',color:'#f4f0e8',lineHeight:1,marginRight:'1rem',flexShrink:0,position:'relative'}}>
                  FOR<span style={{color:'#ff2a38'}}>BID</span>EN<span style={{color:'#ff2a38',animation:'fblink 1s infinite'}}>_</span>
                </div>
                <div style={{width:'1px',height:'20px',background:'rgba(255,42,56,0.25)',marginRight:'1rem'}}/>
                {/* Breadcrumb */}
                <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'0.5rem',color:'#8a8aaa',letterSpacing:'0.1em',flex:1,minWidth:0,overflow:'hidden',position:'relative'}}>
                  <span style={{color:'rgba(255,255,255,0.18)',flexShrink:0}}>workspace</span>
                  <span style={{color:'rgba(255,42,56,0.3)',flexShrink:0}}>/</span>
                  {activeTabNode
                    ? <><span style={{color:AVATAR_ACCENTS[activeTabNode.themeIdx%AVATAR_ACCENTS.length],overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{activeTabNode.label}</span><span style={{opacity:0.3,marginLeft:'6px',flexShrink:0}}>{activeTabNode.type}</span></>
                    : <span style={{opacity:0.18}}>no file open</span>
                  }
                </div>
                {/* Stats */}
                <div style={{display:'flex',alignItems:'center',gap:'0.8rem',fontSize:'0.44rem',color:'#8a8aaa',letterSpacing:'0.1em',marginRight:'1rem',flexShrink:0,position:'relative'}}>
                  <span style={{display:'flex',alignItems:'center',gap:'4px'}}>
                    <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#00ff55',display:'inline-block',animation:'fpulse 2s infinite'}}/>
                    {nodeCount} NODES
                  </span>
                  <span style={{color:'rgba(255,255,255,0.1)'}}>|</span>
                  <span>{edgesRef.current.length} EDGES</span>
                  {modifiedNodes.length>0 && <><span style={{color:'rgba(255,255,255,0.1)'}}>|</span><span style={{color:'#ccff00'}}>{modifiedNodes.length} UNSAVED</span></>}
                </div>
                {/* Right */}
                <div style={{display:'flex',gap:'0.4rem',alignItems:'center',flexShrink:0,position:'relative'}}>
                  <button onClick={()=>setShowCreateNode(true)} style={{background:'transparent',border:'1px solid rgba(255,42,56,0.4)',color:'#ff2a38',padding:'0.22rem 0.65rem',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.44rem',letterSpacing:'0.1em',cursor:'pointer',transition:'all 0.2s',textTransform:'uppercase'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,42,56,0.08)';}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}>+ NODE</button>
                  <button onClick={()=>setShowCmd(true)} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.08)',color:'#8a8aaa',padding:'0.22rem 0.65rem',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.44rem',letterSpacing:'0.1em',cursor:'pointer',transition:'all 0.2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.color='#f5f2eb';}} onMouseLeave={e=>{e.currentTarget.style.color='#8a8aaa';}}>⌘P</button>
                  <div onClick={()=>setSidebarMode(s=>s==='settings'?null:'settings')} style={{cursor:'pointer',width:'30px',height:'30px',border:`1px solid ${sidebarMode==='settings'?'#ff2a38':'rgba(255,255,255,0.12)'}`,overflow:'hidden',transition:'border-color 0.2s',flexShrink:0}}>
                    <img src={`/avatars/0xAV0${String((avatarIndex%6)+1).padStart(2,'0')}s.jpeg`} alt="op" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                </div>
              </div>
            )}

            <div className="app-body">
              {/* SIDEBAR */}
              <div className="sidebar">
                {/* Top group: file/search/git/chat/notes/board */}
                <div style={{display:'flex',flexDirection:'column',gap:'2px',width:'100%',alignItems:'center',paddingTop:'6px'}}>
                  {[
                    ['files',   'EXPLORER',       <I.Files/>],
                    ['search',  'SEARCH',          <I.Search/>],
                    ['git',     'SOURCE CONTROL',  <><I.Git/>{modifiedNodes.length>0&&<div className="badge">{modifiedNodes.length}</div>}</>],
                    ['chat',    'COMMS',            <I.Message/>],
                    ['note',    'NOTES',            <I.Note/>],
                    ['board',   'BOARD',            <I.Board/>],
                  ].map(([mode,tip,icon])=>(
                    <div key={mode} className={`strip-icon ${sidebarMode===mode?'active':''}`} onClick={()=>setSidebarMode(s=>s===mode?null:mode)}>
                      {icon}<div className="strip-icon-tooltip">{tip}</div>
                    </div>
                  ))}
                </div>

                {/* Manga image thumbnail strip in sidebar */}
                <div style={{flex:1,display:'flex',flexDirection:'column',gap:'1px',overflow:'hidden',padding:'3px 0',alignItems:'center'}}>
                  {MANGA_IMGS.slice(20,26).map((img,i)=>(
                    <div key={i} style={{width:'32px',height:'32px',flexShrink:0,overflow:'hidden',border:'1px solid rgba(128,128,128,0.2)',cursor:'pointer',opacity:0.7}}
                      onMouseEnter={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='scale(1.05)';}}
                      onMouseLeave={e=>{e.currentTarget.style.opacity='0.7';e.currentTarget.style.transform='scale(1)';}}>
                      <img src={`/manga/${img}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
                    </div>
                  ))}
                </div>
                {/* Divider */}
                <div style={{height:'1px',width:'26px',background:'rgba(128,128,128,0.15)',margin:'6px 0'}}/>

                {/* Timeline / Terminal toggles */}
                <div className={`strip-icon ${bottomPanelTab==='timeline'?'active':''}`} onClick={()=>setBottomPanelTab(v=>v==='timeline'?null:'timeline')}>
                  <I.Timeline/><div className="strip-icon-tooltip">TIMELINE</div>
                </div>
                <div className={`strip-icon ${bottomPanelTab==='terminal'?'active':''}`} onClick={()=>setBottomPanelTab(v=>v==='terminal'?null:'terminal')}>
                  <I.Terminal/><div className="strip-icon-tooltip">TERMINAL</div>
                </div>

                {/* Divider */}
                <div style={{height:'1px',width:'26px',background:'rgba(128,128,128,0.15)',margin:'6px 0'}}/>

                {/* Global UI palette picker */}
                <div className={`strip-icon ${sidebarMode==='uipalette'?'active':''}`} onClick={()=>setSidebarMode(s=>s==='uipalette'?null:'uipalette')} title="UI Color Zone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M2 12h20"/></svg>
                  <div className="strip-icon-tooltip">UI COLOR ZONE</div>
                </div>

                {/* Code editor palette picker */}
                <div className={`strip-icon ${sidebarMode==='codepalette'?'active':''}`} onClick={()=>setSidebarMode(s=>s==='codepalette'?null:'codepalette')} title="Code Palette">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  <div className="strip-icon-tooltip">CODE PALETTE</div>
                </div>

                {/* Divider */}
                <div style={{height:'1px',width:'26px',background:'rgba(128,128,128,0.15)',margin:'6px 0'}}/>

                {/* Avatar / workspace settings */}
                <div className={`strip-icon ${sidebarMode==='settings'?'active':''}`} onClick={()=>setSidebarMode(s=>s==='settings'?null:'settings')}
                  style={{borderRadius:'50%',padding:'0',border:sidebarMode==='settings'?'2px solid var(--border)':'2px solid transparent',marginBottom:'6px'}}>
                  <img src={`/avatars/0xAV0${String((avatarIndex%6)+1).padStart(2,"0")}s.jpeg`} alt="op" style={{width:"26px",height:"26px",objectFit:"cover"}}/><div className="strip-icon-tooltip">WORKSPACE</div>
                </div>
              </div>

              {/* FLOATING PANELS */}
              <FloatingPanel title="EXPLORER" isOpen={sidebarMode==='files'} onClose={()=>setSidebarMode(null)} defaultX={70} defaultY={70} defaultW={280} defaultH={520}>
                {/* Manga banner inside explorer */}
                <div style={{height:'120px',overflow:'hidden',position:'relative',flexShrink:0,borderBottom:'2px solid rgba(128,128,128,0.15)'}}>
                  <div style={{display:'flex',height:'100%'}}>
                    {MANGA_IMGS.slice(0,5).map((img,i)=>(
                      <div key={i} style={{flex:1,overflow:'hidden',borderRight:'1px solid rgba(128,128,128,0.1)'}}>
                        <img src={`/manga/${img}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:themeMode==='brutal'?'contrast(1.05) saturate(0.7)':'brightness(0.85) contrast(1.1) saturate(0.75)'}} loading="lazy"/>
                      </div>
                    ))}
                  </div>
                  <div style={{position:'absolute',inset:0,pointerEvents:'none',background:themeMode==='brutal'?'linear-gradient(to bottom,transparent 40%,rgba(240,236,224,0.9) 100%)':'linear-gradient(to bottom,transparent 40%,rgba(3,3,8,0.9) 100%)'}} />
                  <div style={{position:'absolute',bottom:'6px',left:'10px',fontFamily:"'Bangers',sans-serif",fontSize:'0.75rem',letterSpacing:'0.15em',color:themeMode==='brutal'?'#0f0f0f':'#f4f0e8',lineHeight:1}}>GRAPH WORKSPACE</div>
                  <div style={{position:'absolute',bottom:'6px',right:'10px',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.38rem',color:'rgba(128,128,128,0.7)'}}>{nodeCount} nodes · {edgeCount} edges</div>
                </div>
                <div style={{flex:1,overflowY:'auto'}}>
                  {visibleNodes.map(n => {
                    const grp = groupsRef.current.find(g=>g.nodeIds.includes(n.id));
                    return (
                      <div key={'e_'+n.id} className="list-item" onClick={()=>openNodeInEditor(n.id)}>
                        <I.FileIcon/><span style={{color:n.modified?'#ffc410':'inherit',flex:1}}>{n.label}</span>
                        {grp && <span style={{fontSize:'8px',color:grp.color,padding:'1px 5px',border:`1px solid ${grp.color}44`,borderRadius:'2px'}}>{grp.name}</span>}
                        {n.modified && <span className="list-item-sub">M</span>}
                      </div>
                    );
                  })}
                </div>
                <div style={{padding:'8px 12px',borderTop:'1px solid rgba(128,128,128,0.08)',display:'flex',gap:'6px'}}>
                  <button className="btn" style={{flex:1,fontSize:'9px',padding:'5px 8px'}} onClick={()=>setShowCreateNode(true)}><I.Plus/> NEW FILE</button>
                </div>
              </FloatingPanel>

              <FloatingPanel title="SEARCH" isOpen={sidebarMode==='search'} onClose={()=>setSidebarMode(null)} defaultX={70} defaultY={70} defaultW={290} defaultH={420}>
                <div style={{padding:'10px 12px',borderBottom:'1px solid rgba(128,128,128,0.1)'}}>
                  <input className="side-input" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search labels and code..." autoFocus={sidebarMode==='search'}/>
                </div>
                <div style={{padding:'6px 14px',fontSize:'9px',opacity:0.35,borderBottom:'1px solid rgba(128,128,128,0.07)'}}>{filteredSearch.length} RESULTS</div>
                <div style={{flex:1,overflowY:'auto'}}>
                  {filteredSearch.map(n => (
                    <div key={'s_'+n.id} className="list-item" onClick={()=>openNodeInEditor(n.id)}>
                      <I.FileIcon/><span style={{flex:1}}>{n.label}</span><span className="list-item-sub">{n.type}</span>
                    </div>
                  ))}
                </div>
              </FloatingPanel>

              <FloatingPanel title="SOURCE CONTROL" isOpen={sidebarMode==='git'} onClose={()=>setSidebarMode(null)} defaultX={70} defaultY={70} defaultW={270} defaultH={400}>
                <div style={{padding:'8px 12px',borderBottom:'1px solid rgba(128,128,128,0.1)',fontSize:'9px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',opacity:0.5}}><span>main ← origin/main</span><span style={{color:modifiedNodes.length?'#ffc410':'#10b981'}}>{modifiedNodes.length} changes</span></div>
                </div>
                <div style={{flex:1,overflowY:'auto'}}>
                  {modifiedNodes.length===0
                    ? <div style={{padding:'20px',opacity:0.4,fontSize:'10px',textAlign:'center'}}>Working tree clean.</div>
                    : modifiedNodes.map(n => (
                      <div key={'g_'+n.id} className="list-item" onClick={()=>openNodeInEditor(n.id)}>
                        <I.FileIcon/><span style={{color:'#ffc410',flex:1}}>{n.label}</span><span className="list-item-sub" style={{color:'#ffc410'}}>M</span>
                      </div>
                    ))}
                </div>
              </FloatingPanel>

              <FloatingPanel title="WORKSPACE" isOpen={sidebarMode==='settings'} onClose={()=>setSidebarMode(null)} defaultX={70} defaultY={window.innerHeight-420} defaultW={460} defaultH={220}>
                <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'18px',height:'100%',overflowY:'auto'}}>
                  <div>
                    <div style={{fontSize:'9px',opacity:0.4,marginBottom:'12px',letterSpacing:'1.2px'}}>OPERATOR IDENTITY</div>
                    <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
                      {[0,1,2,3,4,5].map(i=>(<CyberAvatar key={i} index={i} size={52} selected={avatarIndex===i} onClick={()=>setAvatarIndex(i)}/>))}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'flex-end'}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'9px',opacity:0.4,marginBottom:'6px',letterSpacing:'1px'}}>UPSTREAM REPO</div>
                      <input className="side-input" value={repoUrl} onChange={e=>setRepoUrl(e.target.value)} placeholder="https://github.com/..." style={{fontSize:'11px'}}/>
                    </div>
                    <button className="btn" style={{fontSize:'9px',flexShrink:0}}>SAVE</button>
                  </div>
                </div>
              </FloatingPanel>

              <FloatingPanel title="COMMUNICATIONS" isOpen={sidebarMode==='chat'} onClose={()=>setSidebarMode(null)} defaultX={360} defaultY={70} defaultW={300} defaultH={400}>
                <div className="chat-wrap">
                  <div style={{padding:'6px 12px',borderBottom:'1px solid rgba(128,128,128,0.1)',fontSize:'9px',opacity:0.4,display:'flex',gap:'10px'}}>
                    <span style={{color:'#10b981',display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#10b981'}}/> 2 online</span>
                    <span style={{marginLeft:'auto'}}>CHANNEL: #general</span>
                  </div>
                  <div className="chat-messages">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`chat-msg ${msg.self?'self':'other'}`}>
                        <span style={{opacity:0.5,fontSize:'9px'}}>{msg.from} · {msg.time}</span><br/>
                        {msg.text}
                      </div>
                    ))}
                    <div ref={chatEndRef}/>
                  </div>
                  <div className="chat-input-wrap">
                    <input className="side-input" value={chatInput} onChange={e=>setChatInput(e.target.value)}
                      onKeyDown={e=>{
                        if(e.key==='Enter'&&chatInput.trim()){
                          const msg={id:Date.now(),from:'You',time:'now',text:chatInput.trim(),self:true};
                          setChatMessages(m=>[...m,msg]);
                          setChatInput('');
                          // Auto-reply
                          setTimeout(()=>setChatMessages(m=>[...m,{id:Date.now(),from:'Op-2',time:'now',text:['Acknowledged.','Roger that.','On it.','Syncing...'][Math.floor(Math.random()*4)],self:false}]),900);
                        }
                      }}
                      placeholder="Broadcast..." style={{flex:1,fontSize:'10px'}}/>
                    <button className="btn" style={{fontSize:'9px',flexShrink:0}} onClick={()=>{
                      if(chatInput.trim()){
                        setChatMessages(m=>[...m,{id:Date.now(),from:'You',time:'now',text:chatInput.trim(),self:true}]);
                        setChatInput('');
                      }
                    }}>SEND</button>
                  </div>
                </div>
              </FloatingPanel>

              <FloatingPanel title="NOTES" isOpen={sidebarMode==='note'} onClose={()=>setSidebarMode(null)} defaultX={100} defaultY={120} defaultW={320} defaultH={480}>
                {/* Manga collage strip at top */}
                <div style={{height:'110px',overflow:'hidden',position:'relative',flexShrink:0,borderBottom:'2px solid rgba(128,128,128,0.15)'}}>
                  <style>{`.notes-manga-scroll{display:flex;animation:manga-scroll 30s linear infinite;width:max-content;}`}</style>
                  <div className="notes-manga-scroll">
                    {[...MANGA_IMGS.slice(10,20),...MANGA_IMGS.slice(10,20)].map((img,i)=>(
                      <div key={i} style={{width:'80px',height:'110px',flexShrink:0,borderRight:'1px solid rgba(128,128,128,0.15)',overflow:'hidden'}}>
                        <img src={`/manga/${img}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
                      </div>
                    ))}
                  </div>
                  <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(to bottom,transparent 60%,var(--bg,#030308) 100%)'}} />
                  <div style={{position:'absolute',bottom:'6px',left:'10px',fontFamily:"'Bangers',sans-serif",fontSize:'0.9rem',letterSpacing:'0.1em',color:'var(--accent,#ff2a38)',opacity:0.8}}>OPERATOR SCRATCHPAD</div>
                </div>
                <div style={{padding:'3px 12px 0',fontSize:'8px',opacity:0.3,letterSpacing:'1px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
                  <span>NOTES</span>
                  <span>{notesText.split('\n').length} lines</span>
                </div>
                <textarea className="code-area" value={notesText} onChange={e=>setNotesText(e.target.value)}
                  style={{flex:1,width:'100%',resize:'none',color:'var(--text)',fontSize:'11px',fontFamily:"'JetBrains Mono',monospace",padding:'10px 12px',background:'transparent',border:'none',outline:'none'}}
                  placeholder="Personal notes..." spellCheck="false"/>
              </FloatingPanel>

              {/* ── MANGA GALLERY PANEL ── */}
              <FloatingPanel title="MANGA GALLERY" isOpen={sidebarMode==='gallery'} onClose={()=>setSidebarMode(null)} defaultX={100} defaultY={60} defaultW={640} defaultH={560}>
                <div style={{padding:'6px 12px',borderBottom:'1px solid rgba(128,128,128,0.1)',display:'flex',gap:'8px',alignItems:'center',flexShrink:0}}>
                  <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'0.8rem',letterSpacing:'0.12em',color:'var(--accent,#ff2a38)'}}>MANGA ART — {MANGA_IMGS.length} PANELS</div>
                  <div style={{marginLeft:'auto',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.38rem',opacity:0.4}}>SCROLL TO EXPLORE</div>
                </div>
                <div style={{flex:1,overflowY:'auto',padding:'8px',display:'flex',flexWrap:'wrap',gap:'4px',alignContent:'flex-start'}}>
                  {MANGA_IMGS.map((img,i)=>(
                    <div key={i} style={{width:'calc(20% - 4px)',aspectRatio:'0.75',overflow:'hidden',position:'relative',flexShrink:0,border:'2px solid rgba(128,128,128,0.15)',cursor:'pointer',transition:'all 0.15s'}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.04)';e.currentTarget.style.zIndex='10';e.currentTarget.style.borderColor='var(--accent,#ff2a38)';}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.zIndex='1';e.currentTarget.style.borderColor='rgba(128,128,128,0.15)';}}>
                      <img src={`/manga/${img}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
                      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)',backgroundSize:'4px 4px',pointerEvents:'none'}}/>
                    </div>
                  ))}
                </div>
              </FloatingPanel>

              {/* ── UI COLOR ZONE PANEL ── */}

              <FloatingPanel title="UI COLOR ZONE" isOpen={sidebarMode==='uipalette'} onClose={()=>setSidebarMode(null)} defaultX={70} defaultY={80} defaultW={260} defaultH={320}>
                <div style={{padding:'8px 12px',borderBottom:'1px solid rgba(128,128,128,0.08)',fontSize:'9px',opacity:0.35,letterSpacing:'1px'}}>
                  GLOBAL THEME ACCENT — controls node/zone colors
                </div>
                <div style={{flex:1,overflowY:'auto',padding:'10px 12px',display:'flex',flexDirection:'column',gap:'12px'}}>
                  {/* Active zone preview */}
                  <div style={{padding:'10px 12px',background:'rgba(128,128,128,0.04)',border:'1px solid rgba(128,128,128,0.1)',borderRadius:'4px'}}>
                    <div style={{fontSize:'8px',opacity:0.35,letterSpacing:'1.3px',marginBottom:'6px'}}>CURRENT ZONE</div>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <div style={{width:'10px',height:'10px',borderRadius:'50%',background:AVATAR_ACCENTS[activeNode?.themeIdx%AVATAR_ACCENTS.length||0],boxShadow:`0 0 8px ${AVATAR_ACCENTS[activeNode?.themeIdx%AVATAR_ACCENTS.length||0]}`}}/>
                      <span style={{fontSize:'10px',fontWeight:'bold'}}>{activeTabNode?.label||'No file open'}</span>
                    </div>
                    <div style={{fontSize:'9px',opacity:0.35,marginTop:'4px'}}>Open a node to see its zone color</div>
                  </div>
                  {/* All 16 zone swatches */}
                  <div>
                    <div style={{fontSize:'8px',opacity:0.35,letterSpacing:'1.3px',marginBottom:'7px'}}>ALL ACCENT COLORS</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:'7px'}}>
                      {AVATAR_ACCENTS.map((c,i)=>(
                        <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'default'}}>
                          <div style={{width:'22px',height:'22px',borderRadius:'50%',background:c,boxShadow:`0 0 6px ${c}66`,border:'1.5px solid rgba(255,255,255,0.08)'}}/>
                          <span style={{fontSize:'7px',opacity:0.3,fontFamily:"'JetBrains Mono',monospace"}}>{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{padding:'10px 12px',background:'rgba(128,128,128,0.03)',border:'1px solid rgba(128,128,128,0.08)',borderRadius:'4px',fontSize:'9px',opacity:0.45,lineHeight:'1.7'}}>
                    <strong>HOW IT WORKS</strong><br/>
                    Each node carries a color index (0–15). The active open file's color tints the entire UI zone — border, background, text. Click the color dot on any node label to change its color.
                  </div>
                </div>
              </FloatingPanel>

              {/* ── CODE EDITOR PALETTE PANEL ── */}
              {(()=>{
                const PREVIEW_CODE = `def process(data):\n    # transform input\n    result = []\n    for x in data:\n        if x > 0:\n            result.append(x * 2)\n    return result`;
                const previewHL = highlightCode(PREVIEW_CODE);
                return (
                  <FloatingPanel title="CODE PALETTE" isOpen={sidebarMode==='codepalette'} onClose={()=>setSidebarMode(null)} defaultX={70} defaultY={80} defaultW={340} defaultH={560}>
                    <div style={{padding:'8px 12px',borderBottom:'1px solid rgba(128,128,128,0.08)',fontSize:'9px',letterSpacing:'1px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{opacity:0.35}}>EDITOR SYNTAX COLORS</span>
                      <span style={{color:globalEditorPalette.kw,fontSize:'9px',fontWeight:'bold',opacity:0.8}}>{globalEditorPalette.name}</span>
                    </div>

                    {/* Live code preview */}
                    <div style={{margin:'10px 12px 0',borderRadius:'6px',overflow:'hidden',border:`1px solid ${globalEditorPalette.lineNum}44`,flexShrink:0}}>
                      <div style={{background:globalEditorPalette.bg,padding:'3px 10px 3px 6px',display:'flex',gap:'5px',alignItems:'center',borderBottom:`1px solid ${globalEditorPalette.lineNum}44`}}>
                        {['#ff5f57','#febc2e','#28c840'].map((c,i)=><div key={i} style={{width:'7px',height:'7px',borderRadius:'50%',background:c,opacity:0.7}}/>)}
                        <span style={{fontSize:'8px',color:globalEditorPalette.base,opacity:0.4,marginLeft:'4px',fontFamily:"'JetBrains Mono',monospace"}}>preview.py</span>
                      </div>
                      <div className="editor-palette-scope" style={{background:globalEditorPalette.bg, padding:'10px 12px', '--syn-kw':globalEditorPalette.kw, '--syn-str':globalEditorPalette.str, '--syn-cmt':globalEditorPalette.cmt, '--syn-num':globalEditorPalette.num, '--syn-fn':globalEditorPalette.fn, '--syn-bi':globalEditorPalette.bi, '--syn-op':globalEditorPalette.op}} ref={el=>{if(el){Object.entries({'--syn-kw':globalEditorPalette.kw,'--syn-str':globalEditorPalette.str,'--syn-cmt':globalEditorPalette.cmt,'--syn-num':globalEditorPalette.num,'--syn-fn':globalEditorPalette.fn,'--syn-bi':globalEditorPalette.bi,'--syn-op':globalEditorPalette.op}).forEach(([k,v])=>el.style.setProperty(k,v));}}}>
                        <pre style={{margin:0,fontFamily:"'JetBrains Mono',monospace",fontSize:'10px',lineHeight:'1.65',color:globalEditorPalette.base}} dangerouslySetInnerHTML={{__html:previewHL}}/>
                      </div>
                      {/* Swatch bar */}
                      <div style={{display:'flex',height:'4px',background:globalEditorPalette.bg}}>
                        {[globalEditorPalette.kw,globalEditorPalette.str,globalEditorPalette.fn,globalEditorPalette.num,globalEditorPalette.bi,globalEditorPalette.cmt].map((c,i)=>(
                          <div key={i} style={{flex:1,background:c,opacity:0.8}}/>
                        ))}
                      </div>
                    </div>

                    {/* Palette grid */}
                    <div style={{flex:1,overflowY:'auto',padding:'8px 12px',display:'flex',flexDirection:'column',gap:'4px'}}>
                      <div style={{fontSize:'8px',opacity:0.3,letterSpacing:'1.5px',padding:'4px 0 6px',fontFamily:"'JetBrains Mono',monospace"}}>DARK</div>
                      {PALETTES.filter(p=>!['github','gruvlight','papercolor','flexoki'].includes(p.id)).map(p => (
                        <div key={p.id}
                          onClick={()=>setGlobalEditorPalette(p)}
                          style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 10px',borderRadius:'5px',cursor:'pointer',background:globalEditorPalette.id===p.id?p.bg+'ee':p.bg+'55',border:`1px solid ${globalEditorPalette.id===p.id?p.swatches[0]+'88':'rgba(255,255,255,0.04)'}`,transition:'all 0.12s'}}>
                          <div style={{display:'flex',gap:'3px',flexShrink:0}}>
                            {p.swatches.map((c,i)=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c}}/>)}
                          </div>
                          <span style={{fontSize:'10px',color:p.base,fontFamily:"'JetBrains Mono',monospace",flex:1,fontWeight:globalEditorPalette.id===p.id?'bold':'normal'}}>{p.name}</span>
                          {globalEditorPalette.id===p.id && <div style={{width:'5px',height:'5px',borderRadius:'50%',background:p.swatches[0],boxShadow:`0 0 5px ${p.swatches[0]}`}}/>}
                        </div>
                      ))}
                      <div style={{fontSize:'8px',opacity:0.3,letterSpacing:'1.5px',padding:'8px 0 6px',fontFamily:"'JetBrains Mono',monospace"}}>LIGHT</div>
                      {PALETTES.filter(p=>['github','gruvlight','papercolor','flexoki'].includes(p.id)).map(p => (
                        <div key={p.id}
                          onClick={()=>setGlobalEditorPalette(p)}
                          style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 10px',borderRadius:'5px',cursor:'pointer',background:globalEditorPalette.id===p.id?p.bg+'ee':p.bg+'cc',border:`1px solid ${globalEditorPalette.id===p.id?p.swatches[0]:'rgba(0,0,0,0.08)'}`,transition:'all 0.12s'}}>
                          <div style={{display:'flex',gap:'3px',flexShrink:0}}>
                            {p.swatches.map((c,i)=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c}}/>)}
                          </div>
                          <span style={{fontSize:'10px',color:p.base,fontFamily:"'JetBrains Mono',monospace",flex:1,fontWeight:globalEditorPalette.id===p.id?'bold':'normal'}}>{p.name}</span>
                          {globalEditorPalette.id===p.id && <div style={{width:'5px',height:'5px',borderRadius:'50%',background:p.swatches[0],boxShadow:`0 0 5px ${p.swatches[0]}`}}/>}
                        </div>
                      ))}
                    </div>
                  </FloatingPanel>
                );
              })()}

              <FloatingPanel title="PLANNING BOARD" isOpen={sidebarMode==='board'} onClose={()=>setSidebarMode(null)} defaultX={100} defaultY={50} defaultW={920} defaultH={520}>
                {(()=>{
                  const done=board.cards.filter(c=>c.colId==='c5').length, total=board.cards.length;
                  return (
                    <div className="board-wrap" style={{position:'relative'}}>
                      {/* Manga Storyboard header */}
                      <div className="board-topbar" style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'0.5rem 0.8rem'}}>
                        <div style={{background:'var(--accent,#ff2a38)',color:'#fff',fontFamily:"'Bangers','Bebas Neue',sans-serif",fontSize:'0.75rem',letterSpacing:'0.15em',padding:'2px 10px',flexShrink:0}}>FORBIDEN</div>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.5rem',letterSpacing:'0.15em',opacity:0.7}}>SPRINT-01 // PLANNING BOARD</div>
                        <div style={{display:'flex',gap:'4px',marginLeft:'8px'}}>{[0,1,2].map(i=><div key={i} style={{width:'18px',height:'18px',border:'2px solid currentColor',overflow:'hidden'}}><img src={`/avatars/0xAV00${i+1}s.jpeg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>)}</div>
                        <div className="board-meta" style={{marginLeft:'auto',display:'flex',gap:'0.8rem',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.42rem'}}>
                          <span>{done}/{total} DONE</span>
                          <span style={{color:'#f2c12e'}}>{board.cards.filter(c=>c.priority==='HIGH'&&c.colId!=='c5').length} HIGH-PRI</span>
                        </div>
                      </div>
                      {/* Progress bar — manga panel border style */}
                      <div style={{height:'4px',background:'rgba(128,128,128,0.1)',flexShrink:0,borderTop:'1px solid rgba(128,128,128,0.1)'}}><div style={{height:'100%',width:`${done/Math.max(total,1)*100}%`,background:'#10b981',transition:'width 0.4s'}}/></div>
                      <div className="board-cols">
                        {board.cols.map(col => {
                          const cards=board.cards.filter(c=>c.colId===col.id);
                          return (
                            <div key={col.id} className="board-col">
                              <div className="board-col-hdr" style={{background:col.color+'14',borderLeft:'2px solid '+col.color}}>
                                <span style={{color:col.color}}>{col.title}</span>
                                <span className="board-col-count" style={{color:col.color}}>{cards.length}</span>
                              </div>
                              {cards.map(card => (
                                <div key={card.id} className="board-card" onClick={()=>setFocusCard(card.id)}>
                                  <div className="board-card-accent" style={{background:PC[card.priority]||'#555'}}/>
                                  <div className="board-card-title">{card.title}</div>
                                  {card.tags.length>0 && <div className="board-card-tags">{card.tags.map(t=><span key={t} className="board-tag" style={{color:col.color,borderColor:col.color+'33',background:col.color+'0e'}}>{t}</span>)}</div>}
                                  {card.progress>0 && <div className="board-progress"><div className="board-progress-bar" style={{width:`${card.progress}%`,background:card.progress===100?'#10b981':PC[card.priority]}}/></div>}
                                  <div className="board-card-footer">
                                    <span className="board-priority" style={{color:PC[card.priority],background:PC[card.priority]+'14'}}>{card.priority}</span>
                                    {card.due && <span>📅 {card.due}</span>}
                                    {card.assignee!=null && <div style={{marginLeft:'auto'}}><CyberAvatar index={card.assignee} size={13}/></div>}
                                  </div>
                                </div>
                              ))}
                              {newCardCol===col.id
                                ? <div style={{display:'flex',flexDirection:'column',gap:'5px',padding:'7px',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'4px',background:'rgba(255,255,255,0.02)'}}>
                                    <input className="create-modal-input" value={newCardTitle} onChange={e=>setNewCardTitle(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addCard(col.id);if(e.key==='Escape')setNewCardCol(null);}} placeholder="Card title..." autoFocus style={{fontSize:'10px',padding:'5px 9px'}}/>
                                    <div style={{display:'flex',gap:'5px'}}><button className="editor-toolbar-btn" onClick={()=>addCard(col.id)} style={{flex:1,justifyContent:'center',fontSize:'9px'}}>ADD</button><button className="editor-toolbar-btn" onClick={()=>setNewCardCol(null)} style={{color:'#ff435a'}}>✕</button></div>
                                  </div>
                                : <div className="board-add-card" onClick={()=>{setNewCardCol(col.id);setNewCardTitle('');}}>+ ADD CARD</div>}
                            </div>
                          );
                        })}
                      </div>
                      {focusCard && (()=>{
                        const card=board.cards.find(c=>c.id===focusCard); if(!card)return null;
                        const col=board.cols.find(c=>c.id===card.colId);
                        return (
                          <div className="card-detail-overlay" onClick={()=>setFocusCard(null)}>
                            <div className="card-detail-box" onClick={e=>e.stopPropagation()}>
                              <div style={{display:'flex',justifyContent:'space-between',gap:'8px'}}><div style={{fontSize:'12px',fontWeight:'bold',lineHeight:1.4,flex:1}}>{card.title}</div><div style={{cursor:'pointer',opacity:0.5}} onClick={()=>setFocusCard(null)}>✕</div></div>
                              <div>
                                <div style={{fontSize:'9px',opacity:0.4,marginBottom:'6px',letterSpacing:'1px'}}>PRIORITY</div>
                                <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                                  {['HIGH','MED','LOW','DONE'].map(p=>(<button key={p} className="editor-toolbar-btn" onClick={()=>updateCard(card.id,{priority:p})} style={{color:PC[p],borderColor:card.priority===p?PC[p]:'rgba(128,128,128,0.2)',background:card.priority===p?PC[p]+'14':'transparent',fontSize:'9px'}}>{p}</button>))}
                                </div>
                              </div>
                              <div>
                                <div style={{fontSize:'9px',opacity:0.4,marginBottom:'6px',letterSpacing:'1px'}}>MOVE TO</div>
                                <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                                  {board.cols.map(c=>(<button key={c.id} className="editor-toolbar-btn" onClick={()=>moveCard(card.id,c.id)} style={{color:c.id===card.colId?c.color:'inherit',borderColor:c.id===card.colId?c.color:'rgba(128,128,128,0.2)',fontSize:'9px'}}>{c.title}</button>))}
                                </div>
                              </div>
                              <div>
                                <div style={{fontSize:'9px',opacity:0.4,marginBottom:'5px',letterSpacing:'1px'}}>PROGRESS — {card.progress}%</div>
                                <input type="range" min="0" max="100" value={card.progress} onChange={e=>updateCard(card.id,{progress:+e.target.value})} style={{width:'100%',accentColor:col?col.color:'#10b981'}}/>
                              </div>
                              <button className="editor-toolbar-btn" onClick={()=>deleteCard(card.id)} style={{color:'#ff435a',borderColor:'#ff435a33',justifyContent:'center',fontSize:'9px'}}>DELETE CARD</button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })()}
              </FloatingPanel>

              {/* TERMINAL + TIMELINE */}
              <FloatingPanel
                title={<div style={{display:'flex',gap:'14px'}}>{['terminal','timeline'].map(t=>(<span key={t} style={{cursor:'pointer',opacity:bottomPanelTab===t?1:0.4,transition:'opacity 0.2s'}} onClick={()=>setBottomPanelTab(t)}>{t.toUpperCase()}</span>))}</div>}
                isOpen={!!bottomPanelTab} onClose={()=>setBottomPanelTab(null)} defaultX={180} defaultY={window.innerHeight-320} defaultW={780} defaultH={270}>
                {bottomPanelTab==='terminal' && (
                  <div style={{display:'flex',flexDirection:'column',flex:1,overflow:'hidden',background:termPalette.bg,transition:'background 0.3s'}}>
                    {/* Terminal toolbar */}
                    <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'5px 10px',borderBottom:`1px solid ${termPalette.border}`,background:termPalette.bg,flexShrink:0,minHeight:'32px'}}>
                      {/* Traffic dots */}
                      <div style={{display:'flex',gap:'5px',marginRight:'4px'}}>
                        {['#ff5f57','#febc2e','#28c840'].map((c,i)=><div key={i} style={{width:'9px',height:'9px',borderRadius:'50%',background:c,opacity:0.7}}/>)}
                      </div>
                      <div style={{width:'1px',height:'14px',background:termPalette.border,opacity:0.6}}/>
                      <span style={{fontSize:'9px',color:termPalette.prompt,fontFamily:"'JetBrains Mono',monospace",letterSpacing:'1px',opacity:0.8}}>TERMINAL</span>
                      <div style={{marginLeft:'auto',display:'flex',gap:'5px',alignItems:'center',position:'relative'}}>
                        {/* Clear button */}
                        <button onClick={()=>setTermLines([])}
                          style={{padding:'3px 8px',border:`1px solid ${termPalette.border}`,borderRadius:'3px',background:'transparent',color:termPalette.dim,fontFamily:"'JetBrains Mono',monospace",fontSize:'8px',cursor:'pointer',letterSpacing:'0.8px',transition:'all 0.15s'}}
                          onMouseEnter={e=>{e.target.style.color=termPalette.error;e.target.style.borderColor=termPalette.error;}}
                          onMouseLeave={e=>{e.target.style.color=termPalette.dim;e.target.style.borderColor=termPalette.border;}}>
                          CLR
                        </button>
                        {/* Palette button */}
                        <button onClick={()=>setShowTermPalette(v=>!v)}
                          style={{padding:'3px 10px',border:`1px solid ${showTermPalette?termPalette.prompt:termPalette.border}`,borderRadius:'3px',background:showTermPalette?termPalette.prompt+'18':'transparent',color:showTermPalette?termPalette.prompt:termPalette.dim,fontFamily:"'JetBrains Mono',monospace",fontSize:'8px',cursor:'pointer',letterSpacing:'0.8px',display:'flex',alignItems:'center',gap:'5px',transition:'all 0.15s'}}>
                          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:termPalette.prompt,boxShadow:`0 0 5px ${termPalette.prompt}`}}/>
                          {termPalette.name}
                          <span style={{opacity:0.5,fontSize:'7px'}}>▾</span>
                        </button>
                        {/* Palette dropdown */}
                        {showTermPalette && (
                          <div style={{position:'absolute',top:'calc(100% + 6px)',right:0,zIndex:9999,background:'#0a0a0e',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4px',minWidth:'300px',boxShadow:'0 16px 50px rgba(0,0,0,0.9)',maxHeight:'320px',overflowY:'auto'}}
                            onClick={e=>e.stopPropagation()}>
                            <div style={{gridColumn:'1/-1',fontSize:'8px',opacity:0.3,letterSpacing:'1.5px',fontFamily:"'JetBrains Mono',monospace",padding:'2px 4px 6px'}}>TERMINAL THEME</div>
                            {TERM_PALETTES.map(tp => (
                              <div key={tp.id}
                                onClick={()=>{setTermPalette(tp);setShowTermPalette(false);}}
                                style={{display:'flex',alignItems:'center',gap:'8px',padding:'7px 10px',borderRadius:'5px',cursor:'pointer',background:termPalette.id===tp.id?tp.bg+'dd':tp.bg+'88',border:`1px solid ${termPalette.id===tp.id?tp.prompt:tp.border}`,transition:'all 0.12s'}}>
                                <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
                                  {[tp.prompt,tp.error,tp.warn,tp.info].map((c,i)=><div key={i} style={{width:'16px',height:'3px',borderRadius:'1px',background:c,opacity:0.9}}/>)}
                                </div>
                                <div>
                                  <div style={{fontSize:'9px',color:tp.text,fontFamily:"'JetBrains Mono',monospace",fontWeight:'bold'}}>{tp.name}</div>
                                  <div style={{fontSize:'7px',color:tp.dim,fontFamily:"'JetBrains Mono',monospace",marginTop:'1px'}}>{tp.bg}</div>
                                </div>
                                {termPalette.id===tp.id && <div style={{marginLeft:'auto',width:'5px',height:'5px',borderRadius:'50%',background:tp.prompt,boxShadow:`0 0 6px ${tp.prompt}`}}/>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Terminal output */}
                    <div className="term-content" style={{flex:1,background:'transparent'}}
                      onClick={()=>setShowTermPalette(false)}>
                      {termLines.map((l,i)=>{
                        // Map legacy color codes to themed equivalents
                        let color = l.c;
                        if(l.c==='#28f1c3'||l.c==='#10b981') color = termPalette.info;
                        else if(l.c==='#ff435a') color = termPalette.error;
                        else if(l.c==='#ffc410') color = termPalette.warn;
                        else if(l.c==='#9494b0'||l.c==='#c0c8d8') color = termPalette.text;
                        return (
                          <div key={i} style={{color,fontFamily:"'JetBrains Mono',monospace",whiteSpace:'pre-wrap',lineHeight:'1.6',fontSize:'11px'}}>
                            {l.t.startsWith('$') ? (
                              <span><span style={{color:termPalette.prompt,opacity:0.7}}>$ </span><span style={{color:termPalette.text}}>{l.t.slice(2)}</span></span>
                            ) : l.t}
                          </div>
                        );
                      })}
                      <div ref={termEndRef}/>
                    </div>
                    {/* Input bar */}
                    <div style={{display:'flex',alignItems:'center',borderTop:`1px solid ${termPalette.border}`,padding:'7px 14px',gap:'8px',background:termPalette.bg,flexShrink:0}}>
                      <span style={{color:termPalette.prompt,fontSize:'12px',fontFamily:"'JetBrains Mono',monospace",fontWeight:'bold'}}>❯</span>
                      <input value={termInput} onChange={e=>setTermInput(e.target.value)} onKeyDown={handleTermInput}
                        style={{flex:1,background:'transparent',border:'none',outline:'none',color:termPalette.text,fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',caretColor:termPalette.cursor}}
                        placeholder="try: help, ls, git status, node list, clear"/>
                    </div>
                  </div>
                )}
                {bottomPanelTab==='timeline' && (
                  <div className="nle-wrap">
                    {/* Manga episode strip — chapter thumbnails above timeline */}
                    <div style={{height:'52px',display:'flex',borderBottom:'1px solid rgba(128,128,128,0.1)',flexShrink:0,overflow:'hidden',position:'relative'}}>
                      <div style={{width:'130px',flexShrink:0,borderRight:'1px solid rgba(128,128,128,0.12)',display:'flex',alignItems:'center',padding:'0 8px',gap:'4px',fontFamily:"'Bangers',sans-serif",fontSize:'0.6rem',letterSpacing:'0.1em',color:themeMode==='brutal'?'#0f0f0f':'#f4f0e8',opacity:0.7}}>
                        <I.Git/> VERSION HISTORY
                      </div>
                      <div style={{flex:1,display:'flex',gap:'2px',padding:'4px 6px',overflowX:'hidden'}}>
                        {['v1.0','v1.1','v1.2','v1.3','v1.4','v1.5'].map((v,i)=>(
                          <div key={v} style={{width:'80px',flexShrink:0,position:'relative',overflow:'hidden',border:'1px solid rgba(128,128,128,0.15)',cursor:'pointer'}}
                            onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent,#ff2a38)'}
                            onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(128,128,128,0.15)'}>
                            <img src={`/manga/${encodeURIComponent(MANGA_RAW[(i*7+3)%MANGA_RAW.length])}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity: themeMode==='brutal'?0.55:0.45,filter:'contrast(1.1) saturate(0.65)'}} loading="lazy"/>
                            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%)',pointerEvents:'none'}}/>
                            <div style={{position:'absolute',bottom:'3px',left:'4px',right:'4px',fontFamily:"'Bangers',sans-serif",fontSize:'0.55rem',letterSpacing:'0.08em',color:'#fff',lineHeight:1,textShadow:'0 1px 3px rgba(0,0,0,0.9)'}}>{v}</div>
                            <div style={{position:'absolute',top:'3px',left:'3px',width:'6px',height:'6px',borderRadius:'50%',background:i===4?'#ff2a38':'rgba(128,128,128,0.4)'}}/>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="nle-body">
                      <div className="nle-track-headers">
                        <div className="nle-ruler" style={{borderBottom:'none'}}/>
                        <div className="nle-track-header"><span>MAIN</span><I.Git/></div>
                        <div className="nle-track-header"><span>YOU</span><CyberAvatar index={avatarIndex} size={14}/></div>
                        <div className="nle-track-header"><span>OP-2</span><div style={{width:'7px',height:'7px',background:'#4285f4',borderRadius:'50%'}}/></div>
                      </div>
                      <div style={{flex:1,overflowX:'auto',display:'flex',flexDirection:'column'}}>
                        <div className="nle-ruler">
                          {['v1.0','v1.1','v1.2','v1.3','v1.4','v1.5'].map((v,i)=>(<div key={v} className="nle-ruler-tick major" style={{left:`${50+i*100}px`}}>{v}</div>))}
                        </div>
                        <div className="nle-tracks">
                          <div className="nle-playhead" style={{left:`${playheadPos}px`}} onPointerDown={handlePlayheadDown} onPointerMove={handlePlayheadMove} onPointerUp={handlePlayheadUp} onPointerCancel={handlePlayheadUp}/>
                          <div className="nle-track-lane">
                            <div className="nle-clip" style={{left:'50px',width:'70px',color:'var(--text)'}}>Init repo</div>
                            <div className="nle-clip" style={{left:'220px',width:'110px',color:'var(--text)'}}>Merge PR #1</div>
                          </div>
                          <div className="nle-track-lane">
                            <div className="nle-clip" style={{left:'100px',width:'140px',background:'rgba(255,67,90,0.12)',borderColor:'#ff435a55',color:'var(--text)'}}>Write core_sys.py</div>
                            <div className="nle-clip" style={{left:'380px',width:'90px',background:'rgba(255,67,90,0.12)',borderColor:'#ff435a55',color:'var(--text)'}}>Fix pipeline</div>
                          </div>
                          <div className="nle-track-lane">
                            <div className="nle-clip" style={{left:'250px',width:'190px',background:'rgba(66,133,244,0.12)',borderColor:'#4285f455',color:'var(--text)'}}>DataMatrix class</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </FloatingPanel>

              {/* MAIN CANVAS */}
              <div className="main-view">
                {/* MANGA GRAPH MODE BAR */}
                <div className="graph-mode-bar" style={{display:'flex',alignItems:'center',gap:'6px',padding:'0 10px',height:'36px',flexShrink:0}}>
                  {/* Chapter badge */}
                  <div style={{background:'var(--accent,#ff2a38)',color:'#fff',fontFamily:"'Bangers',sans-serif",fontSize:'0.65rem',letterSpacing:'0.12em',padding:'2px 8px',flexShrink:0}}>GRAPH</div>
                  <div style={{width:'2px',height:'20px',background:'rgba(128,128,128,0.2)',flexShrink:0}}/>
                  {/* Join button */}
                  <button className={`graph-mode-btn ${edgeMode==='join'?'active-join':''}`}
                    onClick={()=>{ setEdgeMode(m=>m==='join'?null:'join'); setJoinFirstNode(null); }}
                    style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'0.1em',fontSize:'0.48rem'}}>
                    {edgeMode==='join' && <span className="join-pulse"/>}
                    {edgeMode==='join' ? (joinFirstNode ? '▶ SELECT TARGET' : '▶ SELECT SOURCE') : '⟶ LINK'}
                  </button>
                  {/* Cut button */}
                  <button className={`graph-mode-btn ${edgeMode==='cut'?'active-cut':''}`}
                    onClick={()=>{ setEdgeMode(m=>m==='cut'?null:'cut'); setJoinFirstNode(null); }}
                    style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'0.1em',fontSize:'0.48rem'}}>
                    {edgeMode==='cut' && <span className="cut-pulse"/>}
                    {edgeMode==='cut' ? '✂ HOVER EDGE' : '✂ SEVER'}
                  </button>
                  {edgeMode && <button className="graph-mode-btn" style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.44rem'}} onClick={()=>{setEdgeMode(null);setJoinFirstNode(null);}}>✕ CANCEL</button>}
                  {/* Edge mode status caption */}
                  {edgeMode && (
                    <div style={{marginLeft:'auto',background:edgeMode==='join'?'#10b981':'#ff2a38',color:'#fff',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.42rem',letterSpacing:'0.15em',padding:'2px 8px',animation:'fpulse 1.2s infinite'}}>
                      {edgeMode==='join'?(joinFirstNode?'→ NOW SELECT TARGET':'→ SELECT SOURCE NODE'):'✂ CLICK AN EDGE TO CUT'}
                    </div>
                  )}
                  {/* Node count badge */}
                  <div style={{marginLeft:edgeMode?'0':'auto',display:'flex',gap:'4px',alignItems:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.4rem',color:'rgba(128,128,128,0.6)'}}>
                    <span>{nodeCount} NODES</span>
                    <span style={{opacity:0.3}}>·</span>
                    <span>{edgesRef.current.length} EDGES</span>
                  </div>
                </div>

                <div className="canvas-container"
                  style={{cursor: edgeMode==='join' ? 'crosshair' : edgeMode==='cut' ? 'default' : undefined}}
                  onPointerDown={handleCanvasPointerDown} onPointerMove={handleCanvasPointerMove} onPointerUp={handleCanvasPointerUp} onPointerLeave={handleCanvasPointerUp} onWheel={handleWheel}
                  onClick={()=>{setNodeColorPicker(null); setShowTermPalette(false);}}>
                  <div className="canvas-bg"/>
                  {/* MANGA PAGE OVERLAY — decorative elements */}
                  {themeMode==='brutal' && (
                    <>
                      {/* Page number */}
                      <div style={{position:'absolute',bottom:'12px',right:'16px',zIndex:2,fontFamily:"'Bangers',sans-serif",fontSize:'1.2rem',color:'rgba(15,15,15,0.12)',letterSpacing:'0.05em',pointerEvents:'none',userSelect:'none',lineHeight:1}}>FORBIDEN</div>
                      {/* Chapter marker top-left */}
                      <div style={{position:'absolute',top:'12px',left:'12px',zIndex:2,pointerEvents:'none',userSelect:'none'}}>
                        <div style={{background:'#0f0f0f',color:'#f2c12e',fontFamily:"'Bangers',sans-serif",fontSize:'0.55rem',letterSpacing:'0.15em',padding:'2px 8px',display:'inline-block'}}>CHAPTER {String(nodeCount).padStart(2,'0')}</div>
                      </div>
                      {/* Corner gutters */}
                      <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:'#0f0f0f',zIndex:2,pointerEvents:'none'}}/>
                      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:'rgba(15,15,15,0.25)',zIndex:2,pointerEvents:'none'}}/>
                    </>
                  )}
                  {themeMode==='cyber' && (
                    <>
                      <div style={{position:'absolute',bottom:'12px',right:'16px',zIndex:2,fontFamily:"'Bangers',sans-serif",fontSize:'1.2rem',color:'rgba(255,42,56,0.06)',letterSpacing:'0.05em',pointerEvents:'none',userSelect:'none',lineHeight:1}}>FORBIDEN</div>
                      <div style={{position:'absolute',top:'10px',left:'12px',zIndex:2,pointerEvents:'none',userSelect:'none'}}>
                        <div style={{background:'rgba(255,42,56,0.08)',color:'#ff2a38',fontFamily:"'Bangers',sans-serif",fontSize:'0.5rem',letterSpacing:'0.18em',padding:'2px 8px',border:'1px solid rgba(255,42,56,0.2)',display:'inline-block'}}>SYS: ONLINE // {nodeCount} NODES</div>
                      </div>
                    </>
                  )}

                  {/* ── MANGA HERO OVERLAY — ephemeral hero splash ── */}
                  {!activeTabId && (
                    <MangaHeroOverlay
                      nodeCount={nodeCount}
                      edgeCount={edgesRef.current.length}
                      themeMode={themeMode}
                      onNewNode={() => setShowCreateNode(true)}
                      onOpenGallery={() => setSidebarMode('gallery')}
                    />
                  )}

                  {/* ── AMBIENT MANGA PANELS — visible canvas art behind nodes ── */}
                  <div style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',overflow:'hidden',opacity: activeTabId ? (themeMode==='brutal' ? 0.08 : 0.1) : 0}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gridTemplateRows:'1fr 1fr 1fr',gap:'2px',width:'100%',height:'100%'}}>
                      {MANGA_RAW.slice(15,27).map((img,i)=>(
                        <div key={i} style={{overflow:'hidden',position:'relative'}}>
                          <img src={`/manga/${encodeURIComponent(img)}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter: themeMode==='brutal' ? 'contrast(1.05) saturate(0.4) sepia(0.1)' : 'contrast(1.15) saturate(0.5)'}} loading="lazy"/>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="graph-layer" style={{transform:`translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`}}>
                    <svg className="svg-edges" style={{pointerEvents: edgeMode==='cut' ? 'all' : 'none'}}>
                      {visibleEdges.map(edge => {
                        const src=visibleNodes.find(n=>n.id===edge.source), tgt=visibleNodes.find(n=>n.id===edge.target);
                        if(!src||!tgt)return null;
                        const mx=(src.x+tgt.x)/2, my=(src.y+tgt.y)/2-20;
                        const srcAccent = AVATAR_ACCENTS[src.themeIdx%AVATAR_ACCENTS.length];
                        const tgtAccent = AVATAR_ACCENTS[tgt.themeIdx%AVATAR_ACCENTS.length];
                        const isHovered = hoveredEdgeId === edge.id;
                        const pathD = `M${src.x} ${src.y} Q${mx} ${my} ${tgt.x} ${tgt.y}`;
                        return (
                          <g key={edge.id}>
                            <defs>
                              <linearGradient id={`eg-${edge.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={srcAccent} stopOpacity="0.6"/>
                                <stop offset="100%" stopColor={tgtAccent} stopOpacity="0.6"/>
                              </linearGradient>
                            </defs>
                            <path className="edge-path" d={pathD}
                              stroke={edgeMode==='cut' && isHovered ? '#ff435a' : `url(#eg-${edge.id})`}
                              strokeWidth={edgeMode==='cut' && isHovered ? 3 : undefined}
                              opacity={edgeMode==='cut' && isHovered ? 1 : undefined}/>
                            {edgeMode==='cut' && (
                              <path d={pathD} fill="none" stroke="transparent" strokeWidth="18"
                                style={{cursor:'pointer', pointerEvents:'stroke'}}
                                onPointerEnter={()=>setHoveredEdgeId(edge.id)}
                                onPointerLeave={()=>setHoveredEdgeId(null)}
                                onClick={e=>{e.stopPropagation();handleEdgeClickInMode(edge.id);}}/>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                    {groupsRef.current.map(grp => {
                      const gn=visibleNodes.filter(n=>grp.nodeIds.includes(n.id));
                      if(gn.length<2)return null;
                      const cx=gn.reduce((s,n)=>s+n.x,0)/gn.length, cy=gn.reduce((s,n)=>s+n.y,0)/gn.length;
                      const sorted=[...gn].sort((a,b)=>Math.atan2(a.y-cy,a.x-cx)-Math.atan2(b.y-cy,b.x-cx));
                      const PAD=46;
                      const pts=sorted.map(n=>{const dx=n.x-cx,dy=n.y-cy,d=Math.sqrt(dx*dx+dy*dy)||1;return[cx+dx/d*(d+PAD),cy+dy/d*(d+PAD)];});
                      const pathD=pts.map((p,i)=>(i===0?'M':'L')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ')+' Z';
                      const lx=cx, ly=Math.min(...gn.map(n=>n.y))-PAD-10;
                      return (
                        <g key={grp.id}>
                          <path d={pathD} fill={grp.color+'0c'} stroke={grp.color} strokeWidth="1" strokeDasharray="6 3" opacity="0.7"/>
                          <foreignObject x={lx-58} y={ly-11} width="120" height="20" style={{overflow:'visible'}}>
                            <div xmlns="http://www.w3.org/1999/xhtml"
                              style={{background:grp.color+'1a',color:grp.color,border:'1px solid '+grp.color+'44',fontSize:'8px',padding:'2px 7px',fontFamily:"'JetBrains Mono',monospace",letterSpacing:'1px',borderRadius:'2px',whiteSpace:'nowrap',cursor:'pointer',display:'inline-block',userSelect:'none'}}
                              onClick={e=>{e.stopPropagation();openGroupEditor(grp.id);}}>
                              ⬡ {grp.name}
                            </div>
                          </foreignObject>
                        </g>
                      );
                    })}
                    {visibleNodes.map(node => {
                      const grp=groupsRef.current.find(g=>g.nodeIds.includes(node.id));
                      const nodeAccent = AVATAR_ACCENTS[node.themeIdx%AVATAR_ACCENTS.length];
                      const isJoinSelected = joinFirstNode === node.id;
                      return (
                        <div key={node.id} className={`obs-node-wrapper clr-${ZONES[node.themeIdx%ZONES.length]}`}
                          style={{left:node.x+'px',top:node.y+'px',opacity:hoveredNodeId&&hoveredNodeId!==node.id&&!activeTabId&&!edgeMode?0.25:1,transition:'opacity 0.2s'}}
                          onPointerEnter={()=>!activeTabId&&!isDraggingCanvas&&setHoveredNodeId(node.id)}
                          onPointerLeave={()=>!activeTabId&&setHoveredNodeId(null)}
                          onPointerDown={e=>{
                            e.stopPropagation();
                            if(edgeMode) return;
                            setNodeColorPicker(null);
                            draggingNodeRef.current={id:node.id,x:node.x,y:node.y,hasDragged:false};
                            lastMousePos.current={x:e.clientX,y:e.clientY};
                          }}
                          onPointerUp={e=>{
                            e.stopPropagation();
                            if(edgeMode==='join'){handleNodeClickInMode(node.id);return;}
                            if(edgeMode==='cut')return;
                            if(!draggingNodeRef.current?.hasDragged) openNodeInEditor(node.id);
                            draggingNodeRef.current=null;
                          }}>
                          {/* MANGA PANEL NODE */}
                          <div className={`node-circle ${node.isMain?'main-node':'sub-node'}`}
                            style={{
                              ...(grp?{boxShadow:themeMode==='brutal'?`4px 4px 0 ${grp.color}`:`0 0 12px ${grp.color}88`}:{}),
                              ...(isJoinSelected?themeMode==='brutal'?{boxShadow:`6px 6px 0 ${nodeAccent}`,border:`3px solid ${nodeAccent}`}:{boxShadow:`0 0 18px ${nodeAccent}, 0 0 30px ${nodeAccent}88`,border:`2px solid ${nodeAccent}`}:{})
                            }}>
                            {/* Manga art inside node circles */}
                            <img src={`/manga/${encodeURIComponent(MANGA_RAW[(node.themeIdx*7+11)%MANGA_RAW.length])}`} alt=""
                              style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',
                                opacity: node.isMain ? (themeMode==='brutal'?0.28:0.22) : (themeMode==='brutal'?0.16:0.12),
                                filter: themeMode==='brutal' ? 'contrast(1.1) saturate(0.5) sepia(0.1)' : 'contrast(1.2) saturate(0.4)',
                                pointerEvents:'none'}}/>
                            {/* Main node overlay accent */}
                            {node.isMain && <div style={{position:'absolute',inset:0,background:`radial-gradient(circle,transparent 40%,${nodeAccent}22 100%)`,pointerEvents:'none'}}/>}
                          </div>
                          <div className="node-label" style={{
                            ...(grp?themeMode==='brutal'?{borderColor:grp.color,boxShadow:`3px 3px 0 ${grp.color}`}:{borderColor:grp.color+'44'}:{}),
                            ...(isJoinSelected?themeMode==='brutal'?{borderColor:nodeAccent,boxShadow:`4px 4px 0 ${nodeAccent}`,background:nodeAccent,color:'#fff'}:{borderColor:nodeAccent+'88',color:nodeAccent}:{})
                          }}>
                            {/* Color swatch / manga panel marker */}
                            <span
                              title="Change color"
                              style={{display:'inline-block',width:'8px',height:'8px',borderRadius:themeMode==='brutal'?'0':'50%',background:nodeAccent,marginRight:'5px',verticalAlign:'middle',flexShrink:0,cursor:'pointer',border:themeMode==='brutal'?'1px solid rgba(0,0,0,0.3)':'none'}}
                              onPointerDown={e=>{e.stopPropagation();}}
                              onClick={e=>{
                                e.stopPropagation();
                                const rect=e.currentTarget.getBoundingClientRect();
                                setNodeColorPicker(p=>p?.nodeId===node.id?null:{nodeId:node.id,x:rect.left,y:rect.bottom+8});
                              }}
                            />
                            {node.label}{node.modified&&<span className="modified-dot"/>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── GROUP DOCK — top right of canvas ── */}
                <GroupDock
                  groups={groupsRef.current}
                  nodes={nodesRef.current}
                  onOpen={openGroupEditor}
                  onRemove={dissolveGroup}
                />

                <GraphMinimap nodes={visibleNodes}/>

                {/* Portal: node color picker (fixed position, outside canvas transform) */}
                {nodeColorPicker && (()=>{
                  const pickerNode = nodesRef.current.find(n=>n.id===nodeColorPicker.nodeId);
                  if(!pickerNode) return null;
                  return (
                    <div style={{position:'fixed',left:nodeColorPicker.x,top:nodeColorPicker.y,zIndex:9999,background:'rgba(8,8,20,0.98)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px',display:'flex',flexWrap:'wrap',gap:'7px',width:'168px',boxShadow:'0 12px 40px rgba(0,0,0,0.9)',backdropFilter:'blur(8px)'}}
                      onPointerDown={e=>e.stopPropagation()}>
                      <div style={{width:'100%',fontSize:'8px',opacity:0.35,letterSpacing:'1.3px',fontFamily:"'JetBrains Mono',monospace",marginBottom:'2px'}}>NODE COLOR</div>
                      {['#8888aa','#ff435a','#ffc410','#1e836d','#4285f4','#28f1c3','#ff1650','#bb9af7','#5ccfe6','#ffbd5e','#e36209','#72f1b8','#ff8080','#89ddff','#e5c07b','#4ec9b0'].map((c,i)=>(
                        <div key={i}
                          style={{width:'20px',height:'20px',borderRadius:'50%',background:c,cursor:'pointer',border:pickerNode.themeIdx===i?`2.5px solid #fff`:'2px solid transparent',boxShadow:pickerNode.themeIdx===i?`0 0 10px ${c}`:'none',transition:'all 0.12s',flexShrink:0}}
                          onClick={e=>{e.stopPropagation();handleChangeNodeColor(nodeColorPicker.nodeId,i);}}
                        />
                      ))}
                      <div style={{width:'100%',borderTop:'1px solid rgba(255,255,255,0.08)',marginTop:'3px',paddingTop:'6px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <button style={{fontSize:'8px',padding:'3px 8px',background:'rgba(255,67,90,0.12)',border:'1px solid rgba(255,67,90,0.3)',borderRadius:'3px',color:'#ff435a',cursor:'pointer',fontFamily:"'JetBrains Mono',monospace",letterSpacing:'0.5px'}}
                          onClick={e=>{e.stopPropagation();nodesRef.current=nodesRef.current.filter(n=>n.id!==nodeColorPicker.nodeId);edgesRef.current=edgesRef.current.filter(e=>e.source!==nodeColorPicker.nodeId&&e.target!==nodeColorPicker.nodeId);groupsRef.current=groupsRef.current.map(g=>({...g,nodeIds:g.nodeIds.filter(id=>id!==nodeColorPicker.nodeId)}));setNodeColorPicker(null);forceRender({});}}>
                          DELETE NODE
                        </button>
                        <button style={{fontSize:'8px',padding:'3px 8px',background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'3px',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontFamily:"'JetBrains Mono',monospace"}}
                          onClick={e=>{e.stopPropagation();setNodeColorPicker(null);}}>
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* STATUS BAR — Manga Caption Strip */}
            <div className="status-bar">
              {themeMode==='brutal' ? (
                /* BRUTALIST manga footer */
                <>
                  <div style={{display:'flex',alignItems:'center',gap:'0',height:'100%'}}>
                    {/* FORBIDEN stamp */}
                    <div style={{background:'#c8001a',color:'#fff',fontFamily:"'Bangers',sans-serif",fontSize:'0.7rem',letterSpacing:'0.12em',padding:'0 10px',height:'100%',display:'flex',alignItems:'center',flexShrink:0,borderRight:'2px solid #0f0f0f'}}>FORBIDEN</div>
                    {/* Status dot caption */}
                    <div style={{padding:'0 10px',display:'flex',alignItems:'center',gap:'6px',borderRight:'1px solid rgba(0,0,0,0.15)',height:'100%',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.42rem',color:'#0f0f0f'}}>
                      <span style={{width:'6px',height:'6px',background:'#10b981',display:'inline-block',flexShrink:0}}/>
                      <span>NOMINAL</span>
                    </div>
                    <div style={{padding:'0 10px',display:'flex',alignItems:'center',gap:'4px',borderRight:'1px solid rgba(0,0,0,0.15)',height:'100%',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.42rem',color:'#0f0f0f'}}>
                      <span style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.44rem',color:'#0f0f0f'}}>{nodeCount}</span> NODES
                      <span style={{opacity:0.3}}>·</span>
                      <span style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.44rem',color:'#0f0f0f'}}>{edgesRef.current.length}</span> EDGES
                    </div>
                    {edgeMode && <div style={{padding:'0 10px',background:'#f2c12e',color:'#0f0f0f',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.42rem',letterSpacing:'0.1em',borderRight:'2px solid #0f0f0f',height:'100%',display:'flex',alignItems:'center'}}>
                      {edgeMode==='join'?(joinFirstNode?'▶ SELECT TARGET':'▶ SELECT SOURCE'):'✂ HOVER EDGE'}
                    </div>}
                    {/* Keyboard hints */}
                    <div style={{padding:'0 10px',display:'flex',alignItems:'center',gap:'8px',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.38rem',color:'rgba(15,15,15,0.4)',height:'100%'}}>
                      {[['N','NODE'],['G','GROUP'],['J','LINK'],['X','CUT'],['`','TERM']].map(([k,l])=>(
                        <span key={k} style={{display:'flex',gap:'2px',alignItems:'center'}}>
                          <span style={{background:'rgba(0,0,0,0.08)',border:'1px solid rgba(0,0,0,0.2)',padding:'0px 4px',fontFamily:'inherit'}}>{k}</span>
                          <span>{l}</span>
                        </span>
                      ))}
                    </div>
                    {/* Right side — operator + time */}
                    <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'0',height:'100%'}}>
                      <div style={{padding:'0 10px',borderLeft:'1px solid rgba(0,0,0,0.15)',height:'100%',display:'flex',alignItems:'center',fontFamily:"'Share Tech Mono',monospace",fontSize:'0.4rem',color:'rgba(15,15,15,0.5)'}}>
                        {modifiedNodes.length>0?<span style={{color:'#c8001a',fontFamily:"'Oswald',sans-serif",fontWeight:700}}>{modifiedNodes.length} UNSAVED</span>:<span>SAVED</span>}
                      </div>
                      <div style={{padding:'0 10px',borderLeft:'1px solid rgba(0,0,0,0.15)',height:'100%',display:'flex',alignItems:'center',gap:'5px'}}>
                        <div style={{width:'16px',height:'16px',overflow:'hidden',border:'1px solid #0f0f0f',flexShrink:0}}>
                          <img src={`/avatars/0xAV0${String((avatarIndex%6)+1).padStart(2,'0')}s.jpeg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        </div>
                        <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.4rem',color:'rgba(15,15,15,0.5)'}}>{new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* CYBER manga footer */
                <>
                  <div className="status-group">
                    <span style={{color:'#ff2a38',fontFamily:"'Bangers',sans-serif",fontSize:'0.7rem',letterSpacing:'0.1em'}}>FORBIDEN</span>
                    <span style={{color:'rgba(255,255,255,0.15)'}}>|</span>
                    <span style={{display:'flex',alignItems:'center',gap:'4px'}}><span className="status-dot" style={{background:'#10b981',boxShadow:'0 0 5px #10b981'}}/>ONLINE</span>
                    <span style={{color:'rgba(255,255,255,0.15)'}}>|</span>
                    <span>{nodeCount} NODES · {edgesRef.current.length} EDGES</span>
                    {edgeMode && <><span style={{color:'rgba(255,255,255,0.15)'}}>|</span><span style={{color:edgeMode==='join'?'#10b981':'#ff435a',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.48rem'}}>{edgeMode==='join'?(joinFirstNode?'JOIN: TARGET':'JOIN: SOURCE'):'CUT MODE'}</span></>}
                  </div>
                  <div className="status-group" style={{gap:'8px'}}>
                    {[['N','node'],['G','group'],['J','join'],['X','cut'],['`','term']].map(([k,l])=>(
                      <span key={k} style={{opacity:0.22,fontSize:'9px',display:'flex',gap:'2px',alignItems:'center'}}>
                        <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'1px 4px',fontFamily:"'JetBrains Mono',monospace"}}>{k}</span>
                        <span>{l}</span>
                      </span>
                    ))}
                  </div>
                  <div className="status-group">
                    <span style={{color:'#ffc410',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.48rem'}}>VER {activeVersionName}</span>
                    <span style={{color:'rgba(255,255,255,0.15)'}}>|</span>
                    <span style={{opacity:0.45}}>{modifiedNodes.length>0?`${modifiedNodes.length} UNSAVED`:'ALL SAVED'}</span>
                    <span style={{color:'rgba(255,255,255,0.15)'}}>|</span>
                    <div style={{width:'18px',height:'18px',overflow:'hidden',border:'1px solid rgba(255,42,56,0.3)'}}>
                      <img src={`/avatars/0xAV0${String((avatarIndex%6)+1).padStart(2,'0')}s.jpeg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    </div>
                    <span style={{opacity:0.35,cursor:'pointer'}} onClick={()=>setShowCmd(true)}>⌘P</span>
                    <span style={{opacity:0.35}}>{new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</span>
                  </div>
                </>
              )}
            </div>

            {/* CREATE NODE MODAL */}
            {showCreateNode && (
              <div className="create-modal" onPointerDown={()=>setShowCreateNode(false)}>
                <div className="create-modal-box" onPointerDown={e=>e.stopPropagation()} style={{maxWidth:'560px',width:'90vw'}}>
                  <div className="create-modal-title">CREATE FILE NODE</div>

                  {/* Two-column layout: form + preview */}
                  <div style={{display:'flex',gap:'16px',flex:1,minHeight:0}}>

                    {/* Left: form fields */}
                    <div style={{display:'flex',flexDirection:'column',gap:'14px',flex:1,minWidth:0}}>
                      <div className="create-modal-field">
                        <div className="create-modal-label">NAME</div>
                        <input className="create-modal-input" value={newNodeName} onChange={e=>setNewNodeName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleCreateNode()} placeholder="my_function" autoFocus/>
                      </div>
                      <div className="create-modal-field">
                        <div className="create-modal-label">TYPE</div>
                        <div className="type-grid">
                          {['function','entry','helper','hook','util','class'].map(t=>(<button key={t} className={`type-btn ${newNodeType===t?'selected':''}`} onClick={()=>setNewNodeType(t)}>{t}</button>))}
                        </div>
                      </div>
                      <div className="create-modal-field">
                        <div className="create-modal-label">NODE COLOR</div>
                        <div style={{display:'flex', flexWrap:'wrap', gap:'7px', marginTop:'2px'}}>
                          {['#8888aa','#ff435a','#ffc410','#1e836d','#4285f4','#28f1c3','#ff1650','#bb9af7','#5ccfe6','#ffbd5e','#e36209','#72f1b8','#ff8080','#89ddff','#e5c07b','#4ec9b0'].map((c,i)=>(
                            <div key={i} className={`color-dot-btn ${newNodeColor===i?'selected':''}`} style={{background:c, boxShadow: newNodeColor===i ? `0 0 10px ${c}` : 'none'}} onClick={()=>setNewNodeColor(i)} title={c}/>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: live code palette preview */}
                    <div style={{width:'210px',flexShrink:0,display:'flex',flexDirection:'column',gap:'8px'}}>
                      <div style={{fontSize:'9px',opacity:0.35,letterSpacing:'1px',marginBottom:'2px'}}>CODE PALETTE PREVIEW</div>
                      {/* Mini editor preview */}
                      <div style={{borderRadius:'5px',overflow:'hidden',border:`1px solid ${globalEditorPalette.lineNum}55`,flex:1}}>
                        <div style={{background:globalEditorPalette.bg,padding:'4px 8px',borderBottom:`1px solid ${globalEditorPalette.lineNum}44`,display:'flex',alignItems:'center',gap:'5px'}}>
                          {['#ff5f57','#febc2e','#28c840'].map((c,i)=><div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:c,opacity:0.7}}/>)}
                          <span style={{fontSize:'8px',marginLeft:'4px',color:AVATAR_ACCENTS[newNodeColor%AVATAR_ACCENTS.length],fontFamily:"'JetBrains Mono',monospace",opacity:0.8}}>
                            {newNodeName||'untitled'}.py
                          </span>
                        </div>
                        <div className="editor-palette-scope"
                          style={{background:globalEditorPalette.bg,padding:'8px 10px'}}
                          ref={el=>{if(el){[['--syn-kw',globalEditorPalette.kw],['--syn-str',globalEditorPalette.str],['--syn-cmt',globalEditorPalette.cmt],['--syn-num',globalEditorPalette.num],['--syn-fn',globalEditorPalette.fn],['--syn-bi',globalEditorPalette.bi],['--syn-op',globalEditorPalette.op]].forEach(([k,v])=>el.style.setProperty(k,v));}}}>
                          <pre style={{margin:0,fontFamily:"'JetBrains Mono',monospace",fontSize:'9px',lineHeight:'1.65',color:globalEditorPalette.base}}
                            dangerouslySetInnerHTML={{__html:highlightCode(`def ${newNodeName||'untitled'}():\n    # ${newNodeType} node\n    result = []\n    return result`)}}/>
                        </div>
                        {/* Color bar */}
                        <div style={{display:'flex',height:'3px'}}>
                          {[globalEditorPalette.kw,globalEditorPalette.str,globalEditorPalette.fn,globalEditorPalette.num,globalEditorPalette.bi].map((c,i)=>(
                            <div key={i} style={{flex:1,background:c}}/>
                          ))}
                        </div>
                      </div>
                      {/* Palette name + quick switch */}
                      <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'6px 8px',background:'rgba(128,128,128,0.04)',borderRadius:'4px',border:'1px solid rgba(128,128,128,0.08)'}}>
                        <div style={{display:'flex',gap:'3px'}}>
                          {globalEditorPalette.swatches.map((c,i)=><div key={i} style={{width:'7px',height:'7px',borderRadius:'50%',background:c}}/>)}
                        </div>
                        <span style={{fontSize:'9px',flex:1,opacity:0.6,fontFamily:"'JetBrains Mono',monospace"}}>{globalEditorPalette.name}</span>
                        <button style={{fontSize:'8px',padding:'2px 6px',border:'1px solid rgba(128,128,128,0.2)',borderRadius:'3px',background:'transparent',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontFamily:"'JetBrains Mono',monospace'",whiteSpace:'nowrap'}}
                          onClick={()=>setSidebarMode('codepalette')}>
                          CHANGE
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="create-modal-actions">
                    <button className="btn" style={{flex:1,borderColor:'rgba(16,185,129,0.5)',color:'#10b981',background:'rgba(16,185,129,0.05)'}} onClick={handleCreateNode}>CREATE</button>
                    <button className="btn" onClick={()=>setShowCreateNode(false)}>CANCEL</button>
                  </div>
                </div>
              </div>
            )}

            {/* CREATE GROUP MODAL */}
            {showCreateGroup && (
              <div className="create-modal" onPointerDown={()=>setShowCreateGroup(false)}>
                <div className="create-modal-box" onPointerDown={e=>e.stopPropagation()}>
                  <div className="create-modal-title">GROUP AS CLASS</div>
                  <div className="create-modal-field">
                    <div className="create-modal-label">CLASS NAME</div>
                    <input className="create-modal-input" value={groupName} onChange={e=>setGroupName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleCreateGroup()} placeholder="MyClass" autoFocus/>
                  </div>
                  <div className="create-modal-field">
                    <div className="create-modal-label">THREAD COLOR</div>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'7px', marginTop:'2px'}}>
                      {['#10b981','#ff435a','#ffc410','#4285f4','#28f1c3','#ff1650','#bb9af7','#5ccfe6','#ffbd5e','#e36209','#72f1b8','#ff8080','#89ddff','#e5c07b','#4ec9b0','#c792ea'].map(c=>(
                        <div key={c} className={`color-dot-btn ${groupColor===c?'selected':''}`} style={{background:c, boxShadow: groupColor===c ? `0 0 10px ${c}` : 'none'}} onClick={()=>setGroupColor(c)} title={c}/>
                      ))}
                    </div>
                  </div>
                  <div className="create-modal-field">
                    <div className="create-modal-label">MEMBER NODES (min 2)</div>
                    <div style={{display:'flex',flexDirection:'column',gap:'4px',maxHeight:'170px',overflowY:'auto',marginTop:'4px'}}>
                      {nodesRef.current.map(n=>(
                        <div key={n.id} onClick={()=>setGroupSelected(s=>s.includes(n.id)?s.filter(x=>x!==n.id):[...s,n.id])}
                          style={{padding:'7px 10px',border:'1px solid '+(groupSelected.includes(n.id)?groupColor:'rgba(128,128,128,0.15)'),background:groupSelected.includes(n.id)?groupColor+'10':'transparent',borderRadius:'3px',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px',transition:'all 0.12s'}}>
                          <div style={{width:'6px',height:'6px',borderRadius:'50%',background:groupSelected.includes(n.id)?groupColor:'rgba(128,128,128,0.25)',flexShrink:0}}/>
                          <span style={{fontSize:'10px',flex:1,color:groupSelected.includes(n.id)?groupColor:'inherit'}}>{n.label}</span>
                          <span style={{fontSize:'9px',opacity:0.3}}>{n.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{fontSize:'9px',opacity:0.35}}>{groupSelected.length} selected (need ≥2)</div>
                  <div className="create-modal-actions">
                    <button className="btn" onClick={handleCreateGroup} style={{flex:1,borderColor:groupSelected.length>=2&&groupName.trim()?groupColor+'88':'rgba(128,128,128,0.2)',color:groupSelected.length>=2&&groupName.trim()?groupColor:'rgba(128,128,128,0.3)'}}>CREATE CLASS</button>
                    <button className="btn" onClick={()=>setShowCreateGroup(false)}>CANCEL</button>
                  </div>
                </div>
              </div>
            )}

            {/* FILE EDITOR MODAL — styled like group editor */}
            {activeTabId && (
              <div className="grp-editor-overlay" onPointerDown={()=>setActiveTabId(null)}>
                {activeTabNode && (() => {
                  const grp = groupsRef.current.find(g => g.nodeIds.includes(activeTabNode.id));
                  const nodeAccent = AVATAR_ACCENTS[activeTabNode.themeIdx % AVATAR_ACCENTS.length];
                  const lineCount = (activeTabNode.code || '').split('\n').length;
                  const wordCount = (activeTabNode.code || '').trim() ? (activeTabNode.code || '').trim().split(/\s+/).length : 0;
                  return (
                    <div className="grp-editor-shell" onPointerDown={e => e.stopPropagation()}>

                      {/* Window chrome */}
                      <div className="grp-editor-chrome">
                        <div className="grp-chrome-dot" style={{background:'#ff5f57'}} onClick={() => setActiveTabId(null)}/>
                        <div className="grp-chrome-dot" style={{background:'#febc2e'}}/>
                        <div className="grp-chrome-dot" style={{background:'#28c840'}}/>
                        <div className="grp-chrome-sep"/>
                        <div className="manga-chrome-chapter">
                          <span style={{fontFamily:"'Bangers',sans-serif",fontSize:'1rem',letterSpacing:'.06em',color:nodeAccent,lineHeight:1}}>CH.{String((activeTabNode.themeIdx % 20) + 1).padStart(2,'0')}</span>
                        </div>
                        {/* Tab bar inline in chrome */}
                        <div style={{display:'flex', gap:'0', overflow:'hidden', flex:1, borderRadius:'0', background:'rgba(0,0,0,0.2)', border:'1px solid rgba(255,255,255,0.06)'}}>
                          {openTabs.map(id => {
                            const n = nodesRef.current.find(x => x.id === id); if (!n) return null;
                            const acc = AVATAR_ACCENTS[n.themeIdx % AVATAR_ACCENTS.length];
                            const isActive = activeTabId === id;
                            return (
                              <div key={id} onClick={() => setActiveTabId(id)}
                                style={{display:'flex', alignItems:'center', gap:'7px', padding:'5px 12px', cursor:'pointer', fontSize:'10px', fontFamily:"'JetBrains Mono',monospace", borderRight:'1px solid rgba(255,255,255,0.06)', background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent', borderBottom: isActive ? `2px solid ${acc}` : '2px solid transparent', whiteSpace:'nowrap', transition:'all 0.15s', color: isActive ? acc : 'rgba(255,255,255,0.4)', minWidth:'100px', justifyContent:'space-between'}}>
                                <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                  <I.FileIcon/>
                                  <span>{n.label}</span>
                                  {n.modified && <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410',display:'inline-block'}}/>}
                                </div>
                                <span style={{opacity:0.35, cursor:'pointer', padding:'1px 3px', marginLeft:'4px'}}
                                  onClick={e=>{e.stopPropagation();const t=openTabs.filter(x=>x!==id);setOpenTabs(t);if(activeTabId===id)setActiveTabId(t.length?t[t.length-1]:null);}}>✕</span>
                              </div>
                            );
                          })}
                        </div>
                        <span className="grp-chrome-meta" style={{marginLeft:'10px'}}>{openTabs.length} OPEN</span>
                        <button className="editor-toolbar-btn" style={{marginLeft:'8px', fontSize:'9px', flexShrink:0}} onClick={() => setActiveTabId(null)}>✕ CLOSE</button>
                      </div>

                      <div className="grp-editor-body">

                        {/* Sidebar */}
                        <div className="grp-sidebar">
                          {/* Manga art panel — node avatar */}
                          <div className="manga-editor-art">
                            <img src={`/manga/${encodeURIComponent(MANGA_RAW[activeTabNode.themeIdx % MANGA_RAW.length])}`} alt="" draggable="false"/>
                            <div className="manga-editor-art-meta">
                              <span className="manga-editor-art-ch">CH.{String((activeTabNode.themeIdx % 20) + 1).padStart(2,'0')}</span>
                              <span className="manga-editor-art-kind">{activeTabNode.type.toUpperCase()}</span>
                            </div>
                            <div className="manga-editor-art-accent" style={{background:nodeAccent}}/>
                          </div>
                          <div className="grp-sidebar-hdr">
                            <div className="grp-sidebar-sup">FILE INFO</div>
                            <div className="grp-sidebar-classname" style={{color: nodeAccent}}>{activeTabNode.label}</div>
                          </div>

                          {/* File metadata */}
                          <div style={{padding:'10px 14px 10px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                            <div style={{fontSize:'8px', opacity:0.3, letterSpacing:'1.3px', marginBottom:'8px', fontFamily:"'JetBrains Mono',monospace"}}>METADATA</div>
                            <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                              {[
                                ['TYPE', activeTabNode.type],
                                ['STATUS', activeTabNode.modified ? 'MODIFIED' : 'CLEAN'],
                                ['GROUP', grp ? grp.name : '—'],
                              ].map(([k,v]) => (
                                <div key={k} style={{display:'flex', justifyContent:'space-between', fontSize:'9px', fontFamily:"'JetBrains Mono',monospace"}}>
                                  <span style={{opacity:0.3}}>{k}</span>
                                  <span style={{color: k==='STATUS' ? (activeTabNode.modified?'#ffc410':'#10b981') : k==='GROUP' && grp ? grp.color : nodeAccent, fontWeight:'bold'}}>{v}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Open files list */}
                          <div style={{padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                            <div style={{padding:'4px 14px 6px', fontSize:'8px', opacity:0.3, letterSpacing:'1.3px', fontFamily:"'JetBrains Mono',monospace"}}>OPEN FILES</div>
                            {openTabs.map(id => {
                              const n = nodesRef.current.find(x => x.id === id); if (!n) return null;
                              const acc = AVATAR_ACCENTS[n.themeIdx % AVATAR_ACCENTS.length];
                              return (
                                <div key={id} className={`grp-member-row ${activeTabId===id?'active':''}`}
                                  style={{borderLeftColor: activeTabId===id ? acc : 'transparent', color: acc}}
                                  onClick={() => setActiveTabId(id)}>
                                  <div className="grp-member-dot" style={{background: acc, boxShadow: activeTabId===id?`0 0 6px ${acc}`:'none'}}/>
                                  <div className="grp-member-info">
                                    <div className="grp-member-fname">{n.label}</div>
                                    <div className="grp-member-ftype">{n.type.toUpperCase()}</div>
                                  </div>
                                  {n.modified && <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410',flexShrink:0}}/>}
                                </div>
                              );
                            })}
                          </div>

                          {/* Stats */}
                          <div className="grp-sidebar-stats">
                            <div style={{fontSize:'8px', opacity:0.3, letterSpacing:'1.3px', marginBottom:'3px', fontFamily:"'JetBrains Mono',monospace"}}>STATS</div>
                            <div className="grp-stat-row"><span className="grp-stat-label">LINES</span><span className="grp-stat-val" style={{color:'#10b981'}}>{lineCount}</span></div>
                            <div className="grp-stat-row"><span className="grp-stat-label">WORDS</span><span className="grp-stat-val" style={{color:'#ffc410'}}>{wordCount}</span></div>
                            <div className="grp-stat-row"><span className="grp-stat-label">SIZE</span><span className="grp-stat-val" style={{color:'#4285f4'}}>{((activeTabNode.code||'').length/1024).toFixed(1)}kb</span></div>
                            <div className="grp-stat-row"><span className="grp-stat-label">OPEN TABS</span><span className="grp-stat-val" style={{color: nodeAccent}}>{openTabs.length}</span></div>
                          </div>
                        </div>

                        {/* Main code editor */}
                        <div className="manga-editor-code-col" style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0}}>
                          <CodeEditor
                            node={activeTabNode}
                            externalPalette={globalEditorPalette}
                            onChange={code => {
                              const node = nodesRef.current.find(n => n.id === activeTabNode.id);
                              if (node) { node.code = code; node.modified = true; forceRender({}); clearTimeout(saveCodeTimerRef.current[node.id]); saveCodeTimerRef.current[node.id] = setTimeout(()=>wsHook.saveCode(node.id, code).catch(()=>{}), 1200); }
                            }}
                          />
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ── GROUP CLASS EDITOR MODAL ── */}
            {openGroup && (
              <GroupEditor
                group={openGroup}
                nodes={nodesRef.current}
                onClose={closeGroupEditor}
                onOpenNode={(id) => { closeGroupEditor(); openNodeInEditor(id); }}
              />
            )}

          </div>
        </div>
      );
    }

    function IDEWithCmd({ initialTheme, initialAvatar }) {
      const [showCmd, setShowCmd] = useState(false);
      useEffect(() => { const h = (e) => { if((e.metaKey||e.ctrlKey)&&e.key==='p'){e.preventDefault();setShowCmd(v=>!v);} if(e.key==='Escape')setShowCmd(false); }; window.addEventListener('keydown',h); return()=>window.removeEventListener('keydown',h); },[]);
      return (
        <>
          <IDE initialTheme={initialTheme} initialAvatar={initialAvatar}/>
          <CommandPalette isOpen={showCmd} onClose={()=>setShowCmd(false)} onAction={()=>{}}/>
        </>
      );
    }

    const BOOT_AVATAR_NAMES = ['OUROBOROS','TRISKELION','HELM OF AWE','CELTIC KNOT','TRIQUETRA','HEXAGON'];
    const BOOT_ACCENT_COLORS = ['#ff2a38','#ccff00','#00ff55','#ff2a38','#ccff00','#00ff55'];

    function HudCorners({ color = '#ff2a38', size = 14, thickness = 1.5 }) {
      const s = { position:'absolute', width:size+'px', height:size+'px', borderColor:color, borderStyle:'solid' };
      return (
        <>
          <div style={{...s, top:6, left:6, borderWidth:`${thickness}px 0 0 ${thickness}px`}}/>
          <div style={{...s, top:6, right:6, borderWidth:`${thickness}px ${thickness}px 0 0`}}/>
          <div style={{...s, bottom:6, left:6, borderWidth:`0 0 ${thickness}px ${thickness}px`}}/>
          <div style={{...s, bottom:6, right:6, borderWidth:`0 ${thickness}px ${thickness}px 0`}}/>
        </>
      );
    }

    function Bootloader() {
      const [theme, setTheme] = useState(null);
      const [avatar, setAvatar] = useState(null);
      const [hovered, setHovered] = useState(null);
      const [bgIdx, setBgIdx] = useState(0);
      const [tick, setTick] = useState(0);

      useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(id);
      }, []);

      useEffect(() => {
        const t = setInterval(() => setBgIdx(i => (i + 1) % MANGA_RAW.length), 6000);
        return () => clearInterval(t);
      }, []);

      if (theme && avatar !== null) return <IDEWithCmd initialTheme={theme} initialAvatar={avatar}/>;

      const OPERATORS = [
        { name:'GHOST',   code:'0xAV001', num:'01' },
        { name:'BLADE',   code:'0xAV002', num:'02' },
        { name:'CIPHER',  code:'0xAV003', num:'03' },
        { name:'WRAITH',  code:'0xAV004', num:'04' },
        { name:'SPECTRE', code:'0xAV005', num:'05' },
        { name:'NEXUS',   code:'0xAV006', num:'06' },
      ];
      const timeStr = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
      const selOp = avatar !== null ? OPERATORS[avatar] : null;
      const enc = f => encodeURIComponent(f);

      return (
        <div style={{
          width:'100vw', height:'100vh',
          background:'#f4f0e8',
          fontFamily:"'Share Tech Mono','JetBrains Mono',monospace",
          display:'flex', flexDirection:'column', overflow:'hidden', position:'relative',
        }}>
          {/* SCREENTONE */}
          <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
            backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.07) 1.2px,transparent 1.2px)',
            backgroundSize:'6px 6px'}}/>

          {/* SPEED LINES */}
          <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:1,
            background:`conic-gradient(from 0deg at 50% 46%,
              transparent 0deg,rgba(0,0,0,0.022) 1.5deg,transparent 3deg,
              transparent 14deg,rgba(0,0,0,0.022) 15.5deg,transparent 17deg,
              transparent 30deg,rgba(0,0,0,0.022) 31.5deg,transparent 33deg,
              transparent 47deg,rgba(0,0,0,0.022) 48.5deg,transparent 50deg,
              transparent 65deg,rgba(0,0,0,0.022) 66.5deg,transparent 68deg,
              transparent 85deg,rgba(0,0,0,0.022) 86.5deg,transparent 88deg,
              transparent 108deg,rgba(0,0,0,0.022) 109.5deg,transparent 111deg,
              transparent 132deg,rgba(0,0,0,0.022) 133.5deg,transparent 135deg,
              transparent 158deg,rgba(0,0,0,0.022) 159.5deg,transparent 161deg,
              transparent 185deg,rgba(0,0,0,0.022) 186.5deg,transparent 188deg,
              transparent 212deg,rgba(0,0,0,0.022) 213.5deg,transparent 215deg,
              transparent 238deg,rgba(0,0,0,0.022) 239.5deg,transparent 241deg,
              transparent 265deg,rgba(0,0,0,0.022) 266.5deg,transparent 268deg,
              transparent 292deg,rgba(0,0,0,0.022) 293.5deg,transparent 295deg,
              transparent 320deg,rgba(0,0,0,0.022) 321.5deg,transparent 323deg,
              transparent 345deg,rgba(0,0,0,0.022) 346.5deg,transparent 348deg)`}}/>

          {/* TOP STRIP */}
          <div style={{height:'48px',background:'#0a0a0a',flexShrink:0,
            display:'flex',alignItems:'center',padding:'0 1.2rem',gap:'0.8rem',
            zIndex:10,position:'relative',borderBottom:'4px solid #d0021b'}}>
            <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'1.75rem',letterSpacing:'0.1em',color:'#f4f0e8',lineHeight:1}}>
              FOR<span style={{color:'#d0021b'}}>BID</span>EN
            </div>
            <div style={{width:'3px',height:'28px',background:'#d0021b',flexShrink:0}}/>
            <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
              <div style={{fontSize:'0.38rem',color:'#f5c518',letterSpacing:'0.2em',fontFamily:"'Oswald',sans-serif",fontWeight:700}}>GRAPH IDE // VOL.1</div>
              <div style={{fontSize:'0.32rem',color:'rgba(255,255,255,0.3)',letterSpacing:'0.15em'}}>OPERATOR WORKSTATION</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'0.8rem'}}>
              {selOp && (
                <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  <div style={{width:'28px',height:'28px',border:'2px solid #d0021b',overflow:'hidden'}}>
                    <img src={`/avatars/0xAV00${avatar+1}s.jpeg`} alt={selOp.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'0.7rem',color:'#d0021b',letterSpacing:'0.1em'}}>{selOp.name}</div>
                </div>
              )}
              <div style={{fontSize:'0.38rem',color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em'}}>{timeStr}</div>
            </div>
          </div>

          {/* MAIN BODY */}
          <div style={{flex:1,display:'flex',overflow:'hidden',position:'relative',zIndex:5}}>

            {/* LEFT: Operator portrait + grid */}
            <div style={{width:'clamp(220px,33%,380px)',flexShrink:0,borderRight:'4px solid #0a0a0a',
              display:'flex',flexDirection:'column',background:'#0a0a0a'}}>

              {/* Big portrait */}
              <div style={{flex:1,position:'relative',overflow:'hidden',borderBottom:'4px solid #0a0a0a'}}>
                <img
                  src={avatar !== null ? `/avatars/0xAV00${avatar+1}s.jpeg` : `/avatars/0xAV001s.jpeg`}
                  alt=""
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block',
                    filter: avatar !== null ? 'contrast(1.12) saturate(0.92)' : 'contrast(1) saturate(0.3) brightness(0.35)',
                    transition:'filter 0.4s'}}
                />
                <div style={{position:'absolute',inset:0,pointerEvents:'none',
                  backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.15) 1px,transparent 1px)',
                  backgroundSize:'4px 4px',mixBlendMode:'multiply'}}/>
                {/* Caption */}
                <div style={{position:'absolute',bottom:0,left:0,right:0,
                  background:'rgba(10,10,10,0.92)',padding:'0.55rem 0.9rem',borderTop:'3px solid #d0021b'}}>
                  <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'1.4rem',letterSpacing:'0.1em',color:'#f4f0e8',lineHeight:1}}>
                    {avatar !== null ? OPERATORS[avatar].name : 'SELECT'}
                  </div>
                  <div style={{fontSize:'0.36rem',color:'#d0021b',letterSpacing:'0.15em',marginTop:'2px',fontFamily:"'Oswald',sans-serif",fontWeight:700}}>
                    {avatar !== null ? OPERATORS[avatar].code : 'OPERATOR →'}
                  </div>
                </div>
                <div style={{position:'absolute',top:'0.7rem',left:'0.7rem',
                  background:'#d0021b',color:'#f4f0e8',fontFamily:"'Bangers',sans-serif",
                  fontSize:'0.65rem',padding:'2px 7px',letterSpacing:'0.1em',border:'2px solid #f4f0e8'}}>
                  VOL.1
                </div>
              </div>

              {/* Operator grid */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'3px',padding:'3px',background:'#111',flexShrink:0}}>
                {OPERATORS.map((op, i) => (
                  <div key={i} onClick={() => setAvatar(i)}
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                    style={{position:'relative',overflow:'hidden',cursor:'pointer',aspectRatio:'1',
                      border: avatar===i ? '2px solid #d0021b' : '2px solid #2a2a2a',
                      transition:'all 0.15s',
                      transform: avatar===i ? 'scale(1.06)' : hovered===i ? 'scale(1.02)' : 'scale(1)',
                      zIndex: avatar===i ? 2 : 1}}>
                    <img src={`/avatars/0xAV00${i+1}s.jpeg`} alt={op.name}
                      style={{width:'100%',height:'100%',objectFit:'cover',display:'block',
                        filter: avatar===i ? 'none' : 'grayscale(65%) brightness(0.65)'}}/>
                    <div style={{position:'absolute',top:0,left:0,
                      background: avatar===i ? '#d0021b' : '#0a0a0a',
                      color:'#f4f0e8',fontSize:'0.38rem',fontFamily:"'Bangers',sans-serif",
                      padding:'1px 4px',letterSpacing:'0.06em'}}>{op.num}</div>
                    <div style={{position:'absolute',bottom:0,left:0,right:0,
                      background: avatar===i ? 'rgba(208,2,27,0.92)' : 'rgba(10,10,10,0.82)',padding:'2px 4px'}}>
                      <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'0.46rem',color:'#f4f0e8',letterSpacing:'0.06em'}}>{op.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GUTTER */}
            <div style={{width:'6px',background:'#0a0a0a',flexShrink:0}}/>

            {/* RIGHT: Title + engine panels */}
            <div style={{flex:1,display:'flex',flexDirection:'column',background:'#f4f0e8',overflow:'hidden',position:'relative'}}>

              {/* Title panel */}
              <div style={{padding:'1rem 1.5rem 0.8rem',borderBottom:'4px solid #0a0a0a',position:'relative',overflow:'hidden',flexShrink:0}}>
                <div style={{position:'absolute',inset:0,pointerEvents:'none',
                  backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)',
                  backgroundSize:'5px 5px'}}/>
                <div style={{position:'relative',zIndex:1}}>
                  <div style={{display:'inline-block',background:'#d0021b',color:'#f4f0e8',
                    fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.44rem',
                    letterSpacing:'0.2em',padding:'2px 8px',marginBottom:'0.5rem'}}>
                    CHAPTER 01 // SYSTEM BOOT
                  </div>
                  <div style={{fontFamily:"'Bangers',sans-serif",
                    fontSize:'clamp(2rem,5.5vw,4rem)',
                    letterSpacing:'0.05em',lineHeight:0.88,color:'#0a0a0a',WebkitTextStroke:'2px #0a0a0a'}}>
                    FOR<span style={{color:'#d0021b',WebkitTextStroke:'2px #d0021b'}}>BID</span>EN
                  </div>
                  <div style={{fontSize:'0.4rem',color:'#555',letterSpacing:'0.16em',marginTop:'0.35rem',fontFamily:"'Share Tech Mono',monospace"}}>
                    {selOp ? `OPERATIVE [${selOp.name}] IDENTIFIED — SELECT ENGINE` : 'DUAL-ENGINE GRAPH IDE // SELECT YOUR OPERATOR'}
                  </div>
                </div>
              </div>

              {/* Engine panels — two tall full-bleed manga pages */}
              <div style={{flex:1,display:'flex',overflow:'hidden'}}>

                {/* DARK MANGA panel */}
                <button
                  onClick={() => { if(avatar !== null) setTheme('cyber'); }}
                  onMouseEnter={e => { if(avatar !== null) e.currentTarget.style.outline='4px solid #d0021b'; }}
                  onMouseLeave={e => { e.currentTarget.style.outline='none'; }}
                  style={{flex:1,border:'none',outline:'none',padding:0,cursor: avatar !== null ? 'pointer' : 'default',
                    display:'flex',flexDirection:'column',position:'relative',overflow:'hidden',
                    borderRight:'4px solid #0a0a0a',
                    opacity: avatar !== null ? 1 : 0.5, transition:'opacity 0.3s'}}>
                  {/* Rotating manga BG */}
                  <img src={`/manga/${enc(MANGA_RAW[bgIdx])}`} alt=""
                    style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',
                      filter:'contrast(1.2) brightness(0.32) saturate(0.65)',pointerEvents:'none',
                      transition:'opacity 1s'}}/>
                  {/* Speed lines */}
                  <div style={{position:'absolute',inset:0,pointerEvents:'none',
                    background:`conic-gradient(from 0deg at 30% 55%,
                      transparent 0deg,rgba(255,255,255,0.04) 1.5deg,transparent 3.5deg,
                      transparent 14deg,rgba(255,255,255,0.04) 15.5deg,transparent 17deg,
                      transparent 32deg,rgba(255,255,255,0.04) 33.5deg,transparent 35deg,
                      transparent 52deg,rgba(255,255,255,0.04) 53.5deg,transparent 55deg,
                      transparent 75deg,rgba(255,255,255,0.04) 76.5deg,transparent 78deg)`}}/>
                  {/* Screentone */}
                  <div style={{position:'absolute',inset:0,pointerEvents:'none',
                    backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)',
                    backgroundSize:'5px 5px'}}/>
                  {/* Red accent triangle — top left */}
                  <div style={{position:'absolute',top:0,left:0,width:0,height:0,pointerEvents:'none',
                    borderStyle:'solid',borderWidth:'0 0 60px 60px',
                    borderColor:`transparent transparent transparent #d0021b`,zIndex:3}}/>
                  <div style={{position:'absolute',top:'6px',left:'4px',zIndex:4,
                    fontFamily:"'Bangers',sans-serif",fontSize:'0.55rem',color:'#f4f0e8',
                    letterSpacing:'0.05em',lineHeight:1,pointerEvents:'none'}}>01</div>
                  {/* Content */}
                  <div style={{position:'relative',zIndex:2,flex:1,display:'flex',flexDirection:'column',
                    justifyContent:'flex-end',padding:'1rem 1.2rem 0.9rem',gap:'0.3rem'}}>
                    <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'0.5rem',letterSpacing:'0.15em',
                      color:'rgba(255,255,255,0.35)',marginBottom:'0.1rem'}}>ENGINE 01 // FORSAKEN</div>
                    <div style={{fontFamily:"'Bangers',sans-serif",
                      fontSize:'clamp(1.8rem,4vw,3.2rem)',letterSpacing:'0.06em',lineHeight:0.88,
                      color:'#f4f0e8',WebkitTextStroke:'1px rgba(255,255,255,0.2)'}}>
                      DARK<br/>MANGA
                    </div>
                    <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.34rem',
                      color:'rgba(255,255,255,0.4)',letterSpacing:'0.12em',marginTop:'0.2rem'}}>
                      BERSERK MODE // CYBER NOIR
                    </div>
                  </div>
                  <div style={{height:'4px',background:'#d0021b',flexShrink:0,position:'relative',zIndex:2}}/>
                </button>

                {/* LIGHT MANGA panel */}
                <button
                  onClick={() => { if(avatar !== null) setTheme('brutal'); }}
                  onMouseEnter={e => { if(avatar !== null) e.currentTarget.style.outline='4px solid #0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.outline='none'; }}
                  style={{flex:1,border:'none',outline:'none',padding:0,cursor: avatar !== null ? 'pointer' : 'default',
                    display:'flex',flexDirection:'column',position:'relative',overflow:'hidden',
                    background:'#f4f0e8',
                    opacity: avatar !== null ? 1 : 0.5, transition:'opacity 0.3s'}}>
                  {/* Washed-out manga art BG */}
                  <img src={`/manga/${enc(MANGA_RAW[(bgIdx + 8) % MANGA_RAW.length])}`} alt=""
                    style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',
                      filter:'contrast(0.6) brightness(1.45) saturate(0) opacity(0.35)',pointerEvents:'none'}}/>
                  {/* Screentone over BG */}
                  <div style={{position:'absolute',inset:0,pointerEvents:'none',
                    backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.1) 1.2px,transparent 1.2px)',
                    backgroundSize:'6px 6px'}}/>
                  {/* Horizontal speed lines */}
                  <div style={{position:'absolute',inset:0,pointerEvents:'none',
                    background:`repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 11px,
                      rgba(0,0,0,0.015) 11px,
                      rgba(0,0,0,0.015) 12px
                    )`}}/>
                  {/* Black accent triangle — top left */}
                  <div style={{position:'absolute',top:0,left:0,width:0,height:0,pointerEvents:'none',
                    borderStyle:'solid',borderWidth:'0 0 60px 60px',
                    borderColor:`transparent transparent transparent #0a0a0a`,zIndex:3}}/>
                  <div style={{position:'absolute',top:'6px',left:'4px',zIndex:4,
                    fontFamily:"'Bangers',sans-serif",fontSize:'0.55rem',color:'#f4f0e8',
                    letterSpacing:'0.05em',lineHeight:1,pointerEvents:'none'}}>02</div>
                  {/* Content */}
                  <div style={{position:'relative',zIndex:2,flex:1,display:'flex',flexDirection:'column',
                    justifyContent:'flex-end',padding:'1rem 1.2rem 0.9rem',gap:'0.3rem'}}>
                    <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'0.5rem',letterSpacing:'0.15em',
                      color:'rgba(0,0,0,0.35)',marginBottom:'0.1rem'}}>ENGINE 02 // BRUTALIST</div>
                    <div style={{fontFamily:"'Bangers',sans-serif",
                      fontSize:'clamp(1.8rem,4vw,3.2rem)',letterSpacing:'0.06em',lineHeight:0.88,
                      color:'#0a0a0a',WebkitTextStroke:'2px #0a0a0a'}}>
                      LIGHT<br/>MANGA
                    </div>
                    <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.34rem',
                      color:'rgba(0,0,0,0.45)',letterSpacing:'0.12em',marginTop:'0.2rem'}}>
                      CLASSIC MODE // MANGA INK
                    </div>
                  </div>
                  <div style={{height:'4px',background:'#0a0a0a',flexShrink:0,position:'relative',zIndex:2}}/>
                </button>
              </div>

              {/* Select-operator hint — yellow caption bar, shown only when no avatar selected */}
              {avatar === null && (
                <div style={{padding:'0.45rem 1.2rem',background:'#f5c518',
                  borderTop:'3px solid #0a0a0a',flexShrink:0,
                  display:'flex',alignItems:'center',gap:'0.6rem'}}>
                  <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'1rem',color:'#0a0a0a',lineHeight:1}}>←</div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'0.4rem',letterSpacing:'0.18em',color:'#0a0a0a'}}>
                    SELECT AN OPERATOR FROM THE ROSTER FIRST
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM MANGA STRIP */}
          <div style={{height:'68px',borderTop:'4px solid #0a0a0a',background:'#0a0a0a',
            display:'flex',gap:0,flexShrink:0,overflow:'hidden',position:'relative',zIndex:10}}>
            <style>{`
              @keyframes boot-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
              .boot-strip { display:flex; animation:boot-scroll 45s linear infinite; width:max-content; }
              .boot-strip:hover { animation-play-state:paused; }
            `}</style>
            <div className="boot-strip">
              {[...MANGA_RAW.slice(0,22), ...MANGA_RAW.slice(0,22)].map((img, i) => (
                <div key={i} style={{width:'90px',height:'68px',flexShrink:0,borderRight:'2px solid #1a1a1a',overflow:'hidden',position:'relative'}}>
                  <img src={`/manga/${enc(img)}`} alt=""
                    style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'contrast(1.05) brightness(0.8)'}}
                    loading="lazy"/>
                  <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.1) 1px,transparent 1px)',backgroundSize:'4px 4px',pointerEvents:'none'}}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    export default Bootloader;