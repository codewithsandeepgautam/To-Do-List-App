import { Link } from 'react-router-dom';

const zigzag = (y) => Array.from({ length: 13 }, (_, i) => `${i * 10},${y + (i % 2 ? 0 : 9)}`).join(' ');

function Zigzag({ className }) {
  return (
    <svg className={`absolute ${className}`} width="120" height="64" fill="none" stroke="#5677FF" strokeWidth="3" aria-hidden="true">
      {[0, 14, 28, 42].map((y) => <polyline key={y} points={zigzag(y)} />)}
    </svg>
  );
}

export default function Welcome() {
  return (
    <main className="flex min-h-screen flex-col bg-surface md:flex-row">
      <div className="relative h-[61vh] shrink-0 overflow-hidden bg-primary md:h-auto md:w-1/2">
        <div className="absolute -right-3 -top-12 h-28 w-28 rounded-full border-[18px] border-primary-light md:-top-16 md:right-16 md:h-40 md:w-40" />
        <Zigzag className="left-0 top-[100px]" />
        <Zigzag className="bottom-[56px] right-0" />
      </div>

      <section className="flex flex-1 flex-col md:w-1/2 md:flex-none px-[22px] pb-6 pt-8 md:items-start md:justify-center md:px-16 lg:px-28">
        <h1 className="text-[22px] font-medium md:text-4xl">Manage What To Do</h1>
        <p className="mt-4 max-w-[270px] text-xs font-light leading-5 text-muted md:max-w-sm md:text-sm md:leading-6">
          The best way to manage what you have to do, don&apos;t forget your plans
        </p>
        <Link to="/home" className="mt-auto flex h-[44px] w-full items-center justify-center rounded-[2px] bg-primary text-base text-white md:mt-10 md:w-64">
          Get Started
        </Link>
      </section>
    </main>
  );
}
