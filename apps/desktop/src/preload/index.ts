// Preload — secure bridge between renderer and main via contextBridge
import { contextBridge, ipcRenderer } from 'electron'

const api = {
  // Engine
  getState:     ()                           => ipcRenderer.invoke('engine:getState'),
  openFolder:   ()                           => ipcRenderer.invoke('engine:openFolder'),
  scan:         ()                           => ipcRenderer.invoke('engine:scan'),
  addNode:      (label: string, type: string)=> ipcRenderer.invoke('engine:addNode', label, type),
  deleteNode:   (id: string)                 => ipcRenderer.invoke('engine:deleteNode', id),
  moveNode:     (id: string, x: number, y: number) => ipcRenderer.invoke('engine:moveNode', id, x, y),
  addEdge:      (src: string, tgt: string)   => ipcRenderer.invoke('engine:addEdge', src, tgt),
  removeEdge:   (id: string)                 => ipcRenderer.invoke('engine:removeEdge', id),
  readFile:     (fp: string)                 => ipcRenderer.invoke('engine:readFile', fp),
  writeFile:    (fp: string, content: string)=> ipcRenderer.invoke('engine:writeFile', fp, content),
  linkFile:     (id: string)                 => ipcRenderer.invoke('engine:linkFile', id),
  openInSystem: (fp: string)                 => ipcRenderer.invoke('engine:openInSystem', fp),

  // Window controls
  minimize: () => ipcRenderer.send('win:minimize'),
  maximize: () => ipcRenderer.send('win:maximize'),
  close:    () => ipcRenderer.send('win:close'),

  // Events from main → renderer
  on: (channel: string, cb: (...args: any[]) => void) => {
    const allowed = ['workspace:opened', 'graph:update', 'menu:scan', 'menu:canvas',
                     'menu:addNode', 'menu:export', 'menu:resetLayout']
    if (!allowed.includes(channel)) return
    const sub = (_e: any, ...args: any[]) => cb(...args)
    ipcRenderer.on(channel, sub)
    return () => ipcRenderer.removeListener(channel, sub)
  },
}

contextBridge.exposeInMainWorld('forbiden', api)

// Types for renderer
export type ForbidenAPI = typeof api
