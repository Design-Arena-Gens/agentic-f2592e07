import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-accent text-slate-950 hover:bg-accent-soft focus-visible:outline-accent",
        ghost: "bg-slate-900/60 text-slate-100 hover:bg-slate-800 focus-visible:outline-slate-600",
        outline: "border border-slate-700 bg-slate-900/40 text-slate-100 hover:bg-slate-900 focus-visible:outline-accent"
      },
      size: {
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        sm: "h-9 px-4 text-xs"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: ReactNode;
  };

export function Button({ className, variant, size, asChild = false, children, ...rest }: ButtonProps) {
  const styles = clsx(buttonVariants({ variant, size }), className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      ...rest,
      className: clsx((children as ReactElement).props.className, styles)
    });
  }

  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
}
