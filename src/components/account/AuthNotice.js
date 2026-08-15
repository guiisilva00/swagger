export default function AuthNotice({ children }) {
  return (
    <div
      role="status"
      className="mt-6 rounded-md border border-dashed border-zinc-800 bg-zinc-950 px-4 py-3 text-xs leading-5 text-zinc-500"
    >
      <p className="font-semibold uppercase tracking-wide text-zinc-400">
        Prévia de interface
      </p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
