import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import TaskModal from '../components/TaskModal';

const TaskContext = createContext(null);
export const useTasks = () => useContext(TaskContext);

const normalize = (t) => ({ ...t, due: new Date(t.dueAt), ends: t.endsAt ? new Date(t.endsAt) : null });
const byDue = (a, b) => a.due - b.due;

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    api.list()
      .then((list) => setTasks(list.map(normalize)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addTask = useCallback(async (data) => {
    const created = normalize(await api.create(data));
    setTasks((l) => [...l, created].sort(byDue));
  }, []);

  const updateTask = useCallback(async (id, data) => {
    const updated = normalize(await api.update(id, data));
    setTasks((l) => l.map((t) => (t._id === id ? updated : t)).sort(byDue));
  }, []);

  const toggleTask = useCallback(async (task) => {
    const next = task.status === 'Completed' ? 'In Progress' : 'Completed';
    const setStatus = (status) => setTasks((l) => l.map((t) => (t._id === task._id ? { ...t, status } : t)));
    setStatus(next); 
    try {
      await api.update(task._id, { status: next });
    } catch (e) {
      setStatus(task.status);
      setError(e.message);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await api.remove(id);
      setTasks((l) => l.filter((t) => t._id !== id));
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const openEditor = useCallback((task = null, date = new Date()) => setEditor({ task, date }), []);
  const closeEditor = useCallback(() => setEditor(null), []);

  const value = useMemo(
    () => ({ tasks, loading, error, dismissError: () => setError(''), toggleTask, deleteTask, openEditor }),
    [tasks, loading, error, toggleTask, deleteTask, openEditor]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
      {editor && (
        <TaskModal
          task={editor.task}
          defaultDate={editor.date}
          onClose={closeEditor}
          onSave={(data) => (editor.task ? updateTask(editor.task._id, data) : addTask(data))}
        />
      )}
    </TaskContext.Provider>
  );
}
