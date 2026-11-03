import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell from '../components/Shell';
import TaskItem from '../components/TaskItem';
import StatusMessage from '../components/StatusMessage';
import { BackIcon, SearchIcon } from '../components/Icons';
import { useTasks } from '../context/TaskContext';

export default function Search() {
  const { tasks } = useTasks();
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();

  const results = useMemo(
    () => (term ? tasks.filter((t) => `${t.title} ${t.description}`.toLowerCase().includes(term)) : []),
    [tasks, term]
  );

  let hint = '';
  if (!term) hint = 'Type a keyword to find tasks by title or description.';
  else if (!results.length) hint = `No tasks match “${query.trim()}”.`;

  return (
    <Shell width="max-w-3xl">
      <Link to="/home" aria-label="Back" className="mb-5 block w-fit"><BackIcon size={24} /></Link>

      <div className="flex h-[43px] items-center justify-between border border-line px-4">
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a task" aria-label="Search tasks" className="h-full min-w-0 flex-1 bg-transparent text-xs" />
        <SearchIcon size={22} />
      </div>

      <div className="mt-6">
        <StatusMessage empty={hint} />
        <ul>{results.map((t) => <TaskItem key={t._id} task={t} />)}</ul>
      </div>
    </Shell>
  );
}
