/**
 * ThemeService
 *
 * Manages the Monaco theme registry:
 *   - Seeding built-in themes on startup
 *   - Custom theme CRUD (scoped to a workspace)
 *   - Theme fork (duplicate a built-in to customise)
 */

import { v7 as uuidv7 } from 'uuid';
import { Theme, BUILTIN_THEMES, type ITheme } from '@/models/theme.model';

export class ThemeService {
  /**
   * Seed built-in themes into the database on server startup.
   * Uses upsert so re-runs are idempotent.
   */
  static async seedBuiltins(): Promise<void> {
    for (const theme of BUILTIN_THEMES) {
      await Theme.findOneAndUpdate(
        { themeId: theme.themeId },
        { $setOnInsert: theme },
        { upsert: true, new: true }
      );
    }
    console.log(`[themes] Seeded ${BUILTIN_THEMES.length} built-in themes`);
  }

  /**
   * List themes available to a workspace:
   *   all built-in themes + custom themes scoped to the workspace
   */
  static async listForWorkspace(workspaceId: string): Promise<ITheme[]> {
    return Theme.find({
      $or: [
        { builtIn: true },
        { workspaceId },
      ],
    }).sort({ builtIn: -1, name: 1 }).lean() as Promise<ITheme[]>;
  }

  /**
   * Get a single theme by ID.
   * Returns null if the theme doesn't exist or is scoped to a different workspace.
   */
  static async get(themeId: string, workspaceId: string): Promise<ITheme | null> {
    return Theme.findOne({
      themeId,
      $or: [{ builtIn: true }, { workspaceId }],
    }).lean() as Promise<ITheme | null>;
  }

  /**
   * Fork a theme (built-in or custom) into a new custom theme for a workspace.
   * The fork starts as an exact copy — the operator then edits it client-side.
   */
  static async fork(
    sourceThemeId: string,
    workspaceId: string,
    name: string,
    operatorId: string,
  ): Promise<ITheme> {
    const source = await Theme.findOne({ themeId: sourceThemeId }).lean() as ITheme | null;
    if (!source) throw new Error(`Source theme '${sourceThemeId}' not found`);

    const newThemeId = `custom-${uuidv7()}`;
    const fork = await Theme.create({
      themeId:     newThemeId,
      name,
      base:        source.base,
      rules:       source.rules,
      colors:      { ...source.colors },
      builtIn:     false,
      workspaceId,
      description: `Forked from: ${source.name}`,
      createdBy:   operatorId,
    });

    return fork.toObject() as ITheme;
  }

  /**
   * Create a new custom theme from scratch.
   */
  static async create(input: {
    name: string;
    base: ITheme['base'];
    rules: ITheme['rules'];
    colors: ITheme['colors'];
    workspaceId: string;
    operatorId: string;
    description?: string;
  }): Promise<ITheme> {
    const theme = await Theme.create({
      themeId:     `custom-${uuidv7()}`,
      name:        input.name,
      base:        input.base,
      rules:       input.rules,
      colors:      input.colors,
      builtIn:     false,
      workspaceId: input.workspaceId,
      description: input.description,
      createdBy:   input.operatorId,
    });
    return theme.toObject() as ITheme;
  }

  /**
   * Update a custom theme (cannot modify built-ins).
   */
  static async update(
    themeId: string,
    workspaceId: string,
    patch: Partial<Pick<ITheme, 'name' | 'rules' | 'colors' | 'description'>>,
  ): Promise<ITheme> {
    const theme = await Theme.findOneAndUpdate(
      { themeId, workspaceId, builtIn: false },
      { $set: patch },
      { new: true }
    ).lean() as ITheme | null;

    if (!theme) throw new Error('Theme not found or cannot be modified');
    return theme;
  }

  /**
   * Delete a custom theme (cannot delete built-ins).
   */
  static async delete(themeId: string, workspaceId: string): Promise<void> {
    const result = await Theme.deleteOne({ themeId, workspaceId, builtIn: false });
    if (result.deletedCount === 0) {
      throw new Error('Theme not found or cannot be deleted');
    }
  }
}
