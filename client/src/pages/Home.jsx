import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format, isSameDay, isToday } from 'date-fns';
import Shell from '../components/Shell';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';
import StatusMessage from '../components/StatusMessage';
import AddButton from '../components/AddButton';
import { CheckIcon, CrossIcon, SearchIcon } from '../components/Icons';
import { useTasks } from '../context/TaskContext';
import { pad, stats, weekDays, weekKey } from '../utils/date';

const TONES = {
  done: { card: 'bg-done-bg', icon: 'border-primary bg-done-icon text-primary' },
  pending: { card: 'bg-pending-bg', icon: 'border-danger bg-pending-icon text-danger' },
};

function SummaryCard({ tone, icon, label, count }) {
  return (
    <div className={`px-3.5 py-4 md:p-6 ${TONES[tone].card}`}>
      <div className="flex items-center gap-2.5">
        <span className={`flex h-[26px] w-[26px] items-center justify-center border ${TONES[tone].icon}`}>{icon}</span>
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 text-right text-2xl font-semibold leading-none">
        {pad(count)} <span className="text-[10px] font-normal text-muted">This Week</span>
      </p>
    </div>
  );
}

export default function Home() {
  const { tasks, openEditor } = useTasks();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => new Date());

  const days = useMemo(() => weekDays(selected), [selected]);
  const weekTasks = useMemo(() => tasks.filter((t) => weekKey(t.due) === weekKey(selected)), [tasks, selected]);
  const dayTasks = useMemo(() => weekTasks.filter((t) => isSameDay(t.due, selected)), [weekTasks, selected]);
  const { done, open, percent } = stats(weekTasks);

  return (
    <Shell>
      <button onClick={() => navigate('/search')} className="flex h-[43px] w-full items-center justify-between border border-line px-4 text-xs text-muted md:h-12 md:text-sm">
        Search for a task <SearchIcon size={22} className="text-ink" />
      </button>

      <div className="mt-5 flex justify-between md:mt-8 md:grid md:grid-cols-7 md:gap-3" role="tablist" aria-label="Days of the week">
        {days.map((d) => {
          const active = isSameDay(d, selected);
          return (
            <button key={d} role="tab" aria-selected={active} onClick={() => setSelected(d)}
              className={`flex h-[60px] w-9 flex-col items-center justify-center text-[10px] md:h-[76px] md:w-full md:text-xs ${active ? 'bg-primary text-white' : 'text-faint hover:bg-done-bg'}`}>
              {format(d, 'EEE')}
              <span className="text-[15px] font-medium leading-5 md:text-xl md:leading-7">{format(d, 'dd')}</span>
              <span className={`mt-0.5 h-[3px] w-[3px] rounded-full ${active ? 'bg-white' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-x-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <section>
          <div className="grid grid-cols-2 gap-[15px] md:gap-6">
            <SummaryCard tone="done" label="Task Complete" count={done} icon={<CheckIcon size={16} />} />
            <SummaryCard tone="pending" label="Task Pending" count={open} icon={<CrossIcon size={16} />} />
          </div>

          <h2 className="mb-4 mt-8 text-lg font-semibold">Weekly Progress</h2>
          <ProgressBar percent={percent} />
        </section>

        <section className="mt-9 lg:mt-0">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{isToday(selected) ? 'Tasks Today' : format(selected, 'EEE, d MMM')}</h2>
            <Link to="/all" className="text-sm text-primary">View All</Link>
          </div>

          <StatusMessage empty={dayTasks.length === 0 && 'No tasks for this day. Tap + to add one.'} />
          <ul>{dayTasks.map((t) => <TaskItem key={t._id} task={t} />)}</ul>
        </section>
      </div>

      <AddButton onClick={() => openEditor(null, selected)} />
    </Shell>
  );
}
