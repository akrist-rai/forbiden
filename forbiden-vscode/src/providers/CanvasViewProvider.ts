import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { Engine } from '../engine/Engine';

export class CanvasViewProvider {
  private panel: vscode.WebviewPanel | undefined;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly engine: Engine,
  ) {}

  open() {
    if (this.panel) { this.panel.reveal(); return; }

    this.panel = vscode.window.createWebviewPanel(
      'forbidenCanvas', 'FORBIDEN Canvas',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this.context.extensionUri, 'webview', 'dist'),
          vscode.Uri.joinPath(this.context.extensionUri, 'media'),
        ],
      },
    );

    this.panel.iconPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'icon-activity.svg');
    this.panel.webview.html = this.getHtml();
    this.panel.onDidDispose(() => { this.panel = undefined; });

    // Messages from webview → extension host
    this.panel.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case 'openNode': {
          await vscode.commands.executeCommand('forbiden.openNode',
            { nodeId: msg.nodeId } as any);
          break;
        }
        case 'addNode': {
          this.engine.addManualNode(msg.label, msg.nodeType);
          break;
        }
        case 'deleteNode': {
          this.engine.deleteNode(msg.nodeId);
          break;
        }
        case 'moveNode': {
          this.engine.moveNode(msg.nodeId, msg.x, msg.y);
          break;
        }
        case 'addEdge': {
          this.engine.addManualEdge(msg.source, msg.target);
          break;
        }
        case 'removeEdge': {
          this.engine.removeEdge(msg.edgeId);
          break;
        }
        case 'updateCode': {
          this.engine.markModified(msg.nodeId);
          break;
        }
        case 'ready': {
          this.sendGraphUpdate();
          break;
        }
      }
    }, undefined, this.context.subscriptions);

    // Send initial data
    setTimeout(() => this.sendGraphUpdate(), 300);
  }

  sendGraphUpdate() {
    if (!this.panel) return;
    this.panel.webview.postMessage({
      type: 'graphUpdate',
      nodes: this.engine.getNodes(),
      edges: this.engine.getEdges(),
    });
  }

  private getHtml(): string {
    const webview = this.panel!.webview;
    const distDir = vscode.Uri.joinPath(this.context.extensionUri, 'webview', 'dist');

    // Try loading built webview
    const indexPath = path.join(this.context.extensionUri.fsPath, 'webview', 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, 'utf8');
      // Rewrite asset paths to vscode-resource URIs
      html = html.replace(/(src|href)="(\/[^"]+)"/g, (_m, attr, p) => {
        const uri = webview.asWebviewUri(vscode.Uri.joinPath(distDir, p));
        return `${attr}="${uri}"`;
      });
      html = html.replace(/(src|href)="([^"http][^"]+)"/g, (_m, attr, p) => {
        const uri = webview.asWebviewUri(vscode.Uri.joinPath(distDir, p));
        return `${attr}="${uri}"`;
      });
      return html;
    }

    // Fallback inline canvas (dev mode / first run)
    return this.getFallbackHtml();
  }

  private getFallbackHtml(): string {
    const nonce = getNonce();
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'nonce-${nonce}'; connect-src ws: wss: http: https:;">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>FORBIDEN Canvas</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Bebas+Neue&display=swap" rel="stylesheet">
<style>
  :root{--void:#06060f;--surface:#0d0d1c;--surface2:#111128;--border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.12);--cyan:#00e5ff;--cyan-dim:rgba(0,229,255,0.12);--red:#ff1744;--gold:#ffd600;--green:#00e676;--purple:#bb9af7;--text:rgba(220,220,255,0.92);--text-dim:rgba(180,180,255,0.35);--text-mid:rgba(200,200,255,0.6);--mono:'JetBrains Mono',monospace;--display:'Bebas Neue',sans-serif;}
  *{box-sizing:border-box;margin:0;padding:0}
  body{width:100vw;height:100vh;background:var(--void);color:var(--text);font-family:var(--mono);overflow:hidden;display:flex;flex-direction:column}
  #topbar{height:40px;background:rgba(13,13,28,0.97);border-bottom:1px solid var(--border2);display:flex;align-items:center;padding:0 14px;gap:10px;flex-shrink:0}
  .logo{font-family:var(--display);font-size:1.3rem;letter-spacing:.12em}.logo em{color:var(--red);font-style:normal}
  .stat{font-size:.68rem;color:var(--text-dim);margin-left:auto}
  .btn{height:26px;padding:0 12px;border-radius:4px;font-size:.68rem;letter-spacing:.08em;font-family:var(--mono);cursor:pointer;border:1px solid var(--border2);background:transparent;color:var(--text-mid);transition:all .15s}
  .btn:hover{border-color:var(--cyan);color:var(--cyan);background:var(--cyan-dim)}
  .btn.primary{background:var(--red);border-color:var(--red);color:#fff}
  #canvas-wrap{flex:1;position:relative;overflow:hidden;background:var(--void)}
  #canvas-wrap::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:40px 40px}
  #canvas-inner{position:absolute;inset:0;transform-origin:0 0}
  .node{position:absolute;cursor:pointer;user-select:none}
  .card{width:200px;background:rgba(13,13,28,.97);border:1.5px solid var(--border2);border-radius:6px;overflow:hidden;transition:border-color .15s,box-shadow .15s,transform .15s}
  .card:hover{transform:translateY(-1px)}
  .card.selected{border-color:var(--cyan);box-shadow:0 0 20px rgba(0,229,255,.3),0 0 40px rgba(0,229,255,.1)}
  .card.main{border-color:var(--gold)}
  .card-art{width:100%;height:64px;background:linear-gradient(135deg,rgba(0,229,255,.08) 0%,rgba(187,154,247,.08) 100%);position:relative;display:flex;align-items:center;justify-content:center}
  .card-icon{font-size:1.8rem;opacity:.5}
  .card-badge{position:absolute;bottom:5px;left:7px;font-size:.52rem;letter-spacing:.14em;font-weight:700;border:1px solid;padding:2px 5px;border-radius:2px;background:rgba(6,6,15,.85)}
  .card-accent{height:2px}
  .card-info{padding:7px 9px 9px}
  .card-name{font-size:.7rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px}
  .card-meta{font-size:.58rem;color:var(--text-dim);display:flex;gap:6px}
  .unsaved{color:var(--gold)}
  .edge-svg{position:absolute;inset:0;pointer-events:none;z-index:2;overflow:visible;width:100%;height:100%}
  .edge-path{stroke-width:1.5;fill:none;opacity:.45}
  #minimap{position:absolute;bottom:12px;right:12px;z-index:50;background:rgba(13,13,28,.92);border:1px solid var(--border2);border-radius:6px;padding:8px;backdrop-filter:blur(12px)}
  #minimap-title{font-size:.58rem;letter-spacing:.14em;color:var(--text-dim);margin-bottom:5px}
  #toolbar{position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:50;display:flex;gap:2px;background:rgba(13,13,28,.92);border:1px solid var(--border2);border-radius:6px;padding:3px;backdrop-filter:blur(12px)}
  .tool-btn{padding:5px 11px;background:transparent;border:none;cursor:pointer;font-size:.65rem;letter-spacing:.1em;color:var(--text-dim);font-family:var(--mono);border-radius:4px;transition:all .15s}
  .tool-btn:hover,.tool-btn.active{color:var(--cyan);background:var(--cyan-dim)}
  #statusbar{height:22px;background:var(--red);display:flex;align-items:center;padding:0 12px;gap:14px;font-size:.63rem;letter-spacing:.08em;flex-shrink:0}
  #statusbar .bright{color:#fff;font-weight:600}#statusbar span{color:rgba(255,255,255,.75)}
  .ctx-menu{position:fixed;z-index:1000;background:var(--surface);border:1px solid var(--border2);border-radius:6px;min-width:150px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.7);display:none}
  .ctx-item{padding:8px 13px;cursor:pointer;font-size:.7rem;color:var(--text-mid);transition:all .1s}
  .ctx-item:hover{background:var(--surface2);color:var(--text)}
  .ctx-item.danger:hover{background:rgba(255,23,68,.15);color:var(--red)}
  .ctx-sep{height:1px;background:var(--border);margin:2px 0}
  #modal-overlay{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.78);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center}
  #modal-overlay.open{display:flex}
  .modal{background:var(--surface);border:1px solid var(--border2);border-radius:8px;width:380px;max-width:90vw;box-shadow:0 24px 60px rgba(0,0,0,.8)}
  .modal-header{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
  .modal-title{font-family:var(--display);font-size:1rem;letter-spacing:.08em}
  .modal-body{padding:16px;display:flex;flex-direction:column;gap:12px}
  .label{font-size:.62rem;letter-spacing:.14em;color:var(--text-dim);font-weight:600;margin-bottom:4px}
  input,select{width:100%;background:var(--void);border:1px solid var(--border2);border-radius:4px;color:var(--text);padding:7px 10px;font-family:var(--mono);font-size:.75rem;outline:none}
  input:focus,select:focus{border-color:var(--cyan)}
  .modal-footer{padding:12px 16px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--surface2);border-radius:2px}
</style>
</head>
<body>
<div id="topbar">
  <div class="logo">FOR<em>BID</em>EN</div>
  <div style="width:1px;height:16px;background:var(--border2)"></div>
  <span id="breadcrumb" style="font-size:.7rem;color:var(--text-dim)">graph-ide / canvas</span>
  <span class="stat" id="stat">0 nodes</span>
  <button class="btn" onclick="openModal()">+ Node</button>
  <button class="btn primary" onclick="vscodePost('runGraph',{})">▶ Run</button>
</div>
<div id="canvas-wrap">
  <div id="toolbar">
    <button class="tool-btn active" id="tool-select" onclick="setTool('select')">SELECT</button>
    <button class="tool-btn" id="tool-pan"    onclick="setTool('pan')">PAN</button>
    <button class="tool-btn" id="tool-connect" onclick="setTool('connect')">CONNECT</button>
    <div style="width:1px;height:14px;background:var(--border2);margin:0 2px"></div>
    <button class="tool-btn" onclick="resetView()">RESET</button>
  </div>
  <div id="canvas-inner">
    <svg class="edge-svg" id="edge-svg"></svg>
  </div>
  <div id="minimap">
    <div id="minimap-title">OVERVIEW</div>
    <svg id="minimap-svg" width="110" height="70"></svg>
  </div>
</div>
<div id="statusbar">
  <span class="bright">FORBIDEN // GRAPH IDE</span>
  <span id="sb-nodes">0 nodes · 0 edges</span>
  <span style="margin-left:auto" id="sb-sel">no selection</span>
</div>

<div id="ctx-menu" class="ctx-menu">
  <div class="ctx-item" id="ctx-open">Open in Editor</div>
  <div class="ctx-sep"></div>
  <div class="ctx-item danger" id="ctx-delete">Delete Node</div>
</div>

<div id="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title">NEW NODE</div>
      <button class="btn" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div><div class="label">FILE LABEL</div>
        <input id="new-label" placeholder="my_module.py" onkeydown="if(event.key==='Enter')createNode()">
      </div>
      <div><div class="label">NODE TYPE</div>
        <select id="new-type">
          <option value="entry">ENTRY</option>
          <option value="function" selected>FUNCTION</option>
          <option value="class">CLASS</option>
          <option value="module">MODULE</option>
          <option value="test">TEST</option>
          <option value="util">UTIL</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn primary" onclick="createNode()">Create Node</button>
    </div>
  </div>
</div>

<script nonce="${nonce}">
const vscode = acquireVsCodeApi();
function vscodePost(type, data){ vscode.postMessage({type,...data}); }

const COLORS={entry:'#ffd600',function:'#00e676',class:'#82aaff',module:'#bb9af7',test:'#ff1744',util:'#00e5ff'};
const ICONS={entry:'🏠',function:'⚡',class:'🧩',module:'📦',test:'🧪',util:'🔧'};
const CARD_W=200, CARD_H=136;

let nodes=[], edges=[], transform={x:300,y:200,scale:1};
let selectedId=null, dragging=null, isPanning=false, panStart={};
let connectMode=false, connectFrom=null;
let currentTool='select', ctxNodeId=null;

// ── VS Code message bridge ──
window.addEventListener('message', e=>{
  const msg=e.data;
  if(msg.type==='graphUpdate'){ nodes=msg.nodes; edges=msg.edges; render(); }
});
vscodePost('ready',{});

// ── Tool control ──
function setTool(t){
  currentTool=t;
  connectMode=(t==='connect');
  connectFrom=null;
  document.querySelectorAll('.tool-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tool-'+t)?.classList.add('active');
}
function resetView(){ transform={x:300,y:200,scale:1}; applyTransform(); }

// ── Canvas interaction ──
const wrap=document.getElementById('canvas-wrap');
const inner=document.getElementById('canvas-inner');

wrap.addEventListener('wheel',e=>{
  e.preventDefault();
  const f=e.deltaY<0?1.08:0.93;
  const r=wrap.getBoundingClientRect();
  const px=e.clientX-r.left, py=e.clientY-r.top;
  const ns=Math.min(2.5,Math.max(.2,transform.scale*f));
  transform={x:px-(px-transform.x)*(ns/transform.scale), y:py-(py-transform.y)*(ns/transform.scale), scale:ns};
  applyTransform();
},{passive:false});

wrap.addEventListener('mousedown',e=>{
  if(e.target!==wrap && e.target!==inner) return;
  if(e.button===1||(e.button===0&&(e.altKey||currentTool==='pan'))){
    e.preventDefault(); isPanning=true;
    panStart={mx:e.clientX,my:e.clientY,ox:transform.x,oy:transform.y};
  }
});
window.addEventListener('mousemove',e=>{
  if(isPanning){
    transform.x=panStart.ox+(e.clientX-panStart.mx);
    transform.y=panStart.oy+(e.clientY-panStart.my);
    applyTransform();
  }
  if(dragging){
    const n=nodes.find(x=>x.id===dragging.id);
    if(n){ n.x=dragging.ox+(e.clientX-dragging.mx)/transform.scale; n.y=dragging.oy+(e.clientY-dragging.my)/transform.scale; }
    renderNodes(); renderEdges(); renderMinimap();
  }
});
window.addEventListener('mouseup',()=>{
  if(dragging){ vscodePost('moveNode',{nodeId:dragging.id, x:nodes.find(n=>n.id===dragging.id)?.x??0, y:nodes.find(n=>n.id===dragging.id)?.y??0}); }
  isPanning=false; dragging=null;
  wrap.style.cursor='default';
});

function applyTransform(){ inner.style.transform=\`translate(\${transform.x}px,\${transform.y}px) scale(\${transform.scale})\`; }

// ── Rendering ──
function render(){ renderNodes(); renderEdges(); renderMinimap(); updateStatus(); }

function renderNodes(){
  // Remove old cards
  inner.querySelectorAll('.node').forEach(el=>el.remove());
  nodes.forEach(node=>{
    const color=COLORS[node.type]||'#00e5ff';
    const icon=ICONS[node.type]||'📄';
    const lines=(node.code||'').split('\\n').length;
    const el=document.createElement('div');
    el.className='node'; el.dataset.id=node.id;
    el.style.cssText=\`left:\${node.x}px;top:\${node.y}px;z-index:\${selectedId===node.id?10:5}\`;
    el.innerHTML=\`<div class="card\${selectedId===node.id?' selected':''}\${node.isMain?' main':''}" style="border-color:\${selectedId===node.id?color:''}">
      <div class="card-art" style="background:linear-gradient(135deg,\${color}11 0%,\${color}08 100%)">
        <div class="card-icon">\${icon}</div>
        <div class="card-badge" style="color:\${color};border-color:\${color}">\${node.type.toUpperCase()}</div>
        \${node.isMain?'<div class="card-badge" style="color:var(--gold);border-color:var(--gold);right:7px;left:auto">MAIN</div>':''}
      </div>
      <div class="card-accent" style="background:\${color}"></div>
      <div class="card-info">
        <div class="card-name">\${node.label}</div>
        <div class="card-meta"><span>\${lines}L</span>\${node.modified?'<span class="unsaved">● UNSAVED</span>':''}</div>
      </div>
    </div>\`;

    el.addEventListener('mousedown',e=>{
      if(e.button!==0)return; e.stopPropagation();
      if(connectMode){
        if(!connectFrom){ connectFrom=node.id; el.querySelector('.card').style.outline='2px solid var(--cyan)'; }
        else{ vscodePost('addEdge',{source:connectFrom,target:node.id}); connectFrom=null; inner.querySelectorAll('.card').forEach(c=>c.style.outline=''); }
        return;
      }
      dragging={id:node.id,mx:e.clientX,my:e.clientY,ox:node.x,oy:node.y};
      selectedId=node.id;
      renderNodes(); renderEdges(); updateStatus();
      wrap.style.cursor='grabbing';
    });
    el.addEventListener('dblclick',e=>{ e.stopPropagation(); vscodePost('openNode',{nodeId:node.id}); });
    el.addEventListener('contextmenu',e=>{ e.preventDefault(); e.stopPropagation(); showCtx(e.clientX,e.clientY,node.id); });
    inner.appendChild(el);
  });
}

function renderEdges(){
  const svg=document.getElementById('edge-svg');
  svg.innerHTML='<defs><marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="rgba(0,229,255,0.5)"/></marker></defs>';
  edges.forEach(e=>{
    const src=nodes.find(n=>n.id===e.source), tgt=nodes.find(n=>n.id===e.target);
    if(!src||!tgt)return;
    const sx=src.x+CARD_W/2, sy=src.y+CARD_H/2;
    const tx=tgt.x+CARD_W/2, ty=tgt.y+CARD_H/2;
    const my=(sy+ty)/2;
    const color=COLORS[src.type]||'#00e5ff';
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',\`M\${sx},\${sy} C\${sx},\${my} \${tx},\${my} \${tx},\${ty}\`);
    path.setAttribute('class','edge-path'); path.setAttribute('stroke',color);
    path.setAttribute('marker-end','url(#arr)');
    svg.appendChild(path);
  });
}

function renderMinimap(){
  const svg=document.getElementById('minimap-svg');
  svg.innerHTML='';
  if(!nodes.length)return;
  const xs=nodes.map(n=>n.x), ys=nodes.map(n=>n.y);
  const minX=Math.min(...xs)-80, maxX=Math.max(...xs)+80;
  const minY=Math.min(...ys)-80, maxY=Math.max(...ys)+80;
  const rX=maxX-minX||1, rY=maxY-minY||1;
  nodes.forEach(n=>{
    const mx=8+(n.x-minX)/rX*94, my=8+(n.y-minY)/rY*54;
    const color=COLORS[n.type]||'#00e5ff';
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',mx); c.setAttribute('cy',my);
    c.setAttribute('r',n.isMain?5:3); c.setAttribute('fill',color); c.setAttribute('opacity','0.75');
    svg.appendChild(c);
  });
}

function updateStatus(){
  const sel=nodes.find(n=>n.id===selectedId);
  document.getElementById('stat').textContent=\`\${nodes.length} nodes · \${edges.length} edges\`;
  document.getElementById('sb-nodes').textContent=\`\${nodes.length} nodes · \${edges.length} edges\`;
  document.getElementById('sb-sel').textContent=sel?sel.label:'no selection';
}

// ── Context menu ──
const ctxMenu=document.getElementById('ctx-menu');
function showCtx(x,y,id){
  ctxNodeId=id; selectedId=id; renderNodes(); renderEdges(); updateStatus();
  ctxMenu.style.cssText=\`display:block;left:\${x}px;top:\${y}px\`;
}
document.addEventListener('click',()=>{ ctxMenu.style.display='none'; });
document.getElementById('ctx-open').onclick=()=>{ vscodePost('openNode',{nodeId:ctxNodeId}); };
document.getElementById('ctx-delete').onclick=()=>{ vscodePost('deleteNode',{nodeId:ctxNodeId}); };

// ── Modal ──
function openModal(){ document.getElementById('modal-overlay').classList.add('open'); setTimeout(()=>document.getElementById('new-label').focus(),50); }
function closeModal(){ document.getElementById('modal-overlay').classList.remove('open'); }
function createNode(){
  const label=document.getElementById('new-label').value.trim();
  const type=document.getElementById('new-type').value;
  if(!label)return;
  vscodePost('addNode',{label,nodeType:type});
  document.getElementById('new-label').value='';
  closeModal();
}
document.getElementById('modal-overlay').addEventListener('click',e=>{ if(e.target===document.getElementById('modal-overlay'))closeModal(); });
</script>
</body>
</html>`;
  }
}

function getNonce() {
  let text = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
}
