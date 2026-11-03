import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell from '../components/Shell';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';
import StatusMessage from '../components/StatusMessage';
import AddButton from '../components/AddButton';
import { BackIcon, ChevronIcon } from '../components/Icons';
import { useTasks } from '../context/TaskContext';
import { groupByWeek, stats, weekKey, weekLabel } from '../utils/date';

function WeekCard({ tasks, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const { done, open: pending, percent } = stats(tasks);

  return (
    <section className="border border-line">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full p-4 text-left">
        <span className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{weekLabel(tasks[0].due)}</h2>
          <ChevronIcon size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
        <span className="mt-3 flex gap-3 text-xs">
          <span className="bg-pending-bg px-2.5 py-1">{pending} Open</span>
          <span className="bg-done-bg px-2.5 py-1">{done} Completed</span>
        </span>
        <ProgressBar percent={percent} className="mt-3 !h-2" />
      </button>
      {open && <ul className="px-4">{tasks.map((t) => <TaskItem key={t._id} task={t} />)}</ul>}
    </section>
  );
}

export default function AllTasks() {
  const { tasks, openEditor } = useTasks();
  const weeks = useMemo(() => groupByWeek(tasks), [tasks]);
  const currentWeek = weekKey(new Date());

  return (
    <Shell>
      <header className="mb-6 flex items-center gap-4">
        <Link to="/home" aria-label="Back"><BackIcon size={24} /></Link>
        <h1 className="text-lg font-semibold">All Tasks</h1>
      </header>

      <StatusMessage empty={!tasks.length && 'No tasks yet. Tap + to add your first one.'} />
      <div className="grid items-start gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {weeks.map(([key, list]) => <WeekCard key={key} tasks={list} defaultOpen={key === currentWeek} />)}
      </div>

      <AddButton onClick={() => openEditor()} />
    </Shell>
  );
}
