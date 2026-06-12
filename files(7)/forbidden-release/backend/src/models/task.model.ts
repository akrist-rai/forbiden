import { Schema, model, type Document } from 'mongoose';

export interface ITask extends Document {
  workspaceId: string;
  nodeId?: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'archived';
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    workspaceId: { type: String, required: true, index: true },
    nodeId:      String,
    title:       { type: String, required: true },
    status:      { type: String, enum: ['todo', 'in-progress', 'done', 'archived'], default: 'todo' },
    eventId:     String,
  },
  { timestamps: true }
);

export const Task = model<ITask>('Task', TaskSchema);
