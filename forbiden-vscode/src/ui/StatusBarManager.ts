import * as vscode from 'vscode';
import { Engine } from '../engine/Engine';

export class StatusBarManager {
  private items: vscode.StatusBarItem[] = [];

  constructor(private readonly engine: Engine) {}

  register(ctx: vscode.ExtensionContext) {
    const main = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    main.command = 'forbiden.openCanvas';
    main.tooltip = 'Open FORBIDEN Graph Canvas';
    this.items.push(main);

    const edges = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    edges.tooltip = 'Auto-detected import edges';
    this.items.push(edges);

    ctx.subscriptions.push(...this.items);
    this.items.forEach(i => i.show());
    this.update();
  }

  update() {
    const n = this.engine.nodeCount;
    const e = this.engine.edgeCount;
    const a = this.engine.autoEdgeCount;
    const m = this.engine.modifiedCount;

    const [main, edgeItem] = this.items;
    main.text     = `$(type-hierarchy) FORBIDEN $(circle-small-filled) ${n} nodes`;
    main.color    = m > 0 ? new vscode.ThemeColor('statusBarItem.warningForeground') : undefined;
    edgeItem.text = `$(git-pull-request) ${a}/${e} edges`;
    edgeItem.tooltip = `${a} auto-detected import edges, ${e - a} manual`;
  }

  dispose() { this.items.forEach(i => i.dispose()); }
}
