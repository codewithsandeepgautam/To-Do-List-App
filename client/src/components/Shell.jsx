/** Full-width page: edge-to-edge on phones, centered content column on larger screens. */
export default function Shell({ children, className = '', width = 'max-w-6xl' }) {
  return (
    <main className="min-h-screen w-full bg-surface">
      <div className={`mx-auto w-full px-[22px] pb-32 pt-8 md:px-10 md:pt-12 ${width} ${className}`}>{children}</div>
    </main>
  );
}
