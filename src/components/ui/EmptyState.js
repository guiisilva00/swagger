export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-zinc-800 px-6 py-16 text-center">
      <p className="text-base font-medium text-zinc-50">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-zinc-500">{description}</p>
      )}
      {action}
    </div>
  );
}
