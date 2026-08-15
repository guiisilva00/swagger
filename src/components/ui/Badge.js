export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex min-w-[1.1rem] items-center justify-center rounded-full bg-accent px-1.5 py-1 text-[10px] font-semibold leading-none text-accent-foreground ${className}`}
    >
      {children}
    </span>
  );
}
