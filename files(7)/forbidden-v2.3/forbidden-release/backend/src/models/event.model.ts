import { Schema, model, type Document } from 'mongoose';

export const EVENT_TYPES = [
  'NODE_CREATED',
  'NODE_DELETED',
  'NODE_EDITED',
  'NODE_JOINED',
  'NODE_CUT',
  'NODE_MOVED',
  'NOTE_SAVED',
  'GROUP_CREATED',
  'GROUP_DELETED',
  'WORKSPACE_SNAPSHOT',
] as const;

export type EventType = typeof EVENT_TYPES[number];

export interface IEventMeta {
  operatorId: string;
  sessionId: string;
  clientTimestamp: Date;
  serverTimestamp: Date;
  causalVector?: string;
}

export interface IEvent extends Document {
  eventId: string;
  streamId: string;
  type: EventType;
  version: number;
  payload: Record<string, unknown>;
  meta: IEventMeta;
  clientEventId?: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    eventId:       { type: String, required: true, unique: true },
    streamId:      { type: String, required: true, index: true },
    type:          { type: String, enum: EVENT_TYPES, required: true },
    version:       { type: Number, default: 1 },
    payload:       { type: Schema.Types.Mixed, required: true },
    meta: {
      operatorId:      { type: String, required: true },
      sessionId:       { type: String, required: true },
      clientTimestamp: { type: Date, required: true },
      serverTimestamp: { type: Date, default: Date.now },
      causalVector:    String,
    },
    clientEventId: { type: String, sparse: true, index: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    strict: true,
  }
);

EventSchema.index({ streamId: 1, eventId: 1 });
EventSchema.index({ streamId: 1, createdAt: -1 });

export const Event = model<IEvent>('Event', EventSchema);
