import clsx from "clsx";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export function Card({ className, glow = false, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-lg backdrop-blur",
        glow && "gradient-ring",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("mb-6 flex items-start justify-between gap-3", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx("text-sm text-slate-400", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("space-y-4", className)} {...props} />;
}
