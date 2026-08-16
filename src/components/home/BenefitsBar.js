import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Frete grátis",
    description: "Nas compras participantes",
  },
  {
    icon: ShieldCheck,
    title: "Pagamento seguro",
    description: "Compra protegida de ponta a ponta",
  },
  {
    icon: RefreshCw,
    title: "Troca fácil",
    description: "Consulte condições",
  },
  {
    icon: Headset,
    title: "Atendimento",
    description: "Estamos aqui para ajudar",
  },
];

export default function BenefitsBar() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:px-8 md:grid-cols-4 md:gap-4">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon
              size={22}
              strokeWidth={1.4}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-accent"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {title}
              </p>
              <p className="mt-0.5 text-xs text-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
