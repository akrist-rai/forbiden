import { Schema, model, type Document } from 'mongoose';

// Code is stored directly in MongoDB.
// The Docker workspace container filesystem is kept in sync by ContainerSyncService
// so operators can use git natively inside the terminal.

interface INoteVersion {
  version: number;
  content: string;
  authorId: string;
  savedAt: Date;
  eventId: string;
}

interface IEdge {
  targetId: string;
  edgeType: 'default' | 'imports' | 'calls' | 'data-flow' | 'inherits' | 'test' | 'dependency' | 'data' | 'reference';
  label?: string;
}

export interface INode extends Document {
  id: string;
  workspaceId: string;
  label: string;
  type: string;
  code: string;
  language: string;
  noteContent: string;
  noteVersions: INoteVersion[];
  color: string;
  themeIdx: number;
  groupId?: string;
  position: { x: number; y: number };
  pinned: boolean;
  edges: IEdge[];
  lastEventId?: string;
  modified: boolean;
  execStatus?: 'idle' | 'running' | 'success' | 'error';
  lastExitCode?: number;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NoteVersionSchema = new Schema<INoteVersion>({
  version:  { type: Number, required: true },
  content:  { type: String, required: true },
  authorId: { type: String, required: true },
  savedAt:  { type: Date, default: Date.now },
  eventId:  { type: String, required: true },
}, { _id: false });

const NodeSchema = new Schema<INode>(
  {
    id:          { type: String, required: true, unique: true },
    workspaceId: { type: String, required: true, index: true },
    label:       { type: String, default: 'Untitled' },
    type:        { type: String, default: 'function' },
    code:        { type: String, default: '' },
    language:    { type: String, default: 'javascript' },
    noteContent: { type: String, default: '' },
    noteVersions:{ type: [NoteVersionSchema], default: [] },
    color:       { type: String, default: 'default' },
    themeIdx:    { type: Number, default: 0 },
    groupId:     String,
    position:    { x: { type: Number, default: 0 }, y: { type: Number, default: 0 } },
    pinned:      { type: Boolean, default: false },
    edges: [{
      targetId: { type: String, required: true },
      edgeType: {
        type: String,
        enum: ['default','imports','calls','data-flow','inherits','test','dependency','data','reference'],
        default: 'default',
      },
      label: String,
      _id: false,
    }],
    lastEventId:  String,
    modified:     { type: Boolean, default: false },
    execStatus:   { type: String, enum: ['idle','running','success','error'], default: 'idle' },
    lastExitCode: Number,
    deletedAt:    Date,
  },
  { timestamps: true }
);

// Full-text search index (Phase 5.2)
NodeSchema.index({ label: 'text', code: 'text', noteContent: 'text' });

NodeSchema.pre('save', function () {
  if (this.noteVersions.length > 100) {
    this.noteVersions = this.noteVersions.slice(-100);
  }
});

export const Node = model<INode>('Node', NodeSchema);
