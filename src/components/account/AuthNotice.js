export default function AuthNotice({ children }) {
  return (
    <div
      role="status"
      className="mt-6 rounded-md border border-dashed border-border bg-surface px-4 py-3 text-xs leading-5 text-muted"
    >
      <p className="font-semibold uppercase tracking-wide text-foreground">
        Prévia de interface
      </p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
