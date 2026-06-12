import { Schema, model, type Document } from 'mongoose';

// ─── Message ──────────────────────────────────────────────────────────────────

export interface IMessage extends Document {
  workspaceId: string;
  nodeId?: string;       // null = workspace-level chat
  threadId?: string;     // null = top-level message
  authorId: string;
  content: string;
  mentions: string[];
  attachments: Array<{ name: string; url: string; size: number }>;
  reactions: Array<{ emoji: string; userIds: string[] }>;
  editedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    workspaceId: { type: String, required: true, index: true },
    nodeId:      { type: String, default: null },
    threadId:    { type: String, default: null },
    authorId:    { type: String, required: true },
    content:     { type: String, maxlength: 4000, required: true },
    mentions:    [String],
    attachments: [{
      name: String, url: String, size: Number, _id: false,
    }],
    reactions: [{
      emoji: String,
      userIds: [String],
      _id: false,
    }],
    editedAt:  Date,
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// TTL: messages expire after 90 days
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });
MessageSchema.index({ workspaceId: 1, createdAt: -1 });
MessageSchema.index({ workspaceId: 1, nodeId: 1 });

export const Message = model<IMessage>('Message', MessageSchema);

// ─── Broadcast ────────────────────────────────────────────────────────────────

export type BroadcastType = 'SYSTEM' | 'GIT_PUSH' | 'GIT_ERROR' | 'NODE_ALERT' | 'DEPLOY' | 'RATE_LIMIT';
export type BroadcastLevel = 'info' | 'warn' | 'error' | 'success';

export interface IBroadcast extends Document {
  type: BroadcastType;
  title: string;
  body: string;
  level: BroadcastLevel;
  workspaceId: string;
  targetIds: string[];   // empty = all operators in workspace
  seenBy: Array<{ userId: string; seenAt: Date }>;
  actionUrl?: string;
  createdAt: Date;
}

const BroadcastSchema = new Schema<IBroadcast>(
  {
    type:        { type: String, enum: ['SYSTEM', 'GIT_PUSH', 'GIT_ERROR', 'NODE_ALERT', 'DEPLOY', 'RATE_LIMIT'], required: true },
    title:       { type: String, required: true },
    body:        String,
    level:       { type: String, enum: ['info', 'warn', 'error', 'success'], default: 'info' },
    workspaceId: { type: String, required: true, index: true },
    targetIds:   { type: [String], default: [] },
    seenBy:      [{ userId: String, seenAt: Date, _id: false }],
    actionUrl:   String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// TTL: broadcasts expire after 30 days
BroadcastSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

export const Broadcast = model<IBroadcast>('Broadcast', BroadcastSchema);
