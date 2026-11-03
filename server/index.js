import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/tasks.js';
import Task from './models/Task.js';
import { generateTasks } from './seedData.js';

const { PORT = 5000, MONGO_URI, CLIENT_URL, AUTO_SEED } = process.env;
const app = express();

app.use(cors({ origin: CLIENT_URL ? CLIENT_URL.split(',') : '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/tasks', taskRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, _req, res, _next) => {
  const status = err.status || (['ValidationError', 'CastError'].includes(err.name) ? 400 : 500);
  res.status(status).json({ message: err.message || 'Something went wrong' });
});

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    if (AUTO_SEED === 'true' && (await Task.estimatedDocumentCount()) === 0) await Task.insertMany(generateTasks());
    app.listen(PORT, () => console.log(`API running on :${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
