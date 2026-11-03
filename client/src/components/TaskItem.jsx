import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { useTasks } from '../context/TaskContext';
import { isDone } from '../utils/date';
import { CheckIcon, EditIcon, TrashIcon } from './Icons';

const REVEAL = 84; 
const PRIORITY_COLOR = { High: 'text-danger', Medium: 'text-[#C98A00]', Low: 'text-[#2E9E6B]' };

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask, openEditor } = useTasks();
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, base: 0, active: false });
  const done = isDone(task);

  const onPointerDown = (e) => {
    drag.current = { startX: e.clientX, base: offset, active: true };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!dragging && Math.abs(dx) > 6) {
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId); 
    }
    if (dragging) setOffset(Math.max(-REVEAL, Math.min(0, d.base + dx)));
  };
  const onPointerUp = () => {
    drag.current.active = false;
    setDragging(false);
    setOffset((o) => (o < -REVEAL / 2 ? -REVEAL : 0));
  };

  return (
    <li className="relative overflow-hidden border-b border-[#EBEBED]">
      <button
        onClick={() => deleteTask(task._id)}
        tabIndex={offset ? 0 : -1}
        className="absolute inset-y-0 right-0 flex items-center justify-center bg-danger text-sm font-medium text-white"
        style={{ width: REVEAL }}
      >
        Delete
      </button>

      <div
        className={`relative flex touch-pan-y items-center gap-3 bg-surface py-3.5 ${dragging ? '' : 'transition-transform duration-200'}`}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button
          onClick={() => toggleTask(task)}
          aria-label={done ? 'Mark as in progress' : 'Mark as completed'}
          aria-pressed={done}
          className="flex h-5 w-5 shrink-0 items-center justify-center border border-primary text-primary"
        >
          {done && <CheckIcon size={14} />}
        </button>

        <button onClick={() => openEditor(task)} className="min-w-0 flex-1 text-left">
          <span className={`block truncate text-sm font-medium ${done ? 'line-through' : ''}`}>{task.title}</span>
          <span className="mt-0.5 block text-[11px] text-muted">
            {format(task.due, 'h:mm a')}
            {task.priority && <span className={`ml-2 font-medium ${PRIORITY_COLOR[task.priority]}`}>{task.priority}</span>}
          </span>
        </button>

        <button onClick={() => deleteTask(task._id)} aria-label="Delete task" className="text-faint hover:text-danger">
          <TrashIcon size={24} />
        </button>
        <button onClick={() => openEditor(task)} aria-label="Edit task" className="mr-0.5 text-faint hover:text-primary">
          <EditIcon size={24} />
        </button>
      </div>
    </li>
  );
}
