import 'dotenv/config';
import mongoose from 'mongoose';
import Task from './models/Task.js';
import { generateTasks } from './seedData.js';

await mongoose.connect(process.env.MONGO_URI);
await Task.deleteMany({});
const created = await Task.insertMany(generateTasks());
console.log(`Seeded ${created.length} tasks`);
await mongoose.disconnect();
