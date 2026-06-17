"use strict";
const electron = require("electron");
const api = {
  // Engine
  getState: () => electron.ipcRenderer.invoke("engine:getState"),
  openFolder: () => electron.ipcRenderer.invoke("engine:openFolder"),
  scan: () => electron.ipcRenderer.invoke("engine:scan"),
  addNode: (label, type) => electron.ipcRenderer.invoke("engine:addNode", label, type),
  deleteNode: (id) => electron.ipcRenderer.invoke("engine:deleteNode", id),
  moveNode: (id, x, y) => electron.ipcRenderer.invoke("engine:moveNode", id, x, y),
  addEdge: (src, tgt) => electron.ipcRenderer.invoke("engine:addEdge", src, tgt),
  removeEdge: (id) => electron.ipcRenderer.invoke("engine:removeEdge", id),
  readFile: (fp) => electron.ipcRenderer.invoke("engine:readFile", fp),
  writeFile: (fp, content) => electron.ipcRenderer.invoke("engine:writeFile", fp, content),
  linkFile: (id) => electron.ipcRenderer.invoke("engine:linkFile", id),
  openInSystem: (fp) => electron.ipcRenderer.invoke("engine:openInSystem", fp),
  // Window controls
  minimize: () => electron.ipcRenderer.send("win:minimize"),
  maximize: () => electron.ipcRenderer.send("win:maximize"),
  close: () => electron.ipcRenderer.send("win:close"),
  // Events from main → renderer
  on: (channel, cb) => {
    const allowed = [
      "workspace:opened",
      "graph:update",
      "menu:scan",
      "menu:canvas",
      "menu:addNode",
      "menu:export",
      "menu:resetLayout"
    ];
    if (!allowed.includes(channel)) return;
    const sub = (_e, ...args) => cb(...args);
    electron.ipcRenderer.on(channel, sub);
    return () => electron.ipcRenderer.removeListener(channel, sub);
  }
};
electron.contextBridge.exposeInMainWorld("forbiden", api);
