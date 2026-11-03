import mongoose from 'mongoose';

export const PRIORITIES = ['Low', 'Medium', 'High'];
export const STATUSES = ['In Progress', 'Completed'];

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 120 },
    description: { type: String, trim: true, default: '', maxlength: 1000 },
    dueAt: { type: Date, required: [true, 'Date & time is required'], index: true },
    endsAt: { type: Date, default: null },
    priority: { type: String, enum: PRIORITIES, default: null },
    status: { type: String, enum: STATUSES, default: 'In Progress' },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
