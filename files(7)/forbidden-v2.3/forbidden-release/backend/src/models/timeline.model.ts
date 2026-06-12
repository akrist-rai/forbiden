import { Schema, model, type Document } from 'mongoose';

export interface ITimelineEntry extends Document {
  workspaceId: string;
  eventId: string;
  eventType: string;
  nodeId?: string;
  label: string;
  icon: string;
  accentColor: string;
  diffPreview?: string;
  nodeSnapshot?: {
    label: string;
    color: string;
    groupId?: string;
  };
  gitRef?: string;
  commitUrl?: string;
  operatorId: string;
  createdAt: Date;
}

const TimelineEntrySchema = new Schema<ITimelineEntry>(
  {
    workspaceId:  { type: String, required: true, index: true },
    eventId:      { type: String, required: true, unique: true },
    eventType:    { type: String, required: true },
    nodeId:       String,
    label:        { type: String, required: true },
    icon:         { type: String, default: '◆' },
    accentColor:  { type: String, default: '#10b981' },
    diffPreview:  String,
    nodeSnapshot: {
      label:   String,
      color:   String,
      groupId: String,
    },
    gitRef:     String,
    commitUrl:  String,
    operatorId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

TimelineEntrySchema.index({ workspaceId: 1, createdAt: -1 });

export const TimelineEntry = model<ITimelineEntry>('TimelineEntry', TimelineEntrySchema);
