export default function ProgressBar({ percent, className = '' }) {
  return (
    <div className={`h-[22px] bg-track ${className}`} role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full bg-navy transition-[width] duration-500" style={{ width: `${percent}%` }} />
    </div>
  );
}
