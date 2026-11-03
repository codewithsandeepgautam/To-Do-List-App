import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';

const WEEK = { weekStartsOn: 1 }; 

export const weekStart = (d) => startOfWeek(d, WEEK);
export const weekDays = (d) => Array.from({ length: 7 }, (_, i) => addDays(weekStart(d), i));
export const weekKey = (d) => format(weekStart(d), 'yyyy-MM-dd');
export const weekLabel = (d) => `${format(weekStart(d), 'd MMM')} - ${format(endOfWeek(d, WEEK), 'd MMM yyyy')}`;
export const pad = (n) => String(n).padStart(2, '0');

export const isDone = (task) => task.status === 'Completed';

export function stats(tasks) {
  const done = tasks.filter(isDone).length;
  return { done, open: tasks.length - done, total: tasks.length, percent: tasks.length ? (done / tasks.length) * 100 : 0 };
}

export function groupByWeek(tasks) {
  const groups = new Map();
  tasks.forEach((t) => {
    const key = weekKey(t.due);
    groups.set(key, [...(groups.get(key) ?? []), t]);
  });
  return [...groups];
}
