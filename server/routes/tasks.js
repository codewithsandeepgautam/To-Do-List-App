import { Router } from 'express';
import Task from '../models/Task.js';

const router = Router();
const FIELDS = ['title', 'description', 'dueAt', 'endsAt', 'priority', 'status'];

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const pick = (body = {}) => Object.fromEntries(FIELDS.filter((k) => k in body).map((k) => [k, body[k]]));
const notFound = () => Object.assign(new Error('Task not found'), { status: 404 });

router.get('/', wrap(async (_req, res) => res.json(await Task.find().sort({ dueAt: 1 }))));

router.post('/', wrap(async (req, res) => res.status(201).json(await Task.create(pick(req.body)))));

const update = wrap(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
  if (!task) throw notFound();
  res.json(task);
});

router
  .route('/:id')
  .put(update)
  .patch(update)
  .delete(
    wrap(async (req, res) => {
      if (!(await Task.findByIdAndDelete(req.params.id))) throw notFound();
      res.status(204).end();
    })
  );

export default router;
