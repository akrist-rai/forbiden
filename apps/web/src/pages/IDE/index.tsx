// @ts-nocheck
import './ide.css'
import './manga.css'
import './ide-v2.css'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'

// ══════════════════════════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════════════════════════

const MANGA_RAW = [
  // named art
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
  'litterally chainsaw man.jpeg','mob psycho 100.jpeg','Mob psycho 100.jpeg',
  'Korean Edition Manga [phantom Busters] 팬텀 버스터즈 (jmanga227).jpeg',
  'SONS OF THE DEVIL Covers 1-5 - toni infante.jpeg',
  'One piece wano x Gta.jpeg','yhwach god of the Quincy.jpeg',
  'Credit_ Twitter @avenoirn.jpeg',
  '20Th Century Boys_ The Perfect Edition, Vol_ 11.jpeg',
  'Dandadan _ @lihaolow • tw ☆.jpeg',
  'Makimq is listening 🤫_ Social Poster design #Anime #Poster.jpeg',
  'Corazon 💔.jpeg','move! move! just like mob!💥.jpeg',
  '1997_ The start of an adventure ☠️🏝.jpeg',
  'ishigori ryu _ @neggi_ on X.jpeg','zzyzzyy on X.jpeg',
  'Sukuna”.jpeg','Hoạt - Poster  _ Facebook.jpeg',
  'AdriGold 🍊 (@GoldDAdri_) on X.jpeg',
  'Ai, Feel free to use.jpeg','fashionstation 230226x778.jpeg',
  'Best _GOODNIGHT PUNPUN_ Fan Graphic Cover _ Poster💪.jpeg',
  'Makima! 🩸__#Makima #ChainsawMan_#ChainsawManFanart #AnimeArt_#DigitalPainting.jpeg',
  'Mess🌿 (@Messcult) on X.jpeg','チェンソーマン ＃１.jpeg',
  '𝐔𝐬𝐨𝐩𝐩.jpeg','🥀.jpeg',
  // additional art
  '@Zuuhl82.jpeg','@jshdirk on X.jpeg',
  'Anime Posters Online - Shop Unique Metal Prints, Pictures, Paintings _ Displate.jpeg',
  'COMICリュエル&COMICジャルダン｜実業之日本社のwebコミックサイト -COMICリュエルVeil-.jpeg',
  "Goodbye Merry _ @IfihasR5 • tw _').jpeg",
  'Haunting HypatiaThe Literary Lunacy of a Geeky Librarian.jpeg',
  'Instagram (1).jpeg',
  "I’LL TAKE CARE OF YOU _ TYLER THE CREATOR _ DON’T TAP THE GLASS _ FLOWER BOY.jpeg",
  'One piece “NAKAMAS”.jpeg',
  'Post by @plankos · 1 image.jpeg',
  'Rym 🏴_☠️ (@miu_wallp) on X.jpeg',
  'X (1).jpeg','X (2).jpeg',
  'credit_@sotoko3924 (tw).jpeg',
  'https___twitter_com_7a99och_status_1797239183561396317.jpeg',
  'https___x_com_7a99o__status_1952800016587968865.jpeg',
  'kawaii_cute food – marker style drawing.jpeg',
  'twitter_ @jin__nai.jpeg',
  '_For me especially I had given gift to own my self a new heart.jpeg',
  '_𝐈𝐜𝐨𝐧𝐬.jpeg',
  '˙⊹ ੈ✰┆𝑨𝒚𝒂𝒔𝒆 𝒎𝒐𝒎𝒐.jpeg',
  'Пин от пользователя Toyo Veronica на доске photography _ Концептуальная.jpeg',
  '✧Sanji✧_•One Piece•_ Art by X@_—aywakutakuay_#anime #animeicons #fanarts #onepiece #onepieceart #onepiecefanarts #Sanji #BlacklegSanji #Sanjiart #Sanjifanart_.jpeg',
  '✰.jpeg',
  '大叔控 海王 (@EnPo31Sla) on X.jpeg',
  '楽天ブックス_ onBLUE　vol．48 - 紀伊 カンナ - 9784396785086 _ 本.jpeg',
  '𝑊𝑎𝑙𝑙𝑝𝑎𝑝𝑒𝑟 _ 𝐿𝑜𝑐𝑘𝑠𝑐𝑟𝑒𝑒𝑛 _ One piece tattoos, One piece wallpaper iphone, One piece pictures.jpeg',
  '𝒱𝑒il  #_𝑎𝑟𝑡_ 𝑠𝑎𝑠ℎ𝑖𝑜𝑠 𝑜𝑛 𝑖𝑛𝑠𝑡𝑎.jpeg',
  '𝘽𝙚𝙧𝙨𝙚𝙧𝙠𝙚𝙧.jpeg',
  // numbered sets
  '_ (70).jpeg','_ (71).jpeg','_ (72).jpeg','_ (73).jpeg','_ (74).jpeg',
  '_ (75).jpeg','_ (76).jpeg','_ (77).jpeg','_ (78).jpeg','_ (79).jpeg',
  '_ (80).jpeg','_ (81).jpeg','_ (82).jpeg','_ (83).jpeg','_ (84).jpeg',
  '_ (85).jpeg','_ (86).jpeg','_ (87).jpeg','_ (88).jpeg','_ (89).jpeg',
  '_ (90).jpeg','_ (91).jpeg','_ (92).jpeg','_ (93).jpeg','_ (94).jpeg',
  '_ (95).jpeg','_ (96).jpeg','_ (97).jpeg','_ (98).jpeg','_ (99).jpeg',
  '_ (100).jpeg',
  // timestamped downloads
  '_ - 2026-05-28T234730.748.jpeg','_ - 2026-05-28T234740.487.jpeg',
  '_ - 2026-05-28T234749.500.jpeg','_ - 2026-05-28T234756.088.jpeg',
  '_ - 2026-05-28T234828.372.jpeg','_ - 2026-05-28T234849.394.jpeg',
  '_ - 2026-05-28T234900.142.jpeg','_ - 2026-05-28T234904.526.jpeg',
  '_ - 2026-05-28T234910.002.jpeg','_ - 2026-05-28T234915.158.jpeg',
  '_ - 2026-05-28T234939.640.jpeg',
  '_ - 2026-05-29T231447.811.jpeg','_ - 2026-05-29T231539.607.jpeg',
  '_ - 2026-05-29T231555.908.jpeg','_ - 2026-05-29T231644.203.jpeg',
  '_ - 2026-05-29T231656.649.jpeg','_ - 2026-05-29T231703.415.jpeg',
  '_ - 2026-05-29T231708.893.jpeg','_ - 2026-05-29T231715.319.jpeg',
  '_ - 2026-05-29T231755.962.jpeg','_ - 2026-05-29T231811.533.jpeg',
  '_ - 2026-05-29T231819.897.jpeg','_ - 2026-05-29T231922.068.jpeg',
  '_ - 2026-05-29T231930.881.jpeg','_ - 2026-05-29T231937.728.jpeg',
  '_ - 2026-05-29T232009.086.jpeg',
  '_ - 2026-05-30T130648.150.jpeg','_ - 2026-05-30T130737.964.jpeg',
  '_ - 2026-05-30T130745.408.jpeg','_ - 2026-05-30T130801.464.jpeg',
  '_ - 2026-05-30T130808.357.jpeg','_ - 2026-05-30T130816.426.jpeg',
  '_ - 2026-05-30T130830.481.jpeg','_ - 2026-05-30T131211.782.jpeg',
  '_ - 2026-05-30T131223.285.jpeg','_ - 2026-05-30T131505.407.jpeg',
  '_ - 2026-05-30T131624.759.jpeg','_ - 2026-05-30T131710.853.jpeg',
  '_ - 2026-05-30T131737.641.jpeg','_ - 2026-05-30T131744.658.jpeg',
  '_ - 2026-05-30T131759.220.jpeg','_ - 2026-05-30T131820.703.jpeg',
  '_ - 2026-05-30T131906.423.jpeg','_ - 2026-05-30T131924.233.jpeg',
  '_ - 2026-05-30T131932.734.jpeg',
  '_ - 2026-05-31T130615.354.jpeg','_ - 2026-05-31T130636.435.jpeg',
  '_ - 2026-05-31T130801.754.jpeg','_ - 2026-05-31T130815.461.jpeg',
  '_ - 2026-05-31T130830.194.jpeg','_ - 2026-05-31T130836.546.jpeg',
  '_ - 2026-05-31T130945.568.jpeg','_ - 2026-05-31T130950.347.jpeg',
  '_ - 2026-05-31T131014.641.jpeg','_ - 2026-05-31T131051.078.jpeg',
  '_ - 2026-05-31T131107.348.jpeg','_ - 2026-05-31T131125.626.jpeg',
  '_ - 2026-05-31T131141.190.jpeg','_ - 2026-05-31T131206.047.jpeg',
  '_ - 2026-05-31T131218.140.jpeg','_ - 2026-05-31T131226.941.jpeg',
  '_ - 2026-05-31T131253.042.jpeg','_ - 2026-05-31T131257.339.jpeg',
  '_ - 2026-05-31T131301.974.jpeg','_ - 2026-05-31T131326.211.jpeg',
  '_ - 2026-05-31T131344.330.jpeg','_ - 2026-05-31T131416.234.jpeg',
  '_ - 2026-05-31T131422.564.jpeg','_ - 2026-05-31T131434.054.jpeg',
  '_ - 2026-05-31T131451.282.jpeg','_ - 2026-05-31T131459.279.jpeg',
  '_ - 2026-05-31T131513.539.jpeg','_ - 2026-05-31T131537.760.jpeg',
  '_ - 2026-05-31T131631.516.jpeg','_ - 2026-05-31T131644.791.jpeg',
  '_ - 2026-05-31T131656.608.jpeg','_ - 2026-05-31T131700.836.jpeg',
  '_ - 2026-05-31T131728.989.jpeg','_ - 2026-05-31T131837.480.jpeg',
  '_ - 2026-05-31T132255.092.jpeg','_ - 2026-05-31T132329.820.jpeg',
  '_ - 2026-05-31T132335.835.jpeg','_ - 2026-05-31T132342.326.jpeg',
  '_ - 2026-05-31T132359.945.jpeg','_ - 2026-05-31T132653.514.jpeg',
  '_ - 2026-05-31T132658.752.jpeg','_ - 2026-05-31T132705.495.jpeg',
  '_ - 2026-05-31T132800.833.jpeg','_ - 2026-05-31T132805.967.jpeg',
  '_ - 2026-05-31T132813.262.jpeg','_ - 2026-05-31T132817.838.jpeg',
  '_ - 2026-05-31T132826.765.jpeg','_ - 2026-05-31T132831.736.jpeg',
  '_ - 2026-05-31T132839.273.jpeg','_ - 2026-05-31T132846.887.jpeg',
  '_ - 2026-05-31T132915.229.jpeg','_ - 2026-05-31T132920.961.jpeg',
  '_ - 2026-05-31T132928.096.jpeg',
  '_ - 2026-06-03T092949.691.jpeg','_ - 2026-06-03T092959.566.jpeg',
  '_ - 2026-06-03T093010.915.jpeg','_ - 2026-06-03T093024.426.jpeg',
  '_ - 2026-06-03T093047.226.jpeg','_ - 2026-06-03T093229.296.jpeg',
  '_ - 2026-06-03T093238.561.jpeg','_ - 2026-06-03T093332.447.jpeg',
  '_ - 2026-06-03T093405.223.jpeg','_ - 2026-06-03T093413.621.jpeg',
  '_ - 2026-06-03T093425.249.jpeg','_ - 2026-06-03T093430.872.jpeg',
  '_ - 2026-06-03T162046.346.jpeg','_ - 2026-06-03T162211.269.jpeg',
  '_ - 2026-06-03T162239.214.jpeg','_ - 2026-06-03T162248.466.jpeg',
  '_ - 2026-06-03T162349.199.jpeg','_ - 2026-06-03T162405.945.jpeg',
]

const ACCENTS = ['#10b981','#ff435a','#ffc410','#4285f4','#28f1c3','#bb9af7','#ff1650','#5ccfe6','#ffbd5e','#e36209','#72f1b8','#ff8080','#89ddff','#e5c07b','#4ec9b0','#c792ea']

const INITIAL_NODES = [
  { id:'n1', type:'entry', label:'main.js', isMain:true, x:0, y:0, vx:0, vy:0, themeIdx:0, modified:false, code:
`// FORBIDEN — Main entry point
const PROJECT = 'FORBIDEN NGO'
const VERSION  = '2.1.0'
const MODULES  = ['utils', 'DataPipeline', 'graph']

console.log(\`[BOOT] \${PROJECT} v\${VERSION}\`)
MODULES.forEach(m => console.log(\`  ↳ loading: \${m}\`))

const uptime = performance.now().toFixed(2)
console.log(\`[READY] Runtime up — \${uptime}ms\`)

return { project: PROJECT, version: VERSION, modules: MODULES, uptime }`
  },
  { id:'n2', type:'function', label:'utils.js', isMain:false, x:150, y:-140, vx:0, vy:0, themeIdx:5, classId:'g1', modified:true, code:
`// Utility helpers
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function randomId(len = 8) {
  return Math.random().toString(36).slice(2, 2 + len).toUpperCase()
}

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max)
}

function debounce(fn, delay) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay) }
}

// Smoke test
console.log(capitalize('forbiden'))
console.log('ID:', randomId())
console.log('clamp(15, 0, 10):', clamp(15, 0, 10))

return { capitalize, randomId, clamp, debounce }`
  },
  { id:'n3', type:'class', label:'DataPipeline.js', isMain:false, x:-110, y:160, vx:0, vy:0, themeIdx:6, classId:'g1', modified:false, code:
`// Composable data pipeline
class DataPipeline {
  constructor(name) {
    this.name = name
    this.stages = []
    this.runs = 0
  }

  pipe(fn) {
    this.stages.push(fn)
    return this // chainable
  }

  run(input) {
    this.runs++
    return this.stages.reduce((acc, fn) => fn(acc), input)
  }
}

// Demo — process an array of numbers
const pipeline = new DataPipeline('demo')
  .pipe(data => data.map(x => x * 2))
  .pipe(data => data.filter(x => x > 4))
  .pipe(data => ({
    values: data,
    sum: data.reduce((a, b) => a + b, 0),
    avg: data.reduce((a, b) => a + b, 0) / data.length
  }))

const result = pipeline.run([1, 2, 3, 4, 5])
console.log('Pipeline:', pipeline.name)
console.log('Result:', result)
console.warn('Runs so far:', pipeline.runs)

return result`
  },
  { id:'n4', type:'function', label:'graph.js', isMain:false, x:70, y:190, vx:0, vy:0, themeIdx:4, classId:null, modified:false, code:
`// Graph traversal utilities
function buildGraph(edges) {
  const g = {}
  for (const [from, to] of edges) {
    ;(g[from] ??= []).push(to)
    ;(g[to]   ??= [])
  }
  return g
}

function bfs(graph, start) {
  const visited = new Set([start])
  const queue = [start]
  const order = []
  while (queue.length) {
    const node = queue.shift()
    order.push(node)
    for (const nb of (graph[node] || [])) {
      if (!visited.has(nb)) { visited.add(nb); queue.push(nb) }
    }
  }
  return order
}

function pageRank(graph, iters = 20, d = 0.85) {
  const nodes = Object.keys(graph)
  const N = nodes.length
  const rank = Object.fromEntries(nodes.map(n => [n, 1 / N]))
  for (let i = 0; i < iters; i++) {
    const next = Object.fromEntries(nodes.map(n => [n, (1 - d) / N]))
    for (const [src, dsts] of Object.entries(graph)) {
      for (const dst of dsts) {
        next[dst] = (next[dst] || 0) + d * (rank[src] / (dsts.length || 1))
      }
    }
    Object.assign(rank, next)
  }
  return rank
}

const edges = [
  ['main', 'utils'], ['main', 'DataPipeline'],
  ['utils', 'graph'], ['DataPipeline', 'graph'],
]
const G = buildGraph(edges)
const traversal = bfs(G, 'main')
const ranks = pageRank(G)

console.log('BFS from main:', traversal)
console.table(Object.entries(ranks).map(([n,r]) => ({ node:n, rank: r.toFixed(4) })))

return { graph: G, traversal, ranks }`
  },
]
const INITIAL_EDGES = [{id:'e1',source:'n1',target:'n2'},{id:'e2',source:'n1',target:'n3'},{id:'e3',source:'n2',target:'n4'},{id:'e4',source:'n3',target:'n4'}]
const INITIAL_GROUPS = [{id:'g1',name:'CoreLayer',color:'#10b981',nodeIds:['n2','n3']}]
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
}

const CMD_ITEMS = [
  { icon:'F', label:'New file node', hint:'N' },
  { icon:'D', label:'New doc node (.md)', hint:'' },
  { icon:'G', label:'New class group', hint:'G' },
  { icon:'J', label:'Join nodes (add edge)', hint:'J' },
  { icon:'X', label:'Cut edge', hint:'X' },
  { icon:'▶', label:'Run current file (JS)', hint:'Ctrl+Enter' },
  { icon:'>', label:'Open JS console', hint:'' },
  { icon:'/', label:'Toggle comment', hint:'Ctrl+/' },
  { icon:'T', label:'Open terminal', hint:'`' },
  { icon:'B', label:'Open board', hint:'' },
  { icon:'⌘', label:'Open Command Palette', hint:'Ctrl+P' },
]

const PALETTES = [
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
  { id:'kanagawa',   name:'KANAGAWA',      bg:'#1f1f28', base:'#dcd7ba', lineNum:'#2a2a37', activeLine:'rgba(42,42,55,0.5)',     kw:'#957fb8', str:'#98bb6c', cmt:'#727169', num:'#d27e99', fn:'#7e9cd8', bi:'#6a9589', op:'#c0a36e', swatches:['#957fb8','#98bb6c','#7e9cd8','#c0a36e'] },
  { id:'vesper',     name:'VESPER',        bg:'#101010', base:'#c2c2c2', lineNum:'#1e1e1e', activeLine:'rgba(30,30,30,0.6)',     kw:'#ff8080', str:'#99ffe4', cmt:'#404040', num:'#ffbd5e', fn:'#b8a4ff', bi:'#5ef1ff', op:'#ff6e6e', swatches:['#ff8080','#99ffe4','#b8a4ff','#ffbd5e'] },
  { id:'everforest', name:'EVERFOREST',    bg:'#272e33', base:'#d3c6aa', lineNum:'#333c43', activeLine:'rgba(51,60,67,0.5)',     kw:'#e67e80', str:'#a7c080', cmt:'#5b6770', num:'#dbbc7f', fn:'#7fbbb3', bi:'#83c092', op:'#d699b6', swatches:['#e67e80','#a7c080','#7fbbb3','#dbbc7f'] },
  { id:'oxocarbon',  name:'OXOCARBON',     bg:'#161616', base:'#f2f4f8', lineNum:'#262626', activeLine:'rgba(38,38,38,0.55)',    kw:'#ff7eb6', str:'#42be65', cmt:'#393939', num:'#82cfff', fn:'#ee5396', bi:'#3ddbd9', op:'#be95ff', swatches:['#ff7eb6','#42be65','#ee5396','#82cfff'] },
  { id:'synthwave',  name:'SYNTHWAVE 84',  bg:'#262335', base:'#ffffff', lineNum:'#34294f', activeLine:'rgba(52,41,79,0.5)',     kw:'#ff7edb', str:'#ff8b39', cmt:'#848bbd', num:'#f97e72', fn:'#36f9f6', bi:'#72f1b8', op:'#fe4450', swatches:['#ff7edb','#36f9f6','#72f1b8','#fe4450'] },
  { id:'moonlight',  name:'MOONLIGHT',     bg:'#212337', base:'#c8d3f5', lineNum:'#2f334d', activeLine:'rgba(47,51,77,0.5)',     kw:'#ff98a4', str:'#c3e88d', cmt:'#444a73', num:'#ff995e', fn:'#82aaff', bi:'#b4f9f8', op:'#c099ff', swatches:['#ff98a4','#c3e88d','#82aaff','#c099ff'] },
  { id:'github',     name:'GITHUB LIGHT',  bg:'#ffffff', base:'#24292e', lineNum:'#e1e4e8', activeLine:'rgba(225,228,232,0.5)', kw:'#d73a49', str:'#032f62', cmt:'#6a737d', num:'#005cc5', fn:'#6f42c1', bi:'#e36209', op:'#d73a49', swatches:['#d73a49','#032f62','#6f42c1','#005cc5'] },
  { id:'gruvlight',  name:'GRUVBOX LIGHT', bg:'#fbf1c7', base:'#3c3836', lineNum:'#d5c4a1', activeLine:'rgba(213,196,161,0.5)', kw:'#9d0006', str:'#79740e', cmt:'#928374', num:'#8f3f71', fn:'#b57614', bi:'#076678', op:'#af3a03', swatches:['#9d0006','#79740e','#b57614','#076678'] },
  { id:'papercolor', name:'PAPERCOLOR',    bg:'#eeeeee', base:'#444444', lineNum:'#d0d0d0', activeLine:'rgba(208,208,208,0.5)', kw:'#005f87', str:'#718c00', cmt:'#a8a8a8', num:'#8700af', fn:'#d75f00', bi:'#0087af', op:'#d70000', swatches:['#005f87','#718c00','#d75f00','#8700af'] },
  { id:'flexoki',    name:'FLEXOKI',       bg:'#fffcf0', base:'#100f0f', lineNum:'#e6e4d9', activeLine:'rgba(230,228,217,0.5)', kw:'#af3029', str:'#66800b', cmt:'#b7b5ac', num:'#8b7ec8', fn:'#205ea6', bi:'#24837b', op:'#bc5215', swatches:['#af3029','#66800b','#205ea6','#24837b'] },
]

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
]

const VERSIONS = [
  { id:'v0', name:'v1.0', label:'INIT', idx:0 },
  { id:'v1', name:'v1.1', label:'NODES', idx:1 },
  { id:'v2', name:'v1.2', label:'EDGES', idx:2 },
  { id:'v3', name:'v1.3', label:'GROUPS', idx:3 },
  { id:'v4', name:'v1.4', label:'HEAD', idx:4 },
]

// ══════════════════════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════════════════════

const PANEL_IMGS = [
  // Curated manga/art posters
  'Guts.jpeg','Whitebeard.jpeg','Roronoa Zoro.jpeg','PANTHEON.jpeg',
  'Thorfinn _ Vinland saga.jpeg','Choujin X.jpeg','THE CONTROL DEVIL _ GRAPHIC DESIGN.jpeg',
  'God Valley.jpeg','MATT TAYLOR.jpeg','SUBWAY DIMENSIONS.jpeg',
  'Queen Marika the Eternal.jpeg','VOGUE.jpeg','Sight - SKJEGG.jpeg',
  'Poster - Veil.jpeg','SONS OF THE DEVIL Covers 1-5 - toni infante.jpeg',
  'denji starboy album cover.jpeg','yhwach god of the Quincy.jpeg',
  'Makima! 🩸__#Makima #ChainsawMan_#ChainsawManFanart #AnimeArt_#DigitalPainting.jpeg',
  'チェンソーマン ＃１.jpeg','𝐔𝐬𝐨𝐩𝐩.jpeg','Poster One Piece - Wanted Whitebeard 61x91,5cm _ bol.jpeg',
  'CHAOS SMILE.jpeg','Fire Punch.jpeg','Nelliel Brutalism.jpeg',
  // New additions from not-used folder
  '#chainsawman.jpeg',
  'Burning - Inspired by Van Gogh.jpeg',
  'I\'LL TAKE CARE OF YOU _ TYLER THE CREATOR _ DON\'T TAP THE GLASS _ FLOWER BOY.jpeg',
  'Kagurabachi X Bleach.jpeg','Kyora Sazanami Poster.jpeg',
  '0xMC001x.jpeg','0xMC002x.jpeg','0xMC003x.jpeg',
  // Episode art panels
  '0xEP001p.jpeg','0xEP002p.jpeg','0xEP003p.jpeg','0xEP004p.jpeg','0xEP005p.jpeg',
  '0xEP006p.jpeg','0xEP007p.jpeg','0xEP008p.jpeg','0xEP009p.jpeg','0xEP010p.jpeg',
  '0xEP011p.jpeg','0xEP012p.jpeg','0xEP013p.jpeg','0xEP014p.jpeg','0xEP015p.jpeg',
  '0xEP016p.jpeg','0xEP017p.jpeg','0xEP018p.jpeg','0xEP019p.jpeg','0xEP020p.jpeg',
  '0xEP021p.jpeg','0xEP022p.jpeg','0xEP023p.jpeg','0xEP024p.jpeg','0xEP025p.jpeg',
  '0xEP026p.jpeg','0xEP027p.jpeg','0xEP028p.jpeg','0xEP029p.jpeg','0xEP030p.jpeg',
  '0xEP031p.jpeg','0xEP032p.jpeg','0xEP033p.jpeg','0xEP034p.jpeg','0xEP035p.jpeg',
  '0xEP036p.jpeg','0xEP037p.jpeg','0xEP038p.jpeg','0xEP039p.jpeg','0xEP040p.jpeg',
  '0xEP041p.jpeg','0xEP042p.jpeg','0xEP043p.jpeg','0xEP044p.jpeg','0xEP045p.jpeg',
  '0xEP046p.jpeg','0xEP047p.jpeg','0xEP048p.jpeg','0xEP049p.jpeg','0xEP050p.jpeg',
  '0xEP051p.jpeg','0xEP052p.jpeg','0xEP053p.jpeg','0xEP054p.jpeg','0xEP055p.jpeg',
  '0xEP056p.jpeg','0xEP057p.jpeg','0xEP058p.jpeg','0xEP059p.jpeg','0xEP060p.jpeg',
  '0xEP061p.jpeg','0xEP062p.jpeg','0xEP069p.jpeg','0xEP070p.jpeg','0xEP071p.jpeg',
  '0xEP072p.jpeg','0xEP073p.jpeg','0xEP074p.jpeg','0xEP075p.jpeg','0xEP076t.jpeg',
  '0xEP077t.jpeg','0xEP078t.jpeg','0xEP079t.jpeg','0xEP080t.jpeg','0xEP081t.jpeg',
  '0xEP082t.jpeg','0xEP083t.jpeg',
]

function getMangaImgSrc(node) {
  const numId = parseInt((node.id || '').replace(/\D/g,'')) || 0
  const idx = (numId * 11 + (node.themeIdx || 0) * 7) % PANEL_IMGS.length
  return `/manga/${encodeURIComponent(PANEL_IMGS[idx])}`
}

function getPanelImg(seed) {
  return `/manga/${encodeURIComponent(PANEL_IMGS[seed % PANEL_IMGS.length])}`
}

function highlightCode(code) {
  const PY_KW = /\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|pass|break|continue|try|except|finally|with|as|yield|lambda|self|print|raise|del|global|nonlocal|assert|async|await)\b/g
  const JS_KW = /\b(function|const|let|var|return|if|else|for|while|in|of|class|import|export|from|default|new|this|true|false|null|undefined|try|catch|finally|async|await|typeof|instanceof|break|continue|switch|case|throw)\b/g
  const BUILTINS = /\b(len|range|print|type|str|int|float|list|dict|set|tuple|map|filter|zip|enumerate|open|super|object|bool|abs|max|min|sum|sorted|reversed|console|Math|JSON|Array|Object|Promise|setTimeout|parseInt|parseFloat)\b/g
  const STRINGS = /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/g
  const COMMENTS = /(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm
  const NUMBERS = /\b(\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g
  const FUNCS = /\b([a-zA-Z_]\w*)(?=\s*\()/g
  let html = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const stored = []
  // Use \x00P…\x01 so the digit index is preceded by a word char (P),
  // preventing the NUMBERS regex from matching it as a standalone number.
  const ph = (n) => '\x00P' + n + '\x01'
  html = html.replace(COMMENTS, m => { stored.push(`<span class="syn-comment">${m}</span>`); return ph(stored.length-1) })
  html = html.replace(STRINGS,  m => { stored.push(`<span class="syn-string">${m}</span>`);  return ph(stored.length-1) })
  html = html.replace(FUNCS,   (m,fn) => { stored.push(`<span class="syn-function">${fn}</span>`); return ph(stored.length-1) })
  html = html.replace(PY_KW, '<span class="syn-keyword">$&</span>')
  html = html.replace(JS_KW, '<span class="syn-keyword">$&</span>')
  html = html.replace(BUILTINS, '<span class="syn-builtin">$&</span>')
  html = html.replace(NUMBERS, '<span class="syn-number">$&</span>')
  html = html.replace(/\x00P(\d+)\x01/g, (_, i) => stored[parseInt(i)])
  return html
}

// ══════════════════════════════════════════════════════════════
//  ICONS
// ══════════════════════════════════════════════════════════════

const I = {
  Files:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Search:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Git:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 9v12"/><path d="M18 15v-2a3 3 0 0 0-3-3H9"/></svg>,
  Terminal: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  Timeline: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  Message:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Note:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Board:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Plus:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Copy:     () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  Wrap:     () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
  Format:   () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>,
  Find:     () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Diff:     () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X:        () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Cmd:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>,
}

// ══════════════════════════════════════════════════════════════
//  CODE EDITOR COMPONENT
// ══════════════════════════════════════════════════════════════

function CodeEditor({ node, onChange, externalPalette }) {
  const [palette, setPalette] = useState(PALETTES[0])
  useEffect(() => { if (externalPalette) setPalette(externalPalette) }, [externalPalette?.id])
  const [showPaletteMenu, setShowPaletteMenu] = useState(false)
  const [showFind, setShowFind] = useState(false)
  const [showDiff, setShowDiff] = useState(false)
  const [findQuery, setFindQuery] = useState('')
  const [replaceQuery, setReplaceQuery] = useState('')
  const [wordWrap, setWordWrap] = useState(false)
  const [cursor, setCursor] = useState({ line:1, col:1 })
  const [toastMsg, setToastMsg] = useState('')
  const [fontSize, setFontSize] = useState(13)
  const [minimap, setMinimap] = useState(true)
  const textareaRef = useRef(null)
  const lineNumRef = useRef(null)
  const overlayRef = useRef(null)
  const code = node.code || ''
  const lineH = fontSize * 1.65

  const showToast = (msg) => { setToastMsg(''); setTimeout(() => setToastMsg(msg), 10); setTimeout(() => setToastMsg(''), 1800) }
  const handleScroll = () => {
    if (lineNumRef.current && textareaRef.current) lineNumRef.current.scrollTop = textareaRef.current.scrollTop
    if (overlayRef.current && textareaRef.current) overlayRef.current.style.transform = `translateY(-${textareaRef.current.scrollTop}px)`
  }
  const isJS = node.label?.match(/\.(js|ts|jsx|tsx|mjs)$/)
  const tabStr = '  ' // 2 spaces

  const handleKeyDown = (e) => {
    const ta = e.target
    const s = ta.selectionStart, en = ta.selectionEnd
    const before = code.substring(0, s)
    const after  = code.substring(en)

    // Tab — insert 2 spaces (Shift+Tab dedents)
    if (e.key === 'Tab') {
      e.preventDefault()
      if (e.shiftKey) {
        const lineStart = before.lastIndexOf('\n') + 1
        if (code.substring(lineStart).startsWith('  ')) {
          const newCode = code.substring(0, lineStart) + code.substring(lineStart + 2)
          onChange(newCode)
          setTimeout(() => { ta.selectionStart = ta.selectionEnd = Math.max(s - 2, lineStart) }, 0)
        }
      } else {
        onChange(before + '  ' + after)
        setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 2 }, 0)
      }
      return
    }

    // Enter — match current line indentation
    if (e.key === 'Enter') {
      e.preventDefault()
      const lineStart = before.lastIndexOf('\n') + 1
      const currentLine = code.substring(lineStart, s)
      const indent = currentLine.match(/^(\s*)/)[1]
      const lastChar = before.trimEnd().slice(-1)
      const extra = '{[('.includes(lastChar) ? '  ' : ''
      onChange(before + '\n' + indent + extra + after)
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 1 + indent.length + extra.length }, 0)
      return
    }

    if ((e.ctrlKey||e.metaKey) && e.key==='f') { e.preventDefault(); setShowFind(v=>!v) }
    if ((e.ctrlKey||e.metaKey) && e.key==='/') { e.preventDefault(); toggleLineComment() }
    if ((e.ctrlKey||e.metaKey) && e.key==='d') { e.preventDefault(); setShowDiff(v=>!v) }
  }
  const handleCursorUpdate = (e) => {
    const ta=e.target, before=code.substring(0,ta.selectionStart)
    const nl=(before.match(/\n/g)||[]).length+1
    setCursor({line:nl, col:ta.selectionStart-before.lastIndexOf('\n')})
  }
  useEffect(() => {
    if (!showPaletteMenu) return
    const h = () => setShowPaletteMenu(false)
    document.addEventListener('pointerdown', h)
    return () => document.removeEventListener('pointerdown', h)
  }, [showPaletteMenu])
  const handleCopy = () => { navigator.clipboard.writeText(code).catch(()=>{}); showToast('COPIED') }
  const handleFormat = () => { const formatted = code.split('\n').map(l=>l.replace(/\s+$/,'')).join('\n').replace(/\n{3,}/g,'\n\n'); onChange(formatted); showToast('FORMATTED') }
  const handleFindReplace = () => { if (!findQuery) return; const count=(code.split(findQuery).length-1); onChange(code.split(findQuery).join(replaceQuery)); showToast(`REPLACED ${count} INSTANCES`) }
  const toggleLineComment = () => {
    const ta = textareaRef.current
    const sel0 = ta.selectionStart, sel1 = ta.selectionEnd
    const marker = isJS ? '//' : '#'
    const before = code.substring(0, sel0)
    const lineStart = before.lastIndexOf('\n') + 1
    // multi-line: cover all selected lines
    const selEnd = sel1 > sel0 ? sel1 : sel0
    const lastNl = code.indexOf('\n', selEnd)
    const lineEnd = lastNl === -1 ? code.length : lastNl
    const selected = code.substring(lineStart, lineEnd)
    const lines = selected.split('\n')
    const allCommented = lines.every(l => l.trimStart().startsWith(marker))
    const toggled = allCommented
      ? lines.map(l => l.replace(new RegExp(`^(\\s*)${marker.replace('/','\\/')}\\s?`), '$1'))
      : lines.map(l => l.replace(/^(\s*)/, `$1${marker} `))
    const newCode = code.substring(0, lineStart) + toggled.join('\n') + code.substring(lineEnd)
    onChange(newCode)
    showToast('COMMENT')
  }
  const diffLines = useMemo(() => code.split('\n').map((line,i)=>({ type:i===1&&node.modified?'add':i===2&&node.modified?'del':'ctx', text:line, num:i+1 })), [code,node.modified])
  const cssVars = { '--syn-kw':palette.kw,'--syn-str':palette.str,'--syn-cmt':palette.cmt,'--syn-num':palette.num,'--syn-fn':palette.fn,'--syn-bi':palette.bi,'--syn-op':palette.op }
  const highlighted = highlightCode(code)
  const activeLineY = (cursor.line - 1) * lineH
  const minimapLines = useMemo(() => code.split('\n').slice(0,50).map(l=>({len:Math.min(l.length,80),indent:l.match(/^\s*/)[0].length})), [code])
  const LIGHT_IDS = ['github','gruvlight','papercolor','flexoki']

  return (
    <div className="editor-palette-scope" style={{display:'flex',flexDirection:'column',flex:1,minHeight:0,overflow:'hidden',background:palette.bg}}
      ref={el => el && Object.entries(cssVars).forEach(([k,v])=>el.style.setProperty(k,v))}>
      {/* Toolbar */}
      <div className="ide-editor-toolbar">
        {/* Language pill */}
        <span style={{padding:'1px 7px',fontSize:'9px',fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'.1em',
          background: isJS ? 'rgba(242,193,46,.15)' : 'rgba(66,133,244,.15)',
          color: isJS ? '#f2c12e' : '#4285f4',
          border: `1px solid ${isJS?'rgba(242,193,46,.3)':'rgba(66,133,244,.3)'}`,
        }}>
          {isJS ? 'JS' : node.label?.endsWith('.md') ? 'MD' : 'PY'}
        </span>
        <div className="ide-tb-sep"/>
        <button className="ide-tb-btn" onClick={handleCopy}><I.Copy/> COPY</button>
        <button className="ide-tb-btn" onClick={handleFormat}><I.Format/> FORMAT</button>
        <button className="ide-tb-btn" onClick={toggleLineComment} title="Ctrl+/">{isJS?'//':'#'} CMT</button>
        <div className="ide-tb-sep"/>
        <button className={`ide-tb-btn ${showFind?'active':''}`} onClick={()=>setShowFind(v=>!v)} title="Ctrl+F"><I.Find/> FIND</button>
        <button className={`ide-tb-btn ${wordWrap?'active':''}`} onClick={()=>setWordWrap(v=>!v)}><I.Wrap/> WRAP</button>
        <div className="ide-tb-sep"/>
        <button className="ide-tb-btn" onClick={()=>setFontSize(s=>Math.max(10,s-1))}>A−</button>
        <span style={{fontSize:'9px',opacity:.4,padding:'0 2px',color:palette.base}}>{fontSize}</span>
        <button className="ide-tb-btn" onClick={()=>setFontSize(s=>Math.min(20,s+1))}>A+</button>
        <div style={{marginLeft:'auto',position:'relative'}}>
          <button className={`ide-tb-btn ${showPaletteMenu?'active':''}`} onClick={()=>setShowPaletteMenu(v=>!v)} style={{gap:'4px'}}>
            <div style={{display:'flex',gap:'3px'}}>{palette.swatches.map((c,i)=><div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:c}}/>)}</div>
            {palette.name}
          </button>
          {showPaletteMenu && (
            <div className="ide-palette-dropdown" onClick={e=>e.stopPropagation()}>
              <div className="ide-palette-sec">DARK</div>
              {PALETTES.filter(p=>!LIGHT_IDS.includes(p.id)).map(p=>(
                <div key={p.id} className={`ide-palette-opt ${palette.id===p.id?'active':''}`} onClick={()=>{setPalette(p);setShowPaletteMenu(false)}} style={{background:p.bg}}>
                  <div className="ide-palette-swatches">{p.swatches.map((c,i)=><div key={i} className="ide-palette-swatch" style={{background:c}}/>)}</div>
                  <span className="ide-palette-name" style={{color:p.base}}>{p.name}</span>
                </div>
              ))}
              <div className="ide-palette-sec">LIGHT</div>
              {PALETTES.filter(p=>LIGHT_IDS.includes(p.id)).map(p=>(
                <div key={p.id} className={`ide-palette-opt ${palette.id===p.id?'active':''}`} onClick={()=>{setPalette(p);setShowPaletteMenu(false)}} style={{background:p.bg}}>
                  <div className="ide-palette-swatches">{p.swatches.map((c,i)=><div key={i} className="ide-palette-swatch" style={{background:c}}/>)}</div>
                  <span className="ide-palette-name" style={{color:p.base}}>{p.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Find bar */}
      {showFind && (
        <div className="ide-find-bar">
          <span style={{fontSize:'9px',opacity:.5,flexShrink:0,color:palette.base}}>FIND</span>
          <input value={findQuery} onChange={e=>setFindQuery(e.target.value)} placeholder="Search..." spellCheck={false} style={{color:palette.base}} />
          <span style={{fontSize:'9px',opacity:.35,flexShrink:0,color:palette.base}}>→</span>
          <input value={replaceQuery} onChange={e=>setReplaceQuery(e.target.value)} placeholder="Replace..." spellCheck={false} style={{color:palette.base}} />
          <button className="ide-tb-btn" onClick={handleFindReplace} style={{flexShrink:0}}>REPLACE ALL</button>
          <button className="ide-tb-btn" onClick={()=>setShowFind(false)} style={{flexShrink:0,color:'#ff435a'}}>✕</button>
        </div>
      )}
      {/* Main editor area */}
      <div style={{display:'flex',flex:1,overflow:'hidden',minHeight:0}}>
        {/* Diff panel */}
        {showDiff && (
          <div style={{width:'200px',flexShrink:0,borderRight:`1px solid ${palette.lineNum}44`,overflow:'auto',background:palette.bg,display:'flex',flexDirection:'column'}}>
            <div style={{padding:'7px 10px',fontSize:'9px',opacity:.4,borderBottom:`1px solid ${palette.lineNum}44`,letterSpacing:'1px',color:palette.base}}>DIFF — WORKING TREE</div>
            <div style={{flex:1,overflow:'auto',padding:'8px 0'}}>
              {diffLines.map((dl,i)=>(
                <div key={i} className={`diff-line ${dl.type==='add'?'diff-add':dl.type==='del'?'diff-del':''}`} style={{fontSize:'10px',color:palette.base}}>
                  <span className="diff-line-num" style={{color:palette.lineNum}}>{dl.num||'+'}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace"}}>{dl.text||' '}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Line numbers */}
        <div className="line-numbers" ref={lineNumRef} style={{background:palette.bg,color:palette.lineNum,fontSize:fontSize+'px',lineHeight:lineH+'px',overflow:'hidden',flexShrink:0,userSelect:'none',textAlign:'right',padding:`20px 8px 20px 4px`,minWidth:'36px'}}>
          {code.split('\n').map((_,i)=>(
            <div key={i} className="line-num" style={{lineHeight:lineH+'px',color:i===cursor.line-1?palette.base:palette.lineNum}}>{i+1}</div>
          ))}
        </div>
        {/* Code area */}
        <div style={{flex:1,position:'relative',overflow:'hidden'}}>
          <div className="active-line-highlight" style={{top:20+activeLineY,height:lineH,background:palette.activeLine,borderLeft:`2px solid ${palette.kw}55`,pointerEvents:'none',zIndex:1}}/>
          <div className="code-highlight-overlay" ref={overlayRef} style={{position:'absolute',top:0,left:0,right:0,padding:`20px 14px`,fontFamily:"'JetBrains Mono',monospace",fontSize:fontSize+'px',lineHeight:lineH+'px',pointerEvents:'none',color:palette.base,overflow:'hidden',whiteSpace:wordWrap?'pre-wrap':'pre'}}>
            <pre className="editor-palette-scope" style={{margin:0,fontFamily:"'JetBrains Mono',monospace",fontSize:fontSize+'px',lineHeight:lineH+'px',color:palette.base,whiteSpace:wordWrap?'pre-wrap':'pre'}} dangerouslySetInnerHTML={{__html:highlighted}}/>
          </div>
          <textarea
            ref={textareaRef}
            className="code-area"
            value={code}
            onChange={e=>onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onSelect={handleCursorUpdate}
            onClick={handleCursorUpdate}
            spellCheck={false}
            style={{position:'absolute',inset:0,padding:`20px 14px`,fontFamily:"'JetBrains Mono',monospace",fontSize:fontSize+'px',lineHeight:lineH+'px',color:'transparent',caretColor:palette.fn,background:'transparent',border:'none',outline:'none',resize:'none',zIndex:2,whiteSpace:wordWrap?'pre-wrap':'pre',overflowWrap:wordWrap?'break-word':'normal',overflow:'auto'}}
          />
        </div>
        {/* Minimap */}
        {minimap && (
          <div style={{width:'56px',flexShrink:0,background:palette.bg,borderLeft:`1px solid ${palette.lineNum}22`,overflow:'hidden',padding:'8px 4px',cursor:'default'}}>
            <svg width="48" height="100%" style={{display:'block',overflow:'visible'}}>
              {minimapLines.map((l,i)=>(
                <rect key={i} x={l.indent * 0.3} y={i * 3.2} width={l.len * 0.38} height={1.6} fill={palette.lineNum} opacity=".7" rx=".5"/>
              ))}
              <rect x={0} y={(cursor.line-1)*3.2} width={48} height={3.5} fill={palette.kw} opacity=".12" rx="1"/>
            </svg>
          </div>
        )}
      </div>
      {/* Status strip */}
      <div className="editor-status-strip" style={{background:palette.bg,borderTop:`1px solid ${palette.lineNum}33`,color:palette.base}}>
        <span style={{opacity:.45}}>Ln {cursor.line}:{cursor.col}</span>
        <span style={{opacity:.2}}>|</span>
        <span style={{opacity:.45}}>{code.split('\n').length}L</span>
        <span style={{opacity:.2}}>|</span>
        <span style={{color:palette.fn,opacity:.7}}>{node.type}</span>
        {node.modified && <><span style={{opacity:.2}}>|</span><span style={{color:'#ffc410',fontSize:'8px'}}>● MOD</span></>}
        <span style={{opacity:.2}}>|</span>
        <span style={{opacity:.22,fontSize:'8px'}}>^Enter RUN · ^/ CMT · ^F FIND · Tab INDENT</span>
        <span style={{marginLeft:'auto',opacity:.35}}>{palette.name}</span>
      </div>
      {toastMsg && <div className="copy-toast">{toastMsg}</div>}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  COMMAND PALETTE
// ══════════════════════════════════════════════════════════════

function CommandPalette({ isOpen, onClose, onAction }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(0)
  const filtered = CMD_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
  useEffect(() => { if (isOpen) setQuery('') }, [isOpen])
  if (!isOpen) return null
  return (
    <div className="ide-cmd-overlay" onClick={onClose}>
      <div className="ide-cmd-box" onClick={e=>e.stopPropagation()}>
        <div className="ide-cmd-input-row">
          <span className="ide-cmd-prefix">⌘</span>
          <input className="ide-cmd-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Type a command..." autoFocus
            onKeyDown={e=>{
              if(e.key==='ArrowDown'){e.preventDefault();setFocused(f=>Math.min(f+1,filtered.length-1))}
              if(e.key==='ArrowUp'){e.preventDefault();setFocused(f=>Math.max(f-1,0))}
              if(e.key==='Enter'){onAction(filtered[focused]?.label);onClose()}
              if(e.key==='Escape')onClose()
            }}
          />
        </div>
        <div className="ide-cmd-results">
          {filtered.map((item,i)=>(
            <div key={i} className={`ide-cmd-item ${i===focused?'focused':''}`}
              onMouseEnter={()=>setFocused(i)} onClick={()=>{onAction(item.label);onClose()}}>
              <div className="ide-cmd-icon">{item.icon}</div>
              <span style={{flex:1}}>{item.label}</span>
              {item.hint && <span className="ide-cmd-hint">{item.hint}</span>}
            </div>
          ))}
        </div>
        <div className="ide-cmd-footer"><span>↑↓ navigate</span><span>↵ execute</span><span>Esc close</span></div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  GROUP EDITOR
// ══════════════════════════════════════════════════════════════

function GroupEditor({ group, nodes, onClose, onOpenNode }) {
  const [activeId, setActiveId] = useState(null)
  if (!group) return null
  const members = nodes.filter(n => group.nodeIds.includes(n.id))
  const accent = group.color
  const COLORS = ['#10b981','#ff435a','#ffc410','#4285f4','#28f1c3','#bb9af7','#ff1650','#5ccfe6']
  const getSynVars = (col) => ({'--syn-kw':col,'--syn-str':'#ffc410','--syn-cmt':'#5c6370','--syn-num':'#d19a66','--syn-fn':'#61afef','--syn-bi':'#56b6c2'})
  const totalLines = members.reduce((s,n)=>(n.code||'').split('\n').length+s,0)
  const scrollToFn = (id) => { setActiveId(id); document.getElementById('fn-block-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}) }
  const gNum = parseInt(group.id.replace(/\D/g,''))||0
  const groupArtSrc = getPanelImg(gNum * 3 + 1)
  const sideArtSrc = getPanelImg(gNum * 3 + 7)

  return (
    <div className="grp-editor-overlay" onClick={onClose}>
      <div className="grp-editor-shell" onClick={e=>e.stopPropagation()}>
        {/* Chrome bar */}
        <div className="grp-editor-chrome">
          <div className="grp-chrome-dot" style={{background:'#ff5f57'}}/>
          <div className="grp-chrome-dot" style={{background:'#febc2e'}}/>
          <div className="grp-chrome-dot" style={{background:'#28c840',cursor:'pointer'}} onClick={onClose}/>
          <div className="grp-chrome-sep"/>
          <div className="grp-chrome-title">{group.name}</div>
          <span style={{marginLeft:'6px',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.12em',padding:'1px 7px',background:accent,color:'#000'}}>CLASS</span>
          <div className="grp-chrome-meta" style={{marginLeft:'auto'}}>
            {members.length} methods · {totalLines} lines · READ-ONLY
          </div>
          <button onClick={onClose} style={{marginLeft:'12px',background:'transparent',border:'none',color:'rgba(200,200,220,.4)',cursor:'pointer',fontSize:'16px',lineHeight:1}}>✕</button>
        </div>
        <div className="grp-editor-body">
          {/* Sidebar */}
          <div className="grp-sidebar">
            <div className="grp-sidebar-hdr" style={{padding:0,position:'relative',overflow:'hidden',height:'88px',flexShrink:0}}>
              <img src={sideArtSrc} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'contrast(1.2) saturate(.4) brightness(.65)'}}/>
              <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom,rgba(5,5,13,.2) 0%,rgba(5,5,13,.88) 100%), linear-gradient(to right,rgba(5,5,13,.15) 0%,transparent 60%)`,pointerEvents:'none'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'8px 14px'}}>
                <div className="grp-sidebar-sup">Class</div>
                <div className="grp-sidebar-classname" style={{color:accent}}>{group.name}</div>
              </div>
            </div>
            <div className="grp-sidebar-struct">
              <div className="grp-sidebar-struct-class" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'12px'}}>
                <span style={{color:'#c792ea'}}>class </span>
                <span style={{color:accent}}>{group.name}</span>
                <span style={{opacity:.4}}>:</span>
              </div>
              {members.map((n,i)=>(
                <div key={n.id} className="grp-sidebar-struct-method" onClick={()=>scrollToFn(n.id)}
                  style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',color:COLORS[i%COLORS.length]}}>
                  <span style={{opacity:.4}}>def </span>
                  <span>{n.label.replace('.py','').replace('.js','')}</span>
                  <span style={{opacity:.3}}>()</span>
                </div>
              ))}
            </div>
            <div className="grp-member-list">
              {members.map((n,i)=>(
                <div key={n.id} className={`grp-member-row ${activeId===n.id?'active':''}`} onClick={()=>scrollToFn(n.id)}>
                  <div className="grp-member-dot" style={{background:COLORS[i%COLORS.length]}}/>
                  <div className="grp-member-info">
                    <div className="grp-member-fname" style={{color:COLORS[i%COLORS.length]}}>{n.label}</div>
                    <div className="grp-member-ftype">{n.type}</div>
                  </div>
                  {n.modified && <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410',flexShrink:0}}/>}
                </div>
              ))}
            </div>
            <div className="grp-sidebar-stats">
              <div className="grp-stat-row"><span className="grp-stat-label">METHODS</span><span className="grp-stat-val" style={{color:accent}}>{members.length}</span></div>
              <div className="grp-stat-row"><span className="grp-stat-label">LINES</span><span className="grp-stat-val" style={{color:accent}}>{totalLines}</span></div>
              <div className="grp-stat-row"><span className="grp-stat-label">MODIFIED</span><span className="grp-stat-val" style={{color:'#ff435a'}}>{members.filter(n=>n.modified).length}</span></div>
            </div>
          </div>
          {/* Main code panel */}
          <div className="grp-main">
            <div className="grp-tabs">
              <div className="grp-tab active" style={{color:accent,borderBottom:`2px solid ${accent}`}}>ALL MEMBERS</div>
              {members.map((n,i)=>{
                const col=COLORS[i%COLORS.length]
                return (
                  <div key={n.id} className={`grp-tab ${activeId===n.id?'active':''}`}
                    style={{color:col,borderBottom:activeId===n.id?`2px solid ${col}`:'2px solid transparent'}}
                    onClick={()=>scrollToFn(n.id)}>
                    {n.label}
                  </div>
                )
              })}
            </div>
            <div className="grp-codescroll">
              {/* Manga art class banner */}
              <div className="grp-class-banner">
                <img src={groupArtSrc} alt="" className="grp-banner-art"/>
                <div className="grp-banner-scanlines"/>
                <div className="grp-banner-overlay" style={{background:`linear-gradient(to right,rgba(5,5,13,.6) 0%,transparent 50%,rgba(5,5,13,.72) 100%), linear-gradient(to bottom,rgba(5,5,13,.12) 0%,transparent 28%,rgba(5,5,13,.99) 100%)`}}/>
                <div className="grp-banner-content">
                  <div className="grp-banner-kw" style={{color:'#c792ea'}}>class</div>
                  <div className="grp-banner-title" style={{color:accent}}>{group.name}</div>
                  <div className="grp-banner-note">{members.length} methods · {totalLines} lines · read-only</div>
                </div>
                <div className="grp-banner-chips">
                  <div style={{padding:'2px 8px',border:`1px solid ${accent}55`,fontSize:'8px',color:accent,fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'.1em'}}>CLASS</div>
                  <div style={{padding:'2px 8px',border:'1px solid rgba(255,255,255,.12)',fontSize:'8px',opacity:.4,fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'.1em'}}>{members.length} METHODS</div>
                </div>
              </div>
              {members.map((n,i)=>{
                const col=COLORS[i%COLORS.length]
                const codeLines=(n.code||'# empty').split('\n')
                const hlCode=highlightCode(n.code||'# empty')
                const synVars=getSynVars(col)
                return (
                  <div key={n.id} id={'fn-block-'+n.id} className="grp-fn-section"
                    style={{borderLeftColor:activeId===n.id?col+'44':'transparent',borderLeftWidth:'3px',borderLeftStyle:'solid'}}>
                    <div className="grp-fn-header" style={{background:col+'08',borderBottom:`1px solid ${col}18`,display:'flex',alignItems:'center',gap:'8px',padding:'7px 12px'}}>
                      <div className="grp-fn-num" style={{background:col+'18',color:col}}>{String(i+1).padStart(2,'0')}</div>
                      <div className="grp-fn-name-col" style={{flex:1,minWidth:0}}>
                        <div className="grp-fn-title" style={{color:col}}>{n.label}</div>
                        <div className="grp-fn-subtitle">def {n.label.replace('.py','').replace('.js','')}(self)  ·  {codeLines.length} lines</div>
                      </div>
                      <div className="grp-fn-badge" style={{color:col,borderColor:col+'55',fontSize:'8px',padding:'2px 6px',border:'1px solid',fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'.1em'}}>{n.type.toUpperCase()}</div>
                      {n.modified && <div style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'8px',color:'#ffc410',flexShrink:0}}><div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410'}}/>UNSAVED</div>}
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'8px',opacity:.3,flexShrink:0}}>{codeLines.length}L</span>
                      <button style={{padding:'2px 8px',cursor:'pointer',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'8px',letterSpacing:'.08em',background:'transparent',flexShrink:0,border:`1px solid ${col}44`,color:col}} onClick={()=>onOpenNode(n.id)}>OPEN →</button>
                    </div>
                    <div className="grp-fn-codewrap" ref={el=>{if(el)Object.entries(synVars).forEach(([k,v])=>el.style.setProperty(k,v))}}>
                      <div className="grp-fn-linenums">
                        {codeLines.map((_,li)=>(<div key={li} style={{lineHeight:'1.65',color:li===0?col+'55':'rgba(255,255,255,.1)'}}>{li+1}</div>))}
                      </div>
                      <pre className="grp-fn-code editor-palette-scope" dangerouslySetInnerHTML={{__html:hlCode}}/>
                    </div>
                  </div>
                )
              })}
              <div style={{height:'40px'}}/>
            </div>
            <div className="grp-statusbar">
              <span style={{color:accent,fontWeight:'bold'}}>{group.name}</span>
              <span style={{opacity:.25}}>·</span>
              <span>{members.length} functions</span>
              <span style={{opacity:.25}}>·</span>
              <span>{totalLines} total lines</span>
              <span style={{marginLeft:'auto',opacity:.3}}>FORBIDEN // CLASS ASSEMBLY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  MANGA NODE COMPONENT
// ══════════════════════════════════════════════════════════════

function MangaNode({
  node, groups, brutal, isJoinSelected, edgeMode, hoveredNodeId, setHoveredNodeId,
  draggingNodeRef, lastMousePos, transform, setNodeColorPicker, handleNodeClickInMode, openNodeInEditor,
  nodeRunState, onRun,
}) {
  const W = node.isMain ? 108 : 90
  const H = node.isMain ? 44 : 36
  const accent = ACCENTS[node.themeIdx % ACCENTS.length]
  const group = groups.find(g => g.nodeIds.includes(node.id))
  const imgSrc = getMangaImgSrc(node)
  const isHovered = hoveredNodeId === node.id
  const dimmed = hoveredNodeId && !isHovered && !edgeMode
  const runSt = nodeRunState?.[node.id]
  const isDoc = node.type === 'doc'

  const boxShadow = brutal
    ? (isJoinSelected ? `6px 6px 0 ${accent}` : isHovered ? '8px 8px 0 #0f0f0f' : '4px 4px 0 #0f0f0f')
    : (isJoinSelected ? `0 0 24px ${accent}` : isHovered ? `0 0 28px ${accent}66` : `0 0 10px ${accent}28`)

  return (
    <div
      className="mn-node"
      style={{
        left: node.x - W/2,
        top:  node.y - H/2,
        width: W, height: H,
        opacity: dimmed ? 0.22 : 1,
        zIndex: isJoinSelected || isHovered ? 10 : 1,
      }}
      onPointerEnter={() => !edgeMode && setHoveredNodeId(node.id)}
      onPointerLeave={() => setHoveredNodeId(null)}
      onPointerDown={e => {
        e.stopPropagation()
        if (edgeMode) return
        setNodeColorPicker(null)
        draggingNodeRef.current = { id:node.id, x:node.x, y:node.y, hasDragged:false }
        lastMousePos.current = { x:e.clientX, y:e.clientY }
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={e => {
        if (!draggingNodeRef.current || draggingNodeRef.current.id !== node.id) return
        e.stopPropagation()
        const dx=(e.clientX-lastMousePos.current.x)/transform.scale
        const dy=(e.clientY-lastMousePos.current.y)/transform.scale
        if (Math.abs(dx)>1||Math.abs(dy)>1) draggingNodeRef.current.hasDragged=true
        draggingNodeRef.current.x+=dx; draggingNodeRef.current.y+=dy
        lastMousePos.current={x:e.clientX,y:e.clientY}
      }}
      onPointerUp={e => {
        e.stopPropagation()
        e.currentTarget.releasePointerCapture(e.pointerId)
        if (edgeMode==='join') { handleNodeClickInMode(node.id); return }
        if (!draggingNodeRef.current?.hasDragged) openNodeInEditor(node.id)
        draggingNodeRef.current = null
      }}
    >
      {/* Group label above node */}
      {group && (
        <div style={{position:'absolute',top:-18,left:0,right:0,textAlign:'center',pointerEvents:'none'}}>
          <span className="mn-group-label" style={{background:brutal?'#0f0f0f':'rgba(8,8,20,.92)',color:group.color,border:`1px solid ${group.color}44`,fontSize:'8px',fontFamily:"'JetBrains Mono',monospace"}}>
            {group.name}
          </span>
        </div>
      )}
      {/* Compact box node */}
      <div className="mn-node-frame" style={{
        border: isJoinSelected
          ? (brutal ? `2px solid ${accent}` : `1px solid ${accent}`)
          : runSt?.status==='ok' ? `1px solid #10b981`
          : runSt?.status==='error' ? `1px solid #ff435a`
          : (brutal ? `2px solid #0f0f0f` : `1px solid ${accent}44`),
        boxShadow: runSt?.status==='ok' ? `0 0 14px #10b98155`
          : runSt?.status==='error' ? `0 0 14px #ff435a55`
          : boxShadow,
        background: brutal ? '#f0ece0' : 'rgba(6,6,18,.97)',
      }}>
        {/* Left accent strip */}
        <div className="mn-node-strip" style={{background:accent, width:brutal?4:3}}/>
        {/* Tiny art icon */}
        <div className="mn-node-icon">
          <img src={imgSrc} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',
            filter:'contrast(1.2) saturate(.5)',
            opacity: brutal ? 0.9 : 0.85,
          }}/>
        </div>
        {/* Text content */}
        <div className="mn-node-content">
          <div className="mn-node-type-row">
            <span className="mn-node-type-chip" style={{background: isDoc ? '#c792ea' : accent, color:brutal?'#0f0f0f':'#000'}}>{isDoc ? 'DOC' : node.type.slice(0,3).toUpperCase()}</span>
            {node.isMain && <span className="mn-node-main-chip" style={{color:accent,borderColor:accent}}>M</span>}
          </div>
          <div className="mn-node-label" style={{color:brutal?'#0f0f0f':'#d8dce8'}}>{node.label}</div>
        </div>
        {/* Right: run button + dot + modified */}
        <div className="mn-node-right">
          <div className="mn-node-run"
            style={{
              color: runSt?.status==='ok' ? '#10b981' : runSt?.status==='error' ? '#ff435a' : accent,
              opacity: runSt?.status==='running' ? 1 : 0.7,
            }}
            onPointerDown={e=>e.stopPropagation()}
            onClick={e=>{ e.stopPropagation(); onRun?.(node.id) }}
            title="Run (JS)"
          >
            {runSt?.status==='running' ? '⋯' : runSt?.status==='ok' ? '✓' : runSt?.status==='error' ? '✗' : '▶'}
          </div>
          <div className="mn-node-dot"
            style={{background:accent,width:6,height:6,borderRadius:brutal?0:'50%',flexShrink:0}}
            onPointerDown={e=>e.stopPropagation()}
            onClick={e=>{
              e.stopPropagation()
              const rect=e.currentTarget.getBoundingClientRect()
              setNodeColorPicker(p=>p?.nodeId===node.id?null:{nodeId:node.id,x:rect.left,y:rect.bottom+6})
            }}
          />
          {node.modified && <div className="mn-node-mod"/>}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  GRAPH MINIMAP
// ══════════════════════════════════════════════════════════════

function GraphMinimap({ nodes }) {
  if (!nodes.length) return null
  const pad=10, W=110, H=70
  const xs=nodes.map(n=>n.x), ys=nodes.map(n=>n.y)
  const minX=Math.min(...xs)-50, maxX=Math.max(...xs)+50
  const minY=Math.min(...ys)-50, maxY=Math.max(...ys)+50
  const rX=maxX-minX||1, rY=maxY-minY||1
  const toMm = (x,y) => [pad+(x-minX)/rX*(W-pad*2), pad+(y-minY)/rY*(H-pad*2)]
  return (
    <div className="ide-minimap">
      <svg width={W} height={H} style={{display:'block'}}>
        {nodes.map(n=>{const [mx,my]=toMm(n.x,n.y);return <circle key={n.id} cx={mx} cy={my} r={n.isMain?4:2.5} fill={ACCENTS[n.themeIdx%ACCENTS.length]} opacity=".75"/>})}
      </svg>
      <div className="ide-minimap-label">GRAPH OVERVIEW</div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  CONVEX HULL (for group outlines)
// ══════════════════════════════════════════════════════════════

function convexHull(pts) {
  if (pts.length < 3) return pts
  pts = pts.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1])
  const cross = (o,a,b) => (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0])
  const lower=[], upper=[]
  for (const p of pts) { while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],p)<=0)lower.pop(); lower.push(p) }
  for (const p of [...pts].reverse()) { while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],p)<=0)upper.pop(); upper.push(p) }
  upper.pop(); lower.pop()
  return lower.concat(upper)
}

// ══════════════════════════════════════════════════════════════
//  JS RUNTIME ENGINE
// ══════════════════════════════════════════════════════════════

const WORKER_SRC = `
self.onmessage = function(e) {
  const code = e.data
  function _fmt(v) {
    if (v === null) return 'null'
    if (v === undefined) return 'undefined'
    if (typeof v === 'function') return '[Function: ' + (v.name || 'anon') + ']'
    if (typeof v === 'string') return JSON.stringify(v)
    try { return JSON.stringify(v, null, 2) } catch { return String(v) }
  }
  self.console = {
    log:      (...a) => self.postMessage({t:'log',   v:a.map(_fmt).join(' ')}),
    warn:     (...a) => self.postMessage({t:'warn',  v:a.map(_fmt).join(' ')}),
    error:    (...a) => self.postMessage({t:'error', v:a.map(String).join(' ')}),
    info:     (...a) => self.postMessage({t:'info',  v:a.map(_fmt).join(' ')}),
    table:    (...a) => self.postMessage({t:'table', v:JSON.stringify(a[0],null,2)}),
    group:    (...a) => self.postMessage({t:'log',   v:'▸ '+a.map(_fmt).join(' ')}),
    groupEnd: ()=>{},
  }
  ;(async () => {
    try {
      const hasAwait = /\\bawait\\b/.test(code)
      const w = hasAwait ? '(async()=>{\\n'+code+'\\n})()' : '(function(){\\n'+code+'\\n})()'
      const ret = await eval(w)
      self.postMessage({t:'done', v: ret !== undefined ? _fmt(ret) : undefined})
    } catch(e) {
      self.postMessage({t:'err', v: e.message + (e.stack ? '\\n' + e.stack.split('\\n').slice(1,2).join('') : '')})
    }
  })()
}
`

function runJS(code, timeout = 10000) {
  return new Promise(resolve => {
    const logs = []
    const t0 = performance.now()
    const blob = new Blob([WORKER_SRC], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)

    const finish = (retValStr, error) => {
      clearTimeout(timer)
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve({ logs, retValStr, error, ms: Math.round(performance.now() - t0) })
    }

    const timer = setTimeout(() => {
      logs.push({ type:'error', val:'Execution timed out (10s)', ts: Date.now() })
      finish(undefined, new Error('timeout'))
    }, timeout)

    worker.onmessage = (e) => {
      const { t, v } = e.data
      const ts = Date.now()
      if (t === 'done') {
        if (v !== undefined) logs.push({ type:'return', val: v, ts })
        finish(v, null)
      } else if (t === 'err') {
        logs.push({ type:'error', val: v, ts })
        finish(undefined, new Error(v))
      } else {
        logs.push({ type: t, val: v, ts })
      }
    }

    worker.onerror = (e) => {
      logs.push({ type:'error', val: e.message || 'Worker error', ts: Date.now() })
      finish(undefined, new Error(e.message))
    }

    worker.postMessage(code)
  })
}

// ══════════════════════════════════════════════════════════════
//  MARKDOWN RENDERER
// ══════════════════════════════════════════════════════════════

function renderMd(raw) {
  if (!raw) return ''
  const blocks = []
  let s = raw.replace(/```([\w]*)\n?([\s\S]*?)```/g, (_,lang,code) => {
    blocks.push(`<pre class="md-pre"><code class="md-code-block">${code.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`)
    return `\x00BLK${blocks.length-1}\x00`
  })
  s = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  s = s
    .replace(/^#{3}\s+(.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1 class="md-h1">$1</h1>')
    .replace(/^---$/gm, '<hr class="md-hr"/>')
    .replace(/^&gt;\s?(.*)$/gm, '<blockquote class="md-bq">$1</blockquote>')
    .replace(/^[\-\*]\s+(.+)$/gm, '<li class="md-li">$1</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="md-oli">$1</li>')
  s = s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="md-ic">$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="md-img" src="$2" alt="$1"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="md-a" href="$2" target="_blank" rel="noopener">$1</a>')
  s = s.split(/\n{2,}/).map(p => {
    p = p.trim()
    if (!p) return ''
    if (/^<(h[1-3]|hr|pre|blockquote|li|\x00)/.test(p)) return p
    return `<p class="md-p">${p.replace(/\n/g,'<br/>')}</p>`
  }).join('\n')
  s = s.replace(/(<li(?:\s[^>]*)?>[\s\S]*?<\/li>\n?)+/g, m => `<ul class="md-ul">${m}</ul>`)
  s = s.replace(/\x00BLK(\d+)\x00/g, (_,i) => blocks[i])
  return s
}

// ══════════════════════════════════════════════════════════════
//  PERSISTENCE
// ══════════════════════════════════════════════════════════════

const LS_KEY = 'forbiden-ide-v1'

function loadSaved() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const d = JSON.parse(raw)
      if (d.nodes?.length) return { nodes: d.nodes, edges: d.edges || [], groups: d.groups || [] }
    }
  } catch {}
  return {
    nodes: JSON.parse(JSON.stringify(INITIAL_NODES)),
    edges: JSON.parse(JSON.stringify(INITIAL_EDGES)),
    groups: JSON.parse(JSON.stringify(INITIAL_GROUPS)),
  }
}

// ══════════════════════════════════════════════════════════════
//  FOLDER IMPORT PARSER
// ══════════════════════════════════════════════════════════════

function _parseImports(code) {
  const paths = []
  const res = [
    /import\s+(?:[^'";\n]+\s+from\s+)?['"]([^'"]+)['"]/g,
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ]
  for (const re of res) {
    re.lastIndex = 0; let m
    while ((m = re.exec(code)) !== null) if (!paths.includes(m[1])) paths.push(m[1])
  }
  return paths
}

function _resolveRel(fromDir, imp) {
  const parts = (fromDir + imp).split('/')
  const out = []
  for (const p of parts) { if (p === '..') out.pop(); else if (p !== '.') out.push(p) }
  return out.join('/')
}

function _guessType(name, code) {
  if (/^(index|main|app)\.(j|t)sx?$/.test(name)) return 'entry'
  if (/\bclass\s+\w+/.test(code)) return 'class'
  if (/\.(md|txt)$/.test(name)) return 'doc'
  if (/\.(jsx|tsx)$/.test(name) || /useState|useEffect|React/.test(code)) return 'module'
  return 'function'
}

const _TYPE_THEME = { entry:0, function:5, class:6, module:4, doc:11 }

async function parseFolderToGraph(fileList) {
  const all = await Promise.all([...fileList].map(f =>
    f.text().then(text => ({
      name: f.name,
      path: (f.webkitRelativePath || f.name).replace(/\\/g, '/'),
      text,
    }))
  ))
  const kept = all.filter(f =>
    /\.(js|ts|jsx|tsx|mjs|cjs|md)$/.test(f.name) &&
    !f.path.includes('node_modules/') &&
    !f.path.includes('.min.') &&
    !f.path.includes('/dist/')
  )
  const nodes = kept.map((f, i) => {
    const type = _guessType(f.name, f.text)
    return {
      id: 'u'+i, label: f.name, filepath: f.path, type,
      isMain: /^(index|main)\.(j|t)sx?$/.test(f.name),
      x: (Math.random()-.5)*700, y: (Math.random()-.5)*500,
      vx:0, vy:0, themeIdx: _TYPE_THEME[type]??1,
      classId:null, code: f.text, modified:false,
    }
  })
  const pathMap = {}
  kept.forEach((f, i) => { pathMap[f.path] = 'u'+i })
  const edges = [], seen = new Set()
  kept.forEach((f, i) => {
    if (f.name.endsWith('.md')) return
    const sid = 'u'+i
    const dir = f.path.includes('/') ? f.path.slice(0, f.path.lastIndexOf('/')+1) : ''
    _parseImports(f.text).filter(p => p.startsWith('.')).forEach(imp => {
      const base = _resolveRel(dir, imp)
      for (const c of [base, base+'.js', base+'.ts', base+'.jsx', base+'.tsx', base+'/index.js', base+'/index.ts', base+'/index.tsx']) {
        const tid = pathMap[c]
        if (tid && tid !== sid) {
          const key = sid+'>'+tid
          if (!seen.has(key)) { seen.add(key); edges.push({id:'ue'+edges.length, source:sid, target:tid}) }
          break
        }
      }
    })
  })
  return { nodes, edges, groups:[] }
}

// ══════════════════════════════════════════════════════════════
//  MAIN IDE COMPONENT
// ══════════════════════════════════════════════════════════════

function IDE({ initialTheme = 'cyber', initialAvatar = 0 }) {
  const wsHook = useWorkspace()
  const [themeMode, setThemeMode] = useState(initialTheme)
  const brutal = themeMode === 'brutal'

  // Graph state
  const nodesRef = useRef(JSON.parse(JSON.stringify(INITIAL_NODES)))
  const edgesRef = useRef(JSON.parse(JSON.stringify(INITIAL_EDGES)))
  const groupsRef = useRef(JSON.parse(JSON.stringify(INITIAL_GROUPS)))
  const [, forceRender] = useState({})

  // Canvas
  const [transform, setTransform] = useState({ x: 300, y: 220, scale: 1 })
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false)
  const lastMousePos = useRef({ x:0, y:0 })
  const draggingNodeRef = useRef(null)
  const canvasInputRef = useRef(null)

  // UI panels
  const [sidebarMode, setSidebarMode] = useState('files') // 'files'|'search'|'git'|'chat'|'note'|'board'|'settings'|null
  const [bottomTab, setBottomTab] = useState(null) // null | 'timeline' | 'terminal'

  // Tabs & editor
  const [openTabs, setOpenTabs] = useState([])
  const [activeTabId, setActiveTabId] = useState(null)
  const [globalEditorPalette, setGlobalEditorPalette] = useState(PALETTES[0])

  // Node interaction
  const [hoveredNodeId, setHoveredNodeId] = useState(null)
  const [hoveredEdgeId, setHoveredEdgeId] = useState(null)
  const [edgeMode, setEdgeMode] = useState(null) // null|'join'|'cut'
  const [joinFirstNode, setJoinFirstNode] = useState(null)
  const [nodeColorPicker, setNodeColorPicker] = useState(null)

  // Modals
  const [openGroupId, setOpenGroupId] = useState(null)
  const [showCmd, setShowCmd] = useState(false)
  const [showCreateNode, setShowCreateNode] = useState(false)
  const [newNodeName, setNewNodeName] = useState('')
  const [newNodeType, setNewNodeType] = useState('function')
  const [newNodeColor, setNewNodeColor] = useState(1)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupColor, setGroupColor] = useState('#10b981')
  const [groupSelected, setGroupSelected] = useState([])

  // Board
  const [board, setBoard] = useState(INITIAL_BOARD)
  const [focusCard, setFocusCard] = useState(null)
  const [newCardCol, setNewCardCol] = useState(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const PC = { HIGH:'#ff435a', MED:'#ffc410', LOW:'#4285f4', DONE:'#10b981' }

  // Timeline
  const [playheadPos, setPlayheadPos] = useState(400)
  const [activeVersionName, setActiveVersionName] = useState('v1.4 (HEAD)')
  const [activeVersionIdx, setActiveVersionIdx] = useState(4)
  const playheadDragRef = useRef({ isDragging:false })

  // Terminal
  const [termLines, setTermLines] = useState([
    {c:'#28f1c3', t:'[FORBIDEN] System boot v2.1.0'},
    {c:'#9494b0', t:'[WS] Connected to local daemon — port 7291'},
    {c:'#9494b0', t:'[GIT] Tracking branch: main'},
    {c:'#ffc410', t:'[WARN] 1 file with uncommitted changes'},
    {c:'#9494b0', t:'Ready. Type `help` for commands.'},
  ])
  const [termInput, setTermInput] = useState('')
  const [termPalette, setTermPalette] = useState(TERM_PALETTES[1])
  const [showTermPalette, setShowTermPalette] = useState(false)
  const termEndRef = useRef(null)

  // JS Runtime
  const [nodeRunState, setNodeRunState] = useState({})
  const [edgeDataLabels, setEdgeDataLabels] = useState({})
  const [jsLogs, setJsLogs] = useState([
    {type:'header', val:'// FORBIDEN JS Runtime ready', ts:Date.now()},
    {type:'info',   val:'// Use ▶ on any node or type JS in the REPL below', ts:Date.now()},
  ])
  const [replInput, setReplInput] = useState('')
  const [replHistory, setReplHistory] = useState([])
  const [replHistIdx, setReplHistIdx] = useState(-1)
  const jsConsoleEndRef = useRef(null)

  // Markdown
  const [mdPreviewMode, setMdPreviewMode] = useState('preview')

  // Chat & Notes
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {id:1, from:'System', text:'Sync established. 4 nodes active.', self:false},
    {id:2, from:'Op-2', text:'Pushing DataMatrix refactor.', self:false},
    {id:3, from:'You', text:'Architecture booted. Running tests.', self:true},
  ])
  const [notesText, setNotesText] = useState('// OPERATOR NOTES\n// Sprint-01 planning\n\nTODO:\n- Finish graph force simulation\n- Wire WebSocket protocol\n- Add color palette persistence\n')
  const [searchQuery, setSearchQuery] = useState('')
  const [avatarIndex, setAvatarIndex] = useState(initialAvatar)
  const chatEndRef = useRef(null)

  // ── COMPUTED ──
  const activeTabNode = nodesRef.current.find(n => n.id === activeTabId) || null
  const modifiedNodes = nodesRef.current.filter(n => n.modified)
  const nodeCount = nodesRef.current.length
  const edgeCount = edgesRef.current.length
  const openGroup = groupsRef.current.find(g => g.id === openGroupId) || null

  const visibleNodes = nodesRef.current.filter(n => {
    if (n.id==='n1' && playheadPos<100) return false
    if (n.id==='n3' && playheadPos<250) return false
    return true
  })
  const visibleEdges = edgesRef.current.filter(e =>
    visibleNodes.find(n=>n.id===e.source) && visibleNodes.find(n=>n.id===e.target)
  )
  const filteredNodes = nodesRef.current.filter(n => {
    const q = searchQuery.trim().toLowerCase()
    return !q || n.label.toLowerCase().includes(q) || (n.code||'').toLowerCase().includes(q)
  })

  // ── EFFECTS ──

  useEffect(() => { termEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [termLines])
  useEffect(() => { chatEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [chatMessages])
  useEffect(() => { jsConsoleEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [jsLogs])
  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now()
      setEdgeDataLabels(prev => {
        const next = {...prev}
        let changed = false
        Object.keys(next).forEach(k => { if (now - next[k].ts > 8000) { delete next[k]; changed = true } })
        return changed ? next : prev
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Load workspace data from API
  useEffect(() => {
    if (wsHook.loading || wsHook.error) return
    if (wsHook.nodes.length > 0) {
      nodesRef.current = wsHook.nodes.map(n => ({
        id:n.id, label:n.label, filepath:n.filepath,
        type:n.type||'function', isMain:n.is_main,
        x:n.x||0, y:n.y||0, vx:0, vy:0,
        themeIdx:n.theme_idx||0, classId:n.class_id,
        code:'', modified:n.modified||false,
      }))
      edgesRef.current = wsHook.edges.map(e => ({id:e.id,source:e.source,target:e.target}))
      groupsRef.current = wsHook.groups.map(g => ({id:g.id,name:g.name,color:g.color,nodeIds:g.node_ids||[]}))
      forceRender({})
    }
    if (wsHook.columns.length > 0) {
      setBoard({
        cols: wsHook.columns.map(c=>({id:c.id,title:c.title,color:c.color})),
        cards: wsHook.cards.map(k=>({id:k.id,colId:k.col_id,title:k.title,priority:k.priority,tags:k.tags||[],progress:k.progress||0,due:k.due||null,assignee:k.assignee_idx??null})),
      })
    }
  }, [wsHook.loading])

  // Force simulation
  useEffect(() => {
    let rafId
    const tick = () => {
      let updated = false
      const nds = nodesRef.current, eds = edgesRef.current
      for (let i=0;i<nds.length;i++) for (let j=i+1;j<nds.length;j++) {
        const dx=nds[j].x-nds[i].x, dy=nds[j].y-nds[i].y
        const distSq=dx*dx+dy*dy||1, dist=Math.sqrt(distSq), force=4200/distSq
        nds[i].vx-=(dx/dist)*force; nds[i].vy-=(dy/dist)*force
        nds[j].vx+=(dx/dist)*force; nds[j].vy+=(dy/dist)*force
      }
      eds.forEach(edge => {
        const src=nds.find(n=>n.id===edge.source), tgt=nds.find(n=>n.id===edge.target)
        if (!src||!tgt) return
        const dx=tgt.x-src.x, dy=tgt.y-src.y, dist=Math.sqrt(dx*dx+dy*dy)||1, force=(dist-110)*0.05
        src.vx+=(dx/dist)*force; src.vy+=(dy/dist)*force
        tgt.vx-=(dx/dist)*force; tgt.vy-=(dy/dist)*force
      })
      nds.forEach(n => {
        const p=n.isMain?0.2:0.005
        n.vx+=(0-n.x)*p; n.vy+=(0-n.y)*p
        n.vx*=0.8; n.vy*=0.8; n.x+=n.vx; n.y+=n.vy
        if (Math.abs(n.vx)>0.05||Math.abs(n.vy)>0.05) updated=true
      })
      if (draggingNodeRef.current) {
        const d=nds.find(n=>n.id===draggingNodeRef.current.id)
        if (d) { d.x=draggingNodeRef.current.x; d.y=draggingNodeRef.current.y; d.vx=0; d.vy=0; updated=true }
      }
      if (updated) forceRender({})
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Non-passive wheel listener for zoom
  useEffect(() => {
    const el = canvasInputRef.current
    if (!el) return
    const handler = e => {
      e.preventDefault()
      setTransform(p => ({...p, scale: Math.min(3.0, Math.max(0.3, p.scale*(e.deltaY>0?.92:1.08)))}))
    }
    el.addEventListener('wheel', handler, { passive:false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = e => {
      const tag = e.target.tagName
      const inInput = tag==='INPUT'||tag==='TEXTAREA'||e.target.contentEditable==='true'
      if ((e.metaKey||e.ctrlKey)&&e.key==='p') { e.preventDefault(); setShowCmd(v=>!v) }
      if (e.key==='Escape') {
        setShowCmd(false); setEdgeMode(null); setJoinFirstNode(null); setNodeColorPicker(null); setShowTermPalette(false)
        if (!openGroupId) setActiveTabId(null)
        setOpenGroupId(null)
      }
      if (!inInput) {
        if (e.key==='n'||e.key==='N') setShowCreateNode(true)
        if (e.key==='g'||e.key==='G') { setShowCreateGroup(true); setGroupSelected([]) }
        if (e.key==='`'||e.key==='~') setBottomTab(v=>v==='terminal'?null:'terminal')
        if (e.key==='j'||e.key==='J') setEdgeMode(m=>m==='join'?null:'join')
        if (e.key==='x'||e.key==='X') setEdgeMode(m=>m==='cut'?null:'cut')
        if ((e.key==='Delete'||e.key==='Backspace')&&hoveredNodeId) {
          const nid=hoveredNodeId
          nodesRef.current=nodesRef.current.filter(n=>n.id!==nid)
          edgesRef.current=edgesRef.current.filter(e=>e.source!==nid&&e.target!==nid)
          setOpenTabs(t=>t.filter(tid=>tid!==nid))
          if (activeTabId===nid) setActiveTabId(null)
          forceRender({})
          wsHook.deleteNode(nid).catch(()=>{})
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openGroupId, hoveredNodeId, activeTabId])

  // ── CANVAS HANDLERS ──
  const handleCanvasPtrDown = e => {
    if (edgeMode) return
    if (e.target.closest('.mn-node')) return
    setNodeColorPicker(null)
    setIsDraggingCanvas(true)
    lastMousePos.current = { x:e.clientX, y:e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handleCanvasPtrMove = e => {
    if (!isDraggingCanvas) return
    const dx=e.clientX-lastMousePos.current.x, dy=e.clientY-lastMousePos.current.y
    setTransform(p=>({...p, x:p.x+dx, y:p.y+dy}))
    lastMousePos.current = { x:e.clientX, y:e.clientY }
  }
  const handleCanvasPtrUp = e => {
    setIsDraggingCanvas(false)
    const dr = draggingNodeRef.current
    if (dr?.hasDragged) wsHook.savePositions([{id:dr.id,x:dr.x,y:dr.y}]).catch(()=>{})
    draggingNodeRef.current = null
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // ── NODE / EDGE ──
  const openNodeInEditor = id => {
    setOpenTabs(t => t.includes(id)?t:[...t,id])
    setActiveTabId(id)
  }
  const closeTab = id => {
    setOpenTabs(t => {
      const newT = t.filter(tid=>tid!==id)
      if (activeTabId===id) setActiveTabId(newT[newT.length-1]||null)
      return newT
    })
  }
  const updateNodeCode = (id, code) => {
    nodesRef.current = nodesRef.current.map(n=>n.id===id?{...n,code,modified:true}:n)
    forceRender({})
  }
  const handleNodeClickInMode = nodeId => {
    if (edgeMode==='join') {
      if (!joinFirstNode) { setJoinFirstNode(nodeId); return }
      if (joinFirstNode===nodeId) { setJoinFirstNode(null); return }
      const exists=edgesRef.current.find(e=>(e.source===joinFirstNode&&e.target===nodeId)||(e.source===nodeId&&e.target===joinFirstNode))
      if (!exists) {
        const tempEdge={id:'e'+Date.now(),source:joinFirstNode,target:nodeId}
        edgesRef.current=[...edgesRef.current,tempEdge]; forceRender({})
        wsHook.createEdge(joinFirstNode,nodeId).catch(()=>{})
      }
      setJoinFirstNode(null)
    }
  }
  const handleEdgeClick = edgeId => {
    if (edgeMode==='cut') {
      edgesRef.current=edgesRef.current.filter(e=>e.id!==edgeId); forceRender({})
      wsHook.deleteEdge(edgeId).catch(()=>{})
    }
  }
  const handleChangeNodeColor = (nodeId, colorIdx) => {
    nodesRef.current=nodesRef.current.map(n=>n.id===nodeId?{...n,themeIdx:colorIdx}:n)
    setNodeColorPicker(null); forceRender({})
  }

  // ── GROUP ──
  const dissolveGroup = gid => {
    groupsRef.current=groupsRef.current.filter(g=>g.id!==gid)
    nodesRef.current=nodesRef.current.map(n=>n.classId===gid?{...n,classId:null}:n)
    if (openGroupId===gid) setOpenGroupId(null)
    forceRender({})
    if (wsHook.workspace) wsHook.deleteGroup(gid).catch(()=>{})
  }

  // ── CREATE ──
  const handleCreateNode = async () => {
    if (!newNodeName.trim()) return
    const raw = newNodeName.trim()
    // Respect whatever extension the user typed; default to .js
    const hasExt = /\.\w{1,5}$/.test(raw)
    const isDocType = newNodeType === 'doc'
    const label = hasExt ? raw.replace(/\s+/g,'_') : raw.replace(/\s+/g,'_') + (isDocType ? '.md' : '.js')
    const isMd = label.endsWith('.md')
    const code = isMd
      ? `# ${raw.replace(/\.\w+$/,'')}\n\n`
      : `// ${label}\n\n`
    const x=(Math.random()-.5)*300, y=(Math.random()-.5)*300
    const tempId='n'+Date.now()
    nodesRef.current=[...nodesRef.current,{id:tempId,label,filepath:label,type:isDocType||isMd?'doc':newNodeType,isMain:false,x,y,vx:0,vy:0,themeIdx:isDocType||isMd?11:newNodeColor,classId:null,code,modified:false}]
    setShowCreateNode(false); setNewNodeName(''); forceRender({})
    wsHook.createNode(label,{filepath:label,type:newNodeType,x,y,theme_idx:newNodeColor,code}).then(n=>{
      if(n) nodesRef.current=nodesRef.current.map(nd=>nd.id===tempId?{...nd,id:n.id}:nd)
    }).catch(()=>{})
  }
  const handleCreateGroup = () => {
    if (!groupName.trim()||groupSelected.length<2) return
    const gid='g'+Date.now()
    groupsRef.current=[...groupsRef.current,{id:gid,name:groupName.trim(),color:groupColor,nodeIds:[...groupSelected]}]
    nodesRef.current=nodesRef.current.map(n=>groupSelected.includes(n.id)?{...n,classId:gid}:n)
    setShowCreateGroup(false); setGroupName(''); setGroupSelected([]); forceRender({})
    if (wsHook.workspace) wsHook.createGroup(groupName.trim(),groupColor,[...groupSelected]).catch(()=>{})
  }

  // ── BOARD ──
  const addCard = colId => {
    if (!newCardTitle.trim()) return
    const title=newCardTitle.trim()
    const newCard={id:'k'+Date.now(),colId,title,priority:'MED',tags:[],progress:0,due:'',assignee:avatarIndex}
    setBoard(b=>({...b,cards:[...b.cards,newCard]}))
    setNewCardCol(null); setNewCardTitle('')
    if (wsHook.workspace) wsHook.createCard(colId,title,{priority:'MED',assignee_idx:avatarIndex}).catch(()=>{})
  }
  const moveCard = (cardId,colId) => {
    setBoard(b=>({...b,cards:b.cards.map(c=>c.id===cardId?{...c,colId}:c)}))
    if (wsHook.workspace) wsHook.updateCard(cardId,{col_id:colId}).catch(()=>{})
  }
  const updateCard = (cardId,patch) => {
    setBoard(b=>({...b,cards:b.cards.map(c=>c.id===cardId?{...c,...patch}:c)}))
    if (wsHook.workspace) wsHook.updateCard(cardId,patch).catch(()=>{})
  }
  const deleteCard = cardId => {
    setBoard(b=>({...b,cards:b.cards.filter(c=>c.id!==cardId)}))
    setFocusCard(null)
    if (wsHook.workspace) wsHook.deleteCard(cardId).catch(()=>{})
  }

  // ── TIMELINE ──
  const handlePlayheadDown = e => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    playheadDragRef.current={isDragging:true,startX:e.clientX,startPos:playheadPos}
  }
  const handlePlayheadMove = e => {
    if (!playheadDragRef.current.isDragging) return
    const totalWidth=700, maxP=totalWidth-10
    const newPos=Math.max(0,Math.min(playheadDragRef.current.startPos+(e.clientX-playheadDragRef.current.startX),maxP))
    setPlayheadPos(newPos)
    const ver=newPos<100?'v1.0':newPos<220?'v1.1':newPos<350?'v1.2':newPos<480?'v1.3':'v1.4 (HEAD)'
    setActiveVersionName(ver)
    setActiveVersionIdx(newPos<100?0:newPos<220?1:newPos<350?2:newPos<480?3:4)
  }
  const handlePlayheadUp = e => {
    playheadDragRef.current.isDragging=false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // ── TERMINAL ──
  const handleTermInput = e => {
    if (e.key!=='Enter') return
    const cmd=termInput.trim(); if(!cmd) return
    let resp=[{c:'#9494b0',t:`$ ${cmd}`}]
    if (cmd==='help') resp.push({c:'#28f1c3',t:'Commands: ls, clear, git status, git log, node list, edges, groups'})
    else if (cmd==='ls'||cmd==='node list') resp.push({c:'#c0c8d8',t:nodesRef.current.map(n=>n.label).join('  ')})
    else if (cmd==='edges') resp.push({c:'#c0c8d8',t:edgesRef.current.map(e=>`${e.source}→${e.target}`).join('  ')||'No edges.'})
    else if (cmd==='groups') resp.push({c:'#c0c8d8',t:groupsRef.current.map(g=>`${g.name}(${g.nodeIds.length})`).join('  ')||'No groups.'})
    else if (cmd==='clear') { setTermLines([]); setTermInput(''); return }
    else if (cmd==='git status') resp.push({c:modifiedNodes.length?'#ffc410':'#10b981',t:modifiedNodes.length?`${modifiedNodes.length} modified: ${modifiedNodes.map(n=>n.label).join(', ')}`:'Working tree clean.'})
    else if (cmd==='git log') { resp.push({c:'#4285f4',t:'commit a3f2c1d (HEAD -> main)'}); resp.push({c:'#9494b0',t:'  Date: '+new Date().toDateString()}); resp.push({c:'#c0c8d8',t:'  feat: FORBIDEN IDE v2'}) }
    else resp.push({c:'#ff435a',t:`command not found: ${cmd}`})
    setTermLines(l=>[...l,...resp]); setTermInput('')
  }

  // ── JS RUNTIME ──
  const handleRunNode = async (nodeId) => {
    const node = nodesRef.current.find(n => n.id === nodeId)
    if (!node) return
    setNodeRunState(s => ({...s, [nodeId]: {status:'running', ms:0}}))
    setBottomTab('console')
    setJsLogs(l => [...l, {type:'header', val:`▶  ${node.label}`, ts:Date.now(), nodeId}])
    const result = await runJS(node.code || '')
    setNodeRunState(s => ({...s, [nodeId]: {status: result.error?'error':'ok', ms: result.ms}}))
    setJsLogs(l => [
      ...l,
      ...result.logs.map(e => ({...e, nodeId})),
      {type: result.error?'error-footer':'footer', val: result.error ? `✗ Error · ${result.ms}ms` : `✓ Done · ${result.ms}ms`, ts:Date.now(), nodeId}
    ])
    if (result.retValStr !== undefined) {
      const outEdges = edgesRef.current.filter(e => e.source === nodeId)
      if (outEdges.length) {
        const label = result.retValStr.length > 20 ? result.retValStr.slice(0,20)+'…' : result.retValStr
        const ts = Date.now()
        setEdgeDataLabels(prev => {
          const next = {...prev}
          outEdges.forEach(e => { next[e.id] = {val:label, ts} })
          return next
        })
      }
    }
  }

  const handleRunRepl = async (code) => {
    if (!code.trim()) return
    setReplHistory(h => [code, ...h.slice(0,49)])
    setReplHistIdx(-1)
    setReplInput('')
    setJsLogs(l => [...l, {type:'repl-in', val:`> ${code}`, ts:Date.now()}])
    const result = await runJS(code)
    setJsLogs(l => [...l, ...result.logs])
  }

  const handleReplKey = e => {
    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleRunRepl(replInput) }
    if (e.key==='ArrowUp') {
      e.preventDefault()
      const idx = Math.min(replHistIdx+1, replHistory.length-1)
      setReplHistIdx(idx)
      if (replHistory[idx] !== undefined) setReplInput(replHistory[idx])
    }
    if (e.key==='ArrowDown') {
      e.preventDefault()
      const idx = Math.max(replHistIdx-1, -1)
      setReplHistIdx(idx)
      setReplInput(idx === -1 ? '' : replHistory[idx] || '')
    }
  }

  // ── CMD PALETTE ──
  const handleCmdAction = label => {
    if (!label) return
    if (label.includes('New file node')) setShowCreateNode(true)
    else if (label.includes('New doc node')) {
      const tempId='n'+Date.now()
      const x=(Math.random()-.5)*300, y=(Math.random()-.5)*300
      nodesRef.current=[...nodesRef.current,{id:tempId,label:'notes.md',filepath:'notes.md',type:'doc',isMain:false,x,y,vx:0,vy:0,themeIdx:11,classId:null,code:'# Notes\n\n',modified:false}]
      forceRender({}); openNodeInEditor(tempId)
    }
    else if (label.includes('New class group')) { setShowCreateGroup(true); setGroupSelected([]) }
    else if (label.includes('Run current file')) { if (activeTabId) handleRunNode(activeTabId) }
    else if (label.includes('JS console')) setBottomTab('console')
    else if (label.includes('terminal')) setBottomTab('terminal')
    else if (label.includes('board')) setSidebarMode('board')
    else if (label.includes('Join nodes')) setEdgeMode(m=>m==='join'?null:'join')
    else if (label.includes('Cut edge')) setEdgeMode(m=>m==='cut'?null:'cut')
    setShowCmd(false)
  }

  // ── ICON BAR ──
  const sideIconDefs = [
    { key:'files',    icon:<I.Files/>,   tip:'Files' },
    { key:'search',   icon:<I.Search/>,  tip:'Search' },
    { key:'git',      icon:<I.Git/>,     tip:'Git',    badge:modifiedNodes.length||0 },
    { key:'chat',     icon:<I.Message/>, tip:'Chat' },
    { key:'note',     icon:<I.Note/>,    tip:'Notes' },
    { key:'board',    icon:<I.Board/>,   tip:'Board' },
  ]

  // ── CHAPTER SPLASH DATA ──
  const splashImgSrc = activeTabNode ? getMangaImgSrc(activeTabNode) : null
  const chapterNum = openTabs.indexOf(activeTabId) + 1

  // ── RENDER ──
  return (
    <div className={`ide-v2-root ${brutal?'theme-brutal':'theme-cyber'}`}>

      {/* ═══════ TOPBAR ═══════ */}
      <div className="ide-topbar">
        <span className="ide-logo">FOR<span className="ide-logo-accent">BID</span>EN<span style={{color:'#ff2a38',animation:'fblink 1.1s infinite',fontSize:'1.1rem'}}>_</span></span>
        <div className="ide-topbar-sep"/>
        {/* Breadcrumb */}
        <div style={{flex:1,minWidth:0,display:'flex',alignItems:'center',gap:'5px',overflow:'hidden'}}>
          {activeTabNode ? (
            <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.14em',padding:'2px 8px',background:brutal?'#f2c12e':'rgba(255,42,56,.12)',color:brutal?'#0f0f0f':'#ff2a38',border:brutal?'2px solid #0f0f0f':'1px solid rgba(255,42,56,.3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'240px'}}>
              {activeTabNode.label} <span style={{opacity:.5,fontWeight:400}}>// {activeTabNode.type}</span>
            </div>
          ) : (
            <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.14em',padding:'2px 8px',color:brutal?'rgba(240,236,224,.35)':'rgba(200,200,220,.3)',border:brutal?'2px solid rgba(255,255,255,.12)':'1px solid rgba(255,255,255,.07)'}}>NO FILE OPEN</div>
          )}
        </div>
        {/* Stats */}
        <div style={{display:'flex',gap:'4px',alignItems:'center',flexShrink:0}}>
          <div style={{background:brutal?'#c8001a':'rgba(255,42,56,.12)',color:brutal?'#f4f0e8':'#ff2a38',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.12em',padding:'2px 7px',border:brutal?'2px solid #c8001a':'1px solid rgba(255,42,56,.25)'}}>{nodeCount} NODES</div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.12em',padding:'2px 7px',opacity:.5,border:brutal?'2px solid rgba(255,255,255,.12)':'1px solid rgba(255,255,255,.07)'}}>{edgeCount} EDGES</div>
          {modifiedNodes.length>0 && <div style={{background:'#f2c12e',color:'#0f0f0f',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.12em',padding:'2px 7px'}}>{modifiedNodes.length} UNSAVED</div>}
        </div>
        <div className="ide-topbar-sep"/>
        {/* Actions */}
        <button className="ide-topbar-btn primary" onClick={()=>setShowCreateNode(true)}>+ NODE</button>
        <button className="ide-topbar-btn" onClick={()=>{
          const x=(Math.random()-.5)*300, y=(Math.random()-.5)*300
          const tempId='n'+Date.now()
          nodesRef.current=[...nodesRef.current,{id:tempId,label:'readme.md',filepath:'readme.md',type:'doc',isMain:false,x,y,vx:0,vy:0,themeIdx:11,classId:null,code:'# README\n\nDocument your code here.\n\n## Overview\n\nThis is a **FORBIDEN** doc node.\n',modified:false}]
          forceRender({})
          openNodeInEditor(tempId)
        }}>+ DOC</button>
        <button className="ide-topbar-btn" onClick={()=>setShowCmd(true)}>⌘P</button>
        <button className="ide-topbar-btn" onClick={()=>setThemeMode(t=>t==='cyber'?'brutal':'cyber')} style={{minWidth:'58px'}}>
          {brutal?'BRUTAL':'CYBER'}
        </button>
        {/* Avatar */}
        <div onClick={()=>setSidebarMode(s=>s==='settings'?null:'settings')}
          style={{cursor:'pointer',width:'32px',height:'32px',border:`2px solid ${sidebarMode==='settings'?'#ff2a38':'rgba(255,255,255,.12)'}`,overflow:'hidden',flexShrink:0,transition:'border-color .15s'}}>
          <img src={`/avatars/0xAV0${String((avatarIndex%6)+1).padStart(2,'0')}s.jpeg`} alt="op" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
      </div>

      {/* ═══════ WORKSPACE ═══════ */}
      <div className="ide-workspace">

        {/* ── ICON BAR ── */}
        <div className="ide-icon-bar">
          {sideIconDefs.map(def=>(
            <div key={def.key} title={def.tip}
              className={`ide-icon-btn ${sidebarMode===def.key?'active':''}`}
              onClick={()=>setSidebarMode(s=>s===def.key?null:def.key)}>
              {def.icon}
              {def.badge>0 && <div className="ide-icon-badge">{def.badge}</div>}
            </div>
          ))}
          <div style={{flex:1}}/>
          <div title="Timeline" className={`ide-icon-btn ${bottomTab==='timeline'?'active':''}`} onClick={()=>setBottomTab(v=>v==='timeline'?null:'timeline')}>
            <I.Timeline/>
          </div>
          <div title="JS Console" className={`ide-icon-btn ${bottomTab==='console'?'active':''}`} onClick={()=>setBottomTab(v=>v==='console'?null:'console')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="3,5 7,8 3,11"/><line x1="9" y1="11" x2="13" y2="11"/></svg>
          </div>
          <div title="Terminal" className={`ide-icon-btn ${bottomTab==='terminal'?'active':''}`} onClick={()=>setBottomTab(v=>v==='terminal'?null:'terminal')}>
            <I.Terminal/>
          </div>
          <div title="Settings" className={`ide-icon-btn ${sidebarMode==='settings'?'active':''}`} onClick={()=>setSidebarMode(s=>s==='settings'?null:'settings')}>
            <I.Settings/>
          </div>
        </div>

        {/* ── TOC PANEL ── */}
        {sidebarMode && sidebarMode !== 'board' && (
          <div className="ide-toc-panel">
            {/* Header */}
            <div className="ide-toc-header">
              {sidebarMode==='search' ? (
                <>
                  <I.Search/>
                  <input className="ide-toc-search" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search nodes..." autoFocus/>
                </>
              ) : (
                <span className="ide-toc-sec" style={{padding:0,fontSize:'11px',letterSpacing:'.14em',fontFamily:"'Oswald',sans-serif",fontWeight:700}}>
                  {{files:'TABLE OF CONTENTS',git:'GIT STATUS',chat:'CHANNEL',note:'NOTES',settings:'SETTINGS'}[sidebarMode]||sidebarMode.toUpperCase()}
                </span>
              )}
            </div>

            {/* Content */}
            <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column',minHeight:0}}>

              {/* FILES */}
              {sidebarMode==='files' && (<>
                <div className="ide-toc-sec">CHAPTERS</div>
                <div style={{flex:1,overflowY:'auto'}}>
                  {nodesRef.current.map((node,i)=>{
                    const accent=ACCENTS[node.themeIdx%ACCENTS.length]
                    const imgSrc=getMangaImgSrc(node)
                    const grp=groupsRef.current.find(g=>g.nodeIds.includes(node.id))
                    return (
                      <div key={node.id} className={`ide-toc-item ${activeTabId===node.id?'active':''}`}
                        onClick={()=>openNodeInEditor(node.id)}>
                        <div className="ide-toc-thumb">
                          <img src={imgSrc} alt="" loading="lazy"/>
                          {grp && <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:grp.color}}/>}
                        </div>
                        <div className="ide-toc-info">
                          <div className="ide-toc-name">{node.label}</div>
                          <div className="ide-toc-type" style={{color:accent}}>{node.type}</div>
                        </div>
                        {node.modified && <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#ffc410',flexShrink:0}}/>}
                        {node.isMain && <div style={{width:'5px',height:'5px',borderRadius:brutal?0:'50%',background:accent,flexShrink:0}}/>}
                      </div>
                    )
                  })}
                  {groupsRef.current.length>0 && <>
                    <div className="ide-toc-sec">CLASSES</div>
                    {groupsRef.current.map(g=>(
                      <div key={g.id} className="ide-toc-item" onClick={()=>setOpenGroupId(g.id)}>
                        <div style={{width:26,height:34,flexShrink:0,background:g.color+'18',border:`1px solid ${g.color}33`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <span style={{fontFamily:"'Bangers',sans-serif",fontSize:'16px',color:g.color}}>{g.name[0]}</span>
                        </div>
                        <div className="ide-toc-info">
                          <div className="ide-toc-name" style={{color:g.color}}>{g.name}</div>
                          <div className="ide-toc-type">{g.nodeIds.length} methods</div>
                        </div>
                      </div>
                    ))}
                  </>}
                </div>
                <div className="ide-toc-footer">
                  <button className="ide-btn ide-btn-sm" onClick={()=>setShowCreateNode(true)}>+ NODE</button>
                  <button className="ide-btn ide-btn-sm" onClick={()=>{setShowCreateGroup(true);setGroupSelected([])}}>+ CLASS</button>
                </div>
              </>)}

              {/* SEARCH */}
              {sidebarMode==='search' && (
                <div style={{flex:1,overflowY:'auto'}}>
                  {searchQuery.trim() && <div className="ide-toc-sec">{filteredNodes.length} MATCH{filteredNodes.length!==1?'ES':''}</div>}
                  {filteredNodes.map(node=>{
                    const accent=ACCENTS[node.themeIdx%ACCENTS.length]
                    const imgSrc=getMangaImgSrc(node)
                    const q=searchQuery.trim().toLowerCase()
                    // show the matching code line as context
                    const matchLine = q ? (node.code||'').split('\n').find(l=>l.toLowerCase().includes(q)) : null
                    return (
                      <div key={node.id} className={`ide-toc-item ${activeTabId===node.id?'active':''}`} onClick={()=>openNodeInEditor(node.id)}>
                        <div className="ide-toc-thumb"><img src={imgSrc} alt="" loading="lazy"/></div>
                        <div className="ide-toc-info">
                          <div className="ide-toc-name">{node.label}</div>
                          {matchLine ? (
                            <div style={{fontSize:'9px',opacity:.5,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:"'JetBrains Mono',monospace",color:accent}}>
                              {matchLine.trim().slice(0,32)}
                            </div>
                          ) : (
                            <div className="ide-toc-type" style={{color:accent}}>{node.type}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {searchQuery.trim()&&!filteredNodes.length && <div style={{padding:'20px 10px',opacity:.35,fontFamily:"'Share Tech Mono',monospace",fontSize:'12px',textAlign:'center'}}>NO RESULTS</div>}
                </div>
              )}

              {/* GIT */}
              {sidebarMode==='git' && (<>
                <div style={{padding:'8px 10px',fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',flex:1,overflow:'auto'}}>
                  <div style={{opacity:.4,marginBottom:8}}>BRANCH <span style={{color:'#4285f4'}}>main</span></div>
                  <div style={{opacity:.4,marginBottom:14}}>4 commits ahead of origin</div>
                  {modifiedNodes.length===0 ? (
                    <div style={{color:'#10b981',fontFamily:"'JetBrains Mono',monospace",fontSize:'12px'}}>✓ Working tree clean</div>
                  ) : (
                    <>
                      <div className="ide-toc-sec" style={{padding:'0 0 4px'}}>MODIFIED</div>
                      {modifiedNodes.map(n=>(
                        <div key={n.id} className="ide-toc-item" onClick={()=>openNodeInEditor(n.id)}>
                          <div style={{width:6,height:6,borderRadius:'50%',background:'#ffc410',flexShrink:0}}/>
                          <div className="ide-toc-info">
                            <div className="ide-toc-name" style={{color:'#ffc410'}}>{n.label}</div>
                            <div className="ide-toc-type">modified</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <div style={{marginTop:14,opacity:.3,fontSize:'11px'}}>
                    <div>commit a3f2c1d (HEAD)</div>
                    <div>feat: FORBIDEN IDE v2</div>
                    <div>commit 0be317b</div>
                    <div>chore: remove unused file</div>
                  </div>
                </div>
              </>)}

              {/* CHAT */}
              {sidebarMode==='chat' && (
                <div className="ide-chat-wrap">
                  <div className="ide-chat-messages" ref={chatEndRef}>
                    {chatMessages.map(msg=>(
                      <div key={msg.id} className={`ide-chat-msg ${msg.self?'self':''}`}>
                        {!msg.self && <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',marginBottom:2,color:brutal?'#f2c12e':'#ff2a38',letterSpacing:'.08em'}}>{msg.from}</div>}
                        <div>{msg.text}</div>
                      </div>
                    ))}
                    <div ref={chatEndRef}/>
                  </div>
                  <div className="ide-chat-input-row">
                    <input value={chatInput} onChange={e=>setChatInput(e.target.value)}
                      onKeyDown={e=>{if(e.key==='Enter'&&chatInput.trim()){setChatMessages(m=>[...m,{id:Date.now(),from:'You',text:chatInput.trim(),self:true}]);setChatInput('')}}}
                      placeholder="Message..." style={{flex:1,background:'transparent',border:'none',outline:'none',fontFamily:"'Share Tech Mono',monospace",fontSize:'12px',color:brutal?'#0f0f0f':'#c0c8d8'}}/>
                    <button className="ide-btn ide-btn-sm" onClick={()=>{if(chatInput.trim()){setChatMessages(m=>[...m,{id:Date.now(),from:'You',text:chatInput.trim(),self:true}]);setChatInput('')}}}>↵</button>
                  </div>
                </div>
              )}

              {/* NOTES */}
              {sidebarMode==='note' && (
                <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',padding:2}}>
                  <textarea value={notesText} onChange={e=>setNotesText(e.target.value)}
                    style={{flex:1,resize:'none',border:'none',outline:'none',background:'transparent',fontFamily:"'Share Tech Mono',monospace",fontSize:'12px',lineHeight:1.6,color:brutal?'#0f0f0f':'#c0c8d8',padding:'8px 10px'}}
                    spellCheck={false}/>
                </div>
              )}

              {/* SETTINGS */}
              {sidebarMode==='settings' && (
                <div style={{flex:1,overflowY:'auto',padding:'10px'}}>
                  <div className="ide-toc-sec" style={{padding:'0 0 6px'}}>THEME</div>
                  <div style={{display:'flex',gap:'5px',marginBottom:14}}>
                    {['cyber','brutal'].map(t=>(
                      <button key={t} className={`ide-btn ide-btn-sm ${themeMode===t?'primary':''}`} onClick={()=>setThemeMode(t)} style={{flex:1}}>
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="ide-toc-sec" style={{padding:'0 0 6px'}}>AVATAR</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:4,marginBottom:14}}>
                    {[0,1,2,3,4,5].map(i=>(
                      <div key={i} onClick={()=>setAvatarIndex(i)}
                        style={{border:`2px solid ${avatarIndex===i?ACCENTS[i]:'rgba(128,128,128,.15)'}`,cursor:'pointer',overflow:'hidden',aspectRatio:'1',transition:'border-color .15s'}}>
                        <img src={`/avatars/0xAV0${String(i+1).padStart(2,'0')}s.jpeg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                      </div>
                    ))}
                  </div>
                  <div className="ide-toc-sec" style={{padding:'0 0 6px'}}>EDITOR PALETTE</div>
                  {PALETTES.slice(0,5).map(p=>(
                    <div key={p.id} className={`ide-palette-opt ${globalEditorPalette.id===p.id?'active':''}`}
                      onClick={()=>setGlobalEditorPalette(p)} style={{background:p.bg,marginBottom:2}}>
                      <div style={{display:'flex',gap:3}}>{p.swatches.map((c,i)=><div key={i} style={{width:7,height:7,borderRadius:'50%',background:c}}/>)}</div>
                      <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',color:p.base}}>{p.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CANVAS ── */}
        <div className="ide-canvas-wrap">
          {/* Mode bar */}
          <div className="ide-mode-bar">
            <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'13px',letterSpacing:'.12em',opacity:.5}}>{brutal?'MANGA // BRUTAL':'MANGA // CYBER'}</div>
            <div style={{flex:1}}/>
            <button className={`ide-mode-btn ${edgeMode==='join'?'m-join':''}`} onClick={()=>setEdgeMode(m=>m==='join'?null:'join')}>
              {edgeMode==='join'&&<span className="v-pulse green"/>}J·JOIN
            </button>
            <button className={`ide-mode-btn ${edgeMode==='cut'?'m-cut':''}`} onClick={()=>setEdgeMode(m=>m==='cut'?null:'cut')}>
              {edgeMode==='cut'&&<span className="v-pulse red"/>}X·CUT
            </button>
            <div className="ide-topbar-sep"/>
            <button className="ide-mode-btn" onClick={()=>setTransform({x:300,y:220,scale:1})}>RESET VIEW</button>
            {edgeMode==='join'&&joinFirstNode && (
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',color:'#10b981',marginLeft:6}}>
                → {nodesRef.current.find(n=>n.id===joinFirstNode)?.label}
              </div>
            )}
          </div>

          {/* Canvas input layer (captures pan + wheel) */}
          <div
            ref={canvasInputRef}
            className="ide-canvas-input-layer"
            onPointerDown={handleCanvasPtrDown}
            onPointerMove={handleCanvasPtrMove}
            onPointerUp={handleCanvasPtrUp}
            onPointerLeave={handleCanvasPtrUp}
            style={{cursor:isDraggingCanvas?'grabbing':edgeMode?'crosshair':'default'}}
          >
            {/* Transform container */}
            <div
              className="ide-canvas-graph-transform"
              style={{transform:`translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`}}
            >
              <div className="ide-canvas-graph">
                {/* Edges SVG */}
                <svg
                  style={{position:'absolute',left:-9999,top:-9999,width:19998,height:19998,overflow:'visible',pointerEvents:edgeMode==='cut'?'all':'none'}}
                >
                  <defs>
                    {visibleEdges.map(e=>{
                      const src=visibleNodes.find(n=>n.id===e.source), tgt=visibleNodes.find(n=>n.id===e.target)
                      if(!src||!tgt) return null
                      const srcAcc=ACCENTS[src.themeIdx%ACCENTS.length], tgtAcc=ACCENTS[tgt.themeIdx%ACCENTS.length]
                      return (
                        <linearGradient key={'g'+e.id} id={'grad-'+e.id} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={srcAcc} stopOpacity="0.55"/>
                          <stop offset="100%" stopColor={tgtAcc} stopOpacity="0.55"/>
                        </linearGradient>
                      )
                    })}
                  </defs>
                  <g transform="translate(9999,9999)">
                    {visibleEdges.map(e=>{
                      const src=visibleNodes.find(n=>n.id===e.source), tgt=visibleNodes.find(n=>n.id===e.target)
                      if(!src||!tgt) return null
                      const dx=tgt.x-src.x, dy=tgt.y-src.y
                      const len=Math.sqrt(dx*dx+dy*dy)||1
                      const bend=Math.min(len*0.38,72)
                      const c1x=src.x+bend, c1y=src.y
                      const c2x=tgt.x-bend, c2y=tgt.y
                      const isHov=hoveredEdgeId===e.id
                      const midX=(src.x+tgt.x)/2, midY=(src.y+tgt.y)/2
                      const edgeLabel=edgeDataLabels[e.id]
                      const srcAcc=ACCENTS[src.themeIdx%ACCENTS.length]
                      return (
                        <g key={e.id}>
                          <path
                            className="edge-path"
                            d={`M ${src.x} ${src.y} C ${c1x},${c1y} ${c2x},${c2y} ${tgt.x},${tgt.y}`}
                            stroke={isHov&&edgeMode==='cut'?'#ff435a':`url(#grad-${e.id})`}
                            strokeWidth={isHov?3:brutal?2:1.5}
                            opacity={isHov?1:.65}
                            style={{cursor:edgeMode==='cut'?'pointer':'default',transition:'opacity .15s'}}
                            onPointerEnter={()=>setHoveredEdgeId(e.id)}
                            onPointerLeave={()=>setHoveredEdgeId(null)}
                            onClick={()=>handleEdgeClick(e.id)}
                          />
                          {edgeLabel && (
                            <g transform={`translate(${midX},${midY})`} style={{pointerEvents:'none'}}>
                              <rect x={-edgeLabel.val.length*3-4} y={-9} width={edgeLabel.val.length*6+8} height={16}
                                rx={brutal?0:2} fill={brutal?'#0f0f0f':'rgba(3,3,15,.92)'} stroke={srcAcc} strokeWidth=".8" strokeOpacity=".7"/>
                              <text x={0} y={4} textAnchor="middle"
                                fontFamily="'Share Tech Mono',monospace" fontSize="8" fill={srcAcc} opacity=".95">
                                {edgeLabel.val}
                              </text>
                            </g>
                          )}
                        </g>
                      )
                    })}
                  </g>
                </svg>

                {/* Group hulls */}
                {groupsRef.current.map(grp=>{
                  const grpNodes=visibleNodes.filter(n=>grp.nodeIds.includes(n.id))
                  if (grpNodes.length<2) return null
                  const pts=grpNodes.map(n=>[n.x,n.y])
                  const hull=convexHull(pts)
                  if (hull.length<2) return null
                  const pad=brutal?54:48
                  const expanded=hull.map(([x,y])=>{
                    const cx=hull.reduce((s,[px])=>s+px,0)/hull.length
                    const cy=hull.reduce((s,[,py])=>s+py,0)/hull.length
                    const dx=x-cx, dy=y-cy, dist=Math.sqrt(dx*dx+dy*dy)||1
                    return [x+(dx/dist)*pad, y+(dy/dist)*pad]
                  })
                  const pointsStr=expanded.map(p=>p.join(',')).join(' ')
                  return (
                    <div key={grp.id} style={{position:'absolute',left:0,top:0,pointerEvents:'none'}}>
                      <svg style={{position:'absolute',left:-9999,top:-9999,width:19998,height:19998,overflow:'visible',pointerEvents:'none'}}>
                        <g transform="translate(9999,9999)">
                          <polygon points={pointsStr} className="group-hull"
                            stroke={grp.color} strokeWidth={brutal?2.5:1.5} strokeOpacity=".45"
                            fill={grp.color} fillOpacity=".07"
                            strokeDasharray={brutal?"6 3":"5 3"}/>
                        </g>
                      </svg>
                      {/* Group label — positioned at hull centroid */}
                      {(() => {
                        const cx=expanded.reduce((s,[x])=>s+x,0)/expanded.length
                        const cy=Math.min(...expanded.map(([,y])=>y))-14
                        return (
                          <div style={{position:'absolute',left:9999+cx,top:9999+cy,transform:'translateX(-50%)',pointerEvents:'auto',cursor:'pointer',zIndex:2}}
                            onClick={()=>setOpenGroupId(grp.id)}>
                            <span className="mn-group-label" style={{background:brutal?'#0f0f0f':'rgba(5,5,12,.92)',color:grp.color,border:`1px solid ${grp.color}44`}}>
                              {grp.name}
                            </span>
                          </div>
                        )
                      })()}
                    </div>
                  )
                })}

                {/* Nodes */}
                {visibleNodes.map(node=>(
                  <MangaNode
                    key={node.id}
                    node={node}
                    groups={groupsRef.current}
                    brutal={brutal}
                    isJoinSelected={joinFirstNode===node.id}
                    edgeMode={edgeMode}
                    hoveredNodeId={hoveredNodeId}
                    setHoveredNodeId={setHoveredNodeId}
                    draggingNodeRef={draggingNodeRef}
                    lastMousePos={lastMousePos}
                    transform={transform}
                    setNodeColorPicker={setNodeColorPicker}
                    handleNodeClickInMode={handleNodeClickInMode}
                    openNodeInEditor={openNodeInEditor}
                    nodeRunState={nodeRunState}
                    onRun={handleRunNode}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Canvas decorations (not transformed) */}
          <div className="ide-canvas-chapter" style={{pointerEvents:'none'}}>CHAPTER {nodeCount} · {activeVersionName}</div>
          <div className="ide-canvas-watermark">FORBIDEN</div>
          <GraphMinimap nodes={visibleNodes}/>
        </div>

        {/* ── EDITOR PANEL ── */}
        <div className="ide-editor-panel">
          {activeTabId && activeTabNode ? (
            <>
              {/* Chapter splash */}
              <div className="ide-chapter-splash">
                {splashImgSrc && <img src={splashImgSrc} alt=""/>}
                <div className="ide-splash-overlay"/>
                <div className="ide-splash-meta">
                  <span className="ide-splash-chapter">CHAPTER {chapterNum}</span>
                  <h2 className="ide-splash-title">{activeTabNode.label.replace(/\.\w+$/,'')}</h2>
                  <div className="ide-splash-info">{activeTabNode.type.toUpperCase()} · {(activeTabNode.code||'').split('\n').length} LINES · {activeTabNode.label.match(/\.(\w+)$/)?.[1]?.toUpperCase()||'FILE'}{activeTabNode.modified?' · MOD':''}</div>
                </div>
              </div>
              {/* Tabs + run button */}
              <div className="ide-file-tabs">
                {openTabs.map(id=>{
                  const n=nodesRef.current.find(nd=>nd.id===id)
                  if (!n) return null
                  return (
                    <div key={id} className={`ide-file-tab ${activeTabId===id?'active':''}`} onClick={()=>setActiveTabId(id)}>
                      {n.label}
                      {n.modified&&<span className="modified-dot"/>}
                      <span className="ide-tab-close" onClick={e=>{e.stopPropagation();closeTab(id)}}><I.X/></span>
                    </div>
                  )
                })}
                <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:4,padding:'0 6px',flexShrink:0}}>
                  {activeTabNode?.type==='doc' ? (
                    <>
                      <button onClick={()=>setMdPreviewMode('edit')}
                        style={{padding:'2px 7px',cursor:'pointer',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'9px',letterSpacing:'.1em',background:mdPreviewMode==='edit'?'#c792ea':'transparent',color:mdPreviewMode==='edit'?'#000':'rgba(200,200,220,.4)',border:'1px solid rgba(200,100,255,.25)'}}>
                        EDIT
                      </button>
                      <button onClick={()=>setMdPreviewMode('preview')}
                        style={{padding:'2px 7px',cursor:'pointer',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'9px',letterSpacing:'.1em',background:mdPreviewMode==='preview'?'#c792ea':'transparent',color:mdPreviewMode==='preview'?'#000':'rgba(200,200,220,.4)',border:'1px solid rgba(200,100,255,.25)'}}>
                        PREVIEW
                      </button>
                    </>
                  ) : (
                    <button onClick={()=>handleRunNode(activeTabId)} title="Run JS (Ctrl+Enter)"
                      style={{padding:'2px 10px',cursor:'pointer',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'9px',letterSpacing:'.1em',
                        background:nodeRunState[activeTabId]?.status==='ok'?'#10b981':nodeRunState[activeTabId]?.status==='error'?'#ff435a':'transparent',
                        color:nodeRunState[activeTabId]?.status?'#000':brutal?'#f2c12e':'#ff2a38',
                        border:`1px solid ${nodeRunState[activeTabId]?.status==='ok'?'#10b981':nodeRunState[activeTabId]?.status==='error'?'#ff435a':brutal?'#f2c12e':'rgba(255,42,56,.4)'}`,
                        transition:'all .15s'}}>
                      {nodeRunState[activeTabId]?.status==='running'?'⋯':nodeRunState[activeTabId]?.status==='ok'?`✓ ${nodeRunState[activeTabId].ms}ms`:nodeRunState[activeTabId]?.status==='error'?'✗ ERROR':'▶ RUN'}
                    </button>
                  )}
                </div>
              </div>
              {/* Editor / Markdown Preview */}
              <div className="ide-code-wrap" onKeyDown={e=>{if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();handleRunNode(activeTabId)}}}>
                {activeTabNode?.type==='doc' && mdPreviewMode==='preview' ? (
                  <div className="md-preview" dangerouslySetInnerHTML={{__html: renderMd(activeTabNode.code||'')}}/>
                ) : (
                  <CodeEditor
                    key={activeTabId}
                    node={activeTabNode}
                    onChange={code=>updateNodeCode(activeTabId,code)}
                    externalPalette={globalEditorPalette}
                  />
                )}
              </div>
            </>
          ) : (
            /* Welcome panel — dual column */
            <div className="ide-welcome">
              {/* Left: hero art column */}
              <div className="ide-welcome-left">
                <img src={getPanelImg(0)} alt="" loading="lazy"/>
                <div className="ide-welcome-hero-overlay"/>
                <div className="ide-welcome-hero-scanlines"/>
                <div className="ide-welcome-hero-text">
                  <div className="ide-welcome-hero-tag" style={{color:brutal?'#f2c12e':'#ff2a38',borderColor:brutal?'#f2c12e':'#ff2a38'}}>FORBIDEN // NGO</div>
                  <div className="ide-welcome-title">SELECT<br/>A NODE</div>
                  <div className="ide-welcome-sub">Each panel is a chapter.</div>
                </div>
              </div>
              {/* Right: info + grid + cta */}
              <div className="ide-welcome-right">
                <div className="ide-welcome-sys">
                  <div className="ide-welcome-sys-line" style={{color:brutal?'#f2c12e':'#ff2a38'}}>GRAPH IDE // ACTIVE</div>
                  <div className="ide-welcome-sys-line">{nodeCount} NODES · {edgeCount} EDGES</div>
                </div>
                <div className="ide-welcome-grid">
                  {[5,11,19,31,47,71].map(idx=>(
                    <div key={idx} className="ide-welcome-grid-item" onClick={()=>{
                      const n=nodesRef.current[idx%nodesRef.current.length]
                      if(n) openNodeInEditor(n.id)
                    }}>
                      <img src={getPanelImg(idx)} alt="" loading="lazy"/>
                    </div>
                  ))}
                </div>
                <div className="ide-welcome-cta">
                  <button className="ide-btn primary" onClick={()=>setShowCreateNode(true)}>+ NEW NODE</button>
                  <button className="ide-btn" onClick={()=>setSidebarMode('files')}>BROWSE FILES</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════ BOTTOM TRAY ═══════ */}
      {bottomTab && (
        <div className="ide-bottom-tray">
          <div className="ide-tray-tabs">
            <span className={`ide-tray-tab ${bottomTab==='timeline'?'active':''}`} onClick={()=>setBottomTab('timeline')}>TIMELINE</span>
            <span className={`ide-tray-tab ${bottomTab==='console'?'active':''}`} onClick={()=>setBottomTab('console')}>JS CONSOLE</span>
            <span className={`ide-tray-tab ${bottomTab==='terminal'?'active':''}`} onClick={()=>setBottomTab('terminal')}>TERMINAL</span>
            <span className="ide-tray-close" onClick={()=>setBottomTab(null)}>✕</span>
          </div>

          {/* TIMELINE */}
          {bottomTab==='timeline' && (
            <div className="ide-timeline">
              {/* Chapter strip */}
              <div className="ide-chapter-strip">
                {VERSIONS.map((ver,i)=>{
                  const imgSrc=getPanelImg(i*3+2)
                  return (
                    <div key={ver.id} className={`ide-chapter-thumb ${activeVersionIdx===i?'is-active':''}`}
                      onClick={()=>{setActiveVersionIdx(i);setActiveVersionName(ver.name);setPlayheadPos(i*140+20)}}>
                      <img src={imgSrc} alt="" loading="lazy"/>
                      <div className="ide-chapter-thumb-label">{ver.label}</div>
                      <div className="ide-chapter-thumb-dot" style={{background:ACCENTS[i%ACCENTS.length]}}/>
                    </div>
                  )
                })}
              </div>
              {/* NLE tracks */}
              <div className="ide-nle">
                <div className="ide-nle-headers">
                  {['NODES','EDGES','CODE'].map(lbl=>(
                    <div key={lbl} className="ide-nle-hcell"><div style={{width:6,height:6,borderRadius:'50%',background:brutal?'rgba(15,15,15,.35)':'rgba(200,200,220,.25)'}}/>  {lbl}</div>
                  ))}
                </div>
                <div className="ide-nle-tracks"
                  onPointerMove={e=>{if(playheadDragRef.current.isDragging){handlePlayheadMove(e)}}}
                  onPointerUp={handlePlayheadUp}>
                  {/* Playhead */}
                  <div className="ide-nle-playhead" style={{left:playheadPos}}
                    onPointerDown={handlePlayheadDown}/>
                  {/* Lane 1 - Nodes */}
                  <div className="ide-nle-lane">
                    <div className="ide-nle-clip" style={{left:20,width:340}}>v1.0 → v1.2 · CORE NODES</div>
                    <div className="ide-nle-clip" style={{left:380,width:200}}>v1.3 → v1.4 · NETWORK</div>
                  </div>
                  {/* Lane 2 - Edges */}
                  <div className="ide-nle-lane">
                    <div className="ide-nle-clip" style={{left:180,width:260}}>v1.1 → v1.3 · GRAPH EDGES</div>
                    <div className="ide-nle-clip" style={{left:460,width:160}}>v1.4 · NEW EDGES</div>
                  </div>
                  {/* Lane 3 - Code */}
                  <div className="ide-nle-lane">
                    <div className="ide-nle-clip" style={{left:20,width:560}}>CONTINUOUS · CODE EVOLUTION</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* JS CONSOLE */}
          {bottomTab==='console' && (
            <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:brutal?'#0a0a0a':'#03030e'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,padding:'4px 10px',borderBottom:brutal?'2px solid #1a1a1a':'1px solid rgba(255,42,56,.1)',flexShrink:0}}>
                <span style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'10px',letterSpacing:'.15em',color:brutal?'#f2c12e':'#ff2a38'}}>JS RUNTIME</span>
                {activeTabNode && (
                  <button onClick={()=>handleRunNode(activeTabId)}
                    style={{background:'#10b981',border:'none',color:'#000',padding:'2px 10px',cursor:'pointer',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'10px',letterSpacing:'.08em'}}>
                    ▶ RUN {activeTabNode.label}
                  </button>
                )}
                <div style={{marginLeft:'auto'}}>
                  <button onClick={()=>setJsLogs([])}
                    style={{background:'transparent',border:'1px solid rgba(255,255,255,.1)',color:'rgba(200,200,220,.4)',padding:'2px 8px',cursor:'pointer',fontFamily:"'Share Tech Mono',monospace",fontSize:'10px'}}>
                    CLEAR
                  </button>
                </div>
              </div>
              <div style={{flex:1,overflowY:'auto',padding:'6px 10px',fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',lineHeight:1.65,scrollbarWidth:'thin',scrollbarColor:'rgba(255,42,56,.2) transparent'}}>
                {jsLogs.map((line,i)=>{
                  const ts=new Date(line.ts).toLocaleTimeString('en',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})
                  const colors={log:'#c0c8d8',warn:'#ffc410',error:'#ff435a',info:'#4285f4',return:'#10b981',table:'#bb9af7',header:'#ff2a38','repl-in':'#28f1c3',footer:'#10b981','error-footer':'#ff435a'}
                  const col=colors[line.type]||'#c0c8d8'
                  const prefix={log:'[LOG]',warn:'[WARN]',error:'[ERR]',info:'[INFO]',return:'[←]',table:'[TBL]',header:'','repl-in':'',footer:'  ✓','error-footer':'  ✗'}[line.type]||''
                  if (line.type==='header') return (
                    <div key={i} style={{color:col,marginTop:i>0?8:0,fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'.1em',fontSize:'10px',borderTop:i>0?'1px solid rgba(255,42,56,.1)':'none',paddingTop:i>0?6:0}}>
                      {line.val}
                    </div>
                  )
                  return (
                    <div key={i} style={{display:'flex',gap:8,color:col,whiteSpace:'pre-wrap',wordBreak:'break-all'}}>
                      <span style={{opacity:.35,flexShrink:0,fontFamily:"'Share Tech Mono',monospace",fontSize:'9px',marginTop:1}}>{ts}</span>
                      {prefix&&<span style={{opacity:.55,flexShrink:0,fontSize:'9px',marginTop:1}}>{prefix}</span>}
                      <span style={{flex:1}}>{line.val}</span>
                    </div>
                  )
                })}
                <div ref={jsConsoleEndRef}/>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',borderTop:brutal?'2px solid #1a1a1a':'1px solid rgba(255,42,56,.08)',flexShrink:0,background:brutal?'#0f0f0f':'rgba(3,3,12,.6)'}}>
                <span style={{color:'#ff2a38',fontFamily:"'JetBrains Mono',monospace",fontSize:'12px',flexShrink:0}}>{'>'}</span>
                <input value={replInput} onChange={e=>setReplInput(e.target.value)} onKeyDown={handleReplKey}
                  style={{flex:1,background:'transparent',border:'none',outline:'none',fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',color:'#c0c8d8',caretColor:'#ff2a38'}}
                  placeholder="// type JS here, Enter to run..." spellCheck={false} autoComplete="off"/>
                <button onClick={()=>handleRunRepl(replInput)}
                  style={{background:'transparent',border:'1px solid rgba(255,42,56,.3)',color:'#ff2a38',padding:'2px 8px',cursor:'pointer',fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'9px',letterSpacing:'.1em',flexShrink:0}}>
                  RUN
                </button>
              </div>
            </div>
          )}

          {/* TERMINAL */}
          {bottomTab==='terminal' && (
            <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',background:termPalette.bg,position:'relative'}}>
              {/* Terminal toolbar */}
              <div style={{display:'flex',alignItems:'center',gap:4,padding:'4px 8px',background:termPalette.bg,borderBottom:`1px solid ${termPalette.border}44`,flexShrink:0}}>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',color:termPalette.dim,letterSpacing:'.1em'}}>TERMINAL</span>
                <div style={{marginLeft:'auto',position:'relative'}}>
                  <button onClick={()=>setShowTermPalette(v=>!v)}
                    style={{background:'transparent',border:`1px solid ${termPalette.border}33`,color:termPalette.dim,padding:'2px 8px',cursor:'pointer',fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'.06em'}}>
                    {termPalette.name} ▾
                  </button>
                  {showTermPalette && (
                    <div style={{position:'absolute',right:0,top:'calc(100%+4px)',width:'160px',background:brutal?'#f0ece0':'rgba(8,8,18,.98)',border:brutal?'3px solid #0f0f0f':'1px solid rgba(255,255,255,.1)',boxShadow:'0 10px 40px rgba(0,0,0,.9)',zIndex:99,padding:'4px'}}>
                      {TERM_PALETTES.map(tp=>(
                        <div key={tp.id} onClick={()=>{setTermPalette(tp);setShowTermPalette(false)}}
                          style={{padding:'5px 8px',cursor:'pointer',fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',color:tp.text,background:tp.bg,border:'1px solid transparent',marginBottom:1}}
                          onMouseEnter={e=>e.currentTarget.style.borderColor=tp.cursor} onMouseLeave={e=>e.currentTarget.style.borderColor='transparent'}>
                          {tp.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={()=>setTermLines([])} style={{background:'transparent',border:brutal?`2px solid rgba(255,255,255,.12)`:`1px solid rgba(255,255,255,.08)`,color:termPalette.dim,padding:'2px 8px',cursor:'pointer',fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'.06em'}}>CLEAR</button>
              </div>
              {/* Lines */}
              <div style={{flex:1,overflowY:'auto',padding:'8px 12px',fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',lineHeight:1.7,scrollbarWidth:'thin',scrollbarColor:`${termPalette.cursor}33 transparent`}}>
                {termLines.map((line,i)=>(
                  <div key={i} style={{color:line.c,whiteSpace:'pre-wrap',wordBreak:'break-all'}}>{line.t}</div>
                ))}
                <div ref={termEndRef}/>
              </div>
              {/* Input */}
              <div style={{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',background:termPalette.bg,borderTop:`1px solid ${termPalette.border}33`,flexShrink:0}}>
                <span style={{color:termPalette.prompt,fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',flexShrink:0}}>$</span>
                <input value={termInput} onChange={e=>setTermInput(e.target.value)} onKeyDown={handleTermInput}
                  style={{flex:1,background:'transparent',border:'none',outline:'none',fontFamily:"'JetBrains Mono',monospace",fontSize:'11px',color:termPalette.text,caretColor:termPalette.cursor}}
                  placeholder="Type a command..." spellCheck={false} autoComplete="off"/>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════ STATUS BAR ═══════ */}
      <div className="ide-status-bar">
        <div className="ide-status-badge" style={{background:brutal?'#c8001a':'#ff2a38',color:'#fff'}}>FORBIDEN</div>
        <span style={{color:'#10b981'}}>● ONLINE</span>
        <span style={{opacity:.2}}>|</span>
        <span>{nodeCount} nodes · {edgeCount} edges</span>
        {groupsRef.current.length>0 && <><span style={{opacity:.2}}>|</span><span>{groupsRef.current.length} classes</span></>}
        {edgeMode && <><span style={{opacity:.2}}>|</span><span style={{color:edgeMode==='join'?'#10b981':'#ff435a'}}>{edgeMode==='join'?'JOIN MODE':'CUT MODE'}</span></>}
        <span style={{marginLeft:'auto',opacity:.3}}>⌘P · N NEW · J JOIN · X CUT · ` TERMINAL</span>
        <span style={{opacity:.2}}>|</span>
        <span style={{color:brutal?'#f2c12e':'#ff2a38'}}>{brutal?'BRUTAL':'CYBER'}</span>
      </div>

      {/* ═══════ OVERLAYS ═══════ */}

      {/* Board overlay */}
      {sidebarMode==='board' && (
        <div className="ide-board-overlay" onClick={()=>setSidebarMode('files')}>
          <div className="ide-board-shell" onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div style={{padding:'10px 14px',display:'flex',alignItems:'center',gap:10,flexShrink:0,borderBottom:brutal?'3px solid #0f0f0f':'1px solid rgba(255,42,56,.15)'}}>
              <span style={{fontFamily:"'Bangers',sans-serif",fontSize:'1.3rem',letterSpacing:'.1em',color:brutal?'#f2c12e':'#ff2a38'}}>MISSION BOARD</span>
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',opacity:.4}}>{board.cards.length} tasks</span>
              <div style={{marginLeft:'auto',display:'flex',gap:6}}>
                <button className="ide-btn ide-btn-sm" onClick={()=>{setNewCardCol(board.cols[0]?.id);setNewCardTitle('')}}>+ TASK</button>
                <button onClick={()=>setSidebarMode('files')} style={{background:'transparent',border:'none',color:'rgba(200,200,220,.4)',cursor:'pointer',fontSize:'1.1rem'}}>✕</button>
              </div>
            </div>
            {/* Columns */}
            <div className="board-cols">
              {board.cols.map(col=>(
                <div key={col.id} className="board-col">
                  <div className="board-col-hdr" style={{color:col.color,borderBottom:brutal?`3px solid ${col.color}`:`1px solid ${col.color}44`}}>
                    <span>{col.title}</span>
                    <span style={{opacity:.5,fontFamily:"'Share Tech Mono',monospace"}}>{board.cards.filter(c=>c.colId===col.id).length}</span>
                  </div>
                  <div className="board-col-cards">
                    {board.cards.filter(c=>c.colId===col.id).map(card=>(
                      <div key={card.id} className="board-card" onClick={()=>setFocusCard(card)}>
                        <div className="board-card-accent" style={{background:PC[card.priority]||'#4a4a6a'}}/>
                        <div className="board-card-title">{card.title}</div>
                        <div className="board-card-meta">
                          <span className="board-priority" style={{background:(PC[card.priority]||'#4a4a6a')+'22',color:PC[card.priority]||'#c0c8d8',fontSize:'10px',fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:'.08em'}}>{card.priority}</span>
                          {card.tags?.slice(0,2).map(t=><span key={t} className="board-tag" style={{color:'rgba(200,200,220,.5)',borderColor:'rgba(255,255,255,.08)',fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',padding:'1px 4px'}}>{t}</span>)}
                        </div>
                        {card.progress>0 && (
                          <div className="board-progress">
                            <div className="board-progress-bar" style={{width:card.progress+'%',background:PC[card.priority]||'#10b981'}}/>
                          </div>
                        )}
                      </div>
                    ))}
                    {newCardCol===col.id ? (
                      <div style={{padding:'5px'}}>
                        <input value={newCardTitle} onChange={e=>setNewCardTitle(e.target.value)} placeholder="Task title..."
                          onKeyDown={e=>{if(e.key==='Enter')addCard(col.id);if(e.key==='Escape')setNewCardCol(null)}}
                          autoFocus style={{width:'100%',background:'transparent',border:brutal?'2px solid #0f0f0f':'1px solid rgba(255,42,56,.2)',outline:'none',color:brutal?'#0f0f0f':'#c0c8d8',fontFamily:"'Share Tech Mono',monospace",fontSize:'12px',padding:'5px 7px'}}/>
                      </div>
                    ) : (
                      <div className="board-add-card" onClick={()=>{setNewCardCol(col.id);setNewCardTitle('')}}>+ ADD TASK</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Card detail */}
      {focusCard && (
        <div className="board-card-detail-overlay" onClick={()=>setFocusCard(null)}>
          <div className="board-card-detail-box" onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
              <div style={{width:8,height:8,background:PC[focusCard.priority]||'#4a4a6a',borderRadius:brutal?0:'50%'}}/>
              <span style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',color:PC[focusCard.priority],letterSpacing:'.1em'}}>{focusCard.priority}</span>
              <button onClick={()=>setFocusCard(null)} style={{marginLeft:'auto',background:'transparent',border:'none',cursor:'pointer',color:'rgba(200,200,220,.35)',fontSize:'1rem'}}>✕</button>
            </div>
            <div style={{fontFamily:"'Bangers',sans-serif",fontSize:'1.1rem',letterSpacing:'.06em',marginBottom:8,color:brutal?'#0f0f0f':'#f4f0e8'}}>{focusCard.title}</div>
            {focusCard.due && <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',opacity:.5,marginBottom:8}}>DUE {focusCard.due}</div>}
            {focusCard.progress>0 && (
              <div style={{marginBottom:10}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.12em',opacity:.4,marginBottom:4}}>PROGRESS</div>
                <div style={{height:4,background:'rgba(128,128,128,.15)',borderRadius:2}}>
                  <div style={{width:focusCard.progress+'%',height:'100%',background:PC[focusCard.priority]||'#10b981',borderRadius:2,transition:'width .3s'}}/>
                </div>
              </div>
            )}
            {/* Move to col */}
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:'11px',letterSpacing:'.12em',opacity:.4,marginBottom:5}}>MOVE TO</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                {board.cols.map(col=>(
                  <button key={col.id} onClick={()=>{moveCard(focusCard.id,col.id);setFocusCard(null)}}
                    className="ide-btn ide-btn-sm" style={{color:col.color,borderColor:col.color+'44'}}>
                    {col.title}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:5,marginTop:10}}>
              <button className="ide-btn ide-btn-sm" style={{color:'#ff435a'}} onClick={()=>deleteCard(focusCard.id)}>DELETE</button>
            </div>
          </div>
        </div>
      )}

      {/* Group editor */}
      {openGroupId && openGroup && (
        <GroupEditor
          group={openGroup}
          nodes={nodesRef.current}
          onClose={()=>setOpenGroupId(null)}
          onOpenNode={id=>{setOpenGroupId(null);openNodeInEditor(id)}}
        />
      )}

      {/* Command palette */}
      <CommandPalette isOpen={showCmd} onClose={()=>setShowCmd(false)} onAction={handleCmdAction}/>

      {/* Create node modal */}
      {showCreateNode && (
        <div className="ide-overlay" onClick={()=>setShowCreateNode(false)}>
          <div className="ide-modal" onClick={e=>e.stopPropagation()}>
            <div className="ide-modal-hdr">
              <span className="ide-modal-title">NEW NODE</span>
              <button onClick={()=>setShowCreateNode(false)} style={{background:'transparent',border:'none',color:'rgba(200,200,220,.4)',cursor:'pointer',fontSize:'1.1rem'}}>✕</button>
            </div>
            <div className="ide-modal-body">
              <div>
                <div className="ide-modal-label">FILE NAME</div>
                <input className="ide-modal-input" value={newNodeName} onChange={e=>setNewNodeName(e.target.value)} placeholder="my_function" autoFocus
                  onKeyDown={e=>{if(e.key==='Enter')handleCreateNode();if(e.key==='Escape')setShowCreateNode(false)}}/>
              </div>
              <div>
                <div className="ide-modal-label">TYPE</div>
                <div style={{display:'flex',gap:5}}>
                  {['entry','function','class','module','doc'].map(t=>(
                    <button key={t} className={`ide-btn ide-btn-sm ${newNodeType===t?'primary':''}`} onClick={()=>setNewNodeType(t)}>{t.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="ide-modal-label">ACCENT</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {ACCENTS.map((c,i)=>(
                    <div key={i} onClick={()=>setNewNodeColor(i)}
                      style={{width:18,height:18,background:c,cursor:'pointer',border:`2px solid ${newNodeColor===i?'#fff':'transparent'}`,borderRadius:brutal?0:'50%',transition:'all .12s'}}/>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',gap:7}}>
                <button className="ide-btn primary" style={{flex:1}} onClick={handleCreateNode}>CREATE</button>
                <button className="ide-btn" onClick={()=>setShowCreateNode(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create group modal */}
      {showCreateGroup && (
        <div className="ide-overlay" onClick={()=>setShowCreateGroup(false)}>
          <div className="ide-modal" onClick={e=>e.stopPropagation()}>
            <div className="ide-modal-hdr">
              <span className="ide-modal-title">NEW CLASS</span>
              <button onClick={()=>setShowCreateGroup(false)} style={{background:'transparent',border:'none',color:'rgba(200,200,220,.4)',cursor:'pointer',fontSize:'1.1rem'}}>✕</button>
            </div>
            <div className="ide-modal-body">
              <div>
                <div className="ide-modal-label">CLASS NAME</div>
                <input className="ide-modal-input" value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="MyClass" autoFocus/>
              </div>
              <div>
                <div className="ide-modal-label">COLOR</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {ACCENTS.slice(0,8).map((c)=>(
                    <div key={c} onClick={()=>setGroupColor(c)}
                      style={{width:18,height:18,background:c,cursor:'pointer',border:`2px solid ${groupColor===c?'#fff':'transparent'}`,borderRadius:brutal?0:'50%'}}/>
                  ))}
                </div>
              </div>
              <div>
                <div className="ide-modal-label">SELECT METHODS (min 2)</div>
                <div style={{display:'flex',flexDirection:'column',gap:4,maxHeight:160,overflowY:'auto'}}>
                  {nodesRef.current.map(n=>(
                    <div key={n.id} onClick={()=>setGroupSelected(s=>s.includes(n.id)?s.filter(id=>id!==n.id):[...s,n.id])}
                      style={{display:'flex',alignItems:'center',gap:7,padding:'4px 8px',cursor:'pointer',border:`1px solid ${groupSelected.includes(n.id)?groupColor:'rgba(255,255,255,.08)'}`,background:groupSelected.includes(n.id)?groupColor+'12':'transparent',transition:'all .12s'}}>
                      <div style={{width:6,height:6,borderRadius:'50%',background:groupSelected.includes(n.id)?groupColor:'rgba(200,200,220,.25)'}}/>
                      <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'12px'}}>{n.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',gap:7}}>
                <button className="ide-btn primary" style={{flex:1}} onClick={handleCreateGroup} disabled={!groupName.trim()||groupSelected.length<2}>CREATE</button>
                <button className="ide-btn" onClick={()=>setShowCreateGroup(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Node color picker (portal) */}
      {nodeColorPicker && (
        <>
          <div style={{position:'fixed',inset:0,zIndex:9998}} onClick={()=>setNodeColorPicker(null)}/>
          <div className="ide-color-picker" style={{top:nodeColorPicker.y,left:nodeColorPicker.x}}>
            {ACCENTS.map((c,i)=>(
              <div key={i} className={`ide-color-swatch ${nodesRef.current.find(n=>n.id===nodeColorPicker.nodeId)?.themeIdx===i?'selected':''}`}
                style={{background:c,borderRadius:brutal?0:'50%'}}
                onClick={()=>handleChangeNodeColor(nodeColorPicker.nodeId,i)}/>
            ))}
          </div>
        </>
      )}

      {/* Term palette close */}
      {showTermPalette && <div style={{position:'fixed',inset:0,zIndex:97}} onClick={()=>setShowTermPalette(false)}/>}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  EXPORT
// ══════════════════════════════════════════════════════════════

export default function IDEPage() {
  return <IDE initialTheme="cyber" initialAvatar={0}/>
}
