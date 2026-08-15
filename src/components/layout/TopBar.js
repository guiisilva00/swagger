const MESSAGES = [
  "Compra 100% segura",
  "Troca fácil em até 7 dias",
  "Atendimento SWAGGER",
];

export default function TopBar() {
  return (
    <div className="hidden border-b border-border bg-surface-2 sm:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-8 px-6 py-2 text-[11px] uppercase tracking-wide text-muted sm:px-8">
        {MESSAGES.map((message) => (
          <span key={message}>{message}</span>
        ))}
      </div>
    </div>
  );
}
