// FORBIDEN VS Code Extension
import * as vscode from 'vscode';
import { Engine }             from './engine/Engine';
import { GraphTreeProvider }  from './providers/GraphTreeProvider';
import { CanvasViewProvider } from './providers/CanvasViewProvider';
import { StatusBarManager }   from './ui/StatusBarManager';

let engine:  Engine;
let tree:    GraphTreeProvider;
let canvas:  CanvasViewProvider;
let status:  StatusBarManager;

export function activate(context: vscode.ExtensionContext) {
  // ── Boot engine ──────────────────────────────────────────────────────────────
  engine = new Engine(context);

  // ── UI providers ─────────────────────────────────────────────────────────────
  tree   = new GraphTreeProvider(engine);
  canvas = new CanvasViewProvider(context, engine);
  status = new StatusBarManager(engine);
  status.register(context);

  const treeView = vscode.window.createTreeView('forbidenGraphTree', {
    treeDataProvider: tree,
    showCollapseAll:  false,
  });

  // ── Engine → UI sync ─────────────────────────────────────────────────────────
  engine.onDidChange(() => {
    tree.refresh();
    status.update();
    canvas.sendGraphUpdate();
  });

  // ── File watchers → engine ───────────────────────────────────────────────────
  const SUPPORTED = '**/*.{ts,tsx,js,jsx,mjs,cjs,py,rs,go,java,c,cpp,cs}';
  const watcher   = vscode.workspace.createFileSystemWatcher(SUPPORTED);
  watcher.onDidChange(uri => engine.syncFile(uri));
  watcher.onDidCreate(uri => engine.syncFile(uri));
  watcher.onDidDelete(uri => engine.onFileDeleted(uri));

  // Sync on save — mark node as saved
  vscode.workspace.onDidSaveTextDocument(doc => {
    const node = engine.findNodeByFile(doc.uri.fsPath);
    if (node) engine.markSaved(node.id);
  });

  // ── Commands ──────────────────────────────────────────────────────────────────
  const cmds: [string, (...a: any[]) => any][] = [

    ['forbiden.openCanvas', () => canvas.open()],

    ['forbiden.addNode', async () => {
      const label = await vscode.window.showInputBox({
        prompt: 'File label or name',
        placeHolder: 'utils.ts or src/helpers.py',
        validateInput: v => v.trim() ? null : 'Required',
      });
      if (!label) return;
      const type = await vscode.window.showQuickPick(
        ['entry','function','class','module','test','util'],
        { placeHolder: 'Node type' },
      ) as any;
      if (!type) return;
      engine.addManualNode(label.trim(), type);
    }],

    ['forbiden.openNode', async (item?: NodeTreeItem) => {
      const id   = item?.nodeId ?? await pickNode(engine);
      if (!id) return;
      const node = engine.getNode(id);
      if (!node) return;

      const wsRoot = vscode.workspace.workspaceFolders?.[0]?.uri;

      if (node.filePath && node.filePath !== '') {
        const uri = vscode.Uri.file(node.filePath);
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc, { preview: false });
      } else if (wsRoot) {
        // Create the file from node label
        const uri = vscode.Uri.joinPath(wsRoot, node.label);
        try { await vscode.workspace.fs.stat(uri); } catch {
          await vscode.workspace.fs.writeFile(uri, Buffer.from(`# ${node.label}\n`, 'utf8'));
        }
        engine.updateNodeFile(id, uri.fsPath);
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc, { preview: false });
      } else {
        const doc = await vscode.workspace.openTextDocument({ content: `# ${node.label}\n` });
        await vscode.window.showTextDocument(doc, { preview: false });
      }
    }],

    ['forbiden.deleteNode', async (item?: NodeTreeItem) => {
      const id   = item?.nodeId ?? await pickNode(engine);
      if (!id) return;
      const node = engine.getNode(id);
      if (!node) return;
      const ans = await vscode.window.showWarningMessage(
        `Remove "${node.label}" from graph? (File on disk NOT deleted)`,
        { modal: true }, 'Remove',
      );
      if (ans === 'Remove') engine.deleteNode(id);
    }],

    ['forbiden.refreshTree', () => { engine.init(); }],

    ['forbiden.scanWorkspace', async () => {
      const pattern = await vscode.window.showInputBox({
        prompt: 'Glob to scan',
        value: '**/*.{ts,tsx,js,jsx,py}',
      });
      if (!pattern) return;
      await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: 'FORBIDEN: Scanning…', cancellable: false },
        async () => {
          const count = await engine.scanWorkspace(pattern);
          vscode.window.showInformationMessage(`Added ${count} nodes from workspace.`);
        },
      );
    }],

    ['forbiden.exportGraph', async () => {
      const json = JSON.stringify(engine.getState(), null, 2);
      const doc  = await vscode.workspace.openTextDocument({ language: 'json', content: json });
      await vscode.window.showTextDocument(doc);
    }],
  ];

  for (const [cmd, fn] of cmds) {
    context.subscriptions.push(vscode.commands.registerCommand(cmd, fn));
  }
  context.subscriptions.push(treeView, watcher);

  // ── Init (async, non-blocking) ───────────────────────────────────────────────
  engine.init().then(() => {
    if (!context.globalState.get('forbiden.welcomed')) {
      vscode.window.showInformationMessage(
        'FORBIDEN is active! Press Ctrl+Shift+G to open the graph canvas.',
        'Open Canvas',
      ).then(s => { if (s === 'Open Canvas') canvas.open(); });
      context.globalState.update('forbiden.welcomed', true);
    }
  });
}

export function deactivate() { status?.dispose(); }

// ── Re-exported for providers ─────────────────────────────────────────────────
export class NodeTreeItem extends vscode.TreeItem {
  constructor(
    public readonly nodeId: string,
    label: string, description: string, tooltip: string,
    iconPath: vscode.ThemeIcon,
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.description  = description;
    this.tooltip      = new vscode.MarkdownString(tooltip);
    this.iconPath     = iconPath;
    this.contextValue = 'graphNode';
    this.command = { command: 'forbiden.openNode', title: 'Open', arguments: [this] };
  }
}

async function pickNode(engine: Engine): Promise<string | undefined> {
  const items = engine.getNodes().map(n => ({
    label:       `$(file-code) ${n.label}`,
    description: n.type,
    id:          n.id,
  }));
  return (await vscode.window.showQuickPick(items, { placeHolder: 'Select node' }))?.id;
}
