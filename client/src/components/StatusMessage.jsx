import { useTasks } from '../context/TaskContext';

export default function StatusMessage({ empty }) {
  const { loading, error, dismissError } = useTasks();
  if (loading) return <p className="py-8 text-center text-sm text-muted">Loading tasks…</p>;
  return (
    <>
      {error && (
        <p role="alert" onClick={dismissError} className="mb-4 cursor-pointer bg-pending-bg px-3 py-2 text-xs text-danger">
          {error} (tap to dismiss)
        </p>
      )}
      {empty && <p className="py-8 text-center text-sm text-muted">{empty}</p>}
    </>
  );
}
