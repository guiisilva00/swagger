import Link from "next/link";

const VARIANTS = {
  primary: "bg-zinc-50 text-zinc-950 hover:bg-zinc-300",
  secondary:
    "border border-zinc-700 text-zinc-50 hover:border-zinc-400 bg-transparent",
  ghost: "text-zinc-50 hover:bg-zinc-900",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 h-11 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-40 disabled:pointer-events-none";

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
