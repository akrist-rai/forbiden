// FORBIDEN — Electron Main Process
import { app, BrowserWindow, ipcMain, dialog, Menu, shell } from 'electron'
import { join } from 'path'
import { Engine } from './engine'

const engine  = new Engine()
let workspace = ''
let win:        BrowserWindow | null = null

// ── Window ────────────────────────────────────────────────────────────────────
function createWindow() {
  win = new BrowserWindow({
    width:  1440,
    height: 900,
    minWidth:  900,
    minHeight: 600,
    frame:     false,           // custom titlebar
    titleBarStyle: 'hidden',
    backgroundColor: '#06060f',
    webPreferences: {
      preload:      join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration:  false,
    },
    icon: join(__dirname, '../../resources/icon.png'),
    show: false,
  })

  win.once('ready-to-show', () => win!.show())

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  buildMenu()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

// ── Native Menu ───────────────────────────────────────────────────────────────
function buildMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'Open Folder…',        accelerator: 'CmdOrCtrl+O', click: () => ipcOpenFolder() },
        { type: 'separator' },
        { label: 'Scan Workspace',       accelerator: 'CmdOrCtrl+Shift+S', click: () => win?.webContents.send('menu:scan') },
        { label: 'Export Graph JSON',    click: () => win?.webContents.send('menu:export') },
        { type: 'separator' },
        { label: 'Quit',                 accelerator: 'CmdOrCtrl+Q', role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Canvas',        accelerator: 'CmdOrCtrl+Shift+G', click: () => win?.webContents.send('menu:canvas') },
        { type: 'separator' },
        { label: 'Reload',               role: 'reload' },
        { label: 'Toggle DevTools',      role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Zoom In',              role: 'zoomIn' },
        { label: 'Zoom Out',             role: 'zoomOut' },
        { label: 'Reset Zoom',           role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Toggle Fullscreen',    role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Graph',
      submenu: [
        { label: 'Add Node…',            accelerator: 'CmdOrCtrl+N', click: () => win?.webContents.send('menu:addNode') },
        { label: 'Scan for Files',       accelerator: 'CmdOrCtrl+Shift+F', click: () => win?.webContents.send('menu:scan') },
        { label: 'Reset Layout',         click: () => win?.webContents.send('menu:resetLayout') },
      ],
    },
  ])
  Menu.setApplicationMenu(menu)
}

async function ipcOpenFolder() {
  if (!win) return
  const result = await dialog.showOpenDialog(win, { properties: ['openDirectory'] })
  if (result.canceled || !result.filePaths[0]) return
  const folder = result.filePaths[0]
  workspace = folder
  engine.setWorkspace(folder)
  win.setTitle(`FORBIDEN — ${folder}`)
  win.webContents.send('workspace:opened', { folder, graph: engine.getState() })
}

// ── IPC Handlers ──────────────────────────────────────────────────────────────
ipcMain.handle('engine:getState',    () => engine.getState())

ipcMain.handle('engine:openFolder',  async () => {
  await ipcOpenFolder()
  return { folder: workspace, graph: engine.getState() }
})

ipcMain.handle('engine:scan',        () => {
  if (!workspace) return { error: 'No workspace open' }
  const count = engine.scanDir(workspace)
  return { count, graph: engine.getState() }
})

ipcMain.handle('engine:addNode',     (_e, label: string, type: string) => {
  engine.addNode(label, type as any)
  return engine.getState()
})

ipcMain.handle('engine:deleteNode',  (_e, id: string) => {
  engine.deleteNode(id)
  return engine.getState()
})

ipcMain.handle('engine:moveNode',    (_e, id: string, x: number, y: number) => {
  engine.moveNode(id, x, y)
})

ipcMain.handle('engine:addEdge',     (_e, source: string, target: string) => {
  engine.addEdge(source, target)
  return engine.getState()
})

ipcMain.handle('engine:removeEdge',  (_e, id: string) => {
  engine.removeEdge(id)
  return engine.getState()
})

ipcMain.handle('engine:readFile',    (_e, fp: string) => engine.getFileContent(fp))

ipcMain.handle('engine:writeFile',   (_e, fp: string, content: string) => {
  const ok = engine.writeFileContent(fp, content)
  if (ok) engine.syncFile(fp, workspace)
  return { ok, graph: engine.getState() }
})

ipcMain.handle('engine:linkFile',    (_e, id: string) => {
  if (!win) return
  dialog.showOpenDialog(win, { properties: ['openFile'] }).then(r => {
    if (!r.canceled && r.filePaths[0]) {
      engine.linkFile(id, r.filePaths[0], workspace)
      win!.webContents.send('graph:update', engine.getState())
    }
  })
})

ipcMain.handle('engine:openInSystem', (_e, fp: string) => shell.openPath(fp))

// Window controls (custom titlebar)
ipcMain.on('win:minimize', () => win?.minimize())
ipcMain.on('win:maximize', () => win?.isMaximized() ? win.unmaximize() : win?.maximize())
ipcMain.on('win:close',    () => win?.close())
