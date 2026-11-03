import { PlusIcon } from './Icons';

export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Add task"
      className="fixed bottom-6 left-1/2 flex h-[70px] w-[70px] -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 md:left-auto md:right-10 md:translate-x-0"
    >
      <PlusIcon size={30} strokeWidth={1.2} />
    </button>
  );
}
