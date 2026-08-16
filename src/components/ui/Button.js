import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-accent text-brand-ink border border-accent hover:bg-brand-ink hover:text-accent",
  secondary:
    "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
  ghost: "text-foreground hover:bg-surface-2",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 h-11 text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:pointer-events-none";

export default function Button({
  as,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Component = as || "button";

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
