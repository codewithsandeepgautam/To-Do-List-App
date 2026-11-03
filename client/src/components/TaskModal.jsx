import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon, CloseIcon } from './Icons';

const PRIORITIES = ['Low', 'Medium', 'High'];
const at = (date, time) => new Date(`${date}T${time}`);

function initialForm(task, defaultDate) {
  if (!task) return { title: '', description: '', date: format(defaultDate, 'yyyy-MM-dd'), start: '', end: '', priority: 'Medium' };
  return {
    title: task.title,
    description: task.description,
    date: format(task.due, 'yyyy-MM-dd'),
    start: format(task.due, 'HH:mm'),
    end: task.ends ? format(task.ends, 'HH:mm') : '',
    priority: task.priority || 'Medium',
  };
}

function validate({ title, date, start, end }) {
  if (!title.trim()) return 'Please enter a task title.';
  if (!date) return 'Please pick a date.';
  if (!start) return 'Please set a start time.';
  if (end && end <= start) return 'End time must be after the start time.';
  return '';
}

const Label = ({ children }) => <p className="mb-2 text-xs text-[#3B3F52]">{children}</p>;

function Picker({ type, value, onChange, label, placeholder, display, icon }) {
  return (
    <div className={`relative flex h-[38px] items-center border border-line px-3 text-sm ${type === 'date' ? 'justify-between' : 'gap-2.5'}`}>
      {type === 'time' && icon}
      <span>{value ? display : placeholder}</span>
      {type === 'date' && icon}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onClick={(e) => e.currentTarget.showPicker?.()}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export default function TaskModal({ task, defaultDate, onClose, onSave }) {
  const [form, setForm] = useState(() => initialForm(task, defaultDate));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const problem = validate(form);
    if (problem) return setError(problem);

    setSaving(true);
    try {
      await onSave({
        title: form.title.trim(),
        description: form.description.trim(),
        dueAt: at(form.date, form.start).toISOString(),
        endsAt: form.end ? at(form.date, form.end).toISOString() : null,
        priority: form.priority,
      });
      onClose();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const time = (value) => format(at('2000-01-01', value), 'h:mm a');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 md:items-center md:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} noValidate role="dialog" aria-modal="true" aria-label={task ? 'Edit task' : 'Add new task'} className="max-h-[92vh] w-full max-w-[390px] overflow-y-auto bg-surface px-[22px] pb-6 pt-7 md:max-w-[480px] md:px-8 md:pb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button type="button" onClick={onClose} aria-label="Close"><CloseIcon size={24} /></button>
        </div>

        <div className="space-y-5">
          <div>
            <Label>Task title</Label>
            <input value={form.title} onChange={set('title')} maxLength={120} placeholder="Doing Homework" className="h-[38px] w-full border border-line px-3 text-sm" />
          </div>

          <div>
            <Label>Set Time</Label>
            <div className="grid grid-cols-2 gap-5">
              <Picker type="time" label="Start time" value={form.start} onChange={set('start')} placeholder="Start" display={form.start && time(form.start)} icon={<ClockIcon size={16} />} />
              <Picker type="time" label="End time" value={form.end} onChange={set('end')} placeholder="Ends" display={form.end && time(form.end)} icon={<ClockIcon size={16} />} />
            </div>
          </div>

          <div>
            <Label>Set Date</Label>
            <Picker type="date" label="Date" value={form.date} onChange={set('date')} placeholder="Pick a date" display={form.date && format(at(form.date, '00:00'), 'EEEE d, MMMM')} icon={<CalendarIcon size={16} />} />
          </div>

          <div>
            <Label>Priority</Label>
            <div className="grid grid-cols-3 gap-3">
              {PRIORITIES.map((p) => (
                <button
                  type="button"
                  key={p}
                  aria-pressed={form.priority === p}
                  onClick={() => setForm((f) => ({ ...f, priority: p }))}
                  className={`h-[38px] border text-sm ${form.priority === p ? 'border-primary bg-primary text-white' : 'border-line'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <textarea value={form.description} onChange={set('description')} maxLength={1000} placeholder="Add Description" className="h-[92px] w-full resize-none border border-line p-3 text-sm" />
          </div>
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-danger">{error}</p>}

        <button type="submit" disabled={saving} className="mt-6 h-[44px] w-full rounded-[2px] bg-primary text-base text-white disabled:opacity-60">
          {saving ? 'Saving…' : task ? 'Save changes' : 'Create task'}
        </button>
      </form>
    </div>
  );
}
