import * as vscode from 'vscode';
import { Engine, GraphNode } from '../engine/Engine';
import { NodeTreeItem }      from '../extension';

const TYPE_ICONS: Record<string, string> = {
  entry:'home', function:'symbol-function', class:'symbol-class',
  module:'package', test:'beaker', util:'tools',
};

export class GraphTreeProvider implements vscode.TreeDataProvider<NodeTreeItem> {
  private _change = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this._change.event;

  constructor(private readonly engine: Engine) {}
  refresh() { this._change.fire(); }

  getTreeItem(el: NodeTreeItem) { return el; }

  getChildren(): NodeTreeItem[] {
    const ORDER: Record<string, number> = {
      entry:0, class:1, module:2, function:3, util:4, test:5,
    };
    return [...this.engine.getNodes()]
      .sort((a, b) => (ORDER[a.type] ?? 9) - (ORDER[b.type] ?? 9) || a.label.localeCompare(b.label))
      .map(n => this.toItem(n));
  }

  private toItem(n: GraphNode): NodeTreeItem {
    const icon      = new vscode.ThemeIcon(TYPE_ICONS[n.type] ?? 'file-code');
    const unsaved   = n.modified ? ' ●' : '';
    const linked    = n.filePath ? ' 🔗' : ' ○';
    const autoEdges = this.engine.getEdges().filter(e => e.source === n.id && e.kind === 'import').length;
    const symbols   = n.symbols.slice(0, 5).map(s => `\`${s.name}\``).join(', ');

    const tooltip = [
      `**${n.label}**`,
      `Type: ${n.type} · Lines: ${n.lineCount}`,
      autoEdges ? `Imports: ${autoEdges} detected edges` : '',
      symbols   ? `Symbols: ${symbols}` : '',
      n.filePath ? `File: ${n.filePath}` : '*Not linked to a file*',
    ].filter(Boolean).join('\n\n');

    return new NodeTreeItem(
      n.id,
      n.label + unsaved,
      `${n.type} · ${n.lineCount}L${linked}`,
      tooltip,
      icon,
    );
  }
}
